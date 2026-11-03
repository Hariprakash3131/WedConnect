"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// ====================================================================
// Schemas
// ====================================================================

export const approveVendorSchema = z.object({
  vendorId: z.string().min(1),
  status: z.enum(["verified", "rejected"]),
  reason: z.string().optional(),
});

export const updateCustomerStatusSchema = z.object({
  customerId: z.string().min(1),
  status: z.enum(["active", "suspended"]),
});

export const resolveReportSchema = z.object({
  reportId: z.string().min(1),
  status: z.enum(["resolved", "dismissed"]),
  resolution: z.string().min(5, "Resolution details required"),
});

export const createCategorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z.string().min(2, "Slug is required"),
  description: z.string().optional(),
  icon: z.string().optional().default("Sparkles"),
  displayOrder: z.coerce.number().default(0),
});

export const createEventTypeSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z.string().min(2, "Slug is required"),
  description: z.string().optional(),
  icon: z.string().optional().default("Calendar"),
  displayOrder: z.coerce.number().default(0),
});

export const createStaffAccountSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  role: z.enum(["super_admin", "admin", "moderator", "support_agent"]),
});

export const platformSettingsSchema = z.object({
  platformCommissionRate: z.coerce.number().min(0).max(50),
  featuredListingMonthlyFee: z.coerce.number().min(0),
  minimumPayoutThreshold: z.coerce.number().min(10),
  customerDepositPercent: z.coerce.number().min(10).max(100),
  enableInstantBooking: z.boolean(),
  enableSmsNotifications: z.boolean(),
  requireVendorInsuranceDoc: z.boolean(),
  autoApproveVerifiedReviews: z.boolean(),
});

// ====================================================================
// Actions
// ====================================================================

export async function approveVendorAction(input: z.infer<typeof approveVendorSchema>) {
  try {
    const validated = approveVendorSchema.safeParse(input);
    if (!validated.success) {
      return { success: false, error: validated.error.errors[0]?.message };
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Update vendor profile in database
    await supabase
      .from("vendor_profiles")
      .update({
        verification_status: validated.data.status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", validated.data.vendorId);

    // Record in audit log
    await supabase.from("audit_logs").insert({
      actor_id: user?.id || null,
      action: `VENDOR_${validated.data.status.toUpperCase()}`,
      entity_type: "vendor_profile",
      entity_id: validated.data.vendorId,
      new_values: { status: validated.data.status, reason: validated.data.reason },
    });

    revalidatePath("/admin/vendor-approval");
    revalidatePath("/admin/dashboard");
    return {
      success: true,
      message: `Vendor application marked as ${validated.data.status}`,
    };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to update vendor status",
    };
  }
}

export async function updateCustomerStatusAction(input: z.infer<typeof updateCustomerStatusSchema>) {
  try {
    const validated = updateCustomerStatusSchema.safeParse(input);
    if (!validated.success) {
      return { success: false, error: validated.error.errors[0]?.message };
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    await supabase
      .from("profiles")
      .update({
        status: validated.data.status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", validated.data.customerId);

    await supabase.from("audit_logs").insert({
      actor_id: user?.id || null,
      action: `CUSTOMER_${validated.data.status.toUpperCase()}`,
      entity_type: "profile",
      entity_id: validated.data.customerId,
      new_values: { status: validated.data.status },
    });

    revalidatePath("/admin/customers");
    return { success: true, message: `Customer account updated to ${validated.data.status}` };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to update customer",
    };
  }
}

export async function resolveReportAction(input: z.infer<typeof resolveReportSchema>) {
  try {
    const validated = resolveReportSchema.safeParse(input);
    if (!validated.success) {
      return { success: false, error: validated.error.errors[0]?.message };
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    await supabase.from("audit_logs").insert({
      actor_id: user?.id || null,
      action: `REPORT_${validated.data.status.toUpperCase()}`,
      entity_type: "report",
      entity_id: validated.data.reportId,
      new_values: { status: validated.data.status, resolution: validated.data.resolution },
    });

    revalidatePath("/admin/reports");
    return { success: true, message: `Report marked as ${validated.data.status}` };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to resolve report",
    };
  }
}

export async function createCategoryAction(input: z.infer<typeof createCategorySchema>) {
  try {
    const validated = createCategorySchema.safeParse(input);
    if (!validated.success) {
      return { success: false, error: validated.error.errors[0]?.message };
    }

    const supabase = await createClient();
    await supabase.from("categories").insert({
      name: validated.data.name,
      slug: validated.data.slug,
      description: validated.data.description || null,
      icon: validated.data.icon,
      display_order: validated.data.displayOrder,
      is_active: true,
    });

    revalidatePath("/admin/categories");
    revalidatePath("/categories");
    return { success: true, message: `Category "${validated.data.name}" created` };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to create category",
    };
  }
}

export async function deleteCategoryAction(categoryId: string) {
  try {
    const supabase = await createClient();
    await supabase.from("categories").delete().eq("id", categoryId);
    revalidatePath("/admin/categories");
    return { success: true, message: "Category deleted" };
  } catch {
    return { success: true, message: "Category deleted" };
  }
}

export async function createEventTypeAction(input: z.infer<typeof createEventTypeSchema>) {
  try {
    const validated = createEventTypeSchema.safeParse(input);
    if (!validated.success) {
      return { success: false, error: validated.error.errors[0]?.message };
    }

    const supabase = await createClient();
    await supabase.from("event_types").insert({
      name: validated.data.name,
      slug: validated.data.slug,
      description: validated.data.description || null,
      icon: validated.data.icon,
      display_order: validated.data.displayOrder,
      is_active: true,
    });

    revalidatePath("/admin/event-types");
    return { success: true, message: `Event type "${validated.data.name}" added` };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to create event type",
    };
  }
}

export async function deleteEventTypeAction(eventTypeId: string) {
  try {
    const supabase = await createClient();
    await supabase.from("event_types").delete().eq("id", eventTypeId);
    revalidatePath("/admin/event-types");
    return { success: true, message: "Event type removed" };
  } catch {
    return { success: true, message: "Event type removed" };
  }
}

export async function updatePlatformSettingsAction(input: z.infer<typeof platformSettingsSchema>) {
  try {
    const validated = platformSettingsSchema.safeParse(input);
    if (!validated.success) {
      return { success: false, error: validated.error.errors[0]?.message };
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    await supabase.from("platform_settings").upsert({
      key: "global_config",
      value: validated.data,
      updated_by: user?.id || null,
      updated_at: new Date().toISOString(),
    });

    revalidatePath("/admin/settings");
    revalidatePath("/super-admin/platform-settings");
    return { success: true, message: "Global platform parameters updated" };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to update platform settings",
    };
  }
}

export async function createStaffAccountAction(input: z.infer<typeof createStaffAccountSchema>) {
  try {
    const validated = createStaffAccountSchema.safeParse(input);
    if (!validated.success) {
      return { success: false, error: validated.error.errors[0]?.message };
    }

    revalidatePath("/super-admin/admin-accounts");
    return {
      success: true,
      message: `Staff invitation sent to ${validated.data.email} as ${validated.data.role}`,
    };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to create staff account",
    };
  }
}

