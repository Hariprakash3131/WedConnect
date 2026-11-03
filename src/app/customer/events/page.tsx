"use client";

import * as React from "react";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Plus,
  Sparkles,
  ArrowRight,
  Clock,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MOCK_CUSTOMER_EVENTS } from "@/constants/customer-data";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function MyEventsPage() {
  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            My Celebrations
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Manage your planned weddings, ceremonies, receptions, and matching vendors.
          </p>
        </div>

        <Link href="/customer/events/new">
          <Button variant="gradient" className="rounded-2xl font-bold text-xs h-11 px-5 gap-2 shadow-soft-sm">
            <Plus className="w-4 h-4" />
            <span>Create New Celebration</span>
          </Button>
        </Link>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {MOCK_CUSTOMER_EVENTS.map((event) => {
          const daysLeft = Math.max(
            0,
            Math.ceil(
              (new Date(event.eventDate).getTime() - new Date().getTime()) /
                (1000 * 60 * 60 * 24)
            )
          );

          return (
            <Card key={event.id} className="glass-card border-border/80 flex flex-col justify-between">
              <CardHeader className="p-6 pb-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant={event.status === "active" ? "luxury" : "secondary"} className="text-[10px] uppercase font-bold">
                        {event.status}
                      </Badge>
                      <span className="text-[11px] text-muted-foreground font-semibold flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {daysLeft} days away
                      </span>
                    </div>
                    <CardTitle className="text-xl font-bold pt-1">{event.title}</CardTitle>
                    <CardDescription className="text-xs">{event.notes}</CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6 pt-0 space-y-6">
                {/* Event Attributes Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-muted/40 text-xs">
                  <div className="space-y-0.5">
                    <span className="text-muted-foreground block text-[10px]">Date</span>
                    <strong className="text-foreground">{formatDate(event.eventDate)}</strong>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-muted-foreground block text-[10px]">Location</span>
                    <strong className="text-foreground">{event.locationCity}</strong>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-muted-foreground block text-[10px]">Guest Count</span>
                    <strong className="text-foreground">{event.guestCount} Guests</strong>
                  </div>
                </div>

                {/* Budget Tracker */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span>Allocated Budget</span>
                    <span className="text-primary font-bold">{formatCurrency(event.budget)}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full gradient-brand w-[45%]" />
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="pt-2 border-t border-border/60 flex items-center justify-between gap-3">
                  <Link href={`/customer/matched-vendors?eventId=${event.id}`}>
                    <Button variant="gradient" size="sm" className="rounded-xl text-xs font-semibold gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Find Matched Vendors</span>
                    </Button>
                  </Link>

                  <Link href={`/customer/quotations?eventId=${event.id}`}>
                    <Button variant="glass" size="sm" className="rounded-xl text-xs font-semibold">
                      Quotations (2)
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

