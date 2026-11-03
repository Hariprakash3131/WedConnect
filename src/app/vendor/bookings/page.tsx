"use client";

import * as React from "react";
import Link from "next/link";
import {
  BookmarkCheck,
  Calendar,
  MapPin,
  DollarSign,
  Phone,
  Mail,
  Film,
  Download,
  CheckCircle2,
  Clock,
  ChevronRight,
  ShieldCheck,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  INITIAL_VENDOR_BOOKINGS,
  VendorBookingItem,
} from "@/constants/vendor-data";
import { updateBookingStatusAction } from "@/actions/vendor";
import { formatCurrency } from "@/lib/utils";
import toast from "react-hot-toast";

type FilterStatus = "all" | "confirmed" | "in_progress" | "completed";

export default function VendorBookingsPage() {
  const [bookings, setBookings] = React.useState<VendorBookingItem[]>(INITIAL_VENDOR_BOOKINGS);
  const [filter, setFilter] = React.useState<FilterStatus>("all");

  const filtered = filter === "all"
    ? bookings
    : bookings.filter((b) => b.status === filter);

  const handleUpdateStatus = async (id: string, newStatus: VendorBookingItem["status"]) => {
    try {
      await updateBookingStatusAction(id, newStatus);
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
      );
      toast.success(`Booking status updated to ${newStatus}`);
    } catch {
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
      );
      toast.success(`Booking status updated`);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Confirmed Bookings</h1>
            <Badge className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-none font-bold text-xs">
              {bookings.length} Active Contracts
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Track signed contracts, production timelines, client retainers, and final balance milestones.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {(["all", "confirmed", "in_progress", "completed"] as const).map((tab) => {
          const count = tab === "all" ? bookings.length : bookings.filter((b) => b.status === tab).length;
          const isActive = filter === tab;

          return (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 ${
                isActive
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-soft-sm shadow-purple-500/25"
                  : "bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <span className="capitalize">{tab.replace("_", " ")}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-muted"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bookings List */}
      <div className="space-y-6">
        {filtered.map((b) => (
          <div
            key={b.id}
            className="p-6 rounded-3xl glass-card border border-border/80 shadow-soft-sm hover:border-purple-500/30 transition-all space-y-6"
          >
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-extrabold text-lg text-foreground">{b.eventTitle}</span>
                  <Badge variant="outline" className="text-xs font-mono font-bold">
                    {b.bookingReference}
                  </Badge>
                  <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-none font-bold text-xs capitalize">
                    {b.status.replace("_", " ")}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Couple: <strong className="text-foreground">{b.customerName}</strong> • {b.customerEmail} • {b.customerPhone}
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-2xl font-black tracking-tight text-foreground">
                  {formatCurrency(b.totalAmount)}
                </span>
                <p className="text-[11px] text-emerald-600 font-semibold flex items-center sm:justify-end gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Deposit Paid ({formatCurrency(b.depositAmount)})
                </p>
              </div>
            </div>

            {/* Event Coordinates */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-muted/40 text-xs">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                <div>
                  <span className="text-muted-foreground block text-[10px] uppercase font-bold">Celebration Date</span>
                  <strong className="text-foreground">{b.eventDate}</strong>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                <div>
                  <span className="text-muted-foreground block text-[10px] uppercase font-bold">Venue & City</span>
                  <strong className="text-foreground">{b.locationVenue}, {b.locationCity}</strong>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Film className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                <div>
                  <span className="text-muted-foreground block text-[10px] uppercase font-bold">Contracted Package</span>
                  <strong className="text-foreground">{b.packageTitle}</strong>
                </div>
              </div>
            </div>

            {/* Milestone Breakdown */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Payment Milestones & Execution Schedule
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {b.milestones.map((ms, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-background/60 border border-border/60 flex items-center justify-between"
                  >
                    <div className="space-y-0.5">
                      <span className="font-bold text-foreground">{ms.title}</span>
                      <p className="text-[11px] text-muted-foreground">Due: {ms.dueDate}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-extrabold text-foreground">{formatCurrency(ms.amount)}</span>
                      <Badge
                        className={`text-[9px] font-bold block mt-0.5 border-none uppercase ${
                          ms.status === "paid"
                            ? "bg-emerald-500/10 text-emerald-600"
                            : ms.status === "due"
                            ? "bg-amber-500/10 text-amber-600"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {ms.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Studio Execution Notes */}
            {b.notes && (
              <div className="p-3.5 rounded-2xl bg-purple-500/5 border border-purple-500/20 text-xs text-muted-foreground">
                <strong className="text-foreground font-bold">Production Notes: </strong>
                {b.notes}
              </div>
            )}

            {/* Actions Bar */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              <Link href={`/vendor/chat?client=${encodeURIComponent(b.customerName)}`}>
                <Button variant="ghost" size="sm" className="rounded-xl text-xs font-bold gap-1.5 text-purple-600 dark:text-purple-400">
                  <MessageSquare className="w-4 h-4" />
                  <span>Message Client</span>
                </Button>
              </Link>

              <div className="flex items-center gap-2">
                <Link href={`/vendor/bookings/${b.id}`}>
                  <Button variant="default" size="sm" className="rounded-xl text-xs font-bold gap-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-soft-sm">
                    <Film className="w-3.5 h-3.5" />
                    <span>Production Hub</span>
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toast.success(`Downloading signed contract agreement for ${b.bookingReference}`)}
                  className="rounded-xl text-xs font-bold gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Signed Contract PDF</span>
                </Button>

                {b.status === "confirmed" && (
                  <Button
                    variant="gradient"
                    size="sm"
                    onClick={() => handleUpdateStatus(b.id, "in_progress")}
                    className="rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600"
                  >
                    Start Production
                  </Button>
                )}
                {b.status === "in_progress" && (
                  <Button
                    variant="gradient"
                    size="sm"
                    onClick={() => handleUpdateStatus(b.id, "completed")}
                    className="rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    Mark as Delivered
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

