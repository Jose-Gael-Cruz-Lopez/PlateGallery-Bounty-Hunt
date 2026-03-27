from pydantic import BaseModel, HttpUrl


class ModerateRequest(BaseModel):
    plateId: str
    imageUrl: HttpUrl
    state: str


class ModerateResponse(BaseModel):
    approved: bool
    reason: str
    confidence: float
    phash: str | None = None

