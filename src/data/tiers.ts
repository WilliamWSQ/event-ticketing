import type { TierId } from '../types';

/**
 * Tier catalogue now lives in the backend (GET /api/tiers). Only client-side
 * config (UI accents, order limits) remains here.
 */

/** Accent color per zone — drives the color-coded arena buttons + selection ring. */
export const TIER_ACCENT: Record<TierId, string> = {
  vip: '#FF005C',
  gap: '#9580FF',
  ga: '#80EAFF',
  cabana: '#FFFFFF',
};

export const MAX_QTY = 8;
export const MIN_QTY = 1;
