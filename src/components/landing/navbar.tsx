"use client";

import * as React from "react";
import Link from "next/link";
import { Sparkles, Menu, X, Search } from "lucide-react";
import { UserNav } from "@/features/auth/components/user-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Find Vendors", href: "/vendors" },
    { label: "Categories", href: "#categories" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "About", href: "/about" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "glass-nav py-3.5 shadow-soft-sm"
          : "bg-background/40 backdrop-blur-md py-5 border-b border-border/20"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-2xl gradient-brand flex items-center justify-center text-white shadow-soft-md group-hover:scale-105 transition-transform duration-200">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 leading-none">
              WedConnect
            </span>
            <span className="text-[10px] font-semibold text-muted-foreground tracking-wider uppercase mt-1">
              Every Celebration
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-3.5 py-2 rounded-xl text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions: Theme Toggle, Quick Search Trigger, User Nav */}
        <div className="flex items-center space-x-3">
          <Link href="/vendors" className="hidden sm:inline-flex">
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-muted-foreground hover:text-foreground">
              <Search className="w-4 h-4" />
            </Button>
          </Link>

          <ThemeToggle />

          <div className="hidden sm:block">
            <UserNav />
          </div>

          {/* Mobile Menu Hamburger */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden h-10 w-10 rounded-xl"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden glass-panel border-b border-border/80 px-6 py-6 space-y-4 shadow-soft-xl"
          >
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-base font-semibold text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="pt-4 border-t border-border/60 flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Account</span>
              <UserNav />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

