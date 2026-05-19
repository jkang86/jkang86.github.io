// src/pages/GamingPage.tsx
import { useState, useEffect, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  LineChart, Line, BarChart, Bar, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, type TooltipProps,
} from "recharts";
import TigerSprite, { type TigerState } from "@/components/TigerSprite";
import SpeedLines from "@/components/motion/SpeedLines";
import { FadeUp, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { useJSON, useCSV, isLiveData, timeSince } from "@/lib/useDataFetch";
import { RIFTBOUND_SUMMARY, RIFTBOUND_PRICES, RIFTBOUND_TOP_MOVERS, RIFTBOUND_MODELS } from "@/data/sample/riftbound";
import { LOL_PROFILE, LOL_CHAMPIONS, LOL_MATCHES } from "@/data/sample/lol";
import type { RiftboundSummary, PriceRow, TopMover, ModelRow } from "@/types/riftbound";
import type { LolProfile, LolChampion, LolMatch } from "@/types/lol";

// ─── Chart helpers ───────────────────────────────────────────────────────────

const C = {
  red:     "var(--color-red)",
  gold:    "var(--color-gold)",
  success: "var(--color-success)",
  border:  "var(--color-border)",
  muted:   "var(--color-muted)",
  dim:     "var(--color-dim)",
  white:   "var(--color-white)",
};

const tickStyle = {
  fill: C.muted,
  fontSize: 10,
  fontFamily: "var(--font-mono)",
};

function ChartTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;
  return (
    <div className="border border-brand-border bg-brand-raised px-3 py-2">
      <div className="mb-1 font-mono text-[10px] tracking-ultra text-brand-muted">{label}</div>
      {payload.map((p) => (
        <div
          key={p.name}
          className="font-heading text-sm font-bold"
          style={{ color: p.color ?? C.white }}
        >
          {p.name === "price" || p.name === "forecast" || p.name === "price_change"
            ? `$${Number(p.value).toFixed(2)}`
            : p.value}
        </div>
      ))}
    </div>
  );
}

// ─── Data Status Badge ────────────────────────────────────────────────────────

function DataBadge({ cached, lastUpdated }: { cached: boolean; lastUpdated: string | null }) {
  const live = !cached && isLiveData(lastUpdated);
  return (
    <div aria-live="polite" aria-atomic="true" className="flex items-center gap-2">
      <span className="sr-only">{live ? "Live data loaded" : "Using cached data"}</span>
      <span
        className={`h-2 w-2 rounded-full ${live ? "bg-brand-success shadow-[0_0_8px] shadow-brand-success" : "bg-brand-dim"}`}
        aria-hidden="true"
      />
      <span className="font-mono text-[10px] tracking-ultra text-brand-muted uppercase">
        {live ? "Live Data" : `Cached · ${timeSince(lastUpdated)}`}
      </span>
    </div>
  );
}

// ─── Section A — Riftbound TCG ───────────────────────────────────────────────

interface RiftboundSectionProps {
  onTopMoverChange: (dir: "up" | "down" | null) => void;
}

function RiftboundSection({ onTopMoverChange }: RiftboundSectionProps) {
  const { data: summary, loading: sl, cached: sc } = useJSON<RiftboundSummary>(
    "/data/riftbound/summary.json", RIFTBOUND_SUMMARY,
  );
  const { data: prices }     = useCSV<PriceRow>("/data/riftbound/prices.csv",           RIFTBOUND_PRICES);
  const { data: movers }     = useCSV<TopMover>("/data/riftbound/top_movers.csv",        RIFTBOUND_TOP_MOVERS);
  const { data: models }     = useCSV<ModelRow>("/data/riftbound/model_comparison.csv",  RIFTBOUND_MODELS);

  // Notify parent about top mover direction for sprite swap
  useEffect(() => {
    if (movers.length > 0) onTopMoverChange(movers[0].direction);
  }, [movers, onTopMoverChange]);

  const kpis = useMemo(() => [
    { label: "AVG PRICE · 24H", value: `$${summary.avgPrice.toFixed(2)}`, delta: "+2.1%" },
    { label: "SKUs TRACKED",     value: summary.totalSkus.toLocaleString(), delta: "+12"   },
    { label: "PROPHET RMSE",     value: `$${summary.bestRmse}`,            delta: "R²=0.998" },
    { label: "UPTIME · 30D",     value: "98.7%",                           delta: "stable" },
  ], [summary]);

  const dateLabel = (d: string) => {
    const [, m, day] = d.split("-");
    return `${m}/${day}`;
  };

  const bestModel = models[0];

  return (
    <section aria-labelledby="riftbound-heading">
      <FadeUp>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="label-kicker">// RIFTBOUND TCG · PRICE INTELLIGENCE</span>
            <h2
              id="riftbound-heading"
              className="mt-1 font-display text-[clamp(2rem,5vw,3.5rem)] leading-[0.95] tracking-tightest text-brand-white"
            >
              PRICE FORECAST
            </h2>
          </div>
          {!sl && <DataBadge cached={sc} lastUpdated={summary.lastUpdated} />}
        </div>
      </FadeUp>

      {/* KPI strip */}
      <Stagger className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4" gap={0.07}>
        {kpis.map((k) => (
          <StaggerItem key={k.label}>
            <div className="border border-brand-border bg-brand-surface p-4">
              <div className="font-display text-2xl text-brand-white">{k.value}</div>
              <div className="mt-1 flex items-baseline justify-between">
                <span className="font-mono text-[10px] tracking-ultra text-brand-dim">{k.label}</span>
                <span className="font-mono text-[10px] text-brand-gold">{k.delta}</span>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      {/* Price Forecast chart */}
      <FadeUp delay={0.1} className="mt-4">
        <div className="border border-brand-border bg-brand-surface p-5">
          <h3 className="mb-4 font-heading text-base font-bold uppercase tracking-wide text-brand-white">
            Aurelia, Voice of Dawn — 14-Day Forecast
          </h3>
          <div
            role="img"
            aria-label="Line chart showing Aurelia Voice of Dawn price and forecast over 14 days"
          >
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={prices} margin={{ top: 4, right: 8, bottom: 0, left: -16 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                <XAxis dataKey="date" tickFormatter={dateLabel} tick={tickStyle} axisLine={false} tickLine={false} />
                <YAxis domain={["auto", "auto"]} tick={tickStyle} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
                <Tooltip content={<ChartTooltip />} />
                <Line type="monotone" dataKey="price"    stroke={C.red}  strokeWidth={2} dot={false} name="price"    />
                <Line type="monotone" dataKey="forecast" stroke={C.gold} strokeWidth={2} dot={false} strokeDasharray="5 4" name="forecast" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex gap-5">
            <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-ultra text-brand-muted">
              <span className="inline-block h-px w-5 bg-brand-red" aria-hidden="true" /> ACTUAL
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-ultra text-brand-muted">
              <span className="inline-block h-px w-5 border-t border-dashed border-brand-gold" aria-hidden="true" /> FORECAST
            </span>
          </div>
        </div>
      </FadeUp>

      {/* Top Movers + Model Leaderboard */}
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {/* Top Movers */}
        <FadeUp delay={0.12}>
          <div className="border border-brand-border bg-brand-surface p-5">
            <h3 className="mb-4 font-heading text-base font-bold uppercase tracking-wide text-brand-white">
              Top Movers · 24H
            </h3>
            <div role="img" aria-label="Bar chart showing price change for top moving cards">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart
                  data={movers}
                  layout="vertical"
                  margin={{ top: 0, right: 8, bottom: 0, left: 4 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={C.border} horizontal={false} />
                  <XAxis
                    type="number"
                    tick={tickStyle}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `$${v}`}
                  />
                  <YAxis
                    type="category"
                    dataKey="card_name"
                    tick={tickStyle}
                    axisLine={false}
                    tickLine={false}
                    width={110}
                    tickFormatter={(v: string) => v.split(" ").slice(0, 2).join(" ")}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar dataKey="price_change" name="price_change" radius={[0, 2, 2, 0]}>
                    {movers.map((entry) => (
                      <Cell
                        key={entry.card_name}
                        fill={entry.direction === "up" ? C.success : C.red}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            {/* sr-only table */}
            <table className="sr-only">
              <caption>Top Movers 24H</caption>
              <thead><tr><th>Card</th><th>Change</th><th>Direction</th></tr></thead>
              <tbody>
                {movers.map((m) => (
                  <tr key={m.card_name}>
                    <td>{m.card_name}</td>
                    <td>${m.price_change.toFixed(2)}</td>
                    <td>{m.direction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeUp>

        {/* Model Leaderboard */}
        <FadeUp delay={0.16}>
          <div className="border border-brand-border bg-brand-surface p-5">
            <h3 className="mb-4 font-heading text-base font-bold uppercase tracking-wide text-brand-white">
              Model Leaderboard
            </h3>
            <table className="w-full" aria-label="ML model comparison table">
              <thead>
                <tr className="border-b border-brand-border">
                  {["MODEL", "RMSE", "MAE", "R²"].map((h) => (
                    <th
                      key={h}
                      className="pb-2 text-left font-mono text-[10px] tracking-ultra text-brand-gold"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {models.map((m, i) => (
                  <tr
                    key={m.model}
                    className={`border-b border-brand-border/40 ${i === 0 ? "text-brand-white" : "text-brand-muted"}`}
                  >
                    <td className="py-2 font-heading text-sm font-semibold uppercase tracking-wide">
                      {m.model}
                      {i === 0 && (
                        <span className="ml-2 font-mono text-[9px] tracking-ultra text-brand-gold">BEST</span>
                      )}
                    </td>
                    <td className="py-2 font-mono text-xs">{m.rmse}</td>
                    <td className="py-2 font-mono text-xs">{m.mae}</td>
                    <td className="py-2 font-mono text-xs">{m.r2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {bestModel && (
              <p className="mt-3 font-mono text-[10px] tracking-ultra text-brand-dim">
                BEST MODEL: {bestModel.model} — RMSE ${bestModel.rmse}, R² {bestModel.r2}
              </p>
            )}
          </div>
        </FadeUp>
      </div>

      {/* CTA */}
      <FadeUp delay={0.2} className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <a
          href="https://riftbound-price-forecast.streamlit.app"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View full Riftbound dashboard (opens in new tab)"
          className="btn btn-primary"
        >
          VIEW FULL DASHBOARD →
        </a>
        <p className="font-mono text-[10px] tracking-ultra text-brand-dim max-w-[52ch]">
          Data sourced from TCGPlayer Infinite API and RiftboundStats.
          Not affiliated with Riot Games or TCGPlayer.
        </p>
      </FadeUp>
    </section>
  );
}

// ─── Section B — League of Legends ───────────────────────────────────────────

function LolSection() {
  const { data: profile, cached: pc } = useJSON<LolProfile>("/data/lol/profile.json", LOL_PROFILE);
  const { data: champions }           = useJSON<LolChampion[]>("/data/lol/champions.json", LOL_CHAMPIONS);
  const { data: matches }             = useJSON<LolMatch[]>("/data/lol/matches.json", LOL_MATCHES);

  // Derive LP history from match results
  const lpHistory = useMemo(() =>
    matches.reduce<{ match: number; lp: number }[]>((acc, m, i) => {
      const prev = acc[i - 1]?.lp ?? 0;
      return [...acc, { match: i + 1, lp: prev + (m.win ? 20 : -18) }];
    }, []),
    [matches],
  );

  const winRate = profile.wins + profile.losses > 0
    ? Math.round((profile.wins / (profile.wins + profile.losses)) * 100)
    : 0;

  const tickStyle10 = { fill: C.muted, fontSize: 10, fontFamily: "var(--font-mono)" };

  return (
    <section aria-labelledby="lol-heading" className="mt-6">
      <FadeUp>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="label-kicker">// LEAGUE OF LEGENDS · RANKED STATS</span>
            <h2
              id="lol-heading"
              className="mt-1 font-display text-[clamp(2rem,5vw,3.5rem)] leading-[0.95] tracking-tightest text-brand-white"
            >
              {profile.summonerName}
            </h2>
          </div>
          <DataBadge cached={pc} lastUpdated={profile.lastUpdated} />
        </div>
      </FadeUp>

      {/* Rank card */}
      <FadeUp delay={0.08}>
        <div className="mt-5 grid grid-cols-2 gap-3 border border-brand-border bg-brand-surface p-5 sm:grid-cols-4">
          {[
            { label: "TIER",     value: `${profile.tier} ${profile.rank}` },
            { label: "LP",       value: profile.lp.toString()             },
            { label: "W / L",    value: `${profile.wins} / ${profile.losses}` },
            { label: "WIN RATE", value: `${winRate}%`                     },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-mono text-[10px] tracking-ultra text-brand-gold">{stat.label}</div>
              <div className="mt-1 font-display text-2xl text-brand-white">{stat.value}</div>
            </div>
          ))}
        </div>
      </FadeUp>

      {/* Champion Mastery */}
      <FadeUp delay={0.1} className="mt-4">
        <div className="border border-brand-border bg-brand-surface p-5">
          <h3 className="mb-4 font-heading text-base font-bold uppercase tracking-wide text-brand-white">
            Champion Mastery
          </h3>
          <div role="img" aria-label="Bar chart showing champion mastery points">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={champions} margin={{ top: 4, right: 8, bottom: 0, left: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                <XAxis dataKey="name" tick={tickStyle10} axisLine={false} tickLine={false} />
                <YAxis
                  tick={tickStyle10}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: number) => `${(v / 1_000_000).toFixed(1)}M`}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (!active || !payload?.length) return null;
                    const pts = (payload[0].value as number).toLocaleString();
                    return (
                      <div className="border border-brand-border bg-brand-raised px-3 py-2">
                        <div className="font-mono text-[10px] tracking-ultra text-brand-muted">{label}</div>
                        <div className="font-heading text-sm font-bold text-brand-red">{pts} pts</div>
                      </div>
                    );
                  }}
                />
                <Bar dataKey="mastery_points" fill={C.red} radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <table className="sr-only">
            <caption>Champion Mastery Points</caption>
            <thead><tr><th>Champion</th><th>Points</th></tr></thead>
            <tbody>
              {champions.map((c) => (
                <tr key={c.name}><td>{c.name}</td><td>{c.mastery_points.toLocaleString()}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </FadeUp>

      {/* LP History + KDA Trend */}
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <FadeUp delay={0.12}>
          <div className="border border-brand-border bg-brand-surface p-5">
            <h3 className="mb-4 font-heading text-base font-bold uppercase tracking-wide text-brand-white">
              LP Trend · Last 10 Games
            </h3>
            <div role="img" aria-label="Line chart showing LP gain/loss over last 10 games">
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={lpHistory} margin={{ top: 4, right: 8, bottom: 0, left: -16 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                  <XAxis dataKey="match" tick={tickStyle10} axisLine={false} tickLine={false} label={{ value: "Game", position: "insideBottomRight", fill: C.dim, fontSize: 10 }} />
                  <YAxis tick={tickStyle10} axisLine={false} tickLine={false} tickFormatter={(v) => `${v > 0 ? "+" : ""}${v}`} />
                  <Tooltip content={<ChartTooltip />} />
                  <Line type="monotone" dataKey="lp" stroke={C.gold} strokeWidth={2} dot={{ fill: C.gold, r: 3 }} name="lp" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.16}>
          <div className="border border-brand-border bg-brand-surface p-5">
            <h3 className="mb-4 font-heading text-base font-bold uppercase tracking-wide text-brand-white">
              KDA · Last 10 Games
            </h3>
            <div role="img" aria-label="Line chart showing KDA ratio per game">
              <ResponsiveContainer width="100%" height={180}>
                <LineChart
                  data={matches.map((m, i) => ({ game: i + 1, kda: m.kda, win: m.win }))}
                  margin={{ top: 4, right: 8, bottom: 0, left: -16 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                  <XAxis dataKey="game" tick={tickStyle10} axisLine={false} tickLine={false} />
                  <YAxis tick={tickStyle10} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTooltip />} />
                  <Line type="monotone" dataKey="kda" stroke={C.red} strokeWidth={2} dot={{ fill: C.red, r: 3 }} name="kda" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <table className="sr-only">
              <caption>KDA per game</caption>
              <thead><tr><th>Game</th><th>KDA</th><th>Result</th></tr></thead>
              <tbody>
                {matches.map((m, i) => (
                  <tr key={i}><td>{i + 1}</td><td>{m.kda}</td><td>{m.win ? "Win" : "Loss"}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── GamingPage ───────────────────────────────────────────────────────────────

export default function GamingPage() {
  const reduce = useReducedMotion();
  const [spriteState, setSpriteState] = useState<TigerState>("focused");

  const glitchVariants = {
    hidden:  { opacity: 0 },
    visible: {
      opacity: 1,
      x: reduce ? 0 : [0, -4, 4, -2, 2, 0],
      transition: { duration: 0.5, times: [0, 0.1, 0.3, 0.5, 0.7, 1] },
    },
  };

  return (
    <div className="relative overflow-hidden pt-[100px] pb-20">
      {/* Top speed lines */}
      <div className="absolute inset-x-0 top-[72px] z-0">
        <SpeedLines height={100} count={9} />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-7">
        {/* Header */}
        <FadeUp>
          <div className="relative">
            <span className="label-kicker">// DATA ARENA</span>
            <motion.h1
              id="main-content"
              variants={glitchVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-2 font-display text-[clamp(3rem,8vw,6rem)] leading-[0.95] tracking-tightest text-brand-white"
            >
              GAMING ANALYTICS
            </motion.h1>
            <div className="absolute right-0 top-0 hidden lg:block">
              <TigerSprite state={spriteState} size={140} float />
            </div>
          </div>
        </FadeUp>

        {/* Section A */}
        <div className="mt-10">
          <RiftboundSection
            onTopMoverChange={(dir) =>
              setSpriteState(dir === "up" ? "dash" : "focused")
            }
          />
        </div>

        {/* Speed-line divider */}
        <div className="my-10">
          <SpeedLines height={60} count={7} />
        </div>

        {/* Section B */}
        <LolSection />
      </div>
    </div>
  );
}
