"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { MobileSidebar } from "./sidebar";
import { Menu, Bell } from "lucide-react";
import { useState } from "react";

export function DashboardTopbar({
  email,
  name,
}: {
  email: string;
  name: string | null;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="flex h-16 items-center justify-between border-b px-4 md:px-6"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="flex items-center gap-3">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger>
            <button type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-md text-[var(--color-foreground)] hover:bg-[var(--color-accent)] hover:text-[var(--color-accent-foreground)] md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Apri menu</span>
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <MobileSidebar onClose={() => setMobileOpen(false)} />
          </SheetContent>
        </Sheet>
        <div className="text-sm">
          <div className="font-medium text-[var(--color-foreground)]">
            {name ?? email}
          </div>
          {name ? (
            <div className="text-xs text-[var(--color-muted-foreground)]">{email}</div>
          ) : null}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-[var(--color-muted-foreground)]" />
          <span className="sr-only">Notifiche</span>
        </Button>
        <form action="/auth/sign-out" method="post">
          <Button type="submit" variant="outline" size="sm">
            Sign out
          </Button>
        </form>
      </div>
    </header>
  );
}
