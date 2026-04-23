import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Coaching Online — Andrea Mammoli",
  description: "Coaching personalizzato con Andrea Mammoli, IFBB Pro e 2x Olympian.",
};

export default function CoachingPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 text-center" style={{ color: '#f2ede4' }}>
      <h1 className="text-4xl font-bold tracking-tight" style={{ color: '#c8a951' }}>Coaching Online</h1>
      <p className="mt-4 text-lg" style={{ color: 'rgba(242,237,228,0.5)' }}>
        Scheda di allenamento, dieta e posing dedicato. Check-in settimanali e supporto diretto.
      </p>
      <div className="mt-10 flex justify-center gap-4">
        <Button size="lg">Contattami su WhatsApp</Button>
        <Button variant="outline" size="lg">Scopri i pacchetti</Button>
      </div>
    </main>
  );
}
