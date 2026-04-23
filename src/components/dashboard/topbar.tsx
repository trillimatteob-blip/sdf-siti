import { Button } from "@/components/ui/button";

export function DashboardTopbar({
  email,
  name,
}: {
  email: string;
  name: string | null;
}) {
  return (
    <header className="flex h-16 items-center justify-between border-b px-6" style={{ borderColor: 'rgba(242,237,228,0.1)' }}>
      <div className="text-sm">
        <div className="font-medium text-[#f2ede4]">{name ?? email}</div>
        {name ? (
          <div className="text-xs text-[#f2ede480]">{email}</div>
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
