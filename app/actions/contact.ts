"use server";

import { contactFormSchema } from "@/lib/validations/contact";
import { getResendClient, EMAIL_FROM, CONTACT_INBOX } from "@/lib/resend/client";

export type ContactActionState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitContactForm(
  _prevState: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  const parsed = contactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    company: formData.get("company"),
  });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Please check the form." };
  }

  if (parsed.data.company) {
    return { status: "success" };
  }

  try {
    const resend = getResendClient();
    await resend.emails.send({
      from: EMAIL_FROM,
      to: CONTACT_INBOX,
      replyTo: parsed.data.email,
      subject: `[${parsed.data.subject}] New enquiry from ${parsed.data.name}`,
      text: `From: ${parsed.data.name} <${parsed.data.email}>\nSubject: ${parsed.data.subject}\n\n${parsed.data.message}`,
    });
    return { status: "success" };
  } catch {
    return {
      status: "error",
      message: "Couldn't send your message right now. Please try again shortly.",
    };
  }
}
