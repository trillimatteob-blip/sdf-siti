import Link from "next/link";
import { TIERS } from "@/lib/tiers";

const modules = [
  {
    num: "01",
    title: "Fondamenti del Posing",
    desc: "Le basi della postura, respirazione e controllo muscolare sul palco.",
  },
  {
    num: "02",
    title: "Pose Obbligatorie",
    desc: "Analisi dettagliata di ogni posa obbligatoria per Classic Physique e Men's Physique.",
  },
  {
    num: "03",
    title: "Transizioni e Flow",
    desc: "Come collegare le pose con transizioni fluide e d'impatto.",
  },
  {
    num: "04",
    title: "Routine Individuale",
    desc: "Costruisci la tua routine personalizzata per il palco.",
  },
  {
    num: "05",
    title: "Espressione e Stage Presence",
    desc: "Comunicare sicurezza e carisma davanti ai giudici.",
  },
  {
    num: "06",
    title: "Peak Week e Gara",
    desc: "Gestione dell'ultima settimana, pump-up backstage e performance finale.",
  },
];

const courseFaq = [
  {
    q: "Per chi e pensato il corso?",
    a: "Per atleti di tutte le categorie (Classic Physique, Men's Physique, Bodybuilding) che vogliono migliorare il proprio posing, dai principianti ai competitor esperti.",
  },
  {
    q: "Per quanto tempo ho accesso?",
    a: "L'accesso e illimitato. Una volta acquistato, puoi rivedere le lezioni tutte le volte che vuoi.",
  },
  {
    q: "Posso avere feedback sul mio posing?",
    a: "Si, il corso include la possibilita di inviare video per ricevere feedback personalizzato direttamente da Andrea.",
  },
  {
    q: "Come funzionano i 3 livelli?",
    a: "Il corso e disponibile in 3 livelli: Base (fondamentali), Pro (avanzato con routine individuale) ed Elite (accesso completo con feedback video personalizzato). Puoi acquistare il livello che preferisci dalla tua area personale.",
  },
  {
    q: "C'e una garanzia di rimborso?",
    a: "Si, offriamo una garanzia soddisfatti o rimborsati di 30 giorni. Se il corso non soddisfa le tue aspettative, ti rimborsiamo senza domande.",
  },
];

export default function CorsoPage() {
  return (
    <>
      {/* --- HERO --- */}
      <section className="relative pt-40 pb-24 px-6 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent pointer-events-none" />
        <div className="relative mx-auto max-w-4xl">
          <span className="section-label">VIDEO CORSO</span>
          <h1 className="font-heading text-5xl md:text-7xl tracking-wider text-white-warm mt-4">
            VIDEO CORSO POSING{" "}
            <span className="text-gold-gradient">PROFESSIONALE</span>
          </h1>
          <p className="mt-6 text-gray-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Le tecniche di posing del World Best Poser 2026, direttamente dal
            palco dell'Olympia alla tua preparazione. Lezioni professionali
            on-demand con accesso illimitato.
          </p>
          <p className="mt-4 text-gold font-heading text-lg tracking-wider">
            Disponibile in 3 livelli. Acquista dalla tua area personale.
          </p>
          <Link href="/dashboard" className="btn-gold mt-8 inline-block">
            ACCEDI ALL&apos;AREA RISERVATA
          </Link>
        </div>
      </section>

      {/* --- WHAT'S INCLUDED --- */}
      <section className="py-20 px-6 bg-black-card border-y border-gold/10">
        <div className="mx-auto max-w-5xl">
          <h2 className="section-title text-center">
            COSA <span className="text-gold-gradient">INCLUDE</span>
          </h2>
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "\u25B6",
                title: "6 Moduli Video",
                desc: "Oltre 4 ore di contenuto professionale registrato in alta qualita.",
              },
              {
                icon: "\u2605",
                title: "Feedback Personalizzato",
                desc: "Invia i tuoi video e ricevi correzioni dettagliate da Andrea.",
              },
              {
                icon: "\u221E",
                title: "Accesso Illimitato",
                desc: "Rivedi le lezioni quando vuoi, per sempre. Aggiornamenti inclusi.",
              },
            ].map((item) => (
              <div key={item.title} className="card p-8 text-center">
                <div className="text-gold text-4xl mb-4">{item.icon}</div>
                <h3 className="font-heading text-xl tracking-wider text-white-warm">
                  {item.title}
                </h3>
                <p className="mt-3 text-gray-muted text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- MODULES --- */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="section-title text-center">
            I <span className="text-gold-gradient">MODULI</span>
          </h2>
          <div className="mt-12 space-y-4">
            {modules.map((mod) => (
              <div
                key={mod.num}
                className="card p-6 flex items-start gap-6 hover:border-gold/30 transition-colors"
              >
                <span className="font-heading text-3xl text-gold flex-shrink-0">
                  {mod.num}
                </span>
                <div>
                  <h3 className="font-heading text-lg tracking-wider text-white-warm">
                    {mod.title}
                  </h3>
                  <p className="mt-1 text-gray-muted text-sm">{mod.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PRICING TIERS --- */}
      <section className="py-24 px-6 bg-black-card border-y border-gold/10">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-4">
            <span className="section-label">ACQUISTA</span>
            <h2 className="section-title mt-2">
              INVESTI NEL TUO <span className="text-gold-gradient">PALCO</span>
            </h2>
            <p className="mt-4 text-gray-muted max-w-xl mx-auto">
              Tre livelli per ogni fase del tuo percorso. Offerta di lancio a
              tempo limitato.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`card p-8 flex flex-col relative ${
                  tier.featured ? "card-featured" : ""
                }`}
              >
                {/* Badge */}
                {tier.badge && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gold text-black-deep font-heading text-xs tracking-widest px-4 py-1">
                    {tier.badge}
                  </span>
                )}

                {/* Title */}
                <h3 className="font-heading text-2xl tracking-wider text-white-warm text-center mb-1">
                  {tier.name}
                </h3>

                {/* Price */}
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <span className="text-gray-muted text-xl line-through decoration-gold/60">
                      {tier.priceBase}€
                    </span>
                    <span className="text-xs font-heading tracking-widest text-gold bg-gold/10 px-2 py-0.5 rounded">
                      OFFERTA LANCIO
                    </span>
                  </div>
                  <div>
                    <span className="font-heading text-5xl text-gold-gradient">
                      {tier.priceLaunch}
                    </span>
                    <span className="text-gray-muted text-lg ml-1">EUR</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="flex-1 space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-gray-muted"
                    >
                      <span className="text-gold text-xs mt-1">&#9670;</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="/dashboard"
                  className={`${
                    tier.featured ? "btn-gold" : "btn-ghost"
                  } w-full text-center`}
                >
                  ACQUISTA ORA
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- MONEY-BACK GUARANTEE --- */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-gold text-6xl mb-6">&#10022;</div>
          <h2 className="font-heading text-3xl tracking-wider text-white-warm">
            GARANZIA 30 GIORNI
          </h2>
          <p className="mt-4 text-gray-muted leading-relaxed">
            Sono cosi sicuro della qualita del corso che offro una garanzia
            soddisfatti o rimborsati di 30 giorni. Se non sei soddisfatto, ti
            rimborso l'intero importo senza fare domande.
          </p>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section className="py-24 px-6 bg-black-card border-y border-gold/10">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <span className="section-label">FAQ</span>
            <h2 className="section-title mt-2">
              DOMANDE <span className="text-gold-gradient">FREQUENTI</span>
            </h2>
          </div>
          <div className="space-y-4">
            {courseFaq.map((item) => (
              <details
                key={item.q}
                className="card group p-6 cursor-pointer"
              >
                <summary className="font-heading text-lg tracking-wider text-white-warm list-none flex items-center justify-between">
                  {item.q}
                  <span className="text-gold transition-transform group-open:rotate-45 text-2xl leading-none">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-gray-muted leading-relaxed">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-4xl md:text-5xl tracking-wider text-white-warm">
            PRONTO A DOMINARE IL{" "}
            <span className="text-gold-gradient">PALCO</span>?
          </h2>
          <p className="mt-4 text-gray-muted">
            Inizia oggi il tuo percorso verso un posing professionale.
          </p>
          <Link href="/dashboard" className="btn-gold mt-8 inline-block">
            ACCEDI ALL&apos;AREA RISERVATA
          </Link>
        </div>
      </section>
    </>
  );
}
