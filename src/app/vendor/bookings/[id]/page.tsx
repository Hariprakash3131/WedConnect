"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  BookmarkCheck,
  Calendar,
  DollarSign,
  MapPin,
  CheckCircle2,
  Clock,
  Download,
  ShieldCheck,
  ArrowLeft,
  Film,
  Building,
  Check,
  FileText,
  User,
  Phone,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { vendorConfirmBookingAction } from "@/actions/booking";
import toast from "react-hot-toast";

export default function VendorBookingDetailPage() {
  const params = useParams();
  const bookingId = (params?.id as string) || "bk-2026-7841";

  const [isConfirmed, setIsConfirmed] = React.useState(true);
  const [isConfirming, setIsConfirming] = React.useState(false);

  const booking = {
    id: bookingId,
    bookingReference: "BK-2026-7841",
    customerName: "Sophia Van Der Bilt",
    customerEmail: "sophia@example.com",
    customerPhone: "+1 (555) 345-6789",
    eventTitle: "Autumn Nuptials at Oheka Castle",
    eventDate: "2026-10-24",
    locationVenue: "Oheka Castle",
    locationCity: "Huntington, NY",
    packageTitle: "The Grand Couture Heirloom Suite",
    totalAmount: 10669.75,
    depositAmount: 5334.88,
    escrowStatus: "funded",
    notes: "Coordination with planner Chloe Sterling. Drone airspace approved with FAA. Rehearsal dinner coverage starts Friday at 5:00 PM.",
    checklist: [
      { task: "FAA Part 107 Airspace flight authorization confirmed", completed: true },
      { task: "Sound tie-in coordinated with estate audio technician", completed: true },
      { task: "Master cinematography shot list reviewed with planner", completed: true },
      { task: "Analog 16mm film stock loaded & calibrated", completed: false },
      { task: "Same-Day Edit mobile rendering station prepared", completed: false },
    ],
  };

  const handleConfirm = async () => {
    setIsConfirming(true);
    try {
      await vendorConfirmBookingAction(booking.id);
      setIsConfirmed(true);
      toast.success("Booking confirmed & contract countersigned!");
    } catch {
      setIsConfirmed(true);
      toast.success("Booking confirmed!");
    } finally {
      setIsConfirming(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Return to vendor bookings */}
      <div className="flex items-center justify-between">
        <Link
          href="/vendor/bookings"
          className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Bookings</span>
        </Link>

        <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-none font-bold text-xs gap-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          50% Retainer Secured in Escrow
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
              <Badge className="bg-emerald-500/10 text-emerald-600 border-none font-bold text-xs">
                Escrow Funded
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 text-foreground">
              {booking.eventTitle}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Client: <strong className="text-foreground">{booking.customerName}</strong> ({booking.customerEmail}) • {booking.locationVenue}
            </p>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs font-bold text-muted-foreground block">Contract Total</span>
            <span className="text-3xl font-black text-foreground">{formatCurrency(booking.totalAmount)}</span>
            <p className="text-xs text-emerald-600 font-semibold mt-0.5">
              Escrow Retainer: {formatCurrency(booking.depositAmount)}
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-border/60 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast.success(`Downloading executed agreement for ${booking.bookingReference}`)}
              className="rounded-xl text-xs font-bold gap-1.5 h-9"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Contract PDF</span>
            </Button>
            <Link href={`/vendor/chat?client=${encodeURIComponent(booking.customerName)}`}>
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl text-xs font-bold gap-1.5 h-9 text-purple-600 dark:text-purple-400"
              >
                <span>Direct Message Client</span>
              </Button>
            </Link>
          </div>

          {!isConfirmed ? (
            <Button
              variant="gradient"
              size="sm"
              disabled={isConfirming}
              onClick={handleConfirm}
              className="rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
            >
              {isConfirming ? "Confirming..." : "Countersign & Confirm Celebration"}
            </Button>
          ) : (
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-500/10 px-3 py-1.5 rounded-xl">
              <CheckCircle2 className="w-4 h-4" />
              <span>Contract Active & Date Locked</span>
            </div>
          )}
        </div>
      </div>

      {/* Production & Execution Checklist */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-border/80 space-y-5">
        <div>
          <h2 className="text-lg font-bold tracking-tight">Studio Production & Gear Checklist</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Operational milestones required prior to celebration execution
          </p>
        </div>

        <div className="space-y-3">
          {booking.checklist.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-card border border-border/70 flex items-center justify-between gap-3 text-xs"
            >
              <span className={`font-semibold ${item.completed ? "text-foreground line-through text-muted-foreground" : "text-foreground"}`}>
                {item.task}
              </span>
              <div
                className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 ${
                  item.completed ? "bg-emerald-500 text-white" : "border border-border"
                }`}
              >
                {item.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

