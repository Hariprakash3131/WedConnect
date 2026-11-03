"use client";

import * as React from "react";
import Link from "next/link";
import {
  DollarSign,
  Calendar,
  Inbox,
  Star,
  ArrowUpRight,
  TrendingUp,
  Clock,
  Sparkles,
  ChevronRight,
  Plus,
  BadgeCheck,
  CheckCircle2,
  FileText,
  MapPin,
  Film,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import {
  CURRENT_VENDOR,
  VENDOR_STATS,
  INITIAL_VENDOR_ENQUIRIES,
  INITIAL_VENDOR_BOOKINGS,
  INITIAL_VENDOR_REVIEWS,
} from "@/constants/vendor-data";
import { motion } from "framer-motion";

export default function VendorDashboardPage() {
  const recentEnquiries = INITIAL_VENDOR_ENQUIRIES.slice(0, 3);
  const upcomingBookings = INITIAL_VENDOR_BOOKINGS.slice(0, 2);
  const latestReview = INITIAL_VENDOR_REVIEWS[0];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-purple-900/90 via-indigo-900/90 to-blue-900/90 text-white shadow-soft-xl border border-white/10"
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-purple-200">
                Studio Management Suite
              </span>
              <div className="flex items-center gap-1 text-xs text-blue-200 bg-blue-500/20 px-2 py-0.5 rounded-full">
                <BadgeCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>Verified Specialist</span>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {CURRENT_VENDOR.businessName}
            </h1>
            <p className="text-white/80 text-sm max-w-xl">
              You have <span className="font-semibold text-white">5 pending inquiries</span> and{" "}
              <span className="font-semibold text-white">8 confirmed celebrations</span> scheduled this season. Your studio profile is performing in the top 3% of Manhattan filmmakers.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link href="/vendor/quotations">
              <Button
                variant="gradient"
                className="rounded-2xl h-11 px-5 text-xs font-bold gap-2 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 shadow-soft-md shadow-purple-500/30 text-white"
              >
                <Plus className="w-4 h-4" />
                <span>Create Quotation</span>
              </Button>
            </Link>
            <Link href="/vendor/availability">
              <Button
                variant="glass"
                className="rounded-2xl h-11 px-5 text-xs font-bold gap-2 text-white bg-white/10 hover:bg-white/20 border-white/20"
              >
                <Calendar className="w-4 h-4" />
                <span>Manage Dates</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Ambient glow decoration */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      </motion.div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Monthly Revenue */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="glass-card p-5 rounded-3xl relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Monthly Revenue</span>
            <div className="w-9 h-9 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black tracking-tight">{formatCurrency(VENDOR_STATS.monthlyRevenue)}</h3>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+{VENDOR_STATS.revenueGrowth}% vs last month</span>
            </div>
          </div>
        </motion.div>

        {/* Active Bookings */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="glass-card p-5 rounded-3xl relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Active Bookings</span>
            <div className="w-9 h-9 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black tracking-tight">{VENDOR_STATS.activeBookings} Events</h3>
            <p className="text-xs text-muted-foreground mt-1 font-medium">
              Next celebration in 12 days
            </p>
          </div>
        </motion.div>

        {/* Pending Inquiries */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="glass-card p-5 rounded-3xl relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Pending Inquiries</span>
            <div className="w-9 h-9 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black tracking-tight">{VENDOR_STATS.pendingEnquiries} Inquiries</h3>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-blue-600 dark:text-blue-400 font-semibold">
              <Clock className="w-3.5 h-3.5" />
              <span>Avg response: 18 mins</span>
            </div>
          </div>
        </motion.div>

        {/* Client Rating */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="glass-card p-5 rounded-3xl relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Studio Rating</span>
            <div className="w-9 h-9 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Star className="w-4 h-4 fill-amber-500" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-black tracking-tight">{VENDOR_STATS.avgRating}</h3>
              <span className="text-xs text-muted-foreground">({VENDOR_STATS.reviewsCount} verified reviews)</span>
            </div>
            <p className="text-xs text-amber-600 dark:text-amber-400 mt-1 font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Top Rated Specialist</span>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Main Grid: Enquiries + Bookings (Left) & Quick Sidebar (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Inquiries & Confirmed Bookings */}
        <div className="lg:col-span-2 space-y-8">
          {/* New Inquiries Section */}
          <div className="glass-card rounded-3xl p-6 sm:p-7 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold tracking-tight">Recent Client Inquiries</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  High-intent couples seeking your cinematography services
                </p>
              </div>
              <Link href="/vendor/enquiries">
                <Button variant="ghost" size="sm" className="h-8 rounded-xl text-xs font-bold gap-1 text-purple-600 dark:text-purple-400">
                  <span>View All ({INITIAL_VENDOR_ENQUIRIES.length})</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>

            <div className="space-y-3.5">
              {recentEnquiries.map((enq) => (
                <div
                  key={enq.id}
                  className="p-4 rounded-2xl bg-card border border-border/70 hover:border-purple-500/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  <div className="flex items-start gap-3.5">
                    <Avatar className="w-11 h-11 rounded-2xl shrink-0 border border-border/80">
                      <AvatarImage src={enq.customerAvatar} alt={enq.customerName} />
                      <AvatarFallback className="rounded-2xl font-bold text-xs bg-purple-100 text-purple-700">
                        {enq.customerName.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-foreground">{enq.customerName}</span>
                        <Badge
                          variant="secondary"
                          className="text-[10px] font-bold px-2 py-0.5 rounded-lg capitalize"
                        >
                          {enq.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {enq.eventType} • Preferred Date: <span className="font-semibold text-foreground">{enq.preferredDate}</span> • Budget: <span className="font-semibold text-foreground">{formatCurrency(enq.budget)}</span>
                      </p>
                      <p className="text-xs text-muted-foreground/90 italic line-clamp-1">
                        &ldquo;{enq.message}&rdquo;
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <Link href={`/vendor/quotations?enquiryId=${enq.id}`}>
                      <Button
                        size="sm"
                        variant="gradient"
                        className="h-8 rounded-xl text-xs font-bold gap-1.5 bg-gradient-to-r from-purple-600 to-indigo-600"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Draft Quote</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Bookings Section */}
          <div className="glass-card rounded-3xl p-6 sm:p-7 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold tracking-tight">Confirmed Upcoming Celebrations</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Signed agreements and milestone payment status
                </p>
              </div>
              <Link href="/vendor/bookings">
                <Button variant="ghost" size="sm" className="h-8 rounded-xl text-xs font-bold gap-1 text-purple-600 dark:text-purple-400">
                  <span>View All Bookings</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {upcomingBookings.map((b) => (
                <div
                  key={b.id}
                  className="p-5 rounded-2xl bg-card border border-border/70 hover:border-border transition-all space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm">{b.eventTitle}</span>
                        <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold border-none">
                          Confirmed
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Client: <span className="font-medium text-foreground">{b.customerName}</span> ({b.customerEmail})
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="font-extrabold text-sm text-foreground">{formatCurrency(b.totalAmount)}</span>
                      <p className="text-[10px] text-emerald-600 font-semibold">50% Retainer Paid</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                      <span>{b.eventDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                      <span className="truncate">{b.locationVenue}, {b.locationCity}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Film className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                      <span className="truncate">{b.packageTitle}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Column: Mini Widgets & Reputation */}
        <div className="space-y-6">
          {/* Quick Studio Actions */}
          <div className="glass-card rounded-3xl p-6 space-y-4">
            <h3 className="font-bold text-sm tracking-tight">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2.5">
              <Link href="/vendor/portfolio">
                <Button variant="outline" className="w-full h-auto py-3 rounded-2xl flex flex-col gap-1.5 text-xs font-semibold hover:border-purple-500/40">
                  <Film className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>Add Media</span>
                </Button>
              </Link>
              <Link href="/vendor/packages">
                <Button variant="outline" className="w-full h-auto py-3 rounded-2xl flex flex-col gap-1.5 text-xs font-semibold hover:border-purple-500/40">
                  <Plus className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>New Package</span>
                </Button>
              </Link>
              <Link href="/vendor/availability">
                <Button variant="outline" className="w-full h-auto py-3 rounded-2xl flex flex-col gap-1.5 text-xs font-semibold hover:border-purple-500/40">
                  <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Block Dates</span>
                </Button>
              </Link>
              <Link href="/vendor/analytics">
                <Button variant="outline" className="w-full h-auto py-3 rounded-2xl flex flex-col gap-1.5 text-xs font-semibold hover:border-purple-500/40">
                  <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Analytics</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Profile Exposure Card */}
          <div className="glass-card rounded-3xl p-6 space-y-4 bg-gradient-to-br from-purple-500/5 via-indigo-500/5 to-transparent border-purple-500/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <h3 className="font-bold text-sm">Profile Exposure</h3>
              </div>
              <Badge className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-none text-[10px]">
                Active
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black">{VENDOR_STATS.profileImpressions.toLocaleString()}</span>
                <span className="text-xs text-emerald-600 font-semibold">+18% this month</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Couples viewing your cinema films across New York and destination searches.
              </p>
            </div>
            <Link href="/vendor/profile" className="block pt-2">
              <Button variant="outline" size="sm" className="w-full rounded-xl text-xs font-bold gap-1">
                <span>Enhance Profile SEO</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>

          {/* Latest Client Review */}
          <div className="glass-card rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-amber-500">
                <Star className="w-4 h-4 fill-amber-500" />
                <span className="font-bold text-sm text-foreground">Latest Client Review</span>
              </div>
              <Link href="/vendor/reviews">
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline">
                  All Reviews
                </span>
              </Link>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <Avatar className="w-8 h-8 rounded-xl">
                  <AvatarImage src={latestReview.customerAvatar} />
                  <AvatarFallback className="text-[10px] font-bold">
                    {latestReview.customerName.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-xs font-bold text-foreground">{latestReview.customerName}</h4>
                  <p className="text-[10px] text-muted-foreground">{latestReview.createdAt}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground italic line-clamp-3">
                &ldquo;{latestReview.comment}&rdquo;
              </p>
              <div className="pt-2 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Replied by Studio
                </span>
                <Link href="/vendor/reviews" className="text-purple-600 dark:text-purple-400 font-medium hover:underline">
                  View Reply
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

