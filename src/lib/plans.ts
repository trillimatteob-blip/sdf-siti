import type { PlanTier } from "@/lib/supabase/types";

export interface PlanConfig {
  tier: PlanTier;
  name: string;
  description: string;
  priceMonthlyCents: number;
  /** Stripe price id — required for paid tiers. */
  stripePriceEnvVar: string | null;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

export const PLANS: PlanConfig[] = [
  {
    tier: "free",
    name: "Free",
    description: "Kick the tires. No credit card required.",
    priceMonthlyCents: 0,
    stripePriceEnvVar: null,
    features: [
      "1 project",
      "Community support",
      "Basic analytics",
    ],
    cta: "Get started",
  },
  {
    tier: "pro",
    name: "Pro",
    description: "For growing teams shipping every day.",
    priceMonthlyCents: 2900,
    stripePriceEnvVar: "STRIPE_PRICE_ID_PRO",
    features: [
      "Unlimited projects",
      "Priority email support",
      "Advanced analytics",
      "Custom domains",
    ],
    cta: "Upgrade to Pro",
    highlighted: true,
  },
  {
    tier: "enterprise",
    name: "Enterprise",
    description: "Dedicated support, SSO, and custom SLAs.",
    priceMonthlyCents: 9900,
    stripePriceEnvVar: "STRIPE_PRICE_ID_ENTERPRISE",
    features: [
      "Everything in Pro",
      "SSO / SAML",
      "Dedicated support",
      "99.99% uptime SLA",
      "Audit logs",
    ],
    cta: "Contact sales",
  },
];

export function getPlanByTier(tier: PlanTier): PlanConfig | undefined {
  return PLANS.find((p) => p.tier === tier);
}

export function getPlanByPriceId(priceId: string): PlanConfig | undefined {
  return PLANS.find((p) => {
    if (!p.stripePriceEnvVar) return false;
    return process.env[p.stripePriceEnvVar] === priceId;
  });
}

export function resolveStripePriceId(plan: PlanConfig): string | null {
  if (!plan.stripePriceEnvVar) return null;
  return process.env[plan.stripePriceEnvVar] ?? null;
}
