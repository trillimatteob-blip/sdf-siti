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

export async function GET(request: Request) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  let query = "SELECT * FROM health_data WHERE user_id = ?";
  const params: (string | null)[] = [userId];
  if (from) { query += " AND date >= ?"; params.push(from); }
  if (to) { query += " AND date <= ?"; params.push(to); }
  query += " ORDER BY date DESC";

  const rows = localDb.prepare(query).all(...params);
  return NextResponse.json({ data: rows });
}

export async function POST(request: Request) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });

  const body = await request.json();
  const id = randomUUID();

  const fields = [
    "id","user_id","date","weight","height","body_fat","muscle_mass","bmi","body_water",
    "waist","hips","chest","arms","thigh","calves",
    "systolic_bp","diastolic_bp","resting_hr","oxygen_saturation","hrv",
    "fasting_glucose","post_meal_glucose","ketones","body_temp",
    "sleep_hours","sleep_quality","sleep_start","sleep_end","night_awakenings",
    "steps","calories_burned","activity_minutes","distance_km"
  ];

  const values = fields.map(f => {
    if (f === "id") return id;
    if (f === "user_id") return userId;
    return body[f] ?? null;
  });

  const placeholders = fields.map(() => "?").join(", ");
  localDb.prepare(`INSERT INTO health_data (${fields.join(", ")}) VALUES (${placeholders})`).run(...values);

  return NextResponse.json({ success: true, id });
}
