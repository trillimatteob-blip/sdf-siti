export const metadata = {
  title: "FAQ — Andrea Mammoli",
  description: "Domande frequenti su coaching, video corsi e posing.",
};

const faqs = [
  {
    q: "Come funziona il coaching online?",
    a: "Dopo il primo contatto valutiamo insieme il tuo livello e i tuoi obiettivi. Ricevi scheda di allenamento e piano alimentare personalizzati. Check-in settimanali via foto o video.",
  },
  {
    q: "Cosa include il pacchetto video lezioni di posing?",
    a: "Un ciclo completo di video lezioni sulle pose fondamentali del Classic Physique e del Mens Physique, con correzioni e consigli diretti da Andrea.",
  },
  {
    q: "Posso prenotare una sessione di posing dal vivo?",
    a: "Si. Le sessioni in presenza si organizzano in base alla disponibilita di Andrea. Scrivi su WhatsApp e troviamo insieme la data e la location piu adatta a te.",
  },
  {
    q: "Il coaching include la preparazione gara?",
    a: "Si, la preparazione gara puo essere inclusa nel percorso di coaching. Include scheda peak week, dieta pre-gara, posing dedicato e supporto diretto negli ultimi giorni prima del palco.",
  },
];

export default function FaqPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight">Domande Frequenti</h1>
      <div className="mt-10 space-y-8">
        {faqs.map((faq, i) => (
          <div key={i}>
            <h2 className="text-lg font-semibold">{faq.q}</h2>
            <p className="mt-2 text-neutral-600">{faq.a}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
