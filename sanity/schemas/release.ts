import { defineField, defineType } from "sanity";

export const release = defineType({
  name: "release",
  title: "Release",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "releaseType",
      type: "string",
      options: {
        list: [
          { title: "Single", value: "single" },
          { title: "EP", value: "ep" },
          { title: "Album", value: "album" },
          { title: "Mixtape", value: "mixtape" },
          { title: "Feature", value: "feature" },
          { title: "Loosie", value: "loosie" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "releaseDate", type: "date" }),
    defineField({
      name: "artwork",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
      validation: (r) => r.required(),
    }),
    defineField({ name: "description", type: "text", rows: 4 }),
    defineField({ name: "tracklist", type: "array", of: [{ type: "track" }] }),
    defineField({ name: "credits", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "lyrics", type: "text", rows: 10 }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({
      name: "links",
      title: "External Links",
      type: "object",
      fields: [
        defineField({ name: "spotifyUrl", type: "url" }),
        defineField({ name: "appleMusicUrl", type: "url" }),
        defineField({ name: "youtubeUrl", type: "url" }),
        defineField({ name: "bandcampUrl", type: "url" }),
        defineField({ name: "purchaseUrl", type: "url" }),
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "releaseType", media: "artwork" },
  },
});
