
-- Drop helper function if it exists
DROP FUNCTION IF EXISTS public.drop_type_if_exists(text, text);

-- Function to safely drop a type if it exists
CREATE OR REPLACE FUNCTION public.drop_type_if_exists(schema_name text, type_name text)
RETURNS void AS $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_type t
    JOIN pg_namespace n ON n.oid = t.typnamespace
    WHERE n.nspname = schema_name
      AND t.typname = type_name
  ) THEN
    EXECUTE 'DROP TYPE ' || quote_ident(schema_name) || '.' || quote_ident(type_name) || ' CASCADE';
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Drop dependent function and then custom types safely before recreating them
DROP FUNCTION IF EXISTS get_my_claim(text) CASCADE;
SELECT public.drop_type_if_exists('public', 'user_role');
SELECT public.drop_type_if_exists('public', 'activity_status');
SELECT public.drop_type_if_exists('public', 'booking_status');
SELECT public.drop_type_if_exists('public', 'referral_status');
SELECT public.drop_type_if_exists('public', 'payout_status');


-- Recreate custom types
CREATE TYPE public.user_role AS ENUM ('admin', 'customer', 'partner', 'agent');
CREATE TYPE public.activity_status AS ENUM ('pending_approval', 'active', 'inactive', 'rejected');
CREATE TYPE public.booking_status AS ENUM ('pending', 'confirmed', 'cancelled');
CREATE TYPE public.referral_status AS ENUM ('unpaid', 'paid');
CREATE TYPE public.payout_status AS ENUM ('pending', 'paid', 'failed');


-- Table for storing countries
CREATE TABLE IF NOT EXISTS public.countries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    currency TEXT NOT NULL,
    currency_symbol TEXT NOT NULL
);

-- Table for storing cities, linked to countries
CREATE TABLE IF NOT EXISTS public.cities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    country_code TEXT NOT NULL REFERENCES public.countries(code) ON DELETE CASCADE,
    UNIQUE(name, country_code)
);

-- Table for different types of activities
CREATE TABLE IF NOT EXISTS public.activity_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE
);

-- Table for partners
CREATE TABLE IF NOT EXISTS public.partners (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    company_name TEXT NOT NULL,
    contact_email TEXT,
    website TEXT,
    iban TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table for agents
CREATE TABLE IF NOT EXISTS public.agents (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    agency_name TEXT,
    commission_rate NUMERIC(5, 2) NOT NULL DEFAULT 5.00,
    referral_code TEXT UNIQUE,
    paypal_email TEXT,
    sponsor_id UUID REFERENCES public.agents(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Main table for activities/excursions
CREATE TABLE IF NOT EXISTS public.activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    country TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    duration TEXT,
    activitytypeid UUID REFERENCES public.activity_types(id),
    partner_id UUID REFERENCES public.partners(id) ON DELETE SET NULL,
    rating NUMERIC(3, 2) DEFAULT 0.00,
    review_count INT DEFAULT 0,
    images TEXT[],
    discount INTEGER,
    operatinghours TEXT,
    whatsincluded TEXT[],
    whatsnotincluded TEXT[],
    instructions TEXT,
    howtogetthere TEXT,
    additionalinfo TEXT,
    cancellationpolicy TEXT,
    status public.activity_status DEFAULT 'pending_approval',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table for bookings
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_reference TEXT UNIQUE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    guest_email TEXT,
    guest_name TEXT,
    activity_id UUID NOT NULL REFERENCES public.activities(id),
    booking_date TIMESTAMPTZ NOT NULL,
    status public.booking_status DEFAULT 'confirmed',
    quantity INTEGER NOT NULL DEFAULT 1,
    total_price NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
-- Add check constraint to ensure at least one identifier is present
ALTER TABLE public.bookings DROP CONSTRAINT IF EXISTS user_or_guest_email_check;
ALTER TABLE public.bookings ADD CONSTRAINT user_or_guest_email_check CHECK (user_id IS NOT NULL OR guest_email IS NOT NULL);


-- Table for reviews
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    activity_id UUID NOT NULL REFERENCES public.activities(id) ON DELETE CASCADE,
    author TEXT,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, activity_id)
);

-- Table for wishlist items
CREATE TABLE IF NOT EXISTS public.wishlist_items (
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    activity_id UUID NOT NULL REFERENCES public.activities(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, activity_id)
);

-- Table for referrals
CREATE TABLE IF NOT EXISTS public.referrals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
    agent_id UUID NOT NULL REFERENCES public.agents(id) ON DELETE CASCADE,
    commission_amount NUMERIC(10, 2) NOT NULL,
    status public.referral_status NOT NULL DEFAULT 'unpaid',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table for payouts
CREATE TABLE IF NOT EXISTS public.payouts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID NOT NULL REFERENCES public.agents(id) ON DELETE CASCADE,
    amount NUMERIC(10, 2) NOT NULL,
    status public.payout_status NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    paid_at TIMESTAMPTZ
);

-- Table for user document storage
CREATE TABLE IF NOT EXISTS public.user_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table for application settings
CREATE TABLE IF NOT EXISTS public.settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value TEXT
);

-- Table for user points history
CREATE TABLE IF NOT EXISTS public.points_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  points_change INTEGER NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);


--------------------------------------------
-- Functions for Row Level Security (RLS)
--------------------------------------------
-- Safely get a value from the user's JWT claims
CREATE OR REPLACE FUNCTION public.get_my_claim(claim TEXT)
RETURNS TEXT AS $$
  SELECT nullif(current_setting('request.jwt.claims', true)::json->>claim, '')::TEXT;
$$ LANGUAGE SQL STABLE;

-- Safely get the current authenticated user's ID
CREATE OR REPLACE FUNCTION public.get_my_id()
RETURNS UUID AS $$
  SELECT nullif(current_setting('request.jwt.claims', true)::json->>'sub', '')::uuid;
$$ LANGUAGE SQL STABLE;


--------------------------------------------
-- Row Level Security (RLS) Policies
--------------------------------------------

-- Policies for activity_types
ALTER TABLE public.activity_types ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.activity_types;
DROP POLICY IF EXISTS "Allow admin to manage" ON public.activity_types;

CREATE POLICY "Enable read access for all users" ON public.activity_types FOR SELECT USING (true);
CREATE POLICY "Allow admin to manage" ON public.activity_types FOR ALL USING ((get_my_claim('role'))::text = 'admin') WITH CHECK ((get_my_claim('role'))::text = 'admin');

-- Policies for activities
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.activities;
DROP POLICY IF EXISTS "Allow users to create their own activities" ON public.activities;
DROP POLICY IF EXISTS "Allow users to update their own activities" ON public.activities;
DROP POLICY IF EXISTS "Allow admin to delete activities" ON public.activities;

CREATE POLICY "Enable read access for all users" ON public.activities FOR SELECT USING (true);
CREATE POLICY "Allow users to create their own activities" ON public.activities FOR INSERT WITH CHECK (
    auth.uid() IS NOT NULL AND (
        (get_my_claim('role'))::text = 'admin' OR
        ((get_my_claim('role'))::text = 'partner' AND partner_id = get_my_id())
    )
);
CREATE POLICY "Allow users to update their own activities" ON public.activities FOR UPDATE USING (
    auth.uid() IS NOT NULL AND (
        (get_my_claim('role'))::text = 'admin' OR
        ((get_my_claim('role'))::text = 'partner' AND partner_id = get_my_id())
    )
);
CREATE POLICY "Allow admin to delete activities" ON public.activities FOR DELETE USING ((get_my_claim('role'))::text = 'admin');


-- Policies for bookings
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow users to see their own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Allow users to create their own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Allow admin and partners to view bookings" ON public.bookings;

CREATE POLICY "Allow users to see their own bookings" ON public.bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Allow users to create their own bookings" ON public.bookings FOR INSERT WITH CHECK (auth.uid() = user_id OR guest_email IS NOT NULL);
CREATE POLICY "Allow admin and partners to view bookings" ON public.bookings FOR SELECT USING (
    (get_my_claim('role'))::text IN ('admin', 'partner')
);


-- Policies for reviews
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.reviews;
DROP POLICY IF EXISTS "Allow users to manage their own reviews" ON public.reviews;

CREATE POLICY "Enable read access for all users" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Allow users to manage their own reviews" ON public.reviews FOR ALL USING (auth.uid() = user_id);

-- Policies for wishlist_items
ALTER TABLE public.wishlist_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow users to manage their own wishlist" ON public.wishlist_items;
CREATE POLICY "Allow users to manage their own wishlist" ON public.wishlist_items FOR ALL USING (auth.uid() = user_id);

-- Policies for user_documents
ALTER TABLE public.user_documents ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow users to manage their own documents" ON public.user_documents;
CREATE POLICY "Allow users to manage their own documents" ON public.user_documents FOR ALL USING (auth.uid() = user_id);

-- Policies for partners
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow partners to see their own profile" ON public.partners;
DROP POLICY IF EXISTS "Admins can manage all partner profiles" ON public.partners;
CREATE POLICY "Allow partners to see their own profile" ON public.partners FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admins can manage all partner profiles" ON public.partners FOR ALL USING ((get_my_claim('role'))::text = 'admin');


-- Policies for agents
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow agents to see their own profile" ON public.agents;
DROP POLICY IF EXISTS "Admins can manage all agent profiles" ON public.agents;
CREATE POLICY "Allow agents to see their own profile" ON public.agents FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admins can manage all agent profiles" ON public.agents FOR ALL USING ((get_my_claim('role'))::text = 'admin');


-- Policies for referrals
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow agents to see their own referrals" ON public.referrals;
DROP POLICY IF EXISTS "Admins can manage all referrals" ON public.referrals;
CREATE POLICY "Allow agents to see their own referrals" ON public.referrals FOR SELECT USING (auth.uid() = agent_id);
CREATE POLICY "Admins can manage all referrals" ON public.referrals FOR ALL USING ((get_my_claim('role'))::text = 'admin');


-- Policies for payouts
ALTER TABLE public.payouts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow agents to see their own payouts" ON public.payouts;
DROP POLICY IF EXISTS "Admins can manage all payouts" ON public.payouts;
CREATE POLICY "Allow agents to see their own payouts" ON public.payouts FOR SELECT USING (auth.uid() = agent_id);
CREATE POLICY "Admins can manage all payouts" ON public.payouts FOR ALL USING ((get_my_claim('role'))::text = 'admin');


-- Policies for settings
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.settings;
DROP POLICY IF EXISTS "Allow admins to manage settings" ON public.settings;
CREATE POLICY "Enable read access for all users" ON public.settings FOR SELECT USING (true);
CREATE POLICY "Allow admins to manage settings" ON public.settings FOR ALL USING ((get_my_claim('role'))::text = 'admin');


-- Policies for points_history
ALTER TABLE public.points_history ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow users to see their own points history" ON public.points_history;
DROP POLICY IF EXISTS "Allow admin to view all points history" ON public.points_history;
CREATE POLICY "Allow users to see their own points history" ON public.points_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Allow admin to view all points history" ON public.points_history FOR SELECT USING ((get_my_claim('role'))::text = 'admin');

--------------------------------------------
-- PostgreSQL Functions for business logic
--------------------------------------------

-- Function to update the average rating of an activity
CREATE OR REPLACE FUNCTION public.update_activity_rating(p_activity_id UUID)
RETURNS void AS $$
DECLARE
    avg_rating NUMERIC;
    review_count INT;
BEGIN
    SELECT
        AVG(r.rating),
        COUNT(r.id)
    INTO
        avg_rating,
        review_count
    FROM
        public.reviews r
    WHERE
        r.activity_id = p_activity_id;

    UPDATE public.activities
    SET
        rating = COALESCE(avg_rating, 0),
        review_count = COALESCE(review_count, 0)
    WHERE
        id = p_activity_id;
END;
$$ LANGUAGE plpgsql;

-- Function to handle country creation with city
CREATE OR REPLACE FUNCTION public.create_country(
    p_code TEXT,
    p_name TEXT,
    p_currency TEXT,
    p_currency_symbol TEXT
)
RETURNS void AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = p_code) THEN
        RAISE EXCEPTION 'Country with code % already exists', p_code;
    END IF;
    IF EXISTS (SELECT 1 FROM public.countries WHERE name = p_name) THEN
        RAISE EXCEPTION 'Country with name % already exists', p_name;
    END IF;
    INSERT INTO public.countries (code, name, currency, currency_symbol)
    VALUES (p_code, p_name, p_currency, p_currency_symbol);
END;
$$ LANGUAGE plpgsql;

-- Function to handle country updates
CREATE OR REPLACE FUNCTION public.update_country(
    p_code TEXT,
    p_name TEXT,
    p_currency TEXT,
    p_currency_symbol TEXT
)
RETURNS void AS $$
BEGIN
    UPDATE public.countries
    SET
        name = p_name,
        currency = p_currency,
        currency_symbol = p_currency_symbol
    WHERE
        code = p_code;
END;
$$ LANGUAGE plpgsql;

-- Function to handle country deletion
CREATE OR REPLACE FUNCTION public.delete_country(p_code TEXT)
RETURNS void AS $$
DECLARE
    activity_count INT;
BEGIN
    SELECT COUNT(*) INTO activity_count FROM public.activities WHERE country = (SELECT name FROM public.countries WHERE code = p_code);
    IF activity_count > 0 THEN
        RAISE EXCEPTION 'Cannot delete country because it is associated with % activities.', activity_count;
    END IF;
    DELETE FROM public.countries WHERE code = p_code;
END;
$$ LANGUAGE plpgsql;

--------------------------------------------
-- Triggers
--------------------------------------------

-- Trigger to automatically update the average rating on a review change
DROP TRIGGER IF EXISTS on_review_change_trigger ON public.reviews;

CREATE OR REPLACE FUNCTION on_review_change()
RETURNS TRIGGER AS $$
BEGIN
    -- When a review is inserted, updated, or deleted,
    -- recalculate the average rating for the associated activity.
    PERFORM public.update_activity_rating(COALESCE(NEW.activity_id, OLD.activity_id));
    RETURN NULL; -- result is ignored since this is an AFTER trigger
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_review_change_trigger
AFTER INSERT OR UPDATE OR DELETE ON public.reviews
FOR EACH ROW
EXECUTE FUNCTION on_review_change();


-- Trigger to set updated_at timestamp on activities
DROP TRIGGER IF EXISTS handle_updated_at ON public.activities;

CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER handle_updated_at
BEFORE UPDATE ON public.activities
FOR EACH ROW
EXECUTE FUNCTION handle_updated_at();

-- This is a placeholder for the initial migration tracking.
-- Supabase handles migrations automatically, so this is just for logical completion
-- and should not be run manually if using the Supabase CLI.
-- INSERT INTO supabase_migrations.schema_migrations(version) VALUES('20240731120000');
