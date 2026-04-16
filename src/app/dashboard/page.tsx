import { Activity, CreditCard, Users } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getPlanByTier } from "@/lib/plans";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("status, plan_id")
    .eq("user_id", user!.id)
    .in("status", ["active", "trialing", "past_due"])
    .maybeSingle();

  let planName = "Free";
  if (subscription?.plan_id) {
    const { data: plan } = await supabase
      .from("plans")
      .select("tier, name")
      .eq("id", subscription.plan_id)
      .maybeSingle();
    planName = plan?.name ?? getPlanByTier(plan?.tier ?? "free")?.name ?? "Free";
  }

  const stats = [
    { label: "Current plan", value: planName, icon: CreditCard },
    { label: "Active users", value: "1", icon: Users },
    { label: "API calls (30d)", value: "0", icon: Activity },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
        <p className="text-sm text-[var(--color-muted-foreground)]">
          A quick snapshot of your workspace.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map(({ label, value, icon: Icon }) => (
          <Card key={label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{label}</CardTitle>
              <Icon size={16} className="text-[var(--color-muted-foreground)]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">{value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Welcome aboard</CardTitle>
          <CardDescription>
            This is your dashboard placeholder. Wire up your real product
            widgets here — charts, tables, activity feeds, whatever.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
