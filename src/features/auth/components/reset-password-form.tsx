"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, ResetPasswordInput } from "@/schemas/auth";
import { resetPasswordAction } from "@/actions/auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export function ResetPasswordForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [isPending, setIsPending] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordInput) => {
    setIsPending(true);
    try {
      const result = await resetPasswordAction(data.password);

      if (!result.success) {
        toast.error(result.error || "Failed to update password");
        setIsPending(false);
        return;
      }

      toast.success(result.message || "Password updated successfully!");
      router.push("/auth/login");
    } catch {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Password */}
        <div className="space-y-1.5">
          <Label htmlFor="password">New Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Min. 8 characters with letter & number"
              autoComplete="new-password"
              icon={<Lock className="w-4 h-4" />}
              {...register("password")}
              disabled={isPending}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-rose-500 font-medium pl-1">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Repeat new password"
            autoComplete="new-password"
            icon={<Lock className="w-4 h-4" />}
            {...register("confirmPassword")}
            disabled={isPending}
          />
          {errors.confirmPassword && (
            <p className="text-xs text-rose-500 font-medium pl-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          variant="gradient"
          disabled={isPending}
          className="w-full h-12 rounded-2xl shadow-soft-md shadow-primary/20 text-sm font-semibold gap-2 mt-2"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Updating password...
            </>
          ) : (
            "Set New Password"
          )}
        </Button>
      </form>

      <div className="text-center pt-2">
        <Link
          href="/auth/login"
          className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          Remember your password? Sign in
        </Link>
      </div>
    </div>
  );
}

