import { defineType, defineField, defineArrayMember } from 'sanity'


export const navBlock = defineType({
  type: "object",
  name: "navBlock",
  title: "Footer",
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
      title: "Footer Blocks",
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
  /*icon: BlockElementIcon,
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
        subtitle: 'Footer',
        media: BlockElementIcon
      }
    }
  }*/
});

