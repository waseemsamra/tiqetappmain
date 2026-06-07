
-- Drop functions and triggers first to avoid dependency issues
DROP TRIGGER IF EXISTS on_review_change ON public.reviews;
DROP FUNCTION IF EXISTS public.handle_review_change();
DROP FUNCTION IF EXISTS public.update_activity_rating(uuid);

-- Function to safely drop a type if it exists
CREATE OR REPLACE FUNCTION drop_type_if_exists(type_name text)
RETURNS void AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_type WHERE typname = type_name) THEN
        EXECUTE 'DROP TYPE ' || quote_ident(type_name) || ' CASCADE';
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Drop existing types if they exist
SELECT drop_type_if_exists('user_role');
SELECT drop_type_if_exists('activity_status');
SELECT drop_type_if_exists('booking_status');
SELECT drop_type_if_exists('referral_status');
SELECT drop_type_if_exists('payout_status');

-- Create custom types
CREATE TYPE user_role AS ENUM ('customer', 'agent', 'partner', 'admin');
CREATE TYPE activity_status AS ENUM ('pending_approval', 'active', 'inactive', 'rejected');
CREATE TYPE booking_status AS ENUM ('confirmed', 'cancelled', 'pending');
CREATE TYPE referral_status AS ENUM ('paid', 'unpaid');
CREATE TYPE payout_status AS ENUM ('pending', 'paid', 'failed');


-- Functions for JWT claims
DROP FUNCTION IF EXISTS get_my_claim(text);
CREATE OR REPLACE FUNCTION get_my_claim(claim TEXT)
RETURNS jsonb
LANGUAGE sql
STABLE
AS $$
  SELECT coalesce(current_setting('request.jwt.claims', true)::jsonb ->> claim, null)::jsonb;
$$;

DROP FUNCTION IF EXISTS get_my_claims();
CREATE OR REPLACE FUNCTION get_my_claims()
RETURNS jsonb
LANGUAGE sql
STABLE
AS $$
  SELECT coalesce(current_setting('request.jwt.claims', true), '{}')::jsonb;
$$;

-- Function to get user role from JWT
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS text AS $$
BEGIN
  RETURN (get_my_claim('role'))::text;
END;
$$ LANGUAGE plpgsql;


-- Tables
CREATE TABLE IF NOT EXISTS public.countries (
    id SERIAL PRIMARY KEY,
    code character(2) NOT NULL UNIQUE,
    name character varying NOT NULL,
    currency character varying NOT NULL,
    currency_symbol character varying NOT NULL
);

CREATE TABLE IF NOT EXISTS public.cities (
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    country_code character(2) NOT NULL REFERENCES public.countries(code) ON DELETE CASCADE,
    UNIQUE(country_code, name)
);

CREATE TABLE IF NOT EXISTS public.activity_types (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    name character varying NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS public.activities (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    name character varying NOT NULL,
    city text NOT NULL,
    country character varying NOT NULL,
    description text NOT NULL,
    price numeric(10,2) NOT NULL,
    rating numeric(3,2) DEFAULT 0.00,
    duration character varying,
    activitytypeid uuid REFERENCES public.activity_types(id),
    images text[] DEFAULT '{}',
    operatinghours text,
    whatsincluded text[] DEFAULT '{}',
    whatsnotincluded text[] DEFAULT '{}',
    instructions text,
    howtogetthere text,
    additionalinfo text,
    cancellationpolicy text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone,
    status activity_status DEFAULT 'pending_approval',
    partner_id uuid REFERENCES auth.users(id)
);

CREATE TABLE IF NOT EXISTS public.reviews (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id),
    activity_id uuid REFERENCES public.activities(id),
    author character varying NOT NULL,
    rating integer NOT NULL,
    comment text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    UNIQUE(user_id, activity_id)
);

CREATE TABLE IF NOT EXISTS public.bookings (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    booking_reference character varying UNIQUE,
    user_id uuid REFERENCES auth.users(id),
    guest_email text,
    guest_name text,
    activity_id uuid REFERENCES public.activities(id),
    booking_date timestamp with time zone NOT NULL,
    status booking_status NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    quantity integer DEFAULT 1,
    total_price numeric(10,2)
);

CREATE TABLE IF NOT EXISTS public.wishlist_items (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES auth.users(id),
    activity_id uuid NOT NULL REFERENCES public.activities(id),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    UNIQUE(user_id, activity_id)
);

CREATE TABLE IF NOT EXISTS public.user_documents (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES auth.users(id),
    document_type text NOT NULL,
    file_name text NOT NULL,
    file_path text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.points_history (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES auth.users(id),
    points_change integer NOT NULL,
    description text,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.partners (
    id uuid NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    company_name character varying NOT NULL,
    contact_email character varying,
    website character varying,
    iban character varying,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.agents (
    id uuid NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    agency_name character varying,
    commission_rate numeric(5,2) NOT NULL,
    referral_code character varying UNIQUE,
    paypal_email character varying,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    sponsor_id uuid REFERENCES auth.users(id)
);

CREATE TABLE IF NOT EXISTS public.referrals (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    booking_id uuid NOT NULL REFERENCES public.bookings(id),
    agent_id uuid NOT NULL REFERENCES public.agents(id),
    commission_amount numeric(10,2) NOT NULL,
    status referral_status DEFAULT 'unpaid' NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.payouts (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    agent_id uuid NOT NULL REFERENCES public.agents(id),
    amount numeric(10,2) NOT NULL,
    status payout_status NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    paid_at timestamp with time zone
);

CREATE TABLE IF NOT EXISTS public.settings (
    id SERIAL PRIMARY KEY,
    key character varying NOT NULL UNIQUE,
    value text
);

-- Policies
ALTER TABLE public.activity_types ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access" ON public.activity_types;
CREATE POLICY "Allow public read access" ON public.activity_types FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow admin to manage" ON public.activity_types;
CREATE POLICY "Allow admin to manage" ON public.activity_types FOR ALL USING (get_user_role() = '"admin"') WITH CHECK (get_user_role() = '"admin"');

ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access for active excursions" ON public.activities;
CREATE POLICY "Allow public read access for active excursions" ON public.activities FOR SELECT USING (status = 'active');
DROP POLICY IF EXISTS "Allow users to create their own activities" ON public.activities;
CREATE POLICY "Allow users to create their own activities" ON public.activities FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
DROP POLICY IF EXISTS "Allow users to update their own activities" ON public.activities;
CREATE POLICY "Allow users to update their own activities" ON public.activities FOR UPDATE USING (auth.uid() = partner_id);
DROP POLICY IF EXISTS "Allow admin to delete activities" ON public.activities;
CREATE POLICY "Allow admin to delete activities" ON public.activities FOR DELETE USING (get_user_role() = '"admin"');

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access" ON public.reviews;
CREATE POLICY "Allow public read access" ON public.reviews FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow users to submit reviews" ON public.reviews;
CREATE POLICY "Allow users to submit reviews" ON public.reviews FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow users to see their own bookings" ON public.bookings;
CREATE POLICY "Allow users to see their own bookings" ON public.bookings FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Allow admin and partners to view bookings" ON public.bookings;
CREATE POLICY "Allow admin and partners to view bookings" ON public.bookings FOR SELECT USING (get_user_role() = '"admin"' OR auth.uid() IN ( SELECT partner_id FROM activities WHERE id = activity_id ));

ALTER TABLE public.wishlist_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable read access for own wishlist items" ON public.wishlist_items;
CREATE POLICY "Enable read access for own wishlist items" ON public.wishlist_items
  FOR SELECT USING (auth.uid() = user_id AND (SELECT status FROM activities WHERE id = activity_id) = 'active');
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.wishlist_items;
CREATE POLICY "Enable insert for authenticated users" ON public.wishlist_items FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Enable delete for users to remove their own items" ON public.wishlist_items;
CREATE POLICY "Enable delete for users to remove their own items" ON public.wishlist_items FOR DELETE USING (auth.uid() = user_id);

ALTER TABLE public.user_documents ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow users to manage their own documents" ON public.user_documents;
CREATE POLICY "Allow users to manage their own documents" ON public.user_documents FOR ALL USING (auth.uid() = user_id);

ALTER TABLE public.points_history ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow users to see their own points history" ON public.points_history;
CREATE POLICY "Allow users to see their own points history" ON public.points_history FOR SELECT USING (auth.uid() = user_id);

ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow partners to view their own profile" ON public.partners;
CREATE POLICY "Allow partners to view their own profile" ON public.partners FOR SELECT USING (auth.uid() = id);
DROP POLICY IF EXISTS "Admins can manage all partner profiles" ON public.partners;
CREATE POLICY "Admins can manage all partner profiles" ON public.partners FOR ALL USING (get_user_role() = '"admin"');

ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow agents to view their own profile" ON public.agents;
CREATE POLICY "Allow agents to view their own profile" ON public.agents FOR SELECT USING (auth.uid() = id);
DROP POLICY IF EXISTS "Admins can manage all agent profiles" ON public.agents;
CREATE POLICY "Admins can manage all agent profiles" ON public.agents FOR ALL USING (get_user_role() = '"admin"');

ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow agents to see their own referrals" ON public.referrals;
CREATE POLICY "Allow agents to see their own referrals" ON public.referrals FOR SELECT USING (auth.uid() = agent_id);
DROP POLICY IF EXISTS "Admins can manage all referrals" ON public.referrals;
CREATE POLICY "Admins can manage all referrals" ON public.referrals FOR ALL USING (get_user_role() = '"admin"');

ALTER TABLE public.payouts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow agents to see their own payouts" ON public.payouts;
CREATE POLICY "Allow agents to see their own payouts" ON public.payouts FOR SELECT USING (auth.uid() = agent_id);
DROP POLICY IF EXISTS "Admins can manage all payouts" ON public.payouts;
CREATE POLICY "Admins can manage all payouts" ON public.payouts FOR ALL USING (get_user_role() = '"admin"');

ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow admins to manage settings" ON public.settings;
CREATE POLICY "Allow admins to manage settings" ON public.settings FOR ALL USING (get_user_role() = '"admin"');


-- Trigger for updating average ratings
CREATE OR REPLACE FUNCTION public.update_activity_rating(p_activity_id uuid)
RETURNS void
LANGUAGE plpgsql
AS $$
DECLARE
  avg_rating numeric;
BEGIN
  SELECT AVG(rating) INTO avg_rating FROM public.reviews WHERE activity_id = p_activity_id;
  UPDATE public.activities SET rating = avg_rating WHERE id = p_activity_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_review_change()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  PERFORM public.update_activity_rating(COALESCE(NEW.activity_id, OLD.activity_id));
  RETURN NULL;
END;
$$;

CREATE TRIGGER on_review_change
AFTER INSERT OR UPDATE OR DELETE ON public.reviews
FOR EACH ROW EXECUTE PROCEDURE public.handle_review_change();


-- Functions for location management
CREATE OR REPLACE FUNCTION public.create_country(p_code character, p_name character varying, p_currency character varying, p_currency_symbol character varying)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  IF EXISTS (SELECT 1 FROM public.countries WHERE code = p_code) THEN
    RAISE EXCEPTION 'Country with code % already exists.', p_code;
  END IF;
  INSERT INTO public.countries (code, name, currency, currency_symbol) VALUES (p_code, p_name, p_currency, p_currency_symbol);
END;
$$;

CREATE OR REPLACE FUNCTION public.update_country(p_code character, p_name character varying, p_currency character varying, p_currency_symbol character varying)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE public.countries
  SET name = p_name, currency = p_currency, currency_symbol = p_currency_symbol
  WHERE code = p_code;
END;
$$;

CREATE OR REPLACE FUNCTION public.delete_country(p_code character)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  DELETE FROM public.countries WHERE code = p_code;
END;
$$;
