import { defineType, defineField, defineArrayMember } from 'sanity'

export const config = defineType({
  type: "document",
  name: "config",
  title: "Config",
  fields: [
    /*defineField({
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
    }),*/
    defineType({
      name: "footer",
      title: "Footer",
      type: "footerBlock",
    }),
    defineType({
      name: "nav",
      title: "Nav",
      type: "navBlock",
    }),
  ],
  /*preview: {
    //return : {
      title: 'title',
      subtitle: 'subtitle',
      slug: 'slug.current',
    //},
  }*/
});

