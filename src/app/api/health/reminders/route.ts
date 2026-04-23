export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { localDb } from "@/lib/local-db";
import { createClient } from "@/lib/supabase/server";
import { randomUUID } from "crypto";

async function getUserId(): Promise<string | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user?.id ?? null;
}

export async function GET() {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  const rows = localDb.prepare("SELECT * FROM reminders WHERE user_id = ? ORDER BY due_date ASC").all(userId);
  return NextResponse.json({ data: rows });
}

export async function POST(request: Request) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });

  const body = await request.json();
  const id = randomUUID();
  localDb.prepare(`INSERT INTO reminders (id, user_id, title, description, due_date, type, status, notify_doctor) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`)
    .run(id, userId, body.title, body.description ?? null, body.due_date, body.type, "pending", body.notify_doctor ? 1 : 0);

  return NextResponse.json({ success: true, id });
}
