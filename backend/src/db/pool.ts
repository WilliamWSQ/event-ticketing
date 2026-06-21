import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error(
    'DATABASE_URL is not set. Copy backend/.env.example to backend/.env and fill it in.',
  );
}

/**
 * Shared connection pool. The Prisma Postgres pooled endpoint requires TLS;
 * the managed endpoint terminates SSL upstream so we don't pin a CA here.
 */
export const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
  max: 10,
});

/** Tagged helper for one-off queries. */
export async function query<T extends pg.QueryResultRow = pg.QueryResultRow>(
  text: string,
  params?: unknown[],
) {
  return pool.query<T>(text, params as never[]);
}
