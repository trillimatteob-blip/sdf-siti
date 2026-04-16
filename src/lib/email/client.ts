import { Resend } from "resend";

let cached: Resend | null = null;

export function getResend(): Resend {
  if (!cached) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY is not set");
    }
    cached = new Resend(apiKey);
  }
  return cached;
}

export const EMAIL_FROM =
  process.env.RESEND_FROM_EMAIL ?? "SaaS Starter <onboarding@example.com>";
