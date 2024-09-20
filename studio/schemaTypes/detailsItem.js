import {defineField, defineArrayMember, defineType} from 'sanity'
import {ChevronDownIcon} from '@sanity/icons'

export const detailsItem = defineType({
  name: 'detailsItem',
  title: 'Accordion List Item',
  type: 'object',
  fields: [
    defineField({
      name: 'summary',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: "array",
      name: "details",
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
          type: "cta",
        }),
        /*defineArrayMember({
          type: "cardBlock",
          title: "Card Block"
        }),*/
        defineArrayMember({
          type: "slider",
          title: "Slider"
        }),
      ],
    }),
  ],
  icon: ChevronDownIcon,
  preview: {
    select: {
      title: 'summary',
    },
    prepare({title, image}) {
      return {
        title: title || 'Untitled',
        subtitle: 'Accordion',
        media: image || ChevronDownIcon,
      }
    },
  },
})