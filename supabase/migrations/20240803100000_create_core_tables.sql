-- supabase/migrations/20240803100000_create_core_tables.sql

-- Helper function to drop types safely
CREATE OR REPLACE FUNCTION drop_type_if_exists(type_name TEXT)
RETURNS void AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_type WHERE typname = type_name) THEN
        EXECUTE 'DROP TYPE ' || quote_ident(type_name) || ' CASCADE';
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Drop existing types before creating them to ensure idempotency
SELECT drop_type_if_exists('role');
SELECT drop_type_if_exists('booking_status');
SELECT drop_type_if_exists('payout_status');
SELECT drop_type_if_exists('referral_status');
SELECT drop_type_if_exists('activity_status');

-- Create custom types
CREATE TYPE role AS ENUM ('customer', 'agent', 'partner', 'admin');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled');
CREATE TYPE payout_status AS ENUM ('pending', 'paid', 'failed');
CREATE TYPE referral_status AS ENUM ('unpaid', 'paid');
CREATE TYPE activity_status AS ENUM ('pending_approval', 'active', 'inactive', 'rejected');

-- Partners Table
CREATE TABLE IF NOT EXISTS public.partners (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    company_name TEXT NOT NULL,
    contact_email TEXT,
    website TEXT,
    iban TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Agents Table
CREATE TABLE IF NOT EXISTS public.agents (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    agency_name TEXT,
    commission_rate NUMERIC(5, 2) NOT NULL DEFAULT 5.0,
    referral_code TEXT UNIQUE NOT NULL,
    paypal_email TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activity Types Table
CREATE TABLE IF NOT EXISTS public.activity_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activities Table
CREATE TABLE IF NOT EXISTS public.activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    country TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL DEFAULT 0,
    duration TEXT,
    activitytypeid UUID REFERENCES public.activity_types(id),
    partner_id UUID REFERENCES public.partners(id) ON DELETE SET NULL,
    rating NUMERIC(3, 2) NOT NULL DEFAULT 0,
    images TEXT[],
    operatinghours TEXT,
    whatsincluded TEXT[],
    whatsnotincluded TEXT[],
    instructions TEXT,
    howtogetthere TEXT,
    additionalinfo TEXT,
    cancellationpolicy TEXT,
    status activity_status NOT NULL DEFAULT 'pending_approval',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bookings Table
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    guest_email TEXT,
    guest_name TEXT,
    activity_id UUID NOT NULL REFERENCES public.activities(id) ON DELETE CASCADE,
    booking_date DATE NOT NULL,
    booking_reference TEXT UNIQUE NOT NULL,
    status booking_status NOT NULL DEFAULT 'confirmed',
    quantity INTEGER NOT NULL DEFAULT 1,
    total_price NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Referrals Table
CREATE TABLE IF NOT EXISTS public.referrals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
    agent_id UUID NOT NULL REFERENCES public.agents(id) ON DELETE CASCADE,
    commission_amount NUMERIC(10, 2) NOT NULL,
    status referral_status NOT NULL DEFAULT 'unpaid',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    payout_id UUID, -- To be populated when a payout is processed
    UNIQUE(booking_id) -- An order can only be referred once
);

-- Payouts Table
CREATE TABLE IF NOT EXISTS public.payouts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID NOT NULL REFERENCES public.agents(id) ON DELETE CASCADE,
    amount NUMERIC(10, 2) NOT NULL,
    status payout_status NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    paid_at TIMESTAMPTZ
);

-- Reviews Table
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    activity_id UUID NOT NULL REFERENCES public.activities(id) ON DELETE CASCADE,
    author TEXT,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, activity_id) -- A user can only review an activity once
);

-- Wishlist Table
CREATE TABLE IF NOT EXISTS public.wishlist_items (
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    activity_id UUID NOT NULL REFERENCES public.activities(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, activity_id)
);

-- Points History Table
CREATE TABLE IF NOT EXISTS public.points_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    points_change INTEGER NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Documents Table
CREATE TABLE IF NOT EXISTS public.user_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    document_type TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Settings Table
CREATE TABLE IF NOT EXISTS public.settings (
    key TEXT PRIMARY KEY,
    value TEXT
);

-- RATING UPDATE FUNCTION AND TRIGGER
DROP FUNCTION IF EXISTS public.update_activity_rating() CASCADE;
CREATE OR REPLACE FUNCTION public.update_activity_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.activities
    SET rating = (SELECT AVG(rating) FROM public.reviews WHERE activity_id = NEW.activity_id)
    WHERE id = NEW.activity_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_review_change ON public.reviews;
CREATE TRIGGER on_review_change
AFTER INSERT OR UPDATE OR DELETE ON public.reviews
FOR EACH ROW EXECUTE FUNCTION public.update_activity_rating();

-- Function to get user claims (like role)
DROP FUNCTION IF EXISTS public.get_my_claim(text) CASCADE;
CREATE OR REPLACE FUNCTION public.get_my_claim(claim TEXT)
RETURNS JSONB AS $$
    SELECT coalesce(current_setting('request.jwt.claims', true)::jsonb ->> claim, null)::jsonb;
$$ LANGUAGE SQL STABLE;


-- RLS POLICIES
ALTER TABLE public.activity_types ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.activity_types;
CREATE POLICY "Enable read access for all users" ON public.activity_types FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow admin to manage" ON public.activity_types;
CREATE POLICY "Allow admin to manage" ON public.activity_types FOR ALL USING (get_my_claim('role') = '"admin"');

ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.activities;
CREATE POLICY "Enable read access for all users" ON public.activities FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow users to create their own activities" ON public.activities;
CREATE POLICY "Allow users to create their own activities" ON public.activities FOR INSERT WITH CHECK (
    (get_my_claim('role') = '"admin"') OR 
    (get_my_claim('role') = '"partner"' AND partner_id = auth.uid())
);
DROP POLICY IF EXISTS "Allow users to update their own activities" ON public.activities;
CREATE POLICY "Allow users to update their own activities" ON public.activities FOR UPDATE USING (
    (get_my_claim('role') = '"admin"') OR 
    (get_my_claim('role') = '"partner"' AND partner_id = auth.uid())
);
DROP POLICY IF EXISTS "Allow admin to delete activities" ON public.activities;
CREATE POLICY "Allow admin to delete activities" ON public.activities FOR DELETE USING (get_my_claim('role') = '"admin"');


ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view their own bookings" ON public.bookings;
CREATE POLICY "Users can view their own bookings" ON public.bookings FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can create bookings for themselves" ON public.bookings;
CREATE POLICY "Users can create bookings for themselves" ON public.bookings FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Allow admin and partners to view bookings" ON public.bookings;
CREATE POLICY "Allow admin and partners to view bookings" ON public.bookings FOR SELECT USING (
    (get_my_claim('role') = '"admin"') OR
    (get_my_claim('role') = '"partner"' AND activity_id IN (SELECT id FROM public.activities WHERE partner_id = auth.uid()))
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.reviews;
CREATE POLICY "Enable read access for all users" ON public.reviews FOR SELECT USING (true);
DROP POLICY IF EXISTS "Users can insert their own reviews" ON public.reviews;
CREATE POLICY "Users can insert their own reviews" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = user_id);

ALTER TABLE public.wishlist_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can manage their own wishlist" ON public.wishlist_items;
CREATE POLICY "Users can manage their own wishlist" ON public.wishlist_items FOR ALL USING (auth.uid() = user_id);

ALTER TABLE public.user_documents ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can manage their own documents" ON public.user_documents;
CREATE POLICY "Users can manage their own documents" ON public.user_documents FOR ALL USING (auth.uid() = user_id);

ALTER TABLE public.points_history ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view their own points history" ON public.points_history;
CREATE POLICY "Users can view their own points history" ON public.points_history FOR SELECT USING (auth.uid() = user_id);

ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Partners can view and edit their own profile" ON public.partners;
CREATE POLICY "Partners can view and edit their own profile" ON public.partners FOR ALL USING (auth.uid() = id);
DROP POLICY IF EXISTS "Admins can manage all partner profiles" ON public.partners;
CREATE POLICY "Admins can manage all partner profiles" ON public.partners FOR ALL USING (get_my_claim('role') = '"admin"');

ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Agents can view and edit their own profile" ON public.agents;
CREATE POLICY "Agents can view and edit their own profile" ON public.agents FOR ALL USING (auth.uid() = id);
DROP POLICY IF EXISTS "Admins can manage all agent profiles" ON public.agents;
CREATE POLICY "Admins can manage all agent profiles" ON public.agents FOR ALL USING (get_my_claim('role') = '"admin"');

ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Agents can see their own referrals" ON public.referrals;
CREATE POLICY "Agents can see their own referrals" ON public.referrals FOR SELECT USING (auth.uid() = agent_id);
DROP POLICY IF EXISTS "Admins can manage all referrals" ON public.referrals;
CREATE POLICY "Admins can manage all referrals" ON public.referrals FOR ALL USING (get_my_claim('role') = '"admin"');

ALTER TABLE public.payouts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Agents can see their own payouts" ON public.payouts;
CREATE POLICY "Agents can see their own payouts" ON public.payouts FOR SELECT USING (auth.uid() = agent_id);
DROP POLICY IF EXISTS "Admins can manage all payouts" ON public.payouts;
CREATE POLICY "Admins can manage all payouts" ON public.payouts FOR ALL USING (get_my_claim('role') = '"admin"');

ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.settings;
CREATE POLICY "Enable read access for all users" ON public.settings FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow admins to manage settings" ON public.settings;
CREATE POLICY "Allow admins to manage settings" ON public.settings FOR ALL USING (get_my_claim('role') = '"admin"');
