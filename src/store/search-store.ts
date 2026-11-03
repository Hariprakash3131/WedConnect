import { create } from "zustand";

interface SearchState {
  categorySlug: string | null;
  city: string;
  budgetMin: number;
  budgetMax: number;
  verifiedOnly: boolean;
  searchQuery: string;
  sortBy: "rating" | "price_asc" | "price_desc" | "popularity" | "newest";
  setCategorySlug: (categorySlug: string | null) => void;
  setCity: (city: string) => void;
  setBudgetRange: (min: number, max: number) => void;
  setVerifiedOnly: (verifiedOnly: boolean) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sortBy: SearchState["sortBy"]) => void;
  resetFilters: () => void;
}

const initialState = {
  categorySlug: null,
  city: "",
  budgetMin: 0,
  budgetMax: 50000,
  verifiedOnly: false,
  searchQuery: "",
  sortBy: "rating" as const,
};

export const useSearchStore = create<SearchState>((set) => ({
  ...initialState,
  setCategorySlug: (categorySlug) => set({ categorySlug }),
  setCity: (city) => set({ city }),
  setBudgetRange: (budgetMin, budgetMax) => set({ budgetMin, budgetMax }),
  setVerifiedOnly: (verifiedOnly) => set({ verifiedOnly }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSortBy: (sortBy) => set({ sortBy }),
  resetFilters: () => set(initialState),
}));

