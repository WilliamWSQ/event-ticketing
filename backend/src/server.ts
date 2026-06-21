import 'dotenv/config';
import express, { type NextFunction, type Request, type Response } from 'express';
import cors from 'cors';
import { pool } from './db/pool.js';
import { ah } from './http.js';
import concerts from './routes/concerts.js';
import tiers from './routes/tiers.js';
import orders from './routes/orders.js';
import me from './routes/me.js';
import admin from './routes/admin.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get(
  '/api/health',
  ah(async (_req, res) => {
    await pool.query('SELECT 1');
    res.json({ ok: true });
  }),
);

app.use('/api/concerts', concerts);
app.use('/api/tiers', tiers);
app.use('/api/orders', orders);
app.use('/api/me', me);
app.use('/api/admin', admin);

// 404
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: `Not found: ${req.method} ${req.path}` });
});

// error handler (must keep 4 args for Express to recognize it)
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[api error]', err);
  res.status(500).json({ error: 'Internal server error' });
});

const port = Number(process.env.PORT ?? 4000);
app.listen(port, () => {
  console.log(`🎟  PULSE API listening on http://localhost:${port}`);
});
