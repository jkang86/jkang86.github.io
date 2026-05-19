// src/data/sample/riftbound.ts
// Fallback data — used when public/data/riftbound/ files are unavailable.
// Column names match data/exports/ in jkang86/riftbound-price-forecast.
import type { RiftboundSummary, PriceRow, TopMover, ModelRow } from "@/types/riftbound";

export const RIFTBOUND_SUMMARY: RiftboundSummary = {
  lastUpdated: null,
  avgPrice: 12.45,
  totalSkus: 512,
  bestRmse: 0.0641,
  bestR2: 0.9986,
  bestModel: "XGBoost",
};

export const RIFTBOUND_PRICES: PriceRow[] = [
  { card_display: "Ahri - Alluring (Launch Exclusive)", week: "2025-10-27", actual_price: 148.50, predicted_price: 147.20, model: "XGBoost" },
  { card_display: "Ahri - Alluring (Launch Exclusive)", week: "2025-11-03", actual_price: 152.30, predicted_price: 151.80, model: "XGBoost" },
  { card_display: "Ahri - Alluring (Launch Exclusive)", week: "2025-11-10", actual_price: 155.88, predicted_price: 154.60, model: "XGBoost" },
  { card_display: "Ahri - Alluring (Launch Exclusive)", week: "2025-11-17", actual_price: 158.40, predicted_price: 157.90, model: "XGBoost" },
  { card_display: "Ahri - Alluring (Launch Exclusive)", week: "2025-11-24", actual_price: 161.20, predicted_price: 160.50, model: "XGBoost" },
  { card_display: "Ahri - Alluring (Launch Exclusive)", week: "2025-12-01", actual_price: 163.80, predicted_price: 163.10, model: "XGBoost" },
  { card_display: "Ahri - Alluring (Launch Exclusive)", week: "2025-12-08", actual_price: 165.50, predicted_price: 166.20, model: "XGBoost" },
];

export const RIFTBOUND_TOP_MOVERS: TopMover[] = [
  { card_display: "Sprite Mother",                      week: "2025-12-08", price: 5.78,   pct_change_1w: 3.6992,  direction: "Up"   },
  { card_display: "Ahri - Alluring (Launch Exclusive)", week: "2025-12-08", price: 165.50, pct_change_1w: 1.0800,  direction: "Up"   },
  { card_display: "Mountain Drake",                     week: "2025-12-08", price: 0.68,   pct_change_1w: -0.4560, direction: "Down" },
  { card_display: "Rune Prison",                        week: "2025-12-08", price: 0.50,   pct_change_1w: 0.0,     direction: "Flat" },
  { card_display: "Acceptable Losses",                  week: "2025-12-08", price: 0.31,   pct_change_1w: -1.2400, direction: "Down" },
];

export const RIFTBOUND_MODELS: ModelRow[] = [
  { model_name: "XGBoost",      RMSE: 0.0641, MAE: 0.0578, R2: 0.9841 },
  { model_name: "ARIMA",        RMSE: 0.0662, MAE: 0.0609, R2: 0.9986 },
  { model_name: "RandomForest", RMSE: 0.0664, MAE: 0.0579, R2: 0.9959 },
  { model_name: "Prophet",      RMSE: 0.0992, MAE: 0.0897, R2: 0.9963 },
  { model_name: "Lasso",        RMSE: 0.1102, MAE: 0.0958, R2: 0.9871 },
  { model_name: "Ridge",        RMSE: 0.1236, MAE: 0.1084, R2: 0.9964 },
];
