import Link from "next/link";

import { SignupForm } from "@/components/auth/signup-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignupPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Start on the Free plan. Upgrade anytime.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <SignupForm />
        <div className="text-center text-sm text-[var(--color-muted-foreground)]">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[var(--color-foreground)] underline"
          >
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
