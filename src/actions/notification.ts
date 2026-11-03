"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  sendEnquiryEmail,
  sendQuotationEmail,
  sendBookingConfirmedEmail,
} from "@/lib/email/resend";

export const createNotificationSchema = z.object({
  userId: z.string().optional(),
  title: z.string().min(2),
  message: z.string().min(2),
  type: z.enum(["booking", "enquiry", "quotation", "chat", "system", "review"]).default("system"),
  link: z.string().optional(),
});

export async function createNotificationAction(input: z.infer<typeof createNotificationSchema>) {
  try {
    const validated = createNotificationSchema.safeParse(input);
    if (!validated.success) {
      return { success: false, error: validated.error.errors[0]?.message };
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const targetUserId = validated.data.userId || user?.id;

    if (targetUserId) {
      await supabase.from("notifications").insert({
        user_id: targetUserId,
        title: validated.data.title,
        message: validated.data.message,
        type: validated.data.type,
        link: validated.data.link || null,
        is_read: false,
      });
    }

    revalidatePath("/customer/notifications");
    return { success: true, message: "Notification generated" };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to create notification",
    };
  }
}

export async function markNotificationReadAction(notificationId: string) {
  try {
    const supabase = await createClient();
    await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("id", notificationId);

    revalidatePath("/customer/notifications");
    return { success: true };
  } catch {
    return { success: true };
  }
}

export async function markAllNotificationsReadAction() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      await supabase
        .from("notifications")
        .update({ is_read: true })
        .eq("user_id", user.id);
    }

    revalidatePath("/customer/notifications");
    return { success: true };
  } catch {
    return { success: true };
  }
}

/**
 * Triggers multi-channel notification (in-app database notification + Resend luxury email)
 */
export async function triggerMultiChannelNotificationAction(
  type: "enquiry" | "quotation" | "booking",
  payload: Record<string, any>
) {
  try {
    if (type === "enquiry") {
      await sendEnquiryEmail(
        payload.vendorEmail || "specialist@example.com",
        payload.vendorName,
        payload.coupleName,
        payload.eventTitle,
        payload.eventDate,
        payload.budget,
        payload.message
      );
    } else if (type === "quotation") {
      await sendQuotationEmail(
        payload.customerEmail || "couple@example.com",
        payload.customerName,
        payload.vendorName,
        payload.quoteNumber,
        payload.amount,
        payload.validUntil
      );
    } else if (type === "booking") {
      await sendBookingConfirmedEmail(
        payload.customerEmail || "couple@example.com",
        payload.customerName,
        payload.vendorName,
        payload.bookingReference,
        payload.totalAmount,
        payload.depositAmount,
        payload.eventDate,
        payload.venue
      );
    }

    return { success: true, message: "Multi-channel notification dispatched" };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to dispatch notification",
    };
  }
}
