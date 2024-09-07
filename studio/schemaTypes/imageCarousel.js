import { defineType, defineField, defineArrayMember } from 'sanity'

export const imageCarousel = defineType({
  type: "object",
  name: "imageCarousel",
  title: "Image carousel",
  fields: [
    defineField({
      type: "array",
      name: "images",
      of: [
        defineArrayMember({
          type: "image",
          fields: [
            {
              type: "string",
              name: "caption",
            },
          ],
          options: { hotspot: true },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      images: 'images',
    },
    prepare(selection) {
      const {images} = selection
      return {
        title: `Block of ${images.length} image(s)`,
        //subtitle: 'Images'
      }
    }
  }
});

