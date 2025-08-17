// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://floorplay.agency',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => page !== 'https://floorplay.agency/thank-you/',
    })
  ]
});
