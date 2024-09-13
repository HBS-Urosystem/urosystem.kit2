import { defineType, defineField, defineArrayMember } from 'sanity'

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
      type: "boolean",
      name: "slide",
      title: "Carousel?",
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
          type: "imageCarousel",
          title: "Images",
        }),
      ],
    }),
    defineField({
      type: "string",
      name: "caption",
    }),
  ],
  initialValue: {
    slide: true
  },
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      ctas: 'ctas'
    },
    prepare(selection) {
      const {title, subtitle, ctas} = selection
      return {
        title: title || `${ctas?.length} CTAs`,
        subtitle: subtitle || `${ctas?.length} CTAs`
      }
    }
  }
});

