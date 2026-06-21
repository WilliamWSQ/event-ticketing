import { Router } from 'express';
import { pool } from '../db/pool.js';
import { ah } from '../http.js';
import { toConcert, type ConcertRow } from '../types.js';

const router = Router();

/** GET /api/concerts?genre=Techno — list (optionally filtered by genre). */
router.get(
  '/',
  ah(async (req, res) => {
    const genre = typeof req.query.genre === 'string' ? req.query.genre : undefined;
    const { rows } =
      genre && genre !== 'ALL'
        ? await pool.query<ConcertRow>(
            'SELECT * FROM concerts WHERE genre = $1 ORDER BY sort_order',
            [genre],
          )
        : await pool.query<ConcertRow>('SELECT * FROM concerts ORDER BY sort_order');
    res.json(rows.map(toConcert));
  }),
);

/** GET /api/concerts/:id — one concert. */
router.get(
  '/:id',
  ah(async (req, res) => {
    const { rows } = await pool.query<ConcertRow>('SELECT * FROM concerts WHERE id = $1', [
      req.params.id,
    ]);
    if (!rows.length) {
      res.status(404).json({ error: 'Concert not found' });
      return;
    }
    res.json(toConcert(rows[0]));
  }),
);

export default router;
