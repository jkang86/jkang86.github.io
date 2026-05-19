// src/pages/ShowcasePage.tsx
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup, useReducedMotion } from "framer-motion";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import TigerSprite from "@/components/TigerSprite";
import { FadeUp } from "@/components/motion/Reveal";

interface Project {
  id: string;
  title: string;
  tag: string;
  year: string;
  tags: string[];
  /** CSS variable reference — e.g. "var(--color-red)" */
  colorVar: string;
  description: string;
  github: string;
  live?: string;
  badge?: "LIVE";
}

const PROJECTS: Project[] = [
  {
    id: "riftbound",
    title: "Riftbound Price Forecast",
    tag: "DATA",
    year: "2025",
    tags: ["DATA", "ML"],
    colorVar: "var(--color-red)",
    description:
      "500+ SKUs, 6 models (Ridge, Lasso, RF, XGBoost, ARIMA, Prophet). Best: Prophet RMSE $2.56, R² 0.998. Live 5-page Streamlit dashboard.",
    github: "https://github.com/jkang86/riftbound-price-forecast",
    live: "https://riftbound-price-forecast.streamlit.app",
    badge: "LIVE",
  },
  {
    id: "grade-predictor",
    title: "Student Grade Predictor",
    tag: "ML",
    year: "2025",
    tags: ["DATA", "ML"],
    colorVar: "var(--color-gold)",
    description:
      "12+ ML models via R/caret. 18% RMSE reduction over baseline. Full EDA with cross-validation and feature selection.",
    github: "https://github.com/jkang86/Predicting-Students-Final-Grades",
  },
  {
    id: "service-sim",
    title: "Service Efficiency Sim",
    tag: "SIMULATION",
    year: "2024",
    tags: ["TOOLS"],
    colorVar: "var(--color-gold)",
    description:
      "Monte Carlo simulation — 1,000+ service arrivals. 76% wait time reduction identified through optimal staffing model.",
    github: "https://github.com/jkang86/service-efficiency-simulation",
  },
  {
    id: "numerical-solver",
    title: "Numerical Method Solver",
    tag: "SIMULATION",
    year: "2024",
    tags: ["TOOLS"],
    colorVar: "var(--color-red)",
    description:
      "Euler, Adams–Bashforth/Moulton, FEM implementations with convergence plots and error norm analysis.",
    github: "https://github.com/jkang86/Numerical-Method-Solver-",
  },
];

type Filter = "ALL" | "DATA" | "ML" | "TOOLS";
const FILTERS: Filter[] = ["ALL", "DATA", "ML", "TOOLS"];

export default function ShowcasePage() {
  const [filter, setFilter] = useState<Filter>("ALL");
  const [active, setActive] = useState<Project | null>(null);
  const [grid] = useAutoAnimate<HTMLDivElement>();
  const reduce = useReducedMotion();
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const list =
    filter === "ALL" ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(filter));

  // Close modal on Escape + return focus to trigger
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active]);

  // Focus close button when modal opens; return focus to trigger when it closes
  useEffect(() => {
    if (active) {
      // Small delay so AnimatePresence finishes mounting before we focus
      const t = setTimeout(() => closeRef.current?.focus(), 50);
      return () => clearTimeout(t);
    } else if (triggerRef.current) {
      triggerRef.current.focus();
      triggerRef.current = null;
    }
  }, [active]);

  return (
    <div className="pt-[100px] pb-20">
      <section className="mx-auto max-w-[1400px] px-7">
        <FadeUp>
          <span className="label-kicker">// FIELD WORK</span>
          <h1 className="mt-3 font-display text-[clamp(3rem,8vw,6rem)] leading-[0.95] tracking-tightest text-brand-white">
            SHOWCASE
          </h1>
        </FadeUp>

        {/* Filter pills */}
        <div
          className="mt-8 mb-6 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Project filters"
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              role="tab"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={`relative px-4 py-2 font-mono text-xs tracking-ultra transition-colors ${
                filter === f ? "text-brand-red" : "text-brand-muted hover:text-brand-white"
              }`}
            >
              {f}
              {filter === f && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 -z-10 border border-brand-red"
                />
              )}
            </button>
          ))}
        </div>

        <LayoutGroup>
          <div
            ref={grid}
            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {list.map((p) => (
              <motion.button
                key={p.id}
                layoutId={`card-${p.id}`}
                onClick={(e) => {
                  triggerRef.current = e.currentTarget as HTMLButtonElement;
                  setActive(p);
                }}
                whileHover={reduce ? {} : { y: -4 }}
                className="relative overflow-hidden border border-brand-border bg-brand-surface p-6 text-left aspect-[4/3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-red focus-visible:outline-offset-2"
                aria-label={`View ${p.title} details`}
              >
                {p.badge && (
                  <span className="tag mb-3 inline-flex items-center gap-1.5 border-brand-red text-brand-red">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-red animate-pulse" aria-hidden="true" />
                    {p.badge}
                  </span>
                )}
                <span className="font-mono text-[10px] tracking-ultra text-brand-gold">
                  {p.year} · {p.tag}
                </span>
                <h3 className="mt-3 font-display text-3xl tracking-tight text-brand-white">
                  {p.title}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
                <div className="absolute bottom-4 right-4 pointer-events-none">
                  <TigerSprite state="zoom" size={56} />
                </div>
                <div
                  className="absolute inset-x-0 bottom-0 h-1"
                  style={{ background: p.colorVar }}
                  aria-hidden="true"
                />
              </motion.button>
            ))}
          </div>

          {/* Project detail modal */}
          <AnimatePresence>
            {active && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 grid place-items-center bg-brand-bg/85 backdrop-blur-sm p-6"
                onClick={() => setActive(null)}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
              >
                <motion.div
                  layoutId={`card-${active.id}`}
                  className="relative w-full max-w-3xl border border-brand-border bg-brand-surface p-8 lg:p-10"
                  onClick={(e) => e.stopPropagation()}
                >
                  {active.badge && (
                    <span className="tag mb-4 inline-flex items-center gap-1.5 border-brand-red text-brand-red">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-red animate-pulse" aria-hidden="true" />
                      {active.badge}
                    </span>
                  )}
                  <span className="block font-mono text-[10px] tracking-ultra text-brand-gold">
                    {active.year} · {active.tag}
                  </span>
                  <h2
                    id="modal-title"
                    className="mt-3 font-display text-5xl tracking-tightest text-brand-white"
                  >
                    {active.title}
                  </h2>
                  <p className="mt-4 max-w-[60ch] font-body text-sm leading-relaxed text-brand-muted">
                    {active.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {active.tags.map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={active.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline"
                    >
                      GITHUB →
                    </a>
                    {active.live && (
                      <a
                        href={active.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                      >
                        LIVE DEMO →
                      </a>
                    )}
                  </div>
                  <button
                    ref={closeRef}
                    onClick={() => setActive(null)}
                    className="btn btn-ghost mt-4"
                    aria-label="Close project detail"
                  >
                    CLOSE ×
                  </button>
                  <div className="absolute bottom-4 right-4 pointer-events-none">
                    <TigerSprite state="zoom" size={90} />
                  </div>
                  <div
                    className="absolute inset-x-0 bottom-0 h-1"
                    style={{ background: active.colorVar }}
                    aria-hidden="true"
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </section>
    </div>
  );
}
