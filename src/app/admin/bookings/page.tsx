"use client";

import * as React from "react";
import {
  BookmarkCheck,
  Search,
  Calendar,
  DollarSign,
  User,
  Store,
  Download,
  CheckCircle2,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
import toast from "react-hot-toast";

interface GlobalBookingRecord {
  id: string;
  reference: string;
  customerName: string;
  customerEmail: string;
  vendorName: string;
  vendorCategory: string;
  eventDate: string;
  totalAmount: number;
  platformFee: number;
  depositPaid: boolean;
  status: "confirmed" | "in_progress" | "completed";
}

const GLOBAL_BOOKINGS: GlobalBookingRecord[] = [
  {
    id: "gb-1",
    reference: "BK-2026-7841",
    customerName: "Sophia Van Der Bilt",
    customerEmail: "sophia@example.com",
    vendorName: "Aura Cinematic Stories",
    vendorCategory: "Cinema",
    eventDate: "2026-10-24",
    totalAmount: 10669.75,
    platformFee: 1066.98,
    depositPaid: true,
    status: "confirmed",
  },
  {
    id: "gb-2",
    reference: "BK-2026-6912",
    customerName: "Elena Rostova",
    customerEmail: "elena@example.com",
    vendorName: "Aura Cinematic Stories",
    vendorCategory: "Cinema",
    eventDate: "2026-11-07",
    totalAmount: 7076.88,
    platformFee: 707.69,
    depositPaid: true,
    status: "confirmed",
  },
  {
    id: "gb-3",
    reference: "BK-2026-5541",
    customerName: "Audrey Hepburn",
    customerEmail: "audrey@example.com",
    vendorName: "Villa Ephrussi & Estates",
    vendorCategory: "Venues",
    eventDate: "2026-10-18",
    totalAmount: 24500.00,
    platformFee: 2450.00,
    depositPaid: true,
    status: "in_progress",
  },
  {
    id: "gb-4",
    reference: "BK-2026-4210",
    customerName: "Julian & Clara Thorne",
    customerEmail: "julian@example.com",
    vendorName: "Maison de Fleurs Couture",
    vendorCategory: "Floral",
    eventDate: "2026-12-18",
    totalAmount: 4800.00,
    platformFee: 480.00,
    depositPaid: true,
    status: "confirmed",
  },
];

export default function AdminBookingsPage() {
  const [bookings, setBookings] = React.useState<GlobalBookingRecord[]>(GLOBAL_BOOKINGS);
  const [search, setSearch] = React.useState("");

  const filtered = bookings.filter((b) =>
    b.reference.toLowerCase().includes(search.toLowerCase()) ||
    b.customerName.toLowerCase().includes(search.toLowerCase()) ||
    b.vendorName.toLowerCase().includes(search.toLowerCase())
  );

  const totalContractVolume = filtered.reduce((acc, b) => acc + b.totalAmount, 0);
  const totalCommission = filtered.reduce((acc, b) => acc + b.platformFee, 0);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Marketplace Bookings Oversight</h1>
            <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-none font-bold text-xs">
              Escrow & Contracts
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Global monitoring of all contracts, milestone deposit escrows, and platform commission revenues.
          </p>
        </div>
      </div>

      {/* Summary KPI Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-3xl glass-card border border-border/80 flex items-center justify-between">
          <div>
            <span className="text-xs text-muted-foreground font-semibold">Filtered Contract GMV</span>
            <h3 className="text-2xl font-black text-foreground mt-1">{formatCurrency(totalContractVolume)}</h3>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-3xl glass-card border border-border/80 flex items-center justify-between">
          <div>
            <span className="text-xs text-muted-foreground font-semibold">Total Platform Commission</span>
            <h3 className="text-2xl font-black text-emerald-600 mt-1">{formatCurrency(totalCommission)}</h3>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by reference, couple, or vendor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 rounded-2xl text-xs h-10"
        />
      </div>

      {/* Bookings List Cards */}
      <div className="space-y-4">
        {filtered.map((b) => (
          <div
            key={b.id}
            className="p-6 rounded-3xl glass-card border border-border/80 shadow-soft-sm hover:border-blue-500/30 transition-all space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-border/60 pb-3">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-extrabold text-base text-foreground font-mono">{b.reference}</span>
                  <Badge variant="outline" className="text-[10px] font-bold">
                    {b.vendorCategory}
                  </Badge>
                  <Badge className="bg-emerald-500/10 text-emerald-600 border-none font-bold text-[10px] capitalize">
                    {b.status.replace("_", " ")}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Vendor: <strong className="text-foreground">{b.vendorName}</strong> • Couple: <strong className="text-foreground">{b.customerName}</strong> ({b.customerEmail})
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-xl font-black text-foreground">{formatCurrency(b.totalAmount)}</span>
                <p className="text-xs text-emerald-600 font-semibold">
                  Platform Commission: +{formatCurrency(b.platformFee)}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between text-xs text-muted-foreground gap-3">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  Wedding: <strong>{b.eventDate}</strong>
                </span>
                <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  50% Retainer In Escrow
                </span>
              </div>

              <Button
                size="sm"
                variant="outline"
                onClick={() => toast.success(`Exporting agreement audit package for ${b.reference}`)}
                className="rounded-xl text-xs font-bold gap-1.5 h-8"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Contract & Audit Trail</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

