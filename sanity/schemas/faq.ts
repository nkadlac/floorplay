import {defineField, defineType} from 'sanity'

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'array',
      of: [{type: 'block'}],
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Epoxy Flooring', value: 'epoxy'},
          {title: 'Garage Floors', value: 'garage'},
          {title: 'Basement Floors', value: 'basement'},
          {title: 'Pricing', value: 'pricing'},
          {title: 'Process', value: 'process'},
          {title: 'Maintenance', value: 'maintenance'},
          {title: 'Materials', value: 'materials'},
          {title: 'Timeline', value: 'timeline'},
          {title: 'General', value: 'general'}
        ]
      },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Tags for better categorization and AI search'
    }),
    defineField({
      name: 'relatedServices',
      title: 'Related Services',
      type: 'array',
      of: [{type: 'reference', to: {type: 'service'}}],
      description: 'Services related to this FAQ'
    }),
    defineField({
      name: 'priority',
      title: 'Priority',
      type: 'number',
      description: 'Higher numbers show first (for AI and display)',
      initialValue: 1,
      validation: (rule) => rule.min(1).max(10)
    }),
    defineField({
      name: 'aiContext',
      title: 'AI Context',
      type: 'object',
      description: 'Additional context for AI responses',
      fields: [
        {
          name: 'alternativeQuestions',
          title: 'Alternative Ways to Ask',
          type: 'array',
          of: [{type: 'string'}],
          description: 'Different ways customers might ask this question'
        },
        {
          name: 'followUpQuestions',
          title: 'Common Follow-up Questions',
          type: 'array',
          of: [{type: 'string'}],
          description: 'Questions customers often ask after this one'
        },
        {
          name: 'shortAnswer',
          title: 'Short Answer',
          type: 'text',
          description: 'Concise answer for quick AI responses',
          validation: (rule) => rule.max(200)
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'category'
    }
  }
})
