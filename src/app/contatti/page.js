"use client";

import { useState } from "react";

const initialForm = {
  nome: "",
  email: "",
  messaggio: "",
};

export default function ContattiPage() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch("/api/contatti", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Invio non riuscito");
      }

      setStatus({ type: "success", message: "Messaggio inviato con successo." });
      setForm(initialForm);
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Si e verificato un errore durante l'invio.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl items-center px-6 py-16">
      <main className="w-full rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-zinc-900">Contattaci</h1>
        <p className="mt-3 text-zinc-600">
          Compila il form e salveremo la tua richiesta.
        </p>

        <form className="mt-8 space-y-5" onSubmit={onSubmit}>
          <div>
            <label htmlFor="nome" className="mb-2 block text-sm font-medium text-zinc-800">
              Nome
            </label>
            <input
              id="nome"
              name="nome"
              type="text"
              required
              value={form.nome}
              onChange={onChange}
              className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 outline-none ring-zinc-900 transition focus:ring-2"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-zinc-800">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={onChange}
              className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 outline-none ring-zinc-900 transition focus:ring-2"
            />
          </div>

          <div>
            <label htmlFor="messaggio" className="mb-2 block text-sm font-medium text-zinc-800">
              Messaggio
            </label>
            <textarea
              id="messaggio"
              name="messaggio"
              rows={5}
              required
              value={form.messaggio}
              onChange={onChange}
              className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 outline-none ring-zinc-900 transition focus:ring-2"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Invio..." : "Invia"}
          </button>

          {status.message && (
            <p
              className={`text-sm ${status.type === "success" ? "text-emerald-700" : "text-red-700"}`}
            >
              {status.message}
            </p>
          )}
        </form>
      </main>
    </div>
  );
}
