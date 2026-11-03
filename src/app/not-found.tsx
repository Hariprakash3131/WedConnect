import Link from "next/link";
import { Sparkles, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen mesh-gradient-bg flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full glass-card p-10 space-y-6">
        <div className="w-16 h-16 rounded-3xl gradient-brand text-white flex items-center justify-center mx-auto shadow-soft-md">
          <Sparkles className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight">404</h1>
          <h2 className="text-xl font-bold text-foreground">Page Not Found</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The celebration page you are looking for does not exist or has been relocated.
          </p>
        </div>
        <Link href="/" className="inline-block w-full">
          <Button variant="gradient" className="w-full gap-2">
            <ArrowLeft className="w-4 h-4" />
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}

