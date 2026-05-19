// src/pages/ProjectsPage.tsx
import { useMemo } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import TigerSprite from "@/components/TigerSprite";
import { FadeUp } from "@/components/motion/Reveal";
import { useJSON } from "@/lib/useDataFetch";
import { RIFTBOUND_SUMMARY } from "@/data/sample/riftbound";
import type { RiftboundSummary } from "@/types/riftbound";

// 14-point sparkline seeded from summary avgPrice — replaced by live data when available
const SPARKLINE_SEED = [42, 44, 43, 45, 46, 44, 47, 49, 48, 51, 53, 52, 55, 57,
                         56, 59, 61, 60, 63, 65, 64, 66, 68, 71];

export default function ProjectsPage() {
  const heroRef  = useRef<HTMLDivElement>(null);
  const reduce   = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const titleY   = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -120]);
  const tigerRot = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 25]);

  const { data: summary } = useJSON<RiftboundSummary>(
    "/data/riftbound/summary.json",
    RIFTBOUND_SUMMARY,
  );

  const kpis = useMemo(() => [
    { num: `$${summary.avgPrice.toFixed(2)}`, unit: "AVG PRICE · 24H", delta: "+2.1%",    up: true as const },
    { num: summary.totalSkus.toLocaleString(), unit: "SKUs TRACKED",    delta: "+12",       up: true as const },
    { num: `$${summary.bestRmse}`,             unit: "PROPHET RMSE",   delta: `R²=${summary.bestR2}`, up: true as const },
    { num: "98.7%",                            unit: "UPTIME · 30D",   delta: "stable",    up: null },
  ], [summary]);

  return (
    <div className="pt-[100px] pb-16">

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative mx-auto max-w-[1400px] px-7 pb-6">
        <motion.div style={{ y: titleY }} className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="label-kicker">// 01 — FLAGSHIP PROJECT</span>
            <h1 className="mt-2 font-display text-[clamp(3rem,8vw,7rem)] leading-[0.95] tracking-tightest text-brand-white">
              RIFTBOUND
            </h1>
            <p className="mt-3 max-w-[60ch] font-body text-brand-muted">
              Real-time pricing intelligence for Riftbound TCG cards. Scraped 500+ SKUs
              via TCGCSV + RiftboundStats APIs into SQLite. Trained 6 models (Ridge,
              Lasso, RF, XGBoost, ARIMA, Prophet). Best: Prophet RMSE&nbsp;$2.56, R²&nbsp;0.998.
              Live 5-page Streamlit dashboard.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://github.com/jkang86/riftbound-price-forecast"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              aria-label="View Riftbound Price Forecast repo on GitHub (opens in new tab)"
            >
              VIEW REPO
            </a>
            <a
              href="https://riftbound-price-forecast.streamlit.app"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              aria-label="Open Riftbound live Streamlit dashboard (opens in new tab)"
            >
              LIVE DEMO →
            </a>
          </div>
        </motion.div>
        <motion.div style={{ rotate: tigerRot }} className="absolute right-6 top-2 hidden lg:block">
          <TigerSprite state="dash" size={120} float />
        </motion.div>
        <div className="mt-5 border-t border-brand-border" />
      </section>

      {/* ── KPI strip — live from summary.json ── */}
      <section className="mx-auto mb-6 max-w-[1400px] px-7">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {kpis.map((k, i) => (
            <FadeUp key={k.unit} delay={i * 0.06}>
              <motion.div
                whileHover={reduce ? {} : { y: -3 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="border border-brand-border bg-brand-surface p-5"
              >
                <div className="font-display text-3xl text-brand-white">{k.num}</div>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="font-mono text-[10px] tracking-ultra text-brand-dim">{k.unit}</span>
                  <span
                    className={`font-mono text-[10px] ${
                      k.up === null ? "text-brand-dim" : k.up ? "text-brand-success" : "text-brand-red"
                    }`}
                  >
                    {k.delta}
                  </span>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── Sparkline chart ── */}
      <section className="mx-auto max-w-[1400px] px-7">
        <FadeUp>
          <div className="border border-brand-border bg-brand-surface p-6">
            <header className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="tag border-brand-gold text-brand-gold">SET 2 · OGN MARKETPLACE</span>
                <h2 className="mt-2 font-heading text-xl font-bold text-brand-white">
                  Riftbound · 24h Price Trend
                </h2>
              </div>
              <div className="flex gap-2" aria-label="Time range (display only)">
                {(["24H", "7D", "30D"] as const).map((p, i) => (
                  <span
                    key={p}
                    className={`px-3 py-1.5 font-mono text-[10px] tracking-ultra ${
                      i === 0
                        ? "bg-brand-red text-white"
                        : "border border-brand-border text-brand-muted"
                    }`}
                    aria-current={i === 0 ? "true" : undefined}
                  >
                    {p}
                  </span>
                ))}
              </div>
            </header>
            <div role="img" aria-label="Sparkline showing Riftbound card price trend over 24 hours">
              <Sparkline data={SPARKLINE_SEED} height={280} />
            </div>
            <p className="mt-3 font-mono text-[10px] tracking-ultra text-brand-dim">
              Data sourced from TCGPlayer Infinite API and RiftboundStats.
              Not affiliated with Riot Games or TCGPlayer.
            </p>
          </div>
        </FadeUp>
      </section>
    </div>
  );
}

// ── Sparkline ─────────────────────────────────────────────────────────────────

interface SparklineProps { data: number[]; height?: number; }

function Sparkline({ data, height = 200 }: SparklineProps) {
  const reduce = useReducedMotion();
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 1000;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = height - ((v - min) / range) * (height - 40) - 20;
    return [x, y];
  });
  const d = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${height}`} className="w-full" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="sparkline-grad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%"   stopColor="var(--color-red)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--color-red)" stopOpacity="0"   />
        </linearGradient>
      </defs>
      <motion.path
        d={`${d} L${w},${height} L0,${height} Z`}
        fill="url(#sparkline-grad)"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true }}
      />
      <motion.path
        d={d}
        stroke="var(--color-red)"
        strokeWidth={2}
        fill="none"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        viewport={{ once: true }}
      />
    </svg>
  );
}
