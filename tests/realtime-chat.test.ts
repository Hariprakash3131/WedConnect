import { describe, it, expect } from "vitest";

interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderRole: "customer" | "vendor";
  content?: string;
  type: "text" | "audio" | "image" | "quotation";
  mediaUrl?: string;
  audioDurationSeconds?: number;
  quotationId?: string;
  createdAt: string;
}

function validateChatMessage(msg: Partial<ChatMessage>): { valid: boolean; reason?: string } {
  if (!msg.conversationId || !msg.senderId) {
    return { valid: false, reason: "Missing conversationId or senderId" };
  }

  if (msg.type === "text" && (!msg.content || msg.content.trim().length === 0)) {
    return { valid: false, reason: "Text message cannot be empty" };
  }

  if (msg.type === "audio") {
    if (!msg.mediaUrl) return { valid: false, reason: "Audio message requires mediaUrl" };
    if (!msg.audioDurationSeconds || msg.audioDurationSeconds <= 0 || msg.audioDurationSeconds > 300) {
      return { valid: false, reason: "Audio note duration must be between 1 and 300 seconds" };
    }
  }

  if (msg.type === "quotation" && !msg.quotationId) {
    return { valid: false, reason: "Quotation message must reference valid quotationId" };
  }

  return { valid: true };
}

describe("Real-Time Chat Engine & Message Payload Validator", () => {
  it("approves valid text messages", () => {
    const res = validateChatMessage({
      conversationId: "conv-1",
      senderId: "usr-customer-1",
      senderRole: "customer",
      type: "text",
      content: "Hello! We would love to book your luxury wedding cinema package.",
    });
    expect(res.valid).toBe(true);
  });

  it("rejects empty text messages", () => {
    const res = validateChatMessage({
      conversationId: "conv-1",
      senderId: "usr-customer-1",
      senderRole: "customer",
      type: "text",
      content: "   ",
    });
    expect(res.valid).toBe(false);
    expect(res.reason).toContain("cannot be empty");
  });

  it("validates audio voice notes with strict duration limit under 5 minutes", () => {
    const validVoiceNote = validateChatMessage({
      conversationId: "conv-1",
      senderId: "usr-vendor-1",
      senderRole: "vendor",
      type: "audio",
      mediaUrl: "https://storage.supabase.co/audio/note-1.webm",
      audioDurationSeconds: 45,
    });
    expect(validVoiceNote.valid).toBe(true);

    const tooLongVoiceNote = validateChatMessage({
      conversationId: "conv-1",
      senderId: "usr-vendor-1",
      senderRole: "vendor",
      type: "audio",
      mediaUrl: "https://storage.supabase.co/audio/note-2.webm",
      audioDurationSeconds: 420, // 7 minutes
    });
    expect(tooLongVoiceNote.valid).toBe(false);
    expect(tooLongVoiceNote.reason).toContain("between 1 and 300 seconds");
  });

  it("requires quotationId for interactive quotation embeds", () => {
    const validQuote = validateChatMessage({
      conversationId: "conv-1",
      senderId: "usr-vendor-1",
      senderRole: "vendor",
      type: "quotation",
      quotationId: "qt-999",
    });
    expect(validQuote.valid).toBe(true);

    const invalidQuote = validateChatMessage({
      conversationId: "conv-1",
      senderId: "usr-vendor-1",
      senderRole: "vendor",
      type: "quotation",
    });
    expect(invalidQuote.valid).toBe(false);
  });
});

