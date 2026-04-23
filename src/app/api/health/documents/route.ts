export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { getDocuments, insertDocument } from "@/lib/health-db";

async function getUserId(): Promise<string | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user?.id ?? null;
}

export async function GET() {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const docs = await getDocuments(userId);
    return NextResponse.json({ data: docs });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { filename, mimeType, size, base64, category, description } = body;

  if (!filename || !base64) {
    return NextResponse.json({ error: "Missing filename or data" }, { status: 400 });
  }

  try {
    const ext = filename.split(".").pop() || "";
    const storagePath = `${userId}/${Date.now()}.${ext}`;
    const buffer = Buffer.from(base64, "base64");

    // Upload to Supabase Storage
    const { error: uploadError } = await getSupabaseAdmin().storage
      .from("documents")
      .upload(storagePath, buffer, {
        contentType: mimeType || "application/octet-stream",
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    // Save metadata
    const record = await insertDocument(userId, {
      filename: storagePath,
      original_name: filename,
      mime_type: mimeType || "application/octet-stream",
      size: size || buffer.length,
      storage_path: storagePath,
      category: category || null,
      description: description || null,
    });

    return Response.json({ success: true, id: record.id });
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
