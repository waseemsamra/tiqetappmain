
-- Drop helper functions and types if they exist, cascading to dependent objects
DROP FUNCTION IF EXISTS public.drop_type_if_exists(text, text);
CREATE OR REPLACE FUNCTION public.drop_type_if_exists(schema_name text, type_name text)
RETURNS void AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_type t JOIN pg_namespace n ON t.typnamespace = n.oid WHERE n.nspname = schema_name AND t.typname = type_name) THEN
        EXECUTE 'DROP TYPE ' || quote_ident(schema_name) || '.' || quote_ident(type_name) || ' CASCADE';
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Drop types using the helper function
SELECT public.drop_type_if_exists('public', 'user_role');
SELECT public.drop_type_if_exists('public', 'activity_status');
SELECT publicþ.drop_type_if_exists('public', 'booking_status');
SELECT public.drop_type_if_exists('public', 'referral_status');
SELECT public.drop_type_if_exists('public', 'payout_status');

-- Drop functions if they exist, using CASCADE to handle dependencies
DROP FUNCTION IF EXISTS public.get_my_claim(text);
DROP FUNCTION IF EXISTS public.is_claims_admin();
DROP FUNCTION IF EXISTS public.update_activity_rating(uuid);

-- Recreate types
CREATE TYPE public.user_role AS ENUM ('admin', 'agent', 'partner', 'customer');
CREATE TYPE public.activity_status AS ENUM ('pending_approval', 'active', 'inactive', 'rejected');
CREATE TYPE public.booking_status AS ENUM ('confirmed', 'cancelled', 'pending');
CREATE TYPE public.referral_status AS ENUM ('unpaid', 'paid');
CREATE TYPE public.payout_status AS ENUM ('pending', 'paid', 'failed');


-- Functions for Auth
--------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.get_my_claim(claim TEXT)
RETURNS JSONB
LANGUAGE 'sql' STABLE
AS $$
  SELECT COALESCE(current_setting('request.jwt.claims', true)::JSONB->claim, 'null'::JSONB);
$$;

CREATE OR REPLACE FUNCTION public.is_claims_admin()
RETURNS BOOLEAN
LANGUAGE 'sql' STABLE
AS $$
  SELECT COALESCE(get_my_claim('role')::TEXT = '"admin"', FALSE);
$$;

-- Function to update average rating
--------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.update_activity_rating(p_activity_id uuid)
RETURNS void
LANGUAGE plpgsql
AS $$
DECLARE
    v_avg_rating NUMERIC;
BEGIN
    -- Calculate the new average rating for the given activity
    SELECT AVG(rating) INTO v_avg_rating
    FROM public.reviews
    WHERE activity_id = p_activity_id;

    -- Update the average_rating in the activities table
    UPDATE public.activities
    SET rating = COALESCE(v_avg_rating, 0)
    WHERE id = p_activity_id;
END;
$$;

-- Tables
--------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.activity_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.partners (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    company_name TEXT,
    contact_email TEXT,
    website TEXT,
    iban TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.agents (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    agency_name TEXT,
    commission_rate NUMERIC(5, 2) NOT NULL DEFAULT 5.00,
    referral_code TEXT NOT NULL UNIQUE,
    paypal_email TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

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
    images TEXT[],
    discount INTEGER,
    operatinghours TEXT,
    whatsincluded TEXT[],
    whatsnotincluded TEXT[],
    instructions TEXT,
    howtogetthere TEXT,
    additionalinfo TEXT,
    cancellationpolicy TEXT,
    status activity_status NOT NULL DEFAULT 'pending_approval',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    activity_id UUID REFERENCES public.activities(id) ON DELETE CASCADE NOT NULL,
    booking_date TIMESTAMPTZ NOT NULL,
    status booking_status NOT NULL,
    quantity INTEGER NOT NULL,
    total_price NUMERIC(10, 2) NOT NULL,
    booking_reference TEXT UNIQUE NOT NULL,
    guest_email TEXT,
    guest_name TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    activity_id UUID REFERENCES public.activities(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    author TEXT,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(activity_id, user_id)
);

CREATE TABLE IF NOT EXISTS public.wishlist_items (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    activity_id UUID REFERENCES public.activities(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, activity_id)
);

CREATE TABLE IF NOT EXISTS public.referrals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE NOT NULL,
    agent_id UUID REFERENCES public.agents(id) ON DELETE CASCADE NOT NULL,
    commission_amount NUMERIC(10, 2) NOT NULL,
    status referral_status NOT NULL DEFAULT 'unpaid',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.payouts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID REFERENCES public.agents(id) ON DELETE CASCADE NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    status payout_status NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    paid_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS public.settings (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    key TEXT NOT NULL UNIQUE,
    value TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.countries (
    code TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    currency TEXT,
    currency_symbol TEXT
);

CREATE TABLE IF NOT EXISTS public.cities (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    country_code TEXT REFERENCES public.countries(code) ON DELETE CASCADE,
    UNIQUE(name, country_code)
);

CREATE TABLE IF NOT EXISTS public.user_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    document_type TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.points_history (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    points_change INTEGER NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- Policies
--------------------------------------------------------------------------------

-- Activity Types
ALTER TABLE public.activity_types ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.activity_types;
CREATE POLICY "Enable read access for all users" ON public.activity_types FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow admin to manage" ON public.activity_types;
CREATE POLICY "Allow admin to manage" ON public.activity_types FOR ALL USING ((get_my_claim('role'))::text = '"admin"') WITH CHECK ((get_my_claim('role'))::text = '"admin"');

-- Activities
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.activities;
CREATE POLICY "Enable read access for all users" ON public.activities FOR SELECT USING (status = 'active');
DROP POLICY IF EXISTS "Allow users to create their own activities" ON public.activities;
CREATE POLICY "Allow users to create their own activities" ON public.activities FOR INSERT WITH CHECK (((get_my_claim('role'))::text = '"partner"') OR ((get_my_claim('role'))::text = '"admin"'));
DROP POLICY IF EXISTS "Allow users to update their own activities" ON public.activities;
CREATE POLICY "Allow users to update their own activities" ON public.activities FOR UPDATE USING (partner_id = (SELECT auth.uid())) WITH CHECK (partner_id = (SELECT auth.uid()));
DROP POLICY IF EXISTS "Allow admin to delete activities" ON public.activities;
CREATE POLICY "Allow admin to delete activities" ON public.activities FOR DELETE USING ((get_my_claim('role'))::text = '"admin"');
DROP POLICY IF EXISTS "Allow admins full access" ON public.activities;
CREATE POLICY "Allow admins full access" ON public.activities FOR ALL USING ((get_my_claim('role'))::text = '"admin"') WITH CHECK ((get_my_claim('role'))::text = '"admin"');


-- Bookings
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable read access for own bookings" ON public.bookings;
CREATE POLICY "Enable read access for own bookings" ON public.bookings FOR SELECT USING (user_id = auth.uid());
DROP POLICY IF EXISTS "Allow users to create their own bookings" ON public.bookings;
CREATE POLICY "Allow users to create their own bookings" ON public.bookings FOR INSERT WITH CHECK (user_id = auth.uid());
DROP POLICY IF EXISTS "Allow admin and partners to view bookings" ON public.bookings;
CREATE POLICY "Allow admin and partners to view bookings" ON public.bookings FOR SELECT USING (
    ((get_my_claim('role'))::text = '"admin"') OR
    (
        ((get_my_claim('role'))::text = '"partner"') AND
        activity_id IN (SELECT id FROM public.activities WHERE partner_id = auth.uid())
    )
);

-- Reviews
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.reviews;
CREATE POLICY "Enable read access for all users" ON public.reviews FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow users to create their own reviews" ON public.reviews;
CREATE POLICY "Allow users to create their own reviews" ON public.reviews FOR INSERT WITH CHECK (user_id = auth.uid());


-- Wishlist Items
ALTER TABLE public.wishlist_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable read access for own wishlist items" ON public.wishlist_items;
CREATE POLICY "Enable read access for own wishlist items" ON public.wishlist_items FOR SELECT USING (
    (user_id = auth.uid())
    AND
    (activity_id IN (SELECT id FROM public.activities WHERE status = 'active'))
);

DROP POLICY IF EXISTS "Allow users to manage their own wishlist" ON public.wishlist_items;
CREATE POLICY "Allow users to manage their own wishlist" ON public.wishlist_items FOR ALL USING (user_id = auth.uid());

-- Partners
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable read for authenticated users" ON public.partners;
CREATE POLICY "Enable read for authenticated users" ON public.partners FOR SELECT USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "Enable update for own profile" ON public.partners;
CREATE POLICY "Enable update for own profile" ON public.partners FOR UPDATE USING (id = auth.uid());
DROP POLICY IF EXISTS "Admins can manage all partner profiles" ON public.partners;
CREATE POLICY "Admins can manage all partner profiles" ON public.partners FOR ALL USING ((get_my_claim('role'))::text = '"admin"') WITH CHECK ((get_my_claim('role'))::text = '"admin"');

-- Agents
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable read for authenticated users" ON public.agents;
CREATE POLICY "Enable read for authenticated users" ON public.agents FOR SELECT USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "Enable update for own profile" ON public.agents;
CREATE POLICY "Enable update for own profile" ON public.agents FOR UPDATE USING (id = auth.uid());
DROP POLICY IF EXISTS "Admins can manage all agent profiles" ON public.agents;
CREATE POLICY "Admins can manage all agent profiles" ON public.agents FOR ALL USING ((get_my_claim('role'))::text = '"admin"') WITH CHECK ((get_my_claim('role'))::text = '"admin"');

-- Referrals
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Agents can view their own referrals" ON public.referrals;
CREATE POLICY "Agents can view their own referrals" ON public.referrals FOR SELECT USING (agent_id = auth.uid());
DROP POLICY IF EXISTS "Admins can manage all referrals" ON public.referrals;
CREATE POLICY "Admins can manage all referrals" ON public.referrals FOR ALL USING ((get_my_claim('role'))::text = '"admin"') WITH CHECK ((get_my_claim('role'))::text = '"admin"');

-- Payouts
ALTER TABLE public.payouts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Agents can view their own payouts" ON public.payouts;
CREATE POLICY "Agents can view their own payouts" ON public.payouts FOR SELECT USING (agent_id = auth.uid());
DROP POLICY IF EXISTS "Admins can manage all payouts" ON public.payouts;
CREATE POLICY "Admins can manage all payouts" ON public.payouts FOR ALL USING ((get_my_claim('role'))::text = '"admin"') WITH CHECK ((get_my_claim('role'))::text = '"admin"');

-- Settings
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.settings;
CREATE POLICY "Enable read access for all users" ON public.settings FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow admins to manage settings" ON public.settings;
CREATE POLICY "Allow admins to manage settings" ON public.settings FOR ALL USING ((get_my_claim('role'))::text = '"admin"') WITH CHECK ((get_my_claim('role'))::text = '"admin"');

-- Countries
ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.countries;
CREATE POLICY "Enable read access for all users" ON public.countries FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow admins to manage countries" ON public.countries;
CREATE POLICY "Allow admins to manage countries" ON public.countries FOR ALL USING ((get_my_claim('role'))::text = '"admin"') WITH CHECK ((get_my_claim('role'))::text = '"admin"');

-- Cities
ALTER TABLE public.cities ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.cities;
CREATE POLICY "Enable read access for all users" ON public.cities FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow admins to manage cities" ON public.cities;
CREATE POLICY "Allow admins to manage cities" ON public.cities FOR ALL USING ((get_my_claim('role'))::text = '"admin"') WITH CHECK ((get_my_claim('role'))::text = '"admin"');

-- User Documents
ALTER TABLE public.user_documents ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can manage their own documents" ON public.user_documents;
CREATE POLICY "Users can manage their own documents" ON public.user_documents FOR ALL USING (user_id = auth.uid());

-- Points History
ALTER TABLE public.points_history ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view their own points history" ON public.points_history;
CREATE POLICY "Users can view their own points history" ON public.points_history FOR SELECT USING (user_id = auth.uid());


-- Triggers
--------------------------------------------------------------------------------
DROP TRIGGER IF EXISTS on_review_change ON public.reviews;
CREATE TRIGGER on_review_change
AFTER INSERT OR UPDATE OR DELETE ON public.reviews
FOR EACH ROW EXECUTE PROCEDURE public.update_activity_rating(COALESCE(NEW.activity_id, OLD.activity_id));
