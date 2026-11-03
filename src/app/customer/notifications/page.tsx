"use client";

import * as React from "react";
import Link from "next/link";
import {
  Bell,
  CheckCircle2,
  FileText,
  BookmarkCheck,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: "booking" | "quotation" | "chat" | "system";
  link: string;
  isRead: boolean;
  time: string;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    title: "New Quotation Received",
    message: "Aura Cinematic Stories submitted quotation QT-2026-081 ($4,104) for Audrey & Liam's Grand Matrimony.",
    type: "quotation",
    link: "/customer/quotations",
    isRead: false,
    time: "2 hours ago",
  },
  {
    id: "notif-2",
    title: "Deposit Confirmation Verified",
    message: "Villa Ephrussi & Estates confirmed your celebration date and receipt of $3,600 deposit. Ref: BK-2026-7841.",
    type: "booking",
    link: "/customer/bookings",
    isRead: false,
    time: "Yesterday",
  },
  {
    id: "notif-3",
    title: "New Direct Message",
    message: "Maison de Fleurs Couture: 'White peonies and garden roses will be in peak season for your date.'",
    type: "chat",
    link: "/customer/chat?vendorId=v3",
    isRead: true,
    time: "2 days ago",
  },
  {
    id: "notif-4",
    title: "Vendor Matching Updated",
    message: "3 new verified Michelin caterers were added matching your New York celebration requirements.",
    type: "system",
    link: "/customer/matched-vendors",
    isRead: true,
    time: "4 days ago",
  },
];

export default function CustomerNotificationsPage() {
  const [notifications, setNotifications] = React.useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
    toast.success("All notifications marked as read");
  };

  const getIcon = (type: NotificationItem["type"]) => {
    switch (type) {
      case "quotation":
        return <FileText className="w-4 h-4 text-amber-500" />;
      case "booking":
        return <BookmarkCheck className="w-4 h-4 text-emerald-500" />;
      case "chat":
        return <MessageSquare className="w-4 h-4 text-primary" />;
      default:
        return <Sparkles className="w-4 h-4 text-secondary" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-wider mb-2">
            <Bell className="w-3.5 h-3.5" />
            <span>Activity Feed</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Notifications
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Stay updated with quotation proposals, message replies, and booking milestones.
          </p>
        </div>

        <Button
          variant="glass"
          size="sm"
          onClick={markAllAsRead}
          className="rounded-xl text-xs font-semibold"
        >
          Mark all as read
        </Button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((notif) => (
          <Link key={notif.id} href={notif.link} className="block">
            <Card
              className={`glass-card border transition-all hover:shadow-soft-md ${
                !notif.isRead
                  ? "border-primary/40 bg-primary/5"
                  : "border-border/80"
              }`}
            >
              <CardContent className="p-5 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-muted/80 flex items-center justify-center shrink-0 mt-0.5">
                    {getIcon(notif.type)}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-foreground">{notif.title}</h4>
                      {!notif.isRead && (
                        <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {notif.message}
                    </p>
                    <span className="text-[10px] text-muted-foreground font-medium flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" />
                      {notif.time}
                    </span>
                  </div>
                </div>

                <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0 mt-2" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

