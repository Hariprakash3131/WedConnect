"use client";

import * as React from "react";
import {
  TrendingUp,
  DollarSign,
  Users,
  Target,
  ArrowUpRight,
  PieChart as PieIcon,
  Sparkles,
  Calendar,
  Layers,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/utils";
import { VENDOR_ANALYTICS_DATA, VENDOR_STATS } from "@/constants/vendor-data";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

export default function VendorAnalyticsPage() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Studio Performance Analytics</h1>
            <Badge className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-none font-bold text-xs">
              2026 Season
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Real-time analytics covering seasonal revenue velocity, lead conversion funnels, and package profitability.
          </p>
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl glass-card border border-border/80">
          <span className="text-xs font-semibold text-muted-foreground">Season Gross Bookings</span>
          <h3 className="text-2xl font-black mt-2 text-foreground">$148,500</h3>
          <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            +23.5% vs 2025
          </p>
        </div>

        <div className="p-5 rounded-3xl glass-card border border-border/80">
          <span className="text-xs font-semibold text-muted-foreground">Inquiry-to-Booking Rate</span>
          <h3 className="text-2xl font-black mt-2 text-foreground">41.2%</h3>
          <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold mt-1">
            Industry Benchmark: 18.5%
          </p>
        </div>

        <div className="p-5 rounded-3xl glass-card border border-border/80">
          <span className="text-xs font-semibold text-muted-foreground">Average Contract Value</span>
          <h3 className="text-2xl font-black mt-2 text-foreground">$7,150</h3>
          <p className="text-xs text-emerald-600 font-semibold mt-1">
            +$650 higher than 2025
          </p>
        </div>

        <div className="p-5 rounded-3xl glass-card border border-border/80">
          <span className="text-xs font-semibold text-muted-foreground">AI Matchmaker Inquiries</span>
          <h3 className="text-2xl font-black mt-2 text-foreground">45%</h3>
          <p className="text-xs text-muted-foreground font-semibold mt-1">
            Largest client source
          </p>
        </div>
      </div>

      {/* Revenue Performance Area Chart */}
      <div className="p-6 sm:p-7 rounded-3xl glass-card border border-border/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold tracking-tight">Seasonal Revenue Trajectory</h2>
            <p className="text-xs text-muted-foreground">
              Gross contracted celebration revenue by month (USD)
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-purple-600" />
              <span>2026 (Current)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-border" />
              <span className="text-muted-foreground">2025</span>
            </div>
          </div>
        </div>

        <div className="h-72 w-full pt-4">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={VENDOR_ANALYTICS_DATA.monthlyRevenue} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="purpleRevGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9333ea" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#9333ea" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="month" stroke="#888888" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#888888"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `$${val / 1000}k`}
                />
                <Tooltip
                  formatter={(val: number) => [`$${val.toLocaleString()}`, ""]}
                  contentStyle={{
                    borderRadius: "16px",
                    background: "rgba(15, 23, 42, 0.9)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "#ffffff",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="previousYear"
                  stroke="#94a3b8"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  fill="transparent"
                />
                <Area
                  type="monotone"
                  dataKey="currentYear"
                  stroke="#9333ea"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#purpleRevGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-xs text-muted-foreground">
              Loading visualization...
            </div>
          )}
        </div>
      </div>

      {/* Two Column Grid: Conversion Funnel & Package Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Conversion Funnel */}
        <div className="p-6 sm:p-7 rounded-3xl glass-card border border-border/80 space-y-6">
          <div>
            <h2 className="text-lg font-bold tracking-tight">Studio Conversion Funnel</h2>
            <p className="text-xs text-muted-foreground">
              From public profile visit to signed contract
            </p>
          </div>

          <div className="space-y-4">
            {VENDOR_ANALYTICS_DATA.funnelData.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-foreground">{item.stage}</span>
                  <span className="text-purple-600 dark:text-purple-400">
                    {item.count.toLocaleString()} ({item.rate})
                  </span>
                </div>
                <Progress value={100 - idx * 25} className="h-2 rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Package Revenue Share */}
        <div className="p-6 sm:p-7 rounded-3xl glass-card border border-border/80 space-y-6">
          <div>
            <h2 className="text-lg font-bold tracking-tight">Package Revenue Contribution</h2>
            <p className="text-xs text-muted-foreground">
              Breakdown of earnings by collection tier
            </p>
          </div>

          <div className="space-y-4">
            {VENDOR_ANALYTICS_DATA.packagePerformance.map((pkg, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-muted/40 border border-border/60 flex items-center justify-between"
              >
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-foreground">{pkg.name}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{pkg.bookings} booked celebrations</p>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-sm text-foreground">{formatCurrency(pkg.revenue)}</span>
                  <span className="text-[11px] text-purple-600 dark:text-purple-400 font-bold block">
                    {pkg.percentage}% share
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

