import { headers } from "next/headers";

/**
 * Resolve the public base URL for this app and append `path`.
 *
 * **Server-only.** Lives in its own file so `next/headers` never ends up in
 * the client bundle — importing this module from a client component throws
 * at build time via `server-only`.
 *
 * Resolution order (first non-empty wins):
 *   1. `NEXT_PUBLIC_APP_URL`  — canonical, matches the current `.env.example`.
 *   2. `NEXT_PUBLIC_SITE_URL` — legacy name, kept for back-compat.
 *   3. Request origin from `next/headers` (`x-forwarded-host` + proto, or
 *      plain `host`) — works in Server Actions, Route Handlers and Server
 *      Components, i.e. the only places that call this helper.
 *   4. `VERCEL_URL` — auto-set on Vercel previews with no explicit env var.
 *   5. `http://localhost:3000` — last-resort dev fallback.
 *
 * Every layer guards against empty strings (`??` would propagate `""`; we
 * use explicit length checks instead), so a var set to `""` on Vercel no
 * longer yields a path-only URL that crashes Supabase's `new URL(...)` with
 * `TypeError: Invalid URL, input: ''`.
 */
export async function absoluteUrl(path: string): Promise<string> {
  const base = await getBaseUrl();
  const normalizedBase = base.replace(/\/+$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}

async function getBaseUrl(): Promise<string> {
  const fromEnv =
    nonEmpty(process.env.NEXT_PUBLIC_APP_URL) ??
    nonEmpty(process.env.NEXT_PUBLIC_SITE_URL);
  if (fromEnv) return fromEnv;

  try {
    const h = await headers();
    const host = h.get("x-forwarded-host") ?? h.get("host");
    if (host) {
      const proto = h.get("x-forwarded-proto") ?? "https";
      return `${proto}://${host}`;
    }
  } catch {
    // `headers()` throws when called outside a request scope (e.g. at module
    // load during `next build` page-data collection). Fall through.
  }

  const vercelHost = nonEmpty(process.env.VERCEL_URL);
  if (vercelHost) return `https://${vercelHost}`;

  return "http://localhost:3000";
}

function nonEmpty(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}
