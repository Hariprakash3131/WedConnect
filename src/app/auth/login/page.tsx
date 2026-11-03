import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthLayoutWrapper } from "@/features/auth/components/auth-layout-wrapper";
import { LoginForm } from "@/features/auth/components/login-form";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your WedConnect account to manage celebrations, bookings, and quotations.",
};

export default function LoginPage() {
  return (
    <AuthLayoutWrapper
      title="Welcome Back"
      subtitle="Sign in to access your curated wedding planning and vendor workspace."
    >
      <Suspense fallback={<div className="h-64 flex items-center justify-center text-sm text-muted-foreground">Loading sign in portal...</div>}>
        <LoginForm />
      </Suspense>
    </AuthLayoutWrapper>
  );
}

