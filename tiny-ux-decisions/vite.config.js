import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Two pages from one codebase: index.html (version 1) and v2.html (version 2).
// Relative base so the built site works from any static host or sub-folder.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        v2: resolve(import.meta.dirname, 'v2.html'),
      },
    },
  },
});
