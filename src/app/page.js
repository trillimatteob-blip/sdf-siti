import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import PricingCard from "@/components/PricingCard";
import TestimonialCard from "@/components/TestimonialCard";
import FAQAccordion from "@/components/FAQAccordion";
import StatsCounter from "@/components/StatsCounter";

const WHATSAPP_URL =
  "https://wa.me/393516157497?text=Ciao%20Andrea!%20Vorrei%20info%20sul%20coaching";

const coachingFeatures = [
  "Piano personalizzato",
  "Check-in settimanali",
  "Supporto WhatsApp",
  "Posing coaching",
  "Accesso community",
];

const stats = [
  { value: "1°", label: "Primo Classic Physique Pro italiano" },
  { value: "2×", label: "Qualificazioni Mr. Olympia" },
  { value: "50K+", label: "Followers Instagram" },
  { value: "200+", label: "Atleti seguiti" },
];

const testimonials = [
  {
    name: "Marco R.",
    text: "Grazie ad Andrea ho raggiunto una forma che non pensavo possibile. Il suo approccio personalizzato ha fatto tutta la differenza nella mia preparazione gara.",
    role: "Atleta Men's Physique",
  },
  {
    name: "Luca D.",
    text: "Il coaching di Andrea va oltre la semplice scheda. Il supporto costante e la sua esperienza da Pro ti danno una sicurezza unica sul palco e in off-season.",
    role: "Atleta Classic Physique",
  },
  {
    name: "Simone T.",
    text: "Ho iniziato senza esperienza di gare e in 12 mesi ho vinto il mio primo regionale. Andrea sa esattamente come portarti al livello successivo.",
    role: "Atleta Bodybuilding",
  },
];

const faqItems = [
  {
    question: "Come funziona il coaching online?",
    answer:
      "Dopo un'analisi iniziale del tuo fisico, obiettivi e stile di vita, creo un piano completamente personalizzato che include allenamento, nutrizione e posing. Ogni settimana facciamo un check-in per monitorare i progressi e aggiustare il piano.",
  },
  {
    question: "Quanto costa il coaching?",
    answer:
      "Offriamo due piani: 6 mesi a 299 euro al mese e 12 mesi a 249 euro al mese. Il piano annuale offre il miglior valore e risultati piu consistenti.",
  },
  {
    question: "Quanto dura il percorso minimo?",
    answer:
      "Il percorso minimo e di 6 mesi. Questo ci permette di costruire una base solida e vedere risultati tangibili. Per preparazioni gara consiglio almeno 12 mesi.",
  },
  {
    question: "Quando posso aspettarmi i primi risultati?",
    answer:
      "I primi cambiamenti visibili arrivano generalmente entro 4-6 settimane. Risultati significativi si vedono dai 3 mesi in poi, con trasformazioni complete in 6-12 mesi.",
  },
  {
    question: "Come inizio?",
    answer:
      "Contattami su WhatsApp o compila il form nella pagina contatti. Fisseremo una call conoscitiva gratuita per capire i tuoi obiettivi e creare il piano perfetto per te.",
  },
];

const marqueeText =
  "2× OLYMPIAN  ✦  WORLD BEST POSER 2026  ✦  TOP 3 ARNOLD CLASSIC OHIO  ✦  ";

export default function HomePage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <HeroSection />

      {/* ─── MARQUEE BANNER ─── */}
      <div className="border-y border-gold/20 bg-black-card py-4 overflow-hidden">
        <div className="marquee-container">
          <div className="marquee-content font-heading text-xl md:text-2xl tracking-widest text-gold uppercase">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="mx-4">
                {marqueeText}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ─── ABOUT / CHI SONO ─── */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-12 items-center">
          {/* Image placeholder */}
          <div className="aspect-[3/4] rounded-2xl bg-black-card border border-gold/10 flex items-center justify-center">
            <span className="font-heading text-4xl text-gray-dim tracking-widest">
              FOTO
            </span>
          </div>

          {/* Content */}
          <div className="animate-fade-up">
            <span className="section-label">CHI SONO</span>
            <h2 className="section-title mt-2">
              ANDREA <span className="text-gold-gradient">MAMMOLI</span>
            </h2>
            <p className="font-accent italic text-lg text-gray-muted leading-relaxed mt-6">
              IFBB Pro Bodybuilder, primo italiano a competere nella categoria
              Classic Physique a livello professionistico. Due volte qualificato
              per il Mr. Olympia e riconosciuto come World Best Poser 2026.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                "IFBB Pro Classic Physique",
                "2× Mr. Olympia Qualifier",
                "Top 3 Arnold Classic Ohio",
                "World Best Poser 2026",
                "Coach di oltre 200 atleti",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-white-warm">
                  <span className="h-2 w-2 rounded-full bg-gold flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/coaching" className="btn-gold mt-10 inline-block">
              SCOPRI IL COACHING
            </Link>
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="py-20 px-6 bg-black-card border-y border-gold/10">
        <div className="mx-auto max-w-7xl">
          <StatsCounter stats={stats} />
        </div>
      </section>

      {/* ─── COACHING ─── */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-7xl text-center">
          <span className="section-label">COACHING</span>
          <h2 className="section-title mt-2">
            TRASFORMA IL TUO <span className="text-gold-gradient">FISICO</span>
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

      {/* ─── VIDEO CORSO ─── */}
      <section className="py-24 px-6 bg-black-card border-y border-gold/10">
        <div className="mx-auto max-w-7xl text-center">
          <span className="section-label">VIDEO CORSO</span>
          <h2 className="section-title mt-2">
            VIDEO CORSO <span className="text-gold-gradient">POSING</span>
          </h2>
          <p className="mt-6 text-gray-muted max-w-2xl mx-auto text-lg">
            Impara le tecniche di posing usate dai professionisti. Lezioni
            on-demand, feedback personalizzato e accesso illimitato.
          </p>

          <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: "▶",
                title: "Video Lezioni On-Demand",
                desc: "Accedi alle lezioni quando vuoi, dal tuo dispositivo preferito.",
              },
              {
                icon: "◆",
                title: "Tecniche Avanzate",
                desc: "Le stesse tecniche che uso nelle competizioni IFBB Pro.",
              },
              {
                icon: "★",
                title: "Feedback Personalizzato",
                desc: "Invia i tuoi video e ricevi correzioni dettagliate.",
              },
            ].map((feature) => (
              <div key={feature.title} className="card p-8 text-center">
                <div className="text-gold text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-heading text-xl tracking-wider text-white-warm">
                  {feature.title}
                </h3>
                <p className="mt-3 text-gray-muted text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>

          <Link href="/corso" className="btn-gold mt-12 inline-block">
            SCOPRI IL CORSO
          </Link>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-7xl text-center">
          <span className="section-label">TESTIMONIANZE</span>
          <h2 className="section-title mt-2">
            COSA DICONO I <span className="text-gold-gradient">MIEI ATLETI</span>
          </h2>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <TestimonialCard
                key={t.name}
                name={t.name}
                text={t.text}
                role={t.role}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-24 px-6 bg-black-card border-y border-gold/10">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <span className="section-label">FAQ</span>
            <h2 className="section-title mt-2">
              DOMANDE <span className="text-gold-gradient">FREQUENTI</span>
            </h2>
          </div>
          <FAQAccordion items={faqItems} />
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-24 px-6 bg-gradient-to-br from-gold-dark via-gold to-gold-light">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-5xl md:text-7xl tracking-wider text-black-deep">
            IL PALCO TI ASPETTA
          </h2>
          <p className="mt-4 font-heading text-2xl tracking-widest text-black-deep/70">
            POSTI LIMITATI
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-black-deep text-gold font-heading text-lg tracking-widest px-10 py-4 rounded-lg hover:bg-black-soft transition-colors"
            >
              CONTATTAMI SU WHATSAPP
            </a>
            <Link
              href="/corso"
              className="inline-block border-2 border-black-deep text-black-deep font-heading text-lg tracking-widest px-10 py-4 rounded-lg hover:bg-black-deep/10 transition-colors"
            >
              SCOPRI IL CORSO
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
