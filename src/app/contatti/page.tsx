import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const metadata = {
  title: "Contatti — Andrea Mammoli",
  description: "Contatta Andrea Mammoli per coaching, posing o collaborazioni.",
};

export default function ContattiPage() {
  return (
    <main className="mx-auto max-w-xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">Contatti</h1>
      <p className="mt-2 text-neutral-500">
        Scrivimi per iniziare il tuo percorso o per collaborazioni.
      </p>
      <form className="mt-8 space-y-4">
        <div>
          <Label htmlFor="name">Nome</Label>
          <Input id="name" placeholder="Il tuo nome" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="La tua email" />
        </div>
        <div>
          <Label htmlFor="message">Messaggio</Label>
          <textarea
            id="message"
            rows={4}
            className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500 dark:border-neutral-700 dark:bg-neutral-900"
            placeholder="Dimmi chi sei e cosa vuoi raggiungere"
          />
        </div>
        <Button type="submit" className="w-full">
          Invia messaggio
        </Button>
      </form>
    </main>
  );
}
