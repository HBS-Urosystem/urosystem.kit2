import { defineType, defineField, defineArrayMember } from 'sanity'

export const indications = defineType({
  type: "document",
  name: "indications",
  title: "Indications",
  fields: [
    defineField({
      type: "string",
      name: "title",
    }),
    defineField({
      type: "string",
      name: "subtitle",
      title: "Description",
    }),
    defineField({
      type: "slug",
      name: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      type: "array",
      name: "sections",
      title: "Page blocks",
      of: [
        defineArrayMember({
          type: "heroBlock",
        }),
        defineArrayMember({
          type: "textBlock",
          title: "Text content"
        }),
        defineArrayMember({
          type: "ctaBlock",
          title: "CTAs"
        }),
        defineArrayMember({
          type: "cta",
          title: "CTA"
        }),
        defineArrayMember({
          type: "imageCarousel",
          title: "Images",
        }),
        defineArrayMember({
          type: "detailsBlock",
          title: "Accordion",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
    }
  }
});

