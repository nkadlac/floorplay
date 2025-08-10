import {defineField, defineType} from 'sanity'

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (rule) => rule.required()
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
      name: 'client',
      title: 'Client Name',
      type: 'string',
      description: 'Client name (can be anonymized like "Homeowner in Springfield")'
    }),
    defineField({
      name: 'location',
      title: 'Project Location',
      type: 'string',
      description: 'City/area (good for local SEO)'
    }),
    defineField({
      name: 'projectType',
      title: 'Project Type',
      type: 'reference',
      to: {type: 'service'},
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'challenge',
      title: 'Challenge/Problem',
      type: 'text',
      description: 'What problem did the client have?',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'solution',
      title: 'Our Solution',
      type: 'array',
      of: [{type: 'block'}],
      description: 'How we solved the problem'
    }),
    defineField({
      name: 'results',
      title: 'Results',
      type: 'array',
      of: [{type: 'block'}],
      description: 'The outcome and benefits'
    }),
    defineField({
      name: 'projectDetails',
      title: 'Project Details',
      type: 'object',
      fields: [
        {name: 'squareFootage', type: 'number', title: 'Square Footage'},
        {name: 'duration', type: 'string', title: 'Project Duration'},
        {name: 'materials', type: 'array', of: [{type: 'string'}], title: 'Materials Used'},
        {name: 'techniques', type: 'array', of: [{type: 'string'}], title: 'Techniques Used'}
      ]
    }),
    defineField({
      name: 'beforeImages',
      title: 'Before Images',
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
      name: 'afterImages',
      title: 'After Images',
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
      name: 'testimonial',
      title: 'Client Testimonial',
      type: 'object',
      fields: [
        {name: 'quote', type: 'text', title: 'Testimonial Quote'},
        {name: 'clientName', type: 'string', title: 'Client Name'},
        {name: 'rating', type: 'number', title: 'Rating (1-5)', validation: (rule) => rule.min(1).max(5)}
      ]
    }),
    defineField({
      name: 'featured',
      title: 'Featured Case Study',
      type: 'boolean',
      description: 'Show on homepage and in featured sections',
      initialValue: false
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
      name: 'aiContext',
      title: 'AI Training Context',
      type: 'object',
      description: 'Information for AI chatbot to reference this project',
      fields: [
        {
          name: 'summary',
          title: 'Project Summary',
          type: 'text',
          description: 'Brief summary for AI context'
        },
        {
          name: 'keyLearnings',
          title: 'Key Learnings',
          type: 'array',
          of: [{type: 'string'}],
          description: 'What can be learned from this project'
        },
        {
          name: 'applicableScenarios',
          title: 'When to Reference',
          type: 'array',
          of: [{type: 'string'}],
          description: 'When AI should mention this case study'
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'location',
      media: 'afterImages.0'
    }
  }
})
