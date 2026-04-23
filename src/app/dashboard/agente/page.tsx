"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Mic, Send, Volume2, VolumeX, Dumbbell, AlertTriangle, Calendar, Activity } from "lucide-react";

interface Message { id: string; role: "user" | "agent"; text: string; timestamp: Date; }

interface ProactiveBadge {
  type: "warning" | "info" | "success";
  text: string;
  icon: React.ReactNode;
}

export default function AgentePage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "w", role: "agent", text: "LIGHT WEIGHT! Sono l'Agente di Ferro. Qui per tenerti a posto. Dammi i tuoi dati e ti dico dove devi migliorare. Non accetto scuse!", timestamp: new Date() },
  ]);
  const [input, setInput] = useState("");
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [badges, setBadges] = useState<ProactiveBadge[]>([]);
  const [badgesLoading, setBadgesLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { scrollRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  // Fetch dati proattivi reali
  useEffect(() => {
    async function fetchData() {
      try {
        const [healthRes, reminderRes] = await Promise.all([
          fetch("/api/health/data"),
          fetch("/api/health/reminders"),
        ]);
        const health = await healthRes.json();
        const reminders = await reminderRes.json();

        const newBadges: ProactiveBadge[] = [];

        // Analizza reminder imminenti
        const upcoming = (reminders.data || []).filter((r: any) => {
          const days = Math.ceil((new Date(r.due_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
          return days >= 0 && days <= 7;
        });

        upcoming.forEach((r: any) => {
          const days = Math.ceil((new Date(r.due_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
          newBadges.push({
            type: days <= 3 ? "warning" : "info",
            text: `${r.title} — ${days === 0 ? "Oggi" : days === 1 ? "Domani" : `Tra ${days} giorni`}`,
            icon: <Calendar className="h-3 w-3" />,
          });
        });

        // Analizza dati sanitari recenti
        const entries = health.data || [];
        if (entries.length > 0) {
          const latest = entries[0];
          if (latest.fasting_glucose && latest.fasting_glucose > 126) {
            newBadges.push({
              type: "warning",
              text: `Glicemia alta: ${latest.fasting_glucose} mg/dL`,
              icon: <AlertTriangle className="h-3 w-3" />,
            });
          }
          if (latest.resting_hr && latest.resting_hr > 100) {
            newBadges.push({
              type: "warning",
              text: `FC riposo elevata: ${latest.resting_hr} bpm`,
              icon: <Activity className="h-3 w-3" />,
            });
          }
          if (latest.steps && latest.steps < 5000) {
            newBadges.push({
              type: "info",
              text: `Passi sotto target: ${latest.steps}`,
              icon: <Activity className="h-3 w-3" />,
            });
          }
        }

        if (newBadges.length === 0) {
          newBadges.push({ type: "success", text: "Tutto sotto controllo. LIGHT WEIGHT!", icon: <Dumbbell className="h-3 w-3" /> });
        }

        setBadges(newBadges);
      } catch {
        setBadges([{ type: "info", text: "Carica i tuoi dati per vedere gli alert", icon: <Activity className="h-3 w-3" /> }]);
      } finally {
        setBadgesLoading(false);
      }
    }
    fetchData();
  }, []);

  async function sendMessage(text: string) {
    const userMsg: Message = { id: Date.now().toString(), role: "user", text, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/agent/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      const agentMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "agent",
        text: data.response || "Errore. Riprova, fratello.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, agentMsg]);
      if (voiceEnabled) {
        const u = new SpeechSynthesisUtterance(agentMsg.text);
        u.lang = "it-IT";
        u.rate = 1.1;
        window.speechSynthesis.speak(u);
      }
    } catch {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "agent",
        text: "Il server è down. Ma tu non hai scuse! Riprova più tardi.",
        timestamp: new Date(),
      }]);
    } finally {
      setLoading(false);
    }
  }

  function toggleListening() {
    if (!("webkitSpeechRecognition" in window)) return;
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = "it-IT";
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => sendMessage(event.results[0][0].transcript);
    recognition.start();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Agente di Ferro</h1>
          <p className="text-sm text-[var(--color-muted-foreground)]">Il tuo coach virtuale. Non accetta scuse.</p>
        </div>
        <Button variant="outline" size="icon" onClick={() => setVoiceEnabled(!voiceEnabled)}>
          {voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
        </Button>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Chat</CardTitle></CardHeader>
          <CardContent>
            <div className="flex h-[500px] flex-col">
              <div className="flex-1 space-y-4 overflow-y-auto pr-2">
                {messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] rounded-lg px-4 py-2 ${msg.role === "user" ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)]" : "bg-[var(--color-secondary)] text-[var(--color-foreground)]"}`}>
                      <p className="text-sm">{msg.text}</p>
                      <span className="mt-1 block text-[10px] opacity-50">{msg.timestamp.toLocaleTimeString()}</span>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg bg-[var(--color-secondary)] px-4 py-2">
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                )}
                <div ref={scrollRef} />
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="icon" onClick={toggleListening} className={isListening ? "animate-pulse border-[var(--color-primary)]" : ""}>
                  <Mic className="h-4 w-4" />
                </Button>
                <Input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && input && !loading && sendMessage(input)} placeholder="Scrivi all'Agente..." className="flex-1" disabled={loading} />
                <Button onClick={() => input && !loading && sendMessage(input)} size="icon" disabled={loading}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="space-y-4">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[var(--color-secondary)] text-4xl">
                <Dumbbell className="h-12 w-12 text-[var(--color-primary)]" />
              </div>
              <h3 className="mt-4 text-lg font-bold">Agente di Ferro</h3>
              <p className="text-sm text-[var(--color-muted-foreground)]">Online — pronto a spingerti</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Stato proattivo</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {badgesLoading ? (
                <>
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                </>
              ) : (
                badges.map((b, i) => (
                  <Badge
                    key={i}
                    variant={b.type === "warning" ? "destructive" : b.type === "success" ? "default" : "secondary"}
                    className="w-full justify-center gap-1"
                  >
                    {b.icon}{b.text}
                  </Badge>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
