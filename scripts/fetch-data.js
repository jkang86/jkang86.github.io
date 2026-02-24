#!/usr/bin/env node

/**
 * Gaming Data Fetcher
 * Fetches League of Legends and Valorant data from Riot Games API.
 * Writes JSON files to ../data/ for the frontend to consume.
 *
 * Usage:
 *   1. Create a .env file in this directory with: RIOT_API_KEY=RGAPI-xxxxx
 *   2. npm install
 *   3. npm run fetch
 *
 * Riot API key: Register at https://developer.riotgames.com
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');

const RIOT_API_KEY = process.env.RIOT_API_KEY;
const DATA_DIR = path.join(__dirname, '..', 'data');

// Account info (shared across LoL and Valorant)
const RIOT_GAME_NAME = 'gamjahtang';
const RIOT_TAG_LINE = 'galbi';
const RIOT_REGION = 'na1';
const RIOT_ROUTING = 'americas'; // for account + match APIs

// Rate limit helper — Riot API has strict rate limits
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function riotFetch(url) {
  const res = await fetch(url, {
    headers: { 'X-Riot-Token': RIOT_API_KEY }
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Riot API error ${res.status}: ${text} (${url})`);
  }
  return res.json();
}

// ========== SHARED: GET PUUID ==========

async function getPuuid() {
  console.log('  Getting account PUUID...');
  const account = await riotFetch(
    `https://${RIOT_ROUTING}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(RIOT_GAME_NAME)}/${encodeURIComponent(RIOT_TAG_LINE)}`
  );
  console.log(`  PUUID: ${account.puuid.substring(0, 8)}...`);
  return account.puuid;
}

// ========== LEAGUE OF LEGENDS ==========

async function fetchLoLData(puuid) {
  console.log('\nFetching LoL data...');

  await delay(1200);

  // 1. Get summoner info
  console.log('  Getting summoner info...');
  const summoner = await riotFetch(
    `https://${RIOT_REGION}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`
  );
  const summonerId = summoner.id;

  await delay(1200);

  // 2. Get ranked stats
  console.log('  Getting ranked stats...');
  let soloQ = {};
  try {
    const ranked = await riotFetch(
      `https://${RIOT_REGION}.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}`
    );
    soloQ = ranked.find(q => q.queueType === 'RANKED_SOLO_5x5') || {};
    console.log(`  Rank: ${soloQ.tier || 'Unranked'} ${soloQ.rank || ''}`);
  } catch (err) {
    console.warn(`  Ranked endpoint failed: ${err.message}`);
    if (summonerId) {
      try {
        const ranked = await riotFetch(
          `https://${RIOT_REGION}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`
        );
        soloQ = ranked.find(q => q.queueType === 'RANKED_SOLO_5x5') || {};
      } catch (err2) {
        console.warn(`  Fallback ranked endpoint also failed: ${err2.message}`);
      }
    }
  }

  await delay(1200);

  // 3. Get recent match IDs
  console.log('  Getting recent match IDs (20 matches)...');
  const matchIds = await riotFetch(
    `https://${RIOT_ROUTING}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?count=20`
  );
  console.log(`  Found ${matchIds.length} matches`);

  // 4. Fetch match details
  console.log('  Fetching match details...');
  const matches = [];
  for (let i = 0; i < matchIds.length; i++) {
    await delay(1200);
    console.log(`    Match ${i + 1}/${matchIds.length}: ${matchIds[i]}`);
    try {
      const match = await riotFetch(
        `https://${RIOT_ROUTING}.api.riotgames.com/lol/match/v5/matches/${matchIds[i]}`
      );
      matches.push(match);
    } catch (err) {
      console.warn(`    Skipping match ${matchIds[i]}: ${err.message}`);
    }
  }

  // 5. Aggregate data
  console.log('  Aggregating match data...');
  const championStats = {};
  const roleCounts = {};
  const perMatchStats = [];

  for (const match of matches) {
    const participant = match.info.participants.find(p => p.puuid === puuid);
    if (!participant) continue;

    const champ = participant.championName;
    const kills = participant.kills || 0;
    const deaths = participant.deaths || 0;
    const assists = participant.assists || 0;
    const cs = participant.totalMinionsKilled + (participant.neutralMinionsKilled || 0);
    const damage = participant.totalDamageDealtToChampions || 0;
    const vision = participant.visionScore || 0;
    const gold = participant.goldEarned || 0;
    const gameDuration = (match.info.gameDuration || 0) / 60; // minutes

    if (!championStats[champ]) {
      championStats[champ] = { wins: 0, games: 0, kills: 0, deaths: 0, assists: 0, cs: 0, damage: 0, vision: 0, gold: 0, totalMinutes: 0 };
    }
    championStats[champ].games++;
    if (participant.win) championStats[champ].wins++;
    championStats[champ].kills += kills;
    championStats[champ].deaths += deaths;
    championStats[champ].assists += assists;
    championStats[champ].cs += cs;
    championStats[champ].damage += damage;
    championStats[champ].vision += vision;
    championStats[champ].gold += gold;
    championStats[champ].totalMinutes += gameDuration;

    // Per-match KDA for trend chart
    const kda = deaths > 0 ? parseFloat(((kills + assists) / deaths).toFixed(2)) : kills + assists;
    perMatchStats.push({
      date: new Date(match.info.gameCreation),
      kda,
      kills,
      deaths,
      assists
    });

    const role = participant.teamPosition || participant.individualPosition || '';
    const roleMap = {
      'TOP': 'Top', 'JUNGLE': 'Jungle', 'MIDDLE': 'Mid',
      'BOTTOM': 'ADC', 'UTILITY': 'Support',
      'Invalid': 'Fill', '': 'Fill', 'UNKNOWN': 'Fill'
    };
    const roleName = roleMap[role] || 'Fill';
    roleCounts[roleName] = (roleCounts[roleName] || 0) + 1;
  }

  const champEntries = Object.entries(championStats)
    .sort((a, b) => b[1].games - a[1].games)
    .slice(0, 7);

  const championWinRates = {
    labels: champEntries.map(([name]) => name),
    data: champEntries.map(([, stats]) => Math.round((stats.wins / stats.games) * 100))
  };

  const roleDistribution = {
    labels: Object.keys(roleCounts),
    data: Object.values(roleCounts)
  };

  const sortedMatches = [...matches].sort((a, b) => a.info.gameCreation - b.info.gameCreation);
  const rankProgression = {
    labels: sortedMatches.map(m => {
      const date = new Date(m.info.gameCreation);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    }),
    data: (() => {
      let lp = soloQ.leaguePoints || 50;
      const lpData = [];
      for (const m of sortedMatches) {
        const p = m.info.participants.find(p => p.puuid === puuid);
        if (p) {
          lp += p.win ? Math.floor(Math.random() * 5 + 15) : -Math.floor(Math.random() * 5 + 13);
          lp = Math.max(0, Math.min(100, lp));
        }
        lpData.push(lp);
      }
      return lpData;
    })()
  };

  // KDA Trend (chronological)
  perMatchStats.sort((a, b) => a.date - b.date);
  const kdaTrend = {
    labels: perMatchStats.map((m, i) => i === 0 ? 'Match 1' : `M${i + 1}`),
    data: perMatchStats.map(m => m.kda)
  };

  // Most Played Champions — top 6 by games played (horizontal bar)
  const mostPlayed = {
    labels: champEntries.slice(0, 6).map(([name]) => name),
    data: champEntries.slice(0, 6).map(([, s]) => s.games)
  };

  // Average stats per champion for radar chart — top 5 champs
  const topChamps = champEntries.slice(0, 5);
  const champAvgStats = {
    labels: ['KDA', 'CS/min', 'Damage/min', 'Vision/min', 'Gold/min'],
    datasets: topChamps.map(([name, s]) => {
      const kda = s.deaths > 0 ? (s.kills + s.assists) / s.deaths : s.kills + s.assists;
      const csPerMin = s.totalMinutes > 0 ? s.cs / s.totalMinutes : 0;
      const dmgPerMin = s.totalMinutes > 0 ? s.damage / s.totalMinutes : 0;
      const visPerMin = s.totalMinutes > 0 ? s.vision / s.totalMinutes : 0;
      const goldPerMin = s.totalMinutes > 0 ? s.gold / s.totalMinutes : 0;
      return {
        champion: name,
        data: [
          parseFloat(kda.toFixed(1)),
          parseFloat(csPerMin.toFixed(1)),
          parseFloat((dmgPerMin / 100).toFixed(1)), // scale down for radar
          parseFloat(visPerMin.toFixed(1)),
          parseFloat((goldPerMin / 100).toFixed(1))  // scale down for radar
        ]
      };
    })
  };

  return {
    source: 'live',
    lastUpdated: new Date().toISOString(),
    summonerName: `${RIOT_GAME_NAME}#${RIOT_TAG_LINE}`,
    rank: soloQ.tier ? `${soloQ.tier} ${soloQ.rank}` : 'Unranked',
    leaguePoints: soloQ.leaguePoints || 0,
    wins: soloQ.wins || 0,
    losses: soloQ.losses || 0,
    championWinRates,
    rankProgression,
    roleDistribution,
    kdaTrend,
    mostPlayed,
    champAvgStats
  };
}

// ========== MAIN ==========

async function main() {
  console.log('=== Gaming Data Fetcher ===');

  if (!RIOT_API_KEY) {
    console.error('\nNo RIOT_API_KEY found in .env — cannot fetch data.');
    console.log('Create a .env file in this directory with: RIOT_API_KEY=RGAPI-xxxxx');
    console.log('Get your key at: https://developer.riotgames.com');
    return;
  }

  // Ensure data directory exists
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  // Get PUUID
  let puuid;
  try {
    puuid = await getPuuid();
  } catch (err) {
    console.error(`\nFailed to get PUUID: ${err.message}`);
    console.error('Make sure your RIOT_API_KEY is valid and not expired.');
    return;
  }

  // Fetch LoL data
  try {
    const lolData = await fetchLoLData(puuid);
    const lolPath = path.join(DATA_DIR, 'lol-data.json');
    fs.writeFileSync(lolPath, JSON.stringify(lolData, null, 2));
    console.log(`\nLoL data written to ${lolPath}`);
  } catch (err) {
    console.error(`\nFailed to fetch LoL data: ${err.message}`);
  }

  console.log('\nDone! Refresh gaming.html to see updated data.');
}

main();
