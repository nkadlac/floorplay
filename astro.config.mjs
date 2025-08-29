// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://floorplay.agency',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => ![
        'https://floorplay.agency/thank-you/',
        'https://floorplay.agency/newsletter-thank-you/'
      ].includes(page),
    })
  ]
});
