
-- Drop functions and triggers if they exist, handling dependencies
DROP FUNCTION IF EXISTS public.get_my_claim(text) CASCADE;
DROP FUNCTION IF EXISTS public.on_review_change() CASCADE;
DROP FUNCTION IF EXISTS public.update_activity_rating(uuid) CASCADE;
DROP FUNCTION IF EXISTS public.create_country(text, text, text, text) CASCADE;
DROP FUNCTION IF EXISTS public.update_country(text, text, text, text) CASCADE;
DROP FUNCTION IF EXISTS public.delete_country(text) CASCADE;

-- Drop types if they exist
CREATE OR REPLACE FUNCTION drop_type_if_exists(type_name text) RETURNS void AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_type WHERE typname = type_name) THEN
        EXECUTE 'DROP TYPE ' || type_name || ' CASCADE';
    END IF;
END;
$$ LANGUAGE plpgsql;

SELECT drop_type_if_exists('user_role');
SELECT drop_type_if_exists('activity_status');
SELECT drop_type_if_exists('booking_status');
SELECT drop_type_if_exists('payout_status');
SELECT drop_type_if_exists('referral_status');
SELECT drop_type_if_exists('seat_preference_type');

DROP TABLE IF EXISTS public.activity_types CASCADE;
DROP TABLE IF EXISTS public.activities CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;
DROP TABLE IF EXISTS public.bookings CASCADE;
DROP TABLE IF EXISTS public.reviews CASCADE;
DROP TABLE IF EXISTS public.wishlist_items CASCADE;
DROP TABLE IF EXISTS public.countries CASCADE;
DROP TABLE IF EXISTS public.cities CASCADE;
DROP TABLE IF EXISTS public.partners CASCADE;
DROP TABLE IF EXISTS public.agents CASCADE;
DROP TABLE IF EXISTS public.referrals CASCADE;
DROP TABLE IF EXISTS public.payouts CASCADE;
DROP TABLE IF EXISTS public.points_history CASCADE;
DROP TABLE IF EXISTS public.user_documents CASCADE;
DROP TABLE IF EXISTS public.settings CASCADE;

-- Custom Types
CREATE TYPE public.user_role AS ENUM ('admin', 'partner', 'agent', 'customer');
CREATE TYPE public.activity_status AS ENUM ('pending_approval', 'active', 'inactive', 'rejected');
CREATE TYPE public.booking_status AS ENUM ('confirmed', 'cancelled', 'pending');
CREATE TYPE public.payout_status AS ENUM ('pending', 'paid', 'failed');
CREATE TYPE public.referral_status AS ENUM ('unpaid', 'paid');
CREATE TYPE public.seat_preference_type AS ENUM ('aisle', 'window', 'middle');

-- Securely get user claims
CREATE OR REPLACE FUNCTION public.get_my_claim(claim TEXT)
RETURNS JSONB
LANGUAGE 'sql' STABLE
AS $$
  SELECT COALESCE(current_setting('request.jwt.claims', true)::JSONB ->> claim, '')::JSONB;
$$;


-- Tables
CREATE TABLE public.activity_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.partners (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    company_name TEXT NOT NULL,
    contact_email TEXT,
    website TEXT,
    iban TEXT, -- For payouts
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.agents (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    agency_name TEXT,
    commission_rate NUMERIC(5, 2) NOT NULL DEFAULT 5.00,
    referral_code TEXT UNIQUE NOT NULL,
    paypal_email TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);


CREATE TABLE public.activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    country TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    duration TEXT,
    activitytypeid UUID REFERENCES public.activity_types(id),
    partner_id UUID REFERENCES public.partners(id) ON DELETE SET NULL, -- A partner owns the activity
    rating NUMERIC(3, 2) DEFAULT 0,
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
    created_at TIMESTAMPTZ DEFAULT now()
);


CREATE TABLE public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_reference TEXT UNIQUE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    guest_email TEXT, -- For guest bookings
    guest_name TEXT,
    activity_id UUID REFERENCES public.activities(id) ON DELETE CASCADE,
    booking_date TIMESTAMPTZ NOT NULL,
    status public.booking_status,
    quantity INTEGER NOT NULL DEFAULT 1,
    total_price NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX ON public.bookings(user_id);
CREATE INDEX ON public.bookings(activity_id);


CREATE TABLE public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id),
    activity_id UUID REFERENCES public.activities(id) ON DELETE CASCADE,
    author TEXT,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id, activity_id) -- A user can only review an activity once
);
CREATE INDEX ON public.reviews(activity_id);

CREATE TABLE public.wishlist_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    activity_id UUID REFERENCES public.activities(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id, activity_id)
);

CREATE TABLE public.countries (
    code TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    currency TEXT NOT NULL,
    currency_symbol TEXT NOT NULL
);

CREATE TABLE public.cities (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    country_code TEXT REFERENCES public.countries(code) ON DELETE CASCADE,
    UNIQUE(name, country_code)
);
CREATE INDEX ON public.cities(country_code);

CREATE TABLE public.referrals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
    agent_id UUID REFERENCES public.agents(id) ON DELETE CASCADE,
    commission_amount NUMERIC(10, 2) NOT NULL,
    status public.referral_status NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.payouts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID REFERENCES public.agents(id) ON DELETE CASCADE,
    amount NUMERIC(10, 2) NOT NULL,
    status public.payout_status NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    paid_at TIMESTAMPTZ
);

CREATE TABLE public.points_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    points_change INTEGER NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.user_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    document_type TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.settings (
    id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    key TEXT UNIQUE NOT NULL,
    value JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Policies

-- Activity Types
ALTER TABLE public.activity_types ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow read access for all users" ON public.activity_types;
CREATE POLICY "Allow read access for all users" ON public.activity_types FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow admin to manage" ON public.activity_types;
CREATE POLICY "Allow admin to manage" ON public.activity_types FOR ALL USING ((get_my_claim('role'))::text = '"admin"') WITH CHECK ((get_my_claim('role'))::text = '"admin"');

-- Activities
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow read access for all users" ON public.activities;
CREATE POLICY "Allow read access for all users" ON public.activities FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow users to create their own activities" ON public.activities;
CREATE POLICY "Allow users to create their own activities" ON public.activities FOR INSERT WITH CHECK (
    auth.uid() IS NOT NULL AND (
        (get_my_claim('role'))::text = '"admin"' OR
        ((get_my_claim('role'))::text = '"partner"' AND partner_id = auth.uid())
    )
);

DROP POLICY IF EXISTS "Allow users to update their own activities" ON public.activities;
CREATE POLICY "Allow users to update their own activities" ON public.activities FOR UPDATE USING (
    auth.uid() IS NOT NULL AND (
        (get_my_claim('role'))::text = '"admin"' OR
        ((get_my_claim('role'))::text = '"partner"' AND partner_id = auth.uid())
    )
) WITH CHECK (
    auth.uid() IS NOT NULL AND (
        (get_my_claim('role'))::text = '"admin"' OR
        ((get_my_claim('role'))::text = '"partner"' AND partner_id = auth.uid())
    )
);

DROP POLICY IF EXISTS "Allow admin to delete activities" ON public.activities;
CREATE POLICY "Allow admin to delete activities" ON public.activities FOR DELETE USING ((get_my_claim('role'))::text = '"admin"');

-- Bookings
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow users to view their own bookings" ON public.bookings;
CREATE POLICY "Allow users to view their own bookings" ON public.bookings FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Allow admin and partners to view bookings" ON public.bookings;
CREATE POLICY "Allow admin and partners to view bookings" ON public.bookings FOR SELECT USING (
    (get_my_claim('role'))::text = '"admin"' OR
    (
        (get_my_claim('role'))::text = '"partner"' AND
        activity_id IN (SELECT id FROM public.activities WHERE partner_id = auth.uid())
    )
);

-- Reviews
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow read access for all users" ON public.reviews;
CREATE POLICY "Allow read access for all users" ON public.reviews FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow users to manage their own reviews" ON public.reviews;
CREATE POLICY "Allow users to manage their own reviews" ON public.reviews FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Wishlist
ALTER TABLE public.wishlist_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow users to manage their own wishlist" ON public.wishlist_items;
CREATE POLICY "Allow users to manage their own wishlist" ON public.wishlist_items FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Countries and Cities (public data)
ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow read access for all users" ON public.countries;
CREATE POLICY "Allow read access for all users" ON public.countries FOR SELECT USING (true);

ALTER TABLE public.cities ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow read access for all users" ON public.cities;
CREATE POLICY "Allow read access for all users" ON public.cities FOR SELECT USING (true);

-- Partners
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow partners to view their own profile" ON public.partners;
CREATE POLICY "Allow partners to view their own profile" ON public.partners FOR SELECT USING (auth.uid() = id);
DROP POLICY IF EXISTS "Admins can manage all partner profiles" ON public.partners;
CREATE POLICY "Admins can manage all partner profiles" ON public.partners FOR ALL USING ((get_my_claim('role'))::text = '"admin"');

-- Agents
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow agents to view their own profile" ON public.agents;
CREATE POLICY "Allow agents to view their own profile" ON public.agents FOR SELECT USING (auth.uid() = id);
DROP POLICY IF EXISTS "Admins can manage all agent profiles" ON public.agents;
CREATE POLICY "Admins can manage all agent profiles" ON public.agents FOR ALL USING ((get_my_claim('role'))::text = '"admin"');

-- Referrals
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Agents can view their own referrals" ON public.referrals;
CREATE POLICY "Agents can view their own referrals" ON public.referrals FOR SELECT USING (auth.uid() = agent_id);
DROP POLICY IF EXISTS "Admins can manage all referrals" ON public.referrals;
CREATE POLICY "Admins can manage all referrals" ON public.referrals FOR ALL USING ((get_my_claim('role'))::text = '"admin"');

-- Payouts
ALTER TABLE public.payouts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Agents can view their own payouts" ON public.payouts;
CREATE POLICY "Agents can view their own payouts" ON public.payouts FOR SELECT USING (auth.uid() = agent_id);
DROP POLICY IF EXISTS "Admins can manage all payouts" ON public.payouts;
CREATE POLICY "Admins can manage all payouts" ON public.payouts FOR ALL USING ((get_my_claim('role'))::text = '"admin"');

-- Points History
ALTER TABLE public.points_history ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow users to view their own points history" ON public.points_history;
CREATE POLICY "Allow users to view their own points history" ON public.points_history FOR SELECT USING (auth.uid() = user_id);

-- User Documents
ALTER TABLE public.user_documents ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow users to manage their own documents" ON public.user_documents;
CREATE POLICY "Allow users to manage their own documents" ON public.user_documents FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Settings
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow read access for all users" ON public.settings;
CREATE POLICY "Allow read access for all users" ON public.settings FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow admins to manage settings" ON public.settings;
CREATE POLICY "Allow admins to manage settings" ON public.settings FOR ALL USING ((get_my_claim('role'))::text = '"admin"') WITH CHECK ((get_my_claim('role'))::text = '"admin"');

-- Storage Policies
-- Assumes RLS is enabled on the storage.objects table.
-- Policy for 'excursion-images' bucket
DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;
CREATE POLICY "Allow authenticated uploads" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'excursion-images');
DROP POLICY IF EXISTS "Allow public read access" ON storage.objects;
CREATE POLICY "Allow public read access" ON storage.objects FOR SELECT USING (bucket_id = 'excursion-images');

-- Policy for 'user_documents' bucket
DROP POLICY IF EXISTS "Allow users to manage their own documents" ON storage.objects;
CREATE POLICY "Allow users to manage their own documents"
    ON storage.objects
    FOR ALL
    TO authenticated
    USING (bucket_id = 'user_documents' AND auth.uid()::text = (storage.foldername(name))[1])
    WITH CHECK (bucket_id = 'user_documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Functions and Triggers
CREATE OR REPLACE FUNCTION public.update_activity_rating(p_activity_id UUID)
RETURNS void
LANGUAGE plpgsql
AS $$
DECLARE
    avg_rating NUMERIC;
BEGIN
    SELECT AVG(rating) INTO avg_rating
    FROM public.reviews
    WHERE activity_id = p_activity_id;

    UPDATE public.activities
    SET rating = COALESCE(avg_rating, 0)
    WHERE id = p_activity_id;
END;
$$;


CREATE OR REPLACE FUNCTION public.on_review_change()
    RETURNS TRIGGER
    LANGUAGE plpgsql
AS $$
BEGIN
    -- When a review is inserted, updated, or deleted,
    -- call the function to update the average rating for the corresponding activity.
    PERFORM public.update_activity_rating(COALESCE(NEW.activity_id, OLD.activity_id));
    RETURN NULL; -- result is ignored since this is an AFTER trigger
END;
$$;


CREATE TRIGGER on_review_change
    AFTER INSERT OR UPDATE OR DELETE ON public.reviews
    FOR EACH ROW
    EXECUTE FUNCTION public.on_review_change();
    

CREATE OR REPLACE FUNCTION public.create_country(p_code text, p_name text, p_currency text, p_currency_symbol text)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
    -- Check if country with the given code or name already exists
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = p_code) THEN
        RAISE EXCEPTION 'Country with code % already exists.', p_code;
    END IF;
    IF EXISTS (SELECT 1 FROM public.countries WHERE name = p_name) THEN
        RAISE EXCEPTION 'Country with name % already exists.', p_name;
    END IF;

    -- Insert new country
    INSERT INTO public.countries (code, name, currency, currency_symbol)
    VALUES (p_code, p_name, p_currency, p_currency_symbol);
END;
$$;

CREATE OR REPLACE FUNCTION public.update_country(p_code text, p_name text, p_currency text, p_currency_symbol text)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
    -- Check if another country with the new name already exists
    IF EXISTS (SELECT 1 FROM public.countries WHERE name = p_name AND code != p_code) THEN
        RAISE EXCEPTION 'Another country with name % already exists.', p_name;
    END IF;

    -- Update the country
    UPDATE public.countries
    SET name = p_name,
        currency = p_currency,
        currency_symbol = p_currency_symbol
    WHERE code = p_code;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Country with code % not found.', p_code;
    END IF;
END;
$$;


CREATE OR REPLACE FUNCTION public.delete_country(p_code text)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
    -- Check if there are any cities associated with this country
    IF EXISTS (SELECT 1 FROM public.cities WHERE country_code = p_code) THEN
        RAISE EXCEPTION 'Cannot delete country with code % because it has associated cities. Please delete the cities first.', p_code;
    END IF;

    -- Check if there are any activities associated with this country
    IF EXISTS (SELECT 1 FROM public.activities WHERE country = (SELECT name FROM public.countries WHERE code = p_code)) THEN
        RAISE EXCEPTION 'Cannot delete country with code % because it has associated activities. Please update or delete the activities first.', p_code;
    END IF;

    -- Delete the country
    DELETE FROM public.countries WHERE code = p_code;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Country with code % not found.', p_code;
    END IF;
END;
$$;
