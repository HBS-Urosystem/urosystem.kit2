import { defineType, defineField, defineArrayMember } from 'sanity'

export const ctaBlock = defineType({
  type: "object",
  name: "ctaBlock",
  title: "Call to action block",
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
      name: "ctas",
      title: "Call to actions",
      of: [
        defineArrayMember({
          type: "cta",
        }),
      ],
    }),
    defineField({
      type: "string",
      name: "caption",
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      ctas: 'ctas'
    },
    prepare(selection) {
      const {title, subtitle, ctas} = selection
      return {
        title: title + ` (${ctas.length} CTAs)`,
        subtitle: subtitle
      }
    }
  }
});

