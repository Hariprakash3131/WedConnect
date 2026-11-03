export type UserRole = "visitor" | "customer" | "vendor" | "admin" | "super_admin";
export type UserStatus = "active" | "suspended" | "pending_approval" | "deleted";
export type VerificationStatus = "pending" | "verified" | "rejected";
export type PriceType = "fixed" | "hourly" | "custom";
export type AvailabilityStatus = "available" | "booked" | "blocked";
export type EventStatus = "planning" | "active" | "completed" | "cancelled";
export type EnquiryStatus = "pending" | "quoted" | "declined" | "converted" | "closed";
export type QuotationStatus = "draft" | "sent" | "accepted" | "rejected" | "expired";
export type BookingStatus = "pending_confirmation" | "confirmed" | "in_progress" | "completed" | "cancelled";
export type ReviewStatus = "published" | "hidden" | "flagged";
export type NotificationType = "booking" | "enquiry" | "quotation" | "chat" | "system" | "review";

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  phone?: string | null;
  avatar_url?: string | null;
  role: UserRole;
  status: UserStatus;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  icon?: string | null;
  image_url?: string | null;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface EventType {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  icon?: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface VendorProfile {
  id: string;
  user_id: string;
  business_name: string;
  slug: string;
  tagline?: string | null;
  description?: string | null;
  primary_category_id?: string | null;
  years_of_experience: number;
  price_starting_at: number;
  currency: string;
  city: string;
  state?: string | null;
  country: string;
  address?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  cover_image_url?: string | null;
  website_url?: string | null;
  instagram_url?: string | null;
  facebook_url?: string | null;
  verification_status: VerificationStatus;
  is_featured: boolean;
  rating_average: number;
  reviews_count: number;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  // Joined fields
  category?: Category;
  user?: Profile;
}

export interface VendorService {
  id: string;
  vendor_id: string;
  category_id?: string | null;
  title: string;
  description?: string | null;
  price: number;
  price_type: PriceType;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

export interface VendorPackage {
  id: string;
  vendor_id: string;
  title: string;
  description?: string | null;
  price: number;
  deliverables: string[];
  is_popular: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

export interface VendorPortfolio {
  id: string;
  vendor_id: string;
  title: string;
  caption?: string | null;
  media_type: "image" | "video";
  media_url: string;
  thumbnail_url?: string | null;
  featured: boolean;
  display_order: number;
  created_at: string;
  deleted_at?: string | null;
}

export interface VendorAvailability {
  id: string;
  vendor_id: string;
  date: string;
  status: AvailabilityStatus;
  note?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: string;
  customer_id: string;
  event_type_id?: string | null;
  title: string;
  event_date: string;
  start_time?: string | null;
  end_time?: string | null;
  location_city: string;
  location_venue?: string | null;
  guest_count: number;
  budget: number;
  status: EventStatus;
  notes?: string | null;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  // Joined fields
  event_type?: EventType;
}

export interface Enquiry {
  id: string;
  customer_id: string;
  vendor_id: string;
  event_id?: string | null;
  status: EnquiryStatus;
  message: string;
  budget?: number | null;
  preferred_date?: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  customer?: Profile;
  vendor?: VendorProfile;
  event?: Event;
}

export interface QuotationItem {
  id: string;
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
}

export interface Quotation {
  id: string;
  quote_number: string;
  enquiry_id?: string | null;
  vendor_id: string;
  customer_id: string;
  amount: number;
  currency: string;
  tax_amount: number;
  total_amount: number;
  items: QuotationItem[];
  valid_until: string;
  terms?: string | null;
  status: QuotationStatus;
  created_at: string;
  updated_at: string;
  // Joined fields
  vendor?: VendorProfile;
  customer?: Profile;
}

export interface Booking {
  id: string;
  booking_reference: string;
  customer_id: string;
  vendor_id: string;
  event_id?: string | null;
  quotation_id?: string | null;
  total_amount: number;
  deposit_amount: number;
  status: BookingStatus;
  confirmed_date: string;
  notes?: string | null;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  // Joined fields
  vendor?: VendorProfile;
  customer?: Profile;
  event?: Event;
}

export interface Conversation {
  id: string;
  customer_id: string;
  vendor_id: string;
  booking_id?: string | null;
  enquiry_id?: string | null;
  last_message_at: string;
  created_at: string;
  // Joined fields
  customer?: Profile;
  vendor?: VendorProfile;
  last_message?: Message;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  attachments?: Array<{ url: string; name: string; size: number }> | null;
  is_read: boolean;
  created_at: string;
  deleted_at?: string | null;
}

export interface Review {
  id: string;
  booking_id?: string | null;
  vendor_id: string;
  customer_id: string;
  rating: number;
  comment: string;
  response?: string | null;
  responded_at?: string | null;
  status: ReviewStatus;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  // Joined fields
  customer?: Profile;
}

export interface Favorite {
  id: string;
  customer_id: string;
  vendor_id: string;
  created_at: string;
  vendor?: VendorProfile;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: NotificationType;
  link?: string | null;
  is_read: boolean;
  created_at: string;
}

export interface AuditLog {
  id: string;
  actor_id?: string | null;
  action: string;
  entity_type: string;
  entity_id?: string | null;
  old_values?: Record<string, unknown> | null;
  new_values?: Record<string, unknown> | null;
  ip_address?: string | null;
  user_agent?: string | null;
  created_at: string;
}

export interface PlatformSetting {
  id: string;
  key: string;
  value: Record<string, unknown>;
  description?: string | null;
  updated_by?: string | null;
  updated_at: string;
}

