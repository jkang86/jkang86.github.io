# Personal Website Plan — Joseph Kang | Data Analytics & Gaming Portfolio

## Vision

A multi-page portfolio website for **Joseph Kang** that blends **data analytics expertise** with a **T1 esports-inspired aesthetic**. The site uses a **red, white, and gold** color scheme inspired by T1 (the Korean League of Legends pro team), with clean data visualizations, particle animations, and a dark-themed UI that's professional enough for recruiters while showcasing a passion for gaming and analytics.

---

## Owner Details

- **Name**: Joseph Kang
- **Tagline**: "Aspiring Data Analyst | Math and CS @ UIC"
- **Education**: B.S. Mathematics & Computer Science, University of Illinois at Chicago (2021–2025)
- **Certifications**: IBM Data Analytics Course (In Progress)
- **Work Experience**: Seeking opportunities
- **GitHub**: [github.com/jkang86](https://github.com/jkang86)
- **LinkedIn**: [linkedin.com/in/jkang86](https://www.linkedin.com/in/jkang86)
- **Profile Image**: Gaming-themed stylized avatar (placeholder)

---

## Target Audience

- Potential employers / recruiters in data analytics
- Collaborators and fellow data enthusiasts
- Gaming analytics community members

---

## Tech Stack

| Layer        | Choice                              | Rationale                                                    |
| ------------ | ----------------------------------- | ------------------------------------------------------------ |
| Framework    | **HTML / CSS / JavaScript**         | Simple, no build step, easy to host on GitHub Pages          |
| Styling      | **Custom CSS + CSS variables**      | Full control over T1-themed aesthetic + light/dark mode       |
| Charts       | **Chart.js + D3.js**                | Chart.js for standard charts, D3 for custom gaming visuals   |
| Hosting      | **GitHub Pages**                    | Free, version-controlled, custom domain support              |
| Icons/Assets | **Font Awesome + custom SVGs**      | Lightweight iconography                                      |
| Particles    | **Custom canvas or particles.js**   | Floating particle background on hero section                 |

---

## Design Direction

### T1-Inspired Color Palette
- **Primary background (dark)**: `#0a0a0a` (near-black)
- **Secondary background**: `#1a1a2e` (dark navy)
- **T1 Red (primary accent)**: `#E2012D` (T1's signature red)
- **T1 Gold (secondary accent)**: `#C9A84C` (warm gold for highlights, borders, icons)
- **White**: `#FFFFFF` (text, cards, contrast elements)
- **Light mode background**: `#F5F5F5` (off-white)
- **Light mode surface**: `#FFFFFF`

### Typography
- **Headings**: Rajdhani or Orbitron (bold, slightly futuristic)
- **Body**: Inter or Roboto (clean sans-serif)

### Gaming Aesthetic Touches
- Hexagonal borders on cards and sections
- Health-bar-style skill meters (red fill with gold border)
- "Level up" micro-animations on scroll
- Crosshair hover effects on interactive elements
- T1 logo-inspired geometric patterns as decorative elements

### Light/Dark Mode Toggle
- Default: **Dark mode**
- Toggle button in navigation bar
- CSS variables swap for seamless theme switching
- Both modes maintain T1 red + gold accent identity

---

## Site Structure (Multi-Page)

### Page 1: Home / Landing (`index.html`)
- **Particle background animation** — floating dots connected by lines on canvas, red/gold/white particles on dark background
- **Hero section**: "Joseph Kang" + tagline "Aspiring Data Analyst | Math and CS @ UIC"
- **Navigation bar**: sticky, T1 red accent, links to all pages, light/dark toggle
- **Quick stats banner** — "player stats card" with animated counters (placeholder numbers):
  - Projects Completed: 5+
  - Tools Mastered: 8+
  - Languages: 4+
  - GPA or similar academic stat (placeholder)
- **Call-to-action buttons**: "View Projects", "Download Resume", "Contact Me"
- **Gaming-themed avatar** as profile visual

### Page 2: About Me (`about.html`)
- **Profile section** — gaming avatar + short bio about Joseph
- **"Character Sheet" layout**:
  - **Skill bars / radar chart** for tools:
    - Python, SQL, Excel (core)
    - Tableau, Power BI (BI tools)
    - R, SPSS, SAS (statistical tools)
  - **"Achievements Unlocked"** section:
    - B.S. Mathematics & Computer Science — UIC (2021–2025)
    - IBM Data Analytics Course (In Progress)
  - **"Quest Log"** — vertical timeline (empty/placeholder for future work experience, labeled "Seeking Opportunities")
- **Hobbies & interests** — gaming (League of Legends, CS2), data exploration, esports analytics

### Page 3: Projects (`projects.html`)
- **Filterable project grid** — filter by category: `All | Simulation | Machine Learning | Analytics`
- **3 Featured Project Cards**:

  1. **Service Efficiency Simulation**
     - Monte Carlo simulation of customer arrival and service processes using Poisson and Normal distributions, with Taguchi Loss Function analysis
     - Tools: Julia
     - Link: [GitHub](https://github.com/jkang86/service-efficiency-simulation)

  2. **Numerical Method Solver**
     - Euler, Adams–Bashforth/Moulton Predictor–Corrector methods, and FEM framework for solving boundary value problems with convergence plots
     - Tools: Julia, Jupyter Notebook
     - Link: [GitHub](https://github.com/jkang86/Numerical-Method-Solver-)

  3. **Predicting Student Final Grades**
     - Predicting student grades in Math and Portuguese using regression, classification, and ensemble ML models with EDA and RMSE comparison
     - Tools: R
     - Link: [GitHub](https://github.com/jkang86/Predicting-Students-Final-Grades)

- Each card: thumbnail placeholder, title, description, tool tags, GitHub link
- Hover effect: slight lift + red/gold glow

### Page 4: Gaming Analytics Hub (`gaming.html`)
- **Decorative / visual showcase only** — no real data required
- **Sample Chart.js visualizations** with fabricated but realistic data:
  - LoL-themed: Champion win-rate bar chart, rank progression line chart, role distribution doughnut
  - CS2-themed: K/D ratio trend line, map win-rate radar chart, weapon usage bar chart
- **D3.js custom visualization**: One unique/creative visual (e.g., hexagonal stat grid, animated rank ladder)
- **Styled as dashboards** with card layouts, dark backgrounds, and T1 color accents
- Purpose: demonstrates data viz skills in a gaming context

### Page 5: Resume (`resume.html`)
- **Downloadable PDF resume** button (placeholder PDF for now)
- **On-page styled resume**:
  - **Education**: B.S. Mathematics & Computer Science, UIC, 2021–2025
  - **Experience**: "Seeking Opportunities" placeholder section
  - **Technical Skills**: skill bars for Python, SQL, Excel, Tableau, Power BI, R, SPSS, SAS
  - **Certifications**: IBM Data Analytics Course (In Progress)
- Styled to match site theme with T1 accents

### Page 6: Contact (`contact.html`)
- **No contact form** — links only
- **Social links with icons**:
  - GitHub: [github.com/jkang86](https://github.com/jkang86)
  - LinkedIn: [linkedin.com/in/jkang86](https://www.linkedin.com/in/jkang86)
- **Email address** (placeholder or real — to confirm)
- **"GG WP"** or T1-themed sign-off

---

## File Structure

```
Personal Website/
├── index.html                # Home / Landing page
├── about.html                # About Me / Character Sheet
├── projects.html             # Projects showcase
├── gaming.html               # Gaming Analytics Hub (decorative)
├── resume.html               # Resume / Qualifications
├── contact.html              # Contact / Social links
├── plan.md                   # This plan
├── tests.md                  # Test cases
├── css/
│   ├── style.css             # Main stylesheet + CSS variables + themes
│   ├── animations.css        # Animation keyframes & scroll effects
│   └── themes.css            # Light/dark mode variable definitions
├── js/
│   ├── main.js               # Navigation, theme toggle, scroll effects
│   ├── charts.js             # Chart.js + D3 visualizations
│   ├── particles.js          # Canvas particle background animation
│   └── filters.js            # Project grid filter functionality
├── assets/
│   ├── images/               # Project thumbnails, avatar
│   ├── icons/                # Custom SVG icons
│   └── resume.pdf            # Downloadable resume (placeholder)
└── data/
    └── projects.json          # Project data (loaded dynamically)
```

---

## Development Phases

### Phase 1 — Foundation
- [ ] Set up project folder structure and all files
- [ ] Build HTML skeletons for all 6 pages
- [ ] Implement shared navigation component across pages
- [ ] Dark theme CSS with T1 red/white/gold color variables
- [ ] Light/dark mode toggle with CSS variable swapping

### Phase 2 — Content & Styling
- [ ] Hero section with particle canvas background
- [ ] About Me character sheet with skill bars, achievements, quest log
- [ ] Project cards grid with 3 real projects from GitHub
- [ ] Resume page with styled on-page resume
- [ ] Contact page with social links
- [ ] Gaming-themed avatar placeholder

### Phase 3 — Interactivity
- [ ] Chart.js sample visualizations (LoL + CS2 themed)
- [ ] D3.js custom visualization
- [ ] Scroll-triggered fade-in animations
- [ ] Project filter functionality (All | Simulation | ML | Analytics)
- [ ] Animated stat counters on hero page
- [ ] Particle background animation

### Phase 4 — Polish & Deploy
- [x] Mobile responsiveness pass (hamburger nav, stacked layouts)
- [ ] Cross-browser testing (Chrome, Firefox, Edge, Safari)
- [x] Accessibility audit (contrast, alt text, keyboard nav, ARIA)
- [ ] Performance optimization (lazy loading, minification)
- [ ] Deploy to GitHub Pages
- [ ] Custom domain setup (optional)

### Phase 5 — Live Gaming Data Integration (op.gg & Leetify)

#### 5A: Research & API Access
- [ ] Investigate op.gg data access methods (official API, web scraping, or third-party wrappers)
- [ ] Investigate Leetify data access methods (public API, profile embeds, or data export)
- [ ] Investigate Riot Games API (official developer portal) for League of Legends data
- [ ] Investigate Steam/Valve API for CS2 data
- [ ] Document available endpoints, rate limits, and data fields for each source

#### 5B: Legal & Data Compliance Audit
- [ ] Review Riot Games API Terms of Service and Developer Policies
  - Confirm permitted use cases (personal portfolio, non-commercial)
  - Verify data attribution requirements (Riot branding, disclaimers)
  - Check rate limiting and caching requirements
- [ ] Review op.gg Terms of Service
  - Determine if scraping is allowed or if an API/embed is required
  - Confirm acceptable use for displaying data on personal site
- [ ] Review Leetify Terms of Service and privacy policy
  - Check if profile data can be embedded or fetched externally
  - Confirm data usage rights for public profiles
- [ ] Review Steam Web API Terms of Use
  - Check commercial vs non-commercial usage rules
  - Verify attribution requirements
- [ ] Determine if GDPR / data privacy rules apply (e.g., displaying other players' stats)
- [ ] Draft a **Data Attribution & Disclaimer section** for the website footer/gaming page:
  - "Data provided by Riot Games API. Not endorsed by Riot Games."
  - "CS2 stats sourced from Leetify / Steam. Not affiliated with Valve."
  - op.gg attribution if applicable
- [ ] Document compliance checklist and store as `LEGAL.md` in project root

#### 5C: Implementation — League of Legends (Riot API / op.gg)
- [ ] Register for Riot Games Developer API key
- [ ] Build a data fetching layer (JS fetch or serverless function) for:
  - Summoner profile lookup
  - Ranked stats (tier, LP, win/loss)
  - Match history (recent 20 games)
  - Champion mastery data
- [ ] Replace sample Chart.js LoL charts with live data:
  - Champion win-rate bar chart → real champion performance
  - Rank progression line chart → real LP history
  - Role distribution doughnut → real role stats from match history
- [ ] Add op.gg profile embed or link widget as supplementary view
- [ ] Implement client-side caching (localStorage or sessionStorage) to respect rate limits
- [ ] Add loading states and error handling for failed API calls
- [ ] Add last-updated timestamp to gaming dashboard

#### 5D: Implementation — CS2 (Leetify / Steam API)
- [ ] Register for Steam Web API key (if using Steam API directly)
- [ ] Set up Leetify data access (embed, API, or export)
- [ ] Build a data fetching layer for:
  - Player profile stats (K/D, win rate, HLTV rating)
  - Map-specific performance
  - Weapon kill statistics
  - Match history
- [ ] Replace sample Chart.js CS2 charts with live data:
  - K/D trend line → real match K/D history
  - Map win-rate radar → real map performance
  - Weapon kill count bar → real weapon stats
- [ ] Add Leetify profile embed or link widget
- [ ] Implement caching and rate limit compliance
- [ ] Add loading states and error handling

#### 5E: Security & Data Validation
- [ ] **API key security**: Never expose API keys in client-side JavaScript
  - Option A: Use a serverless backend (Cloudflare Workers, Vercel Edge Functions, or Netlify Functions) as a proxy
  - Option B: Pre-fetch data at build time and serve static JSON (no runtime API calls)
  - Option C: Use only public/no-auth endpoints and embeds
- [ ] **Input validation**: Sanitize all API response data before rendering in DOM (prevent XSS from malicious API responses)
- [ ] **CORS handling**: Ensure fetch requests are properly configured for cross-origin API calls
- [ ] **Rate limiting**: Implement request throttling to avoid API bans
  - Cache responses with TTL (e.g., refresh data every 30 minutes, not on every page load)
- [ ] **Data integrity checks**: Validate API response schemas before using data
  - Handle missing fields, null values, unexpected data types gracefully
- [ ] **Content Security Policy (CSP)**: Add CSP headers to restrict allowed script/fetch origins
- [ ] **HTTPS enforcement**: Ensure all API calls and CDN resources use HTTPS
- [ ] **Error disclosure**: Don't expose raw API errors or stack traces to users
- [ ] **Dependency audit**: Review Chart.js, D3.js, and any new dependencies for known vulnerabilities
- [ ] Run a security self-check before deploying live data integration

### Phase 6 — Live Data Polish & Monitoring
- [ ] Add a "Data Sources" or "Attribution" section to the gaming page footer
- [ ] Implement a fallback to sample data if live API calls fail
- [ ] Add visual indicator showing whether data is live or cached
- [ ] Set up periodic data refresh (manual trigger or cron via serverless)
- [ ] Monitor API usage and rate limit consumption
- [ ] Write documentation in `README.md` explaining how to set up API keys for local dev

---

## Decisions Made (from interview)

| Question                        | Decision                                                |
| ------------------------------- | ------------------------------------------------------- |
| Single-page vs multi-page       | **Multi-page** (separate HTML per section)              |
| Charting library                | **Both** — Chart.js for standard, D3.js for custom      |
| Color theme                     | **T1-inspired: Red, White, Gold**                       |
| Contact form                    | **No form** — links only (GitHub + LinkedIn)            |
| Skills to showcase              | Python, SQL, Excel, Tableau, Power BI, R, SPSS, SAS    |
| Social links                    | GitHub + LinkedIn only                                  |
| Projects source                 | Pulled from GitHub repos (3 selected)                   |
| Profile photo                   | Gaming-themed avatar (stylized placeholder)             |
| Background animation            | Particles (floating dots with connecting lines)         |
| Gaming hub content              | Sample charts with fabricated data (decorative only)    |
| Light/dark mode                 | **Yes** — toggle in nav, dark mode default              |
