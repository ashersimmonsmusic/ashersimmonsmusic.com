import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/ui/container";
import { unsubscribe } from "@/lib/newsletter/service";

export const metadata: Metadata = {
  title: "Unsubscribe",
  robots: { index: false, follow: false },
};

// Unsubscribing writes to the database, so this must never be cached or
// prerendered — a cached "you're unsubscribed" that didn't run is a lie.
export const dynamic = "force-dynamic";

const MESSAGES = {
  done: "You're unsubscribed. You won't get any more emails from me.",
  invalid: "That link doesn't look right. It may have been cut short by your email client — try copying the whole thing, or reply to the email and I'll take you off by hand.",
  misconfigured: "Something's wrong at my end and I couldn't process that. Reply to the email and I'll take you off the list myself.",
} as const;

export default async function UnsubscribePage(props: PageProps<"/unsubscribe">) {
  const { e, t } = await props.searchParams;
  const email = typeof e === "string" ? e : "";
  const token = typeof t === "string" ? t : "";

  let result: keyof typeof MESSAGES;
  try {
    result = await unsubscribe(email, token);
  } catch {
    result = "misconfigured";
  }

  return (
    <Container className="py-24 md:py-32">
      <div className="max-w-xl">
        <Eyebrow>Newsletter</Eyebrow>
        <h1 className="font-display mt-4 text-4xl leading-[1.05] font-medium tracking-tight md:text-5xl">
          {result === "done" ? "Done" : "Couldn't do that"}
        </h1>
        <p className="mt-6 text-lg text-paper-dim">{MESSAGES[result]}</p>
        <Link href="/" className="font-mono-label mt-12 inline-block text-paper-dim hover:text-paper">
          ← Back to the site
        </Link>
      </div>
    </Container>
  );
}
