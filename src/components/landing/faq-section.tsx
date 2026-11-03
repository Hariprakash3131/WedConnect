"use client";

import * as React from "react";
import Link from "next/link";
import { FAQ_ITEMS } from "@/constants/landing-data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, ArrowRight } from "lucide-react";

export function FaqSection() {
  return (
    <section id="faq" className="py-20 lg:py-28 bg-muted/20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            Everything you need to know about finding vendors, requesting quotations, and securing bookings.
          </p>
        </div>

        {/* Accordion List */}
        <div className="glass-card p-6 sm:p-10 rounded-3xl border border-border/80 shadow-soft-sm">
          <Accordion type="single" collapsible className="w-full">
            {FAQ_ITEMS.map((item, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger className="text-base sm:text-lg font-bold text-foreground">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Still have questions */}
        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground">
            Have more questions about our concierge matching service?{" "}
            <Link
              href="/contact"
              className="font-bold text-primary hover:underline underline-offset-4 inline-flex items-center gap-1"
            >
              <span>Contact our team</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

