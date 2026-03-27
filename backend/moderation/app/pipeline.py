from app.models import ModerateRequest, ModerateResponse


def run_pipeline(request: ModerateRequest) -> ModerateResponse:
    """
    Starter moderation pipeline with clear extension points for:
    1. file validation and perceptual hashing
    2. OpenAI moderation
    3. Google Vision plate verification
    4. GPT-4o-mini fallback for ambiguous cases
    """
    return ModerateResponse(
        approved=True,
        reason=f"Starter pipeline accepted plate from {request.state}.",
        confidence=0.82,
        phash="placeholder-phash",
    )

