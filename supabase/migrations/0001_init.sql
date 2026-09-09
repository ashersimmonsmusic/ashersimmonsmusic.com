-- Foundation schema for Asher Simmons Music.
-- Fan accounts use Supabase Auth's built-in `auth.users` table; these
-- tables extend it for commerce and newsletter functionality.

create extension if not exists "pgcrypto";

-- Newsletter subscribers -----------------------------------------------------

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table public.newsletter_subscribers enable row level security;

-- Anyone may subscribe (insert), but never read/list the list back out.
create policy "Anyone can subscribe to the newsletter"
  on public.newsletter_subscribers
  for insert
  to anon, authenticated
  with check (true);

-- Purchases -------------------------------------------------------------------

create table if not exists public.purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  email text not null,
  product_id text not null,
  stripe_checkout_session_id text,
  amount_gbp integer not null,
  status text not null default 'pending' check (status in ('pending', 'paid', 'refunded')),
  created_at timestamptz not null default now()
);

alter table public.purchases enable row level security;

-- Fans can see only their own purchase history.
create policy "Users can view their own purchases"
  on public.purchases
  for select
  to authenticated
  using (auth.uid() = user_id);

-- Purchases are written by trusted server code (Stripe webhook) using the
-- service role, which bypasses RLS — no insert/update policy is granted to
-- anon/authenticated roles.

-- Downloadable assets -----------------------------------------------------------

create table if not exists public.downloadable_assets (
  id uuid primary key default gen_random_uuid(),
  product_id text not null,
  storage_path text not null,
  label text not null,
  created_at timestamptz not null default now()
);

alter table public.downloadable_assets enable row level security;

-- Download links are only resolved server-side for a fan with a matching
-- paid purchase, so no public read policy is defined here.

create index if not exists purchases_user_id_idx on public.purchases (user_id);
create index if not exists purchases_product_id_idx on public.purchases (product_id);
create index if not exists downloadable_assets_product_id_idx on public.downloadable_assets (product_id);
