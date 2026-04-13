import { NextResponse } from "next/server";

/**
 * POST /api/checkout
 *
 * Creates a Stripe Checkout Session for course purchase.
 *
 * TODO: Implement Stripe integration
 * ────────────────────────────────────
 * 1. Install Stripe: npm install stripe
 * 2. Add env vars: STRIPE_SECRET_KEY, STRIPE_PRICE_ID, NEXT_PUBLIC_BASE_URL
 * 3. Create a Stripe product + price for the Video Corso (€497 one-time)
 * 4. Implement the checkout session creation:
 *
 *    import Stripe from "stripe";
 *    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
 *
 *    const session = await stripe.checkout.sessions.create({
 *      mode: "payment",
 *      payment_method_types: ["card"],
 *      line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
 *      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
 *      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/cancel`,
 *      customer_email: body.email, // optional, pre-fill email
 *      metadata: { userId: body.userId },
 *    });
 *
 * 5. Return the session URL for redirect
 */

export async function POST(request) {
  try {
    const body = await request.json();

    // TODO: Replace with actual Stripe session creation
    // For now, return a placeholder redirect to the success page
    const checkoutUrl = "/checkout/success";

    return NextResponse.json({
      url: checkoutUrl,
      message: "Stripe checkout non ancora configurato. Redirect al placeholder.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Errore nella creazione della sessione di checkout." },
      { status: 500 }
    );
  }
}
