import { create } from "zustand";

export interface ChatAttachment {
  id: string;
  name: string;
  size: string;
  type: "pdf" | "image" | "audio" | "contract";
  url?: string;
}

export interface ChatQuotationEmbed {
  quoteId: string;
  quoteNumber: string;
  amount: number;
  validUntil: string;
  deliverablesCount: number;
  status: "sent" | "accepted" | "declined";
}

export interface MessageItem {
  id: string;
  conversationId: string;
  senderId: string;
  senderRole: "customer" | "vendor";
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  status: "sending" | "sent" | "delivered" | "read";
  attachments?: ChatAttachment[];
  quotationEmbed?: ChatQuotationEmbed;
  reactions?: Record<string, number>; // emoji -> count
  audioWaveform?: number[]; // voice note
}

export interface ConversationThread {
  id: string;
  participantId: string;
  participantName: string;
  participantRole: "customer" | "vendor";
  participantAvatar?: string;
  participantBadge?: string;
  eventTitle: string;
  eventDate: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  isTyping: boolean;
}

interface ChatState {
  activeConversationId: string;
  conversations: ConversationThread[];
  messages: Record<string, MessageItem[]>; // conversationId -> messages
  isTypingMap: Record<string, boolean>; // conversationId -> boolean
  soundEnabled: boolean;
  setActiveConversationId: (id: string) => void;
  setConversations: (conversations: ConversationThread[]) => void;
  addMessage: (conversationId: string, message: MessageItem) => void;
  markConversationAsRead: (conversationId: string) => void;
  setTyping: (conversationId: string, isTyping: boolean) => void;
  addReaction: (conversationId: string, messageId: string, emoji: string) => void;
  toggleSound: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  activeConversationId: "conv-1",
  conversations: [
    {
      id: "conv-1",
      participantId: "v2",
      participantName: "Aura Cinematic Stories",
      participantRole: "vendor",
      participantAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      participantBadge: "Verified Master Cinematographer",
      eventTitle: "Audrey & Liam Grand Wedding",
      eventDate: "Oct 18, 2026",
      lastMessage: "I have uploaded formal quotation QT-2026-081 for your review.",
      lastMessageTime: "10:45 AM",
      unreadCount: 1,
      isOnline: true,
      isTyping: false,
    },
    {
      id: "conv-2",
      participantId: "v3",
      participantName: "Maison de Fleurs Couture",
      participantRole: "vendor",
      participantAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      participantBadge: "Haute Floral Architect",
      eventTitle: "Oheka Castle Celebration",
      eventDate: "Nov 14, 2026",
      lastMessage: "White peonies and garden roses will be in peak season for your celebration!",
      lastMessageTime: "Yesterday",
      unreadCount: 0,
      isOnline: true,
      isTyping: false,
    },
    {
      id: "conv-3",
      participantId: "v1",
      participantName: "Villa Ephrussi & Estates",
      participantRole: "vendor",
      participantAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
      participantBadge: "Historic Estate Concierge",
      eventTitle: "Spring Wedding Gala",
      eventDate: "May 22, 2027",
      lastMessage: "Retainer confirmed. Our estate planner is at your full disposal.",
      lastMessageTime: "Oct 20",
      unreadCount: 0,
      isOnline: false,
      isTyping: false,
    },
  ],
  messages: {
    "conv-1": [
      {
        id: "m-101",
        conversationId: "conv-1",
        senderId: "cust-1",
        senderRole: "customer",
        senderName: "Audrey Hepburn",
        content: "Hello Aura Cinematics! We adore your editorial films and wanted to inquire about our wedding on October 18, 2026 at The Plaza Hotel in New York.",
        timestamp: "Yesterday, 3:15 PM",
        isRead: true,
        status: "read",
      },
      {
        id: "m-102",
        conversationId: "conv-1",
        senderId: "v2",
        senderRole: "vendor",
        senderName: "Aura Cinematic Stories",
        content: "Greetings Audrey & Liam! Yes, October 18, 2026 is currently open in our schedule. We love shooting in the Grand Ballroom of The Plaza Hotel.",
        timestamp: "Yesterday, 4:20 PM",
        isRead: true,
        status: "read",
      },
      {
        id: "m-103",
        conversationId: "conv-1",
        senderId: "v2",
        senderRole: "vendor",
        senderName: "Aura Cinematic Stories",
        content: "Here is a quick 30-second audio note explaining our 16mm analog film approach and drone flight clearances over Central Park South:",
        timestamp: "Yesterday, 4:22 PM",
        isRead: true,
        status: "read",
        audioWaveform: [30, 45, 80, 95, 60, 40, 75, 85, 90, 65, 40, 55, 30],
      },
      {
        id: "m-104",
        conversationId: "conv-1",
        senderId: "v2",
        senderRole: "vendor",
        senderName: "Aura Cinematic Stories",
        content: "I have prepared the formal itemized proposal for your review. It includes 10 hours master cinematographer coverage, senior secondary operator, 4K aerial drone, and full archival SSD drive:",
        timestamp: "Today, 10:45 AM",
        isRead: false,
        status: "delivered",
        quotationEmbed: {
          quoteId: "qt-2026-081",
          quoteNumber: "QT-2026-081",
          amount: 7076.88,
          validUntil: "2026-11-30",
          deliverablesCount: 3,
          status: "sent",
        },
        attachments: [
          {
            id: "att-1",
            name: "Aura_Cinematics_Formal_Quote_QT-2026-081.pdf",
            size: "2.4 MB",
            type: "pdf",
          },
        ],
      },
    ],
    "conv-2": [
      {
        id: "m-201",
        conversationId: "conv-2",
        senderId: "cust-1",
        senderRole: "customer",
        senderName: "Audrey Hepburn",
        content: "Hi! We are seeking an architectural ceremonial archway with monochromatic white florals and floating candelabras.",
        timestamp: "2 days ago",
        isRead: true,
        status: "read",
      },
      {
        id: "m-202",
        conversationId: "conv-2",
        senderId: "v3",
        senderRole: "vendor",
        senderName: "Maison de Fleurs Couture",
        content: "White peonies and garden roses will be in peak season for your celebration! I've sketched an arch concept with 18 grand table centerpieces.",
        timestamp: "Yesterday, 6:00 PM",
        isRead: true,
        status: "read",
        attachments: [
          {
            id: "att-2",
            name: "Maison_Fleurs_Design_Moodboard.pdf",
            size: "4.8 MB",
            type: "pdf",
          },
        ],
      },
    ],
  },
  isTypingMap: {},
  soundEnabled: true,

  setActiveConversationId: (id) =>
    set({ activeConversationId: id }),

  setConversations: (conversations) =>
    set({ conversations }),

  addMessage: (conversationId, message) =>
    set((state) => {
      const currentList = state.messages[conversationId] || [];
      const updatedConversations = state.conversations.map((c) =>
        c.id === conversationId
          ? {
              ...c,
              lastMessage: message.content,
              lastMessageTime: "Just now",
            }
          : c
      );

      return {
        messages: {
          ...state.messages,
          [conversationId]: [...currentList, message],
        },
        conversations: updatedConversations,
      };
    }),

  markConversationAsRead: (conversationId) =>
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === conversationId ? { ...c, unreadCount: 0 } : c
      ),
      messages: {
        ...state.messages,
        [conversationId]: (state.messages[conversationId] || []).map((m) => ({
          ...m,
          isRead: true,
          status: "read",
        })),
      },
    })),

  setTyping: (conversationId, isTyping) =>
    set((state) => ({
      isTypingMap: {
        ...state.isTypingMap,
        [conversationId]: isTyping,
      },
      conversations: state.conversations.map((c) =>
        c.id === conversationId ? { ...c, isTyping } : c
      ),
    })),

  addReaction: (conversationId, messageId, emoji) =>
    set((state) => {
      const thread = state.messages[conversationId] || [];
      const updated = thread.map((m) => {
        if (m.id === messageId) {
          const currentReactions = { ...(m.reactions || {}) };
          currentReactions[emoji] = (currentReactions[emoji] || 0) + 1;
          return { ...m, reactions: currentReactions };
        }
        return m;
      });

      return {
        messages: {
          ...state.messages,
          [conversationId]: updated,
        },
      };
    }),

  toggleSound: () =>
    set((state) => ({ soundEnabled: !state.soundEnabled })),
}));

