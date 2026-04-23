"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FerroScoreData {
  overall: number;
  bodyComposition: number;
  cardiovascular: number;
  metabolic: number;
  sleep: number;
  activity: number;
}

function ScoreBar({ label, score }: { label: string; score: number }) {
  const color = score >= 80 ? "bg-green-500" : score >= 60 ? "bg-yellow-500" : score >= 40 ? "bg-orange-500" : "bg-red-500";
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-neutral-400">
        <span>{label}</span>
        <span className="font-medium">{score}/100</span>
      </div>
      <div className="h-2 w-full rounded-full bg-neutral-800">
        <div className={`h-2 rounded-full transition-all ${color}`} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}

export function FerroScoreCard({ score }: { score?: FerroScoreData }) {
  const defaultScore: FerroScoreData = score || {
    overall: 72, bodyComposition: 68, cardiovascular: 75, metabolic: 70, sleep: 65, activity: 82,
  };

  const status = defaultScore.overall >= 80 ? "DI FERRO" : defaultScore.overall >= 60 ? "Sulla strada" : "Da migliorare";
  const statusColor = defaultScore.overall >= 80 ? "default" : defaultScore.overall >= 60 ? "secondary" : "destructive";

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Ferro Score</CardTitle>
        <Badge variant={statusColor as any}>{status}</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-5xl font-bold text-[#c8a951]">{defaultScore.overall}</div>
          <p className="mt-1 text-sm text-neutral-500">Punteggio complessivo</p>
        </div>
        <ScoreBar label="Composizione Corporea" score={defaultScore.bodyComposition} />
        <ScoreBar label="Cardiovascolare" score={defaultScore.cardiovascular} />
        <ScoreBar label="Metabolico" score={defaultScore.metabolic} />
        <ScoreBar label="Sonno" score={defaultScore.sleep} />
        <ScoreBar label="Attività" score={defaultScore.activity} />
      </CardContent>
    </Card>
  );
}
