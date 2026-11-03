"use client";

import * as React from "react";
import { STATS_METRICS } from "@/constants/landing-data";
import { motion } from "framer-motion";

export function StatsSection() {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden bg-primary/5 dark:bg-primary/10 border-y border-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS_METRICS.map((metric, idx) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card p-6 sm:p-8 rounded-3xl border border-border/80 text-center space-y-2 hover:shadow-soft-xl transition-all duration-300"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold gradient-text tracking-tight">
                {metric.value}
              </div>
              <div className="font-bold text-base text-foreground">
                {metric.label}
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

