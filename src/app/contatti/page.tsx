import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const metadata = {
  title: "Contatti — Andrea Mammoli",
  description: "Contatta Andrea Mammoli per coaching, posing o collaborazioni.",
};

export default function ContattiPage() {
  return (
    <main className="mx-auto max-w-xl px-6 py-16" style={{ color: '#f2ede4' }}>
      <h1 className="text-3xl font-bold tracking-tight" style={{ color: '#c8a951' }}>Contatti</h1>
      <p className="mt-2" style={{ color: 'rgba(242,237,228,0.5)' }}>Scrivimi per iniziare il tuo percorso.</p>
      <form className="mt-8 space-y-4">
        <div><Label htmlFor="name" style={{ color: '#f2ede4' }}>Nome</Label><Input id="name" placeholder="Il tuo nome" style={{ background: '#0c0c0e', borderColor: 'rgba(242,237,228,0.1)', color: '#f2ede4' }} /></div>
        <div><Label htmlFor="email" style={{ color: '#f2ede4' }}>Email</Label><Input id="email" type="email" placeholder="La tua email" style={{ background: '#0c0c0e', borderColor: 'rgba(242,237,228,0.1)', color: '#f2ede4' }} /></div>
        <div>
          <Label htmlFor="message" style={{ color: '#f2ede4' }}>Messaggio</Label>
          <textarea id="message" rows={4} className="mt-1 w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1" style={{ background: '#0c0c0e', borderColor: 'rgba(242,237,228,0.1)', color: '#f2ede4' }} placeholder="Dimmi chi sei e cosa vuoi raggiungere" />
        </div>
        <Button type="submit" className="w-full">Invia messaggio</Button>
      </form>
    </main>
  );
}
