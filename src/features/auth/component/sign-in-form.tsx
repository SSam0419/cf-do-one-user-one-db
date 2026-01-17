import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { Button } from "@/features/shared/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/features/shared/components/ui/field";
import { Input } from "@/features/shared/components/ui/input";
import { toast } from "@/features/shared/components/ui/sonner";
import { Lock, Mail } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

export const SIGN_IN_FORM_ID = "sign-in-form";
export const SignInForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const form = useForm({
    resolver: zodResolver(
      z.object({
        email: z.email(),
        password: z.string().min(8),
      })
    ),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          toast.success("Signed in successfully");
          onSuccess?.();
        },
        onError: (error) => {
          toast.error("Failed to sign in", {
            description: error.error.message,
          });
        },
      }
    );
  });

  return (
    <>
      <form id={SIGN_IN_FORM_ID} onSubmit={onSubmit}>
        <FieldSet>
          <FieldLegend>Sign in to your account</FieldLegend>
          <FieldDescription>
            Enter your email and password to sign in to your account.
          </FieldDescription>
          <FieldGroup>
            <Controller
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel className="gap-2">
                    <Mail className="size-4" />
                    Email
                  </FieldLabel>
                  <Input
                    required
                    placeholder="john.doe@example.com"
                    type="email"
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel className="gap-2">
                    <Lock className="size-4" />
                    Password
                  </FieldLabel>
                  <Input
                    required
                    placeholder="********"
                    type="password"
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {}

            <div className="flex justify-end gap-2">
              <Link to="/sign-up">
                <Button variant="link" type="button">
                  Don't have an account? Sign up
                </Button>
              </Link>

              <Button type="submit" isLoading={form.formState.isSubmitting}>
                Sign in
              </Button>
            </div>
          </FieldGroup>
        </FieldSet>
      </form>
    </>
  );
};
