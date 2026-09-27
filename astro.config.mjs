// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Set this to the final domain before deploying (used for canonical URLs).
  site: 'https://mokshaagrawal.com',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
