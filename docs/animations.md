# animations.md — Motion System
# Framer Motion 11 + GSAP 3 | React + TypeScript

---

## Core Rules

1. **Framer Motion for everything** — component enters, exits, hovers, layout shifts
2. **GSAP for hero cinematics ONLY** — the "THIS IS / JOSEPH / KANG" letter reveal
3. **`useReducedMotion()` gates every animation** — no exceptions
4. **Only `transform` and `opacity`** — never animate width/height/top/left/margin
5. **`once: true` in every `viewport` prop** — animations don't replay on scroll up

---

## Reduced Motion Pattern

Import at the top of every animated component:

```tsx
import { useReducedMotion } from "framer-motion";

export default function MyComponent() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      animate={reduce ? {} : { opacity: 1, y: 0 }}
      initial={reduce ? {} : { opacity: 0, y: 24 }}
    >
```

For loops (sprite float, particle canvas):
```tsx
// TigerSprite — already implemented correctly:
animate={float && !reduce ? { y: [0, -8, 0] } : undefined}

// Particle canvas in ParticleBG:
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reduce) requestAnimationFrame(loop);
```

---

## Timing Reference

| Interaction | Duration | Easing | Framer equivalent |
|-------------|----------|--------|-------------------|
| Hover | 200ms | ease-out | `transition={{ duration: 0.2 }}` |
| Card lift | 250ms | spring | `type: "spring", stiffness: 200, damping: 20` |
| Scroll entrance | 500ms | expo | `[0.22, 1, 0.36, 1]` |
| Sprite float loop | 3s | easeInOut | `repeat: Infinity, ease: "easeInOut"` |
| Page transition | 400ms | expo | `[0.22, 1, 0.36, 1]` |
| Skill bar fill | 800ms | expo | `[0.16, 1, 0.3, 1]` + stagger |
| Stagger gap | 80ms per child | — | `staggerChildren: 0.08` |
| GSAP hero reveal | 1100ms | expo.out | `ease: "expo.out"` |

---

## Core Components (already built)

### FadeUp / Stagger / StaggerItem (`src/components/motion/Reveal.tsx`)

```tsx
// Single element fade-up
<FadeUp delay={0.2}>
  <h2>ABOUT ME</h2>
</FadeUp>

// Staggered list
<Stagger gap={0.08}>
  {items.map((item) => (
    <StaggerItem key={item.id}>
      <Card data={item} />
    </StaggerItem>
  ))}
</Stagger>
```

### Page Transition (App.tsx — already implemented)

```tsx
<AnimatePresence mode="wait">
  <motion.div
    key={location.pathname}
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
  >
```

### MagneticButton (already built)

Applies physics-based cursor pull. Use on primary CTAs only — not nav links.

---

## Patterns to Implement

### Card hover lift

```tsx
<motion.div
  whileHover={reduce ? {} : { y: -6, rotate: 0.3 }}
  transition={{ type: "spring", stiffness: 200, damping: 20 }}
  className="border border-brand-border bg-brand-surface ..."
>
```

### Scroll-triggered whileInView

```tsx
// For any element that should animate in once on scroll:
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
>
```

### Skill bar fill (AboutPage + ResumePage)

```tsx
// Map over skills array with index for stagger:
{skills.map((skill, i) => (
  <div key={skill.name} className="...">
    <div className="h-3 border border-brand-gold bg-brand-surface overflow-hidden">
      <motion.div
        className="h-full bg-gradient-to-r from-brand-red to-red-400"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
          delay: reduce ? 0 : i * 0.1,
        }}
        style={{ transformOrigin: "left", width: `${skill.pct}%` }}
      />
    </div>
  </div>
))}
```

### Glitch effect — Hero + Gaming sections ONLY

```tsx
// Add data-glitch attribute to trigger via Framer variants
const glitchVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    x: [0, -4, 4, -2, 2, 0],
    transition: { duration: 0.5, times: [0, 0.1, 0.3, 0.5, 0.7, 1] },
  },
};

<motion.h2
  variants={glitchVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
```

**Never apply glitch to `/projects` or `/resume`.**

### Stat counter roll-up (HomePage)

```tsx
function Counter({ target }: { target: number }) {
  const reduce = useReducedMotion();
  const [val, setVal] = useState(reduce ? target : 0);

  return (
    <motion.span
      onViewportEnter={() => {
        if (reduce) return;
        let start = 0;
        const step = () => {
          start += Math.ceil(target / 40);
          setVal(Math.min(start, target));
          if (start < target) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }}
    >
      {val}
    </motion.span>
  );
}
```

### Tiger sprite conditional state swap

```tsx
// GamingPage — swap based on live data:
const [spriteState, setSpriteState] = useState<TigerState>("focused");

useEffect(() => {
  if (!topMover) return;
  setSpriteState(topMover.direction === "up" ? "dash" : "focused");
}, [topMover]);

<TigerSprite state={spriteState} size={140} float />
```

---

## GSAP — Scope & Rules

**GSAP is used only in `HomePage.tsx` for the cinematic letter reveal.**
Do not add GSAP to any other page or component.

```tsx
// HomePage.tsx — correct pattern (already implemented):
useEffect(() => {
  if (reduce || !titleRef.current) return;
  const lines = titleRef.current.querySelectorAll<HTMLElement>("[data-line]");
  const ctx = gsap.context(() => {
    gsap.from(lines, {
      yPercent: 110,
      rotate: 4,
      opacity: 0,
      duration: 1.1,
      ease: "expo.out",
      stagger: 0.12,
    });
  }, titleRef);
  return () => ctx.revert(); // ← always clean up
}, [reduce]);
```

If you need a cinematic entrance on a new page, use Framer Motion variants — not GSAP.

---

## SpeedLines (already built)

Decorative SVG accent — use at section boundaries on `/` and `/gaming` only.

```tsx
// Top of hero:
<SpeedLines height={120} count={11} />

// Bottom of a gaming section:
<SpeedLines height={60} count={7} />
```

Never add `SpeedLines` to `/projects` or `/resume`.
