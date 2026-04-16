# SaaS Starter

Production-ready SaaS starter: **Next.js 16 (App Router) · Supabase · Stripe · Resend · shadcn/ui · Tailwind v4 · TypeScript**.

Everything you need to ship a subscription product: auth, protected routes, pricing tiers, Stripe Checkout, customer portal, email, and a dashboard. Clone, configure, ship.

## Stack

- **Next.js 16** with the App Router, Server Components and Server Actions
- **Supabase Auth** — email/password, magic link, password reset
- **Supabase Postgres** — typed schema with Row Level Security
- **Stripe Checkout** and **Billing Portal** with a signed webhook handler
- **Resend + React Email** for welcome, payment confirmation, and password-reset emails
- **shadcn/ui primitives** over **Tailwind CSS v4**
- **Zod** validation in Server Actions

## Project layout

```
.
├── supabase/migrations/      # SQL migrations (run with `supabase db push`)
├── src/
│   ├── proxy.ts              # Next.js 16 "proxy" (renamed middleware) — session refresh + auth gate
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx          # Landing page
│   │   ├── globals.css
│   │   ├── (auth)/           # /login, /signup, /reset-password, /update-password
│   │   │   └── actions.ts    # signIn / signUp / reset Server Actions
│   │   ├── auth/
│   │   │   ├── callback/     # GET /auth/callback — exchanges ?code= for a session
│   │   │   └── sign-out/     # POST /auth/sign-out
│   │   ├── dashboard/
│   │   │   ├── layout.tsx    # Sidebar + topbar + auth guard
│   │   │   ├── page.tsx      # Overview
│   │   │   ├── settings/     # Profile + billing shortcut
│   │   │   └── billing/      # Current plan + upgrade cards
│   │   └── api/stripe/
│   │       ├── checkout/     # POST — creates Stripe Checkout session
│   │       ├── portal/       # POST — opens billing portal
│   │       └── webhook/      # POST — subscription + invoice events
│   ├── components/
│   │   ├── ui/               # shadcn primitives (button, card, input, ...)
│   │   ├── auth/             # login/signup/reset forms (client)
│   │   ├── dashboard/        # sidebar, topbar, profile form, portal button
│   │   └── landing/          # hero, pricing, cta, footer, nav
│   └── lib/
│       ├── supabase/         # browser, server, service-role, proxy clients + types
│       ├── stripe/server.ts  # server-side Stripe SDK instance
│       ├── email/            # Resend client + React Email templates
│       ├── plans.ts          # Static pricing catalog (maps tier → env price id)
│       └── utils.ts          # cn(), formatPrice(), absoluteUrl()
└── .env.example
```

## Getting started

### 1. Install

```bash
npm install
cp .env.example .env.local
```

### 2. Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. Copy `Project URL`, `anon` and `service_role` keys into `.env.local`.
3. Run the migration:
   ```bash
   # Using the Supabase CLI
   supabase db push
   # OR paste supabase/migrations/*.sql into the SQL editor
   ```
   This creates `users`, `plans`, `subscriptions`, enables RLS, seeds the
   three pricing tiers, and installs a trigger that auto-provisions a
   profile + free subscription on signup.
4. In **Auth → URL Configuration**, set the Site URL to your `NEXT_PUBLIC_SITE_URL`
   and add `/auth/callback` to the redirect allow list.

### 3. Stripe

1. In the [Stripe dashboard](https://dashboard.stripe.com), create two
   recurring products — **Pro** and **Enterprise** — and copy their price ids
   into `STRIPE_PRICE_ID_PRO` / `STRIPE_PRICE_ID_ENTERPRISE`.
2. Update the seeded rows in `public.plans` with those Stripe ids so the
   landing page's live pricing stays in sync.
3. Locally, forward webhooks:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```
   Copy the `whsec_...` signing secret into `STRIPE_WEBHOOK_SECRET`.
4. In production, add the endpoint under **Developers → Webhooks** and send
   these events: `checkout.session.completed`,
   `customer.subscription.created|updated|deleted`,
   `invoice.payment_succeeded`.

### 4. Resend

1. Create an API key at [resend.com/api-keys](https://resend.com/api-keys).
2. Verify a sending domain and set `RESEND_FROM_EMAIL`.
3. Emails used:
   - **Welcome** — sent from the signup Server Action.
   - **Payment confirmation** — sent from the Stripe webhook on
     `invoice.payment_succeeded`.
   - **Password reset** — React Email template, wired up for optional use.
     Supabase's built-in reset email is enabled by default; you can swap in
     the Resend template by intercepting the `reset-password` action.

### 5. Run it

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Sign up — the SQL trigger
creates your `public.users` profile and a `free` subscription row.
Visit `/dashboard/billing` to run a test checkout with a Stripe test card
(`4242 4242 4242 4242`).

## Auth flow

| Flow              | Entry point                      | Back end                                    |
| ----------------- | -------------------------------- | ------------------------------------------- |
| Email + password  | `/login`                         | `signInWithPassword` Server Action          |
| Magic link        | `/login` (tab: Magic link)       | `signInWithMagicLink` Server Action         |
| Sign up           | `/signup`                        | `signUp` Server Action + welcome email      |
| Password reset    | `/reset-password` → email        | `requestPasswordReset` → `/update-password` |
| Sign out          | POST `/auth/sign-out`            | `supabase.auth.signOut()`                   |
| OAuth / email cb. | GET `/auth/callback?code=...`    | `exchangeCodeForSession`                    |

`src/proxy.ts` runs on every request, refreshes the Supabase session, and
enforces auth on `/dashboard/*`. Signed-in users visiting `/login`, `/signup`,
or `/reset-password` bounce back to `/dashboard`.

> **Note:** Next.js 16 renamed `middleware` to `proxy`. The file is
> `src/proxy.ts` — same conventions otherwise.

## Database schema

See [`supabase/migrations/20260101000000_initial_schema.sql`](supabase/migrations/20260101000000_initial_schema.sql).

- `public.users` — extended profile linked 1-1 to `auth.users` (cascade delete).
- `public.plans` — static catalog; publicly readable.
- `public.subscriptions` — one active row per user (enforced by unique index).

RLS is enabled on every table:

- `users`: owner can select/update their own row.
- `plans`: read-only for `anon` + `authenticated`.
- `subscriptions`: owner can read their own; writes happen via the service
  role from the Stripe webhook handler.

Types live in `src/lib/supabase/types.ts`. In a real project, regenerate with
`supabase gen types typescript`.

## Deploying

1. Push to GitHub, import into Vercel, and add the env vars from `.env.example`.
2. Update `NEXT_PUBLIC_SITE_URL` to the production URL.
3. Register the Stripe webhook in live mode and copy the new signing secret.
4. Update Supabase Auth redirect URLs to include the production `/auth/callback`.

That's it — `npm run build` ships.

## Scripts

```bash
npm run dev     # next dev
npm run build   # next build
npm run start   # next start
npm run lint    # eslint
```
