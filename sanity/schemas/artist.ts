import { defineField, defineType } from "sanity";

export const artist = defineType({
  name: "artist",
  title: "Artist Profile",
  type: "document",
  // Singleton — only one artist profile document should exist.
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "tagline", type: "string", validation: (r) => r.required() }),
    defineField({ name: "bioShort", title: "Short Bio", type: "text", rows: 3 }),
    defineField({ name: "bio", title: "Full Bio", type: "text", rows: 12 }),
    defineField({ name: "birthplace", type: "string" }),
    defineField({ name: "base", title: "Current Base", type: "string" }),
    defineField({
      name: "portrait",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
    }),
    defineField({
      name: "achievements",
      type: "array",
      of: [
        {
          type: "object",
          name: "achievement",
          fields: [
            defineField({ name: "label", type: "string", validation: (r) => r.required() }),
            defineField({ name: "detail", type: "string" }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "tagline" },
  },
});
