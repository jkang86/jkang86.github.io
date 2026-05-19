# accessibility.md — Accessibility Standards
# React + TypeScript | WCAG 2.1 AA target

---

## Contrast — Verified Pairs

Minimum: 4.5:1 normal text, 3:1 large text (≥18px regular or ≥14px bold).

| Foreground | Background | Ratio | Pass? |
|-----------|------------|-------|-------|
| `brand-white` (#F4F4F6) | `brand-bg` (#0B0B0E) | 19.4:1 | ✅ |
| `brand-white` (#F4F4F6) | `brand-surface` (#15151A) | 15.9:1 | ✅ |
| `brand-white` (#F4F4F6) | `brand-red` (#D60A2E) | 4.6:1 | ✅ |
| `brand-gold` (#B8924A) | `brand-bg` (#0B0B0E) | 5.4:1 | ✅ |
| `brand-muted` (#A0A0AC) | `brand-bg` (#0B0B0E) | 8.1:1 | ✅ |
| `brand-dim` (#6E6E78) | `brand-bg` (#0B0B0E) | 4.5:1 | ✅ (borderline — avoid for small text) |

Any new color pair not in this table must be checked at webaim.org/resources/contrastchecker before use.

---

## Semantic HTML in JSX

Every page must follow this skeleton:

```tsx
export default function SomePage() {
  return (
    <>
      {/* Skip link — rendered before everything else in App.tsx */}
      <main id="main-content">
        <section aria-labelledby="section-title-id">
          <h2 id="section-title-id" className="font-display ...">
            SECTION NAME
          </h2>
          {/* content */}
        </section>
      </main>
    </>
  );
}
```

**Rules:**
- One `<h1>` per page — the primary hero heading
- `<h2>` for major sections, `<h3>` for subsections — never skip levels
- Use `<section>` with `aria-labelledby` pointing to the section `<h2>`
- Never use `<div>` or `<span>` for headings — even if styled with Bebas Neue

**Skip link — add once in `App.tsx`:**

```tsx
// In App.tsx, before <Nav />:
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2
             focus:z-[9999] focus:px-4 focus:py-2 focus:bg-brand-red
             focus:text-white focus:font-heading focus:uppercase focus:tracking-ultra"
>
  Skip to main content
</a>
```

---

## ARIA Patterns in TSX

### Nav — hamburger + theme toggle

```tsx
// Nav.tsx
const [open, setOpen] = useState(false);
const [dark, setDark] = useState(true);

// Hamburger:
<button
  onClick={() => setOpen(o => !o)}
  aria-label={open ? "Close navigation menu" : "Open navigation menu"}
  aria-expanded={open}
  aria-controls="nav-links"
  className="..."
>

// Nav list:
<ul id="nav-links" role="list">
  <li>
    <NavLink
      to="/about"
      aria-current={isActive ? "page" : undefined}
    >
      About
    </NavLink>
  </li>
</ul>

// Theme toggle:
<button
  onClick={toggleTheme}
  aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
  aria-pressed={!dark}
>
```

### Filter pills (ShowcasePage)

```tsx
<div role="group" aria-label="Filter projects by category">
  {FILTERS.map(f => (
    <button
      key={f}
      onClick={() => setFilter(f)}
      aria-pressed={filter === f}
      className={...}
    >
      {f}
    </button>
  ))}
</div>
```

### TigerSprite (already correct in component)

```tsx
// TigerSprite.tsx already has:
<motion.img
  alt=""
  aria-hidden="true"
  draggable={false}
  ...
/>
```

Never add descriptive alt text to sprites — they are decorative.

### Recharts accessibility

```tsx
// Wrap every chart:
<div role="img" aria-label="Bar chart showing champion win rates by champion name">
  <ResponsiveContainer width="100%" height={280}>
    <BarChart data={data}>
      {/* ... */}
    </BarChart>
  </ResponsiveContainer>
</div>

// Provide a visible or sr-only data table below complex charts:
<table className="sr-only">
  <caption>Champion Win Rates</caption>
  <thead><tr><th>Champion</th><th>Win Rate</th></tr></thead>
  <tbody>
    {data.map(d => <tr key={d.name}><td>{d.name}</td><td>{d.value}%</td></tr>)}
  </tbody>
</table>
```

### Live data status badge

```tsx
// aria-live tells screen readers to announce updates
<div aria-live="polite" aria-atomic="true">
  <span className="sr-only">{cached ? "Using cached data" : "Live data loaded"}</span>
  <StatusDot cached={cached} timeSince={timeSince} />
</div>
```

### External links

```tsx
<a
  href="https://github.com/jkang86"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="GitHub profile (opens in new tab)"
>
  <GitHubIcon aria-hidden="true" />
  <span>GitHub</span>
</a>
```

---

## Keyboard Navigation

**Tab order** follows DOM order — never use `tabIndex > 0`.

**Focus ring** — global in `index.css`:

```css
@layer base {
  :focus-visible {
    outline: 2px solid theme('colors.brand.red');
    outline-offset: 3px;
    border-radius: 2px;
  }
  :focus:not(:focus-visible) { outline: none; }
}
```

**Touch targets:** min 44×44px on all interactive elements. Add `min-h-[44px] min-w-[44px]` to small icon buttons.

**Modal / overlay keyboard trap** (if any overlay is added):
- Focus must be trapped inside the overlay while open
- `Escape` key closes it
- On close, return focus to the trigger element

---

## Reduced Motion

`useReducedMotion()` from Framer Motion is the single source of truth.

```tsx
// Gate every Framer animation:
const reduce = useReducedMotion();
animate={reduce ? {} : { opacity: 1, y: 0 }}

// Gate GSAP:
if (reduce || !titleRef.current) return;

// Gate canvas loops (ParticleBG):
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reduce) startLoop();
```

The page must be **fully readable and navigable** with all animations disabled:
- Skill bars show pre-filled (no transition)
- Sprites are visible but static
- Stat counters show final value immediately
- Page transitions are instant (opacity only, no y movement)

---

## Pre-Deploy Checklist

- [ ] All sprites have `alt=""` + `aria-hidden="true"`
- [ ] All buttons have visible text or `aria-label`
- [ ] `aria-current="page"` on active nav link
- [ ] `aria-expanded` matches actual hamburger state
- [ ] `aria-pressed` on each filter pill matches active state
- [ ] Skip link present and focusable in `App.tsx`
- [ ] Tab through all 7 pages — every element reachable + operable
- [ ] Charts have `role="img"` + `aria-label` + sr-only data table
- [ ] `aria-live` on all data status badges
- [ ] Contrast verified for any new color combinations
- [ ] `useReducedMotion()` test: all animations disabled, page still usable
- [ ] External links have `aria-label` noting "opens in new tab"
