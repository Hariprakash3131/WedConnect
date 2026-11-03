import type { Metadata } from "next";
import { AuthLayoutWrapper } from "@/features/auth/components/auth-layout-wrapper";
import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Reset your WedConnect account password.",
};

export default function ForgotPasswordPage() {
  return (
    <AuthLayoutWrapper
      title="Reset Password"
      subtitle="Enter your email address and we'll send you recovery instructions."
    >
      <ForgotPasswordForm />
    </AuthLayoutWrapper>
  );
}
