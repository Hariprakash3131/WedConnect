"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
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
  ShieldCheck,
  ArrowLeft,
  Film,
  Building,
  Check,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import toast from "react-hot-toast";

const LIFECYCLE_STEPS = [
  { step: 1, title: "Event Created", desc: "Celebration preferences defined" },
  { step: 2, title: "Vendor Matching", desc: "Curated specialist matching" },
  { step: 3, title: "Enquiry Sent", desc: "Date & capacity request" },
  { step: 4, title: "Consultation Chat", desc: "Creative vision aligned" },
  { step: 5, title: "Quotation Received", desc: "Itemized formal proposal" },
  { step: 6, title: "Customer Accept", desc: "Contract executed & escrow funded" },
  { step: 7, title: "Vendor Confirmation", desc: "Date locked & countersigned" },
  { step: 8, title: "Celebration Day", desc: "Event execution" },
  { step: 9, title: "Review & Escrow Close", desc: "Testimonial & release" },
];

export default function CustomerBookingDetailPage() {
  const params = useParams();
  const bookingId = (params?.id as string) || "bk-2026-7841";

  // Active booking mock state
  const booking = {
    id: bookingId,
    bookingReference: "BK-2026-7841",
    vendorName: "Aura Cinematic Stories",
    vendorCategory: "Photography & Cinema",
    city: "New York, NY",
    eventTitle: "Audrey & Liam Grand Wedding",
    eventDate: "2026-10-18",
    venue: "The Plaza Hotel",
    totalAmount: 7076.88,
    depositAmount: 3538.44,
    currentStep: 7, // Vendor Confirmed
    status: "confirmed",
    milestones: [
      { title: "50% Booking Retainer (In Escrow)", amount: 3538.44, dueDate: "2026-10-24", status: "paid" },
      { title: "Final Balance (Due 14 Days Prior)", amount: 3538.44, dueDate: "2026-10-04", status: "upcoming" },
    ],
  };

  const handleDownload = () => {
    toast.success(`Downloading legally executed contract for ${booking.bookingReference}...`);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Return to bookings */}
      <div className="flex items-center justify-between">
        <Link
          href="/customer/bookings"
          className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Bookings</span>
        </Link>

        <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-none font-bold text-xs gap-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          Escrow Active & Insured
        </Badge>
      </div>

      {/* Booking Header */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-border/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs font-bold text-purple-600 dark:text-purple-400">
                {booking.bookingReference}
              </span>
              <Badge className="bg-emerald-500/10 text-emerald-600 border-none font-bold text-xs capitalize">
                {booking.status}
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 text-foreground">
              {booking.vendorName}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {booking.vendorCategory} • {booking.venue}, {booking.city}
            </p>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs font-bold text-muted-foreground block">Total Investment</span>
            <span className="text-3xl font-black text-foreground">{formatCurrency(booking.totalAmount)}</span>
            <p className="text-xs text-emerald-600 font-semibold mt-0.5">
              Deposit Secured in Escrow: {formatCurrency(booking.depositAmount)}
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-border/60 flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            className="rounded-xl text-xs font-bold gap-1.5 h-9"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Signed Agreement PDF</span>
          </Button>

          <Link href="/customer/chat">
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl text-xs font-bold gap-1.5 h-9 text-purple-600 dark:text-purple-400"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Direct Vendor Chat</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Interactive 9-Step Booking Lifecycle Visualizer */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-border/80 space-y-6">
        <div>
          <h2 className="text-lg font-bold tracking-tight">Complete Celebration Booking Lifecycle</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Step-by-step progression from initial event creation through escrow resolution
          </p>
        </div>

        <div className="relative pl-6 sm:pl-8 border-l-2 border-border/80 space-y-8">
          {LIFECYCLE_STEPS.map((step) => {
            const isCompleted = step.step <= booking.currentStep;
            const isCurrent = step.step === booking.currentStep;

            return (
              <div key={step.step} className="relative group">
                {/* Step indicator circle */}
                <div
                  className={`absolute -left-[31px] sm:-left-[39px] top-0.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                    isCompleted
                      ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-soft-sm shadow-emerald-500/30"
                      : "bg-muted border border-border text-muted-foreground"
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : step.step}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4
                      className={`text-sm font-extrabold ${
                        isCurrent
                          ? "text-purple-600 dark:text-purple-400"
                          : isCompleted
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {step.title}
                    </h4>
                    {isCurrent && (
                      <Badge className="bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[9px] font-bold border-none uppercase">
                        Current Stage
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Milestone Escrow Schedule */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-border/80 space-y-5">
        <div>
          <h2 className="text-lg font-bold tracking-tight">Payment Milestone Escrow Breakdown</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Milestones and escrow payout authorizations
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {booking.milestones.map((ms, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-card border border-border/70 flex flex-col justify-between gap-3 text-xs"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-sm text-foreground">{ms.title}</span>
                  <Badge
                    className={`text-[9px] font-bold uppercase border-none ${
                      ms.status === "paid" ? "bg-emerald-500/10 text-emerald-600" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {ms.status}
                  </Badge>
                </div>
                <p className="text-muted-foreground mt-1">Due Date: {ms.dueDate}</p>
              </div>

              <div className="pt-2 border-t border-border/60 flex items-center justify-between">
                <span className="text-base font-black text-foreground">{formatCurrency(ms.amount)}</span>
                {ms.status === "paid" ? (
                  <span className="text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Funded & Protected
                  </span>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toast.success(`Balance payment authorized for ${formatCurrency(ms.amount)}`)}
                    className="h-8 rounded-xl text-xs font-bold"
                  >
                    Pay Balance Due
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

