"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarIcon, Plus, Bell, Inbox } from "lucide-react";

interface ReminderItem { id: string; title: string; date: string; type: string; status: string; }
const typeLabels: Record<string, string> = { exam: "Esame", appointment: "Visita", medication: "Farmaco", workout: "Allenamento", meal: "Pasto", custom: "Altro" };
const typeColors: Record<string, string> = { exam: "bg-blue-500", appointment: "bg-green-500", medication: "bg-purple-500", workout: "bg-orange-500", meal: "bg-yellow-500", custom: "bg-gray-500" };

export default function CalendarioPage() {
  const [reminders, setReminders] = useState<ReminderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newType, setNewType] = useState("custom");

  useEffect(() => {
    fetch("/api/health/reminders")
      .then(r => r.json())
      .then(d => { setReminders(d.data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  function addReminder() {
    if (!newTitle || !newDate) return;
    fetch("/api/health/reminders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle, due_date: newDate, type: newType })
    })
      .then(r => r.json())
      .then(() => {
        setNewTitle(""); setNewDate(""); setShowForm(false);
        setLoading(true);
        fetch("/api/health/reminders").then(r => r.json()).then(d => { setReminders(d.data || []); setLoading(false); });
      });
  }

  const sorted = [...reminders].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Calendario</h1>
          <p className="text-sm text-[var(--color-muted-foreground)]">Scadenze, appuntamenti e reminder.</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}><Plus className="mr-2 h-4 w-4" />Nuovo reminder</Button>
      </div>
      {showForm && (
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-4 sm:grid-cols-4">
              <div className="sm:col-span-2"><Label>Titolo</Label><Input value={newTitle} onChange={e => setNewTitle(e.target.value)} /></div>
              <div><Label>Data</Label><Input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} /></div>
              <div><Label>Tipo</Label>
                <Select value={newType} onChange={e => setNewType(e.target.value)}>
                  {Object.entries(typeLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </Select>
              </div>
            </div>
            <Button onClick={addReminder} className="mt-4">Aggiungi</Button>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}><CardContent className="py-4"><Skeleton className="h-12 w-full" /></CardContent></Card>
          ))}
        </div>
      ) : sorted.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Inbox className="h-10 w-10 text-[var(--color-muted-foreground)] mb-3" />
            <p className="text-sm text-[var(--color-muted-foreground)]">Nessun reminder. Clicca "Nuovo reminder" per aggiungerne uno.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {sorted.map(r => {
            const daysLeft = Math.ceil((new Date(r.date).getTime() - new Date().getTime()) / (1000*60*60*24));
            return (
              <Card key={r.id} className={r.status === "completed" ? "opacity-50" : ""}>
                <CardContent className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-4">
                    <div className={`h-3 w-3 rounded-full ${typeColors[r.type] || "bg-gray-500"}`} />
                    <div>
                      <p className="font-medium">{r.title}</p>
                      <div className="flex items-center gap-2 text-xs text-[var(--color-muted-foreground)]">
                        <CalendarIcon className="h-3 w-3" />{r.date}
                        {daysLeft <= 3 && daysLeft >= 0 && (
                          <Badge variant="destructive" className="text-[10px]">
                            <Bell className="mr-1 h-3 w-3" />{daysLeft === 0 ? "Oggi" : `Tra ${daysLeft}g`}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline">{typeLabels[r.type] || r.type}</Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
