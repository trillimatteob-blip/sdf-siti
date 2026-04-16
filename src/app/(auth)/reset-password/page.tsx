import Link from "next/link";

import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ResetPasswordPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reset your password</CardTitle>
        <CardDescription>
          We&apos;ll send you a link to set a new password.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <ResetPasswordForm />
        <div className="text-center text-sm text-[var(--color-muted-foreground)]">
          <Link href="/login" className="underline">
            Back to sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
