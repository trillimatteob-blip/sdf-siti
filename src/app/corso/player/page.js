"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthGuard from "@/components/AuthGuard";
import VideoPlayer from "@/components/VideoPlayer";
import { getSupabase } from "@/lib/supabase";
import { canAccessTier, getMaxTier, getTierLabel } from "@/lib/tiers";

export default function PlayerPage() {
  const router = useRouter();
  const [lessons, setLessons] = useState([]);
  const [activeLesson, setActiveLesson] = useState(null);
  const [userTier, setUserTier] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const supabase = getSupabase();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const [{ data: purchasesData }, { data: lessonsData }] =
        await Promise.all([
          supabase
            .from("purchases")
            .select("*")
            .eq("user_id", user.id)
            .eq("status", "completed"),
          supabase.from("lessons").select("*").order("sort_order"),
        ]);

      const maxTier = getMaxTier(purchasesData || []);
      setUserTier(maxTier);

      if (!maxTier) {
        router.push("/dashboard");
        return;
      }

      setLessons(lessonsData || []);
      const firstAccessible = (lessonsData || []).find((l) =>
        canAccessTier(maxTier, l.min_tier)
      );
      setActiveLesson(firstAccessible || null);
      setLoading(false);
    };
    init();
  }, [router]);

  if (loading) {
    return (
      <AuthGuard>
        <div className="pt-28 pb-16 px-6 text-center">
          <p className="text-gray-muted">Caricamento...</p>
        </div>
      </AuthGuard>
    );
  }

  const accessibleLessons = lessons.filter((l) =>
    canAccessTier(userTier, l.min_tier)
  );
  const lockedLessons = lessons.filter(
    (l) => !canAccessTier(userTier, l.min_tier)
  );

  return (
    <AuthGuard>
      <div className="pt-24 pb-16 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-heading text-3xl md:text-4xl tracking-wider text-white-warm">
              VIDEO CORSO <span className="text-gold-gradient">POSING</span>
            </h1>
            <span className="text-xs font-heading tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full">
              PIANO {getTierLabel(userTier)}
            </span>
          </div>

          <div className="grid lg:grid-cols-[1fr_360px] gap-8">
            {/* Video Player */}
            <div>
              {activeLesson ? (
                <>
                  <VideoPlayer lesson={activeLesson} />
                  <div className="mt-6">
                    <h2 className="font-heading text-2xl tracking-wider text-white-warm">
                      {activeLesson.title}
                    </h2>
                    <p className="mt-2 text-gray-muted">
                      {activeLesson.description}
                    </p>
                  </div>
                </>
              ) : (
                <div className="card p-12 text-center">
                  <p className="text-gray-muted">
                    Seleziona una lezione dalla lista.
                  </p>
                </div>
              )}
            </div>

            {/* Lesson List */}
            <div className="card p-4 h-fit">
              <h3 className="font-heading text-lg tracking-wider text-white-warm px-2 py-3 border-b border-gold/10">
                LEZIONI ({accessibleLessons.length}/{lessons.length})
              </h3>
              <ul className="divide-y divide-gold/5">
                {/* Accessible lessons */}
                {accessibleLessons.map((lesson) => (
                  <li key={lesson.id}>
                    <button
                      onClick={() => setActiveLesson(lesson)}
                      className={`w-full text-left px-3 py-4 rounded-lg transition-colors ${
                        activeLesson?.id === lesson.id
                          ? "bg-gold/10 text-gold"
                          : "text-gray-muted hover:text-white-warm hover:bg-black-soft"
                      }`}
                    >
                      <span className="text-sm font-medium block">
                        {lesson.title}
                      </span>
                    </button>
                  </li>
                ))}

                {/* Locked lessons */}
                {lockedLessons.map((lesson) => (
                  <li key={lesson.id}>
                    <div className="w-full text-left px-3 py-4 rounded-lg opacity-40 cursor-not-allowed">
                      <div className="flex items-center gap-2">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="text-gray-muted flex-shrink-0"
                        >
                          <rect x="3" y="11" width="18" height="11" rx="2" />
                          <path d="M7 11V7a5 5 0 0110 0v4" />
                        </svg>
                        <span className="text-sm font-medium text-gray-muted block">
                          {lesson.title}
                        </span>
                      </div>
                      <span className="text-xs text-gray-muted/60 mt-1 block pl-5">
                        Richiede piano {getTierLabel(lesson.min_tier)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>

              {lockedLessons.length > 0 && (
                <div className="mt-4 px-2">
                  <Link
                    href="/dashboard"
                    className="btn-ghost w-full text-center text-sm"
                  >
                    UPGRADE PIANO
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
