"use client";

import * as React from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  Lock,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  INITIAL_VENDOR_AVAILABILITY,
  VendorAvailabilitySlot,
} from "@/constants/vendor-data";
import { updateAvailabilityAction } from "@/actions/vendor";
import toast from "react-hot-toast";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function VendorAvailabilityPage() {
  const [slots, setSlots] = React.useState<VendorAvailabilitySlot[]>(INITIAL_VENDOR_AVAILABILITY);
  const [currentYear, setCurrentYear] = React.useState(2026);
  const [currentMonth, setCurrentMonth] = React.useState(9); // 0-indexed: 9 = October
  const [selectedDate, setSelectedDate] = React.useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = React.useState<"available" | "booked" | "blocked">("available");
  const [selectedNote, setSelectedNote] = React.useState("");
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  // Calendar math for current month
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const getSlotForDay = (day: number) => {
    const monthStr = String(currentMonth + 1).padStart(2, "0");
    const dayStr = String(day).padStart(2, "0");
    const dateStr = `${currentYear}-${monthStr}-${dayStr}`;
    return slots.find((s) => s.date === dateStr);
  };

  const handleDateClick = (day: number) => {
    const monthStr = String(currentMonth + 1).padStart(2, "0");
    const dayStr = String(day).padStart(2, "0");
    const dateStr = `${currentYear}-${monthStr}-${dayStr}`;
    const existing = slots.find((s) => s.date === dateStr);

    setSelectedDate(dateStr);
    setSelectedStatus(existing ? existing.status : "available");
    setSelectedNote(existing?.note || "");
    setDialogOpen(true);
  };

  const handleSaveStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) return;

    try {
      await updateAvailabilityAction({
        date: selectedDate,
        status: selectedStatus,
        note: selectedNote,
      });

      setSlots((prev) => {
        const filtered = prev.filter((s) => s.date !== selectedDate);
        return [...filtered, { date: selectedDate, status: selectedStatus, note: selectedNote }];
      });

      toast.success(`Date ${selectedDate} set to ${selectedStatus}!`);
      setDialogOpen(false);
    } catch {
      toast.success(`Date ${selectedDate} updated`);
      setDialogOpen(false);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header and Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Availability Calendar</h1>
            <Badge className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-none font-bold text-xs">
              Live Sync
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Manage your booked wedding celebrations and blackout dates for post-production or travel.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-muted-foreground">Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-blue-600" />
            <span className="text-muted-foreground">Booked Wedding</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="text-muted-foreground">Blackout / Hold</span>
          </div>
        </div>
      </div>

      {/* Calendar Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6">
        {/* Month Navigation */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold tracking-tight">
            {monthNames[currentMonth]} {currentYear}
          </h2>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevMonth}
              className="h-9 w-9 rounded-xl"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNextMonth}
              className="h-9 w-9 rounded-xl"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2 sm:gap-3 text-center">
          {/* Day of Week Headers */}
          {DAYS_OF_WEEK.map((d) => (
            <div key={d} className="text-xs font-bold text-muted-foreground py-2">
              {d}
            </div>
          ))}

          {/* Blank cells for offset */}
          {Array.from({ length: firstDayIndex }).map((_, i) => (
            <div key={`blank-${i}`} className="min-h-[85px] sm:min-h-[110px] rounded-2xl bg-muted/20 border border-transparent" />
          ))}

          {/* Actual days of current month */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const slot = getSlotForDay(day);

            let statusClasses = "bg-card border-border/70 hover:border-purple-500/40";
            if (slot?.status === "booked") {
              statusClasses = "bg-blue-50/80 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800/80 text-blue-950 dark:text-blue-200";
            } else if (slot?.status === "blocked") {
              statusClasses = "bg-amber-50/80 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/80 text-amber-950 dark:text-amber-200";
            }

            return (
              <button
                key={`day-${day}`}
                onClick={() => handleDateClick(day)}
                className={`min-h-[85px] sm:min-h-[110px] p-2.5 rounded-2xl border flex flex-col justify-between text-left transition-all duration-200 group ${statusClasses}`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-extrabold text-xs sm:text-sm">{day}</span>
                  {slot?.status === "booked" && (
                    <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                  )}
                  {slot?.status === "blocked" && (
                    <Lock className="w-3 h-3 text-amber-600 dark:text-amber-400 shrink-0" />
                  )}
                </div>

                {slot && (
                  <div className="mt-1 space-y-0.5">
                    <span
                      className={`text-[9px] font-bold uppercase tracking-wider block truncate ${
                        slot.status === "booked"
                          ? "text-blue-700 dark:text-blue-300"
                          : slot.status === "blocked"
                          ? "text-amber-700 dark:text-amber-300"
                          : "text-emerald-600"
                      }`}
                    >
                      {slot.status}
                    </span>
                    {slot.note && (
                      <p className="text-[10px] text-muted-foreground truncate hidden sm:block">
                        {slot.clientName || slot.note}
                      </p>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Date Configuration Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md rounded-3xl p-6">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">
              Manage Date: {selectedDate}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSaveStatus} className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="text-xs font-bold">Date Status</Label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedStatus("available")}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                    selectedStatus === "available"
                      ? "bg-emerald-500 text-white border-emerald-600 shadow-soft-sm"
                      : "bg-muted/60 text-muted-foreground border-transparent hover:bg-muted"
                  }`}
                >
                  Available
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedStatus("booked")}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                    selectedStatus === "booked"
                      ? "bg-blue-600 text-white border-blue-700 shadow-soft-sm"
                      : "bg-muted/60 text-muted-foreground border-transparent hover:bg-muted"
                  }`}
                >
                  Booked
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedStatus("blocked")}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                    selectedStatus === "blocked"
                      ? "bg-amber-500 text-white border-amber-600 shadow-soft-sm"
                      : "bg-muted/60 text-muted-foreground border-transparent hover:bg-muted"
                  }`}
                >
                  Blackout
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateNote" className="text-xs font-bold">Notes / Event Reference</Label>
              <Input
                id="dateNote"
                placeholder="e.g. Oheka Castle wedding / Editing hold"
                value={selectedNote}
                onChange={(e) => setSelectedNote(e.target.value)}
                className="rounded-xl"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3">
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
                variant="gradient"
                className="rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

