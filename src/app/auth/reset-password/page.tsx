import type { Metadata } from "next";
import { AuthLayoutWrapper } from "@/features/auth/components/auth-layout-wrapper";
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";

export const metadata: Metadata = {
  title: "Update Password",
  description: "Set a new secure password for your WedConnect account.",
};

export default function ResetPasswordPage() {
  return (
    <AuthLayoutWrapper
      title="Create New Password"
      subtitle="Ensure your new password contains at least 8 characters, an uppercase letter, and a number."
    >
      <ResetPasswordForm />
    </AuthLayoutWrapper>
  );
}

