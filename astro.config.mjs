// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sanity from '@sanity/astro';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://floorplay.agency',
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
    sanity({
      projectId: 'tvo5sug9',
      dataset: 'production',
      useCdn: import.meta.env.PROD, // Use CDN in production for better performance
      apiVersion: '2024-01-01',
      studioBasePath: '/studio',
      studioRouterHistory: 'hash'
    }),
    sitemap({
      filter: (page) => page !== 'https://floorplay.agency/thank-you/'
    })
  ]
});
