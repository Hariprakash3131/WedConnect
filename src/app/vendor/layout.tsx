"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  LayoutDashboard,
  Store,
  Film,
  Package,
  Briefcase,
  Calendar,
  Inbox,
  FileText,
  BookmarkCheck,
  Star,
  BarChart3,
  MessageSquare,
  Plus,
  ExternalLink,
  Menu,
  X,
  BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserNav } from "@/features/auth/components/user-nav";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

const vendorNav = [
  { label: "Studio Dashboard", href: "/vendor/dashboard", icon: LayoutDashboard },
  { label: "Business Profile", href: "/vendor/profile", icon: Store },
  { label: "Portfolio Gallery", href: "/vendor/portfolio", icon: Film },
  { label: "Packages", href: "/vendor/packages", icon: Package },
  { label: "Services Catalog", href: "/vendor/services", icon: Briefcase },
  { label: "Availability Calendar", href: "/vendor/availability", icon: Calendar },
  { label: "Client Enquiries", href: "/vendor/enquiries", icon: Inbox, badge: "5" },
  { label: "Quotations", href: "/vendor/quotations", icon: FileText },
  { label: "Confirmed Bookings", href: "/vendor/bookings", icon: BookmarkCheck },
  { label: "Client Messages", href: "/vendor/chat", icon: MessageSquare, badge: "1" },
  { label: "Performance Analytics", href: "/vendor/analytics", icon: BarChart3 },
  { label: "Reviews & Reputation", href: "/vendor/reviews", icon: Star },
];

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <div className="min-h-screen mesh-gradient-bg flex flex-col md:flex-row">
      {/* Desktop Luxury Studio Sidebar */}
      <aside className="hidden md:flex flex-col w-72 border-r border-border/80 glass-nav p-5 justify-between shrink-0 h-screen sticky top-0 overflow-y-auto">
        <div className="space-y-5">
          {/* Logo & Portal Badge */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-600 flex items-center justify-center text-white shadow-soft-sm group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600">
                WedConnect
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-1.5 py-0.5 rounded-md border border-purple-200 dark:border-purple-800/60">
                  Vendor Studio
                </span>
                <BadgeCheck className="w-3.5 h-3.5 text-blue-500" />
              </div>
            </div>
          </Link>

          {/* Quick Create Quotation CTA Button */}
          <Link href="/vendor/quotations" className="block">
            <Button
              variant="gradient"
              className="w-full h-10 rounded-xl font-bold text-xs gap-2 shadow-soft-md shadow-purple-500/20 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              <Plus className="w-4 h-4" />
              <span>New Quotation</span>
            </Button>
          </Link>

          {/* Navigation Items */}
          <nav className="space-y-1 pt-1">
            {vendorNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-soft-sm shadow-purple-500/25"
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
                          : "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300"
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
          <div className="flex items-center gap-1.5">
            <Link
              href="/vendors/v2"
              target="_blank"
              title="View Public Profile"
              className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
            <ThemeToggle />
          </div>
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
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg gradient-text">WedConnect</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-muted-foreground">
            <span className="text-purple-600 dark:text-purple-400 font-bold">Vendor Studio</span>
            <span>/</span>
            <span className="text-foreground capitalize">
              {pathname.split("/").pop()?.replace("-", " ") || "Dashboard"}
            </span>
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-3">
            <Link href="/vendors/v2" target="_blank" className="hidden sm:inline-flex">
              <Button variant="glass" size="sm" className="h-9 rounded-xl text-xs font-bold gap-1.5">
                <ExternalLink className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>View Public Profile</span>
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
              <Link href="/vendor/quotations" onClick={() => setMobileOpen(false)} className="block pb-2">
                <Button variant="gradient" className="w-full text-xs font-bold gap-2 bg-gradient-to-r from-purple-600 to-indigo-600">
                  <Plus className="w-4 h-4" />
                  <span>New Quotation</span>
                </Button>
              </Link>
              {vendorNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold",
                    pathname === item.href ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white" : "text-muted-foreground"
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

