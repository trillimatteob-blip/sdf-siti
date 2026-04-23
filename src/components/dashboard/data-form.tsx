"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

export function DataForm({ onSuccess }: { onSuccess?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("body");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const form = new FormData(e.currentTarget);
    const data: Record<string, unknown> = { date: new Date().toISOString().split("T")[0] };

    form.forEach((value, key) => {
      if (value && key !== "date") {
        const num = parseFloat(value as string);
        data[key] = isNaN(num) ? value : num;
      }
    });

    try {
      const res = await fetch("/api/health/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setMessage("Dati salvati con successo!");
        e.currentTarget.reset();
        onSuccess?.();
      } else {
        setMessage("Errore nel salvataggio.");
      }
    } catch {
      setMessage("Errore di connessione.");
    } finally {
      setLoading(false);
    }
  }

  const fieldClass = "grid grid-cols-1 gap-3 sm:grid-cols-2";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inserisci dati giornalieri</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Tabs defaultValue="body" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full flex-wrap h-auto">
              <TabsTrigger value="body">Corporei</TabsTrigger>
              <TabsTrigger value="circ">Circonferenze</TabsTrigger>
              <TabsTrigger value="cardio">Cardio</TabsTrigger>
              <TabsTrigger value="meta">Metabolica</TabsTrigger>
              <TabsTrigger value="sleep">Sonno</TabsTrigger>
              <TabsTrigger value="activity">Attività</TabsTrigger>
            </TabsList>

            <TabsContent value="body">
              <div className={fieldClass}>
                <div><Label>Peso (kg)</Label><Input name="weight" type="number" step="0.1" /></div>
                <div><Label>Altezza (cm)</Label><Input name="height" type="number" /></div>
                <div><Label>Massa Grassa (%)</Label><Input name="body_fat" type="number" step="0.1" /></div>
                <div><Label>Massa Muscolare (kg)</Label><Input name="muscle_mass" type="number" step="0.1" /></div>
                <div><Label>BMI</Label><Input name="bmi" type="number" step="0.1" /></div>
                <div><Label>Acqua Corporea (%)</Label><Input name="body_water" type="number" step="0.1" /></div>
              </div>
            </TabsContent>

            <TabsContent value="circ">
              <div className={fieldClass}>
                <div><Label>Vita (cm)</Label><Input name="waist" type="number" step="0.1" /></div>
                <div><Label>Fianchi (cm)</Label><Input name="hips" type="number" step="0.1" /></div>
                <div><Label>Petto (cm)</Label><Input name="chest" type="number" step="0.1" /></div>
                <div><Label>Braccia (cm)</Label><Input name="arms" type="number" step="0.1" /></div>
                <div><Label>Coscia (cm)</Label><Input name="thigh" type="number" step="0.1" /></div>
                <div><Label>Polpacci (cm)</Label><Input name="calves" type="number" step="0.1" /></div>
              </div>
            </TabsContent>

            <TabsContent value="cardio">
              <div className={fieldClass}>
                <div><Label>Pressione Sistolica</Label><Input name="systolic_bp" type="number" /></div>
                <div><Label>Pressione Diastolica</Label><Input name="diastolic_bp" type="number" /></div>
                <div><Label>FC a riposo (bpm)</Label><Input name="resting_hr" type="number" /></div>
                <div><Label>Saturazione O₂ (%)</Label><Input name="oxygen_saturation" type="number" /></div>
                <div><Label>HRV (ms)</Label><Input name="hrv" type="number" /></div>
              </div>
            </TabsContent>

            <TabsContent value="meta">
              <div className={fieldClass}>
                <div><Label>Glicemia digiuno (mg/dL)</Label><Input name="fasting_glucose" type="number" /></div>
                <div><Label>Glicemia post-pasto (mg/dL)</Label><Input name="post_meal_glucose" type="number" /></div>
                <div><Label>Chetoni (mmol/L)</Label><Input name="ketones" type="number" step="0.1" /></div>
                <div><Label>Temperatura (°C)</Label><Input name="body_temp" type="number" step="0.1" /></div>
              </div>
            </TabsContent>

            <TabsContent value="sleep">
              <div className={fieldClass}>
                <div><Label>Ore di sonno</Label><Input name="sleep_hours" type="number" step="0.1" /></div>
                <div><Label>Qualità (1-10)</Label><Input name="sleep_quality" type="number" min="1" max="10" /></div>
                <div><Label>Addormentamento</Label><Input name="sleep_start" type="time" /></div>
                <div><Label>Risveglio</Label><Input name="sleep_end" type="time" /></div>
                <div><Label>Risvegli notturni</Label><Input name="night_awakenings" type="number" /></div>
              </div>
            </TabsContent>

            <TabsContent value="activity">
              <div className={fieldClass}>
                <div><Label>Passi</Label><Input name="steps" type="number" /></div>
                <div><Label>Calorie bruciate</Label><Input name="calories_burned" type="number" /></div>
                <div><Label>Minuti attività</Label><Input name="activity_minutes" type="number" /></div>
                <div><Label>Distanza (km)</Label><Input name="distance_km" type="number" step="0.1" /></div>
              </div>
            </TabsContent>
          </Tabs>

          <Separator />

          {message && (
            <p className={`text-sm ${message.includes("successo") ? "text-green-400" : "text-red-400"}`}>
              {message}
            </p>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Salvataggio..." : "Salva dati"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
