export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getReminders, insertReminder } from "@/lib/health-db";

async function getUserId(): Promise<string | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user?.id ?? null;
}

export async function GET() {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  try {
    const data = await getReminders(userId);
    return NextResponse.json({ data });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });

  const body = await request.json();
  try {
    const record = await insertReminder(userId, {
      title: body.title,
      description: body.description ?? null,
      due_date: body.due_date,
      type: body.type ?? "custom",
      status: "pending",
      notify_doctor: body.notify_doctor ?? false,
    });
    return NextResponse.json({ success: true, id: record.id });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
