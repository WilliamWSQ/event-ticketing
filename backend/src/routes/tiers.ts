import { Router } from 'express';
import { pool } from '../db/pool.js';
import { ah } from '../http.js';
import { toTier, type TierRow } from '../types.js';

const router = Router();

/** GET /api/tiers — the 4 zones, ordered. */
router.get(
  '/',
  ah(async (_req, res) => {
    const { rows } = await pool.query<TierRow>('SELECT * FROM tiers ORDER BY sort_order');
    res.json(rows.map(toTier));
  }),
);

export default router;
