"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  MessageSquare,
  Send,
  Paperclip,
  CheckCheck,
  Search,
  ShieldCheck,
  Star,
  FileText,
  Clock,
  Sparkles,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials, formatDateTime } from "@/lib/utils";
import toast from "react-hot-toast";

interface ChatMessage {
  id: string;
  sender: "customer" | "vendor";
  content: string;
  timestamp: string;
  attachments?: Array<{ name: string; size: string; url?: string }>;
}

interface ConversationItem {
  id: string;
  vendorId: string;
  vendorName: string;
  category: string;
  avatarUrl?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isVerified: boolean;
  messages: ChatMessage[];
}

const INITIAL_CONVERSATIONS: ConversationItem[] = [
  {
    id: "conv-1",
    vendorId: "v2",
    vendorName: "Aura Cinematic Stories",
    category: "Photography & Cinema",
    lastMessage: "I have uploaded the formal quotation QT-2026-081 for your review.",
    lastMessageTime: "10:45 AM",
    unreadCount: 1,
    isVerified: true,
    messages: [
      {
        id: "m1",
        sender: "customer",
        content: "Hello! We love your editorial cinematography and wanted to know if you're available for our wedding on October 18, 2026 in New York.",
        timestamp: "Yesterday, 3:15 PM",
      },
      {
        id: "m2",
        sender: "vendor",
        content: "Greetings Audrey & Liam! Yes, October 18, 2026 is currently open in our schedule. We'd be honored to capture your celebration at The Plaza Hotel.",
        timestamp: "Yesterday, 4:20 PM",
      },
      {
        id: "m3",
        sender: "vendor",
        content: "I have prepared and uploaded the formal itemized quotation QT-2026-081 including lead master cinematographer, senior assistant, and 4K aerial drone coverage for your review.",
        timestamp: "Today, 10:45 AM",
        attachments: [
          { name: "Aura_Cinematics_Quote_QT-2026-081.pdf", size: "2.4 MB" },
        ],
      },
    ],
  },
  {
    id: "conv-2",
    vendorId: "v3",
    vendorName: "Maison de Fleurs Couture",
    category: "Haute Floral & Decor",
    lastMessage: "White peonies and garden roses will be in peak season for your date.",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
    isVerified: true,
    messages: [
      {
        id: "m4",
        sender: "customer",
        content: "Hi! We are seeking an architectural ceremonial archway with monochromatic white florals.",
        timestamp: "2 days ago",
      },
      {
        id: "m5",
        sender: "vendor",
        content: "White peonies and garden roses will be in peak season for your date. I've drafted quotation QT-2026-094 with floating candelabras and 18 grand centerpieces.",
        timestamp: "Yesterday, 6:00 PM",
      },
    ],
  },
  {
    id: "conv-3",
    vendorId: "v1",
    vendorName: "Villa Ephrussi & Estates",
    category: "Luxury Venues",
    lastMessage: "Booking BK-2026-7841 deposit confirmed. Welcome to Villa Ephrussi!",
    lastMessageTime: "Oct 20",
    unreadCount: 0,
    isVerified: true,
    messages: [
      {
        id: "m6",
        sender: "vendor",
        content: "Booking BK-2026-7841 deposit confirmed. Welcome to Villa Ephrussi! Our estate concierge is at your full disposal.",
        timestamp: "Oct 20, 2:30 PM",
      },
    ],
  },
];

function CustomerChatContent() {
  const searchParams = useSearchParams();
  const vendorIdParam = searchParams.get("vendorId");

  const [conversations, setConversations] = React.useState<ConversationItem[]>(INITIAL_CONVERSATIONS);
  const [activeConvId, setActiveConvId] = React.useState<string>(
    vendorIdParam
      ? conversations.find((c) => c.vendorId === vendorIdParam)?.id || conversations[0].id
      : conversations[0].id
  );
  const [searchQuery, setSearchQuery] = React.useState("");
  const [inputMessage, setInputMessage] = React.useState("");

  const activeConversation = conversations.find((c) => c.id === activeConvId) || conversations[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "customer",
      content: inputMessage.trim(),
      timestamp: "Just now",
    };

    const updated = conversations.map((conv) => {
      if (conv.id === activeConvId) {
        return {
          ...conv,
          lastMessage: inputMessage.trim(),
          lastMessageTime: "Just now",
          messages: [...conv.messages, newMessage],
        };
      }
      return conv;
    });

    setConversations(updated);
    setInputMessage("");
    toast.success("Message transmitted");
  };

  const filteredConversations = conversations.filter(
    (c) =>
      c.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
          Vendor Communications
        </h1>
        <p className="text-xs text-muted-foreground">
          Real-time messaging channels with your matched specialists and confirmed teams.
        </p>
      </div>

      {/* Main Dual-Panel Chat Frame */}
      <div className="flex-1 glass-card rounded-3xl border border-border/80 overflow-hidden flex flex-col md:flex-row shadow-soft-xl">
        {/* Left Panel: Conversation Threads */}
        <div className="w-full md:w-80 lg:w-96 border-r border-border/80 flex flex-col shrink-0 bg-background/50">
          {/* Search Bar */}
          <div className="p-4 border-b border-border/60">
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-4 h-4" />}
              className="h-10 text-xs rounded-xl"
            />
          </div>

          {/* List of Threads */}
          <div className="flex-1 overflow-y-auto divide-y divide-border/40">
            {filteredConversations.map((conv) => {
              const isActive = conv.id === activeConvId;
              return (
                <button
                  key={conv.id}
                  onClick={() => {
                    setActiveConvId(conv.id);
                    // Mark as read
                    setConversations(
                      conversations.map((c) =>
                        c.id === conv.id ? { ...c, unreadCount: 0 } : c
                      )
                    );
                  }}
                  className={`w-full p-4 flex items-start gap-3 text-left transition-colors ${
                    isActive
                      ? "bg-primary/10 border-l-4 border-primary"
                      : "hover:bg-muted/40"
                  }`}
                >
                  <Avatar className="h-11 w-11 shrink-0 border border-primary/20">
                    <AvatarFallback>{getInitials(conv.vendorName)}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs truncate text-foreground flex items-center gap-1">
                        <span>{conv.vendorName}</span>
                        {conv.isVerified && (
                          <ShieldCheck className="w-3 h-3 text-emerald-500 shrink-0" />
                        )}
                      </h4>
                      <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                        {conv.lastMessageTime}
                      </span>
                    </div>

                    <p className="text-[11px] text-primary font-medium">{conv.category}</p>

                    <p className="text-xs text-muted-foreground truncate mt-1">
                      {conv.lastMessage}
                    </p>
                  </div>

                  {conv.unreadCount > 0 && (
                    <div className="w-5 h-5 rounded-full gradient-brand text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                      {conv.unreadCount}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Panel: Active Chat Thread */}
        <div className="flex-1 flex flex-col justify-between bg-background/30">
          {/* Thread Header */}
          <div className="p-4 px-6 border-b border-border/60 flex items-center justify-between glass-panel">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border border-primary/20">
                <AvatarFallback>{getInitials(activeConversation.vendorName)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-bold text-sm text-foreground flex items-center gap-1.5">
                  <span>{activeConversation.vendorName}</span>
                  <Badge variant="luxury" className="text-[10px] py-0 px-1.5">
                    {activeConversation.category}
                  </Badge>
                </h3>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                  Active now • Guaranteed response within 4 hours
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/customer/quotations">
                <Button variant="glass" size="sm" className="h-8 rounded-xl text-xs font-bold gap-1 text-primary">
                  <FileText className="w-3.5 h-3.5" />
                  <span>View Quotes</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {activeConversation.messages.map((msg) => {
              const isMe = msg.sender === "customer";
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-md p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-soft-sm ${
                      isMe
                        ? "gradient-brand text-white rounded-br-none"
                        : "glass-card text-foreground rounded-bl-none border border-border/80"
                    }`}
                  >
                    <p>{msg.content}</p>

                    {/* Attachments if any */}
                    {msg.attachments && (
                      <div className="mt-3 space-y-1.5 pt-2 border-t border-white/20">
                        {msg.attachments.map((att, idx) => (
                          <div
                            key={idx}
                            className="p-2 rounded-xl bg-black/10 dark:bg-white/10 flex items-center justify-between text-xs gap-2"
                          >
                            <div className="flex items-center gap-2 truncate">
                              <FileText className="w-4 h-4 shrink-0" />
                              <span className="font-semibold truncate">{att.name}</span>
                            </div>
                            <span className="text-[10px] opacity-75">{att.size}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <span className="text-[10px] text-muted-foreground mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Message Input Bar */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-border/60 glass-panel flex items-center gap-3">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-xl text-muted-foreground hover:text-foreground shrink-0"
              onClick={() => toast.success("File attachment picker opened")}
            >
              <Paperclip className="w-4 h-4" />
            </Button>

            <Input
              placeholder={`Write a message to ${activeConversation.vendorName}...`}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="h-11 rounded-2xl text-sm"
            />

            <Button
              type="submit"
              variant="gradient"
              disabled={!inputMessage.trim()}
              className="h-11 px-5 rounded-2xl text-xs font-bold gap-2 shrink-0 shadow-soft-sm"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Send</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function CustomerChatPage() {
  return (
    <React.Suspense
      fallback={
        <div className="p-8 flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-3 text-muted-foreground">
            <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            <p className="text-sm font-medium">Loading conversations...</p>
          </div>
        </div>
      }
    >
      <CustomerChatContent />
    </React.Suspense>
  );
}

