import { defineType, defineField } from 'sanity'
import {PlayIcon} from '@sanity/icons'

export const video = defineType({
  type: "object",
  name: "video",
  title: "Video",
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
      type: "image",
      name: "poster",
      title: "Thumbnail image",
      options: { hotspot: true },
    }),
    defineField({
      type: "file",
      name: "file",
      title: "Upload(ed) video",
      options: {
        accept: 'video/mp4, video/webm'
      }
    }),
    defineField({
      type: "string",
      name: "code",
      title: "YouTube ID or embed code",
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
    defineField({
      title: "Autoplay",
      name: "autoplay",
      type: "boolean",
    }),
    defineField({
      title: "Controls",
      name: "controls",
     type: "boolean",   
    }),
    defineField({
      type: "number",
      name: "rows",
      hidden: true
    }),
  ],
  initialValue: {
    rows: 4,
    autoplay: false,
    controls: false,
  },
  icon: PlayIcon,
  preview: {
    select: {
      caption: 'caption',
      page: 'page.title',
      link: 'link'
    },
    prepare(selection) {
      const {caption, page, link} = selection
      return {
        title: page || link,
        subtitle: caption,
        media: PlayIcon
      }
    }
  }
});

