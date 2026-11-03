import { describe, it, expect } from "vitest";

interface QuotationLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

interface QuotationFinancials {
  subtotal: number;
  platformFee: number;
  taxGst: number;
  grandTotal: number;
  milestones: {
    name: string;
    percentage: number;
    amount: number;
  }[];
}

function calculateQuotationFinancials(items: QuotationLineItem[]): QuotationFinancials {
  const subtotal = items.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);
  const platformFee = Math.round(subtotal * 0.05); // 5% marketplace platform fee
  const taxGst = Math.round((subtotal + platformFee) * 0.18); // 18% GST on services
  const grandTotal = subtotal + platformFee + taxGst;

  const milestones = [
    { name: "Initial Booking Escrow Deposit", percentage: 25, amount: Math.round(grandTotal * 0.25) },
    { name: "Mid-Planning Progress Checkpoint", percentage: 50, amount: Math.round(grandTotal * 0.50) },
    { name: "Final Handover & Release", percentage: 25, amount: grandTotal - Math.round(grandTotal * 0.25) - Math.round(grandTotal * 0.50) },
  ];

  return {
    subtotal,
    platformFee,
    taxGst,
    grandTotal,
    milestones,
  };
}

// 9-Step Booking Lifecycle State Machine
type BookingStatus =
  | "draft"
  | "pending_customer_review"
  | "accepted"
  | "deposit_escrowed"
  | "in_progress"
  | "vendor_delivered"
  | "customer_approved"
  | "completed"
  | "disputed"
  | "cancelled";

const validStateTransitions: Record<BookingStatus, BookingStatus[]> = {
  draft: ["pending_customer_review", "cancelled"],
  pending_customer_review: ["accepted", "cancelled"],
  accepted: ["deposit_escrowed", "cancelled"],
  deposit_escrowed: ["in_progress", "disputed", "cancelled"],
  in_progress: ["vendor_delivered", "disputed"],
  vendor_delivered: ["customer_approved", "disputed"],
  customer_approved: ["completed"],
  completed: [], // Terminal state
  disputed: ["in_progress", "cancelled"],
  cancelled: [], // Terminal state
};

function isValidBookingTransition(current: BookingStatus, next: BookingStatus): boolean {
  const allowed = validStateTransitions[current] || [];
  return allowed.includes(next);
}

describe("Quotation Financials & Escrow Lifecycle", () => {
  const sampleItems: QuotationLineItem[] = [
    { description: "Lead Cinematographer (2 Days)", quantity: 2, unitPrice: 50000 },
    { description: "Drone Aerial Operator", quantity: 1, unitPrice: 20000 },
    { description: "Premium Wedding Album (Hardcover)", quantity: 2, unitPrice: 15000 },
  ];

  it("calculates exact subtotal, 5% platform fee, and 18% GST tax", () => {
    const fin = calculateQuotationFinancials(sampleItems);
    // subtotal = (2 * 50000) + 20000 + (2 * 15000) = 100000 + 20000 + 30000 = 150000
    expect(fin.subtotal).toBe(150000);
    // platformFee = 150000 * 0.05 = 7500
    expect(fin.platformFee).toBe(7500);
    // taxable = 157500, taxGst = 157500 * 0.18 = 28350
    expect(fin.taxGst).toBe(28350);
    // grandTotal = 150000 + 7500 + 28350 = 185850
    expect(fin.grandTotal).toBe(185850);
  });

  it("ensures all milestone tranches sum up strictly to grandTotal without rounding leakage", () => {
    const fin = calculateQuotationFinancials(sampleItems);
    const sumMilestones = fin.milestones.reduce((acc, m) => acc + m.amount, 0);
    expect(sumMilestones).toBe(fin.grandTotal);
  });

  it("validates legitimate 9-step booking lifecycle transitions", () => {
    expect(isValidBookingTransition("draft", "pending_customer_review")).toBe(true);
    expect(isValidBookingTransition("pending_customer_review", "accepted")).toBe(true);
    expect(isValidBookingTransition("accepted", "deposit_escrowed")).toBe(true);
    expect(isValidBookingTransition("deposit_escrowed", "in_progress")).toBe(true);
    expect(isValidBookingTransition("in_progress", "vendor_delivered")).toBe(true);
    expect(isValidBookingTransition("vendor_delivered", "customer_approved")).toBe(true);
    expect(isValidBookingTransition("customer_approved", "completed")).toBe(true);
  });

  it("rejects unauthorized premature jumps across escrow phases", () => {
    // Cannot skip escrow deposit straight to completed
    expect(isValidBookingTransition("pending_customer_review", "completed")).toBe(false);
    // Cannot deliver before deposit is escrowed
    expect(isValidBookingTransition("accepted", "vendor_delivered")).toBe(false);
    // Terminal state cannot transition anywhere
    expect(isValidBookingTransition("completed", "in_progress")).toBe(false);
  });
});

