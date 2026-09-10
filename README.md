# Asher Simmons Music

Editorial artist website for Asher Simmons — Caribbean rapper, producer, sound
engineer, songwriter and beatmaker (Dundas Town, Abaco, Bahamas → Bristol,
UK). Built with Next.js 16 App Router, TypeScript, Tailwind CSS, Motion and a
CMS-ready content layer.

## Stack

- Next.js 16 (App Router, Turbopack) + TypeScript + React 19
- Tailwind CSS v4, hand-rolled shadcn-style UI primitives, Lucide icons
- Motion for animation
- Sanity (schemas + client) for content, with local placeholder data as a
  fallback until a project is connected
- Supabase (Postgres, Auth, Storage) via `@supabase/ssr`
- Stripe (commerce abstraction, not yet wired to Checkout)
- Resend for transactional email
- Zod + React Hook Form for validated forms, driven by Server Actions
- Vitest (unit) + Playwright (e2e)
- pnpm

## Getting started

```bash
pnpm install
cp .env.example .env.local   # fill in what you have; everything degrades gracefully when unset
pnpm dev
```

```bash
pnpm lint          # ESLint
pnpm exec tsc --noEmit
pnpm test          # Vitest unit tests
pnpm test:e2e       # Playwright e2e (requires a Chromium binary — see below)
pnpm build
```

## Content architecture

Every page reads through `lib/sanity/queries.ts`. When
`NEXT_PUBLIC_SANITY_PROJECT_ID` is unset (the default, since no Sanity
project has been created yet), those functions transparently fall back to
the placeholder content in `lib/data/*` — the site is fully functional with
no CMS credentials. Once a Sanity project exists:

1. Set `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET`.
2. Populate documents matching the schemas in `sanity/schemas/*`.
3. Optionally mount Sanity Studio at `app/studio/[[...tool]]/page.tsx` using
   `sanity.config.ts` (not mounted by default to keep the MVP dependency
   surface small).

**No real release dates, credits, streaming URLs or photography have been
invented.** The current releases (`Open Letters to God`, `Brighter Days`,
`Thanks and Praises`) exist as placeholder records with unconfirmed fields
left empty — the UI shows "TBA" / "Coming soon" rather than fabricated data.
Replace them via Sanity (or by editing `lib/data/releases.ts` directly) as
real information arrives. The same applies to artist photography (a generated type-based
placeholder stands in for artwork/portraits), press mentions, and live
events — the `/live` page intentionally shows an empty state rather than
invented dates.

## Music player

`components/music/player-context.tsx` is a small reducer-based context
(play/pause/next/previous/seek/volume) wrapping a single HTML5 `<audio>`
element, mounted once in the root layout so playback can persist across
navigation. Track sources come from `previewAudioUrl` on each `Track` /
`PlayerTrack` — until real audio is connected via Sanity or Supabase
Storage, that field stays `undefined` and the transport controls disable
themselves rather than pointing at (or silently failing to load) a fake
file.

## Supabase

`supabase/migrations/0001_init.sql` defines `newsletter_subscribers`,
`purchases` and `downloadable_assets` with RLS enabled: anyone can insert a
newsletter signup, but only a user can read their own purchases, and writes
to `purchases` / `downloadable_assets` are intentionally left to trusted
server code (Stripe webhook, using the service-role client in
`lib/supabase/service.ts`) rather than granted to `anon`/`authenticated`.
`lib/supabase/client.ts` / `server.ts` are the anon-key browser/server
clients; never import `service.ts` from a Client Component (it's guarded
with `server-only`).

## Commerce

Not built yet. The `/store` page, `lib/commerce/` product model, and any
cart/checkout UI were removed until there's a real plan for them — `lib/stripe/`
remains as a thin, server-only Stripe client with nothing else wired up
(no Checkout Session, no webhook route, no product data).

## Testing

- Unit tests (`tests/unit/`) cover formatting utilities, the release→queue
  mapping, form validation schemas, and the player context's state
  transitions.
- E2E tests (`tests/e2e/`) smoke-test navigation, the player, and form
  validation on both a desktop and mobile viewport.
- In sandboxed environments without network access to download Playwright's
  browser, set `PLAYWRIGHT_CHROMIUM_PATH` to a local Chromium binary; it's
  picked up by `playwright.config.ts` and otherwise has no effect.

## Environment variables

See `.env.example`. Nothing is required to run the site locally — Sanity,
Supabase, Stripe and Resend calls all fail closed (fall back to placeholder
data, or surface a friendly form error) when their keys are unset.

## Deploying on Railway

This is a single Next.js app — one Railway service handles both pages and
server-side logic (API routes, Server Actions). There's no separate backend
to stand up; Sanity, Supabase, Stripe and Resend are external hosted
services you just point env vars at.

1. On [railway.app](https://railway.app), **New Project → Deploy from GitHub
   repo** and pick `ashersimmonsmusic/ashersimmonsmusic.com`.
2. Railway auto-detects Node via Nixpacks. `railway.json` and
   `nixpacks.toml` in this repo pin the build to `pnpm build` and the start
   command to `pnpm start` (which binds to Railway's injected `$PORT`), and
   `package.json`'s `engines.node` pins Node 20+.
3. Under the service's **Variables** tab, add whichever keys from
   `.env.example` you actually have — none are required for the site to
   boot, but without them Sanity/Supabase/Stripe/Resend features fall back
   to placeholders or a disabled state (see above).
4. Deploy. Railway gives you a `*.up.railway.app` domain immediately; attach
   `ashersimmonsmusic.com` under **Settings → Networking → Custom Domain**
   once DNS (Cloudflare, per the brief) points a CNAME at it.

Every push to the connected branch redeploys automatically.
