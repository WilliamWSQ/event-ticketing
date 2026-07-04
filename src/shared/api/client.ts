import axios, { type AxiosRequestConfig } from 'axios';

/**
 * Configured axios client. In dev, Vite proxies `/api` → the Express server
 * (see vite.config). In production, serve the frontend behind a reverse proxy
 * that routes `/api`. Feature `api/` modules call `request()`.
 */
export const http = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

// Surface the server's `{ error }` message as a plain Error.
http.interceptors.response.use(
  (res) => res,
  (error: unknown) => {
    let message = 'Request failed';
    if (axios.isAxiosError(error)) {
      message = (error.response?.data as { error?: string } | undefined)?.error ?? error.message;
    } else if (error instanceof Error) {
      message = error.message;
    }
    return Promise.reject(new Error(message));
  },
);

/** Issue a request and return the response body. */
export async function request<T>(config: AxiosRequestConfig): Promise<T> {
  const { data } = await http.request<T>(config);
  return data;
}
