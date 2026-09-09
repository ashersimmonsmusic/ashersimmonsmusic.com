import "server-only";
import Stripe from "stripe";

/**
 * Server-only Stripe client. No checkout flow is wired up yet (see
 * lib/commerce for the provider-independent product model) — this exists so
 * Checkout Sessions, webhooks and Prices can be added later without
 * restructuring the store UI.
 */
let stripe: Stripe | null = null;

export function getStripeClient(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not set — Stripe commerce is not yet configured.");
  }
  if (!stripe) {
    // No apiVersion pinned here — defaults to the version baked into this
    // SDK release. Pin explicitly once a Stripe account is connected.
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return stripe;
}
