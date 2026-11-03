"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createEventSchema, CreateEventInput, createEventAction } from "@/actions/customer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";

export default function CreateEventPage() {
  const router = useRouter();
  const [step, setStep] = React.useState(1);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<CreateEventInput>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      title: "",
      eventDate: "2026-10-18",
      locationCity: "",
      locationVenue: "",
      guestCount: 150,
      budget: 35000,
      notes: "",
    },
  });

  const nextStep = async () => {
    if (step === 1) {
      const valid = await trigger(["title", "eventDate"]);
      if (valid) setStep(2);
    } else if (step === 2) {
      const valid = await trigger(["locationCity", "guestCount"]);
      if (valid) setStep(3);
    }
  };

  const onSubmit = async (data: CreateEventInput) => {
    setIsSubmitting(true);
    try {
      const res = await createEventAction(data);
      if (!res.success) {
        toast.error(res.error || "Failed to create event");
        setIsSubmitting(false);
        return;
      }

      toast.success("Event created! Finding matched specialists...");
      router.push("/customer/matched-vendors");
    } catch {
      toast.error("An unexpected error occurred");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Badge variant="accent" className="px-3.5 py-1 text-xs font-semibold rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-500 fill-amber-500" />
            Celebration Wizard
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Create Your Event
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Specify your celebration parameters to unlock AI & curated vendor matching.
          </p>
        </div>

        <Link href="/customer/events">
          <Button variant="glass" size="sm" className="rounded-xl text-xs">
            Cancel
          </Button>
        </Link>
      </div>

      {/* Step Indicator */}
      <div className="grid grid-cols-3 gap-2">
        <div className={`h-2 rounded-full transition-colors ${step >= 1 ? "gradient-brand" : "bg-muted"}`} />
        <div className={`h-2 rounded-full transition-colors ${step >= 2 ? "gradient-brand" : "bg-muted"}`} />
        <div className={`h-2 rounded-full transition-colors ${step >= 3 ? "gradient-brand" : "bg-muted"}`} />
      </div>

      {/* Form Container */}
      <div className="glass-card p-6 sm:p-10 rounded-3xl border border-border/80 shadow-soft-xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1: Basics */}
          {step === 1 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="border-b border-border/60 pb-3">
                <h3 className="text-lg font-bold text-foreground">Step 1: Celebration Basics</h3>
                <p className="text-xs text-muted-foreground">What milestone are you celebrating?</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  placeholder="e.g. Audrey & Liam's Grand Matrimony"
                  {...register("title")}
                />
                {errors.title && <p className="text-xs text-rose-500 font-medium">{errors.title.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventDate">Celebration Date</Label>
                <Input
                  id="eventDate"
                  type="date"
                  icon={<Calendar className="w-4 h-4" />}
                  {...register("eventDate")}
                />
                {errors.eventDate && <p className="text-xs text-rose-500 font-medium">{errors.eventDate.message}</p>}
              </div>
            </div>
          )}

          {/* Step 2: Location & Headcount */}
          {step === 2 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="border-b border-border/60 pb-3">
                <h3 className="text-lg font-bold text-foreground">Step 2: Destination & Guests</h3>
                <p className="text-xs text-muted-foreground">Where will you celebrate and with whom?</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="locationCity">City or Region</Label>
                <Input
                  id="locationCity"
                  placeholder="e.g. New York, Paris, Lake Como"
                  icon={<MapPin className="w-4 h-4" />}
                  {...register("locationCity")}
                />
                {errors.locationCity && <p className="text-xs text-rose-500 font-medium">{errors.locationCity.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="locationVenue">Target Venue / Aesthetic (Optional)</Label>
                <Input
                  id="locationVenue"
                  placeholder="e.g. Historic Château or Luxury Waterfront Villa"
                  {...register("locationVenue")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="guestCount">Estimated Guest Count</Label>
                <Input
                  id="guestCount"
                  type="number"
                  placeholder="150"
                  icon={<Users className="w-4 h-4" />}
                  {...register("guestCount")}
                />
                {errors.guestCount && <p className="text-xs text-rose-500 font-medium">{errors.guestCount.message}</p>}
              </div>
            </div>
          )}

          {/* Step 3: Budget & Notes */}
          {step === 3 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="border-b border-border/60 pb-3">
                <h3 className="text-lg font-bold text-foreground">Step 3: Budget & Inspirations</h3>
                <p className="text-xs text-muted-foreground">Set your budget boundaries and custom notes.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">Total Allocated Budget ($ USD)</Label>
                <Input
                  id="budget"
                  type="number"
                  placeholder="35000"
                  icon={<DollarSign className="w-4 h-4" />}
                  {...register("budget")}
                />
                {errors.budget && <p className="text-xs text-rose-500 font-medium">{errors.budget.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Aesthetic Notes, Themes & Priorities (Optional)</Label>
                <textarea
                  id="notes"
                  rows={4}
                  placeholder="e.g. Black tie dress code, editorial cinematic videography, organic greenery mandap or archway..."
                  className="w-full p-4 rounded-2xl border border-input/80 bg-background/80 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                  {...register("notes")}
                />
              </div>
            </div>
          )}

          {/* Step Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-border/60">
            {step > 1 ? (
              <Button
                type="button"
                variant="glass"
                onClick={() => setStep(step - 1)}
                className="gap-1.5 rounded-2xl text-xs font-semibold"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>
            ) : <div />}

            {step < 3 ? (
              <Button
                type="button"
                variant="gradient"
                onClick={nextStep}
                className="gap-1.5 rounded-2xl text-xs font-bold px-6"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                variant="gradient"
                disabled={isSubmitting}
                className="gap-1.5 rounded-2xl text-xs font-bold px-8 shadow-soft-md shadow-primary/20"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Creating & Matching...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Create Event & Match Specialists</span>
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

