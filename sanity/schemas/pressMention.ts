import { defineField, defineType } from "sanity";

export const pressMention = defineType({
  name: "pressMention",
  title: "Press Mention",
  type: "document",
  fields: [
    defineField({ name: "outlet", type: "string", validation: (r) => r.required() }),
    defineField({ name: "quote", type: "text", rows: 3 }),
    defineField({ name: "url", type: "url" }),
    defineField({
      name: "logo",
      type: "image",
      fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
    }),
  ],
  preview: {
    select: { title: "outlet", subtitle: "quote" },
  },
});
