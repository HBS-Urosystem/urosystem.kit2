import { defineType, defineField } from 'sanity'

export const cta = defineType({
  type: "object",
  name: "cta",
  title: "Call to action",
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
      type: "string",
      name: "label",
      title: "Button label",
    }),
    defineField({
      type: "url",
      name: "page",
      title: "Link to page",
      type: 'reference',
      to: [{type: 'page'}],
    }),
    defineField({
      type: "url",
      name: "link",
      title: "External link",
    }),
    defineField({
      type: "string",
      name: "caption",
    }),
  ],
  preview: {
    select: {
      label: 'label',
      page: 'page.title',
      link: 'link'
    },
    prepare(selection) {
      const {label, page, link} = selection
      return {
        title: page || link,
        subtitle: label
      }
    }
  }
});

