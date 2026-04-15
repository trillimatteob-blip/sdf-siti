"use client";

import { useActionState } from "react";

import { signUp, type ActionState } from "@/app/(auth)/actions";
import { Field, FormAlert } from "@/components/auth/login-form";
import { Button } from "@/components/ui/button";

const initialState: ActionState = {};

export function SignupForm() {
  const [state, action, pending] = useActionState(signUp, initialState);

  return (
    <form action={action} className="space-y-4">
      <Field
        label="Full name"
        id="fullName"
        name="fullName"
        autoComplete="name"
        required
      />
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
        autoComplete="new-password"
        minLength={8}
        required
      />
      <FormAlert state={state} />
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Creating account…" : "Create account"}
      </Button>
    </form>
  );
}
