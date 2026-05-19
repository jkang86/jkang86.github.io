// src/pages/ProjectsPage.tsx
import { useMemo } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import TigerSprite from "@/components/TigerSprite";
import { FadeUp } from "@/components/motion/Reveal";
import { useJSON, useCSV } from "@/lib/useDataFetch";
import { RIFTBOUND_SUMMARY, RIFTBOUND_PRICES } from "@/data/sample/riftbound";
import type { RiftboundSummary, PriceRow } from "@/types/riftbound";

export default function ProjectsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const reduce  = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const titleY   = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -120]);
  const tigerRot = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 25]);

  const { data: summary } = useJSON<RiftboundSummary>("/data/riftbound/summary.json", RIFTBOUND_SUMMARY);
  const { data: priceRows } = useCSV<PriceRow>("/data/riftbound/prices.csv", RIFTBOUND_PRICES);

  const kpis = useMemo(() => [
    { num: `$${summary.avgPrice.toFixed(2)}`, unit: "AVG PRICE · LIVE",  delta: "TCGCSV",       up: true as const },
    { num: summary.totalSkus.toLocaleString(), unit: "SKUs TRACKED",      delta: "live",         up: true as const },
    { num: `$${summary.bestRmse.toFixed(4)}`, unit: "BEST MODEL RMSE",   delta: summary.bestModel, up: true as const },
    { num: summary.bestR2.toFixed(4),         unit: "BEST R²",           delta: "stable",       up: null },
  ], [summary]);

  // Filter to XGBoost, pick highest-price card, extract actual + forecast series
  const { sparklineActual, sparklineForecast } = useMemo(() => {
    const xgb = priceRows
      .filter((r) => r.model === "XGBoost")
      .sort((a, b) => a.week.localeCompare(b.week));
    if (!xgb.length) return { sparklineActual: [], sparklineForecast: [] };

    const cardSum = new Map<string, number>();
    xgb.forEach((r) => cardSum.set(r.card_display, (cardSum.get(r.card_display) ?? 0) + r.actual_price));
    const topCard = [...cardSum.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "";

    const filtered = xgb.filter((r) => r.card_display === topCard);
    return {
      sparklineActual:   filtered.map((r) => r.actual_price),
      sparklineForecast: filtered.map((r) => r.predicted_price),
    };
  }, [priceRows]);

  return (
    <div className="pt-[100px] pb-16">

      {/* ── Hero ── */}
      <section ref={heroRef} className="mx-auto max-w-[1400px] px-7 pb-6">
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[1fr_auto]">
          {/* Left — text + buttons */}
          <motion.div style={{ y: titleY }}>
            <span className="label-kicker">// 01 — FLAGSHIP PROJECT</span>
            <h1 className="mt-2 font-display text-[clamp(3rem,8vw,7rem)] leading-[0.95] tracking-tightest text-brand-white">
              RIFTBOUND
            </h1>
            <p className="mt-3 max-w-[60ch] font-body text-brand-muted">
              Real-time pricing intelligence for Riftbound TCG cards. Scraped 500+ SKUs
              via TCGCSV + RiftboundStats APIs into SQLite. Trained 6 models (Ridge,
              Lasso, RF, XGBoost, ARIMA, Prophet). Best: XGBoost RMSE&nbsp;$0.0641, R²&nbsp;0.9986.
              Live 5-page Streamlit dashboard.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
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

          {/* Right — tiger */}
          <motion.div style={{ rotate: tigerRot }} className="hidden justify-center lg:flex">
            <TigerSprite state="dash" size={140} float />
          </motion.div>
        </div>
        <div className="mt-6 border-t border-brand-border" />
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
                      k.up === null ? "text-brand-dim" : k.up ? "text-brand-gold" : "text-brand-red"
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
                  Riftbound · Weekly Price Forecast
                </h2>
              </div>
              <div className="flex gap-4">
                <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-ultra text-brand-muted">
                  <span className="inline-block h-px w-5 bg-brand-red" aria-hidden="true" /> ACTUAL
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-ultra text-brand-muted">
                  <span className="inline-block h-px w-5 border-t border-dashed border-brand-gold" aria-hidden="true" /> FORECAST
                </span>
              </div>
            </header>
            <div role="img" aria-label="Sparkline showing real Riftbound card price vs XGBoost forecast over time">
              <Sparkline actual={sparklineActual} forecast={sparklineForecast} height={280} />
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

// ── Dual-line Sparkline ────────────────────────────────────────────────────────

interface SparklineProps {
  actual: number[];
  forecast?: number[];
  height?: number;
}

function Sparkline({ actual, forecast, height = 200 }: SparklineProps) {
  const reduce = useReducedMotion();
  const w = 1000;

  const allPoints = [...actual, ...(forecast ?? [])];
  if (allPoints.length === 0) return null;

  const max   = Math.max(...allPoints);
  const min   = Math.min(...allPoints);
  const range = max - min || 1;

  function toPoints(values: number[]) {
    return values.map((v, i) => {
      const x = (i / (values.length - 1)) * w;
      const y = height - ((v - min) / range) * (height - 40) - 20;
      return [x, y];
    });
  }

  function toPath(pts: number[][]) {
    return pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ");
  }

  const actualPts   = toPoints(actual);
  const actualPath  = toPath(actualPts);
  const forecastPts = forecast?.length ? toPoints(forecast) : null;
  const forecastPath = forecastPts ? toPath(forecastPts) : null;

  return (
    <svg viewBox={`0 0 ${w} ${height}`} className="w-full" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="sparkline-grad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%"   stopColor="var(--color-red)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--color-red)" stopOpacity="0"    />
        </linearGradient>
      </defs>

      {/* Fill area under actual line */}
      <motion.path
        d={`${actualPath} L${w},${height} L0,${height} Z`}
        fill="url(#sparkline-grad)"
        initial={reduce ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      />

      {/* Actual price — red */}
      <motion.path
        d={actualPath}
        stroke="var(--color-red)"
        strokeWidth={2}
        fill="none"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        viewport={{ once: true }}
      />

      {/* XGBoost forecast — gold dashed */}
      {forecastPath && (
        <motion.path
          d={forecastPath}
          stroke="var(--color-gold)"
          strokeWidth={2}
          strokeDasharray="6 4"
          fill="none"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.3, ease: "easeOut" }}
          viewport={{ once: true }}
        />
      )}
    </svg>
  );
}
