"use client";

import * as React from "react";
import { getGoogleOAuthUrl } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

interface SocialButtonsProps {
  redirectTo?: string;
}

export function SocialButtons({ redirectTo }: SocialButtonsProps) {
  const [loading, setLoading] = React.useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const res = await getGoogleOAuthUrl(redirectTo);
      if (res.error) {
        toast.error(res.error);
        setLoading(false);
        return;
      }
      if (res.url) {
        window.location.href = res.url;
      }
    } catch {
      toast.error("Failed to connect with Google. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Button
        type="button"
        variant="glass"
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="w-full h-12 flex items-center justify-center gap-3 rounded-2xl border-border/80 hover:bg-muted/50 transition-all font-medium text-sm text-foreground shadow-soft-sm"
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin text-primary" />
        ) : (
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.14z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.26 21.36 7.33 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.97 0 12s.46 3.84 1.26 5.42l4.02-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
        )}
        <span>Continue with Google</span>
      </Button>
    </div>
  );
}
