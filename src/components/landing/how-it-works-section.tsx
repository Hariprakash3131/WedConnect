"use client";

import * as React from "react";
import { TIMELINE_STEPS } from "@/constants/landing-data";
import { Sparkles, Calendar, MessageSquare, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export function HowItWorksSection() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Calendar":
        return <Calendar className="w-5 h-5 text-primary" />;
      case "Sparkles":
        return <Sparkles className="w-5 h-5 text-secondary" />;
      case "MessageSquare":
        return <MessageSquare className="w-5 h-5 text-amber-500" />;
      case "CheckCircle":
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      default:
        return <Sparkles className="w-5 h-5 text-primary" />;
    }
  };

  return (
    <section id="how-it-works" className="py-20 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-accent/15 text-accent-foreground dark:text-amber-300 font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The WedConnect Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            From Vision to Celebration in <span className="gradient-text">Four Easy Steps</span>
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            We removed the chaos from wedding planning. Connect, negotiate, compare, and book with complete transparency.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {TIMELINE_STEPS.map((step, idx) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="relative"
            >
              <div className="glass-card p-6 sm:p-8 rounded-3xl border border-border/80 h-full flex flex-col justify-between space-y-6 hover:shadow-soft-xl hover:border-primary/40 transition-all duration-300">
                <div className="space-y-4">
                  {/* Step Header */}
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-extrabold gradient-text">
                      {step.step}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-muted/60 flex items-center justify-center shadow-soft-sm">
                      {getIcon(step.icon)}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-foreground tracking-tight">
                    {step.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-2">
                  <span className="inline-block px-3 py-1 rounded-full bg-muted text-[11px] font-bold text-foreground">
                    {step.badge}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <Link href="/auth/register">
            <Button variant="gradient" size="lg" className="rounded-2xl px-8 font-semibold gap-2 shadow-soft-md shadow-primary/20">
              Start Planning Free
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

