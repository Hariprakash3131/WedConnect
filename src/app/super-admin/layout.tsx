"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  KeyRound,
  Users,
  Settings,
  Terminal,
  Lock,
  Sparkles,
  Menu,
  X,
  ArrowLeft,
  Flame,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserNav } from "@/features/auth/components/user-nav";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

const superAdminNav = [
  { label: "Root Governance", href: "/super-admin/dashboard", icon: Shield },
  { label: "Role & Permission Matrix", href: "/super-admin/roles", icon: KeyRound },
  { label: "Admin Staff Accounts", href: "/super-admin/admin-accounts", icon: Users },
  { label: "Master Platform Settings", href: "/super-admin/platform-settings", icon: Settings },
  { label: "System & Network Logs", href: "/super-admin/system-logs", icon: Terminal },
  { label: "Security & Firewall", href: "/super-admin/security", icon: Lock },
];

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <div className="min-h-screen mesh-gradient-bg flex flex-col md:flex-row">
      {/* Desktop Super Admin Security Sidebar */}
      <aside className="hidden md:flex flex-col w-72 border-r border-amber-500/20 glass-nav p-5 justify-between shrink-0 h-screen sticky top-0 overflow-y-auto bg-gradient-to-b from-card/80 via-background to-card/90">
        <div className="space-y-5">
          {/* Logo & Portal Badge */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-600 to-rose-600 flex items-center justify-center text-white shadow-soft-sm group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-orange-600 to-rose-600">
                WedConnect
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-1.5 py-0.5 rounded-md border border-amber-300 dark:border-amber-800/60">
                  Super Admin
                </span>
              </div>
            </div>
          </Link>

          {/* Quick Return to Standard Admin Shortcut */}
          <Link href="/admin/dashboard" className="block">
            <div className="p-2.5 rounded-xl bg-muted/60 hover:bg-muted transition-all flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Admin Console</span>
            </div>
          </Link>

          {/* Navigation Items */}
          <nav className="space-y-1 pt-1">
            {superAdminNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-soft-sm shadow-amber-500/25"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                  )}
                >
                  <Icon className={cn("w-4 h-4 shrink-0", isActive ? "text-white" : "text-amber-500")} />
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
        <header className="sticky top-0 z-40 h-16 border-b border-amber-500/20 glass-nav px-4 sm:px-8 flex items-center justify-between bg-card/60">
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
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg gradient-text">WedConnect</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-muted-foreground">
            <span className="text-amber-600 dark:text-amber-400 font-bold">Super Admin Root</span>
            <span>/</span>
            <span className="text-foreground capitalize">
              {pathname.split("/").pop()?.replace("-", " ") || "Dashboard"}
            </span>
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-3">
            <Link href="/admin/dashboard" className="hidden sm:inline-flex">
              <Button variant="outline" size="sm" className="h-9 rounded-xl text-xs font-bold gap-1.5">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Admin Console</span>
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
              <Link href="/admin/dashboard" onClick={() => setMobileOpen(false)} className="block pb-2">
                <Button variant="outline" className="w-full text-xs font-bold gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return to Admin Console</span>
                </Button>
              </Link>
              {superAdminNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold",
                    pathname === item.href ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white" : "text-muted-foreground"
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

