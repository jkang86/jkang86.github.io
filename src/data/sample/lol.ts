// src/data/sample/lol.ts
// Fallback data — used when public/data/lol/ files are unavailable.
import type { LolProfile, LolChampion, LolMatch } from "@/types/lol";

export const LOL_PROFILE: LolProfile = {
  summonerName: "gamjahtang#galbi",
  tier: "DIAMOND",
  rank: "II",
  lp: 75,
  wins: 128,
  losses: 96,
  lastUpdated: null,
};

export const LOL_CHAMPIONS: LolChampion[] = [
  { name: "Jinx",     mastery_points: 1_420_000, level: 7 },
  { name: "Caitlyn",  mastery_points: 980_000,   level: 7 },
  { name: "Ezreal",   mastery_points: 740_000,   level: 6 },
  { name: "Jhin",     mastery_points: 610_000,   level: 6 },
  { name: "Ashe",     mastery_points: 480_000,   level: 5 },
  { name: "Kai'Sa",   mastery_points: 390_000,   level: 5 },
  { name: "Varus",    mastery_points: 280_000,   level: 5 },
];

export const LOL_MATCHES: LolMatch[] = [
  { win: true,  champion: "Jinx",    kills: 11, deaths: 2, assists: 7,  kda: 9.0,  role: "ADC"     },
  { win: false, champion: "Caitlyn", kills: 4,  deaths: 6, assists: 3,  kda: 1.17, role: "ADC"     },
  { win: true,  champion: "Jinx",    kills: 8,  deaths: 3, assists: 5,  kda: 4.33, role: "ADC"     },
  { win: true,  champion: "Jhin",    kills: 9,  deaths: 1, assists: 10, kda: 19.0, role: "ADC"     },
  { win: false, champion: "Ezreal",  kills: 5,  deaths: 5, assists: 4,  kda: 1.8,  role: "ADC"     },
  { win: true,  champion: "Jinx",    kills: 14, deaths: 4, assists: 8,  kda: 5.5,  role: "ADC"     },
  { win: false, champion: "Caitlyn", kills: 3,  deaths: 7, assists: 2,  kda: 0.71, role: "ADC"     },
  { win: true,  champion: "Kai'Sa",  kills: 7,  deaths: 2, assists: 9,  kda: 8.0,  role: "ADC"     },
  { win: true,  champion: "Jinx",    kills: 12, deaths: 3, assists: 6,  kda: 6.0,  role: "ADC"     },
  { win: false, champion: "Ashe",    kills: 4,  deaths: 5, assists: 8,  kda: 2.4,  role: "ADC"     },
];
