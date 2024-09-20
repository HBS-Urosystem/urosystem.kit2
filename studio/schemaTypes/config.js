import { defineType, defineField, defineArrayMember } from 'sanity'

export const config = defineType({
  type: "document",
  name: "config",
  title: "Config",
  fields: [
    defineField({
      name: "nav",
      title: "Main Nav",
      type: "array",
      of: [
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
      name: "footer",
      title: "Footer",
      type: "array",
      of: [
        defineArrayMember({
          type: "heroBlock",
        }),
        defineArrayMember({
          type: "textBlock",
          title: "Text content"
        }),
        //defineArrayMember({
        //  type: "detailsItem",
        //  title: "Accordion List Item",
        //}),
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
  ],
  preview: {
    //return : {
      title: 'title',
      subtitle: 'subtitle',
      slug: 'slug.current',
    //},
  }
});

