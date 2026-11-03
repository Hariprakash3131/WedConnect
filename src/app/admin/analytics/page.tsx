"use client";

import * as React from "react";
import {
  TrendingUp,
  DollarSign,
  Users,
  ShieldCheck,
  Calendar,
  Layers,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/utils";
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
} from "recharts";

const MONTHLY_GMV_DATA = [
  { month: "May", gmv: 185000, commission: 18500 },
  { month: "Jun", gmv: 242000, commission: 24200 },
  { month: "Jul", gmv: 295000, commission: 29500 },
  { month: "Aug", gmv: 310000, commission: 31000 },
  { month: "Sep", gmv: 368000, commission: 36800 },
  { month: "Oct", gmv: 420800, commission: 42080 },
];

const CATEGORY_SHARE = [
  { name: "Luxury Venues & Estates", percentage: 42, revenue: 596736 },
  { name: "Photography & Cinema", percentage: 26, revenue: 369408 },
  { name: "Haute Floral & Decor", percentage: 18, revenue: 255744 },
  { name: "Bespoke Catering & Chefs", percentage: 14, revenue: 198912 },
];

export default function AdminAnalyticsPage() {
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
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Platform Business Intelligence</h1>
            <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-none font-bold text-xs">
              Executive Analytics
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Analyze Gross Marketplace Volume (GMV), platform commission take-rates, and category growth.
          </p>
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl glass-card border border-border/80">
          <span className="text-xs text-muted-foreground font-semibold">Total GMV (Oct YTD)</span>
          <h3 className="text-2xl font-black mt-2 text-foreground">$1,420,800</h3>
          <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            +28.4% YoY
          </p>
        </div>

        <div className="p-5 rounded-3xl glass-card border border-border/80">
          <span className="text-xs text-muted-foreground font-semibold">Net Platform Take-Rate</span>
          <h3 className="text-2xl font-black mt-2 text-emerald-600">$142,080</h3>
          <p className="text-xs text-muted-foreground font-semibold mt-1">
            10.0% standardized commission
          </p>
        </div>

        <div className="p-5 rounded-3xl glass-card border border-border/80">
          <span className="text-xs text-muted-foreground font-semibold">Avg Contract Size</span>
          <h3 className="text-2xl font-black mt-2 text-foreground">$5,728</h3>
          <p className="text-xs text-emerald-600 font-semibold mt-1">
            +$820 vs 2025
          </p>
        </div>

        <div className="p-5 rounded-3xl glass-card border border-border/80">
          <span className="text-xs text-muted-foreground font-semibold">Active Vendor Utilization</span>
          <h3 className="text-2xl font-black mt-2 text-foreground">78.5%</h3>
          <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-1">
            Have 2+ booked celebrations
          </p>
        </div>
      </div>

      {/* Monthly GMV Chart */}
      <div className="p-6 sm:p-7 rounded-3xl glass-card border border-border/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold tracking-tight">Gross Marketplace Volume Velocity</h2>
            <p className="text-xs text-muted-foreground">
              Total celebration contract volume facilitated across WedConnect (USD)
            </p>
          </div>
        </div>

        <div className="h-72 w-full pt-4">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MONTHLY_GMV_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="adminGmvGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
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
                  dataKey="gmv"
                  stroke="#2563eb"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#adminGmvGrad)"
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

      {/* Two Column Grid: Platform Commission & Category Shares */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Commission Take-Rate BarChart */}
        <div className="p-6 sm:p-7 rounded-3xl glass-card border border-border/80 space-y-6">
          <div>
            <h2 className="text-lg font-bold tracking-tight">Platform Commission Revenue</h2>
            <p className="text-xs text-muted-foreground">
              Net 10% marketplace revenue collected into escrow
            </p>
          </div>

          <div className="h-64 w-full pt-2">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MONTHLY_GMV_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
                    formatter={(val: number) => [`$${val.toLocaleString()}`, "Commission"]}
                    contentStyle={{
                      borderRadius: "16px",
                      background: "rgba(15, 23, 42, 0.9)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      color: "#ffffff",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="commission" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-muted-foreground">
                Loading...
              </div>
            )}
          </div>
        </div>

        {/* Category Volume Shares */}
        <div className="p-6 sm:p-7 rounded-3xl glass-card border border-border/80 space-y-6">
          <div>
            <h2 className="text-lg font-bold tracking-tight">Volume by Category</h2>
            <p className="text-xs text-muted-foreground">
              Gross sales share across luxury service specialties
            </p>
          </div>

          <div className="space-y-4">
            {CATEGORY_SHARE.map((cat, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-foreground">{cat.name}</span>
                  <span className="text-blue-600 dark:text-blue-400">
                    {formatCurrency(cat.revenue)} ({cat.percentage}%)
                  </span>
                </div>
                <Progress value={cat.percentage * 2} className="h-2 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

