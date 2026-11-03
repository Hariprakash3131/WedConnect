"use client";

import * as React from "react";
import Link from "next/link";
import {
  FileText,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star,
  Columns,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MOCK_QUOTATIONS } from "@/constants/customer-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { acceptQuotationAction, rejectQuotationAction } from "@/actions/customer";
import toast from "react-hot-toast";

export default function QuotationsPage() {
  const [quotes, setQuotes] = React.useState(MOCK_QUOTATIONS);
  const [isProcessing, setIsProcessing] = React.useState<string | null>(null);

  const handleAccept = async (id: string) => {
    setIsProcessing(id);
    try {
      const res = await acceptQuotationAction(id);
      if (!res.success) {
        toast.error(res.error || "Failed to accept quotation");
        setIsProcessing(null);
        return;
      }

      toast.success("Quotation accepted! Booking generated & pending vendor confirmation.");
      setQuotes(
        quotes.map((q) => (q.id === id ? { ...q, status: "accepted" as const } : q))
      );
    } catch {
      toast.error("An error occurred");
    } finally {
      setIsProcessing(null);
    }
  };

  const handleReject = async (id: string) => {
    setIsProcessing(id);
    try {
      const res = await rejectQuotationAction(id);
      if (!res.success) {
        toast.error(res.error || "Failed to decline quote");
        setIsProcessing(null);
        return;
      }

      toast.success("Quotation declined");
      setQuotes(
        quotes.map((q) => (q.id === id ? { ...q, status: "rejected" as const } : q))
      );
    } catch {
      toast.error("An error occurred");
    } finally {
      setIsProcessing(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-wider mb-2">
            <Columns className="w-3.5 h-3.5" />
            <span>Comparison Matrix</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Quotation Comparison
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Compare itemized deliverables, taxes, payment terms, and accept binding vendor proposals.
          </p>
        </div>

        <Link href="/customer/bookings">
          <Button variant="glass" size="sm" className="rounded-xl text-xs font-semibold gap-1.5">
            <span>View Confirmed Bookings</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </div>

      {/* Side-by-Side Quotation Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quotes.map((quote) => (
          <Card
            key={quote.id}
            className={`glass-card border flex flex-col justify-between transition-all ${
              quote.status === "accepted"
                ? "border-emerald-500 ring-2 ring-emerald-500/20 shadow-soft-xl"
                : "border-border/80"
            }`}
          >
            <CardHeader className="p-6 pb-4 border-b border-border/60">
              <div className="flex items-start justify-between">
                <div>
                  <Badge
                    variant={
                      quote.status === "accepted"
                        ? "success"
                        : quote.status === "rejected"
                        ? "destructive"
                        : "luxury"
                    }
                    className="text-[10px] uppercase font-bold py-0.5 px-2.5 mb-2"
                  >
                    {quote.status}
                  </Badge>
                  <CardTitle className="text-xl font-bold">{quote.vendorName}</CardTitle>
                  <CardDescription className="text-xs">{quote.vendorCategory}</CardDescription>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-muted-foreground">{quote.quoteNumber}</span>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-500 mt-1">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{quote.vendorRating.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6 flex-1 flex flex-col justify-between">
              {/* Cost Summary Box */}
              <div className="p-4 rounded-2xl bg-muted/40 space-y-2">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{formatCurrency(quote.amount, quote.currency)}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Estimated Tax</span>
                  <span>{formatCurrency(quote.taxAmount, quote.currency)}</span>
                </div>
                <div className="pt-2 border-t border-border/60 flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground">Total Investment</span>
                  <span className="text-xl font-extrabold gradient-text">
                    {formatCurrency(quote.totalAmount, quote.currency)}
                  </span>
                </div>
              </div>

              {/* Line Items Breakdown */}
              <div className="space-y-3">
                <h5 className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
                  Included Line Items ({quote.items.length})
                </h5>
                <div className="space-y-2">
                  {quote.items.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-xl bg-background/60 border border-border/60 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between font-bold text-foreground">
                        <span className="flex-1 truncate pr-2">{item.description}</span>
                        <span>{formatCurrency(item.total, quote.currency)}</span>
                      </div>
                      <div className="text-[10px] text-muted-foreground">
                        Qty: {item.quantity} × {formatCurrency(item.unitPrice, quote.currency)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Terms & Validity */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span>Valid until <strong>{formatDate(quote.validUntil)}</strong></span>
                </div>
                <p className="text-[11px] text-muted-foreground italic leading-relaxed">
                  Terms: {quote.terms}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-border/60 space-y-2">
                {quote.status === "sent" ? (
                  <div className="grid grid-cols-2 gap-2">
                    <Link href={`/checkout/${quote.id}`} className="block">
                      <Button
                        variant="gradient"
                        size="sm"
                        className="w-full font-bold text-xs rounded-xl"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                        Accept & Escrow
                      </Button>
                    </Link>

                    <Button
                      variant="glass"
                      size="sm"
                      disabled={isProcessing === quote.id}
                      onClick={() => handleReject(quote.id)}
                      className="font-bold text-xs rounded-xl text-rose-500 hover:text-rose-600"
                    >
                      <XCircle className="w-3.5 h-3.5 mr-1" />
                      Decline
                    </Button>
                  </div>
                ) : quote.status === "accepted" ? (
                  <Link href="/customer/bookings" className="block">
                    <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold text-center flex items-center justify-center gap-1.5 hover:bg-emerald-500/20 transition-colors">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Accepted • View Booking Milestones &rarr;</span>
                    </div>
                  </Link>
                ) : (
                  <div className="p-3 rounded-xl bg-muted text-muted-foreground text-xs font-semibold text-center">
                    Quotation Declined
                  </div>
                )}

                <Link
                  href={`/customer/chat?vendorId=${quote.vendorId}`}
                  className="block w-full"
                >
                  <Button variant="ghost" size="sm" className="w-full text-xs font-semibold gap-1.5 text-muted-foreground hover:text-foreground">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Message Artist</span>
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

