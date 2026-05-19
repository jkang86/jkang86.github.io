# CLAUDE.md — Joseph Kang Portfolio
# v3.0 | React 18 + Vite + TypeScript + Tailwind + Framer Motion + GSAP + Lenis
# Read this file first. Then read the relevant /docs file before writing any code.

---

## 1. Role

You are Claude Code — the AI builder of Joseph Kang's portfolio.
Write clean, typed React/TypeScript. Follow the linked docs exactly.
When something is underdefined, open the right docs/ file before guessing.

---

## 2. Project Context

- **Owner:** Joseph Kang — Data Analyst, CS grad (UIC 2025), Los Angeles
- **Site:** jkang86.github.io — 7-route SPA, GitHub Pages via Vite build
- **Aesthetic:** T1 esports-inspired editorial — dark, aggressive, precise
- **Audiences:** Data/analytics recruiters AND esports/gaming analytics community
- **Expressive scope:** `/` and `/gaming` only — `/projects`, `/resume` are clean grids

---

## 3. Tech Stack

| Layer | Tool | Notes |
|-------|------|-------|
| Framework | React 18 + TypeScript | Strict mode |
| Build | Vite 5 | `base: '/jkang86.github.io/'` for GH Pages |
| Routing | React Router v6 + HashRouter | Avoids 404 on GH Pages refresh |
| Styling | Tailwind CSS v3 + tokens.css | `brand-*` classes + CSS vars |
| Animation | Framer Motion 11 | All component animation |
| Cinematic | GSAP 3 | Hero letter reveal ONLY — scope tightly |
| Scroll | Lenis | Smooth scroll via `useLenis` hook |
| Charts | Recharts | React-native, responsive — add via npm |
| CSV | Papa Parse | npm install, not CDN |
| Icons | lucide-react or FA6 | Prefer lucide-react |
| Data | Static JSON/CSV in `public/data/` | Written by GitHub Actions scripts |
| Pipeline | Node.js scripts + GH Actions | Secrets server-side, never client |

---

## 4. Core Priorities

1. **Recruiter-readable** — `/projects` and `/resume` are clean grids, zero gimmicks
2. **T1 aesthetic** — `brand-red`/`brand-gold` on `brand-bg`, Bebas Neue headers
3. **Real data** — LoL + Riftbound from `public/data/`, fall back to `src/data/sample/`
4. **Accessible** — WCAG AA, keyboard nav, `useReducedMotion()` on all animations
5. **Secure** — zero secrets in any tracked file; GitHub Secrets + Actions only

---

## 5. Execution Rules

Violating any of these is a build failure:

- `bg-brand-*` / `text-brand-*` Tailwind classes — zero hardcoded hex in JSX
- Sprites: prop values `excited | dash | focused | zoom` — no other strings
- Framer Motion only — no CSS `transition` or `@keyframes` for component animation
- GSAP scoped to `gsap.context()` with cleanup `ctx.revert()` in `useEffect` return
- `useReducedMotion()` gates every Framer animation and every GSAP timeline
- Sprites never occlude text, links, or interactive elements at any breakpoint
- External links: `target="_blank" rel="noopener noreferrer"`
- No `any` types — write proper interfaces for every data shape
- No secrets / API keys in any file committed to the repo

---

## 6. Workflow

Before writing any code:
1. Check which docs/ file owns the task (§9 below)
2. Read it fully — don't rely on memory across sessions
3. Check `tailwind.config.ts` before adding new classes or tokens
4. Match patterns in existing components before inventing new ones

After writing:
5. Run through relevant test IDs in `docs/tests.md`
6. Confirm: no hardcoded colors, no `any`, no occluded sprites, no missing ARIA

---

## 7. Repository Structure

```
/
├── CLAUDE.md                  ← you are here
├── LEGAL.md
├── public/
│   ├── sprites/               ← tiger-excited/dash/focused/zoom .png
│   └── data/
│       ├── lol/               ← profile.json, champions.json, matches.json
│       └── riftbound/         ← summary.json, prices.csv, model_comparison.csv
├── src/
│   ├── App.tsx                ← HashRouter + AnimatePresence + routes
│   ├── main.tsx
│   ├── styles/
│   │   ├── index.css          ← Tailwind directives + @layer components
│   │   └── tokens.css         ← CSS vars mirroring Tailwind brand tokens
│   ├── lib/
│   │   ├── clsx.ts
│   │   ├── useLenis.ts
│   │   └── useDataFetch.ts    ← useCSV / useJSON / isLiveData
│   ├── data/
│   │   └── sample/
│   │       ├── lol.ts         ← LOL_SAMPLE_DATA fallback
│   │       └── riftbound.ts   ← RIFTBOUND_SAMPLE_DATA fallback
│   ├── types/
│   │   ├── lol.ts             ← LolProfile, LolChampion, etc.
│   │   └── riftbound.ts       ← RiftboundSummary, TopMover, etc.
│   ├── components/
│   │   ├── Nav.tsx            ← fixed nav + hamburger + theme toggle
│   │   ├── TigerSprite.tsx    ← state: excited|dash|focused|zoom
│   │   └── motion/
│   │       ├── MagneticButton.tsx
│   │       ├── ParticleBG.tsx
│   │       ├── Reveal.tsx     ← FadeUp, Stagger, StaggerItem
│   │       └── SpeedLines.tsx
│   └── pages/
│       ├── HomePage.tsx       ✅ built — needs stat values fixed
│       ├── AboutPage.tsx      ❌ build — character sheet, skill bars
│       ├── ProjectsPage.tsx   🚧 exists — needs real data wired
│       ├── ShowcasePage.tsx   🚧 exists — needs real projects
│       ├── GamingPage.tsx     ❌ build — LoL + Riftbound charts
│       ├── ResumePage.tsx     ❌ build — download + on-page resume
│       └── ContactPage.tsx    🚧 exists — REMOVE form, links only
├── scripts/
│   ├── fetch-lol.js
│   ├── fetch-riftbound.js
│   └── package.json
├── .github/workflows/
│   └── update-data.yml
├── docs/                      ← detailed reference docs
├── vite.config.ts
├── tailwind.config.ts
└── package.json
```

---

## 8. Coding Standards

**TypeScript**
- No `any` — write interfaces in `src/types/`
- Props interfaces above each component: `interface Props { ... }`
- Data hooks return typed tuples: `{ data: T, loading: boolean, cached: boolean }`

**React**
- Functional components only; hooks at top, no conditional hooks
- `useEffect` cleanup required for GSAP, Lenis, observers
- Null-guard all `useRef` access: `if (!ref.current) return;`

**Tailwind**
- Use `brand-*` tokens — never raw hex in className strings
- Component variants via `clsx()` — no inline style for colors
- Dark mode via `.dark` class on `<html>` (set in Nav.tsx)

**File naming**
- Pages: `PascalCasePage.tsx`
- Hooks: `useCamelCase.ts`
- Types: `camelCase.ts` inside `src/types/`

---

## 9. Linked Docs

| Task | Read first |
|------|-----------|
| Colors, fonts, sprites, Tailwind classes, component patterns | `docs/design.md` |
| Routes, phases, data pipeline, hook specs, what's built | `docs/plan.md` |
| Test IDs and acceptance criteria | `docs/tests.md` |
| Framer Motion variants, GSAP scope, reduced motion | `docs/animations.md` |
| ARIA, contrast, keyboard nav, focus management | `docs/accessibility.md` |
| Exact copy, stat values, real links, chart field names | `docs/content.md` |

---

## 10. Output Format

- Complete file contents — no truncated snippets unless asked
- First line of every file: `// src/path/to/File.tsx`
- Flag plan deviations with `// NOTE: deviating from docs/plan.md because ...`
- Tasks touching > 3 files: list them all before writing any code

---

## 11. Success Criteria

A task is done when:
- [ ] TypeScript compiles with zero errors (`tsc --noEmit`)
- [ ] No `any` types introduced
- [ ] No hardcoded hex — all colors from `brand-*` or `var(--color-*)`
- [ ] All animations gated on `useReducedMotion()`
- [ ] Every interactive element has ARIA label or visible text
- [ ] Sprites don't overlap text or clickable elements at 375px, 768px, 1440px
- [ ] Relevant `docs/tests.md` test IDs pass on manual check
- [ ] No API key or secret in any tracked file
