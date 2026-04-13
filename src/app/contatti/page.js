"use client";

import { useState } from "react";

const WHATSAPP_URL =
  "https://wa.me/393516157497?text=Ciao%20Andrea!%20Vorrei%20info%20sul%20coaching";

const initialForm = {
  nome: "",
  email: "",
  messaggio: "",
};

export default function ContattiPage() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch("/api/contatti", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Invio non riuscito");
      }

      setStatus({ type: "success", message: "Messaggio inviato con successo!" });
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
    <>
      <section className="relative pt-40 pb-24 px-6 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent pointer-events-none" />
        <div className="relative mx-auto max-w-4xl">
          <span className="section-label">CONTATTI</span>
          <h1 className="font-heading text-5xl md:text-7xl tracking-wider text-white-warm mt-4">
            CONTATTACI
          </h1>
          <p className="mt-6 text-gray-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Hai domande sul coaching, i corsi o le consulenze? Scrivici e ti
            rispondiamo entro 24 ore.
          </p>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="mx-auto max-w-5xl grid md:grid-cols-2 gap-12">
          {/* Form */}
          <div className="card p-8 md:p-10">
            <h2 className="font-heading text-2xl tracking-wider text-white-warm mb-8">
              SCRIVICI
            </h2>

            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="nome"
                  className="block text-sm font-medium text-gray-muted mb-2"
                >
                  Nome
                </label>
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  required
                  value={form.nome}
                  onChange={onChange}
                  className="input-dark w-full"
                  placeholder="Il tuo nome"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-muted mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={onChange}
                  className="input-dark w-full"
                  placeholder="la-tua@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="messaggio"
                  className="block text-sm font-medium text-gray-muted mb-2"
                >
                  Messaggio
                </label>
                <textarea
                  id="messaggio"
                  name="messaggio"
                  rows={5}
                  required
                  value={form.messaggio}
                  onChange={onChange}
                  className="input-dark w-full"
                  placeholder="Come possiamo aiutarti?"
                />
              </div>

              {status.message && (
                <p
                  className={`text-sm ${
                    status.type === "success" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {status.message}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-gold w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "INVIO IN CORSO..." : "INVIA MESSAGGIO"}
              </button>
            </form>
          </div>

          {/* WhatsApp alternative */}
          <div className="flex flex-col justify-center">
            <div className="card p-8 md:p-10 text-center">
              <div className="text-5xl mb-6">💬</div>
              <h2 className="font-heading text-2xl tracking-wider text-white-warm">
                PREFERISCI WHATSAPP?
              </h2>
              <p className="mt-4 text-gray-muted leading-relaxed">
                Scrivimi direttamente su WhatsApp per una risposta immediata.
                Sono disponibile dal lunedi al venerdi, 9:00 — 18:00.
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold mt-8 inline-block"
              >
                SCRIVI SU WHATSAPP
              </a>
            </div>

            <div className="card p-8 mt-6">
              <h3 className="font-heading text-lg tracking-wider text-white-warm mb-4">
                INFO
              </h3>
              <ul className="space-y-3 text-gray-muted text-sm">
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-gold flex-shrink-0" />
                  Risposta entro 24 ore
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-gold flex-shrink-0" />
                  Call conoscitiva gratuita
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-gold flex-shrink-0" />
                  Nessun impegno richiesto
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
