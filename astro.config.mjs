// @ts-check
import { defineConfig } from 'astro/config';
import sanity from '@sanity/astro';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://floorplay.agency',
  integrations: [
    sanity({
      projectId: 'tvo5sug9',
      dataset: 'production',
      useCdn: import.meta.env.PROD, // Use CDN in production for better performance
      apiVersion: '2024-01-01'
    }),
    sitemap()
  ]
});
