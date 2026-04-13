import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Create client even with empty strings — pages that use auth
// will fail gracefully at runtime if env vars are missing.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
