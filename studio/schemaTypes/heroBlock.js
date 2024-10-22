import { defineType, defineField, defineArrayMember } from 'sanity'
import {SparklesIcon} from '@sanity/icons'

export const heroBlock = defineType({
  type: "object",
  name: "heroBlock",
  fields: [
    defineField({
      type: "string",
      name: "title",
      title: "Hero Headline",
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
    defineField({
      type: "string",
      name: "caption",
      title: "Caption",
    }),
  ],
  icon: SparklesIcon,
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        subtitle: 'Hero Block',
        title: `${title} • ${subtitle}` || 'Hero Block',
        media: SparklesIcon
      }
    }
  }
});

