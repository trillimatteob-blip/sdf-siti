import { NextResponse, type NextRequest } from "next/server";
import type Stripe from "stripe";

import { sendPaymentConfirmationEmail } from "@/lib/email/send";
import { getPlanByPriceId } from "@/lib/plans";
import { stripe } from "@/lib/stripe/server";
import { createServiceRoleClient } from "@/lib/supabase/server";
import type { SubscriptionStatus } from "@/lib/supabase/types";

export const runtime = "nodejs";

/**
 * Stripe webhook handler.
 * Configure the endpoint in Stripe → Developers → Webhooks to point at
 * <site>/api/stripe/webhook and forward these events:
 *   - checkout.session.completed
 *   - customer.subscription.created
 *   - customer.subscription.updated
 *   - customer.subscription.deleted
 *   - invoice.payment_succeeded
 */
export async function POST(request: NextRequest) {
  const signature = request.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature || !secret) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const rawBody = await request.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, secret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown";
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${message}` },
      { status: 400 },
    );
  }

  const supabase = createServiceRoleClient();

  try {
    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        await upsertSubscription(supabase, sub);
        break;
      }
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.subscription) {
          const subId =
            typeof session.subscription === "string"
              ? session.subscription
              : session.subscription.id;
          const sub = await stripe.subscriptions.retrieve(subId);
          await upsertSubscription(supabase, sub);
        }
        break;
      }
      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentSucceeded(supabase, invoice);
        break;
      }
      default:
        // No-op for unhandled event types.
        break;
    }
  } catch (err) {
    console.error("Stripe webhook handler error", err);
    return NextResponse.json({ error: "Handler error" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

async function upsertSubscription(
  supabase: ReturnType<typeof createServiceRoleClient>,
  sub: Stripe.Subscription,
) {
  const customerId =
    typeof sub.customer === "string" ? sub.customer : sub.customer.id;

  const { data: profile } = await supabase
    .from("users")
    .select("id")
    .eq("stripe_customer_id", customerId)
    .single();
  if (!profile) {
    console.warn("No user for Stripe customer", customerId);
    return;
  }

  const priceId = sub.items.data[0]?.price.id ?? null;
  const plan = priceId ? getPlanByPriceId(priceId) : undefined;

  let planRowId: string | null = null;
  if (plan) {
    const { data: planRow } = await supabase
      .from("plans")
      .select("id")
      .eq("tier", plan.tier)
      .single();
    planRowId = planRow?.id ?? null;
  }

  const currentPeriodEndSeconds =
    (sub as unknown as { current_period_end?: number }).current_period_end ??
    sub.items.data[0]?.current_period_end ??
    null;

  await supabase
    .from("subscriptions")
    .upsert(
      {
        user_id: profile.id,
        plan_id: planRowId,
        stripe_subscription_id: sub.id,
        stripe_price_id: priceId,
        status: sub.status as SubscriptionStatus,
        current_period_end: currentPeriodEndSeconds
          ? new Date(currentPeriodEndSeconds * 1000).toISOString()
          : null,
        cancel_at_period_end: sub.cancel_at_period_end,
      },
      { onConflict: "stripe_subscription_id" },
    );
}

async function handlePaymentSucceeded(
  supabase: ReturnType<typeof createServiceRoleClient>,
  invoice: Stripe.Invoice,
) {
  const customerId =
    typeof invoice.customer === "string"
      ? invoice.customer
      : invoice.customer?.id ?? null;
  if (!customerId) return;

  const { data: profile } = await supabase
    .from("users")
    .select("email, full_name")
    .eq("stripe_customer_id", customerId)
    .single();
  if (!profile?.email) return;

  const line = invoice.lines.data[0];
  const rawPrice = line?.pricing?.price_details?.price ?? null;
  const priceId =
    typeof rawPrice === "string" ? rawPrice : rawPrice?.id ?? null;
  const plan = priceId ? getPlanByPriceId(priceId) : undefined;
  const amount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: (invoice.currency ?? "usd").toUpperCase(),
  }).format((invoice.amount_paid ?? 0) / 100);

  if (!process.env.RESEND_API_KEY) return;
  try {
    await sendPaymentConfirmationEmail({
      to: profile.email,
      name: profile.full_name ?? "there",
      planName: plan?.name ?? "your plan",
      amount,
      invoiceUrl: invoice.hosted_invoice_url ?? null,
    });
  } catch (err) {
    console.error("payment confirmation email failed", err);
  }
}
