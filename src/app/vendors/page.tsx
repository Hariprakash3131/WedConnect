"use client";

import * as React from "react";
import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { FEATURED_VENDORS, LANDING_CATEGORIES } from "@/constants/landing-data";
import { formatCurrency } from "@/lib/utils";
import {
  Search,
  MapPin,
  Star,
  ShieldCheck,
  Heart,
  ArrowRight,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import toast from "react-hot-toast";

function VendorsListingContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const cityParam = searchParams.get("city");

  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState(categoryParam || "");
  const [selectedCity, setSelectedCity] = React.useState(cityParam || "");
  const [verifiedOnly, setVerifiedOnly] = React.useState(false);
  const [sortBy, setSortBy] = React.useState("rating");
  const [favorites, setFavorites] = React.useState<Record<string, boolean>>({});

  React.useEffect(() => {
    if (categoryParam) setSelectedCategory(categoryParam);
    if (cityParam) setSelectedCity(cityParam);
  }, [categoryParam, cityParam]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const updated = !favorites[id];
    setFavorites({ ...favorites, [id]: updated });
    toast.success(updated ? "Added to shortlist" : "Removed from shortlist");
  };

  // Filter vendors based on criteria
  const filteredVendors = React.useMemo(() => {
    return FEATURED_VENDORS.filter((vendor) => {
      if (selectedCategory && vendor.categorySlug !== selectedCategory) {
        return false;
      }
      if (selectedCity && !vendor.city.toLowerCase().includes(selectedCity.toLowerCase())) {
        return false;
      }
      if (verifiedOnly && !vendor.isVerified) {
        return false;
      }
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = vendor.businessName.toLowerCase().includes(query);
        const matchesTagline = vendor.tagline.toLowerCase().includes(query);
        const matchesCity = vendor.city.toLowerCase().includes(query);
        if (!matchesName && !matchesTagline && !matchesCity) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "price_asc") return a.startingPrice - b.startingPrice;
      if (sortBy === "price_desc") return b.startingPrice - a.startingPrice;
      if (sortBy === "reviews") return b.reviewsCount - a.reviewsCount;
      return 0;
    });
  }, [selectedCategory, selectedCity, verifiedOnly, searchQuery, sortBy]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedCity("");
    setVerifiedOnly(false);
    setSortBy("rating");
  };

  return (
    <div className="space-y-8">
      {/* Filters & Search Toolbar */}
      <div className="glass-card p-4 sm:p-6 rounded-3xl border border-border/80 shadow-soft-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search Input */}
          <div className="relative">
            <Input
              placeholder="Search by vendor name or craft..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-4 h-4" />}
              className="h-11"
            />
          </div>

          {/* Category Select */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full h-11 px-4 rounded-2xl border border-input/80 bg-background/80 text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
            >
              <option value="">All Categories</option>
              {LANDING_CATEGORIES.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Destination/City */}
          <div className="relative">
            <Input
              placeholder="Filter by city..."
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              icon={<MapPin className="w-4 h-4" />}
              className="h-11"
            />
          </div>

          {/* Sort Dropdown */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full h-11 px-4 rounded-2xl border border-input/80 bg-background/80 text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
            >
              <option value="rating">Highest Rated ★</option>
              <option value="reviews">Most Reviewed</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Quick Toggles */}
        <div className="flex flex-wrap items-center justify-between pt-2 border-t border-border/60 gap-4 text-xs">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="verifiedOnly"
              checked={verifiedOnly}
              onCheckedChange={(checked) => setVerifiedOnly(!!checked)}
            />
            <label htmlFor="verifiedOnly" className="font-semibold text-foreground cursor-pointer flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              Show Verified Pros Only
            </label>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-muted-foreground font-medium">
              Showing <strong className="text-foreground">{filteredVendors.length}</strong> matching specialists
            </span>

            {(selectedCategory || selectedCity || searchQuery || verifiedOnly) && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1 font-bold text-primary hover:underline"
              >
                <RotateCcw className="w-3 h-3" />
                Reset filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Vendors Grid */}
      {filteredVendors.length === 0 ? (
        <div className="glass-card p-12 rounded-3xl border border-border/80 text-center space-y-4 my-8">
          <div className="w-14 h-14 rounded-2xl bg-muted/80 text-muted-foreground flex items-center justify-center mx-auto">
            <Search className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-foreground">No matching vendors found</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Try adjusting your search criteria or clearing filters to see our full roster of specialists.
          </p>
          <Button variant="gradient" onClick={resetFilters} className="mt-2">
            Clear All Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVendors.map((vendor) => (
            <div
              key={vendor.id}
              className="group rounded-3xl overflow-hidden glass-card border border-border/80 hover:shadow-soft-xl hover:border-primary/40 transition-all duration-300 flex flex-col h-full"
            >
              {/* Visual Cover Header */}
              <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                <img
                  src={vendor.imageUrl}
                  alt={vendor.businessName}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

                {/* Top Badges */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                  <Badge variant="luxury" className="text-[10px] uppercase font-bold py-0.5 px-2.5">
                    {vendor.category}
                  </Badge>
                  {vendor.isVerified && (
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified</span>
                    </div>
                  )}
                </div>

                {/* Favorite Button */}
                <button
                  type="button"
                  onClick={(e) => toggleFavorite(vendor.id, e)}
                  className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:scale-110 transition-transform"
                  aria-label="Save to favorites"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      favorites[vendor.id] ? "fill-rose-500 text-rose-500" : "text-white"
                    }`}
                  />
                </button>

                {/* City Location */}
                <div className="absolute bottom-3 left-3.5 flex items-center gap-1.5 text-white text-xs font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-white/80" />
                  <span>
                    {vendor.city}, {vendor.country}
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {vendor.businessName}
                    </h3>
                    {/* Rating */}
                    <div className="flex items-center gap-1 text-xs font-bold text-foreground">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{vendor.rating.toFixed(2)}</span>
                      <span className="text-muted-foreground font-normal">
                        ({vendor.reviewsCount})
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {vendor.tagline}
                  </p>
                </div>

                {/* Price & Action Footer */}
                <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium block">
                      Starting from
                    </span>
                    <span className="text-base font-extrabold text-foreground">
                      {formatCurrency(vendor.startingPrice, vendor.currency)}
                    </span>
                  </div>

                  <Link href={`/vendors/${vendor.id}`}>
                    <Button variant="glass" size="sm" className="rounded-xl font-semibold text-xs gap-1.5">
                      <span>View Profile</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function VendorsListingPage() {
  return (
    <div className="min-h-screen mesh-gradient-bg flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
        {/* Header */}
        <div className="space-y-3 mb-8">
          <Badge variant="accent" className="px-3.5 py-1 text-xs font-semibold rounded-full">
            <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-500 fill-amber-500" />
            Curated Directory
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            Explore Verified <span className="gradient-text">Wedding Specialists</span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
            Browse through award-winning venues, photographers, caterers, and decorators. Compare
            quotations and connect in real time.
          </p>
        </div>

        {/* Suspense Wrapped Content */}
        <Suspense
          fallback={
            <div className="h-64 flex items-center justify-center text-sm font-semibold text-muted-foreground">
              Loading curated wedding specialists...
            </div>
          }
        >
          <VendorsListingContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
