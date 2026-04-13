import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://hnkblrsbhbtxfekgfhvg.supabase.co",
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

export async function POST(request) {
  try {
    const body = await request.text();
    const sig = request.headers.get("stripe-signature");

    const stripe = getStripe();
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return NextResponse.json(
        { error: "Firma webhook non valida." },
        { status: 400 }
      );
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const userId = session.metadata?.userId;
      const tier = session.metadata?.tier;

      if (userId && tier) {
        const supabaseAdmin = getSupabaseAdmin();
        const { error } = await supabaseAdmin.from("purchases").insert({
          user_id: userId,
          tier,
          stripe_session_id: session.id,
          stripe_payment_intent: session.payment_intent,
          amount: session.amount_total,
          status: "completed",
        });

        if (error) {
          console.error("Error inserting purchase:", error);
          return NextResponse.json(
            { error: "Errore nel salvataggio dell'acquisto." },
            { status: 500 }
          );
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed." },
      { status: 400 }
    );
  }
}
