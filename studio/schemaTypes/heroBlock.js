import { defineType, defineField, defineArrayMember } from 'sanity'

export const heroBlock = defineType({
  type: "object",
  name: "heroBlock",
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
      type: "image",
      name: "image",
      title: "Background",
      options: { hotspot: true },
    }),
    defineField({
      type: "array",
      name: "ctas",
      title: "CTAs",
      of: [
        defineArrayMember({
          type: "cta",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: title || 'Hero Block',
        subtitle: subtitle || 'Hero Block'
      }
    }
  }
});

