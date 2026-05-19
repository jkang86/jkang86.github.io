# content.md — Page Content Specifications
# Exact copy, real links, stat values, and field names for all 7 routes

---

## Shared Nav Links

```
Home → /
About → /about
Projects → /projects
Showcase → /showcase
Gaming → /gaming
Resume → /resume
Contact → /contact
```

---

## `/` — HomePage

### Fix required: stat row

Current values are wrong. Replace with:

```tsx
const STATS = [
  { num: 4,    suffix: "",  unit: "PROJECTS BUILT" },
  { num: 12,   suffix: "+", unit: "TOOLS MASTERED"  },
  { num: 6,    suffix: "",  unit: "ML MODELS"        },
  { num: 3.8,  suffix: "",  unit: "GPA"              },
];
```

### Hero copy (keep existing structure)

```
// WELCOME          ← label-kicker
THIS IS             ← data-line, font-display
JOSEPH              ← data-line
KANG.               ← data-line

Data analyst, CS graduate, and front-end builder.
Three minutes to see the work, the data, and the way I think.
Let's load in.      ← font-body text-brand-muted
```

### CTAs

| Button | Class | Destination |
|--------|-------|-------------|
| BEGIN TOUR → | btn-primary (MagneticButton) | `/projects` |
| SKIP TO PROJECTS | btn-outline (MagneticButton) | `/showcase` |

### Identity card (right panel) — keep as-is

---

## `/about` — AboutPage (rewrite from ProfilePage)

### Header

```
// CHARACTER SHEET  ← label-kicker
ABOUT ME            ← h1, font-display
```

Sprite: `focused`, size=140, float, positioned near header right side.

### Bio (max-width 60ch, font-body, text-brand-muted)

> Data analyst and CS graduate based in Los Angeles. I build predictive models,
> automate data pipelines, and create visualizations that make complex patterns
> readable — then deploy them live. Outside of data work, I play League of Legends,
> collect Riftbound TCG cards, and analyze esports statistics for fun.

### Skill bars

```ts
const SKILLS = [
  { name: "Python",       pct: 90 },
  { name: "SQL",          pct: 85 },
  { name: "Pandas",       pct: 88 },
  { name: "Excel",        pct: 80 },
  { name: "R",            pct: 75 },
  { name: "Tableau",      pct: 70 },
  { name: "Power BI",     pct: 68 },
  { name: "scikit-learn", pct: 78 },
];
```

### Achievements Unlocked

```
🏆  B.S. Mathematics & Computer Science
    University of Illinois at Chicago · 2021–2025

🏆  IBM Data Analyst Professional Certificate
    IBM / Coursera · 2025
```

### Quest Log (timeline)

```
2025–Present  Freelance Web Developer · Los Angeles
              Built Loft Café production site — HTML/CSS/JS,
              custom shopping cart, responsive design.
```

### Hobbies row (tags)

`League of Legends` · `Riftbound TCG` · `Data Exploration` · `Esports Analytics`

---

## `/projects` — ProjectsPage (Riftbound deep dive)

### Header

```
// 01 — FLAGSHIP PROJECT    ← label-kicker
RIFTBOUND                    ← h1, font-display
```

Sprite: `dash`, parallax rotation on scroll (already implemented).

### Real KPIs — load from `public/data/riftbound/summary.json`

```tsx
// Replace hardcoded values with:
const { data: summary } = useJSON("/data/riftbound/summary.json", RIFTBOUND_SAMPLE.summary);

const KPIS = [
  { num: `$${summary.avgPrice}`, unit: "AVG PRICE · 24H",  delta: "+2.1%" },
  { num: summary.totalSkus,      unit: "SKUs TRACKED",      delta: "+12"   },
  { num: `$${summary.bestRmse}`, unit: "PROPHET RMSE",      delta: "R²=0.998" },
  { num: "98.7%",                unit: "UPTIME · 30D",      delta: "stable" },
];
```

### Description copy

> Real-time pricing intelligence for Riftbound TCG cards. Scraped 500+ SKUs via
> TCGCSV + RiftboundStats APIs into SQLite. Trained 6 models (Ridge, Lasso, RF,
> XGBoost, ARIMA, Prophet). Best: Prophet RMSE $2.56, R² 0.998.
> Live 5-page Streamlit dashboard.

### Links

| Button | Destination |
|--------|-------------|
| VIEW REPO | `https://github.com/jkang86/riftbound-price-forecast` |
| LIVE DEMO → | `https://riftbound-price-forecast.streamlit.app` |

---

## `/showcase` — ShowcasePage (replace fake projects)

Replace all 6 fake projects with these real ones:

```ts
const PROJECTS = [
  {
    id: "riftbound",
    title: "Riftbound Price Forecast",
    tag: "DATA",
    year: "2025",
    tags: ["DATA", "ML"],
    color: "#D60A2E",
    description: "500+ SKUs, 6 models, Prophet RMSE $2.56, R² 0.998. Live Streamlit dashboard.",
    github: "https://github.com/jkang86/riftbound-price-forecast",
    live:   "https://riftbound-price-forecast.streamlit.app",
    badge:  "LIVE",
  },
  {
    id: "grade-predictor",
    title: "Student Grade Predictor",
    tag: "ML",
    year: "2025",
    tags: ["DATA", "ML"],
    color: "#B8924A",
    description: "12+ ML models via R/caret. 18% RMSE reduction over baseline. Full EDA.",
    github: "https://github.com/jkang86/Predicting-Students-Final-Grades",
  },
  {
    id: "service-sim",
    title: "Service Efficiency Sim",
    tag: "SIMULATION",
    year: "2024",
    tags: ["TOOLS"],
    color: "#B8924A",
    description: "Monte Carlo — 1,000+ arrivals. 76% wait time reduction.",
    github: "https://github.com/jkang86/service-efficiency-simulation",
  },
  {
    id: "numerical-solver",
    title: "Numerical Method Solver",
    tag: "SIMULATION",
    year: "2024",
    tags: ["TOOLS"],
    color: "#D60A2E",
    description: "Euler, Adams–Bashforth/Moulton, FEM — convergence plots + error norms.",
    github: "https://github.com/jkang86/Numerical-Method-Solver-",
  },
];
```

Filter values: `"ALL"`, `"DATA"`, `"ML"`, `"TOOLS"`

---

## `/gaming` — GamingPage (build from scratch)

### Header

```
// DATA ARENA              ← label-kicker
GAMING ANALYTICS           ← h1, font-display
```

SpeedLines above + between sections. Sprite: `focused` → swaps to `dash` when top mover is up.

---

### Section A — Riftbound TCG

**Section label:** `// RIFTBOUND TCG · PRICE INTELLIGENCE`

Data sources:
- `public/data/riftbound/summary.json` → KPI strip
- `public/data/riftbound/top_movers.csv` → Top Movers bar chart
- `public/data/riftbound/prices.csv` → Price Forecast line chart
- `public/data/riftbound/model_comparison.csv` → Model Leaderboard table

**KPI strip** (from summary.json):
`AVG PRICE` · `SKUs TRACKED` · `PROPHET RMSE` · `R²`

**Charts (Recharts):**

| Chart | Type | X | Y | Color |
|-------|------|---|---|-------|
| Price Forecast | LineChart | date | price (line) + forecast (dashed) | red + gold |
| Top Movers | BarChart | card_name | price_change | red=down, brand-success=up |
| Model Leaderboard | HTML table | — | model / rmse / mae / r2 | — |

**CTA:**
```
VIEW FULL DASHBOARD →    → https://riftbound-price-forecast.streamlit.app
```

**Required attribution** (must be visible at all viewports):
> Data sourced from TCGPlayer Infinite API and RiftboundStats.
> Not affiliated with Riot Games or TCGPlayer.

---

### Section B — League of Legends

**Section label:** `// LEAGUE OF LEGENDS · RANKED STATS`

Summoner display: `gamjahtang#galbi` (from `profile.json.summonerName`)

Data sources:
- `public/data/lol/profile.json` → rank card
- `public/data/lol/champions.json` → champion mastery chart
- `public/data/lol/matches.json` → match history + LP trend

**Rank card** (from profile.json):
Tier · Rank · LP · W · L · Win Rate

**Charts (Recharts):**

| Chart | Type | Data field | Color |
|-------|------|-----------|-------|
| Champion Mastery | BarChart | `champions.json` name + mastery_points | brand-red |
| LP History | LineChart | derived from `matches.json` wins/losses | brand-gold |
| Role Distribution | RadialBarChart | derived from `matches.json` | T1 palette |
| KDA Trend | LineChart | `matches.json` kda per match | brand-red |

**Live/cached badge:** compare `profile.json.lastUpdated` to now via `isLiveData()`.

---

## `/resume` — ResumePage (build from scratch)

### Header + download

```
// CAREER RECORD           ← label-kicker
RESUME                     ← h1, font-display

[↓ DOWNLOAD PDF]           ← btn-primary, href="/assets/resume.pdf", download
```

Sprite: `focused`, size=120, float, near header.

### Work Experience

```
Freelance Web Developer
Los Angeles, CA · June 2025–Present

Built production website for Loft Café — HTML/CSS/JS,
custom JavaScript shopping cart, responsive design
across mobile and desktop breakpoints.
```

### Education

```
B.S. Mathematics & Computer Science
University of Illinois at Chicago · 2021–2025
```

### Certifications

```
IBM Data Analyst Professional Certificate
IBM / Coursera · 2025
```

### Skills (same data as /about)

Same `SKILLS` array — same `pct` values — same staggered whileInView animation.

---

## `/contact` — ContactPage (rewrite — REMOVE FORM)

Current ContactPage has a full form. Replace entirely with:

### Header

```
GG WP.                     ← h1, font-display, text-brand-red,
                              font-size clamp(5rem, 12vw, 10rem)
Thanks for stopping by.    ← font-body, text-brand-muted
Let's build something.     ← font-heading, text-brand-white, font-bold
```

Sprite: `excited`, static, beside or slightly overlapping the heading.

### Links (only content on the page)

```tsx
const LINKS = [
  {
    label: "GitHub",
    href:  "https://github.com/jkang86",
    ariaLabel: "GitHub profile (opens in new tab)",
    icon: <GitHubIcon />,
  },
  {
    label: "LinkedIn",
    href:  "https://linkedin.com/in/jkang86",
    ariaLabel: "LinkedIn profile (opens in new tab)",
    icon: <LinkedInIcon />,
  },
];
```

Both links: `target="_blank" rel="noopener noreferrer"`.
No form. No email address. No Calendly. No status panel. Links only.
