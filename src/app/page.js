import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import TestimonialCard from "@/components/TestimonialCard";
import FAQAccordion from "@/components/FAQAccordion";
import StatsCounter from "@/components/StatsCounter";

const WHATSAPP_URL =
  "https://wa.me/393516157497?text=Ciao%20Andrea%2C%20vorrei%20iniziare%20il%20mio%20percorso%20di%20coaching";

const WHATSAPP_POSING =
  "https://wa.me/393516157497?text=Ciao%20Andrea%2C%20vorrei%20prenotare%20una%20sessione%20di%20posing";

const stats = [
  { value: "2", prefix: "", suffix: "\u00d7", label: "Mr. Olympia", sublabel: "Il palco pi\u00f9 grande del bodybuilding mondiale" },
  { value: "23", suffix: " anni", label: "Primo titolo Pro", sublabel: "Il pi\u00f9 giovane Classic Physique Pro d\u2019Italia" },
  { value: "335", suffix: "K", label: "Follower Instagram", sublabel: "Una delle community di bodybuilding pi\u00f9 grandi d\u2019Italia" },
  { value: "100", suffix: "+", label: "Atleti seguiti", sublabel: "Centinaia di trasformazioni reali e risultati dimostrabili" },
];

const coachingFeatures = [
  {
    icon: "\u{1F4CB}",
    title: "Piano Personalizzato",
    desc: "Allenamento, nutrizione e integrazione costruiti intorno ai tuoi obiettivi.",
  },
  {
    icon: "\u{1F4CA}",
    title: "Check-in Settimanali",
    desc: "Ogni settimana analizziamo i tuoi progressi e aggiustiamo il piano.",
  },
  {
    icon: "\u{1F4AC}",
    title: "Supporto WhatsApp",
    desc: "Accesso diretto a me via WhatsApp per domande e motivazione quotidiana.",
  },
  {
    icon: "\u{1F3C6}",
    title: "Posing Coaching",
    desc: "Sessioni di posing incluse per chi si prepara a competizioni.",
  },
  {
    icon: "\u{1F465}",
    title: "Community Esclusiva",
    desc: "Entra nella community di atleti che condividono il tuo percorso.",
  },
  {
    icon: "\u{1F4C8}",
    title: "Tracking Progressi",
    desc: "Monitoraggio costante con foto, misure e parametri di trasformazione.",
  },
];

const testimonials = [
  {
    name: "Marco R.",
    text: "Non capivo perch\u00e9 perdevo in gara pur avendo un buon fisico. Dopo 3 mesi con Andrea ho rivoluzionato il mio posing. Gara successiva: podio.",
    role: "Atleta Men\u2019s Physique",
  },
  {
    name: "Luca F.",
    text: "Ho trasformato completamente il mio physique e la mia mentalit\u00e0. Andrea non ti d\u00e0 solo la scheda \u2014 ti insegna a pensare come un atleta.",
    role: "Coaching Personalizzato",
  },
  {
    name: "Davide M.",
    text: "Le video lezioni di posing valgono ogni centesimo. Ho imparato pi\u00f9 in 2 settimane di quanto avessi imparato in 2 anni da solo davanti allo specchio.",
    role: "Pacchetto Video Posing",
  },
];

const faqItems = [
  {
    question: "Come funziona il coaching online?",
    answer:
      "Dopo il primo contatto su WhatsApp valutiamo insieme il tuo livello e i tuoi obiettivi. Ricevi una scheda di allenamento e un piano alimentare personalizzati. Check-in settimanali via foto o video, con aggiornamenti progressivi ogni mese.",
  },
  {
    question: "Cosa include il pacchetto video lezioni di posing?",
    answer:
      "Un ciclo completo di video lezioni sulle pose fondamentali del Classic Physique e del Men\u2019s Physique, con correzioni e consigli diretti da Andrea. Puoi rivederli quando vuoi, senza limiti di tempo.",
  },
  {
    question: "Posso prenotare una sessione di posing dal vivo?",
    answer:
      "S\u00ec. Le sessioni in presenza si organizzano in base alla disponibilit\u00e0 di Andrea. Scrivi su WhatsApp e troviamo insieme la data e la location pi\u00f9 adatta a te.",
  },
  {
    question: "Il coaching include la preparazione gara?",
    answer:
      "S\u00ec, la preparazione gara pu\u00f2 essere inclusa nel percorso di coaching. Include scheda peak week, dieta pre-gara, posing dedicato e supporto diretto di Andrea negli ultimi giorni prima del palco. Contattami su WhatsApp per discuterne.",
  },
];

const marqueeText =
  "2\u00d7 OLYMPIAN  \u2726  WORLD BEST POSER 2026  \u2726  TOP 3 ARNOLD CLASSIC OHIO  \u2726  ";

export default function HomePage() {
  return (
    <>
      {/* --- HERO --- */}
      <HeroSection />

      {/* --- MARQUEE BANNER --- */}
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

      {/* --- ABOUT / CHI SONO --- */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-12 items-center">
          {/* Photo */}
          <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-gold/10">
            <img
              src="/posing-outdoor.jpg"
              alt="Andrea Mammoli - Classic Physique Posing"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="animate-fade-up">
            <span className="section-label">CHI SONO</span>
            <h2 className="section-title mt-2">
              Il Regalo <span className="text-gold-gradient">Italiano.</span>
            </h2>
            <p className="font-accent italic text-lg text-gray-muted leading-relaxed mt-6">
              Sono Andrea Mammoli. Ho reso la mia passione un&apos;identit&agrave;, il sudore un metodo, il palco una casa.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                "Primo Classic Physique Pro pi\u00f9 giovane d\u2019Italia \u2014 23 anni, 2021",
                "2\u00d7 qualificato al Mr. Olympia \u2014 il palco pi\u00f9 grande del mondo",
                "Top 3 Arnold Classic Ohio 2026",
                "Nominato World Best Poser 2026",
                "Personal Trainer certificato FIF & AICS",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-white-warm">
                  <span className="h-2 w-2 rounded-full bg-gold flex-shrink-0 mt-1.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/coaching" className="btn-gold mt-10 inline-block">
              SCOPRI IL COACHING
            </Link>
          </div>
        </div>
      </section>

      {/* --- STATS --- */}
      <section className="py-20 px-6 bg-black-card border-y border-gold/10">
        <div className="mx-auto max-w-7xl">
          <StatsCounter stats={stats} />
        </div>
      </section>

      {/* --- COACHING --- */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-7xl text-center">
          <span className="section-label">COACHING</span>
          <h2 className="section-title mt-2">
            Scegli il tuo <span className="text-gold-gradient">Percorso.</span>
          </h2>
          <p className="mt-6 text-gray-muted max-w-2xl mx-auto text-lg">
            Programmi costruiti su di te. Non schede generiche. Non metodi copiati. Il tuo corpo, il tuo ritmo, il tuo palco.
          </p>

          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {coachingFeatures.map((f) => (
              <div key={f.title} className="card p-8 text-center">
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

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold mt-12 inline-block text-lg px-10 py-4"
          >
            CONTATTAMI PER INFO
          </a>
        </div>
      </section>

      {/* --- POSING --- */}
      <section className="relative py-24 px-6 overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/palestra-bw.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 z-[1] bg-black-deep/80" />

        <div className="relative z-10 mx-auto max-w-7xl text-center">
          <span className="section-label">POSING</span>
          <h2 className="section-title mt-2">
            Il posing <span className="text-gold-gradient">Decide.</span>
          </h2>
          <p className="mt-6 text-gray-muted max-w-2xl mx-auto text-lg">
            Non &egrave; naturale. Si allena, si impara, si perfeziona. Impara dall&apos;atleta riconosciuto World Best Poser 2026.
          </p>

          <div className="mt-16 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="card p-8 text-center">
              <div className="text-gold text-4xl mb-4">&#9654;</div>
              <h3 className="font-heading text-xl tracking-wider text-white-warm">
                Sessione Online 1-to-1
              </h3>
              <div className="mt-4 mb-4">
                <span className="font-heading text-4xl text-gold-gradient">87</span>
                <span className="text-gray-muted text-lg ml-1">EUR / sessione</span>
              </div>
              <p className="text-gray-muted text-sm">
                Correzione posing via videochiamata con Andrea. Analisi dettagliata e consigli personalizzati in tempo reale.
              </p>
              <a
                href={WHATSAPP_POSING}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost mt-6 inline-block text-sm"
              >
                PRENOTA ORA
              </a>
            </div>
            <div className="card p-8 text-center">
              <div className="text-gold text-4xl mb-4">&#9733;</div>
              <h3 className="font-heading text-xl tracking-wider text-white-warm">
                Sessione dal Vivo 1-to-1
              </h3>
              <div className="mt-4 mb-4">
                <span className="font-heading text-4xl text-gold-gradient">87</span>
                <span className="text-gray-muted text-lg ml-1">EUR / sessione</span>
              </div>
              <p className="text-gray-muted text-sm">
                Correzione in presenza con Andrea. Sessioni dal vivo con feedback immediato e preparazione palco dedicata.
              </p>
              <a
                href={WHATSAPP_POSING}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold mt-6 inline-block text-sm"
              >
                PRENOTA ORA
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- PHOTO GALLERY --- */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <span className="section-label">GALLERY</span>
            <h2 className="section-title mt-2">
              Momenti <span className="text-gold-gradient">sul Palco</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { src: "/arnold-classic.jpg", label: "Arnold Classic Ohio 2026" },
              { src: "/posing-outdoor.jpg", label: "Classic Physique Posing" },
              { src: "/palestra-bw.jpg", label: "Il metodo quotidiano" },
            ].map((photo) => (
              <div
                key={photo.src}
                className="group relative aspect-[3/4] rounded-xl overflow-hidden border border-gold/10 cursor-pointer"
              >
                <img
                  src={photo.src}
                  alt={photo.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black-deep/80 via-transparent to-transparent" />
                <p className="absolute bottom-4 left-4 right-4 font-heading text-sm tracking-wider text-white-warm">
                  {photo.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- ACCEDI AL CORSO --- */}
      <section className="py-20 px-6 bg-black-card border-y border-gold/10">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-label">AREA STUDENTI</span>
          <h2 className="section-title mt-2">
            Hai gi&agrave; acquistato? <span className="text-gold-gradient">Accedi ora.</span>
          </h2>
          <p className="mt-6 text-gray-muted text-lg max-w-xl mx-auto">
            Entra nella tua area personale per seguire il video corso, monitorare i tuoi progressi e accedere ai contenuti esclusivi.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard" className="btn-gold text-base px-8 py-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="inline-block mr-2">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
              ACCEDI ALLA DASHBOARD
            </Link>
            <Link href="/login" className="btn-ghost text-base px-8 py-4">
              LOGIN / REGISTRATI
            </Link>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="py-24 px-6 bg-black-card border-y border-gold/10">
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

      {/* --- FAQ --- */}
      <section className="py-24 px-6">
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

      {/* --- FINAL CTA --- */}
      <section className="py-24 px-6 bg-gradient-to-br from-gold-dark via-gold to-gold-light">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-5xl md:text-7xl tracking-wider text-black-deep">
            Il palco ti aspetta.
          </h2>
          <p className="mt-4 font-heading text-xl md:text-2xl tracking-widest text-black-deep/70">
            Ogni settimana senza metodo &egrave; una settimana di potenziale non espresso.
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
              href="/coaching"
              className="inline-block border-2 border-black-deep text-black-deep font-heading text-lg tracking-widest px-10 py-4 rounded-lg hover:bg-black-deep/10 transition-colors"
            >
              SCOPRI IL COACHING
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
