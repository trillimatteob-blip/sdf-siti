export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getDoctors } from "@/lib/health-db";

export async function GET() {
  try {
    const data = await getDoctors();
    return NextResponse.json({ data });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
