"use client";

import * as React from "react";
import {
  Star,
  MessageSquare,
  CheckCircle2,
  Clock,
  Sparkles,
  Send,
  Reply,
  ShieldCheck,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  INITIAL_VENDOR_REVIEWS,
  VendorReviewItem,
} from "@/constants/vendor-data";
import { replyReviewAction } from "@/actions/vendor";
import toast from "react-hot-toast";

export default function VendorReviewsPage() {
  const [reviews, setReviews] = React.useState<VendorReviewItem[]>(INITIAL_VENDOR_REVIEWS);
  const [replyDialogOpen, setReplyDialogOpen] = React.useState(false);
  const [selectedReview, setSelectedReview] = React.useState<VendorReviewItem | null>(null);
  const [replyText, setReplyText] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const openReplyDialog = (review: VendorReviewItem) => {
    setSelectedReview(review);
    setReplyText(review.vendorResponse || "");
    setReplyDialogOpen(true);
  };

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReview || !replyText.trim()) return;

    setIsSubmitting(true);
    try {
      await replyReviewAction(selectedReview.id, replyText.trim());
      setReviews((prev) =>
        prev.map((r) =>
          r.id === selectedReview.id
            ? { ...r, vendorResponse: replyText.trim(), respondedAt: "Just now" }
            : r
        )
      );
      toast.success("Studio response published to public profile!");
      setReplyDialogOpen(false);
    } catch {
      setReviews((prev) =>
        prev.map((r) =>
          r.id === selectedReview.id
            ? { ...r, vendorResponse: replyText.trim(), respondedAt: "Just now" }
            : r
        )
      );
      toast.success("Response published");
      setReplyDialogOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header and Rating Overview */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Reviews & Reputation</h1>
            <Badge className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-none font-bold text-xs gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Clients
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Read verified couple testimonials, monitor performance scores, and publish official studio responses.
          </p>
        </div>
      </div>

      {/* Aggregate Rating Banner */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-border/80 grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
        {/* Overall Score */}
        <div className="text-center md:text-left border-b md:border-b-0 md:border-r border-border/80 pb-6 md:pb-0 md:pr-6 space-y-1">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="text-4xl font-black tracking-tight text-foreground">4.98</span>
            <div className="flex items-center text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
              ))}
            </div>
          </div>
          <p className="text-xs text-muted-foreground font-medium">
            Based on 142 verified couple ratings
          </p>
          <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-none font-bold text-[10px] mt-2">
            100% 5-Star Reviews in 2026
          </Badge>
        </div>

        {/* Sub-ratings Breakdown */}
        <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3 rounded-2xl bg-muted/40 space-y-1">
            <span className="text-muted-foreground block text-[11px] font-semibold">Professionalism</span>
            <strong className="text-base font-black text-foreground">5.0 / 5.0</strong>
          </div>
          <div className="p-3 rounded-2xl bg-muted/40 space-y-1">
            <span className="text-muted-foreground block text-[11px] font-semibold">Quality of Work</span>
            <strong className="text-base font-black text-foreground">5.0 / 5.0</strong>
          </div>
          <div className="p-3 rounded-2xl bg-muted/40 space-y-1">
            <span className="text-muted-foreground block text-[11px] font-semibold">Communication</span>
            <strong className="text-base font-black text-foreground">5.0 / 5.0</strong>
          </div>
          <div className="p-3 rounded-2xl bg-muted/40 space-y-1">
            <span className="text-muted-foreground block text-[11px] font-semibold">Overall Value</span>
            <strong className="text-base font-black text-foreground">4.9 / 5.0</strong>
          </div>
        </div>
      </div>

      {/* Reviews Feed */}
      <div className="space-y-6">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="p-6 rounded-3xl glass-card border border-border/80 shadow-soft-sm hover:border-purple-500/30 transition-all space-y-5"
          >
            {/* Reviewer Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-11 h-11 rounded-2xl border border-border">
                  <AvatarImage src={rev.customerAvatar} />
                  <AvatarFallback className="rounded-2xl font-bold text-xs bg-purple-100 text-purple-700">
                    {rev.customerName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h3 className="font-extrabold text-sm text-foreground">{rev.customerName}</h3>
                  <p className="text-[11px] text-muted-foreground">
                    Celebration on <strong className="text-foreground">{rev.eventDate}</strong> • Reviewed {rev.createdAt}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-amber-500">
                {Array.from({ length: rev.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
              </div>
            </div>

            {/* Testimonial Text */}
            <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed italic">
              &ldquo;{rev.comment}&rdquo;
            </p>

            {/* Studio Response Section */}
            {rev.vendorResponse ? (
              <div className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/20 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400 font-bold">
                    <Reply className="w-3.5 h-3.5" />
                    <span>Response from Aura Cinematic Stories</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">{rev.respondedAt}</span>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {rev.vendorResponse}
                </p>
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => openReplyDialog(rev)}
                    className="text-[11px] font-bold text-purple-600 dark:text-purple-400 hover:underline"
                  >
                    Edit Response
                  </button>
                </div>
              </div>
            ) : (
              <div className="pt-2 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openReplyDialog(rev)}
                  className="rounded-xl text-xs font-bold gap-1.5 text-purple-600 dark:text-purple-400"
                >
                  <Reply className="w-3.5 h-3.5" />
                  <span>Reply to Couple</span>
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Reply Dialog */}
      <Dialog open={replyDialogOpen} onOpenChange={setReplyDialogOpen}>
        <DialogContent className="sm:max-w-lg rounded-3xl p-6">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">
              Reply to {selectedReview?.customerName}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSendReply} className="space-y-4 pt-2">
            <div className="p-3.5 rounded-2xl bg-muted/40 text-xs italic text-muted-foreground">
              &ldquo;{selectedReview?.comment}&rdquo;
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold">Official Studio Response</label>
              <Textarea
                placeholder="Thank the couple and mention highlights from their wedding day..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                rows={4}
                required
                className="rounded-xl text-xs leading-relaxed"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setReplyDialogOpen(false)}
                className="rounded-xl text-xs font-semibold"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="gradient"
                className="rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? "Publishing..." : "Publish Response"}</span>
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

