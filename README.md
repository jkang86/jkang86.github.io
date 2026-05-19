# Joseph Kang — Portfolio

Personal portfolio site for Joseph Kang — Data Analyst & CS graduate, Los Angeles.

**Live:** [jkang86.github.io](https://jkang86.github.io)

---

## Stack

| Layer | Tool |
|-------|------|
| Framework | React 18 + TypeScript |
| Build | Vite 5 |
| Routing | React Router v6 + HashRouter |
| Styling | Tailwind CSS v3 + CSS variables |
| Animation | Framer Motion 11 |
| Cinematic | GSAP 3 (hero only) |
| Scroll | Lenis |
| Charts | Recharts |
| CSV | Papa Parse |
| Data pipeline | Node.js scripts + GitHub Actions |

---

## Local Development

```bash
# Clone
git clone https://github.com/jkang86/jkang86.github.io.git
cd jkang86.github.io

# Install (--legacy-peer-deps required — eslint peer dep conflict)
npm install --legacy-peer-deps

# Dev server at http://localhost:5173
npm run dev

# Production build
npm run build

# Preview build
npm run preview
```

---

## Data Pipeline

Riftbound TCG and League of Legends data is fetched weekly via GitHub Actions
and committed to `public/data/`. The app falls back to `src/data/sample/` if
the live files are unavailable.

### Riftbound (no key required)

```bash
node scripts/fetch-riftbound.js
# or
npm run fetch:riftbound
```

Fetches card pricing from [TCGCSV.com](https://tcgcsv.com) (public API).
Writes `public/data/riftbound/summary.json`, `prices.csv`, `top_movers.csv`,
`model_comparison.csv`.

### League of Legends (Riot API key required)

```bash
# Development key from https://developer.riotgames.com (expires every 24h)
RIOT_API_KEY=RGAPI-your-key-here node scripts/fetch-lol.js
# or
npm run fetch:lol
```

Writes `public/data/lol/profile.json`, `champions.json`, `matches.json`.

**Production key setup:**
1. Apply for a personal API key at [developer.riotgames.com](https://developer.riotgames.com)
2. Add it as `RIOT_API_KEY` in GitHub repo Settings → Secrets → Actions
3. The `update-data.yml` workflow reads it automatically

### Automated schedule

`.github/workflows/update-data.yml` runs every Monday at 06:00 UTC.
Trigger manually: Actions tab → "Update Data" → "Run workflow".

---

## Deployment

Push to `main` → GitHub Actions builds and deploys to GitHub Pages automatically.

One-time setup in repo Settings:
- **Pages → Source:** GitHub Actions
- **Secrets → Actions:** add `RIOT_API_KEY`

---

## Legal

See [LEGAL.md](./LEGAL.md) for Riot Games, TCGPlayer, and font attributions.

---

© 2026 Joseph Kang
