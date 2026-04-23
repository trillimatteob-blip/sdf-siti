import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export const metadata = {
  title: "Video Corsi — AM Posing Academy",
  description: "Accedi ai video corsi di posing con Andrea Mammoli, IFBB Pro.",
};

export default function CorsoPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight">AM Posing Academy</h1>
        <p className="mt-4 text-lg text-neutral-500">
          Impara le pose del Classic Physique e del Mens Physique con un IFBB Pro.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Pacchetto Base",
            price: "47",
            features: ["AM Posing School: intro + pose", "Challenge inclusa", "Sconto Academy"],
          },
          {
            title: "Pacchetto Pro",
            price: "97",
            features: [
              "Tutto del Base",
              "Pose rilassate",
              "Masterclass (3-6 persone)",
            ],
          },
          {
            title: "Pacchetto Elite",
            price: "197",
            features: [
              "Tutto del Pro",
              "Transizioni avanzate",
              "1:1 con Andrea",
            ],
          },
        ].map((plan) => (
          <Card key={plan.title}>
            <CardHeader>
              <CardTitle>{plan.title}</CardTitle>
              <p className="text-2xl font-bold">{plan.price}</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="text-sm text-neutral-600">
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/login?redirect=/dashboard/academy" className={cn(buttonVariants(), "mt-6 w-full")}>
                <Link href="/login?redirect=/dashboard/academy">Acquista ora</Link>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
