import "server-only";
import { createServiceClient } from "@/lib/supabase/service";
import { verifyUnsubscribeToken } from "@/lib/newsletter/unsubscribe";

export type UnsubscribeResult = "done" | "invalid" | "misconfigured";

/**
 * Marks an address as unsubscribed. Idempotent: clicking twice, or a mail
 * client pre-fetching the link, must not fail or re-subscribe anyone.
 */
export async function unsubscribe(email: string, token: string): Promise<UnsubscribeResult> {
  const secret = process.env.NEWSLETTER_UNSUBSCRIBE_SECRET;
  if (!secret) return "misconfigured";
  if (!email || !token || !verifyUnsubscribeToken(email, token, secret)) return "invalid";

  const supabase = createServiceClient();
  const { error } = await supabase
    .from("newsletter_subscribers")
    .update({ unsubscribed_at: new Date().toISOString() })
    .eq("email", email.trim().toLowerCase())
    .is("unsubscribed_at", null);

  // A missing row is not an error here — the address is not subscribed either
  // way, which is what the person asked for.
  if (error) throw error;
  return "done";
}
