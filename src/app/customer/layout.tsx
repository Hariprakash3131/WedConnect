"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  LayoutDashboard,
  Calendar,
  Sparkle,
  Heart,
  FileText,
  BookmarkCheck,
  Star,
  MessageSquare,
  User,
  Plus,
  Menu,
  X,
  Compass,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserNav } from "@/features/auth/components/user-nav";
import { NotificationCenter } from "@/components/notifications/notification-center";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

const sidebarNav = [
  { label: "Dashboard", href: "/customer/dashboard", icon: LayoutDashboard },
  { label: "My Events", href: "/customer/events", icon: Calendar },
  { label: "Matched Vendors", href: "/customer/matched-vendors", icon: Compass },
  { label: "Shortlisted", href: "/customer/favorites", icon: Heart },
  { label: "Quotations", href: "/customer/quotations", icon: FileText },
  { label: "Bookings", href: "/customer/bookings", icon: BookmarkCheck },
  { label: "Reviews", href: "/customer/reviews", icon: Star },
  { label: "Messages", href: "/customer/chat", icon: MessageSquare },
  { label: "My Profile", href: "/customer/profile", icon: User },
];

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <div className="min-h-screen mesh-gradient-bg flex flex-col md:flex-row">
      {/* Desktop Luxury Sidebar */}
      <aside className="hidden md:flex flex-col w-72 border-r border-border/80 glass-nav p-6 justify-between shrink-0 h-screen sticky top-0">
        <div className="space-y-6">
          {/* Logo & Portal Badge */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-2xl gradient-brand flex items-center justify-center text-white shadow-soft-sm group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                WedConnect
              </span>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Couple Portal
              </p>
            </div>
          </Link>

          {/* Quick Create Event CTA Button */}
          <Link href="/customer/events/new" className="block">
            <Button
              variant="gradient"
              className="w-full h-11 rounded-2xl font-bold text-xs gap-2 shadow-soft-md shadow-primary/20"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Event</span>
            </Button>
          </Link>

          {/* Navigation Items */}
          <nav className="space-y-1.5 pt-2">
            {sidebarNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-200",
                    isActive
                      ? "bg-primary text-white shadow-soft-sm shadow-primary/25"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                  )}
                >
                  <Icon className={cn("w-4 h-4 shrink-0", isActive ? "text-white" : "text-muted-foreground")} />
                  <span>{item.label}</span>
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
              <div className="w-8 h-8 rounded-xl gradient-brand flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg gradient-text">WedConnect</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-muted-foreground">
            <span>Customer Portal</span>
            <span>/</span>
            <span className="text-foreground capitalize">
              {pathname.split("/").pop()?.replace("-", " ") || "Dashboard"}
            </span>
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-3">
            <Link href="/vendors" className="hidden sm:inline-flex">
              <Button variant="glass" size="sm" className="h-9 rounded-xl text-xs font-bold gap-1.5">
                <Compass className="w-3.5 h-3.5 text-primary" />
                <span>Explore Vendors</span>
              </Button>
            </Link>

            <NotificationCenter />

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
              className="md:hidden glass-panel border-b border-border/80 p-4 space-y-2 shadow-soft-xl"
            >
              <Link href="/customer/events/new" onClick={() => setMobileOpen(false)} className="block pb-2">
                <Button variant="gradient" className="w-full text-xs font-bold gap-2">
                  <Plus className="w-4 h-4" />
                  <span>Create New Event</span>
                </Button>
              </Link>
              {sidebarNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold",
                    pathname === item.href ? "bg-primary text-white" : "text-muted-foreground"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
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

