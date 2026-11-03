import * as React from "react";
import Link from "next/link";
import { Sparkles, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-border/80 bg-background/80 backdrop-blur-xl pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-border/60">
          {/* Column 1: Brand & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-2xl gradient-brand flex items-center justify-center text-white shadow-soft-sm group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                WedConnect
              </span>
            </Link>

            <p className="text-sm font-semibold text-primary">
              Every Event. Every Celebration. One Connection.
            </p>

            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
              The premier luxury event connection marketplace. Connecting discerning couples and event
              hosts with verified master photographers, breathtaking venues, Michelin caterers, and
              visionary designers across the globe.
            </p>
          </div>

          {/* Column 2: Explore */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-foreground">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/vendors" className="hover:text-primary transition-colors">
                  Find Wedding Pros
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-primary transition-colors">
                  Vendor Categories
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-primary transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/vendors?category=venues" className="hover:text-primary transition-colors">
                  Luxury Venues
                </Link>
              </li>
              <li>
                <Link href="/vendors?category=photography" className="hover:text-primary transition-colors">
                  Editorial Photographers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: For Vendors */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-foreground">
              For Vendors
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/auth/register" className="hover:text-primary transition-colors">
                  List Your Business
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="hover:text-primary transition-colors">
                  Vendor Dashboard
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-primary transition-colors">
                  Verification Standards
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Partner Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Company & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-foreground">
              Company
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About WedConnect
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact Concierge
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} WedConnect Inc. All rights reserved.</p>

          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 inline mx-0.5" />
            <span>for unforgettable celebrations worldwide.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

