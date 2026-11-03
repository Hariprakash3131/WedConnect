export * from "./database";

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface VendorSearchParams extends PaginationParams {
  categorySlug?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  verifiedOnly?: boolean;
  searchQuery?: string;
  sortBy?: "rating" | "price_asc" | "price_desc" | "popularity" | "newest";
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

