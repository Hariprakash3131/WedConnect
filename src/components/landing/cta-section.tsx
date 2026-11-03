"use client";

import * as React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Heart, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden gradient-brand p-8 sm:p-14 lg:p-20 text-white shadow-soft-xl">
          {/* Subtle Ambient Orbs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs sm:text-sm font-semibold">
              <Sparkles className="w-4 h-4 fill-white text-white" />
              <span>Begin Your Journey Today</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Ready to Craft an Unforgettable Celebration?
            </h2>

            <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              Join thousands of couples creating their dream weddings with vetted luxury vendors.
              Or list your services and connect with high-intent clients worldwide.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/auth/register" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white text-primary hover:bg-white/95 font-bold px-8 py-6 rounded-2xl shadow-soft-md gap-2"
                >
                  <Heart className="w-4 h-4 fill-primary text-primary" />
                  Plan an Event Free
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>

              <Link href="/auth/register" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="glass"
                  className="w-full sm:w-auto text-white border-white/30 hover:bg-white/10 font-bold px-8 py-6 rounded-2xl gap-2"
                >
                  <Briefcase className="w-4 h-4" />
                  Join as a Vendor Pro
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

