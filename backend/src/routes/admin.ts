import { Router } from 'express';
import { pool } from '../db/pool.js';
import { ah } from '../http.js';
import { toConcert, toTier, type ConcertRow, type Genre, type TierRow } from '../types.js';

const router = Router();

const GENRES: Genre[] = ['Techno', 'Rave', 'Pop', 'Hip-Hop', 'Electro-Pop'];

/**
 * Optional shared-secret guard. If ADMIN_TOKEN is set in the environment,
 * admin routes require a matching `x-admin-token` header; otherwise they're
 * open (local dev). Protect this before any deployment.
 */
const ADMIN_TOKEN = process.env.ADMIN_TOKEN;
router.use((req, res, next) => {
  if (!ADMIN_TOKEN || req.header('x-admin-token') === ADMIN_TOKEN) {
    next();
    return;
  }
  res.status(401).json({ error: 'Unauthorized' });
});

/* ---------------------------------------------------------------- stats */

router.get(
  '/stats',
  ah(async (_req, res) => {
    const { rows } = await pool.query<{
      concerts: string;
      orders: string;
      revenue: string | null;
      users: string;
    }>(
      `SELECT
         (SELECT count(*) FROM concerts) AS concerts,
         (SELECT count(*) FROM orders)   AS orders,
         (SELECT coalesce(sum(total), 0) FROM orders) AS revenue,
         (SELECT count(*) FROM users)    AS users`,
    );
    const r = rows[0];
    res.json({
      concerts: Number(r.concerts),
      orders: Number(r.orders),
      revenue: Number(r.revenue ?? 0),
      users: Number(r.users),
    });
  }),
);

/* ------------------------------------------------------------- concerts */

interface ConcertBody {
  id?: string;
  day?: string;
  genre?: string;
  priceFrom?: number;
  art?: string;
  sortOrder?: number;
  ru?: unknown;
  en?: unknown;
}

function validateConcert(body: ConcertBody, requireId: boolean): string | null {
  if (requireId && (!body.id || !/^[a-z0-9-]+$/i.test(body.id))) {
    return 'id is required (letters, numbers, dashes)';
  }
  if (!body.day) return 'day is required';
  if (!body.genre || !GENRES.includes(body.genre as Genre)) {
    return `genre must be one of: ${GENRES.join(', ')}`;
  }
  if (typeof body.priceFrom !== 'number' || body.priceFrom < 0) {
    return 'priceFrom must be a non-negative number';
  }
  if (!body.art) return 'art (gradient) is required';
  for (const lang of ['ru', 'en'] as const) {
    const loc = body[lang] as Record<string, unknown> | undefined;
    if (!loc || typeof loc !== 'object') return `${lang} content is required`;
    for (const key of ['artist', 'tour', 'venue', 'city', 'month', 'dateLong', 'time']) {
      if (typeof loc[key] !== 'string' || !loc[key]) return `${lang}.${key} is required`;
    }
    if (!Array.isArray(loc.lineup)) return `${lang}.lineup must be an array`;
  }
  return null;
}

router.post(
  '/concerts',
  ah(async (req, res) => {
    const body = (req.body ?? {}) as ConcertBody;
    const err = validateConcert(body, true);
    if (err) {
      res.status(400).json({ error: err });
      return;
    }
    const exists = await pool.query('SELECT 1 FROM concerts WHERE id = $1', [body.id]);
    if (exists.rows.length) {
      res.status(409).json({ error: `Concert "${body.id}" already exists` });
      return;
    }
    const sortRow = await pool.query<{ next: number }>(
      'SELECT coalesce(max(sort_order), -1) + 1 AS next FROM concerts',
    );
    const sortOrder = body.sortOrder ?? sortRow.rows[0].next;
    const { rows } = await pool.query<ConcertRow>(
      `INSERT INTO concerts (id, sort_order, day, genre, price_from, art, ru, en)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [
        body.id,
        sortOrder,
        body.day,
        body.genre,
        body.priceFrom,
        body.art,
        JSON.stringify(body.ru),
        JSON.stringify(body.en),
      ],
    );
    res.status(201).json(toConcert(rows[0]));
  }),
);

router.put(
  '/concerts/:id',
  ah(async (req, res) => {
    const body = (req.body ?? {}) as ConcertBody;
    const err = validateConcert(body, false);
    if (err) {
      res.status(400).json({ error: err });
      return;
    }
    const { rows } = await pool.query<ConcertRow>(
      `UPDATE concerts
          SET day = $2, genre = $3, price_from = $4, art = $5, ru = $6, en = $7,
              sort_order = COALESCE($8, sort_order)
        WHERE id = $1
        RETURNING *`,
      [
        req.params.id,
        body.day,
        body.genre,
        body.priceFrom,
        body.art,
        JSON.stringify(body.ru),
        JSON.stringify(body.en),
        body.sortOrder ?? null,
      ],
    );
    if (!rows.length) {
      res.status(404).json({ error: 'Concert not found' });
      return;
    }
    res.json(toConcert(rows[0]));
  }),
);

router.delete(
  '/concerts/:id',
  ah(async (req, res) => {
    const { rowCount } = await pool.query('DELETE FROM concerts WHERE id = $1', [req.params.id]);
    if (!rowCount) {
      res.status(404).json({ error: 'Concert not found' });
      return;
    }
    res.status(204).end();
  }),
);

/* --------------------------------------------------------------- orders */

router.get(
  '/orders',
  ah(async (_req, res) => {
    const { rows } = await pool.query(
      `SELECT o.id, o.qty, o.subtotal, o.fees, o.total, o.pay_method, o.created_at,
              o.concert_id, o.tier_id, o.user_id,
              c.ru->>'artist' AS artist_ru, c.en->>'artist' AS artist_en,
              t.ru->>'name'   AS tier_ru,   t.en->>'name'   AS tier_en,
              u.email AS user_email
         FROM orders o
         LEFT JOIN concerts c ON c.id = o.concert_id
         LEFT JOIN tiers t    ON t.id = o.tier_id
         LEFT JOIN users u    ON u.id = o.user_id
        ORDER BY o.created_at DESC`,
    );
    res.json(
      rows.map((r) => ({
        id: r.id,
        createdAt: r.created_at,
        qty: r.qty,
        subtotal: r.subtotal,
        fees: r.fees,
        total: r.total,
        payMethod: r.pay_method,
        concertId: r.concert_id,
        tierId: r.tier_id,
        userId: r.user_id,
        concertArtist: { ru: r.artist_ru, en: r.artist_en },
        tierName: { ru: r.tier_ru, en: r.tier_en },
        userEmail: r.user_email,
      })),
    );
  }),
);

/* ---------------------------------------------------------------- tiers */

router.put(
  '/tiers/:id',
  ah(async (req, res) => {
    const { price } = (req.body ?? {}) as { price?: number };
    if (typeof price !== 'number' || price < 0) {
      res.status(400).json({ error: 'price must be a non-negative number' });
      return;
    }
    const { rows } = await pool.query<TierRow>(
      'UPDATE tiers SET price = $2 WHERE id = $1 RETURNING *',
      [req.params.id, price],
    );
    if (!rows.length) {
      res.status(404).json({ error: 'Tier not found' });
      return;
    }
    res.json(toTier(rows[0]));
  }),
);

/* ---------------------------------------------------------------- users */

function mapUser(u: Record<string, unknown>) {
  return {
    id: u.id,
    initials: u.initials,
    email: u.email,
    nameRu: u.name_ru,
    nameEn: u.name_en,
    cityRu: u.city_ru,
    cityEn: u.city_en,
    statShows: u.stat_shows,
    statCities: u.stat_cities,
    statHours: u.stat_hours,
  };
}

router.get(
  '/users',
  ah(async (_req, res) => {
    const { rows } = await pool.query('SELECT * FROM users ORDER BY id');
    res.json(rows.map(mapUser));
  }),
);

router.put(
  '/users/:id',
  ah(async (req, res) => {
    const b = (req.body ?? {}) as Record<string, unknown>;
    const { rows } = await pool.query(
      `UPDATE users SET
         initials   = COALESCE($2, initials),
         email      = COALESCE($3, email),
         name_ru    = COALESCE($4, name_ru),
         name_en    = COALESCE($5, name_en),
         city_ru    = COALESCE($6, city_ru),
         city_en    = COALESCE($7, city_en),
         stat_shows  = COALESCE($8, stat_shows),
         stat_cities = COALESCE($9, stat_cities),
         stat_hours  = COALESCE($10, stat_hours)
       WHERE id = $1
       RETURNING *`,
      [
        req.params.id,
        b.initials ?? null,
        b.email ?? null,
        b.nameRu ?? null,
        b.nameEn ?? null,
        b.cityRu ?? null,
        b.cityEn ?? null,
        b.statShows ?? null,
        b.statCities ?? null,
        b.statHours ?? null,
      ],
    );
    if (!rows.length) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json(mapUser(rows[0]));
  }),
);

export default router;
