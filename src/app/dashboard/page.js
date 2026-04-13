"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthGuard from "@/components/AuthGuard";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  // TODO: Fetch user purchases from Supabase
  // e.g. const [purchases, setPurchases] = useState([]);
  // useEffect(() => { fetchPurchases(user.id) }, [user]);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();
      setUser(currentUser);
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <AuthGuard>
      <div className="pt-28 pb-16 px-6">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
            <div>
              <span className="section-label">DASHBOARD</span>
              <h1 className="font-heading text-4xl tracking-wider text-white-warm mt-2">
                BENVENUTO
              </h1>
              {user && (
                <p className="mt-1 text-gray-muted">{user.email}</p>
              )}
            </div>
            <button onClick={handleLogout} className="btn-ghost self-start">
              ESCI
            </button>
          </div>

          {/* Courses section */}
          <section>
            <h2 className="font-heading text-2xl tracking-wider text-white-warm mb-6">
              I TUOI CORSI
            </h2>

            {/* Placeholder course card — TODO: replace with dynamic data from Supabase */}
            <div className="card p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h3 className="font-heading text-xl tracking-wider text-white-warm">
                  VIDEO CORSO POSING PROFESSIONALE
                </h3>
                <p className="mt-2 text-gray-muted text-sm">
                  6 moduli — Accesso illimitato
                </p>
                <div className="mt-3 inline-flex items-center gap-2 text-sm">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-green-400">Attivo</span>
                </div>
              </div>
              <Link href="/corso/player" className="btn-gold flex-shrink-0">
                ACCEDI AL CORSO
              </Link>
            </div>

            {/* Empty state — shown when no courses */}
            {/*
            <div className="card p-12 text-center">
              <p className="text-gray-muted">Non hai ancora acquistato nessun corso.</p>
              <Link href="/corso" className="btn-gold mt-6 inline-block">
                SCOPRI I CORSI
              </Link>
            </div>
            */}
          </section>
        </div>
      </div>
    </AuthGuard>
  );
}
