# Test Cases — Joseph Kang Personal Website

---

## TC-NAV: Navigation

### TC-NAV-01: Sticky navigation remains visible on scroll
- **Page**: All pages
- **Steps**: Open page → scroll down past hero section
- **Expected**: Navigation bar stays fixed at top of viewport
- **Pass criteria**: Nav bar visible at all scroll positions

### TC-NAV-02: Navigation links route to correct pages
- **Page**: All pages
- **Steps**: Click each nav link (Home, About, Projects, Gaming, Resume, Contact)
- **Expected**: Each link loads the correct HTML page
- **Pass criteria**: All 6 pages are reachable from any page

### TC-NAV-03: Active page is highlighted in nav
- **Page**: All pages
- **Steps**: Navigate to each page
- **Expected**: Current page link has an active/highlighted style (e.g., red underline or bold)
- **Pass criteria**: Active state matches current page on all 6 pages

### TC-NAV-04: Navigation is consistent across all pages
- **Page**: All pages
- **Steps**: Compare nav bar layout and links on each page
- **Expected**: Identical nav structure, order, and styling on every page
- **Pass criteria**: No differences in nav between pages

### TC-NAV-05: Mobile hamburger menu opens and closes
- **Page**: All pages
- **Steps**: Resize to mobile width (< 768px) → tap hamburger icon → tap again
- **Expected**: Menu slides in on tap, closes on second tap or outside click
- **Pass criteria**: Menu toggles correctly, links are tappable

### TC-NAV-06: Mobile menu links navigate correctly
- **Page**: All pages (mobile)
- **Steps**: Open hamburger menu → tap each link
- **Expected**: Navigates to correct page and menu closes
- **Pass criteria**: All links work, menu auto-closes after selection

---

## TC-THEME: Light/Dark Mode Toggle

### TC-THEME-01: Dark mode is default on first visit
- **Page**: Any page
- **Steps**: Open site in incognito/new browser
- **Expected**: Dark theme (dark background, light text) is active
- **Pass criteria**: Background is `#0a0a0a` or similar dark color

### TC-THEME-02: Toggle switches to light mode
- **Page**: Any page
- **Steps**: Click the light/dark mode toggle button
- **Expected**: Background changes to light (`#F5F5F5`), text to dark, accent colors remain red/gold
- **Pass criteria**: All CSS variable-driven colors update correctly

### TC-THEME-03: Toggle switches back to dark mode
- **Page**: Any page
- **Steps**: Click toggle twice (dark → light → dark)
- **Expected**: Returns to dark theme identically to initial state
- **Pass criteria**: No visual differences from initial dark mode

### TC-THEME-04: Theme preference persists across pages
- **Page**: Any page → navigate to another
- **Steps**: Switch to light mode → click a nav link to another page
- **Expected**: Light mode persists on the new page
- **Pass criteria**: Theme stays consistent during navigation

### TC-THEME-05: Theme preference persists across sessions
- **Page**: Any page
- **Steps**: Switch to light mode → close tab → reopen site
- **Expected**: Light mode is still active (stored in localStorage)
- **Pass criteria**: `localStorage` contains theme preference, applied on load

### TC-THEME-06: T1 accent colors remain in both modes
- **Page**: Any page
- **Steps**: Toggle between modes, inspect accent elements (buttons, borders, highlights)
- **Expected**: T1 Red (`#E2012D`) and Gold (`#C9A84C`) are present in both themes
- **Pass criteria**: Accent colors unchanged between modes

---

## TC-HERO: Home / Landing Page

### TC-HERO-01: Name and tagline display correctly
- **Page**: index.html
- **Steps**: Open home page
- **Expected**: "Joseph Kang" displayed prominently with "Aspiring Data Analyst | Math and CS @ UIC" below
- **Pass criteria**: Text is correct, readable, and properly styled

### TC-HERO-02: Particle background animation renders
- **Page**: index.html
- **Steps**: Open home page, observe background
- **Expected**: Floating particles with connecting lines animate smoothly on canvas
- **Pass criteria**: Canvas element renders, particles move, no visual glitches

### TC-HERO-03: Particle animation does not block interaction
- **Page**: index.html
- **Steps**: Try to click buttons and links over the particle canvas
- **Expected**: All buttons and text are clickable; canvas is behind content
- **Pass criteria**: `pointer-events: none` on canvas or proper z-index layering

### TC-HERO-04: Stats banner displays with animated counters
- **Page**: index.html
- **Steps**: Scroll to stats banner (or observe on load if above fold)
- **Expected**: Numbers count up from 0 to final values (e.g., 5+, 8+, 4+)
- **Pass criteria**: Animation triggers, numbers reach correct values

### TC-HERO-05: Stats counter animation triggers on scroll into view
- **Page**: index.html
- **Steps**: If stats are below fold, scroll down to them
- **Expected**: Counter animation starts when banner enters viewport
- **Pass criteria**: Uses Intersection Observer or scroll event, triggers once

### TC-HERO-06: CTA buttons link to correct destinations
- **Page**: index.html
- **Steps**: Click "View Projects", "Download Resume", "Contact Me"
- **Expected**:
  - "View Projects" → projects.html
  - "Download Resume" → downloads resume.pdf or goes to resume.html
  - "Contact Me" → contact.html
- **Pass criteria**: All 3 buttons navigate correctly

### TC-HERO-07: Gaming avatar displays
- **Page**: index.html
- **Steps**: Observe profile/avatar area
- **Expected**: A gaming-themed stylized avatar image is visible
- **Pass criteria**: Image loads without broken image icon, proper sizing

---

## TC-ABOUT: About Me / Character Sheet

### TC-ABOUT-01: Skill bars render for all 8 skills
- **Page**: about.html
- **Steps**: Navigate to About page, scroll to skills section
- **Expected**: Skill bars visible for Python, SQL, Excel, Tableau, Power BI, R, SPSS, SAS
- **Pass criteria**: 8 skill bars rendered with labels and fill levels

### TC-ABOUT-02: Skill bars have health-bar styling
- **Page**: about.html
- **Steps**: Inspect skill bar styling
- **Expected**: Red fill color (`#E2012D`) with gold border (`#C9A84C`), resembling a health bar
- **Pass criteria**: Visual matches health-bar design specification

### TC-ABOUT-03: Skill bars animate on scroll into view
- **Page**: about.html
- **Steps**: Scroll to skill bars section
- **Expected**: Bars fill from 0% to their target width with a smooth animation
- **Pass criteria**: CSS transition or animation triggers on viewport entry

### TC-ABOUT-04: Achievements Unlocked section shows education and certs
- **Page**: about.html
- **Steps**: Scroll to achievements section
- **Expected**:
  - "B.S. Mathematics & Computer Science — UIC (2021–2025)"
  - "IBM Data Analytics Course (In Progress)"
- **Pass criteria**: Both items displayed with achievement/badge styling

### TC-ABOUT-05: Quest Log timeline renders
- **Page**: about.html
- **Steps**: Scroll to quest log / timeline section
- **Expected**: Vertical timeline structure with "Seeking Opportunities" placeholder
- **Pass criteria**: Timeline visual is present even with no entries, shows placeholder text

### TC-ABOUT-06: Hobbies section displays
- **Page**: about.html
- **Steps**: Scroll to hobbies area
- **Expected**: Gaming (LoL, CS2), data exploration, esports analytics mentioned
- **Pass criteria**: Content is present and readable

### TC-ABOUT-07: Radar chart renders (if used instead of/alongside skill bars)
- **Page**: about.html
- **Steps**: Check for radar chart visualization
- **Expected**: Chart.js radar chart with skill categories and values
- **Pass criteria**: Chart renders without errors, labels are readable

---

## TC-PROJ: Projects Page

### TC-PROJ-01: All 3 project cards display
- **Page**: projects.html
- **Steps**: Open projects page
- **Expected**: 3 cards visible: Service Efficiency Simulation, Numerical Method Solver, Predicting Student Final Grades
- **Pass criteria**: All 3 cards rendered with titles

### TC-PROJ-02: Project cards show correct content
- **Page**: projects.html
- **Steps**: Read each card
- **Expected**: Each card has: title, description, tool tags, GitHub link
- **Pass criteria**: Content matches the 3 projects from plan.md

### TC-PROJ-03: GitHub links open correct repositories
- **Page**: projects.html
- **Steps**: Click GitHub link on each card
- **Expected**:
  - Card 1 → github.com/jkang86/service-efficiency-simulation
  - Card 2 → github.com/jkang86/Numerical-Method-Solver-
  - Card 3 → github.com/jkang86/Predicting-Students-Final-Grades
- **Pass criteria**: Links open in new tab, correct repo loads

### TC-PROJ-04: GitHub links open in new tab
- **Page**: projects.html
- **Steps**: Click any GitHub link
- **Expected**: Link opens in a new browser tab (`target="_blank"`)
- **Pass criteria**: Current page stays open, new tab opens with repo

### TC-PROJ-05: Filter buttons display all categories
- **Page**: projects.html
- **Steps**: Observe filter bar
- **Expected**: Buttons for `All | Simulation | Machine Learning | Analytics`
- **Pass criteria**: All 4 filter options visible and styled

### TC-PROJ-06: "All" filter shows all 3 projects
- **Page**: projects.html
- **Steps**: Click "All" filter
- **Expected**: All 3 project cards visible
- **Pass criteria**: No cards hidden

### TC-PROJ-07: Category filters show correct subset
- **Page**: projects.html
- **Steps**: Click each filter category
- **Expected**: Only projects matching the category are shown
  - Simulation → Service Efficiency Simulation, Numerical Method Solver
  - Machine Learning → Predicting Student Final Grades
  - Analytics → (all or subset, depending on tagging)
- **Pass criteria**: Non-matching cards are hidden with smooth transition

### TC-PROJ-08: Active filter has visual indicator
- **Page**: projects.html
- **Steps**: Click a filter button
- **Expected**: Active filter button has distinct style (e.g., red background, underline)
- **Pass criteria**: Only one filter appears active at a time

### TC-PROJ-09: Project card hover effect works
- **Page**: projects.html
- **Steps**: Hover mouse over a project card
- **Expected**: Card lifts slightly (translateY) and shows a red/gold glow/shadow
- **Pass criteria**: Smooth CSS transition, no jank

### TC-PROJ-10: Tool tags display on each card
- **Page**: projects.html
- **Steps**: Inspect each card's tags area
- **Expected**: Tags showing tools used (Julia, R, Jupyter Notebook, etc.)
- **Pass criteria**: Tags are visible, styled as badges/chips

---

## TC-GAME: Gaming Analytics Hub

### TC-GAME-01: Page loads without errors
- **Page**: gaming.html
- **Steps**: Open gaming page, check browser console
- **Expected**: No JavaScript errors, all charts render
- **Pass criteria**: Console is error-free, page fully loads

### TC-GAME-02: LoL champion win-rate bar chart renders
- **Page**: gaming.html
- **Steps**: Scroll to LoL section
- **Expected**: Bar chart with champion names and win-rate percentages (sample data)
- **Pass criteria**: Chart.js bar chart visible, labels readable, bars colored in T1 palette

### TC-GAME-03: LoL rank progression line chart renders
- **Page**: gaming.html
- **Steps**: Scroll to LoL section
- **Expected**: Line chart showing rank over time (sample data)
- **Pass criteria**: Line chart visible with proper axis labels

### TC-GAME-04: LoL role distribution doughnut chart renders
- **Page**: gaming.html
- **Steps**: Scroll to LoL section
- **Expected**: Doughnut chart showing role distribution (Top, Jungle, Mid, ADC, Support)
- **Pass criteria**: All 5 segments visible with legend

### TC-GAME-05: CS2 K/D ratio trend line chart renders
- **Page**: gaming.html
- **Steps**: Scroll to CS2 section
- **Expected**: Line chart showing K/D ratio over matches (sample data)
- **Pass criteria**: Chart renders, line is smooth, axis labeled

### TC-GAME-06: CS2 map win-rate radar chart renders
- **Page**: gaming.html
- **Steps**: Scroll to CS2 section
- **Expected**: Radar chart with CS2 map names (Dust2, Mirage, Inferno, etc.)
- **Pass criteria**: Radar shape visible, labels readable

### TC-GAME-07: CS2 weapon usage bar chart renders
- **Page**: gaming.html
- **Steps**: Scroll to CS2 section
- **Expected**: Bar chart showing weapon kill counts (AK-47, M4A4, AWP, etc.)
- **Pass criteria**: Chart renders correctly with weapon labels

### TC-GAME-08: D3.js custom visualization renders
- **Page**: gaming.html
- **Steps**: Scroll to D3 section
- **Expected**: Unique custom visualization (hexagonal grid, animated rank ladder, or similar)
- **Pass criteria**: SVG/canvas renders, animation works, no console errors

### TC-GAME-09: Charts are responsive
- **Page**: gaming.html
- **Steps**: Resize browser from desktop to mobile width
- **Expected**: All charts resize proportionally, labels remain readable
- **Pass criteria**: No overflow, no cut-off labels, charts fit viewport

### TC-GAME-10: Dashboard card layouts match T1 theme
- **Page**: gaming.html
- **Steps**: Visual inspection
- **Expected**: Cards have dark background, red/gold borders, consistent with site design
- **Pass criteria**: Visual consistency with rest of site

---

## TC-RESUME: Resume Page

### TC-RESUME-01: Download resume button works
- **Page**: resume.html
- **Steps**: Click "Download Resume" button
- **Expected**: resume.pdf downloads (or opens in new tab)
- **Pass criteria**: PDF file initiates download, no 404 error

### TC-RESUME-02: Education section shows correct info
- **Page**: resume.html
- **Steps**: Read education section
- **Expected**: "B.S. Mathematics & Computer Science, University of Illinois at Chicago, 2021–2025"
- **Pass criteria**: Text is correct and complete

### TC-RESUME-03: Experience section shows placeholder
- **Page**: resume.html
- **Steps**: Read experience section
- **Expected**: "Seeking Opportunities" or equivalent placeholder
- **Pass criteria**: Section exists, doesn't look broken or empty

### TC-RESUME-04: Technical skills display with proficiency indicators
- **Page**: resume.html
- **Steps**: Scroll to skills section
- **Expected**: All 8 skills (Python, SQL, Excel, Tableau, Power BI, R, SPSS, SAS) with visual proficiency bars
- **Pass criteria**: All skills listed, bars have fill levels

### TC-RESUME-05: Certifications section shows IBM course
- **Page**: resume.html
- **Steps**: Read certifications
- **Expected**: "IBM Data Analytics Course (In Progress)" displayed
- **Pass criteria**: Text is correct, "In Progress" badge/indicator visible

### TC-RESUME-06: On-page resume styling matches T1 theme
- **Page**: resume.html
- **Steps**: Visual inspection
- **Expected**: Resume styled with T1 colors (red headers, gold accents, dark/light bg)
- **Pass criteria**: Consistent with overall site design

---

## TC-CONTACT: Contact Page

### TC-CONTACT-01: GitHub link displays and works
- **Page**: contact.html
- **Steps**: Click GitHub link
- **Expected**: Opens github.com/jkang86 in new tab
- **Pass criteria**: Correct URL, opens in new tab

### TC-CONTACT-02: LinkedIn link displays and works
- **Page**: contact.html
- **Steps**: Click LinkedIn link
- **Expected**: Opens linkedin.com/in/jkang86 in new tab
- **Pass criteria**: Correct URL, opens in new tab

### TC-CONTACT-03: Social links have Font Awesome icons
- **Page**: contact.html
- **Steps**: Visual inspection
- **Expected**: GitHub icon (fa-github) and LinkedIn icon (fa-linkedin) visible next to links
- **Pass criteria**: Icons render, not broken squares

### TC-CONTACT-04: No contact form is present
- **Page**: contact.html
- **Steps**: Inspect page
- **Expected**: No `<form>` element, no input fields, no submit button
- **Pass criteria**: Page shows links only, no form

### TC-CONTACT-05: GG WP or T1-themed sign-off displays
- **Page**: contact.html
- **Steps**: Scroll to bottom of page
- **Expected**: Playful closing message visible (e.g., "GG WP", T1 reference)
- **Pass criteria**: Sign-off text is present and styled

---

## TC-ANIM: Animations & Visual Effects

### TC-ANIM-01: Scroll-triggered fade-ins work on all pages
- **Page**: All pages
- **Steps**: Scroll down each page
- **Expected**: Sections fade in (opacity 0 → 1) as they enter the viewport
- **Pass criteria**: Animation is smooth, triggers once per element

### TC-ANIM-02: Animations don't re-trigger on scroll up
- **Page**: All pages
- **Steps**: Scroll down past an animated section → scroll back up
- **Expected**: Elements remain visible, animation doesn't replay
- **Pass criteria**: Elements stay in final state after first animation

### TC-ANIM-03: Hover effects on project cards
- **Page**: projects.html
- **Steps**: Hover over each project card
- **Expected**: Card lifts (translateY) with red/gold shadow/glow
- **Pass criteria**: Smooth transition (~0.3s), no layout shift

### TC-ANIM-04: Particle animation performance
- **Page**: index.html
- **Steps**: Open performance monitor, observe for 30 seconds
- **Expected**: Smooth animation at 60fps, no jank or high CPU usage
- **Pass criteria**: Frame rate stable, CPU usage reasonable (< 15%)

### TC-ANIM-05: Animations respect prefers-reduced-motion
- **Page**: All pages
- **Steps**: Enable "Reduce motion" in OS accessibility settings → reload site
- **Expected**: All animations are disabled or significantly reduced
- **Pass criteria**: `@media (prefers-reduced-motion: reduce)` CSS rule active

---

## TC-RESP: Responsive Design

### TC-RESP-01: Desktop layout (> 1024px)
- **Page**: All pages
- **Steps**: View at 1440px width
- **Expected**: Multi-column layouts, full navigation, side-by-side content
- **Pass criteria**: No horizontal scroll, content well-spaced

### TC-RESP-02: Tablet layout (768px–1024px)
- **Page**: All pages
- **Steps**: View at 768px width
- **Expected**: 2-column grid for projects, slightly condensed spacing
- **Pass criteria**: All content accessible, no overlap

### TC-RESP-03: Mobile layout (< 768px)
- **Page**: All pages
- **Steps**: View at 375px width (iPhone SE size)
- **Expected**: Single-column layout, hamburger nav, stacked cards
- **Pass criteria**: All content readable, tappable targets ≥ 44px

### TC-RESP-04: No horizontal overflow on any viewport
- **Page**: All pages
- **Steps**: Resize from 320px to 1920px, check for horizontal scrollbar
- **Expected**: No horizontal scrollbar at any width
- **Pass criteria**: `overflow-x` never triggered

### TC-RESP-05: Charts resize properly on mobile
- **Page**: gaming.html
- **Steps**: View at 375px width
- **Expected**: Charts scale down, labels still readable or hidden gracefully
- **Pass criteria**: No overflow, charts fit within viewport

### TC-RESP-06: Images are responsive
- **Page**: All pages
- **Steps**: Resize viewport
- **Expected**: Images scale with viewport, no stretching or cropping
- **Pass criteria**: `max-width: 100%` applied, aspect ratio maintained

---

## TC-A11Y: Accessibility

### TC-A11Y-01: Color contrast meets WCAG AA
- **Page**: All pages
- **Steps**: Run contrast checker on all text/background combinations
- **Expected**: All text has contrast ratio ≥ 4.5:1 (normal) or ≥ 3:1 (large text)
- **Pass criteria**: Both dark and light modes pass

### TC-A11Y-02: All images have alt text
- **Page**: All pages
- **Steps**: Inspect all `<img>` tags
- **Expected**: Every image has a meaningful `alt` attribute
- **Pass criteria**: No empty or missing alt attributes

### TC-A11Y-03: Keyboard navigation works
- **Page**: All pages
- **Steps**: Navigate entire site using only Tab, Shift+Tab, Enter
- **Expected**: All interactive elements are focusable in logical order
- **Pass criteria**: Visible focus indicator on all focusable elements

### TC-A11Y-04: ARIA labels on interactive elements
- **Page**: All pages
- **Steps**: Inspect theme toggle, hamburger menu, filter buttons
- **Expected**: `aria-label` or `aria-labelledby` on buttons without visible text
- **Pass criteria**: Screen reader can identify all interactive elements

### TC-A11Y-05: Semantic HTML structure
- **Page**: All pages
- **Steps**: Inspect HTML structure
- **Expected**: Proper use of `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, heading hierarchy (h1 → h2 → h3)
- **Pass criteria**: No skipped heading levels, landmarks present

### TC-A11Y-06: Links have descriptive text
- **Page**: All pages
- **Steps**: Inspect all `<a>` tags
- **Expected**: No "click here" or bare URL links; all links have descriptive text or aria-label
- **Pass criteria**: Screen reader would convey link purpose

---

## TC-PERF: Performance

### TC-PERF-01: Page load time under 3 seconds
- **Page**: All pages
- **Steps**: Run Lighthouse or test on slow 3G throttle
- **Expected**: First Contentful Paint < 2s, fully loaded < 3s
- **Pass criteria**: Lighthouse performance score ≥ 80

### TC-PERF-02: No render-blocking resources
- **Page**: All pages
- **Steps**: Check Lighthouse "Eliminate render-blocking resources"
- **Expected**: CSS is loaded efficiently, JS is deferred or async
- **Pass criteria**: No critical render-blocking warnings

### TC-PERF-03: Images are optimized
- **Page**: All pages
- **Steps**: Check image file sizes
- **Expected**: All images < 200KB, use modern formats if possible
- **Pass criteria**: No oversized images

### TC-PERF-04: External libraries loaded via CDN
- **Page**: All pages
- **Steps**: Inspect `<script>` and `<link>` tags
- **Expected**: Chart.js, D3.js, Font Awesome loaded from CDN (not local copies)
- **Pass criteria**: CDN URLs present, load successfully

---

## TC-CROSS: Cross-Browser Compatibility

### TC-CROSS-01: Chrome renders correctly
- **Steps**: Open all pages in Chrome (latest)
- **Pass criteria**: All features work, no visual bugs

### TC-CROSS-02: Firefox renders correctly
- **Steps**: Open all pages in Firefox (latest)
- **Pass criteria**: All features work, CSS grid/flexbox renders same as Chrome

### TC-CROSS-03: Edge renders correctly
- **Steps**: Open all pages in Edge (latest)
- **Pass criteria**: All features work identically to Chrome

### TC-CROSS-04: Safari renders correctly (if testable)
- **Steps**: Open all pages in Safari
- **Pass criteria**: Particle canvas works, CSS variables supported, charts render

---

## TC-DATA: Data & Content Integrity

### TC-DATA-01: projects.json loads correctly
- **Page**: projects.html
- **Steps**: Open browser console, check for fetch errors
- **Expected**: projects.json loads without 404 or CORS errors
- **Pass criteria**: Project cards populated from JSON data

### TC-DATA-02: All GitHub URLs are valid
- **Page**: projects.html, contact.html
- **Steps**: Click each GitHub link
- **Expected**: All links resolve to valid GitHub pages (no 404s)
- **Pass criteria**: 3 project repos + profile page all load

### TC-DATA-03: LinkedIn URL is valid
- **Page**: contact.html
- **Steps**: Click LinkedIn link
- **Expected**: Opens valid LinkedIn profile page
- **Pass criteria**: No 404 or "profile not found"

### TC-DATA-04: Resume PDF exists and downloads
- **Page**: resume.html
- **Steps**: Click download button
- **Expected**: PDF file downloads successfully
- **Pass criteria**: File is a valid PDF, not a 404 page
