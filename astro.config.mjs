// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  site: 'https://floorplay.agency',
  output: 'hybrid',
  adapter: netlify(),
  vite: {
    resolve: {
      dedupe: ['sanity', '@sanity/ui']
    },
    optimizeDeps: {
      exclude: ['sanity', '@sanity/ui']
    }
  },
  integrations: [
    react(),
    sitemap({
      filter: (page) => page !== 'https://floorplay.agency/thank-you/'
    })
  ]
});
