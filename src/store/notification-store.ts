import { create } from "zustand";

export interface NotificationFeedItem {
  id: string;
  title: string;
  message: string;
  type: "booking" | "enquiry" | "quotation" | "chat" | "review" | "system";
  link?: string;
  isRead: boolean;
  createdAt: string;
}

interface NotificationState {
  notifications: NotificationFeedItem[];
  unreadCount: number;
  addNotification: (item: NotificationFeedItem) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

const INITIAL_NOTIFICATIONS: NotificationFeedItem[] = [
  {
    id: "notif-1",
    title: "Formal Quotation Prepared",
    message: "Aura Cinematic Stories uploaded formal quotation QT-2026-081 for your review.",
    type: "quotation",
    link: "/customer/quotations",
    isRead: false,
    createdAt: "10 mins ago",
  },
  {
    id: "notif-2",
    title: "Escrow Retainer Secured",
    message: "50% retainer deposit for booking BK-2026-7841 is held securely in escrow.",
    type: "booking",
    link: "/customer/bookings",
    isRead: false,
    createdAt: "2 hours ago",
  },
  {
    id: "notif-3",
    title: "New Client Inquiry",
    message: "Audrey Hepburn sent an inquiry for your Photography & Cinema specialty.",
    type: "enquiry",
    link: "/vendor/enquiries",
    isRead: true,
    createdAt: "Yesterday",
  },
  {
    id: "notif-4",
    title: "Direct Consultation Message",
    message: "Maison de Fleurs Couture sent a message regarding garden roses.",
    type: "chat",
    link: "/customer/chat",
    isRead: true,
    createdAt: "2 days ago",
  },
];

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: INITIAL_NOTIFICATIONS,
  unreadCount: INITIAL_NOTIFICATIONS.filter((n) => !n.isRead).length,

  addNotification: (item) =>
    set((state) => ({
      notifications: [item, ...state.notifications],
      unreadCount: state.unreadCount + (item.isRead ? 0 : 1),
    })),

  markAsRead: (id) =>
    set((state) => {
      const updated = state.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      );
      return {
        notifications: updated,
        unreadCount: updated.filter((n) => !n.isRead).length,
      };
    }),

  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
      unreadCount: 0,
    })),
}));

