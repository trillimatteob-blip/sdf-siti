"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

export function PortalButton() {
  const [pending, setPending] = useState(false);

  async function handleClick() {
    setPending(true);
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = (await res.json()) as { url?: string; error?: string };
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      alert(data.error ?? "Could not open customer portal.");
    } finally {
      setPending(false);
    }
  }

  return (
    <Button type="button" onClick={handleClick} disabled={pending}>
      {pending ? "Opening…" : "Open customer portal"}
    </Button>
  );
}
