"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthGuard from "@/components/AuthGuard";
import { getSupabase } from "@/lib/supabase";
import { TIERS, canAccessTier, getMaxTier, getTierLabel } from "@/lib/tiers";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(null);

  useEffect(() => {
    const init = async () => {
      const {
        data: { user: currentUser },
      } = await getSupabase().auth.getUser();
      setUser(currentUser);

      if (currentUser) {
        const { data } = await getSupabase()
          .from("purchases")
          .select("*")
          .eq("user_id", currentUser.id)
          .eq("status", "completed");
        setPurchases(data || []);
      }
      setLoading(false);
    };
    init();
  }, []);

  const maxTier = getMaxTier(purchases);

  const handleLogout = async () => {
    await getSupabase().auth.signOut();
    router.push("/");
  };

  const handleCheckout = async (tierId) => {
    if (!user) return;
    setCheckoutLoading(tierId);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tier: tierId,
          userId: user.id,
          email: user.email,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Checkout error:", err);
    } finally {
      setCheckoutLoading(null);
    }
  };

  const getTierStatus = (tierId) => {
    if (!maxTier) return "locked";
    const hasDirect = purchases.some((p) => p.tier === tierId);
    if (hasDirect) return "purchased";
    if (canAccessTier(maxTier, tierId)) return "included";
    return "locked";
  };

  return (
    <AuthGuard>
      <div className="pt-28 pb-16 px-6">
        <div className="mx-auto max-w-6xl">
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

          {/* --- VIDEO CORSO TIERS --- */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <span className="section-label">VIDEO CORSO POSING</span>
              <h2 className="font-heading text-3xl tracking-wider text-white-warm mt-2">
                SCEGLI IL TUO{" "}
                <span className="text-gold-gradient">LIVELLO</span>
              </h2>
              <p className="mt-4 text-gray-muted max-w-xl mx-auto">
                Tre livelli per ogni fase del tuo percorso. Scegli quello giusto per te.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {TIERS.map((tier) => {
                const status = getTierStatus(tier.id);
                const isLoading = checkoutLoading === tier.id;

                return (
                  <div
                    key={tier.id}
                    className={`card p-8 flex flex-col relative ${
                      tier.featured ? "card-featured" : ""
                    }`}
                  >
                    {/* Badge */}
                    {tier.badge && (
                      <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gold text-black-deep font-heading text-xs tracking-widest px-4 py-1">
                        {tier.badge}
                      </span>
                    )}

                    {/* Status Icon */}
                    <div className="text-center mb-4">
                      {status === "purchased" ? (
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          className="mx-auto text-green-400"
                        >
                          <path d="M9 12l2 2 4-4" />
                          <circle cx="12" cy="12" r="10" />
                        </svg>
                      ) : status === "included" ? (
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          className="mx-auto text-gold"
                        >
                          <path d="M9 12l2 2 4-4" />
                          <circle cx="12" cy="12" r="10" />
                        </svg>
                      ) : (
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          className="mx-auto text-gray-muted"
                        >
                          <rect x="3" y="11" width="18" height="11" rx="2" />
                          <path d="M7 11V7a5 5 0 0110 0v4" />
                        </svg>
                      )}
                    </div>

                    {/* Status Badge */}
                    {status === "purchased" && (
                      <div className="text-center mb-2">
                        <span className="text-xs font-heading tracking-widest text-green-400 bg-green-400/10 px-3 py-1 rounded-full">
                          ACQUISTATO
                        </span>
                      </div>
                    )}
                    {status === "included" && (
                      <div className="text-center mb-2">
                        <span className="text-xs font-heading tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full">
                          INCLUSO NEL PIANO {getTierLabel(maxTier)}
                        </span>
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="font-heading text-2xl tracking-wider text-white-warm text-center mb-1">
                      {tier.name}
                    </h3>

                    {/* Price */}
                    <div className="text-center mb-6">
                      <span className="font-heading text-5xl text-gold-gradient">
                        {tier.price}
                      </span>
                      <span className="text-gray-muted text-lg ml-1">EUR</span>
                    </div>

                    {/* Features */}
                    <ul className="flex-1 space-y-3 mb-8">
                      {tier.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm text-gray-muted"
                        >
                          <span className="text-gold text-xs mt-1">
                            &#9670;
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    {status === "purchased" || status === "included" ? (
                      <Link
                        href="/corso/player"
                        className="btn-gold w-full text-center"
                      >
                        VAI AL CORSO
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleCheckout(tier.id)}
                        disabled={isLoading}
                        className={`${
                          tier.featured ? "btn-gold" : "btn-ghost"
                        } w-full text-center`}
                      >
                        {isLoading ? "CARICAMENTO..." : `ACQUISTA ${tier.name}`}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* --- I TUOI CORSI --- */}
          <section>
            <h2 className="font-heading text-2xl tracking-wider text-white-warm mb-6">
              I TUOI CORSI
            </h2>

            {maxTier ? (
              <div className="card p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <h3 className="font-heading text-xl tracking-wider text-white-warm">
                    VIDEO CORSO POSING — {getTierLabel(maxTier)}
                  </h3>
                  <p className="mt-2 text-gray-muted text-sm">
                    Accesso illimitato a tutte le lezioni del tuo piano
                  </p>
                  <div className="mt-3 inline-flex items-center gap-2 text-sm">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-green-400">Attivo</span>
                  </div>
                </div>
                <Link
                  href="/corso/player"
                  className="btn-gold flex-shrink-0"
                >
                  ACCEDI AL CORSO
                </Link>
              </div>
            ) : (
              <div className="card p-12 text-center">
                <div className="text-gray-muted text-4xl mb-4">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="mx-auto text-gray-muted/50"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                </div>
                <p className="text-gray-muted text-lg">
                  Non hai ancora acquistato nessun corso.
                </p>
                <p className="text-gray-muted text-sm mt-2">
                  Scegli il tuo livello qui sopra per iniziare.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </AuthGuard>
  );
}
