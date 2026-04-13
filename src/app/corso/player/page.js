"use client";

import { useState } from "react";
import AuthGuard from "@/components/AuthGuard";
import VideoPlayer from "@/components/VideoPlayer";

// TODO: Fetch lessons from Supabase based on purchase status
// For now using hardcoded lesson data
const lessons = [
  {
    id: 1,
    title: "Modulo 1 — Fondamenti del Posing",
    description:
      "Le basi della postura, respirazione e controllo muscolare sul palco.",
    videoUrl: "",
  },
  {
    id: 2,
    title: "Modulo 2 — Pose Obbligatorie",
    description:
      "Analisi dettagliata di ogni posa obbligatoria per Classic Physique e Men's Physique.",
    videoUrl: "",
  },
  {
    id: 3,
    title: "Modulo 3 — Transizioni e Flow",
    description:
      "Come collegare le pose con transizioni fluide e d'impatto.",
    videoUrl: "",
  },
  {
    id: 4,
    title: "Modulo 4 — Routine Individuale",
    description:
      "Costruisci la tua routine personalizzata per il palco.",
    videoUrl: "",
  },
  {
    id: 5,
    title: "Modulo 5 — Espressione e Stage Presence",
    description:
      "Comunicare sicurezza e carisma davanti ai giudici.",
    videoUrl: "",
  },
  {
    id: 6,
    title: "Modulo 6 — Peak Week e Gara",
    description:
      "Gestione dell'ultima settimana, pump-up backstage e performance finale.",
    videoUrl: "",
  },
];

export default function PlayerPage() {
  const [activeLesson, setActiveLesson] = useState(lessons[0]);

  return (
    <AuthGuard>
      <div className="pt-24 pb-16 px-6">
        <div className="mx-auto max-w-7xl">
          <h1 className="font-heading text-3xl md:text-4xl tracking-wider text-white-warm mb-8">
            VIDEO CORSO <span className="text-gold-gradient">POSING</span>
          </h1>

          <div className="grid lg:grid-cols-[1fr_360px] gap-8">
            {/* Video Player */}
            <div>
              <VideoPlayer lesson={activeLesson} />
              <div className="mt-6">
                <h2 className="font-heading text-2xl tracking-wider text-white-warm">
                  {activeLesson.title}
                </h2>
                <p className="mt-2 text-gray-muted">
                  {activeLesson.description}
                </p>
              </div>
            </div>

            {/* Lesson List */}
            <div className="card p-4 h-fit">
              <h3 className="font-heading text-lg tracking-wider text-white-warm px-2 py-3 border-b border-gold/10">
                LEZIONI
              </h3>
              <ul className="divide-y divide-gold/5">
                {lessons.map((lesson) => (
                  <li key={lesson.id}>
                    <button
                      onClick={() => setActiveLesson(lesson)}
                      className={`w-full text-left px-3 py-4 rounded-lg transition-colors ${
                        activeLesson.id === lesson.id
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
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
