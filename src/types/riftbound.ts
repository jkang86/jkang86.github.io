// src/types/riftbound.ts

export interface RiftboundSummary {
  lastUpdated: string | null;
  avgPrice: number;
  totalSkus: number;
  bestRmse: number;
  bestR2: number;
  bestModel: string;
}

// Matches data/exports/prices.csv in jkang86/riftbound-price-forecast
export interface PriceRow {
  card_display: string;
  week: string;
  actual_price: number;
  predicted_price: number;
  model: string;
}

// Matches data/exports/top_movers.csv
export interface TopMover {
  card_display: string;
  week: string;
  price: number;
  pct_change_1w: number;
  direction: "Up" | "Down" | "Flat";
}

// Matches data/exports/model_comparison.csv
export interface ModelRow {
  model_name: string;
  RMSE: number;
  MAE: number;
  R2: number;
}
