// src/data/sample/riftbound.ts
// Fallback data — used when public/data/riftbound/ files are unavailable.
import type { RiftboundSummary, PriceRow, TopMover, ModelRow } from "@/types/riftbound";

export const RIFTBOUND_SUMMARY: RiftboundSummary = {
  lastUpdated: null,
  avgPrice: 71.40,
  totalSkus: 512,
  bestRmse: 2.56,
  bestR2: 0.998,
};

export const RIFTBOUND_PRICES: PriceRow[] = [
  { date: "2025-11-01", card_name: "Aurelia, Voice of Dawn", price: 65.00, forecast: 65.80 },
  { date: "2025-11-02", card_name: "Aurelia, Voice of Dawn", price: 66.20, forecast: 66.50 },
  { date: "2025-11-03", card_name: "Aurelia, Voice of Dawn", price: 65.80, forecast: 66.10 },
  { date: "2025-11-04", card_name: "Aurelia, Voice of Dawn", price: 67.40, forecast: 67.20 },
  { date: "2025-11-05", card_name: "Aurelia, Voice of Dawn", price: 68.50, forecast: 68.00 },
  { date: "2025-11-06", card_name: "Aurelia, Voice of Dawn", price: 67.90, forecast: 68.30 },
  { date: "2025-11-07", card_name: "Aurelia, Voice of Dawn", price: 69.20, forecast: 69.50 },
  { date: "2025-11-08", card_name: "Aurelia, Voice of Dawn", price: 70.10, forecast: 70.40 },
  { date: "2025-11-09", card_name: "Aurelia, Voice of Dawn", price: 69.80, forecast: 70.20 },
  { date: "2025-11-10", card_name: "Aurelia, Voice of Dawn", price: 71.30, forecast: 71.60 },
  { date: "2025-11-11", card_name: "Aurelia, Voice of Dawn", price: 72.40, forecast: 72.10 },
  { date: "2025-11-12", card_name: "Aurelia, Voice of Dawn", price: 71.90, forecast: 72.30 },
  { date: "2025-11-13", card_name: "Aurelia, Voice of Dawn", price: 73.50, forecast: 73.80 },
  { date: "2025-11-14", card_name: "Aurelia, Voice of Dawn", price: 74.20, forecast: 74.50 },
];

export const RIFTBOUND_TOP_MOVERS: TopMover[] = [
  { card_name: "Aurelia, Voice of Dawn", price_change: 8.50,  change_pct: 12.9, direction: "up"   },
  { card_name: "Zephyr Drake",           price_change: 4.20,  change_pct: 8.1,  direction: "up"   },
  { card_name: "Ironclad Sentinel",      price_change: -3.10, change_pct: -6.4, direction: "down" },
  { card_name: "Voidwatcher",            price_change: -5.80, change_pct: -9.7, direction: "down" },
  { card_name: "Solaris Blade",          price_change: 2.30,  change_pct: 4.2,  direction: "up"   },
  { card_name: "Thornbark Warden",       price_change: -1.90, change_pct: -3.1, direction: "down" },
];

export const RIFTBOUND_MODELS: ModelRow[] = [
  { model: "Prophet",       rmse: 2.56, mae: 1.98, r2: 0.998 },
  { model: "XGBoost",       rmse: 3.14, mae: 2.41, r2: 0.993 },
  { model: "Random Forest", rmse: 3.82, mae: 2.87, r2: 0.988 },
  { model: "ARIMA",         rmse: 4.51, mae: 3.34, r2: 0.981 },
  { model: "Ridge",         rmse: 6.23, mae: 4.71, r2: 0.962 },
  { model: "Lasso",         rmse: 6.47, mae: 4.89, r2: 0.959 },
];
