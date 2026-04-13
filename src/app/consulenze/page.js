import Link from "next/link";

const WHATSAPP_URL =
  "https://wa.me/393516157497?text=Ciao%20Andrea!%20Vorrei%20prenotare%20una%20consulenza";

const includes = [
  "Analisi completa del tuo fisico e obiettivi",
  "Revisione piano di allenamento attuale",
  "Consigli su nutrizione e integrazione",
  "Valutazione posing con correzioni in tempo reale",
  "Piano d'azione personalizzato post-consulenza",
  "Registrazione della sessione per riferimento futuro",
];

export default function ConsulenzePage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative pt-40 pb-24 px-6 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent pointer-events-none" />
        <div className="relative mx-auto max-w-4xl">
          <span className="section-label">CONSULENZE</span>
          <h1 className="font-heading text-5xl md:text-7xl tracking-wider text-white-warm mt-4">
            CONSULENZE{" "}
            <span className="text-gold-gradient">ONE-TO-ONE</span>
          </h1>
          <p className="mt-6 text-gray-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Una sessione individuale con Andrea per ricevere feedback
            personalizzato, risolvere dubbi specifici e ottenere un piano
            d'azione concreto per i tuoi obiettivi.
          </p>
        </div>
      </section>

      {/* ─── DESCRIPTION ─── */}
      <section className="py-20 px-6 bg-black-card border-y border-gold/10">
        <div className="mx-auto max-w-3xl">
          <h2 className="section-title text-center">
            COME <span className="text-gold-gradient">FUNZIONA</span>
          </h2>
          <p className="mt-6 text-gray-muted text-center leading-relaxed">
            La consulenza one-to-one e una videochiamata di 60 minuti in cui
            analizziamo insieme il tuo fisico, il tuo allenamento e la tua
            nutrizione. Ti do feedback immediato e un piano d'azione chiaro per
            i prossimi passi. Ideale per chi non cerca un coaching continuativo
            ma vuole una guida esperta per ottimizzare il proprio percorso.
          </p>
        </div>
      </section>

      {/* ─── WHAT YOU GET ─── */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="section-title text-center">
            COSA <span className="text-gold-gradient">OTTIENI</span>
          </h2>
          <ul className="mt-12 space-y-4">
            {includes.map((item) => (
              <li
                key={item}
                className="card p-5 flex items-center gap-4"
              >
                <span className="h-3 w-3 rounded-full bg-gold flex-shrink-0" />
                <span className="text-white-warm">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section className="py-24 px-6 bg-black-card border-y border-gold/10">
        <div className="mx-auto max-w-xl text-center">
          <span className="section-label">PREZZO</span>
          <h2 className="section-title mt-2">
            SINGOLA <span className="text-gold-gradient">SESSIONE</span>
          </h2>

          <div className="card-featured p-10 mt-12">
            <p className="text-gray-muted text-sm tracking-wider uppercase">
              Consulenza One-to-One
            </p>
            <div className="mt-4 flex items-baseline justify-center gap-2">
              <span className="font-heading text-6xl text-gold">150</span>
              <span className="text-gray-muted text-xl">EUR / sessione</span>
            </div>
            <p className="mt-4 text-gray-muted text-sm">
              Videochiamata di 60 minuti + piano d'azione
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold w-full mt-10 inline-block text-center"
            >
              PRENOTA SU WHATSAPP
            </a>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-4xl md:text-5xl tracking-wider text-white-warm">
            HAI BISOGNO DI{" "}
            <span className="text-gold-gradient">RISPOSTE</span>?
          </h2>
          <p className="mt-4 text-gray-muted">
            Prenota la tua consulenza e ottieni un piano d'azione concreto in 60
            minuti.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold mt-8 inline-block"
          >
            PRENOTA SU WHATSAPP
          </a>
        </div>
      </section>
    </>
  );
}
