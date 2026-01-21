"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { signInWithEmail, signInWithGoogle } from "@/app/auth/_actions/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { signInSchema } from "@/lib/schema/auth";
import { toast } from "sonner";

type SignInValues = z.infer<typeof signInSchema>;

export default function AuthPage() {
  const [isPending, startTransition] = useTransition();
  const [sent, setSent] = useState(false);
  const [isGoogleSignInLoading, setIsGoogleSignInLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "" },
  });

  function onSubmit(values: SignInValues) {
    startTransition(async () => {
      try {
        await signInWithEmail(values);
        setSent(true);

        toast.success("Email sent", {
          description: "Check your inbox to continue signing in.",
        });
      } catch (err) {
        toast.error("Couldn’t send email", {
          description:
            err instanceof Error
              ? err.message
              : "Please try again in a moment.",
        });
      }
    });
  }

  async function handleGoogleLogin() {
    setIsGoogleSignInLoading(true);
    await signInWithGoogle();
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4">
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-muted/40 to-background" />

      <Card className="w-full max-w-sm border-muted/40 shadow-sm">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-muted">
            <Mail className="h-5 w-5 text-muted-foreground" />
          </div>

          <CardTitle className="text-2xl font-semibold">Welcome back</CardTitle>
          <CardDescription>
            Enter your email and we’ll send you a sign-in link
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {!sent ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Field>
                <FieldLabel htmlFor="email">Email address</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  aria-invalid={!!errors.email}
                  disabled={isPending || isGoogleSignInLoading}
                  {...register("email")}
                />
                {errors.email && (
                  <FieldError>{errors.email.message}</FieldError>
                )}
              </Field>

              <Button
                type="submit"
                className="w-full"
                disabled={isPending || isGoogleSignInLoading}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending email…
                  </>
                ) : (
                  "Continue"
                )}
              </Button>
            </form>
          ) : (
            <div className="rounded-md border bg-muted/40 p-4 text-center text-sm space-y-2">
              <p className="font-medium">Check your inbox</p>
              <p className="text-muted-foreground">
                We’ve emailed you a secure link to sign in.
              </p>
              <p className="text-xs text-muted-foreground">
                Didn’t receive it? Check spam or try again in a minute.
              </p>
            </div>
          )}

          <div className="relative">
            <Separator />
            <span className="absolute left-1/2 -translate-x-1/2 -top-2 bg-card px-2 text-xs text-muted-foreground">
              or
            </span>
          </div>

          {/* Google */}
          <Button
            variant="outline"
            className="w-full gap-2 font-normal"
            disabled={isPending || sent || isGoogleSignInLoading}
            onClick={handleGoogleLogin}
          >
            {isGoogleSignInLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden>
                  {" "}
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.75h3.57c2.08-1.92 3.28-4.74 3.28-8.07z"
                    fill="#4285F4"
                  />{" "}
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.75c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />{" "}
                  <path
                    d="M5.84 14.12a6.97 6.97 0 0 1 0-4.24V7.04H2.18a11 11 0 0 0 0 9.92l3.66-2.84z"
                    fill="#FBBC05"
                  />{" "}
                  <path
                    d="M12 4.58c1.61 0 3.06.55 4.2 1.64l3.15-3.15C17.45 1.09 14.97 0 12 0 7.7 0 3.99 2.47 2.18 6.04l3.66 2.84C6.71 6.51 9.14 4.58 12 4.58z"
                    fill="#EA4335"
                  />{" "}
                </svg>
                Signin You In
              </>
            ) : (
              <>
                <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden>
                  {" "}
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.75h3.57c2.08-1.92 3.28-4.74 3.28-8.07z"
                    fill="#4285F4"
                  />{" "}
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.75c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />{" "}
                  <path
                    d="M5.84 14.12a6.97 6.97 0 0 1 0-4.24V7.04H2.18a11 11 0 0 0 0 9.92l3.66-2.84z"
                    fill="#FBBC05"
                  />{" "}
                  <path
                    d="M12 4.58c1.61 0 3.06.55 4.2 1.64l3.15-3.15C17.45 1.09 14.97 0 12 0 7.7 0 3.99 2.47 2.18 6.04l3.66 2.84C6.71 6.51 9.14 4.58 12 4.58z"
                    fill="#EA4335"
                  />{" "}
                </svg>
                Continue with Google
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
