import { defineType, defineField, defineArrayMember } from 'sanity'

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
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: title || 'Text Block',
        subtitle: subtitle || 'Text Block'
      }
    }
  }
});

