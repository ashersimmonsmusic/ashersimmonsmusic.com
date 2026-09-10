import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email address."),
  subject: z.enum(["production", "booking", "general"], {
    error: "Please select what this is about.",
  }),
  message: z.string().trim().min(10, "Tell us a little more (at least 10 characters)."),
  // Honeypot field — real users never fill this in.
  company: z.string().max(0).optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
