"use client";

import * as React from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Sparkles, Star, ShieldCheck, Heart, ArrowRight, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HeroSearch } from "./hero-search";

const heroVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export function HeroSection() {
  return (
    <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden">
      {/* Dynamic ambient lighting orbs */}
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-primary/20 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-[35%] right-[-120px] w-[500px] h-[500px] bg-secondary/15 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-[60%] left-[-150px] w-[600px] h-[500px] bg-accent/15 blur-[160px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto space-y-8"
        >
          {/* Top Award Pill */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2">
            <Badge variant="accent" className="px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-full shadow-soft-sm">
              <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-500 fill-amber-500" />
              Every Event. Every Celebration. One Connection.
            </Badge>
          </motion.div>

          {/* Large Hero Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.12]"
          >
            Curate Your Dream Day With The World&apos;s Finest{" "}
            <span className="gradient-text">Wedding Masters</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Discover verified luxury venues, editorial photographers, Michelin-starred caterers,
            and visionary designers. Compare bespoke quotations in one seamless marketplace.
          </motion.p>

          {/* Hero Search Box */}
          <motion.div variants={itemVariants} className="pt-4">
            <HeroSearch />
          </motion.div>

          {/* Trust Highlights */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 pt-4 text-xs font-semibold text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>100% Vetted & Verified Professionals</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>4.98/5 Average Verified Couple Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>No Hidden Fees • Instant Direct Chat</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating Luxury Showcase Cards (Desktop/Tablet) */}
        <div className="relative mt-16 max-w-5xl mx-auto hidden md:block">
          {/* Main Visual Background Preview Frame */}
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/20 relative aspect-[21/9]">
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop"
              alt="WedConnect Luxury Wedding Celebration"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            <div className="absolute bottom-6 left-8 text-white space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold">
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                <span>Featured Destination: Lake Como, Italy</span>
              </div>
              <h3 className="text-xl font-bold">Villa del Balbianello Matrimony</h3>
            </div>
          </div>

          {/* Floating Pill 1: Verified Booking Confirmed */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute -bottom-8 -left-6 glass-card p-4 rounded-2xl shadow-soft-xl border border-border/80 flex items-center gap-3.5 max-w-xs animate-float"
          >
            <div className="w-12 h-12 rounded-xl gradient-brand text-white flex items-center justify-center shrink-0 shadow-soft-sm">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-1 text-[11px] font-bold uppercase text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Booking Confirmed</span>
              </div>
              <p className="text-xs font-bold text-foreground">Aura Cinematic Stories</p>
              <p className="text-[11px] text-muted-foreground">Signed for Oct 18, 2026</p>
            </div>
          </motion.div>

          {/* Floating Pill 2: Quotation Comparison Ready */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute -top-6 -right-6 glass-card p-4 rounded-2xl shadow-soft-xl border border-border/80 flex items-center gap-3 max-w-xs"
          >
            <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
              <Star className="w-5 h-5 fill-amber-500" />
            </div>
            <div>
              <p className="text-xs font-bold text-foreground">3 Custom Quotes Received</p>
              <p className="text-[11px] text-muted-foreground">Side-by-side comparison ready</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

