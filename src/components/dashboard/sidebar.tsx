"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  GraduationCap,
  CreditCard,
  Settings,
  Activity,
  LineChart,
  Bot,
  Calendar,
  Stethoscope,
  ClipboardList,
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/test-di-ferro", label: "Test di Ferro", icon: ClipboardList },
  { href: "/dashboard/salute", label: "Salute", icon: Activity },
  { href: "/dashboard/grafici", label: "Grafici", icon: LineChart },
  { href: "/dashboard/agente", label: "Agente", icon: Bot },
  { href: "/dashboard/calendario", label: "Calendario", icon: Calendar },
  { href: "/dashboard/medici", label: "Medici", icon: Stethoscope },
  { href: "/dashboard/academy", label: "Academy", icon: GraduationCap },
  { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="space-y-1 px-3">
      {links.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
              active
                ? "font-medium text-[var(--color-foreground)]"
                : "text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
            )}
            style={active ? { background: "var(--color-secondary)" } : {}}
          >
            <Icon size={16} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export function DashboardSidebar() {
  return (
    <aside
      className="hidden w-60 shrink-0 border-r md:block"
      style={{ borderColor: "var(--color-border)", background: "var(--color-card)" }}
    >
      <div className="flex h-16 items-center px-6 font-semibold tracking-tight text-[var(--color-primary)]">
        <Link href="/">SDF</Link>
      </div>
      <NavLinks />
    </aside>
  );
}

export function MobileSidebar({ onClose }: { onClose?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center px-6 font-semibold tracking-tight text-[var(--color-primary)]">
        <Link href="/" onClick={onClose}>SDF</Link>
      </div>
      <NavLinks onNavigate={onClose} />
    </div>
  );
}
