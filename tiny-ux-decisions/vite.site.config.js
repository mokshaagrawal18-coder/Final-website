import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Builds version 2 into the personal site's public folder, where it is served at /tiny-ux-decisions/.
// Run with `npm run build:site`, then commit the output in ../public/tiny-ux-decisions/.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: resolve(import.meta.dirname, '../public/tiny-ux-decisions'),
    emptyOutDir: true,
    rollupOptions: {
      input: { index: resolve(import.meta.dirname, 'v2.html') },
    },
  },
});
