import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const metadata = {
  title: "AM Posing Academy — Video Corsi",
  description: "Accedi ai video corsi di posing con Andrea Mammoli, IFBB Pro.",
};

export default function CorsoPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16" style={{ color: '#f2ede4' }}>
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight" style={{ color: '#c8a951' }}>AM Posing Academy</h1>
        <p className="mt-4 text-lg" style={{ color: 'rgba(242,237,228,0.5)' }}>
          Impara le pose del Classic Physique e del Mens Physique con un IFBB Pro.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {[
          { name: "BASE", price: "47", features: ["AM Posing School: intro + pose", "Challenge inclusa", "Sconto Academy"] },
          { name: "PRO", price: "97", features: ["Tutto del Base", "Pose rilassate", "Masterclass (3-6 persone)"] },
          { name: "ELITE", price: "197", features: ["Tutto del Pro", "Transizioni avanzate", "1:1 con Andrea"] },
        ].map((plan) => (
          <Card key={plan.name} style={{ background: '#0c0c0e', borderColor: 'rgba(242,237,228,0.1)' }}>
            <CardHeader>
              <CardTitle style={{ color: '#c8a951' }}>{plan.name}</CardTitle>
              <p className="text-2xl font-bold text-[#f2ede4]">{plan.price}€</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="text-sm" style={{ color: 'rgba(242,237,228,0.6)' }}>{f}</li>
                ))}
              </ul>
              <Link href="/login?redirect=/dashboard/academy" className={cn(buttonVariants(), "mt-6 w-full")}>
                Acquista ora
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
