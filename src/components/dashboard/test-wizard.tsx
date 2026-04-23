"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Dumbbell, Shield, AlertTriangle, Target, Heart, Zap, Trophy } from "lucide-react";

interface WizardData {
  // Step 1
  nome?: string; cognome?: string; dataNascita?: string; sesso?: string; altezza?: number; peso?: number;
  // Step 2
  allenamentiSettimana?: number; tipoAllenamento?: string; lavoroSedentario?: boolean; oreSonno?: number;
  // Step 3
  obiettivo?: string; timeline?: string; esamiSangue?: boolean;
  // Step 4
  stanchezza?: boolean; problemiSonno?: boolean; fluttuazioniPeso?: boolean; problemiLibido?: boolean; doloriArticolari?: boolean;
  // Step 5
  dietaSpecifica?: string; pastiGiorno?: number; alcol?: string; integratori?: string;
  // Step 6
  patologie?: string; farmaci?: string; allergie?: string; familiarita?: string;
  // Step 7
  stileComunicazione?: string; preferenzaMedico?: string; budget?: string;
}

const steps = [
  "Dati Anagrafici",
  "Stile di Vita",
  "Obiettivi",
  "Pain Points",
  "Alimentazione",
  "Storia Medica",
  "Preferenze",
  "Risultati",
];

export function TestWizard() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<WizardData>({});
  const [result, setResult] = useState<{ score: number; archetipo: string; pannello: string; icon: any } | null>(null);

  function update<K extends keyof WizardData>(key: K, value: WizardData[K]) {
    setData(prev => ({ ...prev, [key]: value }));
  }

  function calculateScore() {
    let score = 50;
    // Stile di vita (+20)
    if (data.allenamentiSettimana && data.allenamentiSettimana >= 3) score += 10;
    if (data.oreSonno && data.oreSonno >= 7) score += 5;
    if (!data.lavoroSedentario) score += 5;
    // Pain points (-25 max)
    if (data.stanchezza) score -= 8;
    if (data.problemiSonno) score -= 6;
    if (data.fluttuazioniPeso) score -= 5;
    if (data.problemiLibido) score -= 4;
    if (data.doloriArticolari) score -= 2;
    // Alimentazione (+15)
    if (data.pastiGiorno && data.pastiGiorno >= 3) score += 5;
    if (data.dietaSpecifica && data.dietaSpecifica !== "nessuna") score += 5;
    if (data.alcol === "mai" || data.alcol === "raramente") score += 5;
    // Storia medica (+20)
    if (!data.patologie || data.patologie === "nessuna") score += 10;
    if (data.esamiSangue) score += 10;
    // Obiettivi (+20)
    if (data.obiettivo) score += 10;
    if (data.timeline && data.timeline !== "non so") score += 10;

    score = Math.max(0, Math.min(100, score));

    let archetipo = "IL KAMIKAZE";
    let pannello = "Basic";
    let icon = AlertTriangle;
    if (score >= 85) { archetipo = "SALUTE DI FERRO"; pannello = "Elite"; icon = Trophy; }
    else if (score >= 70) { archetipo = "ATLETA CONSAPEVOLE"; pannello = "Advanced"; icon = Target; }
    else if (score >= 50) { archetipo = "SEMI-PRO"; pannello = "Advanced"; icon = Zap; }
    else if (score >= 30) { archetipo = "SPERICOLATO"; pannello = "Basic"; icon = Shield; }

    setResult({ score, archetipo, pannello, icon });
  }

  function next() {
    if (step === 6) { calculateScore(); }
    setStep(s => Math.min(s + 1, 7));
  }

  function prev() { setStep(s => Math.max(s - 1, 0)); }

  const isStepValid = () => {
    if (step === 0) return data.nome && data.cognome && data.dataNascita && data.sesso && data.altezza && data.peso;
    if (step === 1) return data.allenamentiSettimana !== undefined && data.tipoAllenamento && data.oreSonno !== undefined;
    if (step === 2) return data.obiettivo && data.timeline !== undefined;
    return true;
  };

  const radio = (label: string, options: string[], value?: string, onChange?: (v: string) => void) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex flex-wrap gap-2">
        {options.map(opt => (
          <Button key={opt} type="button" variant={value === opt ? "default" : "outline"} size="sm" onClick={() => onChange?.(opt)}>{opt}</Button>
        ))}
      </div>
    </div>
  );

  const numberInput = (label: string, value?: number, onChange?: (v: number) => void) => (
    <div><Label>{label}</Label><Input type="number" value={value ?? ""} onChange={e => onChange?.(parseFloat(e.target.value))} /></div>
  );

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Test di Ferro</h2>
        <span className="text-sm text-neutral-500">Step {step + 1} di {steps.length}</span>
      </div>
      <Progress value={((step + 1) / steps.length) * 100} className="h-2" />

      {step === 0 && (
        <Card>
          <CardHeader><CardTitle>{steps[0]}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Nome</Label><Input value={data.nome ?? ""} onChange={e => update("nome", e.target.value)} /></div>
              <div><Label>Cognome</Label><Input value={data.cognome ?? ""} onChange={e => update("cognome", e.target.value)} /></div>
            </div>
            <div><Label>Data di nascita</Label><Input type="date" value={data.dataNascita ?? ""} onChange={e => update("dataNascita", e.target.value)} /></div>
            {radio("Sesso", ["M", "F"], data.sesso, v => update("sesso", v))}
            <div className="grid grid-cols-2 gap-3">
              {numberInput("Altezza (cm)", data.altezza, v => update("altezza", v))}
              {numberInput("Peso (kg)", data.peso, v => update("peso", v))}
            </div>
          </CardContent>
        </Card>
      )}

      {step === 1 && (
        <Card>
          <CardHeader><CardTitle>{steps[1]}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {numberInput("Allenamenti/settimana", data.allenamentiSettimana, v => update("allenamentiSettimana", v))}
            {radio("Tipo allenamento", ["Pesi", "Cardio", "Misto", "Sport"], data.tipoAllenamento, v => update("tipoAllenamento", v))}
            {radio("Lavoro sedentario?", ["Sì", "No"], data.lavoroSedentario === undefined ? undefined : data.lavoroSedentario ? "Sì" : "No", v => update("lavoroSedentario", v === "Sì"))}
            {numberInput("Ore sonno medie", data.oreSonno, v => update("oreSonno", v))}
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader><CardTitle>{steps[2]}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {radio("Obiettivo principale", ["Massa", "Definizione", "Salute", "Performance"], data.obiettivo, v => update("obiettivo", v))}
            {radio("Timeline", ["3 mesi", "6 mesi", "1 anno", "Non so"], data.timeline, v => update("timeline", v))}
            {radio("Esami sangue ultimo anno?", ["Sì", "No"], data.esamiSangue === undefined ? undefined : data.esamiSangue ? "Sì" : "No", v => update("esamiSangue", v === "Sì"))}
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader><CardTitle>{steps[3]}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {[
              { key: "stanchezza" as const, label: "Stanchezza cronica?" },
              { key: "problemiSonno" as const, label: "Problemi di sonno?" },
              { key: "fluttuazioniPeso" as const, label: "Fluttuazioni peso inspiegabili?" },
              { key: "problemiLibido" as const, label: "Problemi di libido?" },
              { key: "doloriArticolari" as const, label: "Dolori articolari?" },
            ].map(({ key, label }) => (
              <div key={key}>
                {radio(label, ["Sì", "No"], data[key] === undefined ? undefined : data[key] ? "Sì" : "No", v => update(key, v === "Sì"))}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {step === 4 && (
        <Card>
          <CardHeader><CardTitle>{steps[4]}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {radio("Segui una dieta specifica?", ["Nessuna", "Ipercalorica", "Ipocalorica", "Keto", "Vegetariana", "Altro"], data.dietaSpecifica, v => update("dietaSpecifica", v))}
            {numberInput("Pasti al giorno", data.pastiGiorno, v => update("pastiGiorno", v))}
            {radio("Consumi alcol?", ["Mai", "Raramente", "Settimanale", "Quotidiano"], data.alcol, v => update("alcol", v))}
            <div><Label>Integratori</Label><Input placeholder="es. Whey, Creatina, Vitamina D" value={data.integratori ?? ""} onChange={e => update("integratori", e.target.value)} /></div>
          </CardContent>
        </Card>
      )}

      {step === 5 && (
        <Card>
          <CardHeader><CardTitle>{steps[5]}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label>Patologie note</Label><Input placeholder="Nessuna / ..." value={data.patologie ?? ""} onChange={e => update("patologie", e.target.value)} /></div>
            <div><Label>Farmaci in corso</Label><Input placeholder="Nessuno / ..." value={data.farmaci ?? ""} onChange={e => update("farmaci", e.target.value)} /></div>
            <div><Label>Allergie</Label><Input placeholder="Nessuna / ..." value={data.allergie ?? ""} onChange={e => update("allergie", e.target.value)} /></div>
            {radio("Familiarità (cuore, diabete, tumori)", ["Nessuna", "Cuore", "Diabete", "Tumori", "Multiple"], data.familiarita, v => update("familiarita", v))}
          </CardContent>
        </Card>
      )}

      {step === 6 && (
        <Card>
          <CardHeader><CardTitle>{steps[6]}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {radio("Stile comunicazione preferito", ["Diretto", "Analitico", "Empatico"], data.stileComunicazione, v => update("stileComunicazione", v))}
            {radio("Preferenza medico", ["Uomo", "Donna", "Indifferente"], data.preferenzaMedico, v => update("preferenzaMedico", v))}
            {radio("Budget disponibile", ["< 200€/mese", "200-500€/mese", "> 500€/mese"], data.budget, v => update("budget", v))}
          </CardContent>
        </Card>
      )}

      {step === 7 && result && (
        <Card className="border-[#c8a951]">
          <CardHeader className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#c8a951]/10">
              <result.icon className="h-10 w-10 text-[#c8a951]" />
            </div>
            <CardTitle className="mt-4 text-2xl">{result.archetipo}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <div>
              <div className="text-6xl font-bold text-[#c8a951]">{result.score}</div>
              <p className="text-sm text-neutral-500">Ferro Score iniziale</p>
            </div>
            <Badge variant="default" className="text-lg px-4 py-2">Pannello consigliato: {result.pannello}</Badge>
            <div className="rounded-lg bg-neutral-900 p-4 text-left text-sm space-y-2">
              <p><strong>Prossimi passi:</strong></p>
              <ul className="list-disc pl-5 space-y-1 text-neutral-400">
                <li>Inizia a inserire i dati giornalieri nella sezione <strong>Salute</strong></li>
                <li>Prenota il tuo primo pannello di analisi</li>
                <li>Consulta la sezione <strong>Medici</strong> per trovare lo specialista adatto</li>
                <li>L'Agente di Ferro ti aiuterà a monitorare i progressi</li>
              </ul>
            </div>
            <Button className="w-full" onClick={() => window.location.href = "/dashboard/salute"}>
              <Dumbbell className="mr-2 h-4 w-4" />
              Inizia il percorso
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between">
        <Button variant="outline" onClick={prev} disabled={step === 0}><ChevronLeft className="mr-2 h-4 w-4" />Indietro</Button>
        {step < 7 && <Button onClick={next} disabled={!isStepValid()}>Avanti<ChevronRight className="ml-2 h-4 w-4" /></Button>}
      </div>
    </div>
  );
}
