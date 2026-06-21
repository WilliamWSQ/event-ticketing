import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Admin panel dev server on :5174, proxying /api to the Express backend.
export default defineConfig({
  plugins: [react({ babel: { plugins: ['babel-plugin-styled-components'] } })],
  server: {
    port: 5174,
    proxy: {
      '/api': 'http://localhost:4000',
    },
  },
});
