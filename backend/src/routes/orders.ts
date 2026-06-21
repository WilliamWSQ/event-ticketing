import { Router } from 'express';
import { pool } from '../db/pool.js';
import { ah } from '../http.js';
import { computeQuote, isValidQty, MAX_QTY, newOrderId } from '../pricing.js';
import { toConcert, toTier, type ConcertRow, type TierRow } from '../types.js';

const router = Router();

// In this slice there's a single mock account; real auth would supply this.
const MOCK_USER_ID = 'u_alisa';

async function tierPrice(tierId: unknown): Promise<number | null> {
  if (typeof tierId !== 'string') return null;
  const { rows } = await pool.query<{ price: number }>('SELECT price FROM tiers WHERE id = $1', [
    tierId,
  ]);
  return rows.length ? rows[0].price : null;
}

/** POST /api/orders/quote — server-authoritative pricing. */
router.post(
  '/quote',
  ah(async (req, res) => {
    const { tierId, qty } = req.body ?? {};
    if (!isValidQty(qty)) {
      res.status(400).json({ error: `qty must be an integer between 1 and ${MAX_QTY}` });
      return;
    }
    const price = await tierPrice(tierId);
    if (price === null) {
      res.status(404).json({ error: 'Tier not found' });
      return;
    }
    res.json(computeQuote(price, qty));
  }),
);

/** POST /api/orders — confirm purchase, create the order, return the real id. */
router.post(
  '/',
  ah(async (req, res) => {
    const { concertId, tierId, qty, payMethod } = req.body ?? {};
    if (!isValidQty(qty)) {
      res.status(400).json({ error: `qty must be an integer between 1 and ${MAX_QTY}` });
      return;
    }
    const concert = await pool.query('SELECT id FROM concerts WHERE id = $1', [concertId]);
    if (!concert.rows.length) {
      res.status(404).json({ error: 'Concert not found' });
      return;
    }
    const price = await tierPrice(tierId);
    if (price === null) {
      res.status(404).json({ error: 'Tier not found' });
      return;
    }

    const q = computeQuote(price, qty);
    const orderId = newOrderId();
    await pool.query(
      `INSERT INTO orders (id, user_id, concert_id, tier_id, qty, subtotal, fees, total, pay_method)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [orderId, MOCK_USER_ID, concertId, tierId, qty, q.subtotal, q.fees, q.total, payMethod ?? null],
    );
    res.status(201).json({ orderId, concertId, tierId, qty, ...q });
  }),
);

/** GET /api/orders/:orderId — ticket data (order + concert + tier). */
router.get(
  '/:orderId',
  ah(async (req, res) => {
    const { rows } = await pool.query('SELECT * FROM orders WHERE id = $1', [req.params.orderId]);
    if (!rows.length) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }
    const o = rows[0];
    const concert = await pool.query<ConcertRow>('SELECT * FROM concerts WHERE id = $1', [
      o.concert_id,
    ]);
    const tier = await pool.query<TierRow>('SELECT * FROM tiers WHERE id = $1', [o.tier_id]);
    res.json({
      orderId: o.id,
      qty: o.qty,
      payMethod: o.pay_method,
      subtotal: o.subtotal,
      fees: o.fees,
      total: o.total,
      concert: concert.rows.length ? toConcert(concert.rows[0]) : null,
      tier: tier.rows.length ? toTier(tier.rows[0]) : null,
    });
  }),
);

export default router;
