import { defineCollection, z } from 'astro:content';

const services = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    headline: z.string().optional(),
    shortDescription: z.string(),
    features: z.array(z.string()).optional(),
    seo: z.object({
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
    }).optional(),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    author: z.string().default('Nate Kadlac'),
    category: z.string(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).optional(),
    featured: z.boolean().default(false),
    readingTime: z.string().optional(),
    tableOfContents: z.array(z.object({
      title: z.string(),
      anchor: z.string()
    })).optional(),
    seo: z.object({
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
      keywords: z.array(z.string()).optional(),
    }).optional(),
  }),
});

export const collections = {
  services,
  blog,
};