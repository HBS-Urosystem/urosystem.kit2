import { defineType, defineField, defineArrayMember } from 'sanity'

export const page = defineType({
  type: "document",
  name: "page",
  title: "Page",
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
      validation: (Rule) => Rule.required(),
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      type: "array",
      name: "sections",
      title: "Page Blocks",
      of: [
        defineArrayMember({
          type: "heroBlock",
        }),
        defineArrayMember({
          type: "textBlock",
          title: "Rich content"
        }),
        defineArrayMember({
          type: "detailsItem",
          title: "Accordion List Item",
        }),
        defineArrayMember({
          type: "video",
          title: "Video"
        }),
        /*defineArrayMember({
          type: "cta",
          title: "CTA"
        }),*/
        defineArrayMember({
          type: "cardBlock",
          title: "Card Block"
        }),
        defineArrayMember({
          type: "slider",
          title: "Slider"
        }),
        /*defineArrayMember({
          type: "imageCarousel",
          title: "Images",
        }),*/
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      slug: 'slug.current',
    },
    prepare(selection) {
      const {title, subtitle, slug} = selection
      return {
        title: `${title} ${subtitle}` || 'Page',
        subtitle: slug
      }
    }
  }
});

