"use client";

import * as React from "react";
import { Star, Sparkles, Send, CheckCircle2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { MOCK_BOOKINGS } from "@/constants/customer-data";
import { submitReviewAction } from "@/actions/customer";
import toast from "react-hot-toast";

export default function CustomerReviewsPage() {
  const [selectedBooking, setSelectedBooking] = React.useState<any | null>(null);
  const [rating, setRating] = React.useState(5);
  const [comment, setComment] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);

  interface ReviewItem {
    id: string;
    vendorName: string;
    category: string;
    rating: number;
    comment: string;
    date: string;
    vendorResponse: string | null;
  }

  const [reviewsList, setReviewsList] = React.useState<ReviewItem[]>([
    {
      id: "rev-1",
      vendorName: "Villa Ephrussi & Estates",
      category: "Luxury Venues",
      rating: 5,
      comment: "A fairytale experience from start to finish. The grounds are impeccably manicured, and the concierge team made our wedding day effortless.",
      date: "2026-10-20",
      vendorResponse: "It was an absolute pleasure hosting you and your guests! We wish you a lifetime of joy.",
    },
  ]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBooking) return;
    setSubmitting(true);
    try {
      const res = await submitReviewAction({
        bookingId: selectedBooking.id,
        vendorId: "v1", // mock vendor ID
        rating,
        comment,
      });

      if (!res.success) {
        toast.error(res.error || "Failed to submit review");
        setSubmitting(false);
        return;
      }

      toast.success("Thank you for sharing your experience! Your review is published.");
      setReviewsList([
        {
          id: `rev-${Date.now()}`,
          vendorName: selectedBooking.vendorName,
          category: selectedBooking.category,
          rating,
          comment,
          date: new Date().toISOString().split("T")[0],
          vendorResponse: null,
        },
        ...reviewsList,
      ]);
      setSelectedBooking(null);
      setComment("");
    } catch {
      toast.error("An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-xs uppercase tracking-wider mb-2">
          <Star className="w-3.5 h-3.5 fill-current" />
          <span>Couple Testimonials</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          Celebration Reviews
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Share your experience to help future couples find verified master artisans.
        </p>
      </div>

      {/* Bookings Ready to Review */}
      <div className="space-y-4">
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-muted-foreground">
          Pending Reviews
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_BOOKINGS.map((booking) => (
            <Card key={booking.id} className="glass-card border-border/80">
              <CardContent className="p-5 flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-sm text-foreground">{booking.vendorName}</h4>
                  <p className="text-xs text-muted-foreground">{booking.category} • Ref: {booking.bookingReference}</p>
                </div>
                <Button
                  variant="gradient"
                  size="sm"
                  onClick={() => setSelectedBooking(booking)}
                  className="rounded-xl text-xs font-bold gap-1.5 shadow-soft-sm"
                >
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>Write Review</span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Submitted Reviews History */}
      <div className="space-y-4 pt-4">
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-muted-foreground">
          Published Reviews ({reviewsList.length})
        </h3>
        <div className="space-y-4">
          {reviewsList.map((rev) => (
            <Card key={rev.id} className="glass-card border-border/80 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-base text-foreground">{rev.vendorName}</h4>
                  <p className="text-xs text-muted-foreground">{rev.category} • {rev.date}</p>
                </div>
                <div className="flex items-center text-amber-400 gap-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-foreground/90 italic leading-relaxed">
                &ldquo;{rev.comment}&rdquo;
              </p>

              {rev.vendorResponse && (
                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Vendor Response</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{rev.vendorResponse}</p>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Write Review Modal */}
      <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Review {selectedBooking?.vendorName}</DialogTitle>
            <DialogDescription>
              How was your experience for &ldquo;{selectedBooking?.eventTitle}&rdquo;?
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmitReview} className="space-y-4 pt-2">
            {/* 5-Star Interactive Selector */}
            <div className="space-y-1.5 text-center">
              <label className="text-xs font-bold text-foreground">Rating</label>
              <div className="flex items-center justify-center gap-2 py-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 hover:scale-125 transition-transform"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        star <= rating ? "fill-amber-400 text-amber-400" : "text-muted stroke-[1.5]"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">Your Feedback</label>
              <textarea
                rows={4}
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Describe the punctuality, communication, and overall quality of delivery..."
                className="w-full p-4 rounded-2xl border border-input/80 bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
              />
            </div>

            <Button
              type="submit"
              variant="gradient"
              disabled={submitting}
              className="w-full h-11 rounded-2xl font-bold gap-2 text-xs shadow-soft-sm"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? "Publishing Review..." : "Publish Verified Review"}</span>
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
