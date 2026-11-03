"use client";

import * as React from "react";
import Link from "next/link";
import {
  Calendar,
  Sparkles,
  FileText,
  BookmarkCheck,
  ArrowRight,
  MapPin,
  Users,
  DollarSign,
  Plus,
  Clock,
  ShieldCheck,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MOCK_CUSTOMER_EVENTS, MOCK_QUOTATIONS, MOCK_BOOKINGS } from "@/constants/customer-data";
import { FEATURED_VENDORS } from "@/constants/landing-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";

export default function CustomerDashboardPage() {
  const user = useAuthStore((state) => state.user);
  const primaryEvent = MOCK_CUSTOMER_EVENTS[0];

  // Calculate days remaining to primary event
  const daysUntilEvent = Math.max(
    0,
    Math.ceil(
      (new Date(primaryEvent.eventDate).getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24)
    )
  );

  return (
    <div className="space-y-8">
      {/* Welcome Banner Card */}
      <div className="relative rounded-3xl overflow-hidden gradient-brand p-6 sm:p-10 text-white shadow-soft-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Celebration Countdown</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Welcome, {user?.full_name || "Audrey & Liam"}!
            </h1>
            <p className="text-sm sm:text-base text-white/80 max-w-xl leading-relaxed">
              Your celebration <span className="font-bold text-white">&ldquo;{primaryEvent.title}&rdquo;</span> is in{" "}
              <strong className="text-white text-lg underline underline-offset-4">
                {daysUntilEvent} days
              </strong>
              . You have 2 quotations awaiting your review.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/customer/quotations">
              <Button className="bg-white text-primary hover:bg-white/90 font-bold rounded-2xl shadow-soft-sm text-xs h-11 px-5">
                Review Quotations
              </Button>
            </Link>
            <Link href="/customer/events/new">
              <Button variant="glass" className="text-white border-white/30 hover:bg-white/10 font-bold rounded-2xl text-xs h-11 px-5">
                <Plus className="w-4 h-4 mr-1.5" />
                New Event
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Top 4 Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="glass-card border-border/80">
          <CardHeader className="p-5 pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-xs font-extrabold uppercase tracking-wider">
                Active Events
              </CardDescription>
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-primary flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <CardTitle className="text-2xl font-extrabold">{MOCK_CUSTOMER_EVENTS.length}</CardTitle>
          </CardHeader>
          <CardContent className="p-5 pt-0 text-xs text-muted-foreground">
            1 in Planning • 1 Active
          </CardContent>
        </Card>

        <Card className="glass-card border-border/80">
          <CardHeader className="p-5 pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-xs font-extrabold uppercase tracking-wider">
                Pending Quotes
              </CardDescription>
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
            </div>
            <CardTitle className="text-2xl font-extrabold">2</CardTitle>
          </CardHeader>
          <CardContent className="p-5 pt-0 text-xs text-amber-600 font-semibold">
            Action needed: Review & compare
          </CardContent>
        </Card>

        <Card className="glass-card border-border/80">
          <CardHeader className="p-5 pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-xs font-extrabold uppercase tracking-wider">
                Confirmed Bookings
              </CardDescription>
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <BookmarkCheck className="w-4 h-4" />
              </div>
            </div>
            <CardTitle className="text-2xl font-extrabold">{MOCK_BOOKINGS.length}</CardTitle>
          </CardHeader>
          <CardContent className="p-5 pt-0 text-xs text-emerald-600 font-semibold">
            Venue & Catering Secured
          </CardContent>
        </Card>

        <Card className="glass-card border-border/80">
          <CardHeader className="p-5 pb-2">
            <div className="flex items-center justify-between">
              <CardDescription className="text-xs font-extrabold uppercase tracking-wider">
                Total Budget
              </CardDescription>
              <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-secondary flex items-center justify-center">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <CardTitle className="text-2xl font-extrabold">
              {formatCurrency(primaryEvent.budget)}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 pt-0 text-xs text-muted-foreground">
            Committed: $27,552 (42%)
          </CardContent>
        </Card>
      </div>

      {/* Main Grid: Active Event Details & Quotations Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Primary Event Card & Budget Tracker */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="glass-card border-border/80">
            <CardHeader className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <Badge variant="luxury" className="text-[10px] uppercase font-bold py-0.5 px-2.5 mb-2">
                    Primary Celebration
                  </Badge>
                  <CardTitle className="text-xl font-bold">{primaryEvent.title}</CardTitle>
                  <CardDescription className="text-xs mt-1">
                    {primaryEvent.notes}
                  </CardDescription>
                </div>
                <Link href="/customer/events">
                  <Button variant="glass" size="sm" className="rounded-xl text-xs font-semibold">
                    Manage
                  </Button>
                </Link>
              </div>
            </CardHeader>

            <CardContent className="p-6 pt-0 space-y-6">
              {/* Event Meta Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-muted/40 text-xs">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <div>
                    <span className="text-muted-foreground block text-[10px]">Date</span>
                    <strong className="text-foreground">{formatDate(primaryEvent.eventDate)}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-secondary" />
                  <div>
                    <span className="text-muted-foreground block text-[10px]">Location</span>
                    <strong className="text-foreground">{primaryEvent.locationVenue}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-500" />
                  <div>
                    <span className="text-muted-foreground block text-[10px]">Guest Count</span>
                    <strong className="text-foreground">{primaryEvent.guestCount} Guests</strong>
                  </div>
                </div>
              </div>

              {/* Budget Allocation Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span>Budget Allocation Progress</span>
                  <span className="text-primary">$27,552 of {formatCurrency(primaryEvent.budget)} (42%)</span>
                </div>
                <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full gradient-brand w-[42%]" />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <Link href="/customer/matched-vendors">
                  <Button variant="gradient" size="sm" className="rounded-xl text-xs font-bold gap-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>View 18 Matched Vendors</span>
                  </Button>
                </Link>
                <Link href="/customer/quotations">
                  <span className="text-xs font-semibold text-primary hover:underline">
                    Compare Quotations &rarr;
                  </span>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Quick Bookings Preview */}
          <Card className="glass-card border-border/80">
            <CardHeader className="p-6 pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-bold">Confirmed Vendors</CardTitle>
                  <CardDescription className="text-xs">Secured contracts and milestone tracking</CardDescription>
                </div>
                <Link href="/customer/bookings">
                  <span className="text-xs font-semibold text-primary hover:underline">View All</span>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0 space-y-3">
              {MOCK_BOOKINGS.map((b) => (
                <div
                  key={b.id}
                  className="p-4 rounded-2xl bg-muted/40 border border-border/60 flex items-center justify-between gap-4 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <strong className="text-sm text-foreground">{b.vendorName}</strong>
                      <Badge variant={b.status === "confirmed" ? "success" : "accent"} className="text-[10px]">
                        {b.status.replace("_", " ")}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">{b.category} • Ref: {b.bookingReference}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-extrabold text-foreground block text-sm">
                      {formatCurrency(b.totalAmount)}
                    </span>
                    <span className="text-[10px] text-muted-foreground">Deposit Paid</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Pending Quotations Alert & Shortlist */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="glass-card border-border/80">
            <CardHeader className="p-6 pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-bold">Quotations Awaiting Action</CardTitle>
                  <CardDescription className="text-xs">Compare deliverables and accept contracts</CardDescription>
                </div>
                <Link href="/customer/quotations">
                  <span className="text-xs font-semibold text-primary hover:underline">Compare</span>
                </Link>
              </div>
            </CardHeader>

            <CardContent className="p-6 pt-0 space-y-4">
              {MOCK_QUOTATIONS.filter((q) => q.status === "sent").map((q) => (
                <div
                  key={q.id}
                  className="p-4 rounded-2xl border border-primary/20 bg-primary/5 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-foreground">{q.vendorName}</h4>
                      <p className="text-[11px] text-muted-foreground">{q.vendorCategory}</p>
                    </div>
                    <span className="font-extrabold text-base text-primary">
                      {formatCurrency(q.totalAmount)}
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground line-clamp-1">
                    Includes: {q.items.map((i) => i.description).join(", ")}
                  </p>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-500" />
                      Valid until {formatDate(q.validUntil)}
                    </span>

                    <Link href={`/customer/quotations?compare=${q.id}`}>
                      <Button variant="gradient" size="sm" className="h-8 text-xs rounded-xl px-3 font-semibold">
                        Review & Accept
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Recommended Specialists */}
          <Card className="glass-card border-border/80">
            <CardHeader className="p-6 pb-3">
              <CardTitle className="text-lg font-bold">Recommended for Your Celebration</CardTitle>
              <CardDescription className="text-xs">Based on your aesthetic in {primaryEvent.locationCity}</CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0 space-y-3">
              {FEATURED_VENDORS.slice(0, 2).map((v) => (
                <div key={v.id} className="flex items-center justify-between p-3 rounded-2xl bg-muted/40 gap-3">
                  <img
                    src={v.imageUrl}
                    alt={v.businessName}
                    className="w-12 h-12 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-xs truncate text-foreground">{v.businessName}</h5>
                    <p className="text-[11px] text-muted-foreground">{v.category}</p>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-amber-500">
                      <Star className="w-3 h-3 fill-current" />
                      <span>{v.rating.toFixed(2)}</span>
                    </div>
                  </div>
                  <Link href={`/vendors/${v.id}`}>
                    <Button variant="glass" size="sm" className="h-8 text-[11px] rounded-xl px-3">
                      View
                    </Button>
                  </Link>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

