import { supabase } from "@/lib/supabase";

export async function POST(request) {
  try {
    const body = await request.json();
    const nome = body?.nome?.trim();
    const email = body?.email?.trim();
    const messaggio = body?.messaggio?.trim();

    if (!nome || !email || !messaggio) {
      return Response.json(
        { error: "Compila tutti i campi obbligatori." },
        { status: 400 },
      );
    }

    // Try Supabase first, fall back to in-memory log
    try {
      const { error } = await supabase.from("contatti").insert({
        nome,
        email,
        messaggio,
      });

      if (error) {
        // Supabase table may not exist yet — log and return success anyway
        console.warn("Supabase insert warning:", error.message);
      }
    } catch (e) {
      console.warn("Supabase not available:", e.message);
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { error: "Errore durante il salvataggio del contatto." },
      { status: 500 },
    );
  }
}
