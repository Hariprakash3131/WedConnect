"use client";

import * as React from "react";
import Link from "next/link";
import {
  Sparkles,
  MapPin,
  Star,
  ShieldCheck,
  Send,
  MessageSquare,
  CheckCircle2,
  DollarSign,
  ArrowRight,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { FEATURED_VENDORS } from "@/constants/landing-data";
import { MOCK_CUSTOMER_EVENTS } from "@/constants/customer-data";
import { formatCurrency } from "@/lib/utils";
import { sendEnquiryAction } from "@/actions/customer";
import toast from "react-hot-toast";

export default function MatchedVendorsPage() {
  const primaryEvent = MOCK_CUSTOMER_EVENTS[0];
  const [selectedVendor, setSelectedVendor] = React.useState<any | null>(null);
  const [enquiryMessage, setEnquiryMessage] = React.useState("");
  const [isSending, setIsSending] = React.useState(false);

  const handleOpenEnquiry = (vendor: any) => {
    setSelectedVendor(vendor);
    setEnquiryMessage(
      `Hello ${vendor.businessName}! We are planning "${primaryEvent.title}" on ${primaryEvent.eventDate} in ${primaryEvent.locationCity} with ~${primaryEvent.guestCount} guests. We would love to check your availability and receive a formal quotation.`
    );
  };

  const handleSendEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVendor) return;
    setIsSending(true);
    try {
      const res = await sendEnquiryAction({
        vendorId: selectedVendor.id,
        eventId: primaryEvent.id,
        message: enquiryMessage,
        budget: selectedVendor.startingPrice,
        preferredDate: primaryEvent.eventDate,
      });

      if (!res.success) {
        toast.error(res.error || "Failed to send enquiry");
        setIsSending(false);
        return;
      }

      toast.success(`Enquiry sent to ${selectedVendor.businessName}! They will respond via chat.`);
      setSelectedVendor(null);
    } catch {
      toast.error("An error occurred");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI & Curated Matching</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Matched Specialists for &ldquo;{primaryEvent.title}&rdquo;
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Handpicked specialists in {primaryEvent.locationCity} matching your {formatCurrency(primaryEvent.budget)} budget.
          </p>
        </div>

        <Link href="/vendors">
          <Button variant="glass" size="sm" className="rounded-xl text-xs font-semibold gap-1.5">
            <span>Browse Full Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </div>

      {/* Matched Vendors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURED_VENDORS.map((vendor, idx) => {
          const matchPercent = 98 - idx * 2;

          return (
            <Card
              key={vendor.id}
              className="glass-card border-border/80 overflow-hidden flex flex-col justify-between hover:shadow-soft-xl hover:border-primary/40 transition-all duration-300"
            >
              {/* Media Header */}
              <div className="relative aspect-[16/10] bg-muted overflow-hidden">
                <img
                  src={vendor.imageUrl}
                  alt={vendor.businessName}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Match Score Badge */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5">
                  <Badge variant="luxury" className="text-[11px] font-extrabold shadow-soft-sm">
                    <Sparkles className="w-3 h-3 mr-1" />
                    {matchPercent}% Match
                  </Badge>
                </div>

                <div className="absolute bottom-3 left-3 text-white">
                  <span className="text-xs font-semibold flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {vendor.city}
                  </span>
                </div>
              </div>

              {/* Body */}
              <CardContent className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-lg text-foreground truncate">
                      {vendor.businessName}
                    </h3>
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{vendor.rating.toFixed(2)}</span>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {vendor.tagline}
                  </p>
                </div>

                {/* Pricing & Actions */}
                <div className="pt-4 border-t border-border/60 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Starting Rate</span>
                    <strong className="text-base text-foreground font-extrabold">
                      {formatCurrency(vendor.startingPrice, vendor.currency)}
                    </strong>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="gradient"
                      size="sm"
                      onClick={() => handleOpenEnquiry(vendor)}
                      className="rounded-xl text-xs font-bold gap-1.5"
                    >
                      <Send className="w-3 h-3" />
                      <span>Enquire</span>
                    </Button>

                    <Link href={`/vendors/${vendor.id}`}>
                      <Button variant="glass" size="sm" className="w-full rounded-xl text-xs font-semibold">
                        Profile
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Enquiry Modal Dialog */}
      <Dialog open={!!selectedVendor} onOpenChange={() => setSelectedVendor(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Send Enquiry to {selectedVendor?.businessName}</DialogTitle>
            <DialogDescription>
              Check availability and request a personalized quotation for &ldquo;{primaryEvent.title}&rdquo;.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSendEnquiry} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">Message to Vendor</label>
              <textarea
                rows={5}
                required
                value={enquiryMessage}
                onChange={(e) => setEnquiryMessage(e.target.value)}
                className="w-full p-4 rounded-2xl border border-input/80 bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
              />
            </div>

            <Button
              type="submit"
              variant="gradient"
              disabled={isSending}
              className="w-full h-11 rounded-2xl font-bold gap-2 text-xs"
            >
              <Send className="w-4 h-4" />
              <span>{isSending ? "Transmitting Enquiry..." : "Send Instant Enquiry"}</span>
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

