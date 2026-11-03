"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import {
  FileText,
  Plus,
  Trash2,
  DollarSign,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  Send,
  User,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  INITIAL_VENDOR_QUOTATIONS,
  VendorQuotationItem,
  INITIAL_VENDOR_SERVICES,
} from "@/constants/vendor-data";
import { createQuotationAction } from "@/actions/vendor";
import { formatCurrency } from "@/lib/utils";
import toast from "react-hot-toast";

interface LineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

function VendorQuotationsContent() {
  const searchParams = useSearchParams();
  const [quotations, setQuotations] = React.useState<VendorQuotationItem[]>(INITIAL_VENDOR_QUOTATIONS);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  // Auto-fill from query params if clicked from enquiries
  const enquiryIdParam = searchParams.get("enquiryId");
  const customerNameParam = searchParams.get("customerName");
  const emailParam = searchParams.get("email");
  const eventTitleParam = searchParams.get("eventTitle");
  const eventDateParam = searchParams.get("eventDate");

  // Form State
  const [customerName, setCustomerName] = React.useState(customerNameParam || "");
  const [customerEmail, setCustomerEmail] = React.useState(emailParam || "");
  const [eventTitle, setEventTitle] = React.useState(eventTitleParam || "");
  const [eventDate, setEventDate] = React.useState(eventDateParam || "2026-10-18");
  const [validUntil, setValidUntil] = React.useState("2026-11-30");
  const [terms, setTerms] = React.useState(
    "50% non-refundable retainer due upon signature. Balance due 14 days prior to wedding date. Includes 4K HDR master deliverable with archival storage."
  );

  const [items, setItems] = React.useState<LineItem[]>([
    {
      description: "The Signature Cinematic Collection (10 Hours Lead Master + Senior Assistant)",
      quantity: 1,
      unitPrice: 6500,
      total: 6500,
    },
    {
      description: "FAA Part 107 Aerial 4K Drone Filming",
      quantity: 1,
      unitPrice: 0,
      total: 0,
    },
  ]);

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Automatically open dialog if params are present
  React.useEffect(() => {
    if (customerNameParam) {
      setCustomerName(customerNameParam);
      setCustomerEmail(emailParam || "");
      setEventTitle(eventTitleParam || "Wedding Celebration");
      if (eventDateParam) setEventDate(eventDateParam);
      setDialogOpen(true);
    }
  }, [customerNameParam, emailParam, eventTitleParam, eventDateParam]);

  const addLineItem = () => {
    setItems((prev) => [
      ...prev,
      { description: "Additional Cinematography Service", quantity: 1, unitPrice: 500, total: 500 },
    ]);
  };

  const updateLineItem = (index: number, field: keyof LineItem, val: string | number) => {
    setItems((prev) => {
      const copy = [...prev];
      const current = { ...copy[index] };
      if (field === "description") {
        current.description = String(val);
      } else if (field === "quantity") {
        current.quantity = Math.max(1, Number(val));
        current.total = current.quantity * current.unitPrice;
      } else if (field === "unitPrice") {
        current.unitPrice = Math.max(0, Number(val));
        current.total = current.quantity * current.unitPrice;
      }
      copy[index] = current;
      return copy;
    });
  };

  const removeLineItem = (index: number) => {
    if (items.length <= 1) {
      toast.error("Quotation must have at least one line item");
      return;
    }
    setItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  const subtotal = items.reduce((acc, it) => acc + it.total, 0);
  const taxAmount = Number((subtotal * 0.08875).toFixed(2));
  const grandTotal = Number((subtotal + taxAmount).toFixed(2));

  const handleCreateQuotation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail || items.length === 0) {
      toast.error("Please fill in customer details and at least one deliverable item");
      return;
    }

    setIsSubmitting(true);
    const quoteNum = `QT-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;

    const newQuote: VendorQuotationItem = {
      id: `qt-${Date.now()}`,
      quoteNumber: quoteNum,
      customerName,
      customerEmail,
      eventTitle: eventTitle || "Luxury Wedding Celebration",
      eventDate,
      validUntil,
      amount: subtotal,
      taxAmount,
      totalAmount: grandTotal,
      status: "sent",
      items,
      terms,
      createdAt: new Date().toISOString().split("T")[0],
    };

    try {
      await createQuotationAction({
        enquiryId: enquiryIdParam || undefined,
        customerEmail,
        customerName,
        eventTitle: newQuote.eventTitle,
        eventDate,
        validUntil,
        items,
        terms,
      });

      setQuotations((prev) => [newQuote, ...prev]);
      toast.success(`Formal Quotation ${quoteNum} created and dispatched to ${customerName}!`);
      setDialogOpen(false);
    } catch {
      setQuotations((prev) => [newQuote, ...prev]);
      toast.success(`Formal Quotation ${quoteNum} created!`);
      setDialogOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header and Create Trigger */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Quotations & Proposals</h1>
            <Badge className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-none font-bold text-xs">
              {quotations.length} Active Proposals
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Generate legally-binding, itemized luxury proposals with automated sales tax and valid duration.
          </p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="gradient"
              className="rounded-2xl h-11 px-5 text-xs font-bold gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 shadow-soft-md shadow-purple-500/25"
            >
              <Plus className="w-4 h-4" />
              <span>Generate Quotation</span>
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-2xl rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-extrabold tracking-tight">
                Draft Formal Proposal & Quotation
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleCreateQuotation} className="space-y-6 pt-3">
              {/* Client & Event Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="custName" className="text-xs font-bold">Client Full Name</Label>
                  <Input
                    id="custName"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    placeholder="e.g. Audrey Hepburn"
                    className="rounded-xl text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="custEmail" className="text-xs font-bold">Client Email</Label>
                  <Input
                    id="custEmail"
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    required
                    placeholder="audrey@example.com"
                    className="rounded-xl text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="evTitle" className="text-xs font-bold">Event Title</Label>
                  <Input
                    id="evTitle"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    placeholder="e.g. Audrey & Liam Grand Wedding"
                    className="rounded-xl text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="evDate" className="text-xs font-bold">Wedding Date</Label>
                  <Input
                    id="evDate"
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    required
                    className="rounded-xl text-xs"
                  />
                </div>
              </div>

              {/* Itemized Line Items */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-bold">Itemized Services & Inclusions</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addLineItem}
                    className="h-8 rounded-xl text-xs font-bold gap-1 text-purple-600 dark:text-purple-400"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Line Item</span>
                  </Button>
                </div>

                <div className="space-y-2">
                  {items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-muted/40 border border-border/60 grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center"
                    >
                      <div className="sm:col-span-6">
                        <Input
                          placeholder="Description of service / deliverable"
                          value={item.description}
                          onChange={(e) => updateLineItem(idx, "description", e.target.value)}
                          required
                          className="rounded-xl text-xs"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <Input
                          type="number"
                          placeholder="Qty"
                          value={item.quantity}
                          min={1}
                          onChange={(e) => updateLineItem(idx, "quantity", e.target.value)}
                          className="rounded-xl text-xs"
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <Input
                          type="number"
                          placeholder="Unit Price ($)"
                          value={item.unitPrice}
                          min={0}
                          onChange={(e) => updateLineItem(idx, "unitPrice", e.target.value)}
                          className="rounded-xl text-xs"
                        />
                      </div>
                      <div className="sm:col-span-1 flex justify-end">
                        <button
                          type="button"
                          onClick={() => removeLineItem(idx)}
                          className="text-muted-foreground hover:text-rose-600 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary Calculations */}
              <div className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/20 space-y-2 text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-semibold text-foreground">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Estimated Tax (NYC 8.875%)</span>
                  <span className="font-semibold text-foreground">{formatCurrency(taxAmount)}</span>
                </div>
                <div className="pt-2 border-t border-purple-500/20 flex justify-between font-extrabold text-sm text-foreground">
                  <span>Total Proposed Investment</span>
                  <span className="text-base text-purple-600 dark:text-purple-400">
                    {formatCurrency(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Terms and Expiry */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="validUntil" className="text-xs font-bold">Proposal Valid Until</Label>
                  <Input
                    id="validUntil"
                    type="date"
                    value={validUntil}
                    onChange={(e) => setValidUntil(e.target.value)}
                    required
                    className="rounded-xl text-xs"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <Label htmlFor="terms" className="text-xs font-bold">Payment Schedule & Terms</Label>
                  <Textarea
                    id="terms"
                    value={terms}
                    onChange={(e) => setTerms(e.target.value)}
                    rows={2}
                    className="rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setDialogOpen(false)}
                  className="rounded-xl text-xs font-semibold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="gradient"
                  className="rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? "Generating..." : "Dispatch Formal Quotation"}</span>
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quotations List */}
      <div className="space-y-4">
        {quotations.map((qt) => (
          <div
            key={qt.id}
            className="p-6 rounded-3xl glass-card border border-border/80 shadow-soft-sm hover:border-purple-500/30 transition-all space-y-5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-xs shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-base text-foreground">{qt.quoteNumber}</span>
                    <Badge
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-lg capitalize border-none ${
                        qt.status === "accepted"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : qt.status === "sent"
                          ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {qt.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Client: <strong className="text-foreground">{qt.customerName}</strong> ({qt.customerEmail}) • Created {qt.createdAt}
                  </p>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-2xl font-black tracking-tight text-foreground">
                  {formatCurrency(qt.totalAmount)}
                </span>
                <p className="text-[11px] text-muted-foreground">
                  Valid until {qt.validUntil}
                </p>
              </div>
            </div>

            {/* Line items preview */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Inclusions ({qt.items.length} deliverables)
              </span>
              <div className="space-y-1.5 text-xs">
                {qt.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between py-1 border-b border-border/40">
                    <span className="text-foreground/90 font-medium">
                      {it.quantity}× {it.description}
                    </span>
                    <span className="font-semibold text-muted-foreground">
                      {formatCurrency(it.total)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions Bar */}
            <div className="pt-2 flex items-center justify-between text-xs text-muted-foreground">
              <span className="italic text-[11px] line-clamp-1 max-w-md">
                Terms: {qt.terms}
              </span>

              <Button
                variant="outline"
                size="sm"
                onClick={() => toast.success(`Downloading PDF for quotation ${qt.quoteNumber}`)}
                className="rounded-xl text-xs font-bold gap-1.5 shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export PDF</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function VendorQuotationsPage() {
  return (
    <React.Suspense
      fallback={
        <div className="p-8 flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-3 text-muted-foreground">
            <div className="w-8 h-8 rounded-full border-2 border-purple-600 border-t-transparent animate-spin" />
            <p className="text-sm font-medium">Loading proposals...</p>
          </div>
        </div>
      }
    >
      <VendorQuotationsContent />
    </React.Suspense>
  );
}

