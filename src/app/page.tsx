import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col" style={{ background: '#050507', color: '#f2ede4' }}>
      {/* Hero */}
      <section className="flex flex-1 items-center justify-center px-6 py-20 text-center">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold tracking-tight md:text-6xl" style={{ color: '#c8a951' }}>
            ANDREA MAMMOLI
          </h1>
          <p className="mt-6 text-lg md:text-xl" style={{ color: 'rgba(242,237,228,0.5)' }}>
            IFBB Pro | 2× OLYMPIAN | WORLD BEST POSER 2026
          </p>
          <p className="mt-4 text-lg" style={{ color: 'rgba(242,237,228,0.7)' }}>
            Coaching online personalizzato e video corsi di posing.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link href="/corso" className={cn(buttonVariants({ size: "lg" }))}>
              Scopri i corsi
            </Link>
            <Link href="/coaching" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
              Coaching 1:1
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t px-6 py-20" style={{ borderColor: 'rgba(242,237,228,0.1)', background: '#0c0c0e' }}>
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold">Cosa include</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { title: "Video Corsi", desc: "Lezioni on-demand sul posing Classic Physique." },
              { title: "Coaching 1:1", desc: "Sessioni personalizzate per la tua preparazione." },
              { title: "Community", desc: "Accesso esclusivo alla community di atleti." },
            ].map((f) => (
              <div key={f.title} className="rounded-xl border p-6" style={{ borderColor: 'rgba(242,237,228,0.1)', background: '#050507' }}>
                <h3 className="text-lg font-semibold" style={{ color: '#c8a951' }}>{f.title}</h3>
                <p className="mt-2" style={{ color: 'rgba(242,237,228,0.5)' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 text-center">
        <h2 className="text-3xl font-bold">Il palco ti aspetta.</h2>
        <p className="mt-4" style={{ color: 'rgba(242,237,228,0.5)' }}>
          Ogni settimana senza metodo è una settimana di potenziale non espresso.
        </p>
        <div className="mt-8">
          <Link href="/corso" className={cn(buttonVariants({ size: "lg" }))}>
            INIZIA ORA
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-6 py-10" style={{ borderColor: 'rgba(242,237,228,0.1)' }}>
        <div className="mx-auto max-w-5xl text-center text-sm" style={{ color: 'rgba(242,237,228,0.5)' }}>
          <p>© 2026 Andrea Mammoli. Tutti i diritti riservati.</p>
        </div>
      </footer>
    </main>
  );
}
