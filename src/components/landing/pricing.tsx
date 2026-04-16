import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PLANS } from "@/lib/plans";
import type { PlanTier } from "@/lib/supabase/types";
import { cn, formatPrice } from "@/lib/utils";

interface DbPlan {
  tier: PlanTier;
  name: string;
  description: string | null;
  price_monthly_cents: number;
  features: unknown;
}

export function PricingSection({ dbPlans }: { dbPlans: DbPlan[] | null }) {
  // Merge DB plans with static catalog so features/CTAs stay in sync even if
  // Supabase isn't seeded yet.
  const plans = PLANS.map((plan) => {
    const override = dbPlans?.find((p) => p.tier === plan.tier);
    return {
      ...plan,
      name: override?.name ?? plan.name,
      description: override?.description ?? plan.description,
      priceMonthlyCents:
        override?.price_monthly_cents ?? plan.priceMonthlyCents,
      features: Array.isArray(override?.features)
        ? (override!.features as string[])
        : plan.features,
    };
  });

  return (
    <section id="pricing" className="border-t border-[var(--color-border)] px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Pricing that scales with you
          </h2>
          <p className="mt-3 text-[var(--color-muted-foreground)]">
            Start free. Upgrade when you need more.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.tier}
              className={cn(
                plan.highlighted &&
                  "border-[var(--color-primary)] ring-1 ring-[var(--color-primary)]",
              )}
            >
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="pt-4 text-4xl font-semibold">
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
                <Link
                  href={plan.tier === "free" ? "/signup" : "/signup"}
                  className="block"
                >
                  <Button
                    className="w-full"
                    variant={plan.highlighted ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
