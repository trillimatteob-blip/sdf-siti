import Stripe from "stripe";

/**
 * Server-side Stripe client. Keep out of client bundles.
 *
 * Lazy singleton so that importing this module during `next build` (when
 * secrets aren't present) doesn't throw. The first caller pays the
 * construction cost.
 */
let cached: Stripe | null = null;

export function getStripe(): Stripe {
  if (cached) return cached;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set. Add it to your environment before calling Stripe.",
    );
  }
  cached = new Stripe(key, {
    apiVersion: Stripe.API_VERSION,
    typescript: true,
    appInfo: { name: "sdf-siti-saas-starter" },
  });
  return cached;
}

/**
 * Proxy object that defers construction until first property access.
 * Lets existing `stripe.foo.bar(...)` callsites stay ergonomic while
 * remaining safe to import during build.
 */
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop, receiver) {
    const client = getStripe();
    const value = Reflect.get(client, prop, receiver);
    return typeof value === "function" ? value.bind(client) : value;
  },
});
