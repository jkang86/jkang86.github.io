import type { Config } from "tailwindcss";

/**
 * Brand tokens live HERE, mirrored as CSS variables in src/styles/tokens.css.
 * This means you can use either:
 *   <div className="bg-brand-red text-white">...</div>
 *   <div style={{ background: "var(--color-red)" }}>...</div>
 * Both resolve to the same value.
 */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          red:    "#D60A2E",
          gold:   "#B8924A",
          bg:     "#0B0B0E",
          ink:    "#1A1A1F",
          surface: "#15151A",
          raised: "#1F1F26",
          border: "#2A2A33",
          dim:    "#6E6E78",
          muted:  "#A0A0AC",
          white:  "#F4F4F6",
          success: "#3CC774",
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
        floaty:    { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-6px)" } },
        speeding:  { "0%": { transform: "translateX(-20%)" }, "100%": { transform: "translateX(120%)" } },
        glitch:    { "0%,100%": { transform: "translate(0,0)" }, "20%": { transform: "translate(-2px,1px)" }, "40%": { transform: "translate(2px,-1px)" }, "60%": { transform: "translate(-1px,2px)" }, "80%": { transform: "translate(1px,-2px)" } },
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
