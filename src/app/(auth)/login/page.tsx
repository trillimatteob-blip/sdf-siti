import Link from "next/link";

import { LoginForm } from "@/components/auth/login-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function LoginPage(props: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const { redirect } = await props.searchParams;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>
          Welcome back. Sign in to continue to your dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <LoginForm redirectTo={redirect} />
        <div className="text-center text-sm text-[var(--color-muted-foreground)]">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-[var(--color-foreground)] underline">
            Sign up
          </Link>
          <div className="mt-1">
            <Link
              href="/reset-password"
              className="text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
            >
              Forgot password?
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
