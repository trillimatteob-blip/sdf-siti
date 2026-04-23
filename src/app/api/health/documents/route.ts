export const runtime = "nodejs";

import { localDb } from "@/lib/local-db";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";
import { createClient } from "@/lib/supabase/server";
import { randomUUID } from "crypto";

const UPLOAD_DIR = join(process.cwd(), "data", "uploads");

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;
    if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const docs = localDb.prepare("SELECT * FROM documents WHERE user_id = ? ORDER BY uploaded_at DESC").all(userId);
    return Response.json({ data: docs });
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;
    if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const { filename, mimeType, size, base64, category, description } = body;

    if (!filename || !base64) {
      return Response.json({ error: "Missing filename or data" }, { status: 400 });
    }

    if (!existsSync(UPLOAD_DIR)) mkdirSync(UPLOAD_DIR, { recursive: true });

    const id = randomUUID();
    const ext = filename.split(".").pop() || "";
    const storedName = `${id}.${ext}`;
    const buffer = Buffer.from(base64, "base64");
    writeFileSync(join(UPLOAD_DIR, storedName), buffer);

    localDb.prepare(`
      INSERT INTO documents (id, user_id, filename, original_name, mime_type, size, category, description)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, userId, storedName, filename, mimeType || "application/octet-stream", size || buffer.length, category || null, description || null);

    return Response.json({ success: true, id });
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
