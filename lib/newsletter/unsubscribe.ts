import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Signs unsubscribe links.
 *
 * The link has to work from an email client with no session, so the token in
 * the URL is the whole proof. Signing the address means a link only ever
 * unsubscribes the person it was sent to — without it, anyone could
 * unsubscribe anyone by editing the query string.
 *
 * The same secret is held by the agent that sends the newsletter, which is
 * what lets it generate links this route will accept.
 */
export function unsubscribeToken(email: string, secret: string): string {
  return createHmac("sha256", secret).update(email.trim().toLowerCase()).digest("hex");
}

export function verifyUnsubscribeToken(email: string, token: string, secret: string): boolean {
  const expected = Buffer.from(unsubscribeToken(email, secret), "utf8");
  const actual = Buffer.from(token, "utf8");
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}
