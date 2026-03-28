# CLAUDE.md — PlateGallery

Context for working in this codebase.

---

## What This Project Is

PlateGallery is a vanity license plate photo sharing app. Users submit photos of funny plates they spot on the road, the community votes, and an interactive U.S. map tracks plate coverage across all 50 states + DC.

---

## Current State (as of March 2026)

The project is in active development. The frontend is largely built and runs off mock data. The backend is a Python FastAPI app that serves seed data — no real database, image storage, or auth is wired up yet.

**Frontend** — fully functional UI with mock data:
- Feed, map, leaderboard, state pages, upload form, voting, auth pages all built
- Uses `frontend/src/lib/mockData.ts` as the data source when no real backend is set

**Backend** — FastAPI serving in-memory seed data:
- All API routes exist and respond correctly
- Nothing is persisted — data resets on restart
- Moderation pipeline always approves

---

## Project Structure

```
frontend/src/
├── App.tsx                  # Router setup
├── main.tsx                 # Entry point (React StrictMode, Clerk, React Query)
├── styles.css               # All styles — single CSS file, custom design system
├── components/
│   ├── Logo.tsx             # SVG license plate logo
│   ├── NavBar.tsx           # Top navigation with Logo
│   ├── PlateCard.tsx        # Feed card — photo + caption + vote button
│   ├── PlateFrame.tsx       # SVG license plate graphic (used on detail pages)
│   ├── SplashIntro.tsx      # Fade-in wrapper on first load
│   ├── USAMap.tsx           # Interactive map panel (wraps @mirawision/usa-map-react)
│   ├── Leaderboard.tsx      # Ranked list component
│   ├── UploadZone.tsx       # Drag-and-drop file upload area
│   └── VoteButton.tsx       # Up/down vote with spring animation
├── pages/
│   ├── Home.tsx             # Hero + feed
│   ├── Map.tsx              # Full map page
│   ├── State.tsx            # Per-state gallery
│   ├── LeaderboardPage.tsx  # Global leaderboard
│   ├── PlateDetail.tsx      # Single plate view
│   ├── Upload.tsx           # Submit form
│   ├── Profile.tsx          # User profile (placeholder)
│   └── Auth.tsx             # Sign in / sign up (Clerk)
├── hooks/
│   ├── usePlates.ts         # Feed + single plate queries
│   ├── useMap.ts            # State stats query
│   └── useVote.ts           # Optimistic vote state
└── lib/
    ├── api.ts               # Fetch wrapper — switches between mock and real API
    ├── mockData.ts          # ALL sample data lives here (36 plates, 51 states)
    ├── types.ts             # Zod schemas + TypeScript types
    └── utils.ts             # timeAgo, getHeatColor, stateNames, etc.

backend/
├── main.py                  # FastAPI app — all routes + entry point
├── requirements.txt         # Single venv for the whole backend
├── api/
│   ├── models.py            # Plate, StateStats, PlatePage, VoteInput, etc.
│   └── seed_data.py         # 12 seed plates + 12 state stats
└── moderation/
    ├── models.py            # ModerateRequest, ModerateResponse
    └── pipeline.py          # run_pipeline() — always approves, ready to extend
```

---

## Key Things to Know

### Mock data flag
`frontend/src/lib/api.ts` has a `USE_MOCK` constant at the top. It's `true` when `VITE_API_URL` is not set or points to localhost. All sample content is in `frontend/src/lib/mockData.ts` — that is the single file to edit when adding or changing sample plates.

### Design system
All styles are in `frontend/src/styles.css` — no Tailwind, no CSS modules. The design is a dark glassmorphism theme. Key CSS variables are at the top of the file under `:root`. **Amber/gold (`--gold`) is the primary brand color. Blue (`--accent`) is secondary.**

### No shared types package
The original project had a `packages/shared/` TypeScript package. That's been removed. Types now live in:
- Frontend: `frontend/src/lib/types.ts` (Zod schemas)
- Backend: `backend/api/models.py` (Pydantic models)

### Backend is one app now
The original architecture had a separate Node.js API and a Python moderation microservice. Both are now a single Python FastAPI app in `backend/`. `main.py` is the only entry point — it imports from `api/` and `moderation/` subfolders.

### PlateFrame is intentionally not on cards
`PlateFrame.tsx` (the SVG license plate graphic) is kept for the plate detail page only. It was removed from `PlateCard` and the hero banner because the user wants clean photo-forward cards.

---

## Running the Project

```bash
# Frontend
cd frontend && npm install && npm run dev

# Backend
cd backend && pip install -r requirements.txt && python main.py
```

Frontend: `http://localhost:5173`
Backend: `http://localhost:4000`
API docs: `http://localhost:4000/docs`

---

## What's Next (not built yet)

- Wire up Supabase for persistence
- Wire up Cloudinary for image uploads
- Enforce Clerk auth on backend routes
- Implement real moderation pipeline in `backend/moderation/pipeline.py`
- Persist votes and recalculate scores
