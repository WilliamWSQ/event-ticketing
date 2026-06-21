/**
 * Configured HTTP client. In dev, Vite proxies `/api` → the Express server
 * (see vite.config). In production, serve the frontend behind a reverse proxy
 * that routes `/api`. Feature `api/` modules build on this.
 */
const BASE = '/api';

export async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });
  if (!res.ok) {
    let detail = '';
    try {
      detail = ((await res.json()) as { error?: string }).error ?? '';
    } catch {
      /* ignore non-JSON error bodies */
    }
    throw new Error(detail || `Request failed: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as T;
}
