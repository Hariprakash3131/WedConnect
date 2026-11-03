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
  Calendar,
  FileText,
  Sparkles,
  Phone,
  Film,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import toast from "react-hot-toast";

interface VendorChatMessage {
  id: string;
  sender: "vendor" | "customer";
  content: string;
  timestamp: string;
  attachments?: Array<{ name: string; size: string; url?: string }>;
}

interface VendorConversationItem {
  id: string;
  clientName: string;
  clientEmail: string;
  eventTitle: string;
  eventDate: string;
  avatarUrl?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: VendorChatMessage[];
}

const INITIAL_VENDOR_CONVERSATIONS: VendorConversationItem[] = [
  {
    id: "conv-1",
    clientName: "Audrey Hepburn",
    clientEmail: "audrey@example.com",
    eventTitle: "Audrey & Liam Grand Wedding",
    eventDate: "Oct 18, 2026",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    lastMessage: "I have uploaded the formal quotation QT-2026-081 for your review.",
    lastMessageTime: "10:45 AM",
    unreadCount: 1,
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
    clientName: "Sophia Van Der Bilt",
    clientEmail: "sophia@example.com",
    eventTitle: "Autumn Nuptials at Oheka Castle",
    eventDate: "Oct 24, 2026",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    lastMessage: "We have finalized the rehearsal dinner schedule with our planner!",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
    messages: [
      {
        id: "m4",
        sender: "customer",
        content: "We have finalized the rehearsal dinner schedule with our planner Chloe Sterling. Excited for the 16mm film footage!",
        timestamp: "Yesterday, 5:30 PM",
      },
      {
        id: "m5",
        sender: "vendor",
        content: "Wonderful news Sophia! We have coordinated directly with Chloe and secured full drone airspace clearance with the FAA.",
        timestamp: "Yesterday, 6:05 PM",
      },
    ],
  },
  {
    id: "conv-3",
    clientName: "Elena Rostova",
    clientEmail: "elena@example.com",
    eventTitle: "Elena & Marcus Fall Celebration",
    eventDate: "Nov 7, 2026",
    avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    lastMessage: "Deposit confirmation received. Looking forward to our pre-wedding call.",
    lastMessageTime: "Oct 22",
    unreadCount: 0,
    messages: [
      {
        id: "m6",
        sender: "vendor",
        content: "Booking BK-2026-6912 retainer confirmed. We have scheduled our pre-wedding production call for next Tuesday!",
        timestamp: "Oct 22, 2:00 PM",
      },
    ],
  },
];

function VendorChatContent() {
  const searchParams = useSearchParams();
  const clientParam = searchParams.get("client");

  const [conversations, setConversations] = React.useState<VendorConversationItem[]>(INITIAL_VENDOR_CONVERSATIONS);
  const [activeConvId, setActiveConvId] = React.useState<string>(
    clientParam
      ? conversations.find((c) => c.clientName.toLowerCase().includes(clientParam.toLowerCase()))?.id || conversations[0].id
      : conversations[0].id
  );
  const [searchQuery, setSearchQuery] = React.useState("");
  const [inputMessage, setInputMessage] = React.useState("");

  const activeConversation = conversations.find((c) => c.id === activeConvId) || conversations[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage: VendorChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "vendor",
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
    toast.success("Message dispatched");
  };

  const filteredConversations = conversations.filter(
    (c) =>
      c.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.eventTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-8.5rem)] flex rounded-3xl overflow-hidden glass-card border border-border/80 shadow-soft-xl">
      {/* Left Column: Conversations List */}
      <div className="w-full sm:w-80 md:w-96 border-r border-border/80 flex flex-col bg-card/40 shrink-0">
        <div className="p-4 border-b border-border/80 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-extrabold text-base tracking-tight">Client Conversations</h2>
            <Badge className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-none font-bold text-[10px]">
              Studio Dispatch
            </Badge>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search couples or celebrations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 rounded-xl pl-8 text-xs"
            />
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto divide-y divide-border/60">
          {filteredConversations.map((c) => {
            const isActive = c.id === activeConvId;
            return (
              <button
                key={c.id}
                onClick={() => setActiveConvId(c.id)}
                className={`w-full p-4 flex items-start gap-3 text-left transition-colors ${
                  isActive ? "bg-purple-500/10 dark:bg-purple-500/20" : "hover:bg-muted/40"
                }`}
              >
                <Avatar className="w-11 h-11 rounded-2xl shrink-0 border border-border">
                  <AvatarImage src={c.avatarUrl} />
                  <AvatarFallback className="rounded-2xl font-bold text-xs bg-purple-100 text-purple-700">
                    {c.clientName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-bold text-sm text-foreground truncate">{c.clientName}</span>
                    <span className="text-[10px] text-muted-foreground shrink-0">{c.lastMessageTime}</span>
                  </div>
                  <p className="text-[11px] text-purple-600 dark:text-purple-400 font-semibold truncate">
                    {c.eventTitle} ({c.eventDate})
                  </p>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">{c.lastMessage}</p>
                </div>

                {c.unreadCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-purple-600 text-white text-[9px] font-bold flex items-center justify-center shrink-0 mt-1">
                    {c.unreadCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Column: Active Conversation */}
      <div className="flex-1 flex flex-col min-w-0 bg-background/50">
        {/* Chat Header */}
        <div className="h-16 px-6 border-b border-border/80 flex items-center justify-between glass-nav shrink-0">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 rounded-2xl border border-border">
              <AvatarImage src={activeConversation.avatarUrl} />
              <AvatarFallback className="rounded-2xl font-bold text-xs">
                {activeConversation.clientName.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-sm">{activeConversation.clientName}</h3>
                <Badge variant="outline" className="text-[9px] font-semibold">
                  {activeConversation.eventDate}
                </Badge>
              </div>
              <p className="text-[11px] text-muted-foreground truncate">
                {activeConversation.eventTitle} • {activeConversation.clientEmail}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href={`/vendor/quotations?customerName=${encodeURIComponent(activeConversation.clientName)}&email=${encodeURIComponent(activeConversation.clientEmail)}`}>
              <Button variant="outline" size="sm" className="rounded-xl h-8 text-xs font-bold gap-1 text-purple-600 dark:text-purple-400">
                <FileText className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Attach Quote</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {activeConversation.messages.map((m) => {
            const isVendor = m.sender === "vendor";
            return (
              <div
                key={m.id}
                className={`flex flex-col ${isVendor ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-md sm:max-w-lg rounded-3xl p-4 text-xs leading-relaxed shadow-soft-sm ${
                    isVendor
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-tr-none"
                      : "bg-card border border-border/80 text-foreground rounded-tl-none"
                  }`}
                >
                  <p>{m.content}</p>

                  {/* Attachment Preview */}
                  {m.attachments && m.attachments.length > 0 && (
                    <div className="mt-3 space-y-2 pt-2 border-t border-white/20">
                      {m.attachments.map((att, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2 rounded-xl bg-black/20 text-white text-[11px]"
                        >
                          <div className="flex items-center gap-2 truncate">
                            <FileText className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">{att.name}</span>
                          </div>
                          <span className="text-[10px] text-white/70 ml-2">{att.size}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-muted-foreground mt-1 px-1">
                  {m.timestamp}
                </span>
              </div>
            );
          })}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-border/80 bg-card/60">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
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
              placeholder={`Write a message to ${activeConversation.clientName}...`}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="h-11 rounded-2xl text-xs"
            />

            <Button
              type="submit"
              variant="gradient"
              disabled={!inputMessage.trim()}
              className="h-11 px-5 rounded-2xl text-xs font-bold gap-2 shrink-0 shadow-soft-sm bg-gradient-to-r from-purple-600 to-indigo-600"
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

export default function VendorChatPage() {
  return (
    <React.Suspense
      fallback={
        <div className="p-8 flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-3 text-muted-foreground">
            <div className="w-8 h-8 rounded-full border-2 border-purple-600 border-t-transparent animate-spin" />
            <p className="text-sm font-medium">Loading messages...</p>
          </div>
        </div>
      }
    >
      <VendorChatContent />
    </React.Suspense>
  );
}

