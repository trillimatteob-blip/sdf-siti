import { LandingCTA } from "@/components/landing/cta";
import { LandingFooter } from "@/components/landing/footer";
import { LandingHero } from "@/components/landing/hero";
import { LandingNav } from "@/components/landing/nav";
import { PricingSection } from "@/components/landing/pricing";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();

  // Pull live pricing from Supabase; fall back to the static catalog if empty.
  const { data: dbPlans } = await supabase
    .from("plans")
    .select("tier, name, description, price_monthly_cents, features")
    .order("price_monthly_cents", { ascending: true });

  return (
    <div className="flex min-h-screen flex-col">
      <LandingNav />
      <main className="flex-1">
        <LandingHero />
        <PricingSection dbPlans={dbPlans ?? null} />
        <LandingCTA />
      </main>
      <LandingFooter />
    </div>
  );
}
