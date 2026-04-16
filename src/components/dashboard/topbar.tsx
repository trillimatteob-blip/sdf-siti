import { Button } from "@/components/ui/button";

export function DashboardTopbar({
  email,
  name,
}: {
  email: string;
  name: string | null;
}) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-[var(--color-border)] px-6">
      <div className="text-sm">
        <div className="font-medium">{name ?? email}</div>
        {name ? (
          <div className="text-xs text-[var(--color-muted-foreground)]">
            {email}
          </div>
        ) : null}
      </div>
      <form action="/auth/sign-out" method="post">
        <Button type="submit" variant="outline" size="sm">
          Sign out
        </Button>
      </form>
    </header>
  );
}
