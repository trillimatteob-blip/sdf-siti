import Link from "next/link";

import { PortalButton } from "@/components/dashboard/portal-button";
import { ProfileForm } from "@/components/dashboard/profile-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("users")
    .select("email, full_name, stripe_customer_id")
    .eq("id", user!.id)
    .single();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-[var(--color-muted-foreground)]">
          Manage your profile and billing.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            Update your display name. Email changes go through Supabase Auth.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm
            email={profile?.email ?? user!.email ?? ""}
            fullName={profile?.full_name ?? ""}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing</CardTitle>
          <CardDescription>
            Manage subscription, invoices, and payment methods.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3">
          <Link
            href="/dashboard/billing"
            className="inline-flex h-10 items-center justify-center rounded-md border border-[var(--color-border)] px-4 text-sm font-medium hover:bg-[var(--color-accent)]"
          >
            View plans
          </Link>
          {profile?.stripe_customer_id ? (
            <PortalButton />
          ) : (
            <span className="text-sm text-[var(--color-muted-foreground)]">
              Subscribe to a paid plan to access the customer portal.
            </span>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
