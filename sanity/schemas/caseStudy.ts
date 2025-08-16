import { defineField, defineType } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required().max(100).error('Title is required and must be less than 100 characters')
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: input => input
          .toLowerCase()
          .replace(/\s+/g, '-')
          .slice(0, 96)
      },
      validation: Rule => Rule.required().error('Slug is required for URL generation')
    }),
    defineField({
      name: 'client',
      title: 'Client Name',
      type: 'string',
      validation: Rule => Rule.required().error('Client name is required')
    }),
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string',
      options: {
        list: [
          { title: 'Banking & Financial Services', value: 'Banking & Financial Services' },
          { title: 'Healthcare & Medical', value: 'Healthcare & Medical' },
          { title: 'Technology', value: 'Technology' },
          { title: 'Education & Academic', value: 'Education & Academic' },
          { title: 'Government & Public Sector', value: 'Government & Public Sector' },
          { title: 'Manufacturing & Industrial', value: 'Manufacturing & Industrial' },
          { title: 'Legal Services', value: 'Legal Services' },
          { title: 'Insurance', value: 'Insurance' },
          { title: 'Real Estate', value: 'Real Estate' },
          { title: 'Transportation & Logistics', value: 'Transportation & Logistics' },
          { title: 'Energy & Utilities', value: 'Energy & Utilities' },
          { title: 'Retail & Consumer', value: 'Retail & Consumer' },
          { title: 'Non-Profit', value: 'Non-Profit' },
          { title: 'Other', value: 'Other' }
        ],
        layout: 'dropdown'
      },
      validation: Rule => Rule.required().error('Industry is required')
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Geographic location of the project'
    }),
    defineField({
      name: 'duration',
      title: 'Project Duration',
      type: 'string',
      description: 'How long the project took (e.g., "6 months", "1 year")'
    }),
    defineField({
      name: 'completedDate',
      title: 'Completion Date',
      type: 'date',
      description: 'When the project was completed'
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
        metadata: ['blurhash', 'lqip', 'palette']
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility',
          validation: Rule => Rule.required()
        }
      ]
    }),
    defineField({
      name: 'challenge',
      title: 'Challenge',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' }
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Number', value: 'number' }
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' }
            ]
          }
        }
      ],
      validation: Rule => Rule.required().error('Challenge description is required'),
      description: 'Describe the main challenges the client faced'
    }),
    defineField({
      name: 'solution',
      title: 'Solution',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' }
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Number', value: 'number' }
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' }
            ]
          }
        }
      ],
      validation: Rule => Rule.required().error('Solution description is required'),
      description: 'Describe how IntelliDelve solved the challenges'
    }),
    defineField({
      name: 'implementation',
      title: 'Implementation Steps',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Key steps taken during implementation',
      validation: Rule => Rule.max(10).warning('Consider keeping implementation steps concise')
    }),
    defineField({
      name: 'results',
      title: 'Results & Metrics',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'metric',
          title: 'Metric',
          fields: [
            {
              name: 'metric',
              title: 'Metric Value',
              type: 'string',
              validation: Rule => Rule.required(),
              description: 'e.g., "85%", "2,000+", "50%"'
            },
            {
              name: 'label',
              title: 'Metric Label',
              type: 'string',
              validation: Rule => Rule.required(),
              description: 'e.g., "Faster Screening", "Candidates Processed"'
            },
            {
              name: 'improvement',
              title: 'Improvement Description',
              type: 'string',
              description: 'Additional context about the improvement'
            }
          ],
          preview: {
            select: {
              metric: 'metric',
              label: 'label'
            },
            prepare(selection) {
              const { metric, label } = selection
              return {
                title: `${metric} ${label}`,
                subtitle: 'Metric'
              }
            }
          }
        }
      ],
      validation: Rule => Rule.min(1).error('At least one result metric is required')
    }),
    defineField({
      name: 'testimonial',
      title: 'Client Testimonial',
      type: 'object',
      fields: [
        {
          name: 'quote',
          title: 'Quote',
          type: 'text',
          rows: 4,
          validation: Rule => Rule.required().max(500).error('Quote is required and must be less than 500 characters')
        },
        {
          name: 'author',
          title: 'Author Name',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'position',
          title: 'Position & Company',
          type: 'string',
          validation: Rule => Rule.required(),
          description: 'e.g., "CEO, TechCorp Inc."'
        },
        {
          name: 'authorImage',
          title: 'Author Photo',
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text'
            }
          ]
        }
      ],
      options: {
        collapsible: true,
        collapsed: false
      }
    }),
    defineField({
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
            metadata: ['blurhash', 'lqip', 'palette']
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              validation: Rule => Rule.required()
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
              description: 'Optional caption for the image'
            }
          ]
        }
      ],
      options: {
        layout: 'grid'
      },
      validation: Rule => Rule.max(10).warning('Consider limiting gallery to 10 images for performance')
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      },
      validation: Rule => Rule.max(10).error('Maximum 10 tags allowed'),
      description: 'Tags for categorization and filtering'
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
          { title: 'Archived', value: 'archived' }
        ],
        layout: 'radio'
      },
      initialValue: 'draft',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'featured',
      title: 'Featured Case Study',
      type: 'boolean',
      description: 'Mark as featured to highlight on homepage',
      initialValue: false
    })
  ],
  preview: {
    select: {
      title: 'title',
      client: 'client',
      industry: 'industry',
      media: 'featuredImage',
      status: 'status',
      featured: 'featured'
    },
    prepare(selection) {
      const { title, client, industry, media, status, featured } = selection
      const featuredText = featured ? ' ⭐' : ''
      
      return {
        title: `${title}${featuredText}`,
        subtitle: `${client} • ${industry} • ${status}`,
        media
      }
    }
  },
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [
        { field: 'publishedAt', direction: 'desc' }
      ]
    },
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'publishedAt', direction: 'desc' }
      ]
    },
    {
      title: 'Client A-Z',
      name: 'clientAsc',
      by: [
        { field: 'client', direction: 'asc' }
      ]
    },
    {
      title: 'Industry',
      name: 'industryAsc',
      by: [
        { field: 'industry', direction: 'asc' },
        { field: 'publishedAt', direction: 'desc' }
      ]
    }
  ]
})