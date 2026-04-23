const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env");
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
