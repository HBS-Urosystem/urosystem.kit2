import { defineType, defineField, defineArrayMember } from 'sanity'
import {BlockContentIcon} from '@sanity/icons'

export const textBlock = defineType({
  type: "object",
  name: "textBlock",
  fields: [
    defineField({
      type: "string",
      name: "title",
      title: "Headline",
    }),
    defineField({
      type: "string",
      name: "subtitle",
      title: "Description",
    }),
    defineField({
      type: "array",
      name: "content",
      of: [
        defineArrayMember({
          type: "block",
          marks: {
            annotations: [
              {
                name: 'internalLink',
                type: 'object',
                title: 'Internal link',
                fields: [
                  {
                    name: 'reference',
                    type: 'reference',
                    title: 'Reference',
                    to: [
                      { type: 'page' },
                      // other types you may want to link to
                    ]
                  }
                ]
              },
              {
                name: 'externalLink',
                type: 'object',
                title: 'External link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL'
                  },
                  {
                    title: 'Open in new tab',
                    name: 'blank',
                    description: 'Read https://css-tricks.com/use-target_blank/',
                    type: 'boolean'
                  }
                ]
              },
            ]
          }
        }),
        defineArrayMember({
          type: "image",
          fields: [
            {
              type: "string",
              name: "caption",
            },
          ],
          options: { hotspot: true },
        }),
        defineArrayMember({
          type: "video",
        }),
        defineArrayMember({
          type: "cta",
        }),
      ],
    }),
  ],
  icon: BlockContentIcon,
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: title && `${title} ${subtitle}` || subtitle && `${subtitle}` || 'Text Content',
        subtitle: 'Text Content',
        media: BlockContentIcon
      }
    }
  }
});

