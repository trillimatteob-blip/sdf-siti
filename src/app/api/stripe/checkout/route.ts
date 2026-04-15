import { NextResponse, type NextRequest } from "next/server";

import { getPlanByTier, resolveStripePriceId } from "@/lib/plans";
import { stripe } from "@/lib/stripe/server";
import { createClient } from "@/lib/supabase/server";
import type { PlanTier } from "@/lib/supabase/types";
import { absoluteUrl } from "@/lib/utils";

/**
 * Starts a Stripe Checkout session for the signed-in user.
 * Creates the Stripe customer on first use and stores the id on users.stripe_customer_id.
 */
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { tier } = (await request.json().catch(() => ({}))) as {
    tier?: PlanTier;
  };
  if (!tier || tier === "free") {
    return NextResponse.json(
      { error: "A paid plan tier is required" },
      { status: 400 },
    );
  }
  const plan = getPlanByTier(tier);
  const priceId = plan ? resolveStripePriceId(plan) : null;
  if (!plan || !priceId) {
    return NextResponse.json(
      { error: `No Stripe price configured for ${tier}` },
      { status: 400 },
    );
  }

  // Look up or create the Stripe customer.
  const { data: profile } = await supabase
    .from("users")
    .select("stripe_customer_id, email, full_name")
    .eq("id", user.id)
    .single();

  let customerId = profile?.stripe_customer_id ?? null;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: profile?.email ?? user.email ?? undefined,
      name: profile?.full_name ?? undefined,
      metadata: { supabase_user_id: user.id },
    });
    customerId = customer.id;
    await supabase
      .from("users")
      .update({ stripe_customer_id: customerId })
      .eq("id", user.id);
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: absoluteUrl("/dashboard/billing?checkout=success"),
    cancel_url: absoluteUrl("/dashboard/billing?checkout=cancelled"),
    allow_promotion_codes: true,
    client_reference_id: user.id,
    subscription_data: {
      metadata: { supabase_user_id: user.id, plan_tier: tier },
    },
  });

  if (!session.url) {
    return NextResponse.json(
      { error: "Stripe did not return a checkout URL" },
      { status: 500 },
    );
  }

  return NextResponse.json({ url: session.url });
}
