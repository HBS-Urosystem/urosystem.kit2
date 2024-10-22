import { defineType, defineField, defineArrayMember } from 'sanity'
import {EllipsisHorizontalIcon} from '@sanity/icons'

export const slider = defineType({
  type: "object",
  name: "slider",
  title: "Slider block",
  fields: [
    defineField({
      type: "string",
      name: "title",
      title: "Heading",
    }),
    defineField({
      type: "string",
      name: "subtitle",
      title: "Description",
    }),
    defineField({
      type: "array",
      name: "sections",
      title: "Slider Blocks",
      of: [
        defineArrayMember({
          type: "textBlock",
          title: "Rich content"
        }),
        defineArrayMember({
          type: "cta",
          title: "CTA"
        }),
      ],
    }),
    defineField({
      type: "string",
      name: "caption",
    }),
  ],
  icon: EllipsisHorizontalIcon,
  preview: {
    select: {
      sections: 'sections',
    },
    prepare(sections) {
      return {
        title: 'Slider',
        subtitle: `${sections.length} slides`,
        media: EllipsisHorizontalIcon
      }
    }
  }
});

