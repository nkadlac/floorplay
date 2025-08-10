import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'

// Import schemas
import {page} from './schemas/page'
import {service} from './schemas/service'
import {faq} from './schemas/faq'
import {caseStudy} from './schemas/caseStudy'
import {blogPost} from './schemas/blogPost'
import {seoSettings} from './schemas/seoSettings'

export default defineConfig({
  name: 'default',
  title: 'Epoxy Floor Agency',

  projectId: 'tvo5sug9',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: [
      // Content types
      page,
      service,
      faq,
      caseStudy,
      blogPost,
      
      // Settings
      seoSettings,
    ],
  },
})
