"use server";

import { newsletterFormSchema } from "@/lib/validations/newsletter";
import { createClient } from "@/lib/supabase/server";

export type NewsletterActionState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function subscribeToNewsletter(
  _prevState: NewsletterActionState,
  formData: FormData,
): Promise<NewsletterActionState> {
  const parsed = newsletterFormSchema.safeParse({
    email: formData.get("email"),
    company: formData.get("company"),
  });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Invalid email." };
  }

  if (parsed.data.company) {
    // Honeypot tripped — pretend success, do nothing.
    return { status: "success" };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: parsed.data.email });

    if (error && error.code !== "23505") {
      // 23505 = unique_violation — already subscribed, treat as success.
      throw error;
    }

    return { status: "success" };
  } catch {
    return {
      status: "error",
      message: "Something went wrong. Please try again shortly.",
    };
  }
}
