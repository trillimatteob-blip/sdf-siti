const fs = require("fs");
const path = require("path");

// Load .env.local manually
const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

fetch(`${url}/storage/v1/bucket`, {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${key}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ id: "documents", name: "documents", public: false }),
})
  .then((r) => r.json())
  .then((data) => {
    if (data.error) {
      console.error("Error:", data.error);
      process.exit(1);
    }
    console.log("Bucket created successfully:", data);
  })
  .catch((err) => {
    console.error("Fetch error:", err);
    process.exit(1);
  });
