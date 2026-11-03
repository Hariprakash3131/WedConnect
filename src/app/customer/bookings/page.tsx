"use client";

import * as React from "react";
import Link from "next/link";
import {
  BookmarkCheck,
  Calendar,
  DollarSign,
  MapPin,
  Star,
  MessageSquare,
  CheckCircle2,
  Clock,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MOCK_BOOKINGS } from "@/constants/customer-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import toast from "react-hot-toast";

export default function BookingsPage() {
  const handleDownloadContract = (ref: string) => {
    toast.success(`Downloading contract agreement for ${ref}...`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2">
            <BookmarkCheck className="w-3.5 h-3.5" />
            <span>Confirmed Contracts</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Bookings & Milestones
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Track confirmed vendors, payment deposit schedules, and celebration execution.
          </p>
        </div>
      </div>

      {/* Bookings List */}
      <div className="space-y-6">
        {MOCK_BOOKINGS.map((booking) => (
          <Card key={booking.id} className="glass-card border-border/80 overflow-hidden">
            <CardHeader className="p-6 pb-4 bg-muted/20 border-b border-border/60">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-primary">
                      {booking.bookingReference}
                    </span>
                    <Badge
                      variant={booking.status === "confirmed" ? "success" : "accent"}
                      className="text-[10px] uppercase font-bold"
                    >
                      {booking.status.replace("_", " ")}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold">{booking.vendorName}</CardTitle>
                  <CardDescription className="text-xs">{booking.category} • {booking.city}</CardDescription>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-xs text-muted-foreground font-medium block">Total Contract</span>
                  <span className="text-2xl font-extrabold text-foreground">
                    {formatCurrency(booking.totalAmount)}
                  </span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-muted/40 text-xs">
                <div className="space-y-0.5">
                  <span className="text-muted-foreground block text-[10px]">Celebration</span>
                  <strong className="text-foreground">{booking.eventTitle}</strong>
                </div>

                <div className="space-y-0.5">
                  <span className="text-muted-foreground block text-[10px]">Execution Date</span>
                  <strong className="text-foreground">{formatDate(booking.confirmedDate)}</strong>
                </div>

                <div className="space-y-0.5">
                  <span className="text-muted-foreground block text-[10px]">Deposit Secured</span>
                  <strong className="text-emerald-600 dark:text-emerald-400 font-bold">
                    {formatCurrency(booking.depositAmount)} (30%)
                  </strong>
                </div>
              </div>

              {/* Status Timeline Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="flex items-center gap-1.5 text-foreground">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    Contract Active & Date Reserved
                  </span>
                  <span className="text-muted-foreground">Remaining: {formatCurrency(booking.totalAmount - booking.depositAmount)}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-emerald-500 w-[30%]" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-border/60">
                <div className="flex items-center gap-2">
                  <Link href={`/customer/bookings/${booking.id}`}>
                    <Button variant="default" size="sm" className="h-9 rounded-xl text-xs font-bold gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-soft-sm">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Timeline & Escrow</span>
                    </Button>
                  </Link>

                  <Button
                    variant="glass"
                    size="sm"
                    onClick={() => handleDownloadContract(booking.bookingReference)}
                    className="h-9 rounded-xl text-xs font-semibold gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Agreement</span>
                  </Button>

                  <Link href={`/customer/chat`}>
                    <Button variant="glass" size="sm" className="h-9 rounded-xl text-xs font-semibold gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-primary" />
                      <span>Chat</span>
                    </Button>
                  </Link>
                </div>

                <Link href="/customer/reviews">
                  <Button variant="gradient" size="sm" className="h-9 rounded-xl text-xs font-bold gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>Leave a Review</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

