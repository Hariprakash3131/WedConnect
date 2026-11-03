"use client";

import * as React from "react";
import { Star, Quote, Heart } from "lucide-react";
import { TESTIMONIALS } from "@/constants/landing-data";
import { motion } from "framer-motion";

export function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold text-xs uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Real Couple Stories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            Loved By Couples <span className="gradient-text">Across The World</span>
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            Discover how brides, grooms, and event hosts brought their dream celebrations to life with WedConnect.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card p-8 rounded-3xl border border-border/80 flex flex-col justify-between space-y-6 hover:shadow-soft-xl transition-all duration-300 relative"
            >
              <Quote className="w-10 h-10 text-primary/20 absolute top-6 right-6 pointer-events-none" />

              <div className="space-y-4">
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-sm text-foreground/90 italic leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-border/60 flex items-center gap-3.5">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.names}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
                />
                <div>
                  <h4 className="font-bold text-sm text-foreground">{testimonial.names}</h4>
                  <p className="text-xs text-primary font-medium">{testimonial.event}</p>
                  <p className="text-[11px] text-muted-foreground">{testimonial.city}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

