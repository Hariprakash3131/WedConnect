"use client";

import * as React from "react";
import Link from "next/link";
import { Sparkles, ArrowLeft, Star, Heart } from "lucide-react";
import { motion } from "framer-motion";

interface AuthLayoutWrapperProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayoutWrapper({ children, title, subtitle }: AuthLayoutWrapperProps) {
  return (
    <div className="relative min-h-screen mesh-gradient-bg flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Background ambient lighting orbs */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-primary/20 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-secondary/20 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Auth Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="lg:col-span-7 w-full"
        >
          <div className="glass-card p-6 sm:p-10 rounded-3xl shadow-soft-xl border-border/80">
            {/* Header: Brand & Back link */}
            <div className="flex items-center justify-between mb-8">
              <Link href="/" className="inline-flex items-center space-x-2.5 group">
                <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center shadow-soft-sm text-white group-hover:scale-105 transition-transform">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                  WedConnect
                </span>
              </Link>

              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-1.5 mb-8">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                {title}
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {subtitle}
              </p>
            </div>

            {/* Auth Form Children */}
            {children}
          </div>
        </motion.div>

        {/* Right Side: Luxury Brand Showcase & Testimonial (Desktop) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="hidden lg:flex lg:col-span-5 flex-col justify-between space-y-8 p-8 rounded-3xl gradient-brand text-white shadow-soft-xl relative overflow-hidden min-h-[580px]"
        >
          {/* Subtle decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-2xl pointer-events-none" />

          {/* Top badge */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold">
              <Heart className="w-3.5 h-3.5 fill-white text-white" />
              <span>Curated Excellence</span>
            </div>
            <div className="flex items-center gap-1 text-amber-300">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-300 text-amber-300" />
              ))}
            </div>
          </div>

          {/* Middle quote */}
          <div className="relative z-10 space-y-4 my-auto">
            <h2 className="text-3xl font-bold leading-tight tracking-tight">
              “Every event deserves a seamless, breathtaking journey.”
            </h2>
            <p className="text-sm text-white/80 leading-relaxed">
              Connect with vetted wedding photographers, venues, caterers, and decorators.
              Manage quotes, timelines, and communications in one luxury platform.
            </p>
          </div>

          {/* Bottom user badge */}
          <div className="relative z-10 pt-4 border-t border-white/20 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
              AL
            </div>
            <div>
              <div className="font-semibold text-sm">Audrey & Liam</div>
              <div className="text-xs text-white/70">Planned wedding in Manhattan, NY</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
