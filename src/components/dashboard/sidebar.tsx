"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CreditCard, GraduationCap, LayoutDashboard, Settings } from "lucide-react";

import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/academy", label: "Academy", icon: GraduationCap },
  { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden w-60 shrink-0 border-r md:block" style={{ borderColor: 'rgba(242,237,228,0.1)', background: '#0c0c0e' }}>
      <div className="flex h-16 items-center px-6 font-semibold tracking-tight text-[#c8a951]">
        <Link href="/">AM Academy</Link>
      </div>
      <nav className="space-y-1 px-3">
        {links.map(({ href, label, icon: Icon }) => {
          const active =
            pathname === href ||
            (href !== "/dashboard" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm",
                active
                  ? "font-medium text-[#f2ede4]"
                  : "text-[#f2ede480] hover:text-[#f2ede4]",
              )}
              style={active ? { background: '#141416' } : {}}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
