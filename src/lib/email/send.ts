import { EMAIL_FROM, getResend } from "@/lib/email/client";
import { PaymentConfirmationEmail } from "@/lib/email/templates/payment-confirmation";
import { PasswordResetEmail } from "@/lib/email/templates/password-reset";
import { WelcomeEmail } from "@/lib/email/templates/welcome";
import { absoluteUrl } from "@/lib/absolute-url";

export async function sendWelcomeEmail(params: {
  to: string;
  name: string;
}) {
  const resend = getResend();
  const dashboardUrl = await absoluteUrl("/dashboard");
  return resend.emails.send({
    from: EMAIL_FROM,
    to: params.to,
    subject: "Welcome to SaaS Starter",
    react: WelcomeEmail({
      name: params.name,
      dashboardUrl,
    }),
  });
}

export async function sendPaymentConfirmationEmail(params: {
  to: string;
  name: string;
  planName: string;
  amount: string;
  invoiceUrl: string | null;
}) {
  const resend = getResend();
  return resend.emails.send({
    from: EMAIL_FROM,
    to: params.to,
    subject: `Payment received — ${params.planName}`,
    react: PaymentConfirmationEmail({
      name: params.name,
      planName: params.planName,
      amount: params.amount,
      invoiceUrl: params.invoiceUrl,
    }),
  });
}

export async function sendPasswordResetEmail(params: {
  to: string;
  resetUrl: string;
}) {
  const resend = getResend();
  return resend.emails.send({
    from: EMAIL_FROM,
    to: params.to,
    subject: "Reset your password",
    react: PasswordResetEmail({ resetUrl: params.resetUrl }),
  });
}
