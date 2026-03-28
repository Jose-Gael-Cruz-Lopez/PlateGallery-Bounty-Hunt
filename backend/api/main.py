import os
import uuid
from typing import Optional

from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware

from models import Plate, PlatePage, PlateSort, PlateUploadInput, VoteInput
from seed_data import plate_seed, state_seed

app = FastAPI(title="PlateGallery API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Health ────────────────────────────────────────────────────────────────────

@app.get("/health")
def health():
    return {"ok": True, "service": "api"}


# ── Plates ────────────────────────────────────────────────────────────────────

@app.get("/api/plates", response_model=PlatePage)
def list_plates(
    sort: PlateSort = PlateSort.newest,
    state: Optional[str] = None,
    limit: int = Query(20, le=100),
    cursor: Optional[str] = None,
):
    plates = [p for p in plate_seed if not state or p.state == state]

    if sort == PlateSort.top:
        plates.sort(key=lambda p: p.wilsonScore, reverse=True)
    elif sort == PlateSort.trending:
        plates.sort(key=lambda p: p.hotScore, reverse=True)
    else:
        plates.sort(key=lambda p: p.createdAt, reverse=True)

    return PlatePage(items=plates[:limit], nextCursor=None)


@app.post("/api/plates", status_code=202)
def create_plate(body: PlateUploadInput):
    plate_id = str(uuid.uuid4())
    return {
        "plateId": plate_id,
        "status": "pending",
        "moderationJob": {
            "plateId": plate_id,
            "imageUrl": "https://res.cloudinary.com/demo/image/upload/sample.jpg",
            "state": body.state,
        },
    }


@app.get("/api/plates/{plate_id}/status")
def get_plate_status(plate_id: str):
    return {"plateId": plate_id, "status": "pending"}


@app.post("/api/plates/{plate_id}/vote")
def vote_plate(plate_id: str, body: VoteInput):
    return {"plateId": plate_id, "value": body.value, "updatedScore": body.value}


# ── Leaderboard ───────────────────────────────────────────────────────────────

@app.get("/api/leaderboard", response_model=list[Plate])
def leaderboard(state: Optional[str] = None):
    plates = [p for p in plate_seed if not state or p.state == state]
    plates.sort(key=lambda p: p.wilsonScore, reverse=True)
    return plates[:10]


# ── States ────────────────────────────────────────────────────────────────────

@app.get("/api/states")
def list_states():
    return state_seed


# ── Entry point ───────────────────────────────────────────────────────────────

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 4000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
