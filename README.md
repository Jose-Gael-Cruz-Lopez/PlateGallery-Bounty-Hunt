# PlateGallery

A web app where people submit photos of funny vanity license plates they spot on the road. Community votes on the best ones, an interactive U.S. map tracks coverage across all 50 states, and leaderboards surface the top plates overall and per state.

---

## Project Structure

```
PlateGallery/
├── frontend/          # React + Vite + TypeScript
├── backend/           # Python + FastAPI
│   ├── main.py        # Single entry point — all routes
│   ├── requirements.txt
│   ├── api/
│   │   ├── models.py     # Pydantic models (Plate, StateStats, etc.)
│   │   └── seed_data.py  # In-memory plate + state data
│   └── moderation/
│       ├── models.py     # ModerateRequest / ModerateResponse
│       └── pipeline.py   # Moderation pipeline (starter)
└── .env.example
```

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 19, Vite, TypeScript |
| Styling | Custom CSS (glassmorphism dark theme) |
| Data fetching | TanStack React Query v5 |
| Animations | Framer Motion |
| Auth | Clerk (wired in frontend, not enforced on backend yet) |
| Map | @mirawision/usa-map-react |
| Backend | Python 3.11+, FastAPI, Uvicorn |
| Validation | Pydantic v2 |

---

## Running Locally

**Frontend:**
```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

**Backend:**
```bash
cd backend
pip install -r requirements.txt
python main.py
# → http://localhost:4000
# → http://localhost:4000/docs  (auto-generated API docs)
```

Copy `.env.example` to `.env` and fill in values as services get wired up.

---

## What Works Now

### Frontend
- **Feed** — Masonry grid of plate photos, sortable by newest / top rated / trending
- **Plate of the Day** — Top-voted plate shown in the hero banner
- **Interactive U.S. Map** — All 50 states + DC with heat map coloring based on plate count; click any state to see its plates
- **State pages** — Per-state plate gallery and leaderboard
- **Leaderboard** — Overall top plates ranked by Wilson score
- **Submit a Plate** — Upload form with state selector, plate text, and description
- **Voting** — Upvote / downvote on every plate with optimistic UI
- **Auth pages** — Sign in / sign up via Clerk (UI only, not enforced on API yet)
- **Profile pages** — Placeholder user profile page

The frontend runs entirely off **mock data** (`frontend/src/lib/mockData.ts`) when no real backend is configured. Set `VITE_API_URL` in `.env` to a non-localhost URL to switch to the live API.

### Backend
- `GET /api/plates` — Paginated plate list; supports `sort` (newest/top/trending) and `state` filter
- `POST /api/plates` — Accept a plate submission, return a job ID (not persisted yet)
- `GET /api/plates/{id}/status` — Returns moderation status (always `pending` for now)
- `POST /api/plates/{id}/vote` — Accept a vote (acknowledged but not saved)
- `GET /api/leaderboard` — Top 10 plates by Wilson score, optional `state` filter
- `GET /api/states` — Plate count + contributor count per state
- `POST /moderate` — Run the moderation pipeline on an image URL
- `GET /health` — Health check

---

## What Is Not Wired Up Yet

| Feature | Status |
|---|---|
| Database | Supabase credentials in `.env` but no queries — all data is in-memory |
| Image uploads | Form accepts files but nothing is sent to Cloudinary |
| Persistent votes | Votes are acknowledged but scores don't update |
| Auth enforcement | Clerk keys configured but no route is protected |
| Real moderation | Pipeline always approves — extension points are in `backend/moderation/pipeline.py` |
| Comments | Schema designed, not built |

---

## Mock Data

The frontend mock data lives in **`frontend/src/lib/mockData.ts`** — this is the single source of truth for sample content when running without a backend. It includes 36 vanity plates and state stats for all 51 states.

`frontend/src/lib/api.ts` automatically uses mock data when `VITE_API_URL` is not set or points to localhost. Set it to a real URL to switch to the live API.

---

## Environment Variables

| Variable | Service | Purpose |
|---|---|---|
| `VITE_API_URL` | Frontend | Backend URL (omit for mock data) |
| `VITE_CLERK_PUBLISHABLE_KEY` | Frontend | Clerk auth UI |
| `PORT` | Backend | API port (default 4000) |
| `CLERK_SECRET_KEY` | Backend | Auth verification (not wired yet) |
| `SUPABASE_URL` | Backend | Database (not wired yet) |
| `SUPABASE_SERVICE_ROLE_KEY` | Backend | Database admin (not wired yet) |
| `CLOUDINARY_CLOUD_NAME` | Backend | Image storage (not wired yet) |
| `CLOUDINARY_API_KEY` | Backend | Image storage (not wired yet) |
| `CLOUDINARY_API_SECRET` | Backend | Image storage (not wired yet) |
| `OPENAI_API_KEY` | Backend | Moderation pipeline (not wired yet) |
| `GOOGLE_APPLICATION_CREDENTIALS` | Backend | Vision API for plate verification (not wired yet) |
