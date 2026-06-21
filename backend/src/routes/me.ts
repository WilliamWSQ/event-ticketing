import { Router } from 'express';
import { pool } from '../db/pool.js';
import { ah } from '../http.js';

const router = Router();

const MOCK_USER_ID = 'u_alisa';

/** GET /api/me — profile + stats for the current (mock) user. */
router.get(
  '/',
  ah(async (_req, res) => {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [MOCK_USER_ID]);
    if (!rows.length) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    const u = rows[0];
    res.json({
      initials: u.initials,
      email: u.email,
      name: { ru: u.name_ru, en: u.name_en },
      city: { ru: u.city_ru, en: u.city_en },
      stats: { shows: u.stat_shows, cities: u.stat_cities, hours: u.stat_hours },
    });
  }),
);

/** GET /api/me/tickets — the user's upcoming tickets (concert + tier refs). */
router.get(
  '/tickets',
  ah(async (_req, res) => {
    const { rows } = await pool.query(
      `SELECT o.id, o.concert_id, o.tier_id
         FROM orders o
         JOIN concerts c ON c.id = o.concert_id
        WHERE o.user_id = $1
        ORDER BY c.sort_order`,
      [MOCK_USER_ID],
    );
    res.json(rows.map((r) => ({ orderId: r.id, concertId: r.concert_id, tierId: r.tier_id })));
  }),
);

export default router;
