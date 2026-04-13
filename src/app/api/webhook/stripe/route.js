import { NextResponse } from "next/server";

/**
 * POST /api/webhook/stripe
 *
 * Handles Stripe webhook events (e.g., checkout.session.completed).
 *
 * TODO: Implement Stripe webhook verification and handling
 * ──────────────────────────────────────────────────────────
 *
 * 1. Add env var: STRIPE_WEBHOOK_SECRET (from Stripe Dashboard > Webhooks)
 *
 * 2. Verify the webhook signature:
 *
 *    import Stripe from "stripe";
 *    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
 *
 *    const sig = request.headers.get("stripe-signature");
 *    const body = await request.text();
 *    const event = stripe.webhooks.constructEvent(
 *      body,
 *      sig,
 *      process.env.STRIPE_WEBHOOK_SECRET
 *    );
 *
 * 3. Handle the event:
 *
 *    if (event.type === "checkout.session.completed") {
 *      const session = event.data.object;
 *      const userId = session.metadata.userId;
 *      const customerEmail = session.customer_email;
 *
 *      // Update the purchases table in Supabase:
 *      // await supabaseAdmin.from("purchases").insert({
 *      //   user_id: userId,
 *      //   product: "video-corso-posing",
 *      //   stripe_session_id: session.id,
 *      //   amount: session.amount_total,
 *      //   status: "completed",
 *      //   created_at: new Date().toISOString(),
 *      // });
 *    }
 *
 * 4. Use a Supabase service-role client (not the anon client) for
 *    server-side database operations in webhooks.
 *
 * 5. Configure the webhook URL in Stripe Dashboard:
 *    https://yourdomain.com/api/webhook/stripe
 *    Events to listen for: checkout.session.completed
 */

export async function POST(request) {
  try {
    // TODO: Implement webhook verification and handling (see comments above)

    const body = await request.text();

    // Placeholder: log that we received a webhook
    console.log("Stripe webhook received (not yet verified)");

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed." },
      { status: 400 }
    );
  }
}
