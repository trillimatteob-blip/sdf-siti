"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      if (!supabase) throw new Error("Servizio non disponibile. Riprova più tardi.");

      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { nome },
        },
      });

      if (authError) throw authError;

      // If email confirmation is disabled, user is logged in immediately
      if (data.session) {
        router.push("/dashboard");
        return;
      }

      // Otherwise show confirmation message
      setSuccess(true);
    } catch (err) {
      setError(err.message || "Errore durante la registrazione. Riprova.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="card p-8 md:p-12 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-heading text-4xl tracking-wider text-white-warm">
            REGISTRATI
          </h1>
          <p className="mt-2 text-gray-muted text-sm">
            Crea il tuo account per accedere ai corsi.
          </p>
        </div>

        {success ? (
          <div className="text-center py-8">
            <div className="text-gold text-5xl mb-4">✓</div>
            <h2 className="font-heading text-2xl tracking-wider text-white-warm">
              REGISTRAZIONE COMPLETATA
            </h2>
            <p className="mt-4 text-gray-muted leading-relaxed">
              Ti abbiamo inviato un&apos;email di conferma. Controlla la tua
              casella di posta e clicca sul link per attivare il tuo account.
            </p>
            <Link href="/login" className="btn-gold mt-8 inline-block">
              VAI AL LOGIN
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="nome"
                className="block text-sm font-medium text-gray-muted mb-2"
              >
                Nome
              </label>
              <input
                id="nome"
                type="text"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
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
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-dark w-full"
                placeholder="la-tua@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-muted mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-dark w-full"
                placeholder="Almeno 6 caratteri"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "REGISTRAZIONE IN CORSO..." : "REGISTRATI"}
            </button>
          </form>
        )}

        {!success && (
          <p className="mt-8 text-center text-gray-muted text-sm">
            Hai gia un account?{" "}
            <Link href="/login" className="text-gold hover:underline">
              Accedi
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
