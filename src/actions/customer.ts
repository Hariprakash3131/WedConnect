"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { Event, Quotation, Booking, Review, VendorProfile } from "@/types";

// Schema for Event Creation
export const createEventSchema = z.object({
  title: z.string().min(3, "Event title must be at least 3 characters"),
  eventTypeId: z.string().optional(),
  eventDate: z.string().min(1, "Event date is required"),
  locationCity: z.string().min(2, "City is required"),
  locationVenue: z.string().optional(),
  guestCount: z.coerce.number().min(1, "Guest count must be at least 1"),
  budget: z.coerce.number().min(100, "Budget must be at least $100"),
  notes: z.string().optional(),
});

export type CreateEventInput = z.infer<typeof createEventSchema>;

export async function createEventAction(input: CreateEventInput) {
  try {
    const validated = createEventSchema.safeParse(input);
    if (!validated.success) {
      return { success: false, error: validated.error.errors[0]?.message };
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "Authentication required" };
    }

    const { data, error } = await supabase
      .from("events")
      .insert({
        customer_id: user.id,
        title: validated.data.title,
        event_type_id: validated.data.eventTypeId || null,
        event_date: validated.data.eventDate,
        location_city: validated.data.locationCity,
        location_venue: validated.data.locationVenue || null,
        guest_count: validated.data.guestCount,
        budget: validated.data.budget,
        notes: validated.data.notes || null,
        status: "planning",
      })
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/customer/events");
    revalidatePath("/customer/dashboard");
    return { success: true, event: data };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to create event",
    };
  }
}

export async function sendEnquiryAction(input: {
  vendorId: string;
  eventId?: string;
  message: string;
  budget?: number;
  preferredDate?: string;
}) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "Authentication required" };
    }

    const { data, error } = await supabase
      .from("enquiries")
      .insert({
        customer_id: user.id,
        vendor_id: input.vendorId,
        event_id: input.eventId || null,
        message: input.message,
        budget: input.budget || null,
        preferred_date: input.preferredDate || null,
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    // Also initiate conversation channel
    await supabase
      .from("conversations")
      .insert({
        customer_id: user.id,
        vendor_id: input.vendorId,
        enquiry_id: data.id,
      })
      .select()
      .maybeSingle();

    revalidatePath("/customer/quotations");
    revalidatePath("/customer/chat");
    return { success: true, enquiry: data };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to send enquiry",
    };
  }
}

export async function acceptQuotationAction(quotationId: string) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "Authentication required" };
    }

    // Update quotation status
    const { data: quote, error: quoteError } = await supabase
      .from("quotations")
      .update({ status: "accepted" })
      .eq("id", quotationId)
      .select("*, vendor:vendor_profiles(*)")
      .single();

    if (quoteError || !quote) {
      return { success: false, error: quoteError?.message || "Quotation not found" };
    }

    // Generate Booking reference
    const bookingReference = `BK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .insert({
        booking_reference: bookingReference,
        customer_id: user.id,
        vendor_id: quote.vendor_id,
        quotation_id: quote.id,
        total_amount: quote.total_amount,
        deposit_amount: quote.total_amount * 0.3, // 30% deposit standard
        confirmed_date: quote.valid_until,
        status: "pending_confirmation",
      })
      .select()
      .single();

    if (bookingError) {
      return { success: false, error: bookingError.message };
    }

    revalidatePath("/customer/quotations");
    revalidatePath("/customer/bookings");
    revalidatePath("/customer/dashboard");
    return { success: true, booking };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to accept quotation",
    };
  }
}

export async function rejectQuotationAction(quotationId: string) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { success: false, error: "Authentication required" };

    const { error } = await supabase
      .from("quotations")
      .update({ status: "rejected" })
      .eq("id", quotationId);

    if (error) return { success: false, error: error.message };

    revalidatePath("/customer/quotations");
    return { success: true };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to update quotation",
    };
  }
}

export async function submitReviewAction(input: {
  bookingId: string;
  vendorId: string;
  rating: number;
  comment: string;
}) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { success: false, error: "Authentication required" };

    const { data, error } = await supabase
      .from("reviews")
      .insert({
        customer_id: user.id,
        vendor_id: input.vendorId,
        booking_id: input.bookingId || null,
        rating: input.rating,
        comment: input.comment,
        status: "published",
      })
      .select()
      .single();

    if (error) return { success: false, error: error.message };

    revalidatePath("/customer/reviews");
    revalidatePath("/customer/bookings");
    return { success: true, review: data };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to submit review",
    };
  }
}

export async function updateCustomerProfileAction(input: {
  fullName: string;
  phone?: string;
  avatarUrl?: string;
}) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { success: false, error: "Authentication required" };

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: input.fullName,
        phone: input.phone || null,
        avatar_url: input.avatarUrl || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    if (error) return { success: false, error: error.message };

    revalidatePath("/customer/profile");
    revalidatePath("/customer/dashboard");
    return { success: true };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to update profile",
    };
  }
}

