export const metadata = {
  title: "Chi Sono — Andrea Mammoli",
  description: "IFBB Pro | 2× OLYMPIAN | WORLD BEST POSER 2026",
};

export default function ChiSonoPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16" style={{ color: '#f2ede4' }}>
      <h1 className="text-4xl font-bold tracking-tight" style={{ color: '#c8a951' }}>Chi Sono</h1>
      <p className="mt-4 text-lg" style={{ color: 'rgba(242,237,228,0.5)' }}>
        Sono Andrea Mammoli. Ho reso la mia passione un identita, il sudore un metodo, il palco una casa.
      </p>
      <ul className="mt-8 list-disc space-y-2 pl-5" style={{ color: 'rgba(242,237,228,0.7)' }}>
        <li>Primo Classic Physique Pro piu giovane dItalia — 23 anni, 2021</li>
        <li>2× qualificato al Mr. Olympia</li>
        <li>Top 3 Arnold Classic Ohio 2026</li>
        <li>Nominato World Best Poser 2026</li>
        <li>Personal Trainer certificato FIF & AICS</li>
      </ul>
    </main>
  );
}
