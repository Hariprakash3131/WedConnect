"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Sparkles, Calendar, DollarSign, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchStore } from "@/store/search-store";
import { LANDING_CATEGORIES } from "@/constants/landing-data";

export function HeroSearch() {
  const router = useRouter();
  const { setCategorySlug, setCity, setSearchQuery } = useSearchStore();

  const [category, setCategory] = React.useState<string>("");
  const [location, setLocation] = React.useState<string>("");
  const [budgetTier, setBudgetTier] = React.useState<string>("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (category) setCategorySlug(category);
    if (location) setCity(location);
    if (category || location) setSearchQuery(`${category} ${location}`.trim());

    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (location) params.set("city", location);
    if (budgetTier) params.set("budget", budgetTier);

    router.push(`/vendors${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const handleQuickTag = (categorySlug: string) => {
    setCategorySlug(categorySlug);
    router.push(`/vendors?category=${categorySlug}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Airbnb-Inspired Segmented Search Container */}
      <form
        onSubmit={handleSearch}
        className="glass-card p-2 sm:p-2.5 rounded-3xl sm:rounded-full border border-border/80 shadow-soft-xl flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
      >
        {/* Segment 1: Category */}
        <div className="flex-1 px-4 py-2 hover:bg-muted/40 rounded-2xl sm:rounded-full transition-colors group cursor-pointer">
          <label className="block text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors">
            Service / Category
          </label>
          <div className="flex items-center gap-2 mt-0.5">
            <Sparkles className="w-4 h-4 text-primary shrink-0" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-transparent text-sm font-semibold text-foreground focus:outline-none cursor-pointer"
            >
              <option value="" className="bg-background text-foreground">
                All Wedding Services
              </option>
              {LANDING_CATEGORIES.map((cat) => (
                <option key={cat.slug} value={cat.slug} className="bg-background text-foreground">
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Vertical divider */}
        <div className="hidden sm:block h-8 w-px bg-border/80" />

        {/* Segment 2: Location */}
        <div className="flex-1 px-4 py-2 hover:bg-muted/40 rounded-2xl sm:rounded-full transition-colors group cursor-pointer">
          <label className="block text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors">
            Destination / City
          </label>
          <div className="flex items-center gap-2 mt-0.5">
            <MapPin className="w-4 h-4 text-secondary shrink-0" />
            <input
              type="text"
              placeholder="e.g. New York, Paris, Como"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-transparent text-sm font-semibold text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
            />
          </div>
        </div>

        {/* Vertical divider */}
        <div className="hidden sm:block h-8 w-px bg-border/80" />

        {/* Segment 3: Budget Range */}
        <div className="flex-1 px-4 py-2 hover:bg-muted/40 rounded-2xl sm:rounded-full transition-colors group cursor-pointer">
          <label className="block text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors">
            Estimated Budget
          </label>
          <div className="flex items-center gap-2 mt-0.5">
            <DollarSign className="w-4 h-4 text-amber-500 shrink-0" />
            <select
              value={budgetTier}
              onChange={(e) => setBudgetTier(e.target.value)}
              className="w-full bg-transparent text-sm font-semibold text-foreground focus:outline-none cursor-pointer"
            >
              <option value="" className="bg-background text-foreground">
                Any Budget
              </option>
              <option value="boutique" className="bg-background text-foreground">
                Boutique ($2,000 - $8,000)
              </option>
              <option value="luxe" className="bg-background text-foreground">
                Luxury ($8,000 - $25,000)
              </option>
              <option value="grand" className="bg-background text-foreground">
                Grand Gala ($25,000+)
              </option>
            </select>
          </div>
        </div>

        {/* Search Submit Button */}
        <Button
          type="submit"
          variant="gradient"
          className="h-12 sm:h-14 sm:w-14 rounded-2xl sm:rounded-full flex items-center justify-center p-0 shrink-0 shadow-soft-md shadow-primary/30 group hover:scale-105 transition-transform"
          aria-label="Search vendors"
        >
          <Search className="w-5 h-5 text-white transition-transform group-hover:scale-110" />
          <span className="sm:hidden font-semibold text-sm ml-2">Find Wedding Pros</span>
        </Button>
      </form>

      {/* Quick Search Tag Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs font-semibold text-muted-foreground">
        <span className="text-[11px] uppercase tracking-wider text-muted-foreground/70 mr-1">
          Popular:
        </span>
        <button
          type="button"
          onClick={() => handleQuickTag("venues")}
          className="px-3 py-1 rounded-full glass-panel hover:bg-primary/10 hover:text-primary transition-all cursor-pointer"
        >
          🏰 Historic Castles & Estates
        </button>
        <button
          type="button"
          onClick={() => handleQuickTag("photography")}
          className="px-3 py-1 rounded-full glass-panel hover:bg-primary/10 hover:text-primary transition-all cursor-pointer"
        >
          📸 Editorial Photographers
        </button>
        <button
          type="button"
          onClick={() => handleQuickTag("decoration")}
          className="px-3 py-1 rounded-full glass-panel hover:bg-primary/10 hover:text-primary transition-all cursor-pointer"
        >
          ✨ Floral Architects
        </button>
        <button
          type="button"
          onClick={() => handleQuickTag("catering")}
          className="px-3 py-1 rounded-full glass-panel hover:bg-primary/10 hover:text-primary transition-all cursor-pointer"
        >
          🍷 Michelin Caterers
        </button>
      </div>
    </div>
  );
}

