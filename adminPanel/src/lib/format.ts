/** Ruble formatting (admin uses ru-RU grouping). */
export function rub(n: number): string {
  return n.toLocaleString('ru-RU') + ' ₽';
}

/** Compact date-time for tables. */
export function dateTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString('ru-RU', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
