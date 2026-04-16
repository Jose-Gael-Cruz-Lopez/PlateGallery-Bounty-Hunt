from __future__ import annotations

import io
import logging
from dataclasses import dataclass

from PIL import Image

from app.core.config import settings

logger = logging.getLogger(__name__)


@dataclass
class ImageCheckResult:
    ok: bool
    reason: str | None = None
    detail: str | None = None


def rule_based_check(image_bytes: bytes) -> ImageCheckResult:
    """Basic rule-based image validation."""
    try:
        img = Image.open(io.BytesIO(image_bytes))
        img.verify()
        img = Image.open(io.BytesIO(image_bytes))
    except Exception:
        return ImageCheckResult(ok=False, reason="low_quality", detail="Image file is corrupted")

    width, height = img.size
    short_edge = min(width, height)
    if short_edge < 400:
        return ImageCheckResult(
            ok=False,
            reason="low_quality",
            detail=f"Image too small ({width}x{height}). Minimum 400px on short edge.",
        )

    return ImageCheckResult(ok=True)


async def check_image_openai(image_bytes: bytes, plate_text: str) -> ImageCheckResult:
    """Use OpenAI Vision to validate the image."""
    api_key = settings.OPENAI_API_KEY
    if not api_key:
        return ImageCheckResult(ok=True)

    try:
        import base64
        import json

        import httpx

        b64 = base64.b64encode(image_bytes).decode()
        prompt = (
            "You are a license plate gallery moderator. Inspect this image and "
            "respond ONLY with JSON:\n"
            '{"is_license_plate": bool, "is_explicit": bool, "is_offensive_symbol": bool, '
            '"quality_ok": bool, "confidence": number}\n'
            "No prose."
        )
        async with httpx.AsyncClient(timeout=10) as client:
            resp = await client.post(
                "https://api.openai.com/v1/chat/completions",
                headers={"Authorization": f"Bearer {api_key.get_secret_value()}"},
                json={
                    "model": "gpt-4o-mini",
                    "messages": [
                        {
                            "role": "user",
                            "content": [
                                {"type": "text", "text": prompt},
                                {
                                    "type": "image_url",
                                    "image_url": {
                                        "url": f"data:image/jpeg;base64,{b64}",
                                        "detail": "low",
                                    },
                                },
                            ],
                        }
                    ],
                    "max_tokens": 200,
                },
            )
            resp.raise_for_status()
            content = resp.json()["choices"][0]["message"]["content"]
            content = content.strip()
            if content.startswith("```"):
                content = content.split("\n", 1)[-1].rsplit("```", 1)[0]
            result = json.loads(content)

        if result.get("is_explicit"):
            return ImageCheckResult(ok=False, reason="explicit", detail="Explicit content detected")
        if result.get("is_offensive_symbol"):
            return ImageCheckResult(
                ok=False, reason="offensive_text", detail="Offensive symbol detected"
            )
        if not result.get("is_license_plate", True):
            return ImageCheckResult(
                ok=False, reason="not_a_plate", detail="No license plate visible in image"
            )
        if not result.get("quality_ok", True):
            return ImageCheckResult(ok=False, reason="low_quality", detail="Image quality too low")
        return ImageCheckResult(ok=True)

    except Exception as e:
        logger.warning("OpenAI vision check failed, falling back to rule-based: %s", e)
        return ImageCheckResult(ok=True)


async def check_image(image_bytes: bytes, plate_text: str) -> ImageCheckResult:
    """Run image checks based on configured provider."""
    basic = rule_based_check(image_bytes)
    if not basic.ok:
        return basic

    if settings.MODERATION_PROVIDER == "openai":
        return await check_image_openai(image_bytes, plate_text)

    return ImageCheckResult(ok=True)
