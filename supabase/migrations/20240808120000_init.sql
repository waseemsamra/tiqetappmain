
-- Helper function to drop a type if it exists, since `DROP TYPE IF EXISTS` doesn't handle dependencies.
-- This function attempts to drop the type and catches the exception if it fails.
CREATE OR REPLACE FUNCTION drop_type_if_exists(type_name text)
RETURNS void AS $$
BEGIN
  EXECUTE 'DROP TYPE ' || type_name;
EXCEPTION
  WHEN undefined_object THEN
    -- Type did not exist, which is fine.
    NULL;
  WHEN dependent_objects_still_exist THEN
    -- This is more complex, for this script we assume CASCADE will handle it.
    -- A more robust solution might log this, but for our case, this is okay.
    EXECUTE 'DROP TYPE ' || type_name || ' CASCADE';
END;
$$ LANGUAGE plpgsql;

-- Drop types in reverse order of dependency, if they exist
SELECT drop_type_if_exists('public.user_role');
SELECT drop_type_if_exists('public.booking_status');
SELECT drop_type_if_exists('public.activity_status');
SELECT drop_type_if_exists('public.payout_status');
SELECT drop_type_if_exists('public.referral_status');


-- Create custom enum types
CREATE TYPE public.user_role AS ENUM ('customer', 'agent', 'partner', 'admin');
CREATE TYPE public.booking_status AS ENUM ('pending', 'confirmed', 'cancelled');
CREATE TYPE public.activity_status AS ENUM ('pending_approval', 'active', 'inactive', 'rejected');
CREATE TYPE public.payout_status AS ENUM ('pending', 'paid', 'failed');
CREATE TYPE public.referral_status AS ENUM ('unpaid', 'paid');

-- Create tables with IF NOT EXISTS
CREATE TABLE IF NOT EXISTS public.countries (
    id SERIAL PRIMARY KEY,
    code character varying(2) NOT NULL UNIQUE,
    name character varying(255) NOT NULL UNIQUE,
    currency character varying(10) NOT NULL,
    currency_symbol character varying(5) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.cities (
    id SERIAL PRIMARY KEY,
    name character varying(255) NOT NULL,
    country_code character varying(2) NOT NULL REFERENCES public.countries(code) ON DELETE CASCADE,
    UNIQUE (name, country_code)
);

CREATE TABLE IF NOT EXISTS public.activity_types (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    name character varying(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS public.partners (
    id uuid NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    company_name text NOT NULL,
    contact_email text,
    website text,
    iban text,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.agents (
    id uuid NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    agency_name text,
    commission_rate real DEFAULT 5.0 NOT NULL,
    referral_code text UNIQUE,
    paypal_email text,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.activities (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    name text NOT NULL,
    city text,
    country text,
    description text,
    price numeric(10,2) DEFAULT 0.00 NOT NULL,
    duration text,
    operatinghours text,
    whatsincluded text[],
    whatsnotincluded text[],
    images text[],
    rating numeric(2,1) DEFAULT 0.0,
    activitytypeid uuid REFERENCES public.activity_types(id),
    status public.activity_status DEFAULT 'pending_approval'::public.activity_status,
    created_at timestamp with time zone DEFAULT now(),
    partner_id uuid REFERENCES public.partners(id) ON DELETE SET NULL,
    instructions text,
    howtogetthere text,
    additionalinfo text,
    cancellationpolicy text,
    discount numeric(5,2)
);

CREATE TABLE IF NOT EXISTS public.bookings (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id),
    activity_id uuid REFERENCES public.activities(id),
    booking_date timestamp with time zone NOT NULL,
    status public.booking_status,
    created_at timestamp with time zone DEFAULT now(),
    quantity integer DEFAULT 1,
    total_price numeric(10,2),
    booking_reference text UNIQUE,
    guest_email text,
    guest_name text
);

CREATE TABLE IF NOT EXISTS public.reviews (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES auth.users(id),
    activity_id uuid NOT NULL REFERENCES public.activities(id),
    rating integer NOT NULL,
    comment text,
    created_at timestamp with time zone DEFAULT now(),
    author text,
    UNIQUE (user_id, activity_id)
);

CREATE TABLE IF NOT EXISTS public.wishlist_items (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES auth.users(id),
    activity_id uuid NOT NULL REFERENCES public.activities(id),
    created_at timestamp with time zone DEFAULT now(),
    UNIQUE (user_id, activity_id)
);

CREATE TABLE IF NOT EXISTS public.user_documents (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    document_type text NOT NULL,
    file_name text NOT NULL,
    file_path text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.referrals (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    booking_id uuid NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
    agent_id uuid NOT NULL REFERENCES public.agents(id) ON DELETE CASCADE,
    commission_amount numeric(10,2) NOT NULL,
    status public.referral_status DEFAULT 'unpaid'::public.referral_status,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.payouts (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    agent_id uuid NOT NULL REFERENCES public.agents(id) ON DELETE CASCADE,
    amount numeric(10,2) NOT NULL,
    status public.payout_status DEFAULT 'pending'::public.payout_status,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    paid_at timestamp with time zone
);

CREATE TABLE IF NOT EXISTS public.points_history (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    points_change integer NOT NULL,
    description text,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.settings (
    id SERIAL PRIMARY KEY,
    key character varying(255) NOT NULL UNIQUE,
    value text
);


-- Securely get claims from JWT
DROP FUNCTION IF EXISTS public.get_my_claim(text);
CREATE OR REPLACE FUNCTION public.get_my_claim(claim text)
RETURNS jsonb
LANGUAGE sql STABLE
AS $$
  select nullif(current_setting('request.jwt.claims', true), '')::jsonb -> claim
$$;


-- update_activity_rating function
DROP FUNCTION IF EXISTS public.update_activity_rating(uuid) CASCADE;
CREATE OR REPLACE FUNCTION public.update_activity_rating(p_activity_id uuid)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE public.activities
    SET rating = (SELECT AVG(r.rating) FROM public.reviews r WHERE r.activity_id = p_activity_id)
    WHERE id = p_activity_id;
END;
$$;


-- Trigger to update rating when a review is added/changed
DROP TRIGGER IF EXISTS on_review_change ON public.reviews;
CREATE TRIGGER on_review_change
AFTER INSERT OR UPDATE OR DELETE ON public.reviews
FOR EACH ROW
EXECUTE FUNCTION public.update_activity_rating(COALESCE(NEW.activity_id, OLD.activity_id));


-- Country and City Management Functions
DROP FUNCTION IF EXISTS public.create_country(text, text, text, text);
CREATE OR REPLACE FUNCTION public.create_country(p_code text, p_name text, p_currency text, p_currency_symbol text)
RETURNS void AS $$
BEGIN
  INSERT INTO public.countries (code, name, currency, currency_symbol)
  VALUES (p_code, p_name, p_currency, p_currency_symbol);
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS public.update_country(text, text, text, text);
CREATE OR REPLACE FUNCTION public.update_country(p_code text, p_name text, p_currency text, p_currency_symbol text)
RETURNS void AS $$
BEGIN
  UPDATE public.countries
  SET name = p_name, currency = p_currency, currency_symbol = p_currency_symbol
  WHERE code = p_code;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS public.delete_country(text);
CREATE OR REPLACE FUNCTION public.delete_country(p_code text)
RETURNS void AS $$
BEGIN
  DELETE FROM public.countries WHERE code = p_code;
END;
$$ LANGUAGE plpgsql;

-- Enable RLS
ALTER TABLE public.activity_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.points_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Drop Existing Policies before creating new ones
DROP POLICY IF EXISTS "Allow admin to manage" ON public.activity_types;
DROP POLICY IF EXISTS "Allow read access for all users" ON public.activity_types;
DROP POLICY IF EXISTS "Allow users to create their own activities" ON public.activities;
DROP POLICY IF EXISTS "Allow users to update their own activities" ON public.activities;
DROP POLICY IF EXISTS "Allow admin to delete activities" ON public.activities;
DROP POLICY IF EXISTS "Allow read access to active excursions" ON public.activities;
DROP POLICY IF EXISTS "Allow read access for all users" ON public.bookings;
DROP POLICY IF EXISTS "Allow admin and partners to view bookings" ON public.bookings;
DROP POLICY IF EXISTS "Allow read access for all users" ON public.reviews;
DROP POLICY IF EXISTS "Allow users to create their own reviews" ON public.reviews;
DROP POLICY IF EXISTS "Allow users to manage their own wishlist" ON public.wishlist_items;
DROP POLICY IF EXISTS "Allow users to manage their own documents" ON public.user_documents;
DROP POLICY IF EXISTS "Partners can manage their own profile" ON public.partners;
DROP POLICY IF EXISTS "Admins can manage all partner profiles" ON public.partners;
DROP POLICY IF EXISTS "Agents can manage their own profile" ON public.agents;
DROP POLICY IF EXISTS "Admins can manage all agent profiles" ON public.agents;
DROP POLICY IF EXISTS "Agents can see their own referrals" ON public.referrals;
DROP POLICY IF EXISTS "Admins can manage all referrals" ON public.referrals;
DROP POLICY IF EXISTS "Agents can see their own payouts" ON public.payouts;
DROP POLICY IF EXISTS "Admins can manage all payouts" ON public.payouts;
DROP POLICY IF EXISTS "Users can view their own points history" ON public.points_history;
DROP POLICY IF EXISTS "Admins can view all points history" ON public.points_history;
DROP POLICY IF EXISTS "Allow admins to manage settings" ON public.settings;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.settings;

-- RLS Policies
CREATE POLICY "Allow admin to manage" ON public.activity_types FOR ALL USING ((get_my_claim('role'))::text = '"admin"') WITH CHECK ((get_my_claim('role'))::text = '"admin"');
CREATE POLICY "Allow read access for all users" ON public.activity_types FOR SELECT USING (true);

CREATE POLICY "Allow users to create their own activities" ON public.activities FOR INSERT WITH CHECK ((get_my_claim('role'))::text IN ('"admin"', '"partner"'));
CREATE POLICY "Allow users to update their own activities" ON public.activities FOR UPDATE USING ((get_my_claim('role'))::text = '"admin"' OR (auth.uid() = partner_id));
CREATE POLICY "Allow admin to delete activities" ON public.activities FOR DELETE USING ((get_my_claim('role'))::text = '"admin"');
CREATE POLICY "Allow read access to active excursions" ON public.activities FOR SELECT USING (status = 'active');

CREATE POLICY "Allow read access for all users" ON public.bookings FOR SELECT USING (auth.uid() = user_id OR guest_email = auth.jwt()->>'email');
CREATE POLICY "Allow admin and partners to view bookings" ON public.bookings FOR SELECT USING ((get_my_claim('role'))::text = '"admin"' OR auth.uid() IN (SELECT partner_id FROM activities WHERE id = activity_id));

CREATE POLICY "Allow read access for all users" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Allow users to create their own reviews" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow users to manage their own wishlist" ON public.wishlist_items FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Allow users to manage their own documents" ON public.user_documents FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Partners can manage their own profile" ON public.partners FOR ALL USING (auth.uid() = id);
CREATE POLICY "Admins can manage all partner profiles" ON public.partners FOR ALL USING ((get_my_claim('role'))::text = '"admin"');

CREATE POLICY "Agents can manage their own profile" ON public.agents FOR ALL USING (auth.uid() = id);
CREATE POLICY "Admins can manage all agent profiles" ON public.agents FOR ALL USING ((get_my_claim('role'))::text = '"admin"');

CREATE POLICY "Agents can see their own referrals" ON public.referrals FOR SELECT USING (auth.uid() = agent_id);
CREATE POLICY "Admins can manage all referrals" ON public.referrals FOR ALL USING ((get_my_claim('role'))::text = '"admin"');

CREATE POLICY "Agents can see their own payouts" ON public.payouts FOR SELECT USING (auth.uid() = agent_id);
CREATE POLICY "Admins can manage all payouts" ON public.payouts FOR ALL USING ((get_my_claim('role'))::text = '"admin"');

CREATE POLICY "Users can view their own points history" ON public.points_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all points history" ON public.points_history FOR SELECT USING ((get_my_claim('role'))::text = '"admin"');

CREATE POLICY "Allow admins to manage settings" ON public.settings FOR ALL USING ((get_my_claim('role'))::text = '"admin"');
CREATE POLICY "Enable read access for all users" ON public.settings FOR SELECT USING (true);
