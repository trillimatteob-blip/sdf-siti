"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { sendWelcomeEmail } from "@/lib/email/send";
import { createClient } from "@/lib/supabase/server";
import { absoluteUrl } from "@/lib/absolute-url";

const EmailPasswordSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

const SignupSchema = EmailPasswordSchema.extend({
  fullName: z.string().min(1, "Please tell us your name.").max(120),
});

const EmailSchema = z.object({
  email: z.string().email(),
});

const UpdatePasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export interface ActionState {
  error?: string;
  success?: string;
}

export async function signInWithPassword(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = EmailPasswordSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) return { error: error.message };

  // The hidden `redirect` field in the login form may arrive as an empty
  // string (when /login was opened with no ?redirect= query param). `??`
  // does NOT treat "" as nullish, so we validate explicitly. We also force
  // the target to be a same-origin absolute path so a malicious referrer
  // can't turn this into an open-redirect gadget via e.g.
  // `redirect=https://evil.com`.
  const rawRedirect = formData.get("redirect");
  const redirectTo = sanitizeRedirect(
    typeof rawRedirect === "string" ? rawRedirect : null,
  );
  redirect(redirectTo);
}

/**
 * Return a safe same-origin path to redirect to. Accepts absolute paths
 * starting with a single `/` and rejects protocol-relative (`//...`) or
 * externally-absolute URLs to prevent open-redirect attacks. Falls back to
 * `/dashboard` for any invalid or missing input.
 */
function sanitizeRedirect(raw: string | null): string {
  if (!raw) return "/dashboard";
  const trimmed = raw.trim();
  if (!trimmed) return "/dashboard";
  // Must start with exactly one slash, not two — `//example.com` is a
  // protocol-relative URL and would navigate off-site.
  if (!trimmed.startsWith("/") || trimmed.startsWith("//")) {
    return "/dashboard";
  }
  return trimmed;
}

export async function signInWithMagicLink(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = EmailSchema.safeParse({ email: formData.get("email") });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid email." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email: parsed.data.email,
    options: {
      emailRedirectTo: await absoluteUrl("/auth/callback"),
    },
  });
  if (error) return { error: error.message };

  return { success: "Check your inbox for a magic link." };
}

export async function signUp(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = SignupSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    fullName: formData.get("fullName"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: { full_name: parsed.data.fullName },
      emailRedirectTo: await absoluteUrl("/auth/callback"),
    },
  });
  if (error) return { error: error.message };

  // Fire-and-forget welcome email. Supabase still sends its own confirmation.
  if (data.user && process.env.RESEND_API_KEY) {
    try {
      await sendWelcomeEmail({
        to: parsed.data.email,
        name: parsed.data.fullName,
      });
    } catch (err) {
      console.error("welcome email failed", err);
    }
  }

  if (data.session) {
    redirect("/dashboard");
  }
  return {
    success: "Check your inbox to confirm your email address.",
  };
}

export async function requestPasswordReset(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = EmailSchema.safeParse({ email: formData.get("email") });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid email." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(
    parsed.data.email,
    { redirectTo: await absoluteUrl("/update-password") },
  );
  if (error) return { error: error.message };

  return {
    success: "If an account exists for that email, a reset link is on the way.",
  };
}

export async function updatePassword(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = UpdatePasswordSchema.safeParse({
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid password." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({
    password: parsed.data.password,
  });
  if (error) return { error: error.message };

  redirect("/dashboard");
}
