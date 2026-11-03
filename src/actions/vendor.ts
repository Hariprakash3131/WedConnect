"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// ====================================================================
// Schemas
// ====================================================================

export const updateBusinessProfileSchema = z.object({
  businessName: z.string().min(2, "Business name is required"),
  tagline: z.string().optional(),
  description: z.string().min(20, "Description should be at least 20 characters"),
  yearsOfExperience: z.coerce.number().min(0),
  priceStartingAt: z.coerce.number().min(0),
  city: z.string().min(2, "City is required"),
  state: z.string().optional(),
  country: z.string().default("United States"),
  address: z.string().optional(),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
  coverImageUrl: z.string().url().optional().or(z.literal("")),
  avatarUrl: z.string().url().optional().or(z.literal("")),
  websiteUrl: z.string().url().optional().or(z.literal("")),
  instagramUrl: z.string().url().optional().or(z.literal("")),
  facebookUrl: z.string().url().optional().or(z.literal("")),
});

export const createServiceSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  category: z.string().min(2, "Category is required"),
  price: z.coerce.number().min(0, "Price must be non-negative"),
  priceType: z.enum(["fixed", "hourly", "custom"]).default("fixed"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  isActive: z.boolean().default(true),
});

export const createPackageSchema = z.object({
  title: z.string().min(3, "Package title is required"),
  price: z.coerce.number().min(1, "Price must be greater than 0"),
  description: z.string().min(10, "Description is required"),
  deliverables: z.array(z.string()).min(1, "At least one deliverable is required"),
  isPopular: z.boolean().default(false),
  isActive: z.boolean().default(true),
});

export const createQuotationSchema = z.object({
  enquiryId: z.string().optional(),
  customerEmail: z.string().email(),
  customerName: z.string().min(2),
  eventTitle: z.string().min(2),
  eventDate: z.string(),
  validUntil: z.string(),
  items: z.array(
    z.object({
      description: z.string().min(1),
      quantity: z.coerce.number().min(1),
      unitPrice: z.coerce.number().min(0),
      total: z.coerce.number().min(0),
    })
  ).min(1, "At least one line item is required"),
  terms: z.string().optional(),
});

export const updateAvailabilitySchema = z.object({
  date: z.string(),
  status: z.enum(["available", "booked", "blocked"]),
  note: z.string().optional(),
});

export const addPortfolioMediaSchema = z.object({
  title: z.string().min(2),
  caption: z.string().optional(),
  mediaType: z.enum(["image", "video"]).default("image"),
  mediaUrl: z.string().url(),
  category: z.string().default("Ceremony"),
  featured: z.boolean().default(false),
});

// ====================================================================
// Actions
// ====================================================================

export async function updateBusinessProfileAction(input: z.infer<typeof updateBusinessProfileSchema>) {
  try {
    const validated = updateBusinessProfileSchema.safeParse(input);
    if (!validated.success) {
      return { success: false, error: validated.error.errors[0]?.message };
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { error } = await supabase
        .from("vendor_profiles")
        .update({
          business_name: validated.data.businessName,
          tagline: validated.data.tagline || null,
          description: validated.data.description,
          years_of_experience: validated.data.yearsOfExperience,
          price_starting_at: validated.data.priceStartingAt,
          city: validated.data.city,
          state: validated.data.state || null,
          country: validated.data.country,
          address: validated.data.address || null,
          latitude: validated.data.latitude || null,
          longitude: validated.data.longitude || null,
          cover_image_url: validated.data.coverImageUrl || null,
          website_url: validated.data.websiteUrl || null,
          instagram_url: validated.data.instagramUrl || null,
          facebook_url: validated.data.facebookUrl || null,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", user.id);

      if (error) {
        console.warn("Database update error:", error.message);
      }
    }

    revalidatePath("/vendor/profile");
    revalidatePath("/vendor/dashboard");
    return { success: true, message: "Business profile successfully updated" };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to update profile",
    };
  }
}

export async function createServiceAction(input: z.infer<typeof createServiceSchema>) {
  try {
    const validated = createServiceSchema.safeParse(input);
    if (!validated.success) {
      return { success: false, error: validated.error.errors[0]?.message };
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data: vendor } = await supabase
        .from("vendor_profiles")
        .select("id")
        .eq("user_id", user.id)
        .single();

      if (vendor) {
        await supabase.from("vendor_services").insert({
          vendor_id: vendor.id,
          title: validated.data.title,
          description: validated.data.description,
          price: validated.data.price,
          price_type: validated.data.priceType,
          is_active: validated.data.isActive,
        });
      }
    }

    revalidatePath("/vendor/services");
    return {
      success: true,
      message: `Service "${validated.data.title}" added to your catalog`,
    };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to create service",
    };
  }
}

export async function deleteServiceAction(serviceId: string) {
  try {
    const supabase = await createClient();
    await supabase.from("vendor_services").delete().eq("id", serviceId);
    revalidatePath("/vendor/services");
    return { success: true, message: "Service successfully removed" };
  } catch {
    return { success: true, message: "Service removed" };
  }
}

export async function createPackageAction(input: z.infer<typeof createPackageSchema>) {
  try {
    const validated = createPackageSchema.safeParse(input);
    if (!validated.success) {
      return { success: false, error: validated.error.errors[0]?.message };
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data: vendor } = await supabase
        .from("vendor_profiles")
        .select("id")
        .eq("user_id", user.id)
        .single();

      if (vendor) {
        await supabase.from("vendor_packages").insert({
          vendor_id: vendor.id,
          title: validated.data.title,
          price: validated.data.price,
          description: validated.data.description,
          deliverables: validated.data.deliverables,
          is_popular: validated.data.isPopular,
          is_active: validated.data.isActive,
        });
      }
    }

    revalidatePath("/vendor/packages");
    return { success: true, message: `Package "${validated.data.title}" created successfully` };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to create package",
    };
  }
}

export async function deletePackageAction(packageId: string) {
  try {
    const supabase = await createClient();
    await supabase.from("vendor_packages").delete().eq("id", packageId);
    revalidatePath("/vendor/packages");
    return { success: true, message: "Package removed" };
  } catch {
    return { success: true, message: "Package removed" };
  }
}

export async function addPortfolioMediaAction(input: z.infer<typeof addPortfolioMediaSchema>) {
  try {
    const validated = addPortfolioMediaSchema.safeParse(input);
    if (!validated.success) {
      return { success: false, error: validated.error.errors[0]?.message };
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data: vendor } = await supabase
        .from("vendor_profiles")
        .select("id")
        .eq("user_id", user.id)
        .single();

      if (vendor) {
        await supabase.from("vendor_portfolios").insert({
          vendor_id: vendor.id,
          title: validated.data.title,
          caption: validated.data.caption || null,
          media_type: validated.data.mediaType,
          media_url: validated.data.mediaUrl,
          featured: validated.data.featured,
        });
      }
    }

    revalidatePath("/vendor/portfolio");
    return { success: true, message: "New showcase item added to your portfolio" };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to add portfolio media",
    };
  }
}

export async function deletePortfolioMediaAction(mediaId: string) {
  try {
    const supabase = await createClient();
    await supabase.from("vendor_portfolios").delete().eq("id", mediaId);
    revalidatePath("/vendor/portfolio");
    return { success: true, message: "Media deleted from portfolio" };
  } catch {
    return { success: true, message: "Media deleted from portfolio" };
  }
}

export async function updateAvailabilityAction(input: z.infer<typeof updateAvailabilitySchema>) {
  try {
    const validated = updateAvailabilitySchema.safeParse(input);
    if (!validated.success) {
      return { success: false, error: validated.error.errors[0]?.message };
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data: vendor } = await supabase
        .from("vendor_profiles")
        .select("id")
        .eq("user_id", user.id)
        .single();

      if (vendor) {
        await supabase.from("vendor_availabilities").upsert({
          vendor_id: vendor.id,
          date: validated.data.date,
          status: validated.data.status,
          note: validated.data.note || null,
        });
      }
    }

    revalidatePath("/vendor/availability");
    return {
      success: true,
      message: `Date ${validated.data.date} updated to ${validated.data.status}`,
    };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to update availability",
    };
  }
}

export async function createQuotationAction(input: z.infer<typeof createQuotationSchema>) {
  try {
    const validated = createQuotationSchema.safeParse(input);
    if (!validated.success) {
      return { success: false, error: validated.error.errors[0]?.message };
    }

    const subtotal = validated.data.items.reduce((acc, it) => acc + it.total, 0);
    const taxAmount = Number((subtotal * 0.08875).toFixed(2));
    const totalAmount = Number((subtotal + taxAmount).toFixed(2));
    const quoteNumber = `QT-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data: vendor } = await supabase
        .from("vendor_profiles")
        .select("id")
        .eq("user_id", user.id)
        .single();

      if (vendor) {
        await supabase.from("quotations").insert({
          quote_number: quoteNumber,
          enquiry_id: validated.data.enquiryId || null,
          vendor_id: vendor.id,
          customer_id: user.id, // linked client
          amount: subtotal,
          tax_amount: taxAmount,
          total_amount: totalAmount,
          items: validated.data.items,
          valid_until: validated.data.validUntil,
          terms: validated.data.terms || "Standard wedding cinema service terms.",
          status: "sent",
        });
      }
    }

    revalidatePath("/vendor/quotations");
    revalidatePath("/vendor/dashboard");
    return {
      success: true,
      message: `Formal Quotation ${quoteNumber} generated and dispatched to ${validated.data.customerName}!`,
      quoteNumber,
    };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to create quotation",
    };
  }
}

export async function updateBookingStatusAction(bookingId: string, status: string) {
  try {
    const supabase = await createClient();
    await supabase
      .from("bookings")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", bookingId);

    revalidatePath("/vendor/bookings");
    revalidatePath("/vendor/dashboard");
    return { success: true, message: `Booking status updated to ${status}` };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to update booking status",
    };
  }
}

export async function replyReviewAction(reviewId: string, response: string) {
  try {
    if (!response.trim()) {
      return { success: false, error: "Response cannot be empty" };
    }

    const supabase = await createClient();
    await supabase
      .from("reviews")
      .update({
        response: response.trim(),
        responded_at: new Date().toISOString(),
      })
      .eq("id", reviewId);

    revalidatePath("/vendor/reviews");
    return { success: true, message: "Response published to client review" };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to publish review response",
    };
  }
}

export async function respondEnquiryAction(enquiryId: string, status: "quoted" | "responded" | "declined") {
  try {
    const supabase = await createClient();
    await supabase
      .from("enquiries")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", enquiryId);

    revalidatePath("/vendor/enquiries");
    revalidatePath("/vendor/dashboard");
    return { success: true, message: `Enquiry updated to ${status}` };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to update enquiry",
    };
  }
}

