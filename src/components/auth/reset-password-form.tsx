"use client";

import { useActionState } from "react";

import {
  requestPasswordReset,
  type ActionState,
} from "@/app/(auth)/actions";
import { Field, FormAlert } from "@/components/auth/login-form";
import { Button } from "@/components/ui/button";

const initialState: ActionState = {};

export function ResetPasswordForm() {
  const [state, action, pending] = useActionState(
    requestPasswordReset,
    initialState,
  );

  return (
    <form action={action} className="space-y-4">
      <Field
        label="Email"
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        required
      />
      <FormAlert state={state} />
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Sending…" : "Send reset link"}
      </Button>
    </form>
  );
}
