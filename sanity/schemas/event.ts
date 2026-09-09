import { defineField, defineType } from "sanity";

export const event = defineType({
  name: "event",
  title: "Live Event",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "date", type: "datetime", validation: (r) => r.required() }),
    defineField({ name: "venue", type: "string", validation: (r) => r.required() }),
    defineField({ name: "city", type: "string", validation: (r) => r.required() }),
    defineField({ name: "ticketUrl", type: "url" }),
    defineField({
      name: "status",
      type: "string",
      options: {
        list: [
          { title: "Confirmed", value: "confirmed" },
          { title: "Postponed", value: "postponed" },
          { title: "Cancelled", value: "cancelled" },
          { title: "Sold Out", value: "sold-out" },
        ],
      },
      initialValue: "confirmed",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "venue" },
  },
});
