#  PlateGallery

**BU Spark! Innovation Hours Bounty** · Prize: $200 · Difficulty: Intermediate · [View Bounty Brief](https://github.com/hack-bu/plate-gallery)

---

## Table of Contents

- [Overview](#overview)
- [Team Roles & Work Split](#team-roles--work-split)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Core Features](#core-features)
- [Database Schema](#database-schema)
- [API Reference](#api-reference)
- [Moderation Pipeline](#moderation-pipeline)
- [Deployment](#deployment)
- [Research Findings](#research-findings)
- [Sprint Plan](#sprint-plan)
- [Getting Started](#getting-started)

---

## Overview

PlateGallery is a full-stack web platform where people spot vanity license plates like `ILUV2SKI`, `DAD0F3`, or `GOBOSTON` on the road, take a picture, and post them. The site celebrates American creativity and regional identity through user-generated content, interactive voting, and an interactive U.S. map — one plate at a time.

### Core Requirements

1. **Photo Upload & Browsing** — Upload photos tagged by U.S. state, browse via gallery/feed
2. **Automated Moderation** — Server-side pipeline that rejects non-plate images, explicit content, and spam
3. **Voting & Leaderboards** — Upvote/downvote plates, per-state and overall leaderboards
4. **Interactive U.S. Map** — Clickable map of all 50 states + DC, visual unlock indicators

### Nice-to-Have Features

- User accounts for tracking submissions and votes
- Threaded comments on plate submissions
- Mobile-responsive design with camera access
- Social sharing with Open Graph meta tags
- Fun stats dashboard (rarest state, most competitive, plate of the day)

---

## Team Roles & Work Split

### Day 1 Kickoff — ALL 4 PEOPLE (2–3 hours)

Before anyone writes code, the full team agrees on:

1. **API contracts** — Write Zod schemas in `packages/shared/` for every request/response
2. **DB schema** — Review and approve the full Prisma schema (Person D drafts, all approve)
3. **Git conventions** — Branch naming (`feat/upload-form`, `fix/vote-race`), PR review rules
4. **Mock data** — Person D seeds 20 fake plates across 10 states so A can build UI immediately

> This meeting is non-negotiable. Skipping it causes integration pain on day 7+ that costs more than the 2 hours.

---

### Person A — Frontend Engineer

**Owns:** Everything the user sees and touches.

| Tech | Purpose |
|------|---------|
| React + Vite + TypeScript | Core framework |
| @mirawision/usa-map-react | Interactive US map |
| @tanstack/react-query | Data fetching + cache |
| Clerk React SDK | Authentication UI |
| browser-image-compression | Client-side resize |
| Tailwind CSS | Styling |
| Framer Motion | Micro-animations |

#### Day-by-Day Tasks

| Days | Task | Deliverable |
|------|------|-------------|
| 2–3 | Upload form + gallery grid | Upload submits to `POST /api/plates`, gallery renders from `GET /api/plates` |
| 4–5 | Interactive US map | Working clickable map linking to state galleries |
| 6–7 | Voting UI + optimistic updates | VoteButton component with instant feedback (**needs B's vote endpoint by day 6**) |
| 8–9 | Leaderboard pages | Per-state and overall leaderboards with tab navigation |
| 10–11 | Mobile + polish | Responsive layout, camera access, loading/error/empty states |
| 12 | Final polish | Cross-browser testing, accessibility pass, lazy loading |

#### Dependencies

| From | What | By When |
|------|------|---------|
| Person D | Monorepo scaffolded, Clerk configured, mock data seeded | Day 1 |
| Person B | Upload + gallery API endpoints live | Day 3 |
| Person B | Vote endpoint live | Day 6 |
| Person B | Leaderboard + states endpoints live | Day 8 |

---

### Person B — Backend API Engineer

**Owns:** Express API server — all routes, business logic, vote engine, leaderboards.

| Tech | Purpose |
|------|---------|
| Node.js + Express + TypeScript | API framework |
| Prisma | ORM for Supabase PostgreSQL |
| Zod | Request validation (shared schemas) |
| BullMQ | Job queue for moderation dispatch |
| ioredis | Redis client for leaderboard cache |
| express-rate-limit | Rate limiting |
| Multer + Cloudinary Node SDK | File upload handling |

#### Day-by-Day Tasks

| Days | Task | Deliverable |
|------|------|-------------|
| 2–3 | Upload + plates CRUD | `POST /api/plates` (upload → Cloudinary → BullMQ), `GET /api/plates` with cursor pagination |
| 4–5 | Vote engine + triggers | `POST /api/plates/:id/vote` with upsert, Wilson Score + Hot Score via DB triggers |
| 6–7 | Leaderboard + states endpoints | `GET /api/leaderboard`, `GET /api/states`, BullMQ moderation worker |
| 8–9 | Stats + rate limiting | `GET /api/stats`, per-endpoint rate limits, error handling middleware |
| 10–11 | Comments + integration testing | Comment CRUD, Jest + Supertest tests, load test vote endpoint |
| 12 | Hardening | Graceful degradation if moderation service down, structured logging |

#### Dependencies

| From | What | By When |
|------|------|---------|
| Person D | Supabase DB, Prisma schema, Cloudinary + Redis credentials | Day 1 |
| Person C | FastAPI `/moderate` endpoint accepting image URLs | Day 5 |
| Person D | Express app deployed on Render with env vars | Day 5 |

#### Delivers To Others

| To | What | By When |
|----|------|---------|
| Person A | Working upload + gallery endpoints | Day 3 |
| Person A | Working vote endpoint | Day 5 |
| Person A | Working leaderboard + states endpoints | Day 7 |
| Person C | BullMQ job format: `{ imageUrl, plateId, userId }` | Day 2 |

---

### Person C — Moderation / ML Engineer

**Owns:** The entire Python/FastAPI moderation microservice.

| Tech | Purpose |
|------|---------|
| Python 3.11+ / FastAPI / Uvicorn | Microservice framework |
| Pillow | Image preprocessing |
| imagehash | Perceptual hashing for duplicates |
| google-cloud-vision | Plate verification |
| openai SDK | Free moderation API + GPT-4o-mini fallback |
| httpx | Async HTTP client |
| pytest | Testing |

#### Day-by-Day Tasks

| Days | Task | Deliverable |
|------|------|-------------|
| 2–3 | FastAPI scaffold + Layers 1–2 | `/moderate` endpoint with pre-checks (pHash, EXIF, dimensions) + OpenAI content safety |
| 4–5 | Layers 3–4 (Vision + LLM) | Google Cloud Vision plate verification + GPT-4o-mini fallback for ambiguous cases |
| 6–7 | Integration testing | 20+ test images, target >90% accuracy, <3s per image |
| 8–9 | Rate limiting + spam detection | pHash duplicate checking, upload velocity detection, structured rejection reasons |
| 10–11 | Turnstile + hardening | Cloudflare Turnstile verification, graceful degradation, Dockerfile |
| 12 | Load testing | 50 concurrent requests, memory profiling, race condition checks |

#### Dependencies

| From | What | By When |
|------|------|---------|
| Person D | Google Cloud Vision API key, OpenAI API key | Day 1 |
| Person D | FastAPI deployed on Render with env vars | Day 5 |
| Person B | BullMQ job format spec | Day 2 |

#### Delivers To Others

| To | What | By When |
|----|------|---------|
| Person B | `/moderate` endpoint: `{ image_url } → { approved, reason, phash }` | Day 5 |
| Person B | List of all possible rejection reasons | Day 5 |
| Person D | Dockerfile for Render deployment | Day 4 |

---

### Person D — Infrastructure / DevOps / Database Engineer

**Owns:** All infrastructure, database, auth, deployment, CI/CD. The "glue" person.

| Tech | Purpose |
|------|---------|
| Supabase | PostgreSQL + dashboard |
| Prisma | Schema + migrations |
| Cloudinary | Image storage setup |
| Upstash Redis | Managed Redis for BullMQ + caching |
| Clerk | Auth provider setup |
| Vercel / Render | Deployment |
| GitHub Actions | CI/CD |
| Cloudflare Turnstile | Bot prevention |

#### Day-by-Day Tasks

| Days | Task | Deliverable |
|------|------|-------------|
| **Day 1** | **Foundation setup (CRITICAL)** | Monorepo, Supabase, Prisma schema, seed data, Clerk, Cloudinary, Redis, `.env.example` files — **every teammate can `git clone` → `npm install` → start coding** |
| 2–3 | Cloudinary + Redis + auth middleware | Upload presets, folder structure, Clerk webhook sync, BullMQ connection |
| 4–5 | Deploy all 3 services | React → Vercel, Express → Render, FastAPI → Render, CORS config. **All services live on the internet.** |
| 6–7 | Redis leaderboard cache | Sorted sets for leaderboards, write-through cache, TTL strategy |
| 8–9 | Materialized views + stats | `state_stats` view, pg_cron refresh, fun stats queries, index optimization |
| 10–11 | OG tags + CI/CD | Social sharing middleware, GitHub Actions (lint/test/deploy), env var audit |
| 12 | Monitoring + backup | Health check alerts, backup verification, deployment README section |

#### Delivers To Others

| To | What | By When |
|----|------|---------|
| All | Monorepo scaffolded, installable, with mock data | Day 1 |
| Person A | Clerk configured, React app can sign in/out | Day 2 |
| Person B | Supabase + Cloudinary + Redis credentials + Prisma client | Day 1 |
| Person C | Google Cloud Vision + OpenAI API keys | Day 1 |
| All | Live URLs for all three services | Day 5 |

---

### Critical Path & Blockers

```
Day 1: D sets up infra → Day 2–3: B builds upload API → Day 5: C's moderation is live
→ Day 6–7: A builds vote UI (needs B's endpoint) → Day 8–9: A builds leaderboards
→ Day 13–14: All ship
```

| Risk | Level | Mitigation |
|------|-------|------------|
| Day 1: D doesn't finish infra | **HIGH** | D starts setup BEFORE team meeting; meeting is in the afternoon |
| Day 5: B needs C's moderation endpoint | MEDIUM | B builds mock moderation (`return { approved: true }`) and swaps later |
| Day 6: A needs B's vote endpoint | LOW | A builds vote UI with local state first, wires to real API later |

### Mock-First Rule

Everyone builds against mocks until the real dependency is live:

- **Person A:** Mock API responses with MSW or hardcoded JSON
- **Person B:** Mock moderation with `return { approved: true }` until C's service is up
- **Person C:** Test moderation with local images before Cloudinary integration
- **Person D:** Use Supabase seed data so frontend has something to render

### Daily Standup (15 min max)

Every day, each person answers:
1. What did I ship yesterday?
2. What am I shipping today?
3. Am I blocked on anyone?

---

## Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Frontend** | React (Vite) + TypeScript | BU Spark approved, fast HMR, team's strength |
| **Auth** | Clerk | BU Spark recommended, pre-built UI, 10K free MAUs |
| **Main API** | Node.js + Express + TypeScript | BU Spark approved, shared JS stack with frontend |
| **Moderation Service** | Python + FastAPI | BU Spark approved, superior image processing (2–5× faster), OpenCV/Pillow/YOLO ecosystem |
| **Database** | Supabase (PostgreSQL) | 500 MB free, relational model for votes, row-level security |
| **Image Storage** | Cloudinary | 25 credits/mo free, URL-based transforms, built-in CDN |
| **Job Queue** | BullMQ + Redis | Async moderation pipeline, leaderboard caching |
| **Interactive Map** | @mirawision/usa-map-react | Purpose-built for clickable US state maps, zero dependencies, TypeScript |
| **Deployment** | Vercel (frontend) + Render (Express + FastAPI) | Free tiers, auto-deploy from GitHub |

### Why Hybrid Node.js + Python?

The moderation pipeline is the most technically demanding part. Python handles image classification 2–5× faster than Node.js and gives access to OpenCV, Pillow, imagehash, and YOLO. Node.js is superior for concurrent I/O (votes, gallery queries, real-time leaderboard updates) and shares TypeScript with the React frontend.

**How they communicate:** Express sends an HTTP POST to FastAPI with the image URL. FastAPI returns `{ approved: bool, reason: string }`. One endpoint, clean JSON contract.

> Both Python (Flask/FastAPI) and Node.js (Express) are explicitly approved in [BU Spark's permissible tech stack](https://buspark.io/docs/tech-stack/se/api-servers).

---

## System Architecture

```
┌─────────────────────────────────────────────────────┐
│  CLIENT (Vercel)                                     │
│  React + Vite + TypeScript + Clerk Auth              │
│  @mirawision/usa-map-react · Masonry Gallery         │
└──────────────────────┬──────────────────────────────┘
                       │ REST + JWT (Clerk)
                       ▼
┌─────────────────────────────────────────────────────┐
│  MAIN API (Render — Node.js/Express)                 │
│                                                      │
│  ┌──────────┐  ┌──────────┐  ┌───────────────┐     │
│  │ Upload   │  │ Vote     │  │ Leaderboard   │     │
│  │ Handler  │  │ Engine   │  │ (Wilson Score) │     │
│  │ (Multer) │  │ (Upsert) │  │               │     │
│  └────┬─────┘  └──────────┘  └───────────────┘     │
│       │                                              │
│  ┌────┴────────────────┐  ┌──────────────────┐      │
│  │ BullMQ Job Queue    │  │ Rate Limiter +   │      │
│  │ (moderation jobs)   │  │ Turnstile CAPTCHA│      │
│  └────┬────────────────┘  └──────────────────┘      │
└───────┼─────────────────────────────────────────────┘
        │ HTTP POST (image URL)
        ▼
┌─────────────────────────────────────────────────────┐
│  MODERATION SERVICE (Render — Python/FastAPI)        │
│                                                      │
│  Layer 1: Pre-checks (pHash, EXIF, dimensions)       │
│      ↓                                               │
│  Layer 2: Content safety (OpenAI Moderation — FREE)  │
│      ↓                                               │
│  Layer 3: Plate verification (Google Cloud Vision)    │
│      ↓ (if ambiguous)                                │
│  Layer 4: GPT-4o-mini fallback ($0.0003/image)       │
│                                                      │
│  Returns: { approved: bool, reason: string }         │
└─────────────────────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────┐
│  DATA LAYER                                          │
│                                                      │
│  Supabase (PostgreSQL)  │  Cloudinary  │  Redis      │
│  Users, plates, votes,  │  Image CDN + │  BullMQ,    │
│  comments, states       │  transforms  │  LB cache   │
└─────────────────────────────────────────────────────┘
```

### Monorepo Structure

```
plategallery/
├── frontend/                   # React + Vite frontend
│   ├── src/
│   │   ├── components/         # Upload panel, feed preview, map preview
│   │   ├── lib/                # API client hooks and frontend-local types
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── styles.css
│   ├── package.json
│   └── vite.config.ts
├── backend/
│   ├── api/                    # Node.js/Express backend
│   │   ├── src/
│   │   │   ├── routes/         # plates, leaderboard, states
│   │   │   ├── services/       # moderation seam, plate service
│   │   │   ├── lib/            # seed data for local dev
│   │   │   ├── index.ts
│   │   │   └── server.ts
│   │   └── package.json
│   └── moderation/             # Python/FastAPI service
│       ├── app/
│       │   ├── main.py         # FastAPI app
│       │   ├── models.py       # request/response contracts
│       │   └── pipeline.py     # 4-layer moderation stub
│       ├── requirements.txt
│       └── Dockerfile
├── packages/
│   └── shared/                 # Shared types, constants, Zod schemas
│       └── src/index.ts
├── .env.example
├── tsconfig.base.json
├── package.json
└── README.md
```

### Starter Status

The repo now includes a working starter architecture:

- `frontend` renders a lightweight dashboard backed by the API.
- `backend/api` exposes `/api/plates`, `/api/plates/:id/status`, `/api/plates/:id/vote`, `/api/leaderboard`, and `/api/states`.
- `backend/moderation` exposes `/moderate` and `/health` in FastAPI.
- `packages/shared` contains the shared Zod schemas and TypeScript types that define the contract between frontend and backend.

What is still stubbed on purpose:

- Clerk auth, Cloudinary uploads, Supabase persistence, BullMQ workers, Redis cache, and the real moderation layers are defined as extension points but not fully wired yet.
- The Express API currently serves seed data so the frontend can move immediately while infrastructure gets connected.

---

## Core Features

### 1. Photo Upload & Browsing

**Upload Flow:**
1. User selects photo → client-side compression with `browser-image-compression` (5MB → ~500KB)
2. React sends multipart POST to Express `/api/plates`
3. Express middleware: Clerk auth → Multer parse → Sharp validate (200×200 min, 8000×8000 max, JPEG/PNG/WebP)
4. Image uploads to Cloudinary quarantine folder
5. BullMQ job dispatched to Python moderation service
6. User gets `202 Accepted` with job ID — frontend polls `/api/plates/:id/status`
7. On approval: image moves to public folder, DB status → `"approved"`

**Gallery/Feed:**
- CSS Grid masonry: `repeat(auto-fill, minmax(280px, 1fr))`
- Cursor-based pagination (not offset)
- Filter by state, sort by newest/top (Wilson Score)/trending (Hot Score)
- Lazy-loaded images via Cloudinary: `f_auto,q_auto,w_400`
- React Query for fetching, caching, and infinite scroll

### 2. Automated Moderation (4-Layer Pipeline)

All server-side, running in the Python/FastAPI microservice:

| Layer | What It Does | Cost |
|-------|-------------|------|
| **1. Pre-checks** | File type (magic bytes), dimensions, perceptual hash (imagehash), EXIF validation | Free (local) |
| **2. Content safety** | OpenAI `omni-moderation-latest` — catches sexual, violent, hateful content | **Free** (unlimited) |
| **3. Plate verification** | Google Cloud Vision Label Detection — checks for "license plate" at >0.7 confidence | $1.50/1K (1K free/mo) |
| **4. LLM fallback** | GPT-4o-mini confirms plate for ambiguous cases (confidence 0.5–0.7) | $0.0003/image |

**Estimated cost at 10,000 uploads/month:** ~$15

### 3. Voting & Leaderboards

**Vote system:** Reddit-style upvote/downvote with composite unique constraint preventing duplicates at the database level.

**Three ranking algorithms:**

| Algorithm | Used For | How It Works |
|-----------|----------|--------------|
| Wilson Score Lower Bound | "Best" leaderboards | Correctly ranks items with few votes (3 up / 0 down < 100 up / 10 down) |
| Reddit Hot Score | "Trending" feed | Log(votes) + time decay (10× votes needed every 12.5 hours) |
| Net Score + date filter | "Top This Week/Month" | Simple and intuitive for time-bounded views |

**Frontend:** Optimistic updates via React `useOptimistic` — vote registers instantly, rolls back on failure.

**Anti-gaming:** Email verification required, 24hr account age minimum, IP logging, coordinated voting detection, shadow-banning.

### 4. Interactive U.S. Map

**Library:** `@mirawision/usa-map-react` — purpose-built for clickable US maps with all 50 states + DC.

| Why This Library | Details |
|-----------------|---------|
| Zero dependencies | No D3, no TopoJSON files |
| Per-state customization | `fill`, `stroke`, `onClick`, `onHover`, custom tooltips |
| TypeScript | `USAStateAbbreviation` type, full type safety |
| Accessible | Keyboard navigation, screen reader support |
| Lightweight | ~50 kB gzipped |

**Visual states:**
- **Unlocked** (has uploads): Color fill scaled by plate count (heat map)
- **Locked** (no uploads): Gray fill (`#e0e0e0`)
- **Hover**: Brightness increase + tooltip with state name and plate count
- **Click**: Navigate to `/state/:abbr` gallery and leaderboard

---

## Database Schema

```sql
-- Users (managed by Clerk, synced via webhook)
CREATE TABLE users (
  id            UUID PRIMARY KEY,
  clerk_id      TEXT UNIQUE NOT NULL,
  username      TEXT UNIQUE,
  email         TEXT,
  avatar_url    TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Plates
CREATE TABLE plates (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID REFERENCES users(id),
  image_url       TEXT NOT NULL,
  thumbnail_url   TEXT,
  plate_text      TEXT,
  state           CHAR(2) NOT NULL,
  description     TEXT,
  status          TEXT DEFAULT 'pending'
                  CHECK (status IN ('pending', 'approved', 'rejected')),
  rejection_reason TEXT,
  phash           TEXT,
  upvote_count    INT DEFAULT 0,
  downvote_count  INT DEFAULT 0,
  net_score       INT DEFAULT 0,
  wilson_score    FLOAT DEFAULT 0,
  hot_score       FLOAT DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_plates_state_wilson ON plates(state, wilson_score DESC);
CREATE INDEX idx_plates_hot ON plates(hot_score DESC);
CREATE INDEX idx_plates_status ON plates(status);
CREATE INDEX idx_plates_phash ON plates(phash);

-- Votes
CREATE TABLE votes (
  user_id     UUID REFERENCES users(id),
  plate_id    UUID REFERENCES plates(id),
  value       SMALLINT CHECK (value IN (-1, 1)),
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, plate_id)
);

-- Comments (nice-to-have)
CREATE TABLE comments (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES users(id),
  plate_id    UUID REFERENCES plates(id),
  parent_id   UUID REFERENCES comments(id),
  body        TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- State stats (materialized view, refreshed every 5 min)
CREATE MATERIALIZED VIEW state_stats AS
SELECT
  state,
  COUNT(*) as plate_count,
  COUNT(DISTINCT user_id) as contributor_count,
  MAX(created_at) as latest_upload
FROM plates
WHERE status = 'approved'
GROUP BY state;
```

---

## API Reference

### Express API (Node.js)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/plates` | Required | Upload a new plate photo |
| `GET` | `/api/plates` | Public | Browse plates (paginated, filterable) |
| `GET` | `/api/plates/:id` | Public | Get single plate details |
| `GET` | `/api/plates/:id/status` | Required | Check moderation status |
| `POST` | `/api/plates/:id/vote` | Required | Submit up/down vote |
| `DELETE` | `/api/plates/:id/vote` | Required | Remove vote |
| `GET` | `/api/leaderboard` | Public | Get leaderboard (`?state=CA&period=week`) |
| `GET` | `/api/states` | Public | All states with plate counts (powers map) |
| `GET` | `/api/states/:abbr` | Public | State gallery and top plates |
| `POST` | `/api/plates/:id/comments` | Required | Add comment |
| `GET` | `/api/plates/:id/comments` | Public | Get comments for a plate |
| `GET` | `/api/stats` | Public | Fun stats (rarest state, most active, etc.) |

### FastAPI Moderation Service (Python)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/moderate` | Run full moderation pipeline on image URL |
| `GET` | `/health` | Health check for Render |

---

## Moderation Pipeline

### Architecture

```
Image URL received
      │
      ▼
┌─────────────────┐
│  Layer 1:       │  File type (magic bytes), dimensions (200×200 – 8000×8000),
│  Pre-checks     │  perceptual hash (Hamming distance ≤5), EXIF validation
│  (local)        │  → REJECT if duplicate or invalid format
└────────┬────────┘
         │ PASS
         ▼
┌─────────────────┐
│  Layer 2:       │  OpenAI omni-moderation-latest (FREE, unlimited)
│  Content Safety │  Catches: sexual, violent, hateful, self-harm, harassment
│  (OpenAI)       │  → REJECT if any category > threshold
└────────┬────────┘
         │ PASS
         ▼
┌─────────────────┐
│  Layer 3:       │  Google Cloud Vision Label Detection
│  Plate Verify   │  Check for "license plate" label at >0.7 confidence
│  (GCP Vision)   │  + SafeSearch Detection
└────────┬────────┘
         │ CONFIDENCE 0.5–0.7 (ambiguous)
         ▼
┌─────────────────┐
│  Layer 4:       │  GPT-4o-mini: "Does this show a physical license plate? YES/NO"
│  LLM Fallback   │  ~$0.0003 per image, only ~10-15% of uploads reach here
│  (GPT-4o-mini)  │  → Final decision
└─────────────────┘
```

### Rate Limiting & Spam Prevention

| Layer | Implementation |
|-------|---------------|
| Upload rate limit | `express-rate-limit`: 10 uploads/hour/user |
| Vote rate limit | 30 votes/minute |
| Read rate limit | 200 requests/15 minutes |
| Bot prevention | Cloudflare Turnstile (free, invisible) |
| Duplicate detection | Perceptual hashing (imagehash) at Hamming distance ≤5 |
| Form protection | Honeypot fields (hidden inputs bots fill) |
| Daily cap | 20 plate uploads/day/user |

---

## Deployment

### Hosting Map

| Service | Platform | Free Tier | Paid (scaled) |
|---------|----------|-----------|---------------|
| React frontend | Vercel | 100 GB bandwidth, 6K build min | $20/mo Pro |
| Express API | Render | 750 hrs/mo (sleeps after 15 min) | $7/mo Starter |
| FastAPI moderation | Render | 750 hrs/mo | $7/mo Starter |
| Database | Supabase | 500 MB DB, 50K auth MAUs | $25/mo Pro |
| Images | Cloudinary | 25 credits/mo (~5K transforms) | $89/mo Plus |
| Cache/Queue | Upstash Redis | 10K commands/day | $10/mo Pro |
| Plate verification | Google Cloud Vision | 1,000 units/mo free | $1.50/1K |
| Content moderation | OpenAI Moderation API | Unlimited, free | Free |
| Authentication | Clerk | 10K MAUs free | $25/mo Pro |
| Bot prevention | Cloudflare Turnstile | Unlimited, free | Free |
| **TOTAL (MVP)** | | **$0/month** | **~$32/month** |

### CI/CD Pipeline

GitHub Actions on push to `main`:
- Lint + type check (ESLint, TypeScript)
- Run tests (Vitest for frontend, Jest + Supertest for API, pytest for moderation)
- Vercel auto-deploys `frontend`
- Render auto-deploys `backend/api` and `backend/moderation`

---

## Research Findings

### Interactive Map Library Comparison

| Library | Bundle (gzip) | Tooltips | Maintenance | Verdict |
|---------|---------------|----------|-------------|---------|
| **@mirawision/usa-map-react** | ~50 kB | Built-in | Active | **Top pick** |
| react-simple-maps | ~35 kB | Needs react-tooltip | Unmaintained 3yr (React 19 fork exists) | Runner-up |
| D3.js direct | ~15 kB | Build from scratch | Active | Max control, steep curve |
| react-usa-map | ~15 kB | None | Archived March 2026 | Do not use |
| react-leaflet | ~50 kB + CSS | Built-in | Active | Overkill |
| react-map-gl (Mapbox) | ~200+ kB | Via layers | Active | Massively overkill |

### Image Moderation API Comparison

| API | Price | Strengths | Weaknesses |
|-----|-------|-----------|------------|
| **Google Cloud Vision** | $1.50/1K (1K free) | Best price-to-capability, mature Node + Python SDKs | No built-in duplicate detection |
| AWS Rekognition | $1.00/1K | 95% accuracy claim | AWS ecosystem lock-in |
| Sightengine | $99/mo Pro | Built-in duplicate search | Expensive for student project |
| Azure Content Safety | Pay-per-use | Most granular severity scoring | Needs separate CV service for plates |
| OpenAI Moderation | **Free** | Unlimited, catches all content categories | No image classification (plate detection) |

### Competitive Landscape

No existing platform combines vanity plate photo sharing with community voting:

- **Plate-tracking apps** (Platespotting, PlateSpot, States and Plates) — Single-player games, no photo sharing
- **Plate lookup sites** (LookupAPlate.com) — Report bad drivers, not celebrate creative plates
- **Reddit** (r/LICENSEPLATES, r/VanityPlates) — Closest analog, but no state organization, leaderboards, or map

### Design Inspiration Sources

| Source | What to Borrow |
|--------|---------------|
| Pinterest | Masonry grid for gallery |
| ProductHunt | Daily leaderboard for "Plate of the Day" |
| iNaturalist | Observation density maps for geographic view |
| Dribbble | Hover-to-reveal for desktop voting |
| Instagram | Card feeds with double-tap-to-upvote for mobile |

---

## Sprint Plan

| Sprint | Days | Focus | Ship Criteria |
|--------|------|-------|---------------|
| **0** | Day 1 | Kickoff + infra | All 4 can clone, install, and start coding |
| **1** | Days 2–5 | Foundation | Upload works, gallery renders, map displays, moderation pipeline runs |
| **2** | Days 6–9 | Core features | Voting works, leaderboards populated, state detail pages live |
| **3** | Days 10–12 | Integration + polish | Mobile responsive, rate limiting, all services talking, tests passing |
| **4** | Days 13–14 | Ship | Bug bash on live URL, README finalized, PR submitted |

---

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.11+

### Local Setup

```bash
# 1. Install workspace dependencies
npm install

# 2. Copy the shared environment template
cp .env.example .env

# 3. Set up Python environment for the moderation service
cd backend/moderation
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
cd ../..

# 4. Start everything from the repo root
npm run dev
```

This launches:

- React frontend at `http://localhost:5173`
- Express API at `http://localhost:4000`
- FastAPI moderation service at `http://localhost:8001`

### Environment Variables

The starter uses a single root `.env.example` so you can get moving quickly. As the app matures, you can split this into service-specific env files for Vercel and Render.

**Shared across services:**
- `SUPABASE_URL`, `SUPABASE_ANON_KEY` — Database
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` — Image storage

**Express API only:**
- `CLERK_SECRET_KEY` — Auth
- `REDIS_URL` — BullMQ + cache
- `MODERATION_SERVICE_URL` — FastAPI endpoint

**FastAPI only:**
- `GOOGLE_APPLICATION_CREDENTIALS` — Google Vision service account path
- `OPENAI_API_KEY` — Content moderation + fallback

**React frontend only:**
- `VITE_CLERK_PUBLISHABLE_KEY` — Auth
- `VITE_API_URL` — Express API base URL

---

## Submission Checklist

- [ ] Live URL to deployed site
- [ ] Public GitHub repository (forked from hack-bu/plate-gallery)
- [ ] Photo upload with state tagging
- [ ] Automated server-side moderation pipeline
- [ ] Upvote/downvote voting with leaderboards
- [ ] Interactive clickable U.S. map
- [ ] README with tech stack, moderation docs, and design decisions
- [ ] Pull request submitted to parent repository
