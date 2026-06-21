import type { Lang } from '../types';

/**
 * Locale-aware ruble formatting. Prices stay in ₽ in both languages (Russian
 * market) — only the digit grouping changes (1 234 567 vs 1,234,567).
 */
export function formatRub(n: number, lang: Lang): string {
  return n.toLocaleString(lang === 'en' ? 'en-US' : 'ru-RU') + ' ₽';
}

/** Build a fresh pseudo-order id, e.g. `PLS-7F3K-26`. */
export function newOrderId(): string {
  const block = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `PLS-${block}-26`;
}
