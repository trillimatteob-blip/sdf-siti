import { createClient } from "@supabase/supabase-js";

let _supabase = null;

export function getSupabase() {
  if (_supabase) return _supabase;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (url && key) {
    _supabase = createClient(url, key);
  }

  return _supabase;
}

// For backward compatibility — but prefer getSupabase() in client components
export const supabase =
  typeof window !== "undefined"
    ? (() => {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        return url && key ? createClient(url, key) : null;
      })()
    : null;
