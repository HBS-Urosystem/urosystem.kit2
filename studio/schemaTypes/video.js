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
  ],
  initialValue: {
    rows: 4,
    autoplay: false,
    controls: false,
  },
  icon: PlayIcon,
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      file: 'file',
      code: 'code',
      link: 'link',
    },
    prepare(selection) {
      const {title, subtitle, file, code, link} = selection
      const source = file ? 'mp4/webm' : (code ? 'YouTube/Embed' : (link ? 'External' : 'empty'))
      return {
        title: `${title} • ${subtitle}`,
        subtitle: source,
        media: PlayIcon
      }
    }
  }
});

