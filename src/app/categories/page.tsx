import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { LANDING_CATEGORIES } from "@/constants/landing-data";
import { formatCurrency } from "@/lib/utils";
import { Sparkles, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Vendor Categories",
  description: "Browse all curated luxury wedding service categories: Venues, Photography, Catering, Decor, Planners, and more.",
};

export default function CategoriesPage() {
  return (
    <div className="min-h-screen mesh-gradient-bg flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <Badge variant="accent" className="px-4 py-1.5 text-xs font-semibold rounded-full">
            <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-500 fill-amber-500" />
            Specialized Categories
          </Badge>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Explore Celebration <span className="gradient-text">Disciplines</span>
          </h1>

          <p className="text-base text-muted-foreground leading-relaxed">
            From palatial European villas to editorial fashion-forward photographers,
            every category on WedConnect features only vetted master artisans.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {LANDING_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/vendors?category=${cat.slug}`}
              className="group block relative rounded-3xl overflow-hidden glass-card border border-border/80 hover:shadow-soft-xl hover:border-primary/40 transition-all duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[11px] font-bold border border-white/10">
                  {cat.count} Pros
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-extrabold text-lg tracking-tight group-hover:text-blue-300 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-white/70 line-clamp-1 mt-0.5">
                    {cat.description}
                  </p>
                </div>
              </div>

              <div className="p-4 flex items-center justify-between text-xs">
                <span className="text-muted-foreground font-medium">Starting from</span>
                <span className="font-bold text-foreground">
                  {formatCurrency(cat.startingPrice)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

