import { z } from "zod";

export const newsletterFormSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address."),
  company: z.string().max(0).optional().or(z.literal("")),
});

export type NewsletterFormValues = z.infer<typeof newsletterFormSchema>;
