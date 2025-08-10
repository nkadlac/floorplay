import {defineField, defineType} from 'sanity'

export const seoSettings = defineType({
  name: 'seoSettings',
  title: 'SEO Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Settings Name',
      type: 'string',
      initialValue: 'Global SEO Settings',
      readOnly: true
    }),
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      description: 'Your business name',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'siteUrl',
      title: 'Site URL',
      type: 'url',
      description: 'Your website URL (https://yoursite.com)',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'defaultMetaTitle',
      title: 'Default Meta Title Template',
      type: 'string',
      description: 'Template for page titles. Use {title} for page title placeholder',
      initialValue: '{title} | Professional Epoxy Floor Coating Services',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'defaultMetaDescription',
      title: 'Default Meta Description',
      type: 'text',
      description: 'Default description when pages don\'t have their own',
      validation: (rule) => rule.required().max(160)
    }),
    defineField({
      name: 'keywords',
      title: 'Primary Keywords',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Main keywords for your business'
    }),
    defineField({
      name: 'socialImage',
      title: 'Default Social Share Image',
      type: 'image',
      description: 'Default image for social media sharing'
    }),
    defineField({
      name: 'businessInfo',
      title: 'Business Information',
      type: 'object',
      description: 'For local SEO and structured data',
      fields: [
        {name: 'name', type: 'string', title: 'Business Name'},
        {name: 'description', type: 'text', title: 'Business Description'},
        {name: 'phone', type: 'string', title: 'Phone Number'},
        {name: 'email', type: 'string', title: 'Email Address'},
        {
          name: 'address',
          type: 'object',
          title: 'Address',
          fields: [
            {name: 'street', type: 'string', title: 'Street Address'},
            {name: 'city', type: 'string', title: 'City'},
            {name: 'state', type: 'string', title: 'State'},
            {name: 'zip', type: 'string', title: 'ZIP Code'},
            {name: 'country', type: 'string', title: 'Country', initialValue: 'United States'}
          ]
        },
        {
          name: 'serviceAreas',
          type: 'array',
          of: [{type: 'string'}],
          title: 'Service Areas',
          description: 'Cities/areas you serve (important for local SEO)'
        },
        {
          name: 'hours',
          type: 'object',
          title: 'Business Hours',
          fields: [
            {name: 'monday', type: 'string', title: 'Monday'},
            {name: 'tuesday', type: 'string', title: 'Tuesday'},
            {name: 'wednesday', type: 'string', title: 'Wednesday'},
            {name: 'thursday', type: 'string', title: 'Thursday'},
            {name: 'friday', type: 'string', title: 'Friday'},
            {name: 'saturday', type: 'string', title: 'Saturday'},
            {name: 'sunday', type: 'string', title: 'Sunday'}
          ]
        }
      ]
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media',
      type: 'object',
      fields: [
        {name: 'facebook', type: 'url', title: 'Facebook URL'},
        {name: 'instagram', type: 'url', title: 'Instagram URL'},
        {name: 'twitter', type: 'url', title: 'Twitter URL'},
        {name: 'linkedin', type: 'url', title: 'LinkedIn URL'},
        {name: 'youtube', type: 'url', title: 'YouTube URL'}
      ]
    }),
    defineField({
      name: 'analytics',
      title: 'Analytics & Tracking',
      type: 'object',
      fields: [
        {name: 'googleAnalyticsId', type: 'string', title: 'Google Analytics ID'},
        {name: 'googleTagManagerId', type: 'string', title: 'Google Tag Manager ID'},
        {name: 'facebookPixelId', type: 'string', title: 'Facebook Pixel ID'}
      ]
    }),
    defineField({
      name: 'aiChatbotSettings',
      title: 'AI Chatbot Settings',
      type: 'object',
      description: 'Settings for AI chatbot behavior',
      fields: [
        {
          name: 'welcomeMessage',
          type: 'string',
          title: 'Welcome Message',
          description: 'First message the chatbot shows',
          initialValue: 'Hi! I\'m here to help with questions about epoxy flooring and garage floor coatings. What can I help you with?'
        },
        {
          name: 'fallbackMessage',
          type: 'string',
          title: 'Fallback Message',
          description: 'Message when AI can\'t answer',
          initialValue: 'I\'m not sure about that. Would you like me to connect you with one of our flooring experts?'
        },
        {
          name: 'contactPrompt',
          type: 'string',
          title: 'Contact Prompt',
          description: 'How to encourage contact',
          initialValue: 'Ready for a free quote? I can help you get started!'
        },
        {
          name: 'businessContext',
          type: 'text',
          title: 'Business Context',
          description: 'Background info for AI about your business'
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'siteName'
    },
    prepare({title}) {
      return {
        title: title || 'SEO Settings'
      }
    }
  }
})
