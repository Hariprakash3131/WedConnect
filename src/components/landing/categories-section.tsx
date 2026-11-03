"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { LANDING_CATEGORIES } from "@/constants/landing-data";
import { formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";

export function CategoriesSection() {
  return (
    <section id="categories" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Disciplines</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
              Every Category. <span className="gradient-text">Exceptional Quality.</span>
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Explore handpicked professionals vetted for artistry, professionalism, and flawless execution.
            </p>
          </div>

          <Link
            href="/categories"
            className="inline-flex items-center gap-2 font-semibold text-sm text-primary hover:underline underline-offset-4 group shrink-0"
          >
            <span>Browse all categories</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {LANDING_CATEGORIES.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
            >
              <Link
                href={`/vendors?category=${cat.slug}`}
                className="group block relative rounded-3xl overflow-hidden glass-card border border-border/70 hover:shadow-soft-xl hover:border-primary/40 transition-all duration-300"
              >
                {/* Category Image Cover */}
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={cat.imageUrl}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Top Count Pill */}
                  <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[11px] font-bold border border-white/10">
                    {cat.count} Pros
                  </div>

                  {/* Bottom Text Over Image */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-extrabold text-lg tracking-tight group-hover:text-blue-300 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-white/70 line-clamp-1 mt-0.5">
                      {cat.description}
                    </p>
                  </div>
                </div>

                {/* Card Bottom Bar */}
                <div className="p-4 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground font-medium">Starting from</span>
                  <span className="font-bold text-foreground">
                    {formatCurrency(cat.startingPrice)}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

