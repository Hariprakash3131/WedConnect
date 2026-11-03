"use client";

import * as React from "react";
import { createClient } from "@/lib/supabase/client";
import { useChatStore, MessageItem } from "@/store/chat-store";

export function useRealtimeChat(conversationId: string, currentRole: "customer" | "vendor") {
  const { addMessage, setTyping, markConversationAsRead } = useChatStore();
  const typingTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    if (!conversationId) return;

    markConversationAsRead(conversationId);

    const supabase = createClient();
    const channelName = `realtime-chat:${conversationId}`;

    const channel = supabase
      .channel(channelName)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          const newMsg = payload.new as any;
          if (newMsg) {
            addMessage(conversationId, {
              id: newMsg.id,
              conversationId: newMsg.conversation_id,
              senderId: newMsg.sender_id,
              senderRole: currentRole === "customer" ? "vendor" : "customer",
              senderName: currentRole === "customer" ? "Specialist Vendor" : "Couple",
              content: newMsg.content,
              timestamp: "Just now",
              isRead: true,
              status: "delivered",
              attachments: newMsg.attachments || [],
            });
          }
        }
      )
      .on("broadcast", { event: "typing" }, (payload) => {
        if (payload?.payload?.senderRole !== currentRole) {
          setTyping(conversationId, true);
          if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
          typingTimeoutRef.current = setTimeout(() => {
            setTyping(conversationId, false);
          }, 2500);
        }
      })
      .subscribe();

    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      supabase.removeChannel(channel);
    };
  }, [conversationId, currentRole, addMessage, setTyping, markConversationAsRead]);

  const broadcastTyping = () => {
    try {
      const supabase = createClient();
      const channel = supabase.channel(`realtime-chat:${conversationId}`);
      channel.send({
        type: "broadcast",
        event: "typing",
        payload: { senderRole: currentRole },
      });
    } catch {
      // Ignore broadcast fallback
    }
  };

  return { broadcastTyping };
}

