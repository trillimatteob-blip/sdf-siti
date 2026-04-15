import Stripe from "stripe";

/**
 * Server-side Stripe client. Keep out of client bundles.
 *
 * Uses the pinned API version that matches the installed `stripe` package so
 * webhook payloads line up with the types shipped by the SDK.
 */
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  // Pinned to match the installed SDK's default; override per env if needed.
  apiVersion: Stripe.API_VERSION,
  typescript: true,
  appInfo: {
    name: "sdf-siti-saas-starter",
  },
});
