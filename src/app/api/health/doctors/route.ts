export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { localDb } from "@/lib/local-db";

export async function GET() {
  const rows = localDb.prepare("SELECT * FROM doctors ORDER BY rating DESC").all();
  return NextResponse.json({ data: rows });
}
