import {defineField, defineType} from 'sanity'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
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
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'Brief summary for listings and meta description',
      validation: (rule) => rule.required().max(160)
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'}
          ]
        },
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {name: 'alt', type: 'string', title: 'Alt Text'},
            {name: 'caption', type: 'string', title: 'Caption'}
          ]
        }
      ],
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        {name: 'alt', type: 'string', title: 'Alt Text'}
      ]
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Epoxy Flooring', value: 'epoxy-flooring'},
          {title: 'Garage Floors', value: 'garage-floors'},
          {title: 'Basement Floors', value: 'basement-floors'},
          {title: 'Maintenance Tips', value: 'maintenance'},
          {title: 'Before & After', value: 'before-after'},
          {title: 'Local Projects', value: 'local-projects'},
          {title: 'Material Guide', value: 'materials'},
          {title: 'DIY vs Professional', value: 'diy-vs-pro'}
        ]
      }
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      description: 'SEO and content tags'
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      initialValue: 'Expert Team'
    }),
    defineField({
      name: 'relatedServices',
      title: 'Related Services',
      type: 'array',
      of: [{type: 'reference', to: {type: 'service'}}],
      description: 'Services mentioned in this post'
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {name: 'metaTitle', type: 'string', title: 'Meta Title'},
        {name: 'metaDescription', type: 'text', title: 'Meta Description'},
        {name: 'keywords', type: 'array', of: [{type: 'string'}], title: 'Focus Keywords'},
        {name: 'canonicalUrl', type: 'url', title: 'Canonical URL'}
      ]
    }),
    defineField({
      name: 'aiContent',
      title: 'AI Training Content',
      type: 'object',
      description: 'Structured content for AI chatbot training',
      fields: [
        {
          name: 'keyTakeaways',
          title: 'Key Takeaways',
          type: 'array',
          of: [{type: 'string'}],
          description: 'Main points AI should remember from this post'
        },
        {
          name: 'expertTips',
          title: 'Expert Tips',
          type: 'array',
          of: [{type: 'string'}],
          description: 'Professional tips to share with customers'
        },
        {
          name: 'commonMisconceptions',
          title: 'Common Misconceptions',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'myth', type: 'string', title: 'Myth/Misconception'},
                {name: 'truth', type: 'text', title: 'The Truth'}
              ]
            }
          ]
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'publishedAt',
      media: 'featuredImage'
    },
    prepare({title, subtitle, media}) {
      return {
        title,
        subtitle: subtitle ? new Date(subtitle).toLocaleDateString() : 'No publish date',
        media
      }
    }
  }
})
