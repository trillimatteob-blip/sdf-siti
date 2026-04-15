"use client";

import { useActionState } from "react";

import { updatePassword, type ActionState } from "@/app/(auth)/actions";
import { Field, FormAlert } from "@/components/auth/login-form";
import { Button } from "@/components/ui/button";

const initialState: ActionState = {};

export function UpdatePasswordForm() {
  const [state, action, pending] = useActionState(
    updatePassword,
    initialState,
  );

  return (
    <form action={action} className="space-y-4">
      <Field
        label="New password"
        id="password"
        name="password"
        type="password"
        autoComplete="new-password"
        minLength={8}
        required
      />
      <FormAlert state={state} />
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Saving…" : "Update password"}
      </Button>
    </form>
  );
}
