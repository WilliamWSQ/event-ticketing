import type { Request, Response, RequestHandler } from 'express';

/** Wrap an async route so rejected promises reach Express's error handler. */
export function ah(fn: (req: Request, res: Response) => Promise<unknown>): RequestHandler {
  return (req, res, next) => {
    fn(req, res).catch(next);
  };
}
