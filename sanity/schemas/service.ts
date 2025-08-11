import {defineField, defineType} from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Service Name',
      type: 'string',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      description: 'Brief description for cards and listings',
      validation: (rule) => rule.required().max(200)
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Detailed service description'
    }),
    defineField({
      name: 'features',
      title: 'Service Features',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Key features or benefits of this service'
    }),
    defineField({
      name: 'process',
      title: 'Service Process',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'step', type: 'string', title: 'Step Title'},
            {name: 'description', type: 'text', title: 'Step Description'}
          ]
        }
      ],
      description: 'Step-by-step process for this service'
    }),
    defineField({
      name: 'pricing',
      title: 'Pricing Information',
      type: 'object',
      fields: [
        {
          name: 'startingPrice',
          title: 'Starting Price',
          type: 'number',
          description: 'Base price per square foot'
        },
        {
          name: 'priceUnit',
          title: 'Price Unit',
          type: 'string',
          initialValue: 'per sq ft',
          options: {
            list: ['per sq ft', 'per hour', 'flat rate']
          }
        },
        {
          name: 'priceFactors',
          title: 'Price Factors',
          type: 'array',
          of: [{type: 'string'}],
          description: 'Factors that affect pricing (for AI chatbot)'
        }
      ]
    }),
    defineField({
      name: 'materials',
      title: 'Materials Used',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'name', type: 'string', title: 'Material Name'},
            {name: 'description', type: 'text', title: 'Material Description'},
            {name: 'benefits', type: 'array', of: [{type: 'string'}], title: 'Benefits'}
          ]
        }
      ]
    }),
    defineField({
      name: 'serviceArea',
      title: 'Service Areas',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Geographic areas where this service is offered'
    }),
    defineField({
      name: 'duration',
      title: 'Typical Duration',
      type: 'object',
      fields: [
        {name: 'prep', type: 'string', title: 'Prep Time'},
        {name: 'installation', type: 'string', title: 'Installation Time'},
        {name: 'curing', type: 'string', title: 'Curing Time'},
        {name: 'total', type: 'string', title: 'Total Project Time'}
      ]
    }),
    defineField({
      name: 'images',
      title: 'Service Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {name: 'alt', type: 'string', title: 'Alt Text'},
            {name: 'caption', type: 'string', title: 'Caption'}
          ]
        }
      ]
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {name: 'metaTitle', type: 'string', title: 'Meta Title'},
        {name: 'metaDescription', type: 'text', title: 'Meta Description'},
        {name: 'keywords', type: 'array', of: [{type: 'string'}], title: 'Keywords'}
      ]
    }),
    defineField({
      name: 'faq',
      title: 'Frequently Asked Questions',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'FAQ Item',
          fields: [
            {
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (rule) => rule.required()
            },
            {
              name: 'answer',
              title: 'Answer', 
              type: 'text',
              validation: (rule) => rule.required()
            }
          ],
          preview: {
            select: {
              title: 'question',
              subtitle: 'answer'
            }
          }
        }
      ],
      description: 'Frequently asked questions to display on the service page'
    }),
    defineField({
      name: 'aiTrainingData',
      title: 'AI Training Data',
      type: 'object',
      description: 'Specific information for AI chatbot responses',
      fields: [
        {
          name: 'commonQuestions',
          title: 'Common Questions',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'question', type: 'string', title: 'Question'},
                {name: 'answer', type: 'text', title: 'Answer'}
              ]
            }
          ]
        },
        {
          name: 'quickFacts',
          title: 'Quick Facts',
          type: 'array',
          of: [{type: 'string'}],
          description: 'Key facts for quick AI responses'
        },
        {
          name: 'warnings',
          title: 'Important Warnings/Notes',
          type: 'array',
          of: [{type: 'string'}],
          description: 'Things customers should know or be warned about'
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'shortDescription',
      media: 'images.0'
    }
  }
})
