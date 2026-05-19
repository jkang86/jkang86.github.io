import type { Config } from "tailwindcss";

// Allows Tailwind opacity modifiers (e.g. bg-brand-bg/80) to work with CSS variables.
// The CSS variable must be a comma-separated RGB tuple: --brand-bg: 11, 11, 14
function withOpacity(varName: string) {
  return ({ opacityValue }: { opacityValue?: string }) =>
    opacityValue !== undefined
      ? `rgba(var(${varName}), ${opacityValue})`
      : `rgb(var(${varName}))`;
}

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          // Mode-invariant accents — hardcoded hex
          red:     "#D60A2E",
          gold:    "#B8924A",
          success: "#3CC774",

          // Theme-switching surfaces — wired to CSS vars via RGB tuples
          bg:      withOpacity("--brand-bg")      as unknown as string,
          surface: withOpacity("--brand-surface") as unknown as string,
          raised:  withOpacity("--brand-raised")  as unknown as string,
          border:  withOpacity("--brand-border")  as unknown as string,

          // Theme-switching text/UI — direct CSS var (no opacity modifier needed)
          white:   "var(--brand-white)",
          muted:   "var(--brand-muted)",
          dim:     "var(--brand-dim)",
          ink:     "var(--brand-ink)",
        },
      },
      fontFamily: {
        display: ["'Bebas Neue'", "Impact", "sans-serif"],
        heading: ["Rajdhani", "sans-serif"],
        body:    ["Inter", "system-ui", "sans-serif"],
        mono:    ["'JetBrains Mono'", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        ultra: "0.18em",
      },
      keyframes: {
        floaty:   { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-6px)" } },
        speeding: { "0%": { transform: "translateX(-20%)" }, "100%": { transform: "translateX(120%)" } },
        glitch:   { "0%,100%": { transform: "translate(0,0)" }, "20%": { transform: "translate(-2px,1px)" }, "40%": { transform: "translate(2px,-1px)" }, "60%": { transform: "translate(-1px,2px)" }, "80%": { transform: "translate(1px,-2px)" } },
      },
      animation: {
        floaty:   "floaty 3s ease-in-out infinite",
        speeding: "speeding 1.6s linear infinite",
        glitch:   "glitch 0.3s steps(2) infinite",
      },
      backgroundImage: {
        "grid-faint": "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
        "scanlines":  "repeating-linear-gradient(0deg, rgba(255,255,255,.02) 0 1px, transparent 1px 3px)",
      },
    },
  },
  plugins: [],
} satisfies Config;
