import { defineField, defineType } from "sanity";

export const article = defineType({
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "publication", type: "string" }),
    defineField({ name: "date", type: "date" }),
    defineField({ name: "excerpt", type: "text", rows: 3 }),
    defineField({ name: "url", type: "url" }),
  ],
  preview: {
    select: { title: "title", subtitle: "publication" },
  },
});
