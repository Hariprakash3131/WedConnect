"use client";

import * as React from "react";
import Link from "next/link";
import {
  Bell,
  Check,
  FileText,
  BookmarkCheck,
  Inbox,
  MessageSquare,
  Star,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useNotificationStore,
  NotificationFeedItem,
} from "@/store/notification-store";
import { markNotificationReadAction, markAllNotificationsReadAction } from "@/actions/notification";

function getIconForType(type: NotificationFeedItem["type"]) {
  switch (type) {
    case "quotation":
      return <FileText className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
    case "booking":
      return <BookmarkCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
    case "enquiry":
      return <Inbox className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
    case "chat":
      return <MessageSquare className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />;
    case "review":
      return <Star className="w-4 h-4 text-amber-500 fill-amber-500" />;
    default:
      return <Sparkles className="w-4 h-4 text-primary" />;
  }
}

export function NotificationCenter() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotificationStore();

  const handleMarkAllRead = async () => {
    markAllAsRead();
    try {
      await markAllNotificationsReadAction();
    } catch {
      // Optimistic update
    }
  };

  const handleItemClick = async (notif: NotificationFeedItem) => {
    if (!notif.isRead) {
      markAsRead(notif.id);
      try {
        await markNotificationReadAction(notif.id);
      } catch {
        // Optimistic
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 rounded-xl text-muted-foreground hover:text-foreground"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-background animate-pulse" />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-80 sm:w-96 rounded-3xl p-3 shadow-soft-2xl glass-card">
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm text-foreground">Notifications</span>
            {unreadCount > 0 && (
              <Badge className="bg-primary/10 text-primary border-none text-[10px] font-bold">
                {unreadCount} new
              </Badge>
            )}
          </div>

          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="text-[11px] font-bold text-primary hover:underline"
            >
              Mark all read
            </button>
          )}
        </div>

        <DropdownMenuSeparator className="my-1" />

        <div className="max-h-80 overflow-y-auto divide-y divide-border/60">
          {notifications.length === 0 ? (
            <div className="p-6 text-center text-xs text-muted-foreground">
              No notifications yet
            </div>
          ) : (
            notifications.map((n) => (
              <Link
                key={n.id}
                href={n.link || "#"}
                onClick={() => handleItemClick(n)}
                className={`p-3 rounded-2xl flex items-start gap-3 transition-colors block ${
                  !n.isRead ? "bg-primary/5 hover:bg-primary/10" : "hover:bg-muted/50"
                }`}
              >
                <div className="p-2 rounded-xl bg-card border border-border/80 shrink-0 mt-0.5">
                  {getIconForType(n.type)}
                </div>

                <div className="flex-1 min-w-0 space-y-0.5">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-bold text-xs text-foreground truncate">{n.title}</span>
                    <span className="text-[10px] text-muted-foreground shrink-0">{n.createdAt}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                    {n.message}
                  </p>
                </div>

                {!n.isRead && (
                  <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />
                )}
              </Link>
            ))
          )}
        </div>

        <DropdownMenuSeparator className="my-1" />

        <div className="p-1">
          <Link href="/customer/notifications" className="block">
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-xs font-bold justify-center rounded-xl text-primary"
            >
              <span>View All Activity & Feed</span>
              <ExternalLink className="w-3 h-3 ml-1" />
            </Button>
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

