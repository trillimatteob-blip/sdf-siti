"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Upload, FileText, Search, Download } from "lucide-react";

interface Document {
  id: string;
  original_name: string;
  mime_type: string;
  size: number;
  category: string | null;
  description: string | null;
  uploaded_at: string;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

export default function RefertiPage() {
  const [docs, setDocs] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/health/documents")
      .then(r => r.json())
      .then(d => { setDocs(d.data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  async function handleUpload() {
    const file = fileRef.current?.files?.[0];
    if (!file) return;

    setUploading(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = (reader.result as string).split(",")[1];
      try {
        const res = await fetch("/api/health/documents", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            filename: file.name,
            mimeType: file.type,
            size: file.size,
            base64,
            category: category || null,
            description: description || null,
          }),
        });
        if (res.ok) {
          setCategory("");
          setDescription("");
          if (fileRef.current) fileRef.current.value = "";
          const refreshed = await fetch("/api/health/documents").then(r => r.json());
          setDocs(refreshed.data || []);
        }
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  }

  const filtered = docs.filter(d =>
    !search || d.original_name.toLowerCase().includes(search.toLowerCase()) ||
    (d.description && d.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Referti</h1>
        <p className="text-sm text-[var(--color-muted-foreground)]">Carica e consulta i tuoi referti, esami e immagini mediche.</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Carica nuovo referto</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>File</Label>
              <Input ref={fileRef} type="file" accept=".pdf,.jpg,.jpeg,.png,.dicom" />
            </div>
            <div>
              <Label>Categoria</Label>
              <Input value={category} onChange={e => setCategory(e.target.value)} placeholder="Es. Risonanza, Sangue, RX..." />
            </div>
          </div>
          <div>
            <Label>Descrizione</Label>
            <Input value={description} onChange={e => setDescription(e.target.value)} placeholder="Es. Risonanza magnetica ginocchio destro - marzo 2024" />
          </div>
          <Button onClick={handleUpload} disabled={uploading}>
            <Upload className="mr-2 h-4 w-4" />
            {uploading ? "Caricamento..." : "Carica referto"}
          </Button>
        </CardContent>
      </Card>

      <Separator />

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-muted-foreground)]" />
        <input
          type="text"
          placeholder="Cerca referti..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="h-10 w-full rounded-md border border-[var(--color-border)] bg-[var(--color-background)] pl-9 pr-3 text-sm text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-ring)]"
        />
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}><CardContent className="py-4"><Skeleton className="h-10 w-full" /></CardContent></Card>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <FileText className="h-10 w-10 text-[var(--color-muted-foreground)] mb-3" />
            <p className="text-sm text-[var(--color-muted-foreground)]">Nessun referto caricato.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map(doc => (
            <Card key={doc.id}>
              <CardContent className="flex items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <FileText className="h-5 w-5 text-[var(--color-primary)]" />
                  <div>
                    <p className="font-medium text-[var(--color-foreground)]">{doc.original_name}</p>
                    <p className="text-xs text-[var(--color-muted-foreground)]">
                      {doc.category || "Senza categoria"} • {formatBytes(doc.size)} • {new Date(doc.uploaded_at).toLocaleDateString("it-IT")}
                    </p>
                    {doc.description && <p className="text-xs text-[var(--color-muted-foreground)]">{doc.description}</p>}
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4 text-[var(--color-muted-foreground)]" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
