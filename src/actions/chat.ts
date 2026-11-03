"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const sendMessageSchema = z.object({
  conversationId: z.string().min(1),
  content: z.string().min(1, "Message content is required"),
  attachments: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      size: z.string(),
      type: z.enum(["pdf", "image", "audio", "contract"]),
      url: z.string().optional(),
    })
  ).optional().default([]),
});

export async function sendMessageAction(input: z.input<typeof sendMessageSchema>) {
  try {
    const validated = sendMessageSchema.safeParse(input);
    if (!validated.success) {
      return { success: false, error: validated.error.errors[0]?.message };
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      // Insert into messages table
      const { data: message, error } = await supabase
        .from("messages")
        .insert({
          conversation_id: validated.data.conversationId,
          sender_id: user.id,
          content: validated.data.content,
          attachments: validated.data.attachments,
          is_read: false,
        })
        .select()
        .single();

      // Update conversation last_message_at
      await supabase
        .from("conversations")
        .update({ last_message_at: new Date().toISOString() })
        .eq("id", validated.data.conversationId);
    }

    revalidatePath("/customer/chat");
    revalidatePath("/vendor/chat");
    return { success: true, message: "Message dispatched" };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to send message",
    };
  }
}

export async function markMessagesReadAction(conversationId: string) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      await supabase
        .from("messages")
        .update({ is_read: true })
        .eq("conversation_id", conversationId)
        .neq("sender_id", user.id);
    }

    return { success: true };
  } catch {
    return { success: true };
  }
}

