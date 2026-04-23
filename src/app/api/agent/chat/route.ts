export const runtime = "nodejs";

import Anthropic from "@anthropic-ai/sdk";
import { localDb } from "@/lib/local-db";
import { createClient } from "@/lib/supabase/server";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;
    if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const { message } = await request.json();
    if (!message) return Response.json({ error: "Missing message" }, { status: 400 });

    // Recupera dati sanitari recenti (ultimi 30 giorni)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const healthData = localDb.prepare(`
      SELECT * FROM health_data WHERE user_id = ? AND date >= ? ORDER BY date DESC LIMIT 10
    `).all(userId, thirtyDaysAgo.toISOString().split("T")[0]);

    // Recupera reminder imminenti
    const reminders = localDb.prepare(`
      SELECT * FROM reminders WHERE user_id = ? AND due_date >= date('now') AND status = 'pending' ORDER BY due_date LIMIT 5
    `).all(userId);

    // Formatta dati per il prompt
    const healthSummary = healthData.length > 0
      ? healthData.map((h: any) =>
          `- ${h.date}: peso ${h.weight}kg, glicemia ${h.fasting_glucose}mg/dL, FC ${h.resting_hr}bpm, sonno ${h.sleep_hours}h, passi ${h.steps}`
        ).join("\n")
      : "Nessun dato sanitario recente.";

    const reminderSummary = reminders.length > 0
      ? reminders.map((r: any) => `- ${r.title} (${r.type}) il ${r.due_date}`).join("\n")
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
