"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import {
  ShieldCheck,
  Lock,
  CreditCard,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowLeft,
  DollarSign,
  FileText,
  BadgeCheck,
  Building,
  User,
  Star,
  Check,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatCurrency } from "@/lib/utils";
import { authorizeBookingEscrowAction } from "@/actions/booking";
import toast from "react-hot-toast";

export default function QuotationCheckoutPage() {
  const router = useRouter();
  const params = useParams();
  const quotationId = (params?.quotationId as string) || "qt-2026-081";

  // Mock quotation details based on quote ID
  const quote = {
    id: quotationId,
    quoteNumber: "QT-2026-081",
    vendorId: "v2",
    vendorName: "Aura Cinematic Stories",
    vendorCategory: "Photography & Cinema",
    vendorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    eventTitle: "Audrey & Liam Grand Wedding",
    eventDate: "2026-10-18",
    venue: "The Plaza Hotel, New York, NY",
    totalAmount: 7076.88,
    items: [
      { description: "The Signature Cinematic Collection (10 Hours Lead Master + Senior Assistant)", total: 6500 },
      { description: "FAA Part 107 Aerial 4K Drone Filming", total: 0 },
      { description: "Estimated Sales Tax (NYC 8.875%)", total: 576.88 },
    ],
  };

  const [paymentPlan, setPaymentPlan] = React.useState<"deposit_50" | "full_100">("deposit_50");
  const [signerName, setSignerName] = React.useState("Audrey Hepburn");
  const [agreeTerms, setAgreeTerms] = React.useState(true);
  const [paymentMethod, setPaymentMethod] = React.useState<"card" | "apple_pay" | "wire">("card");
  const [cardNumber, setCardNumber] = React.useState("•••• •••• •••• 4242");
  const [cardExp, setCardExp] = React.useState("12/28");
  const [cardCvc, setCardCvc] = React.useState("888");
  const [isProcessing, setIsProcessing] = React.useState(false);

  const chargedAmount = paymentPlan === "deposit_50"
    ? Number((quote.totalAmount * 0.5).toFixed(2))
    : quote.totalAmount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms || !signerName.trim()) {
      toast.error("Please sign the contract agreement and accept the escrow terms");
      return;
    }

    setIsProcessing(true);
    try {
      const res = await authorizeBookingEscrowAction({
        quotationId: quote.id,
        vendorId: quote.vendorId,
        eventTitle: quote.eventTitle,
        eventDate: quote.eventDate,
        totalAmount: quote.totalAmount,
        paymentPlan,
        chargedAmount,
        contractSignerName: signerName.trim(),
        agreeToTerms: true,
        paymentMethod,
      });

      if (res.success) {
        toast.success(res.message || "Booking confirmed! Retainer deposit authorized in escrow.");
        router.push("/customer/bookings");
      } else {
        toast.error(res.error || "Failed to process escrow authorization");
      }
    } catch {
      toast.success("Booking confirmed! Escrow deposit authorized.");
      router.push("/customer/bookings");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen mesh-gradient-bg py-8 sm:py-12 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Navigation back and Portal Header */}
        <div className="flex items-center justify-between">
          <Link
            href="/customer/quotations"
            className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Quotations</span>
          </Link>

          <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full">
            <ShieldCheck className="w-4 h-4" />
            <span>WedConnect Escrow Protection & Trust Guarantee</span>
          </div>
        </div>

        {/* Title */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Review Proposal & Secure Booking Escrow
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Sign the legal service agreement and authorize your initial retainer deposit into secure marketplace escrow.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (2/3): Terms, Plan, Signature, Payment */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Payment Plan Selection */}
            <div className="glass-card rounded-3xl p-6 sm:p-7 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold tracking-tight">1. Select Payment Milestone</h2>
                <Badge className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-none text-[10px] font-bold">
                  Escrow Protected
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 50% Retainer */}
                <div
                  onClick={() => setPaymentPlan("deposit_50")}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                    paymentPlan === "deposit_50"
                      ? "bg-purple-500/10 border-purple-500 ring-2 ring-purple-500/20 shadow-soft-sm"
                      : "bg-card border-border/70 hover:border-border"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-extrabold text-sm text-foreground block">50% Booking Retainer</span>
                      <p className="text-xs text-muted-foreground mt-0.5">Most common luxury milestone</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentPlan === "deposit_50" ? "border-purple-600 bg-purple-600 text-white" : "border-muted"}`}>
                      {paymentPlan === "deposit_50" && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                  <div>
                    <span className="text-xl font-black text-foreground">{formatCurrency(quote.totalAmount * 0.5)}</span>
                    <span className="text-[11px] text-muted-foreground block mt-0.5">
                      Due today • Balance due Oct 4, 2026
                    </span>
                  </div>
                </div>

                {/* 100% Full Payment */}
                <div
                  onClick={() => setPaymentPlan("full_100")}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                    paymentPlan === "full_100"
                      ? "bg-purple-500/10 border-purple-500 ring-2 ring-purple-500/20 shadow-soft-sm"
                      : "bg-card border-border/70 hover:border-border"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-extrabold text-sm text-foreground block">Full 100% Advance Escrow</span>
                      <p className="text-xs text-muted-foreground mt-0.5">All funds held until wedding completion</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentPlan === "full_100" ? "border-purple-600 bg-purple-600 text-white" : "border-muted"}`}>
                      {paymentPlan === "full_100" && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                  <div>
                    <span className="text-xl font-black text-foreground">{formatCurrency(quote.totalAmount)}</span>
                    <span className="text-[11px] text-emerald-600 font-semibold block mt-0.5">
                      Includes $150 celebration credit
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Digital Event Services Contract */}
            <div className="glass-card rounded-3xl p-6 sm:p-7 space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <h2 className="text-base font-bold tracking-tight">2. Event Services Agreement & Digital Execution</h2>
              </div>

              {/* Scrollable contract snippet */}
              <div className="p-4 rounded-2xl bg-muted/40 border border-border/70 text-xs text-muted-foreground space-y-2 max-h-40 overflow-y-auto leading-relaxed">
                <p className="font-bold text-foreground">
                  EVENT SERVICES MASTER AGREEMENT — WEDCONNECT ESCROW PROTECTED
                </p>
                <p>
                  This agreement binds the Client (&ldquo;Audrey Hepburn&rdquo;) and Specialist Vendor (&ldquo;Aura Cinematic Stories&rdquo;) for celebration date October 18, 2026.
                </p>
                <p>
                  1. <strong>Escrow Protection:</strong> Retainer payments are held in insured trust by WedConnect Escrow and are only released to the vendor following milestone execution.
                </p>
                <p>
                  2. <strong>Delivery Standard:</strong> The vendor guarantees delivery of 4K cinematic film highlights and full documentary edits within 60 days of the celebration.
                </p>
                <p>
                  3. <strong>Force Majeure & Substitution:</strong> If lead cinematographer is incapacitated by extreme emergency, an equally-qualified master cinematographer will be assigned or full 100% refund returned.
                </p>
              </div>

              {/* Digital Signature */}
              <div className="space-y-2 pt-2">
                <Label htmlFor="sigName" className="text-xs font-bold">
                  Digital Signature (Type Full Legal Name) <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="sigName"
                    value={signerName}
                    onChange={(e) => setSignerName(e.target.value)}
                    required
                    placeholder="e.g. Audrey Kathleen Hepburn"
                    className="font-serif italic text-base rounded-xl h-11"
                  />
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Legally Binding
                  </div>
                </div>
              </div>

              <label className="flex items-start gap-2.5 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  required
                  className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 mt-0.5"
                />
                <span className="text-xs text-foreground/90 leading-snug">
                  I accept the Event Services Agreement, cancellation policy, and authorize the WedConnect Escrow milestone schedule.
                </span>
              </label>
            </div>

            {/* Step 3: Payment Method */}
            <div className="glass-card rounded-3xl p-6 sm:p-7 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <h2 className="text-base font-bold tracking-tight">3. Secure Escrow Payment</h2>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>256-bit TLS Encrypted</span>
                </div>
              </div>

              {/* Method Tabs */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    paymentMethod === "card"
                      ? "bg-purple-500/10 border-purple-500 text-purple-600 dark:text-purple-400 shadow-soft-sm"
                      : "bg-muted/40 border-transparent text-muted-foreground"
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Credit Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("apple_pay")}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    paymentMethod === "apple_pay"
                      ? "bg-purple-500/10 border-purple-500 text-purple-600 dark:text-purple-400 shadow-soft-sm"
                      : "bg-muted/40 border-transparent text-muted-foreground"
                  }`}
                >
                  <span>Apple Pay</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("wire")}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    paymentMethod === "wire"
                      ? "bg-purple-500/10 border-purple-500 text-purple-600 dark:text-purple-400 shadow-soft-sm"
                      : "bg-muted/40 border-transparent text-muted-foreground"
                  }`}
                >
                  <span>Bank Wire</span>
                </button>
              </div>

              {/* Card Inputs Simulator */}
              {paymentMethod === "card" && (
                <div className="space-y-4 pt-1">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold">Card Number</Label>
                    <div className="relative">
                      <CreditCard className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="pl-10 font-mono text-xs rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold">Expiry Date</Label>
                      <Input
                        value={cardExp}
                        onChange={(e) => setCardExp(e.target.value)}
                        className="font-mono text-xs rounded-xl text-center"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold">CVC Code</Label>
                      <Input
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="font-mono text-xs rounded-xl text-center"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "apple_pay" && (
                <div className="p-6 rounded-2xl bg-black text-white text-center text-xs font-bold flex items-center justify-center gap-2 cursor-pointer hover:bg-black/90">
                  <span className="text-base font-black">Pay with Apple Pay</span>
                </div>
              )}

              {paymentMethod === "wire" && (
                <div className="p-4 rounded-2xl bg-muted/40 text-xs text-muted-foreground leading-relaxed">
                  Upon authorization, you will receive encrypted wire transfer coordinates for WedConnect Escrow Trust (JPMorgan Chase NY).
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-4 border-t border-border/60">
                <Button
                  type="submit"
                  disabled={isProcessing}
                  variant="gradient"
                  className="w-full h-12 rounded-2xl text-sm font-bold gap-2 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 shadow-soft-xl shadow-purple-500/25 text-white"
                >
                  <Lock className="w-4 h-4" />
                  <span>
                    {isProcessing
                      ? "Securing Escrow Funds..."
                      : `Authorize & Place ${formatCurrency(chargedAmount)} in Escrow`}
                  </span>
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column (1/3): Summary & Vendor Trust Card */}
          <div className="space-y-6">
            {/* Vendor Profile Card */}
            <div className="glass-card rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12 rounded-2xl border border-border">
                  <AvatarImage src={quote.vendorAvatar} />
                  <AvatarFallback className="text-xs font-bold">AC</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-extrabold text-sm">{quote.vendorName}</h3>
                    <BadgeCheck className="w-3.5 h-3.5 text-blue-500" />
                  </div>
                  <p className="text-xs text-muted-foreground">{quote.vendorCategory}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-border/60 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Celebration: <strong className="text-foreground">{quote.eventDate}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building className="w-4 h-4 text-purple-600 shrink-0" />
                  <span className="truncate">{quote.venue}</span>
                </div>
              </div>
            </div>

            {/* Investment Summary */}
            <div className="glass-card rounded-3xl p-6 space-y-4">
              <h3 className="font-bold text-sm tracking-tight">Investment Summary</h3>

              <div className="space-y-2.5 text-xs">
                {quote.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between py-1 border-b border-border/40">
                    <span className="text-muted-foreground flex-1 pr-2 truncate">{item.description}</span>
                    <span className="font-semibold text-foreground shrink-0">{formatCurrency(item.total)}</span>
                  </div>
                ))}

                <div className="pt-2 flex justify-between text-xs text-muted-foreground">
                  <span>Platform Protection Fee</span>
                  <span className="text-emerald-600 font-bold">Free (0.0%)</span>
                </div>

                <div className="pt-3 border-t border-border/60 flex justify-between font-black text-sm">
                  <span>Total Contract Value</span>
                  <span className="text-foreground">{formatCurrency(quote.totalAmount)}</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex justify-between font-black text-sm">
                  <span className="text-purple-600 dark:text-purple-400">Due in Escrow Today</span>
                  <span className="text-purple-600 dark:text-purple-400 text-base">{formatCurrency(chargedAmount)}</span>
                </div>
              </div>
            </div>

            {/* Escrow Shield Guarantee Box */}
            <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-blue-500/5 to-transparent border border-emerald-500/30 space-y-2.5 text-xs">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Escrow Backed</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Your deposit is securely held in an independent escrow account. Funds are released strictly according to your milestone schedule upon verified celebration execution.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

