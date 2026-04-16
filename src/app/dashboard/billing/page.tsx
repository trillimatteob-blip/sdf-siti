import { PortalButton } from "@/components/dashboard/portal-button";
import { UpgradeButton } from "@/components/dashboard/upgrade-button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PLANS, getPlanByTier } from "@/lib/plans";
import { createClient } from "@/lib/supabase/server";
import type { PlanTier } from "@/lib/supabase/types";
import { cn, formatPrice } from "@/lib/utils";

export default async function BillingPage(props: {
  searchParams: Promise<{ checkout?: "success" | "cancelled" }>;
}) {
  const { checkout } = await props.searchParams;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("users")
    .select("stripe_customer_id")
    .eq("id", user!.id)
    .single();

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("status, plan_id, current_period_end, cancel_at_period_end")
    .eq("user_id", user!.id)
    .in("status", ["active", "trialing", "past_due"])
    .maybeSingle();

  let currentTier: PlanTier = "free";
  if (subscription?.plan_id) {
    const { data: plan } = await supabase
      .from("plans")
      .select("tier")
      .eq("id", subscription.plan_id)
      .maybeSingle();
    currentTier = (plan?.tier ?? "free") as PlanTier;
  }

  const currentPlan = getPlanByTier(currentTier);
  const periodEnd = subscription?.current_period_end
    ? new Date(subscription.current_period_end).toLocaleDateString()
    : null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Billing</h1>
        <p className="text-sm text-[var(--color-muted-foreground)]">
          Choose a plan that fits your workspace.
        </p>
      </div>

      {checkout === "success" ? (
        <div className="rounded-md border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-300">
          Payment received. Your subscription will activate within a few
          seconds.
        </div>
      ) : null}
      {checkout === "cancelled" ? (
        <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-muted)] px-4 py-3 text-sm">
          Checkout cancelled. No charges were made.
        </div>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            Current plan
            <Badge variant="secondary">{currentPlan?.name ?? "Free"}</Badge>
          </CardTitle>
          <CardDescription>
            {periodEnd
              ? subscription?.cancel_at_period_end
                ? `Cancels on ${periodEnd}.`
                : `Renews on ${periodEnd}.`
              : "No active paid subscription."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {profile?.stripe_customer_id ? (
            <PortalButton />
          ) : (
            <p className="text-sm text-[var(--color-muted-foreground)]">
              Upgrade below to unlock the customer portal.
            </p>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        {PLANS.map((plan) => {
          const isCurrent = plan.tier === currentTier;
          return (
            <Card
              key={plan.tier}
              className={cn(
                plan.highlighted &&
                  "border-[var(--color-primary)] ring-1 ring-[var(--color-primary)]",
              )}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{plan.name}</span>
                  {isCurrent ? <Badge variant="success">Current</Badge> : null}
                </CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="pt-4 text-3xl font-semibold">
                  {formatPrice(plan.priceMonthlyCents)}
                  <span className="text-base font-normal text-[var(--color-muted-foreground)]">
                    {" "}
                    / mo
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-1.5 text-sm text-[var(--color-muted-foreground)]">
                  {plan.features.map((f) => (
                    <li key={f}>• {f}</li>
                  ))}
                </ul>
                {plan.tier === "free" ? (
                  isCurrent ? (
                    <p className="text-xs text-[var(--color-muted-foreground)]">
                      You&apos;re on the Free plan.
                    </p>
                  ) : null
                ) : isCurrent ? (
                  <p className="text-xs text-[var(--color-muted-foreground)]">
                    This is your active plan.
                  </p>
                ) : (
                  <UpgradeButton tier={plan.tier} label={plan.cta} />
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
