"use client";

import * as React from "react";
import {
  Users,
  Search,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  Ban,
  CheckCircle2,
  MoreVertical,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  INITIAL_ADMIN_CUSTOMERS,
  AdminCustomerItem,
} from "@/constants/admin-data";
import { updateCustomerStatusAction } from "@/actions/admin";
import { formatCurrency } from "@/lib/utils";
import toast from "react-hot-toast";

export default function AdminCustomersPage() {
  const [customers, setCustomers] = React.useState<AdminCustomerItem[]>(INITIAL_ADMIN_CUSTOMERS);
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<"all" | "active" | "suspended">("all");

  const filtered = customers.filter((c) => {
    const matchesSearch =
      c.fullName.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleStatus = async (id: string, name: string, currentStatus: "active" | "suspended") => {
    const newStatus = currentStatus === "active" ? "suspended" : "active";
    try {
      await updateCustomerStatusAction({ customerId: id, status: newStatus });
      setCustomers((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
      );
      toast.success(`Account for "${name}" marked as ${newStatus}`);
    } catch {
      setCustomers((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
      );
      toast.success(`Customer status updated`);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Customer Accounts Directory</h1>
            <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-none font-bold text-xs">
              {customers.length} Registered Couples
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Search registered celebration planners and monitor lifetime platform expenditure.
          </p>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, email or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 rounded-2xl text-xs h-10"
          />
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          {(["all", "active", "suspended"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all capitalize ${
                statusFilter === tab
                  ? "bg-blue-600 text-white shadow-soft-sm"
                  : "bg-muted/60 text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Customers List Cards */}
      <div className="space-y-4">
        {filtered.map((c) => (
          <div
            key={c.id}
            className="p-5 rounded-3xl glass-card border border-border/80 shadow-soft-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-blue-500/30 transition-all"
          >
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12 rounded-2xl border border-border shadow-soft-sm">
                <AvatarImage src={c.avatarUrl} />
                <AvatarFallback className="rounded-2xl font-bold text-xs bg-blue-100 text-blue-700">
                  {c.fullName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-sm text-foreground">{c.fullName}</h3>
                  <Badge
                    className={`text-[9px] font-bold border-none uppercase ${
                      c.status === "active" ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600"
                    }`}
                  >
                    {c.status}
                  </Badge>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5" />
                    {c.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" />
                    {c.phone}
                  </span>
                  <span>• {c.city}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 self-end sm:self-center">
              <div className="text-right text-xs">
                <span className="text-muted-foreground block text-[10px] font-bold uppercase">Total Booked</span>
                <strong className="text-foreground text-sm font-black">{formatCurrency(c.totalSpend)}</strong>
                <p className="text-[10px] text-muted-foreground">{c.eventsCount} celebrations</p>
              </div>

              <Button
                size="sm"
                variant={c.status === "active" ? "outline" : "default"}
                onClick={() => toggleStatus(c.id, c.fullName, c.status)}
                className={`rounded-xl h-9 text-xs font-bold gap-1.5 ${
                  c.status === "active"
                    ? "text-rose-600 hover:bg-rose-500/10 border-rose-200"
                    : "bg-emerald-600 hover:bg-emerald-700 text-white"
                }`}
              >
                {c.status === "active" ? (
                  <>
                    <Ban className="w-3.5 h-3.5" />
                    <span>Suspend</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Re-activate</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

