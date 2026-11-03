"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  LayoutDashboard,
  ShieldCheck,
  Users,
  AlertTriangle,
  BookmarkCheck,
  Inbox,
  BarChart3,
  Layers,
  Calendar,
  History,
  Settings,
  Shield,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserNav } from "@/features/auth/components/user-nav";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

const adminNav = [
  { label: "Executive Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Vendor Verification", href: "/admin/vendor-approval", icon: ShieldCheck, badge: "8" },
  { label: "Customer Directory", href: "/admin/customers", icon: Users },
  { label: "Disputes & Reports", href: "/admin/reports", icon: AlertTriangle, badge: "2" },
  { label: "Global Bookings", href: "/admin/bookings", icon: BookmarkCheck },
  { label: "Enquiries Oversight", href: "/admin/enquiries", icon: Inbox },
  { label: "Platform Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Category Taxonomy", href: "/admin/categories", icon: Layers },
  { label: "Event Types", href: "/admin/event-types", icon: Calendar },
  { label: "Immutable Audit Logs", href: "/admin/audit-logs", icon: History },
  { label: "Platform Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <div className="min-h-screen mesh-gradient-bg flex flex-col md:flex-row">
      {/* Desktop Admin Command Sidebar */}
      <aside className="hidden md:flex flex-col w-72 border-r border-border/80 glass-nav p-5 justify-between shrink-0 h-screen sticky top-0 overflow-y-auto">
        <div className="space-y-5">
          {/* Logo & Portal Badge */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-600 flex items-center justify-center text-white shadow-soft-sm group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600">
                WedConnect
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-1.5 py-0.5 rounded-md border border-blue-200 dark:border-blue-800/60">
                  Admin Command
                </span>
              </div>
            </div>
          </Link>

          {/* Quick Super Admin Switcher Shortcut */}
          <Link href="/super-admin/dashboard" className="block">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-blue-500/10 border border-amber-500/20 hover:border-amber-500/40 transition-all flex items-center justify-between group">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-bold text-foreground">Super Admin</span>
              </div>
              <span className="text-[10px] text-muted-foreground group-hover:text-foreground font-semibold">
                Elevate &rarr;
              </span>
            </div>
          </Link>

          {/* Navigation Items */}
          <nav className="space-y-1 pt-1">
            {adminNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-soft-sm shadow-blue-500/25"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={cn("w-4 h-4 shrink-0", isActive ? "text-white" : "text-muted-foreground")} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={cn(
                        "text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Profile Summary */}
        <div className="pt-4 border-t border-border/60 flex items-center justify-between">
          <UserNav />
          <ThemeToggle />
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-40 h-16 border-b border-border/80 glass-nav px-4 sm:px-8 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="h-9 w-9 rounded-xl"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>

            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg gradient-text">WedConnect</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-muted-foreground">
            <span className="text-blue-600 dark:text-blue-400 font-bold">Admin Console</span>
            <span>/</span>
            <span className="text-foreground capitalize">
              {pathname.split("/").pop()?.replace("-", " ") || "Dashboard"}
            </span>
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-3">
            <Link href="/super-admin/dashboard" className="hidden sm:inline-flex">
              <Button variant="outline" size="sm" className="h-9 rounded-xl text-xs font-bold gap-1.5 border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10">
                <Shield className="w-3.5 h-3.5" />
                <span>Super Admin</span>
              </Button>
            </Link>

            <div className="md:hidden">
              <ThemeToggle />
            </div>

            <div className="md:hidden">
              <UserNav />
            </div>
          </div>
        </header>

        {/* Mobile Slide-Down Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass-panel border-b border-border/80 p-4 space-y-2 shadow-soft-xl max-h-[80vh] overflow-y-auto"
            >
              <Link href="/super-admin/dashboard" onClick={() => setMobileOpen(false)} className="block pb-2">
                <Button variant="outline" className="w-full text-xs font-bold gap-2 border-amber-500/30 text-amber-600">
                  <Shield className="w-4 h-4" />
                  <span>Open Super Admin Console</span>
                </Button>
              </Link>
              {adminNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold",
                    pathname === item.href ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white" : "text-muted-foreground"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/20 text-white">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}

