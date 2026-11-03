"use client";

import * as React from "react";
import Link from "next/link";
import { Star, ShieldCheck, Heart, MapPin, ArrowRight } from "lucide-react";
import { FEATURED_VENDORS } from "@/constants/landing-data";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export function FeaturedVendorsSection() {
  const [favorites, setFavorites] = React.useState<Record<string, boolean>>({});

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const updated = !favorites[id];
    setFavorites({ ...favorites, [id]: updated });
    toast.success(updated ? "Added to your shortlist" : "Removed from shortlist");
  };

  return (
    <section className="py-20 lg:py-28 bg-muted/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-secondary/10 text-secondary font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Masters</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
              Featured & <span className="gradient-text">Top-Rated</span> Talent
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Award-winning specialists with verified client reviews, published portfolios, and guaranteed availability.
            </p>
          </div>

          <Link
            href="/vendors"
            className="inline-flex items-center gap-2 font-semibold text-sm text-primary hover:underline underline-offset-4 group shrink-0"
          >
            <span>Explore all 2,400+ vendors</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Vendors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_VENDORS.map((vendor, index) => (
            <motion.div
              key={vendor.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <div className="group rounded-3xl overflow-hidden glass-card border border-border/80 hover:shadow-soft-xl hover:border-primary/40 transition-all duration-300 flex flex-col h-full">
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

