import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "SaaS Starter",
    template: "%s · SaaS Starter",
  },
  description:
    "Production-ready SaaS starter with Next.js, Supabase, Stripe, and Resend.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
