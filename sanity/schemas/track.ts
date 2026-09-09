import { defineField, defineType } from "sanity";

export const track = defineType({
  name: "track",
  title: "Track",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "trackNumber", type: "number", validation: (r) => r.required().min(1) }),
    defineField({ name: "duration", type: "string", description: "e.g. 3:24" }),
    defineField({
      name: "previewAudio",
      title: "Preview Audio",
      type: "file",
      description: "Short preview clip. Full masters are stored in Supabase Storage and referenced by URL, not uploaded here.",
      options: { accept: "audio/*" },
    }),
    defineField({ name: "lyrics", type: "text", rows: 10 }),
    defineField({
      name: "credits",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "featuredArtists",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "trackNumber" },
    prepare: ({ title, subtitle }) => ({
      title,
      subtitle: subtitle ? `Track ${subtitle}` : undefined,
    }),
  },
});
