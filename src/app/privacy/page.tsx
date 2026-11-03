import type { Metadata } from "next";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "WedConnect data protection, privacy terms, and GDPR/CCPA compliance.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen mesh-gradient-bg flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
        <div className="glass-card p-8 sm:p-12 rounded-3xl border border-border/80 shadow-soft-sm space-y-8">
          <div className="space-y-2 border-b border-border/60 pb-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Privacy Policy
            </h1>
            <p className="text-xs text-muted-foreground">
              Last updated: November 3, 2026 • WedConnect Inc.
            </p>
          </div>

          <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-foreground">1. Introduction & Scope</h2>
              <p>
                WedConnect (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to protecting your privacy.
                This Privacy Policy describes how we collect, use, process, and disclose your information,
                including personal information, in conjunction with your access to and use of the WedConnect platform.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-foreground">2. Information We Collect</h2>
              <p>
                When you register as a Customer or Vendor, we collect contact details (full name, email address, phone number),
                event preferences (headcounts, planned celebration dates, estimated budgets, aesthetic preferences),
                and vendor portfolio artifacts. Payment information is securely processed through PCI-DSS compliant
                gateways and is never stored unencrypted on our servers.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-foreground">3. How We Use Information</h2>
              <p>
                We use collected information to provide and refine our matching algorithm, deliver itemized quotations,
                facilitate real-time communications between couples and verified wedding professionals, process
                transaction milestones, and comply with applicable legal obligations.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-foreground">4. Row Level Security & Storage</h2>
              <p>
                WedConnect uses Supabase PostgreSQL with strict Row Level Security (RLS). Users can only access
                data explicitly permitted by their assigned role (Customer, Vendor, Admin, Super Admin). All session tokens
                are stored in HttpOnly secure cookies.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-foreground">5. Contact Our Privacy Office</h2>
              <p>
                If you have inquiries regarding your personal data or wish to exercise your GDPR/CCPA data rights,
                please email privacy@wedconnect.app.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

