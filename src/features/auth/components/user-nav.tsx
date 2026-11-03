"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { logoutAction } from "@/actions/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROLE_ROUTES } from "@/constants";
import { getInitials } from "@/lib/utils";
import { LayoutDashboard, User, LogOut, Shield } from "lucide-react";
import toast from "react-hot-toast";

export function UserNav() {
  const router = useRouter();
  const { user, role, isAuthenticated, isLoading, logout } = useAuthStore();

  const handleSignOut = async () => {
    try {
      await logoutAction();
      logout();
      toast.success("Successfully signed out");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("Error signing out");
    }
  };

  if (isLoading) {
    return <div className="h-10 w-24 rounded-full bg-muted/60 animate-pulse" />;
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center space-x-3">
        <Link href="/auth/login">
          <Button variant="ghost" size="sm" className="font-semibold text-xs sm:text-sm">
            Sign In
          </Button>
        </Link>
        <Link href="/auth/register">
          <Button variant="gradient" size="sm" className="font-semibold text-xs sm:text-sm shadow-soft-sm">
            Get Started
          </Button>
        </Link>
      </div>
    );
  }

  const dashboardRoute = ROLE_ROUTES[role] || ROLE_ROUTES.customer;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center space-x-2.5 rounded-full p-1 hover:bg-muted/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40">
          <Avatar className="h-9 w-9 border border-primary/20">
            {user.avatar_url && <AvatarImage src={user.avatar_url} alt={user.full_name} />}
            <AvatarFallback>{getInitials(user.full_name)}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-foreground leading-none">{user.full_name}</p>
              <Badge variant="secondary" className="text-[10px] uppercase font-bold py-0 px-1.5">
                {role.replace("_", " ")}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-none truncate pt-0.5">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href={dashboardRoute} className="flex items-center gap-2 cursor-pointer">
            <LayoutDashboard className="w-4 h-4 text-primary" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href={`${dashboardRoute}/profile`} className="flex items-center gap-2 cursor-pointer">
            <User className="w-4 h-4 text-muted-foreground" />
            <span>Profile & Settings</span>
          </Link>
        </DropdownMenuItem>

        {(role === "admin" || role === "super_admin") && (
          <DropdownMenuItem asChild>
            <Link href="/admin/dashboard" className="flex items-center gap-2 cursor-pointer">
              <Shield className="w-4 h-4 text-purple-600" />
              <span>Admin Center</span>
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleSignOut}
          className="text-rose-600 focus:bg-rose-500/10 focus:text-rose-600 flex items-center gap-2 cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
