import { defineField, defineType } from "sanity";

export const socialLink = defineType({
  name: "socialLink",
  title: "Social Link",
  type: "document",
  fields: [
    defineField({
      name: "platform",
      type: "string",
      options: {
        list: [
          { title: "Instagram", value: "instagram" },
          { title: "Spotify", value: "spotify" },
          { title: "Apple Music", value: "apple-music" },
          { title: "YouTube", value: "youtube" },
          { title: "TikTok", value: "tiktok" },
          { title: "Bandcamp", value: "bandcamp" },
          { title: "Twitter / X", value: "twitter" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "url", type: "url", validation: (r) => r.required() }),
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
  ],
  preview: {
    select: { title: "label", subtitle: "url" },
  },
});
