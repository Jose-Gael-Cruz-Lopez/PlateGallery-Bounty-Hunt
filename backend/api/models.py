from enum import Enum
from typing import Optional
from pydantic import BaseModel


class PlateStatus(str, Enum):
    pending = "pending"
    approved = "approved"
    rejected = "rejected"


class PlateSort(str, Enum):
    newest = "newest"
    top = "top"
    trending = "trending"


class Plate(BaseModel):
    id: str
    userId: str
    imageUrl: str
    thumbnailUrl: Optional[str] = None
    plateText: Optional[str] = None
    state: str
    description: Optional[str] = None
    status: PlateStatus
    rejectionReason: Optional[str] = None
    upvoteCount: int
    downvoteCount: int
    netScore: int
    wilsonScore: float
    hotScore: float
    createdAt: str


class StateStats(BaseModel):
    state: str
    plateCount: int
    contributorCount: int = 0
    latestUpload: Optional[str] = None


class PlatePage(BaseModel):
    items: list[Plate]
    nextCursor: Optional[str] = None


class PlateUploadInput(BaseModel):
    state: str
    plateText: Optional[str] = None
    description: Optional[str] = None


class VoteInput(BaseModel):
    value: int  # 1 or -1
