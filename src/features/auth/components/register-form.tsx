"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterInput } from "@/schemas/auth";
import { registerAction } from "@/actions/auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { SocialButtons } from "./social-buttons";
import {
  User,
  Mail,
  Lock,
  Building2,
  Heart,
  Briefcase,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

export function RegisterForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = React.useState(false);
  const [isPending, setIsPending] = React.useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "customer",
      businessName: "",
      terms: true,
    },
  });

  const selectedRole = watch("role");
  const passwordValue = watch("password") || "";
  const termsAccepted = watch("terms");

  // Calculate password strength
  const getPasswordStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const strength = getPasswordStrength(passwordValue);

  const onSubmit = async (data: RegisterInput) => {
    setIsPending(true);
    try {
      const result = await registerAction(data);

      if (!result.success) {
        toast.error(result.error || "Registration failed. Please check your information.");
        setIsPending(false);
        return;
      }

      if (result.requiresVerification) {
        toast.success(result.message || "Account created! Please check your email to verify.");
        router.push(result.redirectUrl || "/auth/verify-email");
      } else {
        toast.success("Welcome to WedConnect! Setting up your workspace...");
        router.push(result.redirectUrl || "/customer/dashboard");
      }
      router.refresh();
    } catch {
      toast.error("An unexpected error occurred. Please try again.");
      setIsPending(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Role Switcher Cards */}
      <div className="space-y-2">
        <Label>I want to join as</Label>
        <div className="grid grid-cols-2 gap-3">
          {/* Customer Option */}
          <button
            type="button"
            onClick={() => setValue("role", "customer")}
            className={cn(
              "flex flex-col items-center justify-center p-4 rounded-2xl border text-center transition-all duration-200",
              selectedRole === "customer"
                ? "border-primary bg-primary/5 text-primary shadow-soft-sm ring-2 ring-primary/20"
                : "border-border/80 bg-background/50 text-muted-foreground hover:bg-muted/40"
            )}
          >
            <div
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center mb-2 transition-colors",
                selectedRole === "customer" ? "bg-primary text-white" : "bg-muted text-muted-foreground"
              )}
            >
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <span className="font-semibold text-sm text-foreground">Customer / Couple</span>
            <span className="text-xs text-muted-foreground mt-0.5">Planning an event</span>
          </button>

          {/* Vendor Option */}
          <button
            type="button"
            onClick={() => setValue("role", "vendor")}
            className={cn(
              "flex flex-col items-center justify-center p-4 rounded-2xl border text-center transition-all duration-200",
              selectedRole === "vendor"
                ? "border-secondary bg-secondary/5 text-secondary shadow-soft-sm ring-2 ring-secondary/20"
                : "border-border/80 bg-background/50 text-muted-foreground hover:bg-muted/40"
            )}
          >
            <div
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center mb-2 transition-colors",
                selectedRole === "vendor" ? "bg-secondary text-white" : "bg-muted text-muted-foreground"
              )}
            >
              <Briefcase className="w-5 h-5" />
            </div>
            <span className="font-semibold text-sm text-foreground">Vendor / Pro</span>
            <span className="text-xs text-muted-foreground mt-0.5">Grow business & quotes</span>
          </button>
        </div>
      </div>

      {/* Social Login Button */}
      <SocialButtons />

      {/* Divider */}
      <div className="relative flex items-center justify-center">
        <div className="w-full border-t border-border/80" />
        <span className="bg-card px-3 text-xs uppercase tracking-wider text-muted-foreground font-semibold absolute">
          or register with email
        </span>
      </div>

      {/* Registration Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <div className="space-y-1.5">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            type="text"
            placeholder="Alexandra Taylor"
            autoComplete="name"
            icon={<User className="w-4 h-4" />}
            {...register("fullName")}
            disabled={isPending}
          />
          {errors.fullName && (
            <p className="text-xs text-rose-500 font-medium pl-1">{errors.fullName.message}</p>
          )}
        </div>

        {/* Business Name (Vendor only) */}
        {selectedRole === "vendor" && (
          <div className="space-y-1.5 animate-fadeIn">
            <Label htmlFor="businessName">Business / Brand Name</Label>
            <Input
              id="businessName"
              type="text"
              placeholder="e.g. Luminary Cinematics"
              icon={<Building2 className="w-4 h-4" />}
              {...register("businessName")}
              disabled={isPending}
            />
            {errors.businessName && (
              <p className="text-xs text-rose-500 font-medium pl-1">{errors.businessName.message}</p>
            )}
          </div>
        )}

        {/* Email */}
        <div className="space-y-1.5">
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

        {/* Password */}
        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
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

          {/* Password Strength Indicator */}
          {passwordValue.length > 0 && (
            <div className="space-y-1 pt-1">
              <div className="flex gap-1.5 h-1.5 w-full">
                <div
                  className={cn(
                    "flex-1 rounded-full transition-colors",
                    strength >= 1 ? "bg-rose-500" : "bg-muted"
                  )}
                />
                <div
                  className={cn(
                    "flex-1 rounded-full transition-colors",
                    strength >= 2 ? "bg-amber-500" : "bg-muted"
                  )}
                />
                <div
                  className={cn(
                    "flex-1 rounded-full transition-colors",
                    strength >= 3 ? "bg-emerald-500" : "bg-muted"
                  )}
                />
                <div
                  className={cn(
                    "flex-1 rounded-full transition-colors",
                    strength >= 4 ? "bg-emerald-600" : "bg-muted"
                  )}
                />
              </div>
              <p className="text-[11px] text-muted-foreground flex items-center justify-between">
                <span>Must include at least 1 uppercase letter & 1 digit</span>
                <span className="font-semibold capitalize">
                  {strength <= 1 ? "Weak" : strength <= 2 ? "Fair" : strength === 3 ? "Good" : "Strong"}
                </span>
              </p>
            </div>
          )}

          {errors.password && (
            <p className="text-xs text-rose-500 font-medium pl-1">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Repeat password"
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

        {/* Terms Checkbox */}
        <div className="flex items-start space-x-2.5 pt-2">
          <Checkbox
            id="terms"
            checked={termsAccepted}
            onCheckedChange={(checked) => setValue("terms", checked === true ? true : (false as any))}
            className="mt-0.5"
          />
          <label htmlFor="terms" className="text-xs text-muted-foreground leading-normal cursor-pointer">
            I agree to the{" "}
            <Link href="/terms" className="text-primary font-semibold hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary font-semibold hover:underline">
              Privacy Policy
            </Link>
            .
          </label>
        </div>
        {errors.terms && (
          <p className="text-xs text-rose-500 font-medium pl-1">{errors.terms.message}</p>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="gradient"
          disabled={isPending}
          className="w-full h-12 rounded-2xl shadow-soft-md shadow-primary/20 text-sm font-semibold gap-2 mt-2"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Creating your account...
            </>
          ) : (
            `Create ${selectedRole === "vendor" ? "Vendor" : "Customer"} Account`
          )}
        </Button>
      </form>

      {/* Switch to Sign In */}
      <div className="text-center pt-2">
        <p className="text-sm text-muted-foreground">
          Already registered?{" "}
          <Link
            href="/auth/login"
            className="font-semibold text-primary hover:underline underline-offset-4"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

