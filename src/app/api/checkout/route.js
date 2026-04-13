import { NextResponse } from "next/server";
import Stripe from "stripe";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

function getTierPrices() {
  return {
    base: process.env.STRIPE_PRICE_BASE,
    pro: process.env.STRIPE_PRICE_PRO,
    elite: process.env.STRIPE_PRICE_ELITE,
  };
}

export async function POST(request) {
  try {
    const { tier, userId, email } = await request.json();

    const tierPrices = getTierPrices();

    if (!tier || !tierPrices[tier]) {
      return NextResponse.json(
        { error: "Tier non valido." },
        { status: 400 }
      );
    }

    const priceId = tierPrices[tier];
    if (!priceId) {
      return NextResponse.json(
        { error: `Prezzo Stripe non configurato per il tier ${tier}.` },
        { status: 500 }
      );
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/cancel`,
      customer_email: email || undefined,
      metadata: { userId, tier },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Errore nella creazione della sessione di checkout." },
      { status: 500 }
    );
  }
}
