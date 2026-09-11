import { defineField, defineType } from "sanity";

/**
 * News posts Asher writes himself.
 *
 * Distinct from `article`, which catalogues coverage written about him
 * elsewhere and is therefore a title plus an outbound link. This one carries
 * the writing, so it needs a body.
 */
export const post = defineType({
  name: "post",
  title: "News Post",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "publishedAt", type: "datetime", validation: (r) => r.required() }),
    defineField({
      name: "excerpt",
      type: "text",
      rows: 3,
      description: "Shown on the news index and in link previews.",
    }),
    defineField({
      name: "coverImage",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
    }),
    defineField({
      name: "body",
      type: "array",
      of: [{ type: "block" }],
      validation: (r) => r.required(),
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: { select: { title: "title", subtitle: "publishedAt", media: "coverImage" } },
});
