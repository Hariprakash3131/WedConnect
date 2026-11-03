"use client";

import * as React from "react";
import Link from "next/link";
import {
  Inbox,
  Calendar,
  DollarSign,
  Users,
  MessageSquare,
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  ChevronRight,
  Phone,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  INITIAL_VENDOR_ENQUIRIES,
  VendorEnquiryItem,
} from "@/constants/vendor-data";
import { respondEnquiryAction } from "@/actions/vendor";
import { formatCurrency } from "@/lib/utils";
import toast from "react-hot-toast";

type FilterTab = "all" | "pending" | "quoted" | "responded" | "declined";

export default function VendorEnquiriesPage() {
  const [enquiries, setEnquiries] = React.useState<VendorEnquiryItem[]>(INITIAL_VENDOR_ENQUIRIES);
  const [activeTab, setActiveTab] = React.useState<FilterTab>("all");

  const filtered = activeTab === "all"
    ? enquiries
    : enquiries.filter((e) => e.status === activeTab);

  const handleDecline = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to mark inquiry from ${name} as declined?`)) return;

    try {
      await respondEnquiryAction(id, "declined");
      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status: "declined" } : e))
      );
      toast.success(`Inquiry from ${name} marked as declined`);
    } catch {
      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status: "declined" } : e))
      );
      toast.success(`Inquiry updated`);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Client Inquiries</h1>
            <Badge className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-none font-bold text-xs">
              {enquiries.filter((e) => e.status === "pending").length} Awaiting Response
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Review incoming requests from couples, evaluate wedding date feasibility, and draft formal proposals.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {(["all", "pending", "quoted", "responded", "declined"] as const).map((tab) => {
          const count = tab === "all" ? enquiries.length : enquiries.filter((e) => e.status === tab).length;
          const isActive = activeTab === tab;

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 ${
                isActive
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-soft-sm shadow-purple-500/25"
                  : "bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <span className="capitalize">{tab}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Inquiries List */}
      <div className="space-y-4">
        {filtered.map((enq) => (
          <div
            key={enq.id}
            className="p-6 rounded-3xl glass-card border border-border/80 shadow-soft-sm hover:border-purple-500/30 transition-all space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              {/* Couple Header & Avatar */}
              <div className="flex items-start gap-4">
                <Avatar className="w-12 h-12 rounded-2xl shrink-0 border border-border/80 shadow-soft-sm">
                  <AvatarImage src={enq.customerAvatar} alt={enq.customerName} />
                  <AvatarFallback className="rounded-2xl font-bold text-xs bg-purple-100 text-purple-700">
                    {enq.customerName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-extrabold text-base text-foreground">{enq.customerName}</h3>
                    <Badge
                      variant="outline"
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-lg capitalize ${
                        enq.status === "pending"
                          ? "bg-amber-500/10 text-amber-600 border-amber-500/30"
                          : enq.status === "quoted"
                          ? "bg-blue-500/10 text-blue-600 border-blue-500/30"
                          : enq.status === "declined"
                          ? "bg-rose-500/10 text-rose-600 border-rose-500/30"
                          : "bg-purple-500/10 text-purple-600 border-purple-500/30"
                      }`}
                    >
                      {enq.status}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5" />
                      {enq.customerEmail}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5" />
                      {enq.customerPhone}
                    </span>
                    <span className="text-[11px] text-muted-foreground/80">• Received {enq.createdAt}</span>
                  </div>
                </div>
              </div>

              {/* Budget Badge */}
              <div className="self-start sm:self-center">
                <span className="text-xs font-bold text-muted-foreground block text-right">Client Budget</span>
                <span className="text-xl font-black tracking-tight text-foreground">{formatCurrency(enq.budget)}</span>
              </div>
            </div>

            {/* Event Metrics Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-muted/40 text-xs">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                <span>
                  Date: <strong className="text-foreground">{enq.preferredDate}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                <span>
                  Guest Count: <strong className="text-foreground">{enq.guestCount} guests</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Inbox className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                <span>
                  Type: <strong className="text-foreground">{enq.eventType}</strong>
                </span>
              </div>
            </div>

            {/* Client Message */}
            <div className="p-4 rounded-2xl bg-background/60 border border-border/60 text-xs leading-relaxed text-foreground/90 italic">
              &ldquo;{enq.message}&rdquo;
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              <Link href={`/vendor/chat?client=${encodeURIComponent(enq.customerName)}`}>
                <Button variant="ghost" size="sm" className="rounded-xl text-xs font-bold gap-1.5 text-purple-600 dark:text-purple-400">
                  <MessageSquare className="w-4 h-4" />
                  <span>Open Direct Chat</span>
                </Button>
              </Link>

              <div className="flex items-center gap-2">
                {enq.status !== "declined" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDecline(enq.id, enq.customerName)}
                    className="rounded-xl text-xs font-semibold text-muted-foreground hover:text-rose-600"
                  >
                    Decline
                  </Button>
                )}

                <Link href={`/vendor/quotations?enquiryId=${enq.id}&customerName=${encodeURIComponent(enq.customerName)}&email=${encodeURIComponent(enq.customerEmail)}&eventTitle=${encodeURIComponent(enq.eventType)}&eventDate=${enq.preferredDate}`}>
                  <Button
                    variant="gradient"
                    size="sm"
                    className="rounded-xl text-xs font-bold gap-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 shadow-soft-sm"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Create Formal Quotation</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

