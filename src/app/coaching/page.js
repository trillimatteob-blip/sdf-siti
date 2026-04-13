import Link from "next/link";
import PricingCard from "@/components/PricingCard";

const WHATSAPP_URL =
  "https://wa.me/393516157497?text=Ciao%20Andrea!%20Vorrei%20info%20sul%20coaching";

const features = [
  {
    icon: "📋",
    title: "Piano Personalizzato",
    desc: "Allenamento, nutrizione e integrazione costruiti intorno ai tuoi obiettivi e al tuo stile di vita.",
  },
  {
    icon: "📊",
    title: "Check-in Settimanali",
    desc: "Ogni settimana analizziamo i tuoi progressi e aggiustiamo il piano per risultati ottimali.",
  },
  {
    icon: "💬",
    title: "Supporto WhatsApp",
    desc: "Accesso diretto a me via WhatsApp per domande, dubbi e motivazione quotidiana.",
  },
  {
    icon: "🏆",
    title: "Posing Coaching",
    desc: "Sessioni di posing incluse per chi si prepara a competizioni o vuole migliorare la propria estetica.",
  },
  {
    icon: "👥",
    title: "Community Esclusiva",
    desc: "Entra nella community di atleti che condividono il tuo stesso percorso e obiettivi.",
  },
  {
    icon: "📈",
    title: "Tracking Progressi",
    desc: "Monitoraggio costante con foto, misure e parametri per vedere la tua trasformazione.",
  },
];

const coachingFeatures = [
  "Piano personalizzato",
  "Check-in settimanali",
  "Supporto WhatsApp",
  "Posing coaching",
  "Accesso community",
];

const steps = [
  {
    num: "01",
    title: "CONTATTO",
    desc: "Scrivimi su WhatsApp o compila il form. Fissiamo una call conoscitiva gratuita.",
  },
  {
    num: "02",
    title: "ANALISI",
    desc: "Analizziamo il tuo fisico attuale, i tuoi obiettivi e il tuo stile di vita.",
  },
  {
    num: "03",
    title: "PIANO",
    desc: "Creo il tuo piano personalizzato di allenamento, nutrizione e posing.",
  },
  {
    num: "04",
    title: "RISULTATI",
    desc: "Seguiamo il piano insieme, aggiustiamo e ottimizziamo fino a raggiungere i tuoi obiettivi.",
  },
];

export default function CoachingPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative pt-40 pb-24 px-6 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent pointer-events-none" />
        <div className="relative mx-auto max-w-4xl">
          <span className="section-label">COACHING</span>
          <h1 className="font-heading text-5xl md:text-7xl tracking-wider text-white-warm mt-4">
            COACHING ONLINE{" "}
            <span className="text-gold-gradient">PERSONALIZZATO</span>
          </h1>
          <p className="mt-6 text-gray-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Un percorso costruito su misura per te, con il supporto diretto di
            un IFBB Pro. Allenamento, nutrizione e posing per portare il tuo
            fisico al livello successivo.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold mt-8 inline-block"
          >
            CONTATTAMI SU WHATSAPP
          </a>
        </div>
      </section>

      {/* ─── WHAT'S INCLUDED ─── */}
      <section className="py-24 px-6 bg-black-card border-y border-gold/10">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <span className="section-label">SERVIZIO</span>
            <h2 className="section-title mt-2">
              COSA <span className="text-gold-gradient">INCLUDE</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f) => (
              <div key={f.title} className="card p-8">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-heading text-xl tracking-wider text-white-warm">
                  {f.title}
                </h3>
                <p className="mt-3 text-gray-muted text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-7xl text-center">
          <span className="section-label">PIANI</span>
          <h2 className="section-title mt-2">
            SCEGLI IL TUO <span className="text-gold-gradient">PERCORSO</span>
          </h2>
          <div className="mt-16 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <PricingCard
              title="6 MESI"
              price="299"
              period="/mese"
              features={coachingFeatures}
              cta="INIZIA ORA"
              ctaLink={WHATSAPP_URL}
              external
            />
            <PricingCard
              title="12 MESI"
              price="249"
              period="/mese"
              features={coachingFeatures}
              cta="INIZIA ORA"
              ctaLink={WHATSAPP_URL}
              featured
              external
            />
          </div>
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section className="py-24 px-6 bg-black-card border-y border-gold/10">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <span className="section-label">PROCESSO</span>
            <h2 className="section-title mt-2">
              COME <span className="text-gold-gradient">FUNZIONA</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.num} className="text-center">
                <div className="font-heading text-5xl text-gold mb-4">
                  {step.num}
                </div>
                <h3 className="font-heading text-xl tracking-wider text-white-warm">
                  {step.title}
                </h3>
                <p className="mt-3 text-gray-muted text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-4xl md:text-5xl tracking-wider text-white-warm">
            INIZIA LA TUA{" "}
            <span className="text-gold-gradient">TRASFORMAZIONE</span>
          </h2>
          <p className="mt-4 text-gray-muted">
            Scrivimi su WhatsApp per una call conoscitiva gratuita.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold mt-8 inline-block"
          >
            CONTATTAMI SU WHATSAPP
          </a>
        </div>
      </section>
    </>
  );
}
