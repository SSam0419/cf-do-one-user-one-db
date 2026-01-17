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
import { Lock, Mail, User } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

export const SIGN_UP_FORM_ID = "sign-up-form";
export const SignUpForm = () => {
  const form = useForm({
    resolver: zodResolver(
      z.object({
        name: z.string().min(1),
        email: z.email(),
        password: z.string().min(8),
        confirmPassword: z.string().min(8),
      })
    ),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    authClient.signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          toast.success("Account created successfully");
        },
        onError: (error) => {
          toast.error(error.error.message);
        },
      }
    );
  });

  return (
    <>
      <form id={SIGN_UP_FORM_ID} onSubmit={onSubmit}>
        <FieldSet>
          <FieldLegend>Create an account</FieldLegend>
          <FieldDescription>
            Enter your name, email and password to create an account.
          </FieldDescription>
          <FieldGroup>
            <Controller
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel className="gap-2">
                    <User className="size-4" />
                    Name
                  </FieldLabel>
                  <Input
                    required
                    placeholder="John Doe"
                    type="text"
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
            <Controller
              control={form.control}
              name="confirmPassword"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel className="gap-2">
                    <Lock className="size-4" />
                    Confirm Password
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

            <div className="flex justify-end gap-2">
              <Link to="/sign-in">
                <Button variant="link" type="button">
                  Already have an account? Sign in
                </Button>
              </Link>

              <Button type="submit">Sign up</Button>
            </div>
          </FieldGroup>
        </FieldSet>
      </form>
    </>
  );
};
