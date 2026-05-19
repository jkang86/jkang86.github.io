#!/usr/bin/env node
/**
 * scripts/fetch-lol.js
 *
 * Fetches League of Legends ranked data for gamjahtang#galbi via the Riot API.
 * Writes three files to public/data/lol/:
 *   profile.json     — summoner name, tier, rank, LP, wins, losses
 *   champions.json   — top 7 champion mastery entries
 *   matches.json     — last 10 ranked match summaries
 *
 * Requires:  RIOT_API_KEY environment variable (never commit this key)
 *
 * Run:  RIOT_API_KEY=RGAPI-xxx node scripts/fetch-lol.js
 * Or:   npm run fetch:lol   (key must be in shell env or .env.local — not committed)
 *
 * Riot API docs: https://developer.riotgames.com/apis
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, "../public/data/lol");

// ── config ───────────────────────────────────────────────────────────────────

const RIOT_KEY    = process.env.RIOT_API_KEY;
const GAME_NAME   = "gamjahtang";
const TAG_LINE    = "galbi";
const REGION      = "na1";            // summoner + mastery + league endpoints
const REGION_V5   = "americas";      // match v5 endpoints
const MATCH_COUNT = 10;
const MASTERY_TOP = 7;

const ACCOUNT_URL  = `https://${REGION_V5}.api.riotgames.com`;
const SUMMONER_URL = `https://${REGION}.api.riotgames.com`;

// ── helpers ──────────────────────────────────────────────────────────────────

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function riotFetch(url) {
  if (!RIOT_KEY) throw new Error("RIOT_API_KEY is not set.");
  const res = await fetch(url, {
    headers: {
      "X-Riot-Token": RIOT_KEY,
      "User-Agent":   "jkang86-portfolio/1.0 (github.com/jkang86)",
    },
  });
  if (res.status === 404) throw new Error(`404 — ${url}`);
  if (res.status === 429) throw new Error("Rate limited by Riot API — wait 2 min and retry.");
  if (!res.ok)            throw new Error(`HTTP ${res.status} — ${url}`);
  return res.json();
}

// ── champion ID → name via Data Dragon ───────────────────────────────────────

async function buildChampionMap() {
  const versionsRes = await fetch("https://ddragon.leagueoflegends.com/api/versions.json");
  const versions    = await versionsRes.json();
  const latest      = versions[0];

  const champRes  = await fetch(`https://ddragon.leagueoflegends.com/cdn/${latest}/data/en_US/champion.json`);
  const champData = await champRes.json();

  const map = new Map();
  for (const champ of Object.values(champData.data)) {
    map.set(Number(champ.key), champ.name);
  }
  return map;
}

// ── role from position string ─────────────────────────────────────────────────

function parseRole(teamPosition) {
  const map = {
    TOP:     "TOP",
    JUNGLE:  "JUNGLE",
    MIDDLE:  "MID",
    BOTTOM:  "ADC",
    UTILITY: "SUPPORT",
  };
  return map[teamPosition] ?? "ADC";
}

// ── main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("▶ fetch-lol.js starting…");

  if (!RIOT_KEY) {
    console.error("✖ RIOT_API_KEY is not set. Set it in the environment (never commit the key).");
    process.exit(1);
  }

  ensureDir(OUT_DIR);

  // 1 — account → PUUID
  console.log(`  Looking up ${GAME_NAME}#${TAG_LINE}…`);
  const account = await riotFetch(
    `${ACCOUNT_URL}/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(GAME_NAME)}/${encodeURIComponent(TAG_LINE)}`,
  );
  const { puuid } = account;
  console.log(`  PUUID: ${puuid.slice(0, 12)}…`);

  // 2 — summoner (encrypted summoner ID needed for league/mastery)
  const summoner = await riotFetch(
    `${SUMMONER_URL}/lol/summoner/v4/summoners/by-puuid/${puuid}`,
  );
  const summonerId = summoner.id;

  // 3 — ranked stats
  const entries = await riotFetch(
    `${SUMMONER_URL}/lol/league/v4/entries/by-summoner/${summonerId}`,
  );
  const soloQ = entries.find((e) => e.queueType === "RANKED_SOLO_5x5") ?? {};

  const profile = {
    summonerName: `${GAME_NAME}#${TAG_LINE}`,
    tier:         soloQ.tier   ?? "UNRANKED",
    rank:         soloQ.rank   ?? "",
    lp:           soloQ.leaguePoints ?? 0,
    wins:         soloQ.wins   ?? 0,
    losses:       soloQ.losses ?? 0,
    lastUpdated:  new Date().toISOString(),
  };
  fs.writeFileSync(path.join(OUT_DIR, "profile.json"), JSON.stringify(profile, null, 2));
  console.log(`  ✔ profile.json — ${profile.tier} ${profile.rank} ${profile.lp} LP`);

  // 4 — champion mastery (top MASTERY_TOP)
  const masteryRaw = await riotFetch(
    `${SUMMONER_URL}/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}/top?count=${MASTERY_TOP}`,
  );
  const champMap = await buildChampionMap();
  const champions = masteryRaw.map((m) => ({
    name:            champMap.get(m.championId) ?? `Champion ${m.championId}`,
    mastery_points:  m.championPoints,
    level:           m.championLevel,
  }));
  fs.writeFileSync(path.join(OUT_DIR, "champions.json"), JSON.stringify(champions, null, 2));
  console.log(`  ✔ champions.json — ${champions.length} champions`);

  // 5 — last MATCH_COUNT ranked match IDs
  const matchIds = await riotFetch(
    `${ACCOUNT_URL}/lol/match/v5/matches/by-puuid/${puuid}/ids?queue=420&start=0&count=${MATCH_COUNT}`,
  );

  // 6 — fetch each match detail (sequential to respect rate limits)
  const matches = [];
  for (const matchId of matchIds) {
    const detail    = await riotFetch(`${ACCOUNT_URL}/lol/match/v5/matches/${matchId}`);
    const me        = detail.info.participants.find((p) => p.puuid === puuid);
    if (!me) continue;
    matches.push({
      win:       me.win,
      champion:  me.championName,
      kills:     me.kills,
      deaths:    me.deaths,
      assists:   me.assists,
      kda:       me.deaths === 0
        ? Number(((me.kills + me.assists) * 1.2).toFixed(2))
        : Number(((me.kills + me.assists) / me.deaths).toFixed(2)),
      role:      parseRole(me.teamPosition),
    });
    // Polite delay — Development keys are rate-limited to 20 req/s
    await new Promise((r) => setTimeout(r, 55));
  }

  fs.writeFileSync(path.join(OUT_DIR, "matches.json"), JSON.stringify(matches, null, 2));
  console.log(`  ✔ matches.json — ${matches.length} matches`);

  console.log("✅ fetch-lol.js complete.");
}

main().catch((err) => {
  console.error("✖ Fatal:", err.message);
  process.exit(1);
});
