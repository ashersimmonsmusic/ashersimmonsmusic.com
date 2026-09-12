-- Unsubscribe support for the newsletter.
--
-- Marketing email cannot lawfully be sent to this list without a working
-- unsubscribe (UK GDPR / PECR), and bulk senders without one get filtered as
-- spam regardless. Recorded as a timestamp rather than a boolean so there is a
-- defensible record of when consent was withdrawn.

alter table public.newsletter_subscribers
  add column if not exists unsubscribed_at timestamptz;

-- The send query filters on this, and it stays small and highly selective.
create index if not exists newsletter_subscribers_active_idx
  on public.newsletter_subscribers (unsubscribed_at)
  where unsubscribed_at is null;
