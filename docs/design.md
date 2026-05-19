# design.md — Visual Design System
# React + Tailwind | Read before writing any CSS, className, or component

---

## Brand Tokens

**Source of truth: `tailwind.config.ts`** — mirrored as CSS vars in `tokens.css`.
Use `bg-brand-*` / `text-brand-*` Tailwind classes. Never hardcode hex anywhere.

| Tailwind class | CSS var | Value | Usage |
|---------------|---------|-------|-------|
| `bg-brand-bg` | `--color-bg` | `#0B0B0E` | Page background |
| `bg-brand-surface` | `--color-surface` | `#15151A` | Cards, panels |
| `bg-brand-raised` | `--color-raised` | `#1F1F26` | Nav, elevated UI |
| `border-brand-border` | `--color-border` | `#2A2A33` | Dividers |
| `text-brand-red` / `bg-brand-red` | `--color-red` | `#D60A2E` | Accent — emphasis, borders, badges |
| `text-brand-gold` / `border-brand-gold` | `--color-gold` | `#B8924A` | Secondary accent |
| `text-brand-white` | `--color-white` | `#F4F4F6` | Primary text |
| `text-brand-muted` | `--color-muted` | `#A0A0AC` | Secondary text |
| `text-brand-dim` | `--color-dim` | `#6E6E78` | Tertiary / placeholder |
| `text-brand-success` | `--color-success` | `#3CC774` | Live badge, positive delta |

> ⚠️ `brand-red` = `#D60A2E` — not `#E2012D`. Use the Tailwind config, not the old plan docs.
> `brand-gold` = `#B8924A` — not `#C9A84C`.

**Dark mode:** Tailwind `darkMode: "class"`. Toggle via `.dark` class on `<html>`.
`brand-red` and `brand-gold` are identical in both modes. Only bg/surface/text swap.

---

## Typography

Tailwind font classes map to Google Fonts:

| Class | Font | Usage |
|-------|------|-------|
| `font-display` | Bebas Neue | `<h1>` hero, `<h2>` section headers |
| `font-heading` | Rajdhani | Card titles, nav, subheadings, buttons |
| `font-body` | Inter | Body copy, descriptions |
| `font-mono` | JetBrains Mono | Tags, badges, labels, timestamps |

**Label pattern** (always): `font-mono text-xs tracking-ultra uppercase text-brand-gold`

`tracking-ultra` = `letter-spacing: 0.18em` (defined in tailwind.config.ts)

Fonts are loaded in `index.html` via Google Fonts preconnect. Never change font source.

---

## Sprite System

All sprite PNGs live in `public/sprites/`. Served at `/sprites/tiger-*.png`.
Consumed via the `<TigerSprite>` component — never raw `<img>` tags.

> ⚠️ File names use hyphens. Prop values use the strings below. Different things.

| `state` prop | File served | Personality |
|-------------|------------|-------------|
| `"excited"` | `tiger-excited.png` | Bug eyes, heart tongue, rosy cheeks — max energy |
| `"dash"` | `tiger-dash.png` | Speed-dashing, squinting, red pixel glitch trail — aggressive |
| `"focused"` | `tiger-focused.png` | Side-profile, red sparkle near eye — calm, analytical |
| `"zoom"` | `tiger-zoom.png` | Ultra-low lurk, narrow eyes — subtle hover moments |

### TigerSprite Usage

```tsx
// Float idle (hero, about)
<TigerSprite state="excited" size={180} float />

// Static with flip
<TigerSprite state="dash" size={120} flip />

// No float (projects card hover)
<TigerSprite state="zoom" size={80} />

// Conditional state based on data
<TigerSprite state={topMoverUp ? "dash" : "focused"} size={120} float />
```

### Page → Sprite mapping

| Route | Sprite | Trigger |
|-------|--------|---------|
| `/` | `excited` | Hero layout + identity card |
| `/about` | `focused` | Idle float near character sheet header |
| `/projects` | `dash` | Parallax scroll rotation in hero |
| `/showcase` | `zoom` | Pop-in on card hover |
| `/gaming` default | `focused` | Idle during chart load |
| `/gaming` price up | `dash` | Swap when top Riftbound mover direction = `"up"` |
| `/resume` | `focused` | Idle near page header |
| `/contact` | `excited` | Static beside GG WP heading |
| CTA hover (all pages) | `excited` | `onMouseEnter` state swap |

**Rules:**
- Max 1–2 sprites visible per section — never more
- Never overlaps text, links, or interactive elements at 375px / 768px / 1440px
- `float` prop is disabled automatically when `useReducedMotion()` returns true
- Hero sprite is NOT lazy — all others pass `loading="lazy"` in the img tag

---

## Layout Scope

| Mode | Routes | Allowed |
|------|--------|---------|
| **Expressive** | `/`, `/gaming` | Asymmetric layouts, glitch text, SpeedLines, ParticleBG |
| **Clean grid** | `/projects`, `/resume` | Symmetric CSS grid, no gimmicks, recruiter-readable |
| **Neutral** | `/about`, `/showcase`, `/contact` | FadeUp, sprites — no glitch |

---

## Component Patterns

All reusable classes are defined in `@layer components` inside `src/styles/index.css`.

### Buttons (already in index.css)

```tsx
// Primary — red fill
<button className="btn btn-primary">VIEW PROJECTS</button>

// Outline — red border, fills on hover
<button className="btn btn-outline">DOWNLOAD RESUME</button>

// Ghost — text only
<button className="btn btn-ghost">SKIP →</button>

// Magnetic wrapper (adds physics pull)
<MagneticButton className="btn btn-primary">BEGIN TOUR →</MagneticButton>
```

### Tags and Labels

```tsx
// Monospace tag (tech stack, filter label)
<span className="tag">PYTHON</span>

// Section kicker (above h2)
<span className="label-kicker">// CHARACTER SHEET</span>

// Live badge (Riftbound, pulsing)
<span className="tag border-brand-red text-brand-red animate-pulse">LIVE</span>
```

### Project Cards

```tsx
<motion.div
  whileHover={{ y: -6, rotate: 0.3 }}
  transition={{ type: "spring", stiffness: 200, damping: 20 }}
  className="border border-brand-border bg-brand-surface p-6
             [clip-path:polygon(0_0,calc(100%-16px)_0,100%_16px,100%_100%,0_100%)]"
>
```

Featured card (Riftbound): `className="... border-brand-red lg:col-span-2"`

### Skill / Health Bars

```tsx
// Parent — gold border track
<div className="h-3 w-full rounded-sm border border-brand-gold bg-brand-surface overflow-hidden">
  {/* Fill — animated with Framer whileInView */}
  <motion.div
    className="h-full bg-gradient-to-r from-brand-red to-red-400"
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
    style={{ transformOrigin: "left" }}
  />
</div>
```

### Section Headers

```tsx
<FadeUp>
  <span className="label-kicker">// CHARACTER SHEET</span>
  <h2 className="mt-2 font-display text-[clamp(2.5rem,5vw,4rem)] tracking-tightest text-brand-white">
    ABOUT ME
  </h2>
  {/* Gold underline via ::after — add class section-title to get it */}
</FadeUp>
```

### Data Status Badge

```tsx
<div className="flex items-center gap-2" aria-live="polite">
  <span className={`h-2 w-2 rounded-full ${cached ? "bg-brand-dim" : "bg-brand-success shadow-[0_0_8px] shadow-brand-success"}`} />
  <span className="font-mono text-[10px] tracking-ultra text-brand-muted uppercase">
    {cached ? `Cached · ${timeSince}` : "Live Data"}
  </span>
</div>
```
