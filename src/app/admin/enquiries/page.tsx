"use client";

import * as React from "react";
import {
  Inbox,
  Calendar,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle2,
  Users,
  Store,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

interface GlobalEnquiryRecord {
  id: string;
  customerName: string;
  vendorName: string;
  eventType: string;
  preferredDate: string;
  budget: number;
  status: "pending" | "quoted" | "responded" | "converted";
  createdAt: string;
  responseTime: string;
}

const GLOBAL_ENQUIRIES: GlobalEnquiryRecord[] = [
  {
    id: "genq-1",
    customerName: "Audrey Hepburn",
    vendorName: "Aura Cinematic Stories",
    eventType: "Luxury Wedding",
    preferredDate: "2026-10-18",
    budget: 8500,
    status: "quoted",
    createdAt: "Today, 10:15 AM",
    responseTime: "18 mins",
  },
  {
    id: "genq-2",
    customerName: "Sophia Van Der Bilt",
    vendorName: "Maison de Fleurs Couture",
    eventType: "Autumn Nuptials",
    preferredDate: "2026-11-14",
    budget: 9500,
    status: "converted",
    createdAt: "Yesterday, 3:45 PM",
    responseTime: "24 mins",
  },
  {
    id: "genq-3",
    customerName: "Elena Rostova",
    vendorName: "Villa Ephrussi & Estates",
    eventType: "Black-Tie Gala",
    preferredDate: "2026-12-05",
    budget: 25000,
    status: "responded",
    createdAt: "2 days ago",
    responseTime: "42 mins",
  },
  {
    id: "genq-4",
    customerName: "Julian & Clara Thorne",
    vendorName: "Bel Air Haute Catering",
    eventType: "Intimate Elopement",
    preferredDate: "2026-12-18",
    budget: 6000,
    status: "pending",
    createdAt: "3 days ago",
    responseTime: "Pending vendor",
  },
];

export default function AdminEnquiriesPage() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Marketplace Inquiries Pipeline</h1>
            <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-none font-bold text-xs">
              Lead Velocity
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Monitor communication responsiveness, vendor quotation rates, and matchmaker conversion.
          </p>
        </div>
      </div>

      {/* 3 Lead Velocity Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl glass-card border border-border/80">
          <span className="text-xs text-muted-foreground font-semibold">Total Marketplace Inquiries</span>
          <h3 className="text-2xl font-black text-foreground mt-2">840</h3>
          <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            +32% this month
          </p>
        </div>

        <div className="p-5 rounded-3xl glass-card border border-border/80">
          <span className="text-xs text-muted-foreground font-semibold">Average Response Time</span>
          <h3 className="text-2xl font-black text-foreground mt-2">26 Mins</h3>
          <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-1">
            94% responded in under 2 hours
          </p>
        </div>

        <div className="p-5 rounded-3xl glass-card border border-border/80">
          <span className="text-xs text-muted-foreground font-semibold">Inquiry-to-Booking Conversion</span>
          <h3 className="text-2xl font-black text-foreground mt-2">29.5%</h3>
          <p className="text-xs text-emerald-600 font-semibold mt-1">
            Above industry standard (15%)
          </p>
        </div>
      </div>

      {/* Inquiries List */}
      <div className="space-y-4">
        {GLOBAL_ENQUIRIES.map((enq) => (
          <div
            key={enq.id}
            className="p-5 rounded-3xl glass-card border border-border/80 shadow-soft-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-blue-500/30 transition-all"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-extrabold text-sm text-foreground">{enq.customerName}</span>
                <span className="text-muted-foreground text-xs">&rarr;</span>
                <span className="font-bold text-sm text-purple-600 dark:text-purple-400">{enq.vendorName}</span>
                <Badge
                  className={`text-[9px] font-bold border-none uppercase ${
                    enq.status === "converted"
                      ? "bg-emerald-500/10 text-emerald-600"
                      : enq.status === "quoted"
                      ? "bg-blue-500/10 text-blue-600"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {enq.status}
                </Badge>
              </div>

              <p className="text-xs text-muted-foreground">
                {enq.eventType} • Date: <strong className="text-foreground">{enq.preferredDate}</strong> • Estimated Budget: <strong className="text-foreground">{formatCurrency(enq.budget)}</strong>
              </p>
            </div>

            <div className="text-left sm:text-right text-xs">
              <span className="text-muted-foreground block text-[10px] uppercase font-bold">Response Velocity</span>
              <strong className="text-foreground font-semibold flex items-center sm:justify-end gap-1 mt-0.5">
                <Clock className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                {enq.responseTime}
              </strong>
              <p className="text-[10px] text-muted-foreground mt-0.5">{enq.createdAt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

