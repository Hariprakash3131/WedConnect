import { create } from "zustand";
import { Profile, UserRole } from "@/types";

interface AuthState {
  user: Profile | null;
  role: UserRole;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: Profile | null) => void;
  setRole: (role: UserRole) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: "visitor",
  isAuthenticated: false,
  isLoading: true,
  setUser: (user) =>
    set({
      user,
      role: user?.role || "visitor",
      isAuthenticated: !!user,
      isLoading: false,
    }),
  setRole: (role) => set({ role }),
  setLoading: (isLoading) => set({ isLoading }),
  logout: () =>
    set({
      user: null,
      role: "visitor",
      isAuthenticated: false,
      isLoading: false,
    }),
}));

