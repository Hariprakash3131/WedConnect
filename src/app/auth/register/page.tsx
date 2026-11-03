import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthLayoutWrapper } from "@/features/auth/components/auth-layout-wrapper";
import { RegisterForm } from "@/features/auth/components/register-form";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Join WedConnect as a customer planning a wedding or as a verified vendor offering services.",
};

export default function RegisterPage() {
  return (
    <AuthLayoutWrapper
      title="Create an Account"
      subtitle="Connect with premier vendors or showcase your services to thousands of couples."
    >
      <Suspense fallback={<div className="h-64 flex items-center justify-center text-sm text-muted-foreground">Loading registration portal...</div>}>
        <RegisterForm />
      </Suspense>
    </AuthLayoutWrapper>
  );
}

