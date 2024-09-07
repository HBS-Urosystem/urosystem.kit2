import {defineField, defineArrayMember, defineType} from 'sanity'
import {ChevronDownIcon} from '@sanity/icons'

export const detailsBlock = defineType({
  name: 'detailsBlock',
  title: 'Accordion',
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
        //media: image || ChevronDownIcon,
      }
    },
  },
})