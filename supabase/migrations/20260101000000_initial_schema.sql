--------------------------------------------------------------------------------
-- Initial schema: users, plans, subscriptions with Row Level Security
--------------------------------------------------------------------------------

-- Enums --------------------------------------------------------------------
create type public.plan_tier as enum ('free', 'pro', 'enterprise');

create type public.subscription_status as enum (
  'trialing',
  'active',
  'canceled',
  'incomplete',
  'incomplete_expired',
  'past_due',
  'unpaid',
  'paused'
);

-- Tables -------------------------------------------------------------------

-- Extended profile mirroring auth.users
create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text,
  avatar_url text,
  stripe_customer_id text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Catalog of pricing tiers (mirrors Stripe products/prices)
create table public.plans (
  id uuid primary key default gen_random_uuid(),
  tier public.plan_tier not null unique,
  name text not null,
  description text,
  price_monthly_cents integer not null default 0,
  stripe_product_id text,
  stripe_price_id text,
  features jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

-- One active subscription per user
create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  plan_id uuid references public.plans(id) on delete set null,
  stripe_subscription_id text unique,
  stripe_price_id text,
  status public.subscription_status not null default 'active',
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index subscriptions_user_id_active_idx
  on public.subscriptions (user_id)
  where status in ('trialing', 'active', 'past_due');

-- updated_at trigger -------------------------------------------------------
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger users_touch_updated_at
  before update on public.users
  for each row execute function public.touch_updated_at();

create trigger subscriptions_touch_updated_at
  before update on public.subscriptions
  for each row execute function public.touch_updated_at();

-- Auto-provision a profile row + free subscription on signup --------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  free_plan_id uuid;
begin
  insert into public.users (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name')
  );

  select id into free_plan_id from public.plans where tier = 'free' limit 1;

  if free_plan_id is not null then
    insert into public.subscriptions (user_id, plan_id, status)
    values (new.id, free_plan_id, 'active');
  end if;

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Row Level Security -------------------------------------------------------
alter table public.users enable row level security;
alter table public.plans enable row level security;
alter table public.subscriptions enable row level security;

-- users: each user can read/update only their own row
create policy "users_select_own"
  on public.users for select
  using (auth.uid() = id);

create policy "users_update_own"
  on public.users for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- plans: publicly readable (landing page + pricing section)
create policy "plans_select_public"
  on public.plans for select
  to anon, authenticated
  using (true);

-- subscriptions: users can read their own; writes happen via service role
create policy "subscriptions_select_own"
  on public.subscriptions for select
  using (auth.uid() = user_id);

-- Seed plans ---------------------------------------------------------------
insert into public.plans (tier, name, description, price_monthly_cents, features)
values
  (
    'free',
    'Free',
    'Kick the tires. No credit card required.',
    0,
    '["1 project", "Community support", "Basic analytics"]'::jsonb
  ),
  (
    'pro',
    'Pro',
    'For growing teams shipping every day.',
    2900,
    '["Unlimited projects", "Priority email support", "Advanced analytics", "Custom domains"]'::jsonb
  ),
  (
    'enterprise',
    'Enterprise',
    'Dedicated support, SSO, and custom SLAs.',
    9900,
    '["Everything in Pro", "SSO / SAML", "Dedicated support", "99.99% uptime SLA", "Audit logs"]'::jsonb
  );
