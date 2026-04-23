import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const courses: Record<string, { title: string; lessons: { id: string; title: string; duration: string }[] }> = {
  "posing-base": {
    title: "AM Posing School — Base",
    lessons: [
      { id: "l1", title: "Introduzione al posing", duration: "12:30" },
      { id: "l2", title: "Front Double Biceps", duration: "18:45" },
      { id: "l3", title: "Front Lat Spread", duration: "16:20" },
      { id: "l4", title: "Side Chest", duration: "21:10" },
      { id: "l5", title: "Back Double Biceps", duration: "19:55" },
      { id: "l6", title: "Back Lat Spread", duration: "17:40" },
      { id: "l7", title: "Side Triceps", duration: "15:25" },
      { id: "l8", title: "Most Muscular", duration: "14:50" },
    ],
  },
  "posing-pro": {
    title: "AM Posing School — Pro",
    lessons: [
      { id: "l1", title: "Introduzione al posing", duration: "12:30" },
      { id: "l2", title: "Front Double Biceps", duration: "18:45" },
      { id: "l3", title: "Front Lat Spread", duration: "16:20" },
      { id: "l4", title: "Side Chest", duration: "21:10" },
      { id: "l5", title: "Back Double Biceps", duration: "19:55" },
      { id: "l6", title: "Back Lat Spread", duration: "17:40" },
      { id: "l7", title: "Side Triceps", duration: "15:25" },
      { id: "l8", title: "Most Muscular", duration: "14:50" },
      { id: "l9", title: "Pose rilassate — Teoria", duration: "22:15" },
      { id: "l10", title: "Masterclass gruppo 1", duration: "35:00" },
      { id: "l11", title: "Masterclass gruppo 2", duration: "38:20" },
      { id: "l12", title: "Correzioni live", duration: "42:10" },
      { id: "l13", title: "Preparazione gara — Peak week", duration: "28:45" },
      { id: "l14", title: "Q&A finale", duration: "30:00" },
    ],
  },
  "posing-elite": {
    title: "AM Posing School — Elite",
    lessons: [
      { id: "l1", title: "Introduzione al posing", duration: "12:30" },
      { id: "l2", title: "Front Double Biceps", duration: "18:45" },
      { id: "l3", title: "Front Lat Spread", duration: "16:20" },
      { id: "l4", title: "Side Chest", duration: "21:10" },
      { id: "l5", title: "Back Double Biceps", duration: "19:55" },
      { id: "l6", title: "Back Lat Spread", duration: "17:40" },
      { id: "l7", title: "Side Triceps", duration: "15:25" },
      { id: "l8", title: "Most Muscular", duration: "14:50" },
      { id: "l9", title: "Pose rilassate — Teoria", duration: "22:15" },
      { id: "l10", title: "Masterclass gruppo 1", duration: "35:00" },
      { id: "l11", title: "Masterclass gruppo 2", duration: "38:20" },
      { id: "l12", title: "Correzioni live", duration: "42:10" },
      { id: "l13", title: "Preparazione gara — Peak week", duration: "28:45" },
      { id: "l14", title: "Q&A finale", duration: "30:00" },
      { id: "l15", title: "Transizioni avanzate", duration: "25:30" },
      { id: "l16", title: "Routine completa", duration: "18:45" },
      { id: "l17", title: "Analisi atleti Pro", duration: "33:20" },
      { id: "l18", title: "Posing 1:1 — Sessione 1", duration: "45:00" },
      { id: "l19", title: "Posing 1:1 — Sessione 2", duration: "45:00" },
      { id: "l20", title: "Posing 1:1 — Sessione 3", duration: "45:00" },
      { id: "l21", title: "Peak week personalizzata", duration: "50:15" },
      { id: "l22", title: "Backstage gara", duration: "40:00" },
    ],
  },
};

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = courses[slug];
  if (!course) return notFound();

  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{course.title}</h1>
        <p className="text-sm text-neutral-500">{course.lessons.length} lezioni</p>
      </div>

      <div className="space-y-3">
        {course.lessons.map((lesson, idx) => (
          <div
            key={lesson.id}
            className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white px-4 py-3 dark:border-neutral-800 dark:bg-neutral-900"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-sm font-medium dark:bg-neutral-800">
                {idx + 1}
              </span>
              <span className="font-medium">{lesson.title}</span>
            </div>
            <span className="text-sm text-neutral-500">{lesson.duration}</span>
          </div>
        ))}
      </div>

      <Link href="/dashboard/academy" className={cn(buttonVariants({ variant: "outline" }))}>
        <Link href="/dashboard/academy">Torna all&apos;Academy</Link>
      </Link>
    </div>
  );
}
