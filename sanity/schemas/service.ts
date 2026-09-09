import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "category",
      type: "string",
      options: {
        list: [
          { title: "Production", value: "production" },
          { title: "Beatmaking", value: "beatmaking" },
          { title: "Sound Engineering", value: "sound-engineering" },
          { title: "Creative Direction", value: "creative-direction" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "summary", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", rows: 4 }),
  ],
  preview: {
    select: { title: "title", subtitle: "category" },
  },
});
