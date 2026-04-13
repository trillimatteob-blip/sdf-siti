import { createClient } from "@supabase/supabase-js";

// These are public credentials (anon key is designed to be client-safe).
// Row Level Security (RLS) on Supabase protects the data.
const SUPABASE_URL = "https://hnkblrsbhbtxfekgfhvg.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhua2JscnNiaGJ0eGZla2dmaHZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2MzE2MjYsImV4cCI6MjA5MTIwNzYyNn0.qhceFqc18lTaPS_bwOA4NUvNQpHASp4QYN73meg177w";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Alias for components that already use getSupabase()
export function getSupabase() {
  return supabase;
}
