import type { Metadata } from "next";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "WedConnect terms of service, platform agreements, and booking cancellation policies.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen mesh-gradient-bg flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
        <div className="glass-card p-8 sm:p-12 rounded-3xl border border-border/80 shadow-soft-sm space-y-8">
          <div className="space-y-2 border-b border-border/60 pb-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Terms of Service
            </h1>
            <p className="text-xs text-muted-foreground">
              Last updated: November 3, 2026 • WedConnect Inc.
            </p>
          </div>

          <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-foreground">1. Acceptance of Terms</h2>
              <p>
                By creating an account, browsing listings, or exchanging quotations on WedConnect, you
                agree to be bound by these Terms of Service. If you do not agree to these terms, you may
                not access or use the platform.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-foreground">2. Marketplace Role</h2>
              <p>
                WedConnect operates as a luxury connection platform facilitating introductions, messaging,
                quotations, and booking confirmations between event hosts (&ldquo;Customers&rdquo;) and independent wedding
                professionals (&ldquo;Vendors&rdquo;). WedConnect is not an employer or agent of any Vendor.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-foreground">3. Quotations & Confirmations</h2>
              <p>
                Quotations issued by Vendors represent binding offers for the scope, deliverables, and validity
                window stated therein. Once accepted by the Customer and confirmed by the Vendor, a binding
                service contract is established according to the specified milestone terms.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-foreground">4. Vendor Verification & Representations</h2>
              <p>
                Vendors warrant that all portfolio images, descriptions, awards, and certifications displayed
                on their profile represent genuine original work or authorized studio deliverables. Misrepresentation
                results in immediate suspension and revocation of Verified Pro status.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-foreground">5. Termination & Disputes</h2>
              <p>
                Either party may terminate their account at any time. Disputes arising between Customers and
                Vendors are subject to our Concierge Resolution protocol before initiating external arbitration.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

