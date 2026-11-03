"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  Database,
  Zap,
  ArrowRight,
  CheckCircle2,
  Cpu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
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

export default function HomePage() {
  return (
    <div className="relative min-h-screen mesh-gradient-bg overflow-hidden flex flex-col justify-between">
      {/* Dynamic ambient lights */}
      <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-primary/20 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-[30%] right-[-100px] w-[500px] h-[500px] bg-secondary/15 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-[-100px] left-[-50px] w-[600px] h-[400px] bg-accent/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      {/* Luxury Minimal Navigation Bar */}
      <header className="sticky top-0 z-40 w-full glass-nav border-b border-border/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl gradient-brand flex items-center justify-center shadow-soft-md shadow-primary/25">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                WedConnect
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                v1.0 Pro
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Badge variant="luxury" className="px-3.5 py-1 text-xs">
              Phase 1: Project Setup Ready
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-16 sm:py-24 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto space-y-8"
        >
          {/* Tagline Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2">
            <Badge variant="accent" className="px-4 py-1.5 text-sm rounded-full font-medium shadow-soft-sm">
              <Sparkles className="w-4 h-4 mr-1.5 text-amber-500 fill-amber-500" />
              Every Event. Every Celebration. One Connection.
            </Badge>
          </motion.div>

          {/* Luxury Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.12]"
          >
            The Premier Platform For{" "}
            <span className="gradient-text">Unforgettable</span> Celebrations
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Architected with Next.js 15 App Router, React 19, Supabase PostgreSQL,
            strict RLS, and an MCP agentic tool ecosystem.
          </motion.p>

          {/* Quick CTA Actions */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <Button
              size="lg"
              variant="gradient"
              className="group gap-2 text-base px-8 py-6 rounded-2xl shadow-soft-md shadow-primary/20 hover:scale-[1.02] transition-transform"
            >
              Explore Architecture
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="glass"
              className="gap-2 text-base px-8 py-6 rounded-2xl border-border/80"
            >
              <Database className="w-4 h-4 text-primary" />
              18 Production Tables
            </Button>
          </motion.div>
        </motion.div>

        {/* Phase 1 Verification Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {/* Stack Card */}
          <motion.div variants={itemVariants}>
            <Card className="h-full border border-border/60 backdrop-blur-xl">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-primary flex items-center justify-center mb-2">
                  <Zap className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl">Modern Stack</CardTitle>
                <CardDescription>Cutting-edge frontend & backend</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Next.js 15 (App Router)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>React 19 & TypeScript</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Tailwind CSS & Shadcn UI</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Framer Motion & Lucide Icons</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Database Card */}
          <motion.div variants={itemVariants}>
            <Card className="h-full border border-border/60 backdrop-blur-xl">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-secondary flex items-center justify-center mb-2">
                  <Database className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl">Supabase DB</CardTitle>
                <CardDescription>PostgreSQL with complete RLS</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>18 Production Tables</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>UUIDs on all entities</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Automated triggers & ratings</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Soft delete & Audit logs</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* MCP Ecosystem Card */}
          <motion.div variants={itemVariants}>
            <Card className="h-full border border-border/60 backdrop-blur-xl">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-2">
                  <Cpu className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl">MCP Connectors</CardTitle>
                <CardDescription>Model Context Protocol tools</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>13 Modular Connectors</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Supabase, Resend, Mapbox</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Playwright & Context7</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Sequential Thinking & Memory</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Security Card */}
          <motion.div variants={itemVariants}>
            <Card className="h-full border border-border/60 backdrop-blur-xl">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-2">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl">Enterprise Security</CardTitle>
                <CardDescription>RBAC & Multi-role architecture</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>5 Roles (Customer, Vendor, Admin...)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>SSR Session Cookies</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Zod Schema Validation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Audit Logging & CSRF guard</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-border/40 py-8 text-center text-sm text-muted-foreground glass-panel mt-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} WedConnect Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-foreground cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">Security</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
