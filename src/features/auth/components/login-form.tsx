"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginInput } from "@/schemas/auth";
import { loginAction } from "@/actions/auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { SocialButtons } from "./social-buttons";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectParam = searchParams.get("redirect");

  const [showPassword, setShowPassword] = React.useState(false);
  const [isPending, setIsPending] = React.useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const rememberMe = watch("rememberMe");

  const onSubmit = async (data: LoginInput) => {
    setIsPending(true);
    try {
      const result = await loginAction(data);

      if (!result.success) {
        toast.error(result.error || "Login failed. Please check your credentials.");
        setIsPending(false);
        return;
      }

      toast.success("Welcome back! Redirecting to your dashboard...");
      let target = result.redirectUrl || "/customer/dashboard";
      if (redirectParam) {
        if (target.startsWith("/customer") && (redirectParam.startsWith("/customer") || redirectParam.startsWith("/checkout"))) {
          target = redirectParam;
        } else if (target.startsWith("/vendor") && redirectParam.startsWith("/vendor")) {
          target = redirectParam;
        } else if (target.startsWith("/admin") && redirectParam.startsWith("/admin")) {
          target = redirectParam;
        }
      }
      router.push(target);
      router.refresh();
    } catch {
      toast.error("An unexpected error occurred. Please try again.");
      setIsPending(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Social Login Button */}
      <SocialButtons redirectTo={redirectParam || undefined} />

      {/* Divider */}
      <div className="relative flex items-center justify-center">
        <div className="w-full border-t border-border/80" />
        <span className="bg-card px-3 text-xs uppercase tracking-wider text-muted-foreground font-semibold absolute">
          or continue with email
        </span>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
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

        {/* Password Field */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/auth/forgot-password"
              className="text-xs text-primary font-semibold hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="current-password"
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

        {/* Remember Me Checkbox */}
        <div className="flex items-center space-x-2 pt-1">
          <Checkbox
            id="rememberMe"
            checked={rememberMe}
            onCheckedChange={(checked) => setValue("rememberMe", !!checked)}
          />
          <label
            htmlFor="rememberMe"
            className="text-xs text-muted-foreground font-medium cursor-pointer"
          >
            Remember me on this browser
          </label>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="gradient"
          disabled={isPending}
          className="w-full h-12 rounded-2xl shadow-soft-md shadow-primary/20 text-sm font-semibold gap-2"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign In to WedConnect"
          )}
        </Button>
      </form>

      {/* Quick Demo Credentials Panel */}
      <div className="p-3.5 rounded-2xl bg-muted/40 border border-border/80 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            Quick 1-Click Role Login
          </span>
          <Link href="/auth/logout" className="text-[11px] font-semibold text-rose-500 hover:underline">
            Clear Session
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => {
              setValue("email", "couple@wedconnect.app");
              setValue("password", "Password123!");
            }}
            className="px-2.5 py-1.5 rounded-xl border border-border bg-card hover:bg-primary/10 hover:border-primary/40 text-[11px] font-bold text-foreground transition-all text-center"
          >
            Couple
          </button>
          <button
            type="button"
            onClick={() => {
              setValue("email", "vendor@wedconnect.app");
              setValue("password", "Password123!");
            }}
            className="px-2.5 py-1.5 rounded-xl border border-border bg-card hover:bg-purple-500/10 hover:border-purple-500/40 text-[11px] font-bold text-foreground transition-all text-center"
          >
            Vendor
          </button>
          <button
            type="button"
            onClick={() => {
              setValue("email", "admin@wedconnect.app");
              setValue("password", "Password123!");
            }}
            className="px-2.5 py-1.5 rounded-xl border border-border bg-card hover:bg-amber-500/10 hover:border-amber-500/40 text-[11px] font-bold text-foreground transition-all text-center"
          >
            Admin
          </button>
        </div>
      </div>

      {/* Switch to Register */}
      <div className="text-center pt-2">
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account yet?{" "}
          <Link
            href="/auth/register"
            className="font-semibold text-primary hover:underline underline-offset-4"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

