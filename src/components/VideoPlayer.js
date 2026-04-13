"use client";

import { useState, useRef, useEffect } from "react";

export default function VideoPlayer({ lessons = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState(() => {
    if (typeof window === "undefined") return new Set();
    try {
      const stored = localStorage.getItem("completed-lessons");
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });
  const videoRef = useRef(null);

  const current = lessons[currentIndex];

  // persist completed set
  useEffect(() => {
    try {
      localStorage.setItem(
        "completed-lessons",
        JSON.stringify([...completed])
      );
    } catch {}
  }, [completed]);

  // reload video when lesson changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [currentIndex]);

  function handleEnded() {
    if (current) {
      setCompleted((prev) => new Set([...prev, current.id]));
    }
  }

  function markComplete(id) {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  if (!lessons.length) {
    return (
      <div className="text-center py-20 text-gray-muted">
        Nessuna lezione disponibile.
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Sidebar — lesson list */}
      <aside className="lg:w-80 flex-shrink-0 order-2 lg:order-1">
        <h3 className="font-heading text-lg tracking-wider text-white-warm mb-4">
          LEZIONI ({completed.size}/{lessons.length})
        </h3>
        <div className="flex flex-col gap-2 max-h-[70vh] overflow-y-auto pr-1">
          {lessons.map((lesson, i) => {
            const isActive = i === currentIndex;
            const isDone = completed.has(lesson.id);
            return (
              <button
                key={lesson.id}
                onClick={() => setCurrentIndex(i)}
                className={`card text-left p-4 flex items-start gap-3 transition-all ${
                  isActive ? "border-gold/60 bg-black-soft" : ""
                }`}
              >
                {/* Completion indicator */}
                <span
                  className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs transition-colors ${
                    isDone
                      ? "border-gold bg-gold text-black-deep"
                      : "border-gray-dim text-transparent"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    markComplete(lesson.id);
                  }}
                >
                  {isDone && (
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="currentColor">
                      <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                  )}
                </span>

                <div className="min-w-0">
                  <p
                    className={`text-sm font-medium truncate ${
                      isActive ? "text-gold" : "text-white-warm"
                    }`}
                  >
                    {i + 1}. {lesson.title}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Main video area */}
      <div className="flex-1 order-1 lg:order-2">
        <div className="relative w-full aspect-video bg-black-card rounded overflow-hidden mb-4">
          <video
            ref={videoRef}
            controls
            onEnded={handleEnded}
            className="w-full h-full object-contain"
            key={current?.id}
          >
            {current?.videoUrl && (
              <source src={current.videoUrl} type="video/mp4" />
            )}
            Il tuo browser non supporta il video.
          </video>
        </div>

        {/* Lesson info */}
        <h2 className="font-heading text-2xl tracking-wider text-white-warm mb-2">
          {current?.title}
        </h2>
        {current?.description && (
          <p className="text-sm text-gray-muted leading-relaxed">
            {current.description}
          </p>
        )}
      </div>
    </div>
  );
}
