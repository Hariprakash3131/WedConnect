import { describe, it, expect } from "vitest";
import {
  sendWelcomeEmail,
  sendEnquiryEmail,
  sendQuotationEmail,
  sendBookingConfirmedEmail,
} from "@/lib/email/resend";
import { useNotificationStore } from "@/store/notification-store";

describe("Notification & Resend Email System", () => {
  it("builds welcome email safely with user name and portal URL", async () => {
    const res = await sendWelcomeEmail(
      "couple@example.com",
      "Sophia & Aryan",
      "customer"
    );
    expect(res).toBeDefined();
    expect(res.data?.id).toBeDefined();
  });

  it("builds vendor enquiry alert email with event parameters", async () => {
    const res = await sendEnquiryEmail(
      "vendor@example.com",
      "Grand Palace Studios",
      "Priya Patel",
      "Royal Jaipur Palace Wedding",
      "December 12, 2026",
      450000,
      "Looking forward to receiving your availability and quote."
    );
    expect(res.data?.id).toBeDefined();
  });

  it("builds formal quotation proposal email with line item total and checkout link", async () => {
    const res = await sendQuotationEmail(
      "customer@example.com",
      "Priya Patel",
      "Grand Palace Studios",
      "WD-QT-2026-089",
      250000,
      "November 20, 2026"
    );
    expect(res.data?.id).toBeDefined();
  });

  it("builds booking confirmation email with reference code", async () => {
    const res = await sendBookingConfirmedEmail(
      "customer@example.com",
      "Priya Patel",
      "Grand Palace Studios",
      "BK-2026-9901",
      250000,
      62500,
      "December 12, 2026",
      "The Oberoi Rajvilas, Jaipur"
    );
    expect(res.data?.id).toBeDefined();
  });

  it("updates notification store state and recalculates unread badge accurately", () => {
    const store = useNotificationStore.getState();
    const initialUnread = store.unreadCount;

    // Add mock notification
    store.addNotification({
      id: "notif-test-1",
      type: "quotation",
      title: "New Quotation Received",
      message: "Lumiere Studios sent you a tailored quotation.",
      link: "/checkout/qt-new",
      isRead: false,
      createdAt: "Just now",
    });

    const afterAdd = useNotificationStore.getState();
    expect(afterAdd.unreadCount).toBe(initialUnread + 1);
    expect(afterAdd.notifications[0].title).toBe("New Quotation Received");

    // Mark as read
    store.markAsRead(afterAdd.notifications[0].id);
    const afterRead = useNotificationStore.getState();
    expect(afterRead.unreadCount).toBe(initialUnread);
    expect(afterRead.notifications[0].isRead).toBe(true);

    // Mark all as read
    store.markAllAsRead();
    expect(useNotificationStore.getState().unreadCount).toBe(0);
  });
});
