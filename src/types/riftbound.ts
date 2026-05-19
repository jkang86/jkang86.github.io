// src/types/riftbound.ts

export interface RiftboundSummary {
  lastUpdated: string | null;
  avgPrice: number;
  totalSkus: number;
  bestRmse: number;
  bestR2: number;
}

export interface PriceRow {
  date: string;
  card_name: string;
  price: number;
  forecast: number;
}

export interface TopMover {
  card_name: string;
  price_change: number;
  change_pct: number;
  direction: "up" | "down";
}

export interface ModelRow {
  model: string;
  rmse: number;
  mae: number;
  r2: number;
}
