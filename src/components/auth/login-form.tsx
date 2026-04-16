"use client";

import { useActionState, useState } from "react";

import {
  signInWithMagicLink,
  signInWithPassword,
  type ActionState,
} from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: ActionState = {};

export function LoginForm({ redirectTo }: { redirectTo?: string }) {
  const [mode, setMode] = useState<"password" | "magic">("password");
  const [passwordState, passwordAction, passwordPending] = useActionState(
    signInWithPassword,
    initialState,
  );
  const [magicState, magicAction, magicPending] = useActionState(
    signInWithMagicLink,
    initialState,
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 rounded-md border border-[var(--color-border)] p-1 text-sm">
        <button
          type="button"
          onClick={() => setMode("password")}
          className={`rounded px-3 py-1.5 ${
            mode === "password"
              ? "bg-[var(--color-secondary)] font-medium"
              : "text-[var(--color-muted-foreground)]"
          }`}
        >
          Password
        </button>
        <button
          type="button"
          onClick={() => setMode("magic")}
          className={`rounded px-3 py-1.5 ${
            mode === "magic"
              ? "bg-[var(--color-secondary)] font-medium"
              : "text-[var(--color-muted-foreground)]"
          }`}
        >
          Magic link
        </button>
      </div>

      {mode === "password" ? (
        <form action={passwordAction} className="space-y-4">
          {redirectTo ? (
            <input type="hidden" name="redirect" value={redirectTo} />
          ) : null}
          <Field
            label="Email"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
          <Field
            label="Password"
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
          <FormAlert state={passwordState} />
          <Button type="submit" className="w-full" disabled={passwordPending}>
            {passwordPending ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      ) : (
        <form action={magicAction} className="space-y-4">
          <Field
            label="Email"
            id="magic-email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
          <FormAlert state={magicState} />
          <Button type="submit" className="w-full" disabled={magicPending}>
            {magicPending ? "Sending…" : "Email me a magic link"}
          </Button>
        </form>
      )}
    </div>
  );
}

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

export function Field({ label, id, ...props }: FieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} {...props} />
    </div>
  );
}

export function FormAlert({ state }: { state: ActionState }) {
  if (state.error) {
    return (
      <p className="rounded-md border border-[var(--color-destructive)]/40 bg-[var(--color-destructive)]/10 px-3 py-2 text-sm text-[var(--color-destructive)]">
        {state.error}
      </p>
    );
  }
  if (state.success) {
    return (
      <p className="rounded-md border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-700 dark:text-emerald-300">
        {state.success}
      </p>
    );
  }
  return null;
}
