import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Andrea Mammoli | IFBB Pro Coach",
    template: "%s · Andrea Mammoli",
  },
  description:
    "Coaching online personalizzato e video corsi di posing con Andrea Mammoli, IFBB Pro Bodybuilder e 2x qualificato Mr. Olympia.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
