"use client";

import * as React from "react";
import Link from "next/link";
import { Heart, Star, ShieldCheck, MapPin, Send, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FEATURED_VENDORS } from "@/constants/landing-data";
import { formatCurrency } from "@/lib/utils";
import toast from "react-hot-toast";

export default function FavoritesPage() {
  const [shortlist, setShortlist] = React.useState(FEATURED_VENDORS.slice(0, 3));

  const handleRemove = (id: string, name: string) => {
    setShortlist(shortlist.filter((v) => v.id !== id));
    toast.success(`Removed ${name} from your shortlist`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold text-xs uppercase tracking-wider mb-2">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Shortlisted Specialists</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Saved Favorites ({shortlist.length})
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Specialists bookmarked for your celebrations. Review profiles and request quotations.
          </p>
        </div>

        <Link href="/vendors">
          <Button variant="glass" size="sm" className="rounded-xl text-xs font-semibold gap-1.5">
            <span>Discover More Pros</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </div>

      {shortlist.length === 0 ? (
        <div className="glass-card p-12 rounded-3xl border border-border/80 text-center space-y-4 my-8">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto">
            <Heart className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-foreground">Your shortlist is empty</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Browse our directory and click the heart icon on any specialist card to save them to your shortlist.
          </p>
          <Link href="/vendors">
            <Button variant="gradient" className="mt-2 text-xs font-bold">
              Browse Vendor Directory
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shortlist.map((vendor) => (
            <Card
              key={vendor.id}
              className="glass-card border-border/80 overflow-hidden flex flex-col justify-between hover:shadow-soft-xl transition-all duration-300"
            >
              <div className="relative aspect-[16/10] bg-muted overflow-hidden">
                <img
                  src={vendor.imageUrl}
                  alt={vendor.businessName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5">
                  <Badge variant="luxury" className="text-[10px] uppercase font-bold py-0.5 px-2">
                    {vendor.category}
                  </Badge>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemove(vendor.id, vendor.businessName)}
                  className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:text-rose-500 hover:scale-110 transition-transform"
                  aria-label="Remove from favorites"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="absolute bottom-3 left-3 text-white text-xs font-semibold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{vendor.city}</span>
                </div>
              </div>

              <CardContent className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg text-foreground truncate">{vendor.businessName}</h3>
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{vendor.rating.toFixed(2)}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {vendor.tagline}
                  </p>
                </div>

                <div className="pt-3 border-t border-border/60 flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground">
                    From {formatCurrency(vendor.startingPrice, vendor.currency)}
                  </span>

                  <Link href={`/vendors/${vendor.id}`}>
                    <Button variant="gradient" size="sm" className="rounded-xl text-xs font-semibold">
                      View Profile
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

