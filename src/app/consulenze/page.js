import Link from "next/link";

const WHATSAPP_POSING =
  "https://wa.me/393516157497?text=Ciao%20Andrea%2C%20vorrei%20prenotare%20una%20sessione%20di%20posing";

const includes = [
  "Analisi completa del tuo posing attuale",
  "Correzioni in tempo reale sulle pose",
  "Consigli su transizioni e stage presence",
  "Feedback personalizzato sulle tue aree di miglioramento",
  "Piano d'azione post-sessione",
  "Registrazione della sessione per riferimento futuro",
];

export default function ConsulenzePage() {
  return (
    <>
      {/* --- HERO --- */}
      <section className="relative pt-40 pb-24 px-6 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent pointer-events-none" />
        <div className="relative mx-auto max-w-4xl">
          <span className="section-label">SESSIONI DI POSING</span>
          <h1 className="font-heading text-5xl md:text-7xl tracking-wider text-white-warm mt-4">
            SESSIONI{" "}
            <span className="text-gold-gradient">ONE-TO-ONE</span>
          </h1>
          <p className="mt-6 text-gray-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Sessioni individuali di posing con Andrea, online o dal vivo.
            Correzioni personalizzate e feedback in tempo reale per migliorare
            il tuo posing e la tua stage presence.
          </p>
        </div>
      </section>

      {/* --- OPTIONS --- */}
      <section className="py-24 px-6 bg-black-card border-y border-gold/10">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <span className="section-label">SESSIONI</span>
            <h2 className="section-title mt-2">
              SCEGLI LA TUA <span className="text-gold-gradient">MODALITA</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Online */}
            <div className="card p-8 text-center">
              <div className="text-gold text-4xl mb-4">&#9654;</div>
              <h3 className="font-heading text-xl tracking-wider text-white-warm">
                Sessione Online 1-to-1
              </h3>
              <div className="mt-4 mb-4">
                <span className="font-heading text-5xl text-gold-gradient">87</span>
                <span className="text-gray-muted text-lg ml-1">EUR / sessione</span>
              </div>
              <p className="text-gray-muted text-sm leading-relaxed">
                Correzione posing via videochiamata con Andrea. Analisi
                dettagliata e consigli personalizzati in tempo reale comodamente
                da casa tua.
              </p>
              <a
                href={WHATSAPP_POSING}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost mt-6 inline-block"
              >
                PRENOTA ORA
              </a>
            </div>

            {/* Live */}
            <div className="card-featured p-8 text-center">
              <div className="text-gold text-4xl mb-4">&#9733;</div>
              <h3 className="font-heading text-xl tracking-wider text-white-warm">
                Sessione dal Vivo 1-to-1
              </h3>
              <div className="mt-4 mb-4">
                <span className="font-heading text-5xl text-gold-gradient">87</span>
                <span className="text-gray-muted text-lg ml-1">EUR / sessione</span>
              </div>
              <p className="text-gray-muted text-sm leading-relaxed">
                Correzione in presenza con Andrea. Sessioni dal vivo con
                feedback immediato e preparazione palco dedicata.
              </p>
              <a
                href={WHATSAPP_POSING}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold mt-6 inline-block"
              >
                PRENOTA ORA
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHAT YOU GET --- */}
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

      {/* --- CTA --- */}
      <section className="py-24 px-6 bg-black-card border-y border-gold/10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-4xl md:text-5xl tracking-wider text-white-warm">
            MIGLIORA IL TUO{" "}
            <span className="text-gold-gradient">POSING</span>
          </h2>
          <p className="mt-4 text-gray-muted">
            Prenota la tua sessione 1-to-1 e ricevi correzioni personalizzate
            direttamente dal World Best Poser 2026.
          </p>
          <a
            href={WHATSAPP_POSING}
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
