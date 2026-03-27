from fastapi import FastAPI

from app.models import ModerateRequest, ModerateResponse
from app.pipeline import run_pipeline

app = FastAPI(title="PlateGallery Moderation Service", version="0.1.0")


@app.get("/health")
async def health() -> dict[str, str]:
    return {"ok": "true", "service": "moderation"}


@app.post("/moderate", response_model=ModerateResponse)
async def moderate_image(request: ModerateRequest) -> ModerateResponse:
    return run_pipeline(request)

