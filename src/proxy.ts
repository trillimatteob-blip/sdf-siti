import type { NextRequest } from "next/server";

import { updateSession } from "@/lib/supabase/proxy";

/**
 * Next.js 16 Proxy (formerly Middleware).
 * Refreshes Supabase sessions and gates `/dashboard/*` behind auth.
 */
export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Run on every route except:
     *   - Next.js internals (_next/...)
     *   - Static files (favicon, images, svg, etc.)
     *   - The Stripe webhook endpoint — raw body signature verification
     *     must not pass through any Supabase cookie handling.
     */
    "/((?!_next/static|_next/image|favicon.ico|api/stripe/webhook|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
