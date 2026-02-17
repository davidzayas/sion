# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Dev Commands

- `npm run dev` — Start dev server (Next.js 16)
- `npm run build` — Production build
- `npm run start` — Start production server
- `npm run lint` — Run ESLint (Next.js core-web-vitals + TypeScript rules)

No test framework is configured.

## Architecture

This is a full-stack Next.js 16 (App Router) church website for **Iglesia Evangélica Luterana Sión** in Bayamón, Puerto Rico. The UI is in **Spanish**.

### Tech Stack

- Next.js 16 with App Router, React 19 (Server + Client Components)
- TypeScript 5 (strict mode), path alias `@/*` → `./src/*`
- Tailwind CSS 4 with a custom Luther Rose color theme (gold/blue/red/cream defined in `globals.css`)
- Lucide React for icons

### Data Layer

There is **no database**. All data lives in a single JSON file at `src/data/site-data.json`. The `src/lib/data.ts` module provides typed read/write functions using Node.js `fs` for server-side file I/O. The `SiteData` type contains arrays for: church info, ministries, events, announcements, sermons, gallery photos, prayer requests, newsletter subscribers, bulletins, service schedule, and history.

### Authentication

Simple token-based auth in `src/lib/auth.ts`. Credentials come from env vars (`ADMIN_USERNAME`, `ADMIN_PASSWORD`, `AUTH_SECRET`) with hardcoded defaults. Token is stored in an `admin_token` httpOnly cookie with 24-hour expiry. **Not production-ready** — uses base64 encoding, not proper hashing.

### Middleware

`src/middleware.ts` protects all `/admin/*` routes except `/admin/login` by validating the token cookie and redirecting expired sessions to login.

### API Routes (`src/app/api/`)

All API routes follow a consistent pattern:
- GET is public (no auth required)
- POST, PUT, DELETE require `isAuthed()` check from `lib/auth.ts`
- Routes read/write the JSON data file via `lib/data.ts`
- Standard REST with JSON request/response

### Pages

- **Public pages** (`src/app/(pages)/`): Home, About, History, Ministries (with `[id]` dynamic route), Events, Schedule, Sermons, Gallery, Giving, Livestream, Contact, New Visitor, Prayer Wall, Youth, Bulletins
- **Admin panel** (`src/app/admin/`): Dashboard with stats, plus CRUD management pages for all content types. Has its own `layout.tsx` with sidebar navigation.

### Key Components (`src/components/`)

- `Navbar.tsx` — Responsive nav with mobile hamburger menu
- `Hero.tsx` — Homepage hero with gradient, Luther Rose watermark, service info card
- `Footer.tsx` — 4-column footer with social links
- `LutherRose.tsx` — SVG church logo (gold ring, blue circle, white petals, red heart, black cross)
- `SimpleEditor.tsx` — Rich text editor with formatting toolbar (used in admin for sermons/bulletins)

## Environment Variables

```
ADMIN_USERNAME    # default: "admin"
ADMIN_PASSWORD    # default: "sion2026"
AUTH_SECRET       # default: "sion-secret-key-change-in-production"
```
