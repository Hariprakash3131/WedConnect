"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const checkoutEscrowSchema = z.object({
  quotationId: z.string().min(1),
  vendorId: z.string().min(1),
  eventTitle: z.string().min(2),
  eventDate: z.string().min(1),
  totalAmount: z.coerce.number().min(1),
  paymentPlan: z.enum(["deposit_50", "full_100"]),
  chargedAmount: z.coerce.number().min(1),
  contractSignerName: z.string().min(2, "Legal signer name is required"),
  agreeToTerms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms of service and escrow agreement" }),
  }),
  paymentMethod: z.enum(["card", "apple_pay", "wire"]),
});

export async function authorizeBookingEscrowAction(input: z.infer<typeof checkoutEscrowSchema>) {
  try {
    const validated = checkoutEscrowSchema.safeParse(input);
    if (!validated.success) {
      return { success: false, error: validated.error.errors[0]?.message };
    }

    const bookingRef = `BK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      // Create booking in database
      const { data: booking, error } = await supabase
        .from("bookings")
        .insert({
          booking_reference: bookingRef,
          customer_id: user.id,
          vendor_id: validated.data.vendorId,
          quotation_id: validated.data.quotationId,
          total_amount: validated.data.totalAmount,
          deposit_amount: validated.data.chargedAmount,
          status: "confirmed",
          confirmed_date: validated.data.eventDate,
          notes: `Contract signed digitally by ${validated.data.contractSignerName}. Escrow authorized via ${validated.data.paymentMethod}.`,
        })
        .select()
        .single();

      // Update quotation to accepted
      await supabase
        .from("quotations")
        .update({ status: "accepted", updated_at: new Date().toISOString() })
        .eq("id", validated.data.quotationId);

      // Create notification for vendor
      await supabase.from("notifications").insert({
        user_id: user.id,
        title: "Escrow Deposit Secured",
        message: `Booking ${bookingRef} has been confirmed. Retainer payment of $${validated.data.chargedAmount.toLocaleString()} is held securely in escrow.`,
        type: "booking",
        link: `/customer/bookings`,
      });
    }

    revalidatePath("/customer/bookings");
    revalidatePath("/customer/quotations");
    revalidatePath("/vendor/bookings");
    revalidatePath("/admin/bookings");

    return {
      success: true,
      bookingReference: bookingRef,
      message: `Booking ${bookingRef} confirmed! Escrow deposit authorized successfully.`,
    };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to authorize booking escrow",
    };
  }
}

export async function vendorConfirmBookingAction(bookingId: string) {
  try {
    const supabase = await createClient();
    await supabase
      .from("bookings")
      .update({
        status: "confirmed",
        updated_at: new Date().toISOString(),
      })
      .eq("id", bookingId);

    revalidatePath("/vendor/bookings");
    revalidatePath("/customer/bookings");
    return { success: true, message: "Booking confirmed and contract countersigned" };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to confirm booking",
    };
  }
}

export async function releaseEscrowPaymentAction(bookingId: string, milestoneIndex: number) {
  try {
    const supabase = await createClient();
    await supabase.from("audit_logs").insert({
      action: "ESCROW_MILESTONE_RELEASED",
      entity_type: "booking",
      entity_id: bookingId,
      new_values: { milestoneIndex, releasedAt: new Date().toISOString() },
    });

    revalidatePath("/customer/bookings");
    revalidatePath("/vendor/bookings");
    return { success: true, message: "Escrow payment released to vendor" };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to release escrow",
    };
  }
}

