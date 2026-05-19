// src/types/lol.ts

export interface LolProfile {
  summonerName: string;
  tier: string;
  rank: string;
  lp: number;
  wins: number;
  losses: number;
  lastUpdated: string | null;
}

export interface LolChampion {
  name: string;
  mastery_points: number;
  level: number;
}

export type LolRole = "TOP" | "JUNGLE" | "MID" | "ADC" | "SUPPORT";

export interface LolMatch {
  win: boolean;
  champion: string;
  kills: number;
  deaths: number;
  assists: number;
  kda: number;
  role: LolRole;
}
