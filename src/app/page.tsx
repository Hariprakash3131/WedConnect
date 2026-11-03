import { Navbar } from "@/components/landing/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { CategoriesSection } from "@/components/landing/categories-section";
import { FeaturedVendorsSection } from "@/components/landing/featured-vendors-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { StatsSection } from "@/components/landing/stats-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { FaqSection } from "@/components/landing/faq-section";
import { CtaSection } from "@/components/landing/cta-section";
import { Footer } from "@/components/landing/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen mesh-gradient-bg flex flex-col justify-between">
      {/* Sticky Luxury Navbar */}
      <Navbar />

      <main className="flex-1 w-full">
        {/* Large Hero Section with Animated Segmented Search */}
        <HeroSection />

        {/* Curated Celebration Categories */}
        <CategoriesSection />

        {/* Featured & Top-Rated Vetted Vendors */}
        <FeaturedVendorsSection />

        {/* Interactive How It Works Celebration Timeline */}
        <HowItWorksSection />

        {/* Statistics & Milestone Metrics */}
        <StatsSection />

        {/* Real Couple Testimonials & Reviews */}
        <TestimonialsSection />

        {/* Frequently Asked Questions */}
        <FaqSection />

        {/* High-Impact Luxury CTA */}
        <CtaSection />
      </main>

      {/* Comprehensive Luxury Footer */}
      <Footer />
    </div>
  );
}
