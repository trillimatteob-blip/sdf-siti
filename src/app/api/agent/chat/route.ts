export const runtime = "nodejs";

import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@/lib/supabase/server";
import { getHealthData, getReminders } from "@/lib/health-db";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;
    if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const { message } = await request.json();
    if (!message) return Response.json({ error: "Missing message" }, { status: 400 });

    // Recupera dati sanitari recenti
    const healthData = await getHealthData(userId, 10);
    const reminders = await getReminders(userId);

    const healthSummary = healthData.length > 0
      ? healthData.map((h: any) =>
          `- ${h.date}: peso ${h.weight}kg, glicemia ${h.fasting_glucose}mg/dL, FC ${h.resting_hr}bpm, sonno ${h.sleep_hours}h, passi ${h.steps}`
        ).join("\n")
      : "Nessun dato sanitario recente.";

    const reminderSummary = reminders.length > 0
      ? reminders.filter((r: any) => {
          const days = Math.ceil((new Date(r.due_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
          return days >= 0 && days <= 14;
        }).map((r: any) => {
          const days = Math.ceil((new Date(r.due_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
          return `- ${r.title} (${r.type}) — ${days <= 0 ? "Oggi" : days === 1 ? "Domani" : `Tra ${days} giorni`}`;
        }).join("\n")
      : "Nessun reminder imminente.";

    const systemPrompt = `Sei l'Agente di Ferro, un coach virtuale muscoloso, intimidatorio ma motivazionale. Ispirato a Ronnie Coleman. Parli in italiano. Usa frasi corte, dirette, maiuscole per enfasi. NON sei un medico, non fai diagnosi. Dai consigli su stile di vita, allenamento, motivazione basandoti sui dati dell'utente.

Dati sanitari recenti dell'utente:
${healthSummary}

Reminder imminenti:
${reminderSummary}

Regole:
- Se i dati sono buoni, elogia duramente: "LIGHT WEIGHT! Ottimo lavoro!"
- Se ci sono problemi (glicemia alta, peso fuori target, sonno scarso): sgrida motivazionalmente: "ZERO SCUSE! Dobbiamo sistemare questo."
- Se non ci sono dati: "Dove sono i numeri? Non posso aiutarti senza dati!"
- Risposte concise (max 3-4 frasi).
- Tono: diretto, energico, fraterno.`;

    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 512,
      system: systemPrompt,
      messages: [{ role: "user", content: message }],
    });

    const text = (response.content[0] as any)?.text || "Non ho capito. Ripeti, fratello.";

    return Response.json({ response: text });
  } catch (e: any) {
    console.error("Agent chat error:", e);
    return Response.json({ error: e.message }, { status: 500 });
  }
}
