"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Mic, Send, Volume2, VolumeX, Dumbbell } from "lucide-react";

interface Message { id: string; role: "user" | "agent"; text: string; timestamp: Date; }

export default function AgentePage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "w", role: "agent", text: "LIGHT WEIGHT! Sono l'Agente di Ferro. Qui per tenerti a posto. Dammi i tuoi dati e ti dico dove devi migliorare. Non accetto scuse!", timestamp: new Date() },
  ]);
  const [input, setInput] = useState("");
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => { scrollRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  async function sendMessage(text: string) {
    const userMsg: Message = { id: Date.now().toString(), role: "user", text, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]); setInput("");
    setTimeout(() => {
      const responses = [
        "LIGHT WEIGHT! I numeri non mentono. Continua a monitorare.",
        "Ehi! Hai fatto i passi oggi? Non vedo attività!",
        "Quella glicemia è alta. Controlla l'alimentazione. ZERO SCUSE.",
        "Ottimo lavoro sul sonno. Ma puoi fare di meglio. SEMPRE.",
        "Non dimenticare: esame tra 3 giorni. Preparati.",
      ];
      const agentMsg: Message = { id: (Date.now()+1).toString(), role: "agent", text: responses[Math.floor(Math.random()*responses.length)], timestamp: new Date() };
      setMessages(prev => [...prev, agentMsg]);
      if (voiceEnabled) { const u = new SpeechSynthesisUtterance(agentMsg.text); u.lang = "it-IT"; u.rate = 1.1; window.speechSynthesis.speak(u); }
    }, 800);
  }

  function toggleListening() {
    if (!("webkitSpeechRecognition" in window)) return;
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = "it-IT"; recognition.onstart = () => setIsListening(true); recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => sendMessage(event.results[0][0].transcript);
    recognition.start();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Agente di Ferro</h1>
          <p className="text-sm text-neutral-500">Il tuo coach virtuale. Non accetta scuse.</p>
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
                    <div className={`max-w-[80%] rounded-lg px-4 py-2 ${msg.role === "user" ? "bg-[#c8a951] text-[#050507]" : "bg-neutral-800 text-white"}`}>
                      <p className="text-sm">{msg.text}</p>
                      <span className="mt-1 block text-[10px] opacity-50">{msg.timestamp.toLocaleTimeString()}</span>
                    </div>
                  </div>
                ))}
                <div ref={scrollRef} />
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="icon" onClick={toggleListening} className={isListening ? "animate-pulse border-[#c8a951]" : ""}><Mic className="h-4 w-4" /></Button>
                <Input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && input && sendMessage(input)} placeholder="Scrivi all'Agente..." className="flex-1" />
                <Button onClick={() => input && sendMessage(input)} size="icon"><Send className="h-4 w-4" /></Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="space-y-4">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-neutral-800 text-4xl"><Dumbbell className="h-12 w-12 text-[#c8a951]" /></div>
              <h3 className="mt-4 text-lg font-bold">Agente di Ferro</h3>
              <p className="text-sm text-neutral-500">Online — pronto a spingerti</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Stato proattivo</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <Badge variant="destructive" className="w-full justify-center">Esame sangue tra 3 giorni</Badge>
              <Badge variant="secondary" className="w-full justify-center">Glicemia alta da 2 giorni</Badge>
              <Badge variant="outline" className="w-full justify-center">Obiettivo passi: 8.000/10.000</Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
