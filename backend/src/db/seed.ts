import { computeQuote } from '../pricing.js';
import { pool } from './pool.js';
import { concerts, MOCK_ORDERS, MOCK_USER, tiers } from './seed-data.js';

async function main() {
  await pool.query('TRUNCATE orders, concerts, tiers, users CASCADE');

  for (let i = 0; i < concerts.length; i++) {
    const c = concerts[i];
    await pool.query(
      `INSERT INTO concerts (id, sort_order, day, genre, price_from, art, ru, en)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [c.id, i, c.day, c.genre, c.priceFrom, c.art, JSON.stringify(c.ru), JSON.stringify(c.en)],
    );
  }

  for (let i = 0; i < tiers.length; i++) {
    const t = tiers[i];
    await pool.query(
      `INSERT INTO tiers (id, sort_order, price, ru, en) VALUES ($1, $2, $3, $4, $5)`,
      [t.id, i, t.price, JSON.stringify(t.ru), JSON.stringify(t.en)],
    );
  }

  const u = MOCK_USER;
  await pool.query(
    `INSERT INTO users (id, initials, email, name_ru, name_en, city_ru, city_en, stat_shows, stat_cities, stat_hours)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
    [u.id, u.initials, u.email, u.nameRu, u.nameEn, u.cityRu, u.cityEn, u.statShows, u.statCities, u.statHours],
  );

  for (const o of MOCK_ORDERS) {
    const tier = tiers.find((t) => t.id === o.tierId)!;
    const q = computeQuote(tier.price, o.qty);
    await pool.query(
      `INSERT INTO orders (id, user_id, concert_id, tier_id, qty, subtotal, fees, total, pay_method)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [o.id, u.id, o.concertId, o.tierId, o.qty, q.subtotal, q.fees, q.total, 'card'],
    );
  }

  console.log(
    `✅ Seeded ${concerts.length} concerts, ${tiers.length} tiers, 1 user, ${MOCK_ORDERS.length} orders`,
  );
}

main()
  .catch((err) => {
    console.error('❌ Seed failed:', err instanceof Error ? err.message : err);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
