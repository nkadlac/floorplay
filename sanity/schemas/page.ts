import {defineField, defineType} from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'This will be used for SEO and navigation',
      validation: (rule) => rule.required().max(60)
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Override the page title for SEO (max 60 characters)',
          validation: (rule) => rule.max(60)
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          description: 'Brief description for search engines (max 160 characters)',
          validation: (rule) => rule.max(160)
        },
        {
          name: 'keywords',
          title: 'Focus Keywords',
          type: 'array',
          of: [{type: 'string'}],
          description: 'Keywords for this page (for SEO and AI training)'
        },
        {
          name: 'openGraphImage',
          title: 'Social Share Image',
          type: 'image',
          description: 'Image for social media sharing'
        }
      ]
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'headline',
          title: 'Headline',
          type: 'string',
          description: 'Main headline (important for SEO)',
          validation: (rule) => rule.required()
        },
        {
          name: 'subheadline',
          title: 'Subheadline',
          type: 'text',
          description: 'Supporting text below headline'
        },
        {
          name: 'ctaText',
          title: 'CTA Button Text',
          type: 'string',
          initialValue: 'Get Free Quote'
        },
        {
          name: 'ctaLink',
          title: 'CTA Link',
          type: 'string',
          description: 'Where the CTA button links to'
        },
        {
          name: 'heroImage',
          title: 'Hero Image',
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    }),
    defineField({
      name: 'content',
      title: 'Page Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'}
          ],
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL'
                  }
                ]
              }
            ]
          }
        },
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              description: 'Important for SEO and accessibility'
            }
          ]
        }
      ],
      description: 'Rich content for this page - will be used for AI training'
    }),
    defineField({
      name: 'aiContext',
      title: 'AI Context',
      type: 'object',
      description: 'Information specifically for AI chatbot training',
      fields: [
        {
          name: 'summary',
          title: 'Page Summary',
          type: 'text',
          description: 'Brief summary of what this page covers (for AI context)'
        },
        {
          name: 'keyTopics',
          title: 'Key Topics',
          type: 'array',
          of: [{type: 'string'}],
          description: 'Main topics covered on this page'
        },
        {
          name: 'relatedQuestions',
          title: 'Related Questions',
          type: 'array',
          of: [{type: 'string'}],
          description: 'Questions customers might ask about this content'
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current'
    }
  }
})
