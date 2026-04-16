export function LandingFooter() {
  return (
    <footer className="border-t border-[var(--color-border)] px-6 py-10 text-sm text-[var(--color-muted-foreground)]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
        <span>© {new Date().getFullYear()} SaaS Starter.</span>
        <span>Built with Next.js · Supabase · Stripe · Resend</span>
      </div>
    </footer>
  );
}
