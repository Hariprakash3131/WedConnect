-- ====================================================================
-- WedConnect - Comprehensive Production Database Schema
-- Version: 1.0.0
-- Tagline: Every Event. Every Celebration. One Connection.
-- Features: UUID everywhere, Soft Delete, Indexes, Foreign Keys, Audit Logs, RLS
-- ====================================================================

-- Enable Required PostgreSQL Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ====================================================================
-- ENUMS
-- ====================================================================

DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('visitor', 'customer', 'vendor', 'admin', 'super_admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE user_status AS ENUM ('active', 'suspended', 'pending_approval', 'deleted');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE verification_status AS ENUM ('pending', 'verified', 'rejected');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE price_type AS ENUM ('fixed', 'hourly', 'custom');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE availability_status AS ENUM ('available', 'booked', 'blocked');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE event_status AS ENUM ('planning', 'active', 'completed', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE enquiry_status AS ENUM ('pending', 'quoted', 'declined', 'converted', 'closed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE quotation_status AS ENUM ('draft', 'sent', 'accepted', 'rejected', 'expired');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE booking_status AS ENUM ('pending_confirmation', 'confirmed', 'in_progress', 'completed', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE review_status AS ENUM ('published', 'hidden', 'flagged');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE notification_type AS ENUM ('booking', 'enquiry', 'quotation', 'chat', 'system', 'review');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ====================================================================
-- 1. PROFILES (Extends auth.users)
-- ====================================================================

CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    avatar_url TEXT,
    role user_role NOT NULL DEFAULT 'customer',
    status user_status NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_status ON public.profiles(status);
CREATE INDEX IF NOT EXISTS idx_profiles_deleted_at ON public.profiles(deleted_at);

-- ====================================================================
-- 2. CATEGORIES
-- ====================================================================

CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    icon TEXT,
    image_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_is_active ON public.categories(is_active);

-- ====================================================================
-- 3. EVENT TYPES
-- ====================================================================

CREATE TABLE IF NOT EXISTS public.event_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    icon TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_event_types_slug ON public.event_types(slug);



CREATE TABLE IF NOT EXISTS public.vendor_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    business_name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    tagline TEXT,
    description TEXT,
    primary_category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    years_of_experience INTEGER NOT NULL DEFAULT 0,
    price_starting_at NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    city TEXT NOT NULL,
    state TEXT,
    country TEXT NOT NULL DEFAULT 'US',
    address TEXT,
    latitude NUMERIC(10, 7),
    longitude NUMERIC(10, 7),
    cover_image_url TEXT,
    website_url TEXT,
    instagram_url TEXT,
    facebook_url TEXT,
    verification_status verification_status NOT NULL DEFAULT 'pending',
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    rating_average NUMERIC(3, 2) NOT NULL DEFAULT 5.00,
    reviews_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    CONSTRAINT uq_vendor_user UNIQUE (user_id)
);

CREATE INDEX IF NOT EXISTS idx_vendors_user_id ON public.vendor_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_vendors_category_id ON public.vendor_profiles(primary_category_id);
CREATE INDEX IF NOT EXISTS idx_vendors_city ON public.vendor_profiles(city);
CREATE INDEX IF NOT EXISTS idx_vendors_verification ON public.vendor_profiles(verification_status);
CREATE INDEX IF NOT EXISTS idx_vendors_featured ON public.vendor_profiles(is_featured);
CREATE INDEX IF NOT EXISTS idx_vendors_rating ON public.vendor_profiles(rating_average DESC);
CREATE INDEX IF NOT EXISTS idx_vendors_deleted_at ON public.vendor_profiles(deleted_at);

-- ====================================================================
-- 5. VENDOR SERVICES
-- ====================================================================

CREATE TABLE IF NOT EXISTS public.vendor_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vendor_id UUID NOT NULL REFERENCES public.vendor_profiles(id) ON DELETE CASCADE,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT,
    price NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    price_type price_type NOT NULL DEFAULT 'fixed',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_services_vendor_id ON public.vendor_services(vendor_id);
CREATE INDEX IF NOT EXISTS idx_services_deleted_at ON public.vendor_services(deleted_at);

-- ====================================================================
-- 6. VENDOR PACKAGES
-- ====================================================================

CREATE TABLE IF NOT EXISTS public.vendor_packages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vendor_id UUID NOT NULL REFERENCES public.vendor_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    price NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    deliverables JSONB NOT NULL DEFAULT '[]'::jsonb,
    is_popular BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_packages_vendor_id ON public.vendor_packages(vendor_id);
CREATE INDEX IF NOT EXISTS idx_packages_deleted_at ON public.vendor_packages(deleted_at);

-- ====================================================================
-- 7. VENDOR PORTFOLIOS
-- ====================================================================

CREATE TABLE IF NOT EXISTS public.vendor_portfolios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vendor_id UUID NOT NULL REFERENCES public.vendor_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    caption TEXT,
    media_type TEXT NOT NULL DEFAULT 'image',
    media_url TEXT NOT NULL,
    thumbnail_url TEXT,
    featured BOOLEAN NOT NULL DEFAULT FALSE,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_portfolios_vendor_id ON public.vendor_portfolios(vendor_id);
CREATE INDEX IF NOT EXISTS idx_portfolios_featured ON public.vendor_portfolios(featured);

-- ====================================================================
-- 8. VENDOR AVAILABILITY
-- ====================================================================

CREATE TABLE IF NOT EXISTS public.vendor_availabilities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vendor_id UUID NOT NULL REFERENCES public.vendor_profiles(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    status availability_status NOT NULL DEFAULT 'available',
    note TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_vendor_date UNIQUE(vendor_id, date)
);

CREATE INDEX IF NOT EXISTS idx_availabilities_vendor_date ON public.vendor_availabilities(vendor_id, date);

-- ====================================================================
-- 9. EVENTS
-- ====================================================================

CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    event_type_id UUID REFERENCES public.event_types(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    event_date DATE NOT NULL,
    start_time TIME,
    end_time TIME,
    location_city TEXT NOT NULL,
    location_venue TEXT,
    guest_count INTEGER NOT NULL DEFAULT 100,
    budget NUMERIC(12, 2) NOT NULL DEFAULT 5000.00,
    status event_status NOT NULL DEFAULT 'planning',
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_events_customer_id ON public.events(customer_id);
CREATE INDEX IF NOT EXISTS idx_events_event_date ON public.events(event_date);
CREATE INDEX IF NOT EXISTS idx_events_status ON public.events(status);
CREATE INDEX IF NOT EXISTS idx_events_deleted_at ON public.events(deleted_at);

-- ====================================================================
-- 10. ENQUIRIES
-- ====================================================================

CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    vendor_id UUID NOT NULL REFERENCES public.vendor_profiles(id) ON DELETE CASCADE,
    event_id UUID REFERENCES public.events(id) ON DELETE SET NULL,
    status enquiry_status NOT NULL DEFAULT 'pending',
    message TEXT NOT NULL,
    budget NUMERIC(12, 2),
    preferred_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_enquiries_customer_id ON public.enquiries(customer_id);
CREATE INDEX IF NOT EXISTS idx_enquiries_vendor_id ON public.enquiries(vendor_id);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.enquiries(status);

-- ====================================================================
-- 11. QUOTATIONS
-- ====================================================================

CREATE TABLE IF NOT EXISTS public.quotations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quote_number TEXT UNIQUE NOT NULL,
    enquiry_id UUID REFERENCES public.enquiries(id) ON DELETE SET NULL,
    vendor_id UUID NOT NULL REFERENCES public.vendor_profiles(id) ON DELETE CASCADE,
    customer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    tax_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    total_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    valid_until DATE NOT NULL,
    terms TEXT,
    status quotation_status NOT NULL DEFAULT 'sent',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_quotations_vendor_id ON public.quotations(vendor_id);
CREATE INDEX IF NOT EXISTS idx_quotations_customer_id ON public.quotations(customer_id);
CREATE INDEX IF NOT EXISTS idx_quotations_status ON public.quotations(status);

-- ====================================================================
-- 12. BOOKINGS
-- ====================================================================

CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_reference TEXT UNIQUE NOT NULL,
    customer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    vendor_id UUID NOT NULL REFERENCES public.vendor_profiles(id) ON DELETE CASCADE,
    event_id UUID REFERENCES public.events(id) ON DELETE SET NULL,
    quotation_id UUID REFERENCES public.quotations(id) ON DELETE SET NULL,
    total_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    deposit_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    status booking_status NOT NULL DEFAULT 'pending_confirmation',
    confirmed_date DATE NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_bookings_customer_id ON public.bookings(customer_id);
CREATE INDEX IF NOT EXISTS idx_bookings_vendor_id ON public.bookings(vendor_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_confirmed_date ON public.bookings(confirmed_date);
CREATE INDEX IF NOT EXISTS idx_bookings_deleted_at ON public.bookings(deleted_at);

-- ====================================================================
-- 13. CONVERSATIONS & CHAT MESSAGES
-- ====================================================================

CREATE TABLE IF NOT EXISTS public.conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    vendor_id UUID NOT NULL REFERENCES public.vendor_profiles(id) ON DELETE CASCADE,
    booking_id UUID REFERENCES public.bookings(id) ON DELETE SET NULL,
    enquiry_id UUID REFERENCES public.enquiries(id) ON DELETE SET NULL,
    last_message_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_conversation_participants UNIQUE(customer_id, vendor_id)
);

CREATE INDEX IF NOT EXISTS idx_conversations_customer_id ON public.conversations(customer_id);
CREATE INDEX IF NOT EXISTS idx_conversations_vendor_id ON public.conversations(vendor_id);
CREATE INDEX IF NOT EXISTS idx_conversations_last_message ON public.conversations(last_message_at DESC);

CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    attachments JSONB NOT NULL DEFAULT '[]'::jsonb,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON public.messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON public.messages(created_at ASC);
CREATE INDEX IF NOT EXISTS idx_messages_is_read ON public.messages(is_read);

-- ====================================================================
-- 14. REVIEWS
-- ====================================================================

CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID REFERENCES public.bookings(id) ON DELETE SET NULL,
    vendor_id UUID NOT NULL REFERENCES public.vendor_profiles(id) ON DELETE CASCADE,
    customer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    response TEXT,
    responded_at TIMESTAMPTZ,
    status review_status NOT NULL DEFAULT 'published',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_reviews_vendor_id ON public.reviews(vendor_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON public.reviews(rating);
CREATE INDEX IF NOT EXISTS idx_reviews_status ON public.reviews(status);
CREATE INDEX IF NOT EXISTS idx_reviews_deleted_at ON public.reviews(deleted_at);

-- ====================================================================
-- 15. FAVORITES
-- ====================================================================

CREATE TABLE IF NOT EXISTS public.favorites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    vendor_id UUID NOT NULL REFERENCES public.vendor_profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_customer_vendor_favorite UNIQUE(customer_id, vendor_id)
);

CREATE INDEX IF NOT EXISTS idx_favorites_customer ON public.favorites(customer_id);

-- ====================================================================
-- 16. NOTIFICATIONS
-- ====================================================================

CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type notification_type NOT NULL DEFAULT 'system',
    link TEXT,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON public.notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON public.notifications(created_at DESC);

-- ====================================================================
-- 17. AUDIT LOGS
-- ====================================================================

CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_actor ON public.audit_logs(actor_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON public.audit_logs(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.audit_logs(created_at DESC);

-- ====================================================================
-- 18. PLATFORM SETTINGS
-- ====================================================================

CREATE TABLE IF NOT EXISTS public.platform_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT UNIQUE NOT NULL,
    value JSONB NOT NULL,
    description TEXT,
    updated_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_platform_settings_key ON public.platform_settings(key);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendor_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendor_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendor_portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendor_availabilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.platform_settings ENABLE ROW LEVEL SECURITY;

-- Helper function: is_admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND (role = 'admin' OR role = 'super_admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles: Anyone can view active profiles; users can update their own
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
    FOR SELECT USING (deleted_at IS NULL);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Categories & Event Types: Viewable by all; manageable by admins
CREATE POLICY "Categories are viewable by everyone" ON public.categories
    FOR SELECT USING (is_active = TRUE OR public.is_admin());

CREATE POLICY "Categories manageable by admins" ON public.categories
    FOR ALL USING (public.is_admin());

CREATE POLICY "Event types viewable by everyone" ON public.event_types
    FOR SELECT USING (is_active = TRUE OR public.is_admin());

CREATE POLICY "Event types manageable by admins" ON public.event_types
    FOR ALL USING (public.is_admin());

-- Vendor Profiles: Public can view verified vendors; vendor can update own
CREATE POLICY "Verified vendors are viewable by everyone" ON public.vendor_profiles
    FOR SELECT USING (verification_status = 'verified' AND deleted_at IS NULL OR auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Vendors can insert own profile" ON public.vendor_profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Vendors can update own profile" ON public.vendor_profiles
    FOR UPDATE USING (auth.uid() = user_id OR public.is_admin());

-- Vendor Services & Packages & Portfolio: Public viewable, vendor manageable
CREATE POLICY "Services viewable by everyone" ON public.vendor_services
    FOR SELECT USING (deleted_at IS NULL);

CREATE POLICY "Vendors manage own services" ON public.vendor_services
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.vendor_profiles WHERE id = vendor_services.vendor_id AND user_id = auth.uid())
        OR public.is_admin()
    );

CREATE POLICY "Packages viewable by everyone" ON public.vendor_packages
    FOR SELECT USING (deleted_at IS NULL);

CREATE POLICY "Vendors manage own packages" ON public.vendor_packages
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.vendor_profiles WHERE id = vendor_packages.vendor_id AND user_id = auth.uid())
        OR public.is_admin()
    );

CREATE POLICY "Portfolios viewable by everyone" ON public.vendor_portfolios
    FOR SELECT USING (deleted_at IS NULL);

CREATE POLICY "Vendors manage own portfolios" ON public.vendor_portfolios
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.vendor_profiles WHERE id = vendor_portfolios.vendor_id AND user_id = auth.uid())
        OR public.is_admin()
    );

-- Events: Customers manage own events; admins can view
CREATE POLICY "Customers manage own events" ON public.events
    FOR ALL USING (auth.uid() = customer_id OR public.is_admin());

-- Enquiries: Participants manage
CREATE POLICY "Participants view enquiries" ON public.enquiries
    FOR SELECT USING (
        auth.uid() = customer_id OR 
        EXISTS (SELECT 1 FROM public.vendor_profiles WHERE id = enquiries.vendor_id AND user_id = auth.uid()) OR
        public.is_admin()
    );

CREATE POLICY "Customers create enquiries" ON public.enquiries
    FOR INSERT WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Participants update enquiries" ON public.enquiries
    FOR UPDATE USING (
        auth.uid() = customer_id OR 
        EXISTS (SELECT 1 FROM public.vendor_profiles WHERE id = enquiries.vendor_id AND user_id = auth.uid()) OR
        public.is_admin()
    );

-- Quotations: Customer & Vendor access
CREATE POLICY "Participants view quotations" ON public.quotations
    FOR SELECT USING (
        auth.uid() = customer_id OR 
        EXISTS (SELECT 1 FROM public.vendor_profiles WHERE id = quotations.vendor_id AND user_id = auth.uid()) OR
        public.is_admin()
    );

CREATE POLICY "Vendors manage quotations" ON public.quotations
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.vendor_profiles WHERE id = quotations.vendor_id AND user_id = auth.uid()) OR
        public.is_admin()
    );

-- Bookings: Customer & Vendor access
CREATE POLICY "Participants view bookings" ON public.bookings
    FOR SELECT USING (
        auth.uid() = customer_id OR 
        EXISTS (SELECT 1 FROM public.vendor_profiles WHERE id = bookings.vendor_id AND user_id = auth.uid()) OR
        public.is_admin()
    );

CREATE POLICY "Participants update bookings" ON public.bookings
    FOR UPDATE USING (
        auth.uid() = customer_id OR 
        EXISTS (SELECT 1 FROM public.vendor_profiles WHERE id = bookings.vendor_id AND user_id = auth.uid()) OR
        public.is_admin()
    );

-- Conversations & Messages
CREATE POLICY "Conversation participants can view" ON public.conversations
    FOR SELECT USING (
        auth.uid() = customer_id OR
        EXISTS (SELECT 1 FROM public.vendor_profiles WHERE id = conversations.vendor_id AND user_id = auth.uid()) OR
        public.is_admin()
    );

CREATE POLICY "Message participants can view" ON public.messages
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.conversations c 
            WHERE c.id = messages.conversation_id AND 
            (c.customer_id = auth.uid() OR EXISTS (SELECT 1 FROM public.vendor_profiles vp WHERE vp.id = c.vendor_id AND vp.user_id = auth.uid()))
        ) OR public.is_admin()
    );

CREATE POLICY "Message sender can insert" ON public.messages
    FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- Reviews: Viewable by all; customer who booked can create
CREATE POLICY "Published reviews viewable by all" ON public.reviews
    FOR SELECT USING (status = 'published' AND deleted_at IS NULL OR public.is_admin());

CREATE POLICY "Customers create reviews" ON public.reviews
    FOR INSERT WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Vendors can respond to reviews" ON public.reviews
    FOR UPDATE USING (
        EXISTS (SELECT 1 FROM public.vendor_profiles WHERE id = reviews.vendor_id AND user_id = auth.uid()) OR
        public.is_admin()
    );

-- Notifications: User only
CREATE POLICY "Users view own notifications" ON public.notifications
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users update own notifications" ON public.notifications
    FOR UPDATE USING (auth.uid() = user_id);

-- Audit Logs: Admins only
CREATE POLICY "Admins view audit logs" ON public.audit_logs
    FOR SELECT USING (public.is_admin());

-- Platform Settings: Viewable by authenticated, manageable by Super Admins
CREATE POLICY "Settings viewable by authenticated" ON public.platform_settings
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Settings manageable by admins" ON public.platform_settings
    FOR ALL USING (public.is_admin());

-- ====================================================================
-- FUNCTIONS & TRIGGERS (Auto timestamp, Profile on Signup, Review Stats)
-- ====================================================================

-- Auto updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_modtime BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
CREATE TRIGGER update_categories_modtime BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
CREATE TRIGGER update_event_types_modtime BEFORE UPDATE ON public.event_types FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
CREATE TRIGGER update_vendor_profiles_modtime BEFORE UPDATE ON public.vendor_profiles FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
CREATE TRIGGER update_vendor_services_modtime BEFORE UPDATE ON public.vendor_services FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
CREATE TRIGGER update_vendor_packages_modtime BEFORE UPDATE ON public.vendor_packages FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
CREATE TRIGGER update_events_modtime BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
CREATE TRIGGER update_enquiries_modtime BEFORE UPDATE ON public.enquiries FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
CREATE TRIGGER update_quotations_modtime BEFORE UPDATE ON public.quotations FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
CREATE TRIGGER update_bookings_modtime BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
CREATE TRIGGER update_reviews_modtime BEFORE UPDATE ON public.reviews FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- Trigger: Automatically create public.profiles record when new auth.users signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
SECURITY DEFINER 
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  v_role public.user_role := 'customer'::public.user_role;
  v_full_name TEXT;
BEGIN
  -- Determine role safely
  IF NEW.raw_user_meta_data->>'role' = 'vendor' THEN
    v_role := 'vendor'::public.user_role;
  ELSIF NEW.raw_user_meta_data->>'role' = 'admin' THEN
    v_role := 'admin'::public.user_role;
  ELSIF NEW.raw_user_meta_data->>'role' = 'super_admin' THEN
    v_role := 'super_admin'::public.user_role;
  ELSE
    v_role := 'customer'::public.user_role;
  END IF;

  -- Determine full name safely
  v_full_name := COALESCE(
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'name',
    split_part(COALESCE(NEW.email, 'user'), '@', 1),
    'User'
  );

  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.email, ''),
    v_full_name,
    v_role
  )
  ON CONFLICT (id) DO UPDATE
  SET 
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name;

  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    RAISE WARNING 'handle_new_user failed: %', SQLERRM;
    RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Trigger: Recalculate vendor rating and review count when review is added
CREATE OR REPLACE FUNCTION public.update_vendor_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.vendor_profiles
    SET 
        rating_average = COALESCE((SELECT ROUND(AVG(rating)::numeric, 2) FROM public.reviews WHERE vendor_id = NEW.vendor_id AND status = 'published' AND deleted_at IS NULL), 5.00),
        reviews_count = (SELECT COUNT(*) FROM public.reviews WHERE vendor_id = NEW.vendor_id AND status = 'published' AND deleted_at IS NULL)
    WHERE id = NEW.vendor_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_review_created_or_updated
  AFTER INSERT OR UPDATE OR DELETE ON public.reviews
  FOR EACH ROW EXECUTE PROCEDURE public.update_vendor_rating();

