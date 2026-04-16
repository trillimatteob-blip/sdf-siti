import Link from "next/link";

import { Button } from "@/components/ui/button";

export function LandingNav() {
  return (
    <header className="border-b border-[var(--color-border)]">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link href="/" className="font-semibold tracking-tight">
          SaaS Starter
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="#pricing"
            className="hidden text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] sm:inline"
          >
            Pricing
          </Link>
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Sign in
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm">Get started</Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
