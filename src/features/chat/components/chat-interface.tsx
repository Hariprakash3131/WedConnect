"use client";

import * as React from "react";
import Link from "next/link";
import {
  MessageSquare,
  Send,
  Paperclip,
  Check,
  CheckCheck,
  Search,
  Calendar,
  FileText,
  Sparkles,
  Phone,
  Film,
  Play,
  Pause,
  Download,
  ShieldCheck,
  ArrowRight,
  Smile,
  Heart,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  useChatStore,
  MessageItem,
  ChatAttachment,
} from "@/store/chat-store";
import { useRealtimeChat } from "@/hooks/use-realtime-chat";
import { sendMessageAction } from "@/actions/chat";
import { formatCurrency } from "@/lib/utils";
import toast from "react-hot-toast";

interface ChatInterfaceProps {
  currentRole: "customer" | "vendor";
  initialPartnerId?: string | null;
}

export function ChatInterface({ currentRole, initialPartnerId }: ChatInterfaceProps) {
  const {
    activeConversationId,
    setActiveConversationId,
    conversations,
    messages,
    addMessage,
    isTypingMap,
    addReaction,
    soundEnabled,
    toggleSound,
  } = useChatStore();

  const { broadcastTyping } = useRealtimeChat(activeConversationId, currentRole);

  const [searchQuery, setSearchQuery] = React.useState("");
  const [inputText, setInputText] = React.useState("");
  const [isPlayingAudio, setIsPlayingAudio] = React.useState<string | null>(null);
  const [attachDialogOpen, setAttachDialogOpen] = React.useState(false);
  const [attachName, setAttachName] = React.useState("");
  const [attachType, setAttachType] = React.useState<ChatAttachment["type"]>("pdf");

  const activeThread =
    conversations.find((c) => c.id === activeConversationId) || conversations[0];
  const activeMessages = messages[activeConversationId] || [];
  const isPartnerTyping = isTypingMap[activeConversationId] || false;

  const messagesEndRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeMessages.length, isPartnerTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: MessageItem = {
      id: `msg-${Date.now()}`,
      conversationId: activeConversationId,
      senderId: currentRole === "customer" ? "cust-1" : "v2",
      senderRole: currentRole,
      senderName: currentRole === "customer" ? "Audrey Hepburn" : "Aura Cinematic Stories",
      content: inputText.trim(),
      timestamp: "Just now",
      isRead: false,
      status: "delivered",
    };

    addMessage(activeConversationId, newMsg);
    setInputText("");

    try {
      await sendMessageAction({
        conversationId: activeConversationId,
        content: newMsg.content,
        attachments: [],
      });
    } catch {
      // Optimistic update
    }

    // Interactive realistic simulation: if customer asked question, vendor types and replies in 2.5s
    if (currentRole === "customer") {
      setTimeout(() => {
        useChatStore.getState().setTyping(activeConversationId, true);
      }, 800);

      setTimeout(() => {
        useChatStore.getState().setTyping(activeConversationId, false);
        useChatStore.getState().addMessage(activeConversationId, {
          id: `reply-${Date.now()}`,
          conversationId: activeConversationId,
          senderId: "v2",
          senderRole: "vendor",
          senderName: "Aura Cinematic Stories",
          content: "Thank you Audrey! We have noted your preferences and updated the production notes for October 18.",
          timestamp: "Just now",
          isRead: true,
          status: "delivered",
        });
      }, 3000);
    }
  };

  const handleAddAttachment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!attachName.trim()) return;

    const attachment: ChatAttachment = {
      id: `att-${Date.now()}`,
      name: attachName.trim(),
      size: "2.1 MB",
      type: attachType,
    };

    const newMsg: MessageItem = {
      id: `msg-${Date.now()}`,
      conversationId: activeConversationId,
      senderId: currentRole === "customer" ? "cust-1" : "v2",
      senderRole: currentRole,
      senderName: currentRole === "customer" ? "Audrey Hepburn" : "Aura Cinematic Stories",
      content: `Shared attachment: ${attachName.trim()}`,
      timestamp: "Just now",
      isRead: false,
      status: "delivered",
      attachments: [attachment],
    };

    addMessage(activeConversationId, newMsg);
    toast.success("Document attached to conversation");
    setAttachDialogOpen(false);
    setAttachName("");
  };

  const filteredConversations = conversations.filter(
    (c) =>
      c.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.eventTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-8.5rem)] flex rounded-3xl overflow-hidden glass-card border border-border/80 shadow-soft-xl">
      {/* Left Column: Thread List */}
      <div className="w-full sm:w-80 md:w-96 border-r border-border/80 flex flex-col bg-card/40 shrink-0">
        <div className="p-4 border-b border-border/80 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-extrabold text-base tracking-tight">Active Consultations</h2>
            <div className="flex items-center gap-1">
              <button
                onClick={toggleSound}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground"
                title={soundEnabled ? "Mute sounds" : "Enable sounds"}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-primary" /> : <VolumeX className="w-4 h-4" />}
              </button>
              <Badge className="bg-primary/10 text-primary border-none text-[10px] font-bold">
                Realtime
              </Badge>
            </div>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search conversations or events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 rounded-xl pl-8 text-xs"
            />
          </div>
        </div>

        {/* List of active threads */}
        <div className="flex-1 overflow-y-auto divide-y divide-border/60">
          {filteredConversations.map((thread) => {
            const isActive = thread.id === activeConversationId;
            return (
              <button
                key={thread.id}
                onClick={() => setActiveConversationId(thread.id)}
                className={`w-full p-4 flex items-start gap-3 text-left transition-colors relative ${
                  isActive ? "bg-primary/10 dark:bg-primary/20" : "hover:bg-muted/40"
                }`}
              >
                <div className="relative shrink-0">
                  <Avatar className="w-11 h-11 rounded-2xl border border-border">
                    <AvatarImage src={thread.participantAvatar} />
                    <AvatarFallback className="rounded-2xl font-bold text-xs bg-primary/10 text-primary">
                      {thread.participantName.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {thread.isOnline && (
                    <span className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-background absolute -bottom-0.5 -right-0.5" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-bold text-sm text-foreground truncate">
                      {thread.participantName}
                    </span>
                    <span className="text-[10px] text-muted-foreground shrink-0">
                      {thread.lastMessageTime}
                    </span>
                  </div>
                  <p className="text-[11px] text-primary font-semibold truncate">
                    {thread.eventTitle} ({thread.eventDate})
                  </p>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">
                    {thread.isTyping ? (
                      <span className="text-purple-600 dark:text-purple-400 font-bold italic animate-pulse">
                        typing a response...
                      </span>
                    ) : (
                      thread.lastMessage
                    )}
                  </p>
                </div>

                {thread.unreadCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-primary text-white text-[9px] font-bold flex items-center justify-center shrink-0 mt-1">
                    {thread.unreadCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Column: Active Conversation */}
      <div className="flex-1 flex flex-col min-w-0 bg-background/50">
        {/* Header */}
        <div className="h-16 px-6 border-b border-border/80 flex items-center justify-between glass-nav shrink-0">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 rounded-2xl border border-border">
              <AvatarImage src={activeThread.participantAvatar} />
              <AvatarFallback className="rounded-2xl font-bold text-xs">
                {activeThread.participantName.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-sm text-foreground">{activeThread.participantName}</h3>
                {activeThread.participantBadge && (
                  <Badge variant="outline" className="text-[9px] font-semibold hidden sm:inline-flex">
                    {activeThread.participantBadge}
                  </Badge>
                )}
              </div>
              <p className="text-[11px] text-muted-foreground truncate">
                {activeThread.eventTitle} • Celebration Date: {activeThread.eventDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {currentRole === "customer" ? (
              <Link href="/customer/quotations">
                <Button variant="outline" size="sm" className="rounded-xl h-8 text-xs font-bold gap-1 text-primary">
                  <FileText className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">View Quotations</span>
                </Button>
              </Link>
            ) : (
              <Link href="/vendor/quotations">
                <Button variant="outline" size="sm" className="rounded-xl h-8 text-xs font-bold gap-1 text-primary">
                  <FileText className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Create Quotation</span>
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Message Feed */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {activeMessages.map((m) => {
            const isMe = m.senderRole === currentRole;

            return (
              <div
                key={m.id}
                className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-md sm:max-w-lg rounded-3xl p-4 text-xs leading-relaxed shadow-soft-sm ${
                    isMe
                      ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-tr-none"
                      : "bg-card border border-border/80 text-foreground rounded-tl-none"
                  }`}
                >
                  <p>{m.content}</p>

                  {/* Audio Note Waveform Player */}
                  {m.audioWaveform && (
                    <div className="mt-3 p-3 rounded-2xl bg-black/20 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setIsPlayingAudio(isPlayingAudio === m.id ? null : m.id)}
                        className="w-8 h-8 rounded-full bg-white text-slate-900 flex items-center justify-center shrink-0 hover:scale-105 transition-transform"
                      >
                        {isPlayingAudio === m.id ? (
                          <Pause className="w-3.5 h-3.5" />
                        ) : (
                          <Play className="w-3.5 h-3.5 ml-0.5" />
                        )}
                      </button>
                      <div className="flex items-center gap-1 flex-1 h-6">
                        {m.audioWaveform.map((h, idx) => (
                          <div
                            key={idx}
                            style={{ height: `${h}%` }}
                            className={`w-1.5 rounded-full transition-all ${
                              isPlayingAudio === m.id ? "bg-amber-400 animate-pulse" : "bg-white/60"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] text-white/80 font-mono">0:32</span>
                    </div>
                  )}

                  {/* Interactive Quotation Card Embed inside Bubble */}
                  {m.quotationEmbed && (
                    <div className="mt-3 p-4 rounded-2xl bg-white/10 dark:bg-black/30 border border-white/20 backdrop-blur-md space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <FileText className="w-4 h-4 text-amber-300" />
                          <span className="font-extrabold text-sm">{m.quotationEmbed.quoteNumber}</span>
                        </div>
                        <Badge className="bg-amber-400 text-slate-950 font-bold text-[9px] border-none">
                          Formal Proposal
                        </Badge>
                      </div>

                      <div className="flex justify-between items-baseline">
                        <span className="text-xl font-black">{formatCurrency(m.quotationEmbed.amount)}</span>
                        <span className="text-[10px] opacity-80">Valid until {m.quotationEmbed.validUntil}</span>
                      </div>

                      {currentRole === "customer" && (
                        <Link href={`/checkout/${m.quotationEmbed.quoteId}`} className="block pt-1">
                          <Button
                            size="sm"
                            className="w-full rounded-xl text-xs font-bold gap-1.5 bg-white text-slate-950 hover:bg-white/90 shadow-soft-sm"
                          >
                            <span>Review & Place Retainer in Escrow</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  )}

                  {/* Attachment Previews */}
                  {m.attachments && m.attachments.length > 0 && (
                    <div className="mt-3 space-y-2 pt-2 border-t border-white/20">
                      {m.attachments.map((att) => (
                        <div
                          key={att.id}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-black/20 text-white text-[11px]"
                        >
                          <div className="flex items-center gap-2 truncate">
                            <FileText className="w-4 h-4 shrink-0 text-amber-300" />
                            <span className="truncate">{att.name}</span>
                          </div>
                          <span className="text-[10px] text-white/70 ml-2">{att.size}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Status checkmarks & time */}
                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground mt-1 px-1">
                  <span>{m.timestamp}</span>
                  {isMe && (
                    m.status === "read" ? (
                      <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
                    ) : (
                      <Check className="w-3.5 h-3.5" />
                    )
                  )}
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isPartnerTyping && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground pl-2">
              <div className="p-3 rounded-2xl bg-card border border-border/80 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce" />
              </div>
              <span className="text-[11px] italic">{activeThread.participantName} is typing...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-border/80 bg-card/60">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            {/* Attachment Modal Trigger */}
            <Dialog open={attachDialogOpen} onOpenChange={setAttachDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-xl text-muted-foreground hover:text-foreground shrink-0"
                >
                  <Paperclip className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md rounded-3xl p-6">
                <DialogHeader>
                  <DialogTitle className="text-base font-bold">Attach Document or Moodboard</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleAddAttachment} className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <label className="text-xs font-bold">Document Name</label>
                    <Input
                      placeholder="e.g. Wedding_Floral_Color_Palette.pdf"
                      value={attachName}
                      onChange={(e) => setAttachName(e.target.value)}
                      required
                      className="rounded-xl text-xs"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold">File Type</label>
                    <select
                      value={attachType}
                      onChange={(e) => setAttachType(e.target.value as ChatAttachment["type"])}
                      className="w-full h-10 px-3 rounded-xl border border-input bg-background text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="pdf">PDF Document / Agreement</option>
                      <option value="image">Image Moodboard / Photo</option>
                      <option value="contract">Formal Service Contract</option>
                    </select>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setAttachDialogOpen(false)}
                      className="rounded-xl text-xs"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="gradient"
                      className="rounded-xl text-xs font-bold"
                    >
                      Attach to Chat
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>

            <Input
              placeholder={`Write a message to ${activeThread.participantName}...`}
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                broadcastTyping();
              }}
              className="h-11 rounded-2xl text-xs"
            />

            <Button
              type="submit"
              variant="gradient"
              disabled={!inputText.trim()}
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

