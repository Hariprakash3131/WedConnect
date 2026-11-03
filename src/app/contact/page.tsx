"use client";

import * as React from "react";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { Mail, Phone, MapPin, Sparkles, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success("Thank you! Our concierge team will reach out within 12 hours.");
    }, 1200);
  };

  return (
    <div className="min-h-screen mesh-gradient-bg flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <Badge variant="accent" className="px-4 py-1.5 text-xs font-semibold rounded-full">
                <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-500 fill-amber-500" />
                Concierge Desk
              </Badge>

              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
                We&apos;re Here to <span className="gradient-text">Help You Connect</span>
              </h1>

              <p className="text-base text-muted-foreground leading-relaxed">
                Whether you need bespoke vendor curation for a destination celebration or assistance
                with quotation comparisons, our dedicated team is at your service.
              </p>
            </div>

            {/* Direct Channels */}
            <div className="space-y-5 pt-4">
              <div className="glass-card p-5 rounded-2xl border border-border/80 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl gradient-brand text-white flex items-center justify-center shrink-0 shadow-soft-sm">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-extrabold tracking-wider text-muted-foreground">
                    Email Concierge
                  </h4>
                  <p className="text-sm font-bold text-foreground">concierge@wedconnect.app</p>
                </div>
              </div>

              <div className="glass-card p-5 rounded-2xl border border-border/80 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-secondary flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-extrabold tracking-wider text-muted-foreground">
                    Direct VIP Line
                  </h4>
                  <p className="text-sm font-bold text-foreground">+1 (800) 842-WEDD</p>
                </div>
              </div>

              <div className="glass-card p-5 rounded-2xl border border-border/80 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-extrabold tracking-wider text-muted-foreground">
                    Global Offices
                  </h4>
                  <p className="text-sm font-bold text-foreground">New York • Paris • London</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="glass-card p-8 sm:p-10 rounded-3xl border border-border/80 shadow-soft-xl">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Inquiry Received</h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Thank you for reaching out. One of our senior wedding specialists will review your
                    request and respond promptly.
                  </p>
                  <Button variant="glass" onClick={() => setSubmitted(false)} className="mt-4">
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-foreground">Send an Inquiry</h2>
                    <p className="text-xs text-muted-foreground">
                      Fill out the form below and we will respond within 12 business hours.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="name">Your Name</Label>
                      <Input id="name" required placeholder="Elena Rostova" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" required placeholder="elena@domain.com" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="topic">Topic of Inquiry</Label>
                    <select
                      id="topic"
                      className="w-full h-11 px-4 rounded-2xl border border-input/80 bg-background/80 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                    >
                      <option>General Concierge Inquiries</option>
                      <option>Vendor Partnership & Verification</option>
                      <option>Quotation & Payment Inquiries</option>
                      <option>Press & Editorial Features</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="message">How can we assist you?</Label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      placeholder="Tell us about your celebration date, destination, or partnership request..."
                      className="w-full p-4 rounded-2xl border border-input/80 bg-background/80 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="gradient"
                    disabled={loading}
                    className="w-full h-12 rounded-2xl font-bold gap-2 text-sm shadow-soft-md shadow-primary/20"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Transmitting Inquiry...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Inquiry
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

