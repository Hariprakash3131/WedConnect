"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, ForgotPasswordInput } from "@/schemas/auth";
import { forgotPasswordAction } from "@/actions/auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Mail, Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

export function ForgotPasswordForm() {
  const [isPending, setIsPending] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [submittedEmail, setSubmittedEmail] = React.useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    setIsPending(true);
    try {
      const result = await forgotPasswordAction(data.email);

      if (!result.success) {
        toast.error(result.error || "Failed to process request. Please try again.");
        setIsPending(false);
        return;
      }

      setSubmittedEmail(data.email);
      setIsSubmitted(true);
      toast.success("Password reset instructions sent!");
    } catch {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="space-y-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-foreground">Check your inbox</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We have dispatched a password reset link to{" "}
            <span className="font-semibold text-foreground">{submittedEmail}</span>. Please click
            the link to configure your new password.
          </p>
        </div>

        <div className="pt-4 space-y-3">
          <Button
            type="button"
            variant="glass"
            onClick={() => setIsSubmitted(false)}
            className="w-full h-11 text-xs"
          >
            Didn&apos;t receive it? Try another email
          </Button>

          <Link href="/auth/login" className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Registered Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@domain.com"
            autoComplete="email"
            icon={<Mail className="w-4 h-4" />}
            {...register("email")}
            disabled={isPending}
          />
          {errors.email && (
            <p className="text-xs text-rose-500 font-medium pl-1">{errors.email.message}</p>
          )}
        </div>

        <Button
          type="submit"
          variant="gradient"
          disabled={isPending}
          className="w-full h-12 rounded-2xl shadow-soft-md shadow-primary/20 text-sm font-semibold gap-2"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending instructions...
            </>
          ) : (
            "Send Reset Link"
          )}
        </Button>
      </form>

      <div className="text-center pt-2">
        <Link
          href="/auth/login"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to sign in
        </Link>
      </div>
    </div>
  );
}
