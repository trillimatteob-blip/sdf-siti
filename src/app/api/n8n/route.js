import { supabase } from "@/lib/supabase";

const apiKeyHeaderName = "x-api-key";
const tableName = process.env.N8N_SUPABASE_TABLE || "n8n_payloads";

function isValidApiKey(provided, expected) {
  if (!provided || !expected) return false;
  if (provided.length !== expected.length) return false;

  // Constant-time comparison
  let result = 0;
  for (let i = 0; i < provided.length; i++) {
    result |= provided.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return result === 0;
}

export async function POST(request) {
  const configuredSecret = process.env.N8N_SECRET_TOKEN;

  if (!configuredSecret) {
    return Response.json(
      { error: "Server misconfiguration: missing N8N_SECRET_TOKEN" },
      { status: 500 },
    );
  }

  const incomingApiKey = request.headers.get(apiKeyHeaderName);
  const isAuthorized = isValidApiKey(incomingApiKey, configuredSecret);

  if (!isAuthorized) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { error } = await supabase.from(tableName).insert({
    payload,
    received_at: new Date().toISOString(),
  });

  if (error) {
    return Response.json(
      { error: "Failed to save data on Supabase", details: error.message },
      { status: 500 },
    );
  }

  return Response.json({ ok: true }, { status: 201 });
}
