import type { Metadata } from "next";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { Sparkles, Shield, Heart, Award, Users, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about WedConnect's mission to connect extraordinary couples with verified luxury wedding specialists worldwide.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen mesh-gradient-bg flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-6 mb-20">
          <Badge variant="accent" className="px-4 py-1.5 text-xs font-semibold rounded-full">
            <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-500 fill-amber-500" />
            Our Heritage & Vision
          </Badge>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground">
            Connecting Visionary Artists With <span className="gradient-text">Unforgettable Celebrations</span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            WedConnect was founded with a singular conviction: every monumental celebration deserves
            seamless discovery, transparent quotations, and unwavering trust between couples and wedding masters.
          </p>
        </div>

        {/* Core Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="glass-card p-8 rounded-3xl border border-border/80 space-y-4 shadow-soft-sm">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Rigorous Curation</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We vet every vendor before approving their public showcase. Only artists with proven portfolios,
              verified licenses, and exceptional client track records become Verified Pros.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl border border-border/80 space-y-4 shadow-soft-sm">
            <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Transparent Quotations</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              No hidden markups or obscure fees. Compare itemized line items, deliverables, and payment
              milestones side-by-side with complete peace of mind.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl border border-border/80 space-y-4 shadow-soft-sm">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-600 flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Uncompromised Luxury</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              From historic French châteaux and Italian cliffside villas to Vogue-acclaimed cinematographers,
              we bring the world&apos;s finest celebration specialists to your fingertips.
            </p>
          </div>
        </div>

        {/* Global Impact Numbers */}
        <div className="glass-card p-8 sm:p-14 rounded-3xl border border-border/80 text-center space-y-8 mb-20">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            WedConnect by the Numbers
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold gradient-text">10,000+</div>
              <p className="text-xs text-muted-foreground mt-1">Weddings Coordinated</p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold gradient-text">42</div>
              <p className="text-xs text-muted-foreground mt-1">Countries Represented</p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold gradient-text">2,400+</div>
              <p className="text-xs text-muted-foreground mt-1">Verified Wedding Pros</p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold gradient-text">99.8%</div>
              <p className="text-xs text-muted-foreground mt-1">Couple Satisfaction</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

