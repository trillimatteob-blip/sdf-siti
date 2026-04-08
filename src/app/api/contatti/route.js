import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const getStoragePath = () => {
  const configured = process.env.CONTACTS_FILE_PATH || "data/contatti.json";
  return path.isAbsolute(configured)
    ? configured
    : path.join(process.cwd(), configured);
};

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

    const storagePath = getStoragePath();
    const storageDir = path.dirname(storagePath);

    await mkdir(storageDir, { recursive: true });

    let existing = [];
    try {
      const raw = await readFile(storagePath, "utf8");
      existing = JSON.parse(raw);
      if (!Array.isArray(existing)) {
        existing = [];
      }
    } catch {
      existing = [];
    }

    existing.push({
      id: crypto.randomUUID(),
      nome,
      email,
      messaggio,
      createdAt: new Date().toISOString(),
    });

    await writeFile(storagePath, JSON.stringify(existing, null, 2), "utf8");

    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { error: "Errore durante il salvataggio del contatto." },
      { status: 500 },
    );
  }
}
