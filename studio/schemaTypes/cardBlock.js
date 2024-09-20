import { defineType, defineField, defineArrayMember } from 'sanity'
import {BlockElementIcon} from '@sanity/icons'

export const cardBlock = defineType({
  type: "object",
  name: "cardBlock",
  title: "Card block",
  fields: [
    defineField({
      type: "string",
      name: "title",
      title: "Headline"
    }),
    defineField({
      type: "string",
      name: "subtitle",
      title: "Description"
    }),
    defineField({
      type: "array",
      name: "sections",
      title: "Card Blocks",
      of: [
        defineArrayMember({
          type: "heroBlock",
        }),
        defineArrayMember({
          type: "textBlock",
          title: "Text content"
        }),
        defineArrayMember({
          type: "detailsItem",
          title: "Accordion List Item",
        }),
        defineArrayMember({
          type: "cta",
          title: "CTA"
        }),
        defineArrayMember({
          type: "slider",
          title: "Slider",
        }),
      ],
    }),
    defineField({
      type: "string",
      name: "caption",
    }),
  ],
  icon: BlockElementIcon,
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      ctas: 'ctas'
    },
    prepare(selection) {
      const {title, subtitle, sections} = selection
      return {
        title: title && `${title} ${subtitle}` || subtitle && `${subtitle}`,
        subtitle: 'Card',
        media: BlockElementIcon
      }
    }
  }
});

