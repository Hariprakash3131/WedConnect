import type { Metadata } from "next";
import Link from "next/link";
import { AuthLayoutWrapper } from "@/features/auth/components/auth-layout-wrapper";
import { MailCheck, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Verify Your Email",
  description: "Check your email for confirmation instructions to activate your WedConnect account.",
};

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;

  return (
    <AuthLayoutWrapper
      title="Verify Your Email"
      subtitle="Almost there! Please verify your email address to unlock your account."
    >
      <div className="space-y-6 text-center">
        <div className="w-16 h-16 rounded-3xl gradient-brand text-white flex items-center justify-center mx-auto shadow-soft-md">
          <MailCheck className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-foreground">Verification link sent</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We sent a secure verification link to{" "}
            <span className="font-semibold text-foreground">
              {email || "your registered email"}
            </span>
            . Open the link to confirm your account and get started.
          </p>
        </div>

        <div className="pt-4 space-y-3">
          <Link href="/auth/login" className="inline-block w-full">
            <Button variant="gradient" className="w-full h-11 text-sm font-semibold">
              Return to Sign In
            </Button>
          </Link>

          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </AuthLayoutWrapper>
  );
}

