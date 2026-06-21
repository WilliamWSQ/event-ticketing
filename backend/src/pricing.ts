/** Authoritative, server-side pricing. Never trust client-supplied money. */

export const SERVICE_FEE_RATE = 0.12;
export const MIN_QTY = 1;
export const MAX_QTY = 8;

export interface Quote {
  subtotal: number;
  fees: number;
  total: number;
}

/** subtotal = price × qty; fees = round(subtotal × 12%); total = subtotal + fees. */
export function computeQuote(unitPrice: number, qty: number): Quote {
  const subtotal = unitPrice * qty;
  const fees = Math.round(subtotal * SERVICE_FEE_RATE);
  return { subtotal, fees, total: subtotal + fees };
}

/** Clamp/validate an order quantity. */
export function isValidQty(qty: unknown): qty is number {
  return Number.isInteger(qty) && (qty as number) >= MIN_QTY && (qty as number) <= MAX_QTY;
}

/** Fresh pseudo order id, e.g. `PLS-7F3K-26`. */
export function newOrderId(): string {
  const block = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `PLS-${block}-26`;
}
