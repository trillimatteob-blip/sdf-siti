"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase";

export default function AuthGuard({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    const sb = getSupabase();

    if (!sb) {
      router.replace("/login");
      return;
    }

    async function checkAuth() {
      const {
        data: { session },
      } = await sb.auth.getSession();

      if (!mounted) return;

      if (session) {
        setAuthenticated(true);
      } else {
        router.replace("/login");
      }
      setLoading(false);
    }

    checkAuth();

    const {
      data: { subscription },
    } = sb.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      if (session) {
        setAuthenticated(true);
        setLoading(false);
      } else {
        setAuthenticated(false);
        router.replace("/login");
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black-deep">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
          <p className="text-sm text-gray-muted tracking-wider">Caricamento...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) return null;

  return <>{children}</>;
}
