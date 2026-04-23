import { DataForm } from "@/components/dashboard/data-form";

export default function SalutePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">I miei dati</h1>
        <p className="text-sm text-[var(--color-muted-foreground)]">
          Inserisci i tuoi parametri quotidiani. Tutti i dati sono salvati in locale.
        </p>
      </div>
      <DataForm />
    </div>
  );
}
