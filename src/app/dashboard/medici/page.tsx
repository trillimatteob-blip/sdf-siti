"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Star, MapPin, MessageSquare, Search } from "lucide-react";

interface Doctor { id: string; name: string; specialization: string; style: string; passions: string; price: number; availability: string; rating: number; reviews_count: number; }

export default function MediciPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Doctor | null>(null);

  useEffect(() => {
    fetch("/api/health/doctors")
      .then(r => r.json())
      .then(d => { setDoctors(d.data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = doctors
    .filter(d => filter === "all" || d.style === filter)
    .filter(d => !search || d.name.toLowerCase().includes(search.toLowerCase()) || d.specialization.toLowerCase().includes(search.toLowerCase()));

  const styleLabels: Record<string, string> = { direct: "Diretto", analytical: "Analitico", empathetic: "Empatico" };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Medici</h1>
        <p className="text-sm text-[var(--color-muted-foreground)]">Trova lo specialista più adatto a te.</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-muted-foreground)]" />
          <input
            type="text"
            placeholder="Cerca per nome o specializzazione..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="h-10 w-full rounded-md border border-[var(--color-border)] bg-[var(--color-background)] pl-9 pr-3 text-sm text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-ring)]"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {["all","direct","analytical","empathetic"].map(f => (
            <Badge key={f} variant={filter === f ? "default" : "outline"} className="cursor-pointer" onClick={() => setFilter(f)}>
              {f === "all" ? "Tutti" : styleLabels[f]}
            </Badge>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}><CardContent className="space-y-4 pt-6">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full" />
            </CardContent></Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map(doc => (
            <Card key={doc.id} className="cursor-pointer transition-colors hover:bg-[var(--color-secondary)]" onClick={() => setSelected(doc)}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-[var(--color-foreground)]">{doc.name}</h3>
                    <p className="text-sm text-[var(--color-muted-foreground)]">{doc.specialization}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-[var(--color-primary)] text-[var(--color-primary)]" />
                      <span className="font-bold text-[var(--color-foreground)]">{doc.rating}</span>
                    </div>
                    <p className="text-xs text-[var(--color-muted-foreground)]">{doc.reviews_count} recensioni</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="secondary">{styleLabels[doc.style]}</Badge>
                  {doc.passions.split(",").map(p => <Badge key={p} variant="outline">{p.trim()}</Badge>)}
                </div>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-[var(--color-muted-foreground)]"><MapPin className="mr-1 inline h-3 w-3" />{doc.availability}</span>
                  <span className="font-bold text-[var(--color-primary)]">€{doc.price}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent>
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>Prenota con {selected.name}</DialogTitle>
                <DialogDescription>{selected.specialization} • {styleLabels[selected.style]}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 pt-2">
                <p className="text-sm text-[var(--color-muted-foreground)]">
                  Per te che sei <strong className="text-[var(--color-foreground)]">
                    {selected.style === "direct" ? "veloce e sbrigativo" : selected.style === "analytical" ? "metodico e preciso" : "cercasi un ascolto attento"}
                  </strong>, questo medico è <strong className="text-[var(--color-foreground)]">
                    {selected.style === "direct" ? "veloce e sbrigativo" : selected.style === "analytical" ? "analitico e dettagliato" : "empatico e comprensivo"}
                  </strong>.
                </p>
                <div className="flex items-center gap-2 text-sm text-[var(--color-muted-foreground)]">
                  <MapPin className="h-4 w-4" />{selected.availability}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Star className="h-4 w-4 fill-[var(--color-primary)] text-[var(--color-primary)]" />
                  <span className="font-medium text-[var(--color-foreground)]">{selected.rating}</span>
                  <span className="text-[var(--color-muted-foreground)]">({selected.reviews_count} recensioni)</span>
                </div>
                <div className="flex gap-3 pt-2">
                  <Button>Prenota visita</Button>
                  <Button variant="outline"><MessageSquare className="mr-2 h-4 w-4" />Contatta</Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
