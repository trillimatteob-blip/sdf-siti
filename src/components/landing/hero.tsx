import Link from "next/link";

import { Button } from "@/components/ui/button";

export function LandingHero() {
  return (
    <section className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-4 inline-block rounded-full border border-[var(--color-border)] px-3 py-1 text-xs font-medium uppercase tracking-wide text-[var(--color-muted-foreground)]">
          Open source · Production ready
        </p>
        <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
          Ship your SaaS in a weekend.
        </h1>
        <p className="mt-6 text-pretty text-lg text-[var(--color-muted-foreground)]">
          A Next.js starter with Supabase auth, Stripe subscriptions, Resend
          email, and a clean dashboard. Wired up and ready to deploy.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link href="/signup">
            <Button size="lg">Start building free</Button>
          </Link>
          <Link href="#pricing">
            <Button size="lg" variant="outline">
              See pricing
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
