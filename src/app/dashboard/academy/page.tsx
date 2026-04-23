import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function AcademyPage() {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;

  const courses = [
    {
      slug: "posing-base",
      title: "AM Posing School — Base",
      description: "Introduzione al posing e pose fondamentali del Classic Physique.",
      progress: 0,
      totalLessons: 8,
    },
    {
      slug: "posing-pro",
      title: "AM Posing School — Pro",
      description: "Pose rilassate, masterclass e correzioni avanzate.",
      progress: 0,
      totalLessons: 14,
    },
    {
      slug: "posing-elite",
      title: "AM Posing School — Elite",
      description: "Transizioni, posing 1:1 con Andrea e preparazione gara.",
      progress: 0,
      totalLessons: 22,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Academy</h1>
        <p className="text-sm text-neutral-500">
          I tuoi corsi e il tuo progresso.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Card key={course.slug}>
            <CardHeader>
              <CardTitle className="text-lg">{course.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-neutral-500">{course.description}</p>
              <div className="text-xs text-neutral-400">
                {course.totalLessons} lezioni
              </div>
              <Link href={`/dashboard/academy/${course.slug}`} className={cn(buttonVariants(), "w-full")}>
                <Link href={`/dashboard/academy/${course.slug}`}>
                  {course.progress > 0 ? "Continua" : "Inizia"}
                </Link>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
