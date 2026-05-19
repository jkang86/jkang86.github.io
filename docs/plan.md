# plan.md — Build Plan, Data Architecture & Audit Findings
# React + Vite | v3.0
# Last updated: 2026-05-18

---

## ▶ NEXT SESSION — START HERE

**ALL PHASES COMPLETE ✅**

The site is fully built and ready to deploy. Next steps are manual:
1. `git init` inside `react_final/`, push to `github.com/jkang86/jkang86.github.io`
2. In repo Settings → Pages → Source: **GitHub Actions**
3. In repo Settings → Secrets → Actions: add `RIOT_API_KEY`
4. Push to `main` → deploy workflow fires automatically
5. Run Lighthouse on the live URL; target ≥ 80 perf / ≥ 95 a11y

**Build is passing:** `tsc --noEmit` zero errors, `vite build` clean.
**Install note:** always use `npm install --legacy-peer-deps` (eslint peer dep conflict).
**Deploy:** push `react_final/` content to `jkang86.github.io` repo → Actions auto-deploys.
**Data update:** runs every Monday 06:00 UTC via `update-data.yml`. Requires `RIOT_API_KEY` secret in GitHub repo settings.

---

## Route Map — Current State

```
App.tsx (HashRouter) ← switched from BrowserRouter
├── /                → HomePage       ✅ done + correct stats
├── /about           → AboutPage      ✅ done — character sheet, skill bars
├── /projects        → ProjectsPage   🚧 exists — KPIs still hardcoded (Phase 3)
├── /showcase        → ShowcasePage   ✅ done — real 4 projects, correct filters
├── /gaming          → GamingPage     🚧 stub only — full build is Phase 3
├── /resume          → ResumePage     🚧 stub only — full build is Phase 3
└── /contact         → ContactPage    ✅ done — GG WP + links only, no form
```

---

## Audit Findings — ✅ All resolved (2026-05-18)

| # | File | Issue | Status |
|---|------|-------|--------|
| 1 | `ContactPage.tsx` | Had contact form | ✅ GG WP + links only |
| 2 | `ProfilePage.tsx` | Settings page | ✅ Replaced by `AboutPage.tsx` |
| 3 | `ShowcasePage.tsx` | 6 fake projects | ✅ Real 4 projects |
| 4 | `App.tsx` + `Nav.tsx` | Wrong routes | ✅ HashRouter + all 7 routes |
| 5 | `HomePage.tsx` | Wrong stats | ✅ 4 / 12+ / 6 / 3.8 |
| 6 | `ProjectsPage.tsx` | Hardcoded KPIs | 🚧 Phase 3 — wire via `useJSON` |
| 7 | `vite.config.ts` | No GH Pages base | ✅ Using HashRouter |
| 8 | `Nav.tsx` | No hamburger / theme toggle | ✅ Added both |
| 9 | `package.json` | Missing deps | ✅ Installed with `--legacy-peer-deps` |
| 10 | `src/` | No data hooks / types | 🚧 Phase 3 |
| 11 | `public/data/` | No placeholder data | 🚧 Phase 3 |
| 12 | `.github/` | No Actions workflow | Phase 5 |

---

## Phase Status

### Phase 1 — Foundation ✅ Done
- [x] Vite + React 18 + TypeScript
- [x] Tailwind with `brand-*` tokens + `tokens.css` CSS variable mirror
- [x] Framer Motion + AnimatePresence page transitions
- [x] GSAP in HomePage letter reveal (scoped to `gsap.context()`)
- [x] Lenis + `useLenis` hook
- [x] `TigerSprite` component (states: excited/dash/focused/zoom, float, flip, preload)
- [x] `ParticleBG`, `MagneticButton`, `Reveal` (FadeUp/Stagger/StaggerItem), `SpeedLines`
- [x] `Nav.tsx` shell
- [x] `HomePage` initial build

### Phase 2 — Fix & Extend Existing Pages ✅ Done (2026-05-18)
- [x] `ContactPage.tsx` → GG WP + GitHub/LinkedIn links only, no form
- [x] `ProfilePage.tsx` → replaced by new `AboutPage.tsx` (character sheet, 8 skill bars, achievements, quest log, hobbies)
- [x] `ShowcasePage.tsx` → real 4 projects; filters ALL/DATA/ML/TOOLS; modal with real links
- [x] `HomePage.tsx` → stats fixed (4 / 12+ / 6 / 3.8); CTAs navigate via `useNavigate`
- [x] `Nav.tsx` → all 7 links, hamburger (mobile), theme toggle (localStorage + prefers-color-scheme)
- [x] `App.tsx` → switched to HashRouter; all 7 routes wired
- [x] `GamingPage.tsx` stub created (route live, Phase 3 content pending)
- [x] `ResumePage.tsx` stub created (route live, has download link, Phase 3 content pending)
- [x] `MagneticButton.tsx` TS conflict fixed (Framer Motion v11 — now extends `HTMLMotionProps<"button">`)
- [x] `index.css` `@import` order fixed (must precede `@tailwind` directives)

### Phase 3 — New Pages & Data Layer ✅ Done (2026-05-19)
- [x] deps already in package.json (`papaparse`, `recharts`, `@types/papaparse`) — installed
- [x] Create `src/lib/useDataFetch.ts` — `useCSV`, `useJSON`, `isLiveData`, `timeSince`
- [x] Create `src/types/riftbound.ts` + `src/types/lol.ts`
- [x] Create `src/data/sample/riftbound.ts` + `src/data/sample/lol.ts`
- [x] Create placeholder files: `public/data/riftbound/summary.json` + `top_movers.csv` + `prices.csv` + `model_comparison.csv`
- [x] Create placeholder files: `public/data/lol/profile.json` + `champions.json` + `matches.json`
- [x] Build `GamingPage.tsx` — Section A (Riftbound charts) + Section B (LoL charts)
- [x] Build `ResumePage.tsx` — download button, work/education/certs, skill bars (same as AboutPage), sprite swap on download
- [x] Fix hardcoded hex in `ProjectsPage.tsx` SVG gradient → `var(--color-red)`

### Phase 4 — Polish & Deploy ✅ Done (2026-05-19)
- [x] Mobile pass: touch targets ≥ 44px (nav hamburger + theme toggle); grid/clamp breakpoints audited
- [x] `useReducedMotion()` audit — all Framer animations gated: App.tsx page transitions, Nav entrance, ParticleBG (hidden under reduce), ContactPage whileHover, ShowcasePage card whileHover
- [x] Accessibility: skip link in App.tsx, `id="main-content"` on `<main>`, `:focus-visible` ring in index.css, Nav logo `aria-label`, hamburger `aria-controls="mobile-nav"` + `id` wired, modal Escape handler + focus trap (focus close button on open, return to trigger on close)
- [x] GitHub Pages deploy: `.github/workflows/deploy.yml` (Actions → `actions/deploy-pages@v4`), `public/.nojekyll`
- [x] Bundle: `vite.config.ts` manualChunks — splits vendor-react / vendor-motion / vendor-charts / vendor-gsap; largest chunk 383 kB gzip 105 kB (Recharts)
- [ ] Cross-browser: Chrome, Firefox, Safari, Edge — manual verify on deploy
- [ ] Lighthouse score — run after GitHub Pages deploy

### Phase 5A — Riftbound Data Pipeline ✅ Done (2026-05-19)
- [x] `scripts/fetch-riftbound.js` — discovers Riftbound groups on TCGCSV, writes summary.json / prices.csv / top_movers.csv / model_comparison.csv; graceful fallback if TCGCSV is down
- [x] `GamingPage` Section A wired via `useCSV` / `useJSON`
- [x] Sprite swap: `focused → dash` when top mover direction = `"up"`
- [x] Live/cached badge via `isLiveData()`
- [x] Attribution footer in GamingPage
- [x] `ProjectsPage` KPIs wired to `summary.json` via `useJSON`

### Phase 5B — LoL Data Pipeline ✅ Done (2026-05-19)
- [x] `scripts/fetch-lol.js` — PUUID lookup → summoner → ranked → mastery → matches; champion names from Data Dragon; polite delay per request
- [x] `RIOT_API_KEY` read from `process.env` (store in GitHub Secrets — never commit)
- [x] `GamingPage` Section B wired to `public/data/lol/*.json` via `useJSON`
- [x] Live/cached badge from `profile.json.lastUpdated`
- [x] Fallback to `src/data/sample/lol.ts` on fetch failure
- [x] `.github/workflows/update-data.yml` — runs every Monday 06:00 UTC

### Phase 6 — Legal, Security & README ✅ Done (2026-05-19)
- [x] No-key audit — `grep` over src/ scripts/ public/ found only a comment placeholder `RGAPI-xxx`, no real keys
- [x] `.gitignore` verified — `.env*`, `node_modules/`, `dist/` all excluded
- [x] `LEGAL.md` — Riot Games developer ToS attribution, TCGPlayer/TCGCSV attribution, font licenses
- [x] `README.md` — local dev setup, data pipeline docs (Riftbound + LoL), deploy instructions, secrets setup
- [ ] `README.md` with setup + pipeline docs

---

## Data Architecture

### Public data folder structure

```
public/data/
├── riftbound/
│   ├── summary.json       { lastUpdated, avgPrice, totalSkus, bestRmse, bestR2 }
│   ├── prices.csv         date, card_name, price, forecast
│   ├── model_comparison.csv  model, rmse, mae, r2
│   ├── top_movers.csv     card_name, price_change, change_pct, direction
│   └── feature_importance.csv  feature, importance_score
└── lol/
    ├── profile.json       { summonerName, tier, rank, lp, wins, losses, lastUpdated }
    ├── champions.json     [{ name, mastery_points, level }]
    └── matches.json       [{ win, champion, kills, deaths, assists, kda }]
```

### useDataFetch hook spec (`src/lib/useDataFetch.ts`)

```ts
// CSV: returns parsed rows, loading state, and whether fallback was used
export function useCSV<T>(path: string, fallback: T[]):
  { data: T[]; loading: boolean; cached: boolean }

// JSON: same pattern
export function useJSON<T>(path: string, fallback: T):
  { data: T; loading: boolean; cached: boolean }

// Helper: true if lastUpdated is within maxAgeDays
export function isLiveData(lastUpdated: string | null, maxAgeDays?: number): boolean
```

### Type definitions

**`src/types/riftbound.ts`**
```ts
export interface RiftboundSummary {
  lastUpdated: string | null;
  avgPrice: number;
  totalSkus: number;
  bestRmse: number;
  bestR2: number;
}
export interface TopMover {
  card_name: string;
  price_change: number;
  change_pct: number;
  direction: "up" | "down";
}
export interface ModelRow {
  model: string; rmse: number; mae: number; r2: number;
}
```

**`src/types/lol.ts`**
```ts
export interface LolProfile {
  summonerName: string;
  tier: string; rank: string; lp: number;
  wins: number; losses: number;
  lastUpdated: string | null;
}
export interface LolChampion {
  name: string; mastery_points: number; level: number;
}
export interface LolMatch {
  win: boolean; champion: string;
  kills: number; deaths: number; assists: number; kda: number;
}
```

---

## JS Module Responsibilities

| File | Owns | Key API |
|------|------|---------|
| `App.tsx` | Routing, page transitions | HashRouter + AnimatePresence |
| `Nav.tsx` | Fixed nav, hamburger, theme toggle | `useLocation` for active link |
| `TigerSprite.tsx` | All sprite rendering | `state`, `size`, `float`, `flip` props |
| `useDataFetch.ts` | All data loading | `useCSV`, `useJSON`, `isLiveData` |
| `GamingPage.tsx` | Both data sections | Consumes useCSV + useJSON |
| `ParticleBG.tsx` | Hero canvas animation | Self-contained, respects reducedMotion |

---

## GitHub Actions Workflow

Port from old repo. Adapt for React (`public/data/` path):

```yaml
# .github/workflows/update-data.yml
on:
  schedule: [{ cron: '0 6 * * 1' }]
  workflow_dispatch:
steps:
  - fetch-lol.js   → public/data/lol/profile.json + champions.json + matches.json
  - fetch-riftbound.js → public/data/riftbound/summary.json + top_movers.csv
  - git commit public/data/
```
