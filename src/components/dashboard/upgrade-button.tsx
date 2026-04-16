"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import type { PlanTier } from "@/lib/supabase/types";

export function UpgradeButton({
  tier,
  label,
}: {
  tier: PlanTier;
  label: string;
}) {
  const [pending, setPending] = useState(false);

  async function handleClick() {
    setPending(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ tier }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      alert(data.error ?? "Could not start checkout.");
    } finally {
      setPending(false);
    }
  }

  return (
    <Button
      type="button"
      onClick={handleClick}
      disabled={pending}
      className="w-full"
    >
      {pending ? "Redirecting…" : label}
    </Button>
  );
}
