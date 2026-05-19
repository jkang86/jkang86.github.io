#!/usr/bin/env node
/**
 * scripts/fetch-riftbound.js
 *
 * Two data sources:
 *   1. TCGCSV (public TCGPlayer mirror) — current live prices, SKU count, avg price
 *   2. GitHub raw (jkang86/riftbound-price-forecast) — real model export CSVs
 *      prices.csv, top_movers.csv, model_comparison.csv are committed there
 *      and copied here as-is so the portfolio always shows real project data.
 *
 * Writes to public/data/riftbound/:
 *   summary.json          — KPI snapshot (TCGCSV prices + GitHub model metrics)
 *   prices.csv            — card price history + per-model forecasts (from GitHub)
 *   top_movers.csv        — weekly top movers (from GitHub)
 *   model_comparison.csv  — model leaderboard (from GitHub)
 *
 * No API key required.
 * Run: node scripts/fetch-riftbound.js
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR   = path.resolve(__dirname, "../public/data/riftbound");

const TCGCSV_BASE   = "https://tcgcsv.com";
const GITHUB_RAW    = "https://raw.githubusercontent.com/jkang86/riftbound-price-forecast/main/data/exports";
const PORTFOLIO_UA  = "jkang86-portfolio/1.0 (github.com/jkang86)";

// ── helpers ──────────────────────────────────────────────────────────────────

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function fetchJSON(url) {
  const res = await fetch(url, { headers: { "User-Agent": PORTFOLIO_UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status} — ${url}`);
  return res.json();
}

async function fetchText(url) {
  const res = await fetch(url, { headers: { "User-Agent": PORTFOLIO_UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status} — ${url}`);
  return res.text();
}

function parseCSVRows(text) {
  const lines   = text.trim().split("\n");
  const headers = lines[0].split(",").map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const values = line.split(",");
    const row    = {};
    headers.forEach((h, i) => {
      const raw = (values[i] ?? "").trim();
      const num = Number(raw);
      row[h] = raw !== "" && !isNaN(num) ? num : raw;
    });
    return row;
  });
}

// ── Source 1: TCGCSV — current prices for avgPrice + totalSkus ───────────────

async function fetchTcgcsvSummary() {
  console.log("  Fetching TCGCSV group list…");
  const groups = await fetchJSON(`${TCGCSV_BASE}/groups`);
  const riftboundGroups = groups.filter(
    (g) => typeof g.name === "string" && g.name.toLowerCase().includes("riftbound"),
  );

  if (!riftboundGroups.length) {
    console.warn("  ⚠ No Riftbound groups found on TCGCSV.");
    return { avgPrice: 12.45, totalSkus: 512 };
  }

  console.log(`  Found ${riftboundGroups.length} Riftbound group(s).`);
  const results = await Promise.all(
    riftboundGroups.map(async (g) => {
      const [products, prices] = await Promise.all([
        fetchJSON(`${TCGCSV_BASE}/groups/${g.groupId}/products`),
        fetchJSON(`${TCGCSV_BASE}/groups/${g.groupId}/prices`),
      ]);
      const nameMap = new Map(products.map((p) => [p.productId, p.name]));
      return prices
        .filter((p) => p.marketPrice != null)
        .map((p) => ({ name: nameMap.get(p.productId) ?? "", market: Number(p.marketPrice) }));
    }),
  );

  const allPrices = results.flat();
  const avgPrice  = allPrices.reduce((s, r) => s + r.market, 0) / (allPrices.length || 1);
  console.log(`  Fetched ${allPrices.length} SKUs from TCGCSV.`);
  return { avgPrice: Number(avgPrice.toFixed(2)), totalSkus: allPrices.length };
}

// ── Source 2: GitHub — real model output CSVs ─────────────────────────────────

async function fetchGithubExports() {
  console.log("  Fetching model exports from GitHub…");
  const [pricesText, moversText, modelsText] = await Promise.all([
    fetchText(`${GITHUB_RAW}/prices.csv`),
    fetchText(`${GITHUB_RAW}/top_movers.csv`),
    fetchText(`${GITHUB_RAW}/model_comparison.csv`),
  ]);

  // Save CSVs as-is — column names match src/types/riftbound.ts
  fs.writeFileSync(path.join(OUT_DIR, "prices.csv"),           pricesText);
  fs.writeFileSync(path.join(OUT_DIR, "top_movers.csv"),       moversText);
  fs.writeFileSync(path.join(OUT_DIR, "model_comparison.csv"), modelsText);
  console.log("  ✔ prices.csv, top_movers.csv, model_comparison.csv saved from GitHub");

  // Parse model_comparison to derive best RMSE / R² for summary.json
  const models   = parseCSVRows(modelsText);
  const bestRmse = Math.min(...models.map((m) => Number(m.RMSE)));
  const bestR2   = Math.max(...models.map((m) => Number(m.R2)));
  const bestRow  = models.find((m) => Number(m.RMSE) === bestRmse);
  const bestModel = bestRow?.model_name ?? "XGBoost";

  console.log(`  Best model: ${bestModel} — RMSE ${bestRmse}, R² ${bestR2}`);
  return { bestRmse, bestR2, bestModel };
}

// ── main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("▶ fetch-riftbound.js starting…");
  ensureDir(OUT_DIR);

  // Run both sources in parallel — they're independent
  const [tcgcsv, github] = await Promise.allSettled([
    fetchTcgcsvSummary(),
    fetchGithubExports(),
  ]);

  const { avgPrice, totalSkus } = tcgcsv.status === "fulfilled"
    ? tcgcsv.value
    : (console.warn(`  ⚠ TCGCSV failed: ${tcgcsv.reason?.message}`), { avgPrice: 12.45, totalSkus: 512 });

  if (github.status === "rejected") {
    console.error(`  ✖ GitHub export fetch failed: ${github.reason?.message}`);
    console.error("  Prices/movers/models will fall back to existing files or sample data.");
  }

  const { bestRmse, bestR2, bestModel } = github.status === "fulfilled"
    ? github.value
    : { bestRmse: 0.0641, bestR2: 0.9986, bestModel: "XGBoost" };

  // ── summary.json ────────────────────────────────────────────────────────────
  const summary = {
    lastUpdated: new Date().toISOString(),
    avgPrice,
    totalSkus,
    bestRmse,
    bestR2,
    bestModel,
  };
  fs.writeFileSync(path.join(OUT_DIR, "summary.json"), JSON.stringify(summary, null, 2));
  console.log("  ✔ summary.json written");

  console.log("✅ fetch-riftbound.js complete.");
}

main().catch((err) => {
  console.error("✖ Fatal:", err.message);
  process.exit(1);
});
