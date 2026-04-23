"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

interface HealthEntry {
  date: string;
  weight?: number;
  fasting_glucose?: number;
  systolic_bp?: number;
  resting_hr?: number;
  sleep_hours?: number;
  steps?: number;
}

export default function GraficiPage() {
  const [entries, setEntries] = useState<HealthEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<"1m" | "3m" | "6m" | "1y" | "all">("all");
  const [overlay, setOverlay] = useState<string[]>(["weight"]);

  useEffect(() => {
    fetch("/api/health/data")
      .then(r => r.json())
      .then(d => { setEntries((d.data || []).reverse()); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = entries.filter(e => {
    if (period === "all") return true;
    const days = { "1m": 30, "3m": 90, "6m": 180, "1y": 365 }[period];
    const d = new Date(); d.setDate(d.getDate() - (days || 0));
    return new Date(e.date) >= d;
  });

  const configs = [
    { key: "weight", label: "Peso (kg)", color: "#c8a951", min: 50, max: 150 },
    { key: "fasting_glucose", label: "Glicemia digiuno (mg/dL)", color: "#ef4444", min: 70, max: 126 },
    { key: "systolic_bp", label: "Pressione sistolica (mmHg)", color: "#3b82f6", min: 90, max: 140 },
    { key: "resting_hr", label: "FC riposo (bpm)", color: "#10b981", min: 50, max: 100 },
    { key: "sleep_hours", label: "Ore sonno", color: "#8b5cf6", min: 5, max: 10 },
    { key: "steps", label: "Passi", color: "#f59e0b", min: 0, max: 20000 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Grafici</h1>
        <p className="text-sm text-[var(--color-muted-foreground)]">Andamento parametri nel tempo.</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {(["1m","3m","6m","1y","all"] as const).map(p => (
          <Badge key={p} variant={period === p ? "default" : "outline"} className="cursor-pointer" onClick={() => setPeriod(p)}>
            {p === "1m" ? "1 mese" : p === "3m" ? "3 mesi" : p === "6m" ? "6 mesi" : p === "1y" ? "1 anno" : "Tutto"}
          </Badge>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {configs.map(c => (
          <Badge key={c.key} variant={overlay.includes(c.key) ? "default" : "outline"} className="cursor-pointer" onClick={() => setOverlay(prev => prev.includes(c.key) ? prev.filter(k => k !== c.key) : [...prev, c.key])}>
            {c.label}
          </Badge>
        ))}
      </div>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardHeader><Skeleton className="h-5 w-48" /></CardHeader>
              <CardContent><Skeleton className="h-[300px] w-full" /></CardContent>
            </Card>
          ))}
        </div>
      ) : overlay.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-sm text-[var(--color-muted-foreground)]">Seleziona almeno un parametro da visualizzare.</p>
          </CardContent>
        </Card>
      ) : (
        overlay.map(key => {
          const cfg = configs.find(c => c.key === key);
          if (!cfg) return null;
          return (
            <Card key={key}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full" style={{ background: cfg.color }} />
                  {cfg.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={filtered}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="date" stroke="var(--color-muted-foreground)" fontSize={12} />
                    <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                    <Tooltip contentStyle={{ background: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: '8px', color: 'var(--color-foreground)' }} />
                    <ReferenceLine y={cfg.min} stroke="#ef4444" strokeDasharray="3 3" />
                    <ReferenceLine y={cfg.max} stroke="#ef4444" strokeDasharray="3 3" />
                    <Line type="monotone" dataKey={key} stroke={cfg.color} strokeWidth={2} dot={{ r: 4, fill: cfg.color }} connectNulls />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          );
        })
      )}
    </div>
  );
}
