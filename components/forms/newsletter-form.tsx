"use client";

import { useActionState } from "react";
import { subscribeToNewsletter, type NewsletterActionState } from "@/app/actions/newsletter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@/components/ui/visually-hidden";

const initialState: NewsletterActionState = { status: "idle" };

export function NewsletterForm({ className }: { className?: string }) {
  const [state, formAction, pending] = useActionState(subscribeToNewsletter, initialState);

  return (
    <form action={formAction} className={className} noValidate>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label htmlFor="newsletter-email" className="font-mono-label text-[11px] text-current/70">
            Email address
          </label>
          <Input
            id="newsletter-email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="mt-2"
            aria-describedby={state.status === "error" ? "newsletter-error" : undefined}
          />
        </div>
        {/* Honeypot — hidden from real users, visible to bots that fill every field. */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="newsletter-company">Company</label>
          <input id="newsletter-company" name="company" tabIndex={-1} autoComplete="off" />
        </div>
        <Button type="submit" disabled={pending} variant="outline" className="sm:w-auto">
          {pending ? "Joining…" : "Join the list"}
        </Button>
      </div>
      <div role="status" aria-live="polite" className="mt-3 min-h-[1.25rem] text-sm">
        {state.status === "success" && <p className="text-cobalt">You&apos;re on the list.</p>}
        {state.status === "error" && (
          <p id="newsletter-error" className="text-cobalt">
            {state.message}
          </p>
        )}
      </div>
      <VisuallyHidden>Sign up for the Asher Simmons newsletter</VisuallyHidden>
    </form>
  );
}
