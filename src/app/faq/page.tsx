import type { Metadata } from "next";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { FaqSection } from "@/components/landing/faq-section";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Answers to common questions regarding wedding planning, vendor booking, and quotation comparisons on WedConnect.",
};

export default function FaqPage() {
  return (
    <div className="min-h-screen mesh-gradient-bg flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 w-full py-12">
        <FaqSection />
      </main>

      <Footer />
    </div>
  );
}

