import Link from "next/link";

import { Button } from "@/components/ui/button";

export function LandingCTA() {
  return (
    <section className="border-t border-[var(--color-border)] px-6 py-24">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Stop rebuilding the same boilerplate.
        </h2>
        <p className="mt-3 max-w-xl text-[var(--color-muted-foreground)]">
          Auth, billing, email, and a dashboard — wired together. Skip straight
          to the interesting part: your product.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/signup">
            <Button size="lg">Create your account</Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="ghost">
              I already have one →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
