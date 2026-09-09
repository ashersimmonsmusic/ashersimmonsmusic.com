import "server-only";
import { Resend } from "resend";

let resend: Resend | null = null;

export function getResendClient(): Resend {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not set.");
  }
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

export const EMAIL_FROM = process.env.RESEND_FROM_EMAIL ?? "Asher Simmons Music <hello@ashersimmonsmusic.com>";
export const CONTACT_INBOX = process.env.CONTACT_INBOX_EMAIL ?? "hello@ashersimmonsmusic.com";
