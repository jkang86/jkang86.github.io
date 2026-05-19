# tests.md — Test Cases & Acceptance Criteria
# React 18 + Vite | v3.0 | All tests start unchecked

| Icon | Meaning |
|------|---------|
| ✅ PASS | Verified |
| ❌ FAIL | Needs fix |
| 🚧 WIP | In progress |
| 👁 MANUAL | Browser/screen reader test required |
| ⏳ UNTESTED | Not yet reached |

---

## TC-AUDIT: Audit Fixes (do before anything else)

| ID | Test | Status |
|----|------|--------|
| TC-AUDIT-01 | ContactPage has NO form element — only GG WP heading + 2 links | ⏳ |
| TC-AUDIT-02 | `/about` route exists and renders AboutPage (character sheet) | ⏳ |
| TC-AUDIT-03 | `/gaming` route exists and renders GamingPage | ⏳ |
| TC-AUDIT-04 | `/resume` route exists and renders ResumePage | ⏳ |
| TC-AUDIT-05 | `/profile` route removed or redirects to `/about` | ⏳ |
| TC-AUDIT-06 | ShowcasePage shows 4 real projects — no LCK Pulse, Deckbuilder, etc. | ⏳ |
| TC-AUDIT-07 | HomePage stats show 4 / 12 / 6 / 3.8 | ⏳ |
| TC-AUDIT-08 | Nav links: Home · About · Projects · Showcase · Gaming · Resume · Contact | ⏳ |
| TC-AUDIT-09 | `vite.config.ts` has correct `base` path or HashRouter in use | ⏳ |
| TC-AUDIT-10 | `papaparse`, `@types/papaparse`, `recharts` in package.json | ⏳ |

---

## TC-BUILD: TypeScript Compilation

| ID | Test | Status |
|----|------|--------|
| TC-BUILD-01 | `tsc --noEmit` passes with zero errors | ⏳ |
| TC-BUILD-02 | `vite build` completes without errors | ⏳ |
| TC-BUILD-03 | No `any` types in any `.ts` or `.tsx` file | ⏳ |
| TC-BUILD-04 | All data interfaces defined in `src/types/` | ⏳ |
| TC-BUILD-05 | `useCSV` and `useJSON` return typed generics, not `any[]` | ⏳ |

---

## TC-NAV: Navigation

| ID | Test | Status |
|----|------|--------|
| TC-NAV-01 | Nav is fixed, visible at all scroll positions | ⏳ |
| TC-NAV-02 | All 7 nav links route to correct pages | ⏳ |
| TC-NAV-03 | Active route has `text-brand-red` + bottom indicator | ⏳ |
| TC-NAV-04 | `aria-current="page"` on active NavLink | ⏳ |
| TC-NAV-05 | Hamburger opens/closes on mobile (< 768px) | 👁 MANUAL |
| TC-NAV-06 | `aria-expanded` on hamburger matches open state | ⏳ |
| TC-NAV-07 | Theme toggle switches dark/light mode | ⏳ |
| TC-NAV-08 | `aria-pressed` on theme toggle matches current mode | ⏳ |
| TC-NAV-09 | Theme persists across route changes | ⏳ |

---

## TC-HOME: HomePage

| ID | Test | Status |
|----|------|--------|
| TC-HOME-01 | GSAP letter reveal: "THIS IS / JOSEPH / KANG." animates in | 👁 MANUAL |
| TC-HOME-02 | GSAP does NOT run when `useReducedMotion()` returns true | ⏳ |
| TC-HOME-03 | ParticleBG renders behind hero content | 👁 MANUAL |
| TC-HOME-04 | Stats show: 4 · 12 · 6 · 3.8 | ⏳ |
| TC-HOME-05 | "BEGIN TOUR →" navigates to `/projects` | ⏳ |
| TC-HOME-06 | "SKIP TO PROJECTS" navigates to `/showcase` | ⏳ |
| TC-HOME-07 | `excited` sprite renders, not lazy-loaded | ⏳ |
| TC-HOME-08 | SpeedLines appear at hero top and bottom | 👁 MANUAL |

---

## TC-ABOUT: AboutPage (character sheet)

| ID | Test | Status |
|----|------|--------|
| TC-ABOUT-01 | Route `/about` renders AboutPage | ⏳ |
| TC-ABOUT-02 | 8 skill bars render with correct labels | ⏳ |
| TC-ABOUT-03 | Skill bar percentages: Python 90, SQL 85, Pandas 88, Excel 80, R 75, Tableau 70, Power BI 68, scikit-learn 78 | ⏳ |
| TC-ABOUT-04 | Skill bars animate in with stagger via `whileInView` | 👁 MANUAL |
| TC-ABOUT-05 | Reduced motion: skill bars pre-filled, no animation | ⏳ |
| TC-ABOUT-06 | Achievements Unlocked: UIC B.S. + IBM cert | ⏳ |
| TC-ABOUT-07 | Quest Log: Freelance Web Dev entry visible | ⏳ |
| TC-ABOUT-08 | `focused` sprite idle float near header | 👁 MANUAL |

---

## TC-PROJECTS: ProjectsPage (Riftbound deep dive)

| ID | Test | Status |
|----|------|--------|
| TC-PROJ-01 | KPIs load from `public/data/riftbound/summary.json` | ⏳ |
| TC-PROJ-02 | KPIs fall back to sample data when JSON unavailable | ⏳ |
| TC-PROJ-03 | Price sparkline renders (Recharts LineChart) | 👁 MANUAL |
| TC-PROJ-04 | VIEW REPO links to correct GitHub repo | ⏳ |
| TC-PROJ-05 | LIVE DEMO links to Streamlit app | ⏳ |
| TC-PROJ-06 | `dash` sprite rotates on scroll parallax | 👁 MANUAL |

---

## TC-SHOWCASE: ShowcasePage

| ID | Test | Status |
|----|------|--------|
| TC-SHOW-01 | Shows exactly 4 real projects | ⏳ |
| TC-SHOW-02 | No fake projects (LCK Pulse, Deckbuilder, Scout HUD, etc.) | ⏳ |
| TC-SHOW-03 | Filter pills work — ALL / DATA / ML / TOOLS | ⏳ |
| TC-SHOW-04 | `aria-pressed` on filter pills updates correctly | ⏳ |
| TC-SHOW-05 | Card click opens modal with real description | ⏳ |
| TC-SHOW-06 | Modal closes on backdrop click and Escape key | ⏳ |
| TC-SHOW-07 | GitHub links on all cards open correct repos | ⏳ |
| TC-SHOW-08 | Riftbound card has LIVE badge and live app link | ⏳ |
| TC-SHOW-09 | `zoom` sprite appears on card hover | 👁 MANUAL |

---

## TC-GAMING: GamingPage

| ID | Test | Status |
|----|------|--------|
| TC-GAME-01 | Route `/gaming` renders GamingPage | ⏳ |
| TC-GAME-02 | Section A: Riftbound KPI strip loads from summary.json | ⏳ |
| TC-GAME-03 | Section A: Top Movers bar chart renders | ⏳ |
| TC-GAME-04 | Section A: Price Forecast line chart renders | ⏳ |
| TC-GAME-05 | Section A: Model Leaderboard table renders | ⏳ |
| TC-GAME-06 | Section A: Falls back to sample-riftbound data on fetch fail | ⏳ |
| TC-GAME-07 | Section A: Attribution footer visible at all viewports | ⏳ |
| TC-GAME-08 | Section A: CTA links to Streamlit app | ⏳ |
| TC-GAME-09 | Sprite swaps: `focused` → `dash` when top mover direction = "up" | ⏳ |
| TC-GAME-10 | Section B: LoL rank card shows tier/LP/wins/losses | ⏳ |
| TC-GAME-11 | Section B: Champion mastery bar chart renders | ⏳ |
| TC-GAME-12 | Section B: LP history line chart renders | ⏳ |
| TC-GAME-13 | Section B: Falls back to sample LoL data on fetch fail | ⏳ |
| TC-GAME-14 | Live/cached badge shows correct state for both sections | ⏳ |
| TC-GAME-15 | All Recharts charts responsive at 375px | 👁 MANUAL |

---

## TC-RESUME: ResumePage

| ID | Test | Status |
|----|------|--------|
| TC-RES-01 | Route `/resume` renders ResumePage | ⏳ |
| TC-RES-02 | Download PDF button has `download` attribute + correct href | ⏳ |
| TC-RES-03 | Work: Freelance Web Developer · Loft Café · June 2025–Present | ⏳ |
| TC-RES-04 | Education: B.S. Math & CS · UIC · 2021–2025 | ⏳ |
| TC-RES-05 | Cert: IBM Data Analyst Professional Certificate · 2025 | ⏳ |
| TC-RES-06 | 8 skill bars with correct percentages (same as AboutPage) | ⏳ |
| TC-RES-07 | No expressive elements — clean grid only | ⏳ |

---

## TC-CONTACT: ContactPage

| ID | Test | Status |
|----|------|--------|
| TC-CON-01 | NO `<form>` element on the page | ⏳ |
| TC-CON-02 | "GG WP." heading visible in brand-red, font-display | ⏳ |
| TC-CON-03 | GitHub link → github.com/jkang86, opens new tab | ⏳ |
| TC-CON-04 | LinkedIn link → linkedin.com/in/jkang86, opens new tab | ⏳ |
| TC-CON-05 | Both links have `aria-label` noting "opens in new tab" | ⏳ |
| TC-CON-06 | `excited` sprite visible beside heading | ⏳ |

---

## TC-SPRITE: Sprite System

| ID | Test | Status |
|----|------|--------|
| TC-SPR-01 | All 4 PNGs load: tiger-excited, tiger-dash, tiger-focused, tiger-zoom | ⏳ |
| TC-SPR-02 | All sprites have `alt=""` + `aria-hidden="true"` | ⏳ |
| TC-SPR-03 | `float` prop animates with `y: [0, -8, 0]` | 👁 MANUAL |
| TC-SPR-04 | `float` prop disabled when `useReducedMotion()` true | ⏳ |
| TC-SPR-05 | `flip` prop applies `scaleX(-1)` | ⏳ |
| TC-SPR-06 | No sprite overlaps text, links, or interactive elements at 375px | 👁 MANUAL |
| TC-SPR-07 | `preloadTigers()` called once in `App.tsx` `useEffect` | ⏳ |
| TC-SPR-08 | Gaming sprite state responds to Riftbound top mover direction | ⏳ |

---

## TC-DATA: Data Fetching

| ID | Test | Status |
|----|------|--------|
| TC-DATA-01 | `useJSON` returns `{ data, loading, cached }` | ⏳ |
| TC-DATA-02 | `useCSV` returns parsed rows with correct types | ⏳ |
| TC-DATA-03 | Both hooks fall back to sample data on 404/network error | ⏳ |
| TC-DATA-04 | `isLiveData` returns false when `lastUpdated` is null | ⏳ |
| TC-DATA-05 | `isLiveData` returns false when data is > 7 days old | ⏳ |
| TC-DATA-06 | All 4 GitHub repo URLs resolve (no 404) | ⏳ |
| TC-DATA-07 | Streamlit live app URL resolves | ⏳ |

---

## TC-A11Y: Accessibility

| ID | Test | Status |
|----|------|--------|
| TC-A11Y-01 | Skip link visible on Tab from any page | 👁 MANUAL |
| TC-A11Y-02 | All interactive elements reachable via Tab | 👁 MANUAL |
| TC-A11Y-03 | All buttons operable via Enter/Space | 👁 MANUAL |
| TC-A11Y-04 | Focus ring visible on all focusable elements | 👁 MANUAL |
| TC-A11Y-05 | Color contrast ≥ 4.5:1 on all text | ⏳ |
| TC-A11Y-06 | `prefers-reduced-motion: reduce` — page static but usable | ⏳ |
| TC-A11Y-07 | Charts have `role="img"` + `aria-label` | ⏳ |
| TC-A11Y-08 | Live data badges have `aria-live="polite"` | ⏳ |

---

## TC-RESP: Responsive

| ID | Test | Status |
|----|------|--------|
| TC-RESP-01 | Layout correct at 375px (iPhone SE) | 👁 MANUAL |
| TC-RESP-02 | Layout correct at 768px (tablet) | 👁 MANUAL |
| TC-RESP-03 | Layout correct at 1440px (desktop) | 👁 MANUAL |
| TC-RESP-04 | No horizontal scroll at any viewport | 👁 MANUAL |
| TC-RESP-05 | Recharts charts resize correctly on mobile | 👁 MANUAL |
| TC-RESP-06 | Sprites repositioned and sized correctly on mobile | 👁 MANUAL |

---

## TC-DEPLOY: Deployment

| ID | Test | Status |
|----|------|--------|
| TC-DEP-01 | `vite build` succeeds | ⏳ |
| TC-DEP-02 | Direct URL navigation works (HashRouter or base path) | ⏳ |
| TC-DEP-03 | GitHub Pages serves the site at jkang86.github.io | ⏳ |
| TC-DEP-04 | GitHub Actions `update-data.yml` runs on schedule | ⏳ |
| TC-DEP-05 | No API key in any committed file | ⏳ |

---

## Summary

| Category | Total | Pass | Manual | Untested |
|----------|-------|------|--------|----------|
| AUDIT | 10 | 0 | 0 | 10 |
| BUILD | 5 | 0 | 0 | 5 |
| NAV | 9 | 0 | 2 | 7 |
| HOME | 8 | 0 | 3 | 5 |
| ABOUT | 8 | 0 | 2 | 6 |
| PROJECTS | 6 | 0 | 2 | 4 |
| SHOWCASE | 9 | 0 | 2 | 7 |
| GAMING | 15 | 0 | 2 | 13 |
| RESUME | 7 | 0 | 0 | 7 |
| CONTACT | 6 | 0 | 0 | 6 |
| SPRITE | 8 | 0 | 3 | 5 |
| DATA | 7 | 0 | 0 | 7 |
| A11Y | 8 | 0 | 5 | 3 |
| RESP | 6 | 0 | 6 | 0 |
| DEPLOY | 5 | 0 | 0 | 5 |
| **TOTAL** | **117** | **0** | **27** | **90** |
