export const metadata = {
  title: "Chi Sono — Andrea Mammoli",
  description: "IFBB Pro | 2x OLYMPIAN | WORLD BEST POSER 2026",
};

export default function ChiSonoPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight">Chi Sono</h1>
      <p className="mt-4 text-lg text-neutral-500">
        Sono Andrea Mammoli. Ho reso la mia passione unidentita, il sudore un metodo,
        il palco una casa.
      </p>
      <ul className="mt-8 list-disc space-y-2 pl-5 text-neutral-700">
        <li>Primo Classic Physique Pro piu giovane dItalia — 23 anni, 2021</li>
        <li>2x qualificato al Mr. Olympia</li>
        <li>Top 3 Arnold Classic Ohio 2026</li>
        <li>Nominato World Best Poser 2026</li>
        <li>Personal Trainer certificato FIF & AICS</li>
      </ul>
    </main>
  );
}
