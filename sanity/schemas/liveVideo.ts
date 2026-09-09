import { defineField, defineType } from "sanity";

export const liveVideo = defineType({
  name: "liveVideo",
  title: "Live Performance Video",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube URL",
      type: "url",
      validation: (r) => r.required(),
    }),
    defineField({ name: "venue", type: "string" }),
    defineField({ name: "date", type: "date" }),
  ],
  preview: {
    select: { title: "title", subtitle: "venue" },
  },
});
