import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { FEATURED_VENDORS } from "@/constants/landing-data";
import { formatCurrency } from "@/lib/utils";
import {
  Star,
  ShieldCheck,
  MapPin,
  Heart,
  Share2,
  Calendar,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Clock,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const vendor = FEATURED_VENDORS.find((v) => v.id === id) || FEATURED_VENDORS[0];

  return {
    title: `${vendor.businessName} — ${vendor.category}`,
    description: vendor.tagline,
  };
}

export default async function VendorDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const vendor = FEATURED_VENDORS.find((v) => v.id === id) || FEATURED_VENDORS[0];

  if (!vendor) {
    notFound();
  }

  const packages = [
    {
      title: "Signature Collection",
      price: vendor.startingPrice,
      description: "Essential full-day coverage with primary master artist and curated delivery.",
      deliverables: [
        "Full celebration coverage (up to 8 hours)",
        "Lead master professional + 1 senior assistant",
        "Online high-resolution proofing portal",
        "Private digital gallery with cloud archival",
        "Standard delivery within 30 days",
      ],
      popular: false,
    },
    {
      title: "Haute Luxe Collection",
      price: vendor.startingPrice * 1.6,
      description: "Our most requested bespoke tier for comprehensive multi-day celebrations.",
      deliverables: [
        "Unlimited wedding day coverage + welcome dinner",
        "Lead master + 2 senior specialists",
        "Express 72-hour preview highlights",
        "Handcrafted Italian leather heirloom album",
        "Drone 4K cinematic aerials included",
        "Private VIP concierge coordination",
      ],
      popular: true,
    },
    {
      title: "Grand Royal Edition",
      price: vendor.startingPrice * 2.8,
      description: "Uncompromised turnkey experience designed for destination weekend matrimonies.",
      deliverables: [
        "3-day turnkey coverage (Welcome, Ceremony, After-party)",
        "Full creative team of 5 artists",
        "Same-day celebration edit film",
        "Bespoke museum-grade archival albums for parents",
        "Worldwide destination travel & logistics included",
      ],
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen mesh-gradient-bg flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full space-y-8">
        {/* Header Breadcrumbs & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-xs font-semibold text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link href="/vendors" className="hover:text-foreground">Vendors</Link>
            <span>/</span>
            <span className="text-foreground">{vendor.businessName}</span>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="glass" size="sm" className="h-9 gap-1.5 rounded-xl text-xs font-bold">
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </Button>
            <Button variant="glass" size="sm" className="h-9 gap-1.5 rounded-xl text-xs font-bold text-rose-500">
              <Heart className="w-3.5 h-3.5 fill-rose-500" />
              <span>Shortlist</span>
            </Button>
          </div>
        </div>

        {/* Gallery Hero Banner */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[350px] sm:h-[480px] rounded-3xl overflow-hidden shadow-soft-xl border border-border/80">
          <div className="md:col-span-8 relative h-full bg-muted">
            <img
              src={vendor.imageUrl}
              alt={vendor.businessName}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-white space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="luxury">{vendor.category}</Badge>
                {vendor.isVerified && (
                  <Badge variant="success" className="gap-1 font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Pro
                  </Badge>
                )}
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                {vendor.businessName}
              </h1>
              <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {vendor.city}, {vendor.country}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  {vendor.rating.toFixed(2)} ({vendor.reviewsCount} reviews)
                </span>
              </div>
            </div>
          </div>

          <div className="hidden md:grid md:col-span-4 grid-rows-2 gap-4 h-full">
            <div className="relative overflow-hidden bg-muted rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=800&auto=format&fit=crop"
                alt="Showcase 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative overflow-hidden bg-muted rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop"
                alt="Showcase 2"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Main Content & Sticky Inquiry Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Tabs & Information */}
          <div className="lg:col-span-8 space-y-8">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full justify-start rounded-2xl p-1 bg-muted/60">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="packages">Packages & Pricing</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({vendor.reviewsCount})</TabsTrigger>
              </TabsList>

              {/* Tab 1: Overview */}
              <TabsContent value="overview" className="space-y-6 pt-4">
                <div className="glass-card p-6 sm:p-8 rounded-3xl border border-border/80 space-y-4">
                  <h3 className="text-xl font-bold text-foreground">About the Artist</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {vendor.tagline}. With over {vendor.yearsOfExperience} years of experience
                    delivering bespoke celebrations across Europe and North America, our studio
                    blends contemporary artistic vision with uncompromising luxury service.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-border/60">
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground font-medium">Experience</span>
                      <p className="text-sm font-bold text-foreground">{vendor.yearsOfExperience}+ Years</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground font-medium">Verified Status</span>
                      <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">100% Verified</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground font-medium">Response Time</span>
                      <p className="text-sm font-bold text-foreground">&lt; 4 Hours</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Tab 2: Packages */}
              <TabsContent value="packages" className="space-y-6 pt-4">
                <div className="space-y-6">
                  {packages.map((pkg) => (
                    <div
                      key={pkg.title}
                      className={`glass-card p-6 sm:p-8 rounded-3xl border transition-all ${
                        pkg.popular
                          ? "border-primary ring-2 ring-primary/20 shadow-soft-xl"
                          : "border-border/80"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xl font-bold text-foreground">{pkg.title}</h4>
                            {pkg.popular && (
                              <Badge variant="luxury" className="text-[10px] uppercase font-bold">
                                Most Popular
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{pkg.description}</p>
                        </div>
                        <div className="text-left sm:text-right">
                          <span className="text-2xl font-extrabold text-foreground block">
                            {formatCurrency(pkg.price)}
                          </span>
                          <span className="text-[11px] text-muted-foreground font-medium">All deliverables included</span>
                        </div>
                      </div>

                      <div className="space-y-2 pt-4 border-t border-border/60">
                        {pkg.deliverables.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-6">
                        <Link href={`/auth/login?redirect=/customer/enquiries/new?vendorId=${vendor.id}`}>
                          <Button
                            variant={pkg.popular ? "gradient" : "glass"}
                            className="w-full sm:w-auto font-bold rounded-xl text-xs px-6"
                          >
                            Request Quote For This Package
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Tab 3: Reviews */}
              <TabsContent value="reviews" className="space-y-6 pt-4">
                <div className="glass-card p-6 sm:p-8 rounded-3xl border border-border/80 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">Client Testimonials</h3>
                      <p className="text-xs text-muted-foreground">Verified reviews from couples</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-lg font-extrabold text-foreground">
                      <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                      <span>{vendor.rating.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-border/60">
                    <div className="p-4 rounded-2xl bg-muted/40 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-foreground">Sophia & William</span>
                        <div className="flex items-center text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed italic">
                        &ldquo;Booking {vendor.businessName} through WedConnect was the single best decision we made for our wedding. The attention to detail, professionalism, and resulting artistry exceeded all expectations.&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right: Sticky Booking & Quote Card */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-border/80 shadow-soft-xl space-y-6">
              <div className="space-y-1">
                <span className="text-xs uppercase font-extrabold tracking-wider text-muted-foreground">
                  Starting Investment
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-foreground">
                    {formatCurrency(vendor.startingPrice, vendor.currency)}
                  </span>
                  <span className="text-xs text-muted-foreground font-semibold">per celebration</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <Link
                  href={`/auth/login?redirect=/customer/enquiries/new?vendorId=${vendor.id}`}
                  className="inline-block w-full"
                >
                  <Button
                    variant="gradient"
                    size="lg"
                    className="w-full rounded-2xl font-bold shadow-soft-md shadow-primary/20 text-sm gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    Request Custom Quotation
                  </Button>
                </Link>

                <Link
                  href={`/auth/login?redirect=/customer/chat?vendorId=${vendor.id}`}
                  className="inline-block w-full"
                >
                  <Button
                    variant="glass"
                    size="lg"
                    className="w-full rounded-2xl font-bold text-sm gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Chat Directly with Artist
                  </Button>
                </Link>
              </div>

              <div className="pt-4 border-t border-border/60 space-y-2 text-[11px] text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Free cancellation within 48 hours of booking</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Payment protected with milestone contracts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>No markup or surprise agency fees</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

