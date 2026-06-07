
-- Drop existing types and functions if they exist to ensure a clean slate
DROP FUNCTION IF EXISTS public.drop_type_if_exists(text) CASCADE;
CREATE OR REPLACE FUNCTION public.drop_type_if_exists(type_name text)
RETURNS void AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_type WHERE typname = type_name) THEN
        EXECUTE 'DROP TYPE ' || type_name || ' CASCADE';
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Drop dependent objects first
DROP FUNCTION IF EXISTS get_my_claim(text) CASCADE;
DROP FUNCTION IF EXISTS on_review_change() CASCADE;
DROP FUNCTION IF EXISTS update_activity_rating(p_activity_id uuid) CASCADE;


-- Create custom types
SELECT public.drop_type_if_exists('activity_status');
CREATE TYPE public.activity_status AS ENUM ('pending_approval', 'active', 'rejected', 'inactive');

SELECT public.drop_type_if_exists('booking_status');
CREATE TYPE public.booking_status AS ENUM ('confirmed', 'cancelled', 'pending');

SELECT public.drop_type_if_exists('user_role');
CREATE TYPE public.user_role AS ENUM ('customer', 'admin', 'partner', 'agent');

SELECT public.drop_type_if_exists('payout_status');
CREATE TYPE public.payout_status AS ENUM ('pending', 'paid', 'failed');

SELECT public.drop_type_if_exists('referral_status');
CREATE TYPE public.referral_status AS ENUM ('unpaid', 'paid');


-- Create tables
CREATE TABLE IF NOT EXISTS public.activity_types (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    name text NOT NULL UNIQUE,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.activities (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    name text NOT NULL,
    city text NOT NULL,
    country text NOT NULL,
    description text,
    price numeric(10,2) DEFAULT 0.00 NOT NULL,
    duration text,
    activitytypeid uuid REFERENCES public.activity_types(id),
    partner_id uuid REFERENCES auth.users(id),
    rating numeric(3,2) DEFAULT 0.00 NOT NULL,
    images text[],
    discount numeric(5,2),
    operatinghours text,
    whatsincluded text[],
    whatsnotincluded text[],
    instructions text,
    howtogetthere text,
    additionalinfo text,
    cancellationpolicy text,
    status activity_status DEFAULT 'pending_approval'::public.activity_status,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone
);

CREATE TABLE IF NOT EXISTS public.bookings (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id),
    guest_email text,
    guest_name text,
    activity_id uuid REFERENCES public.activities(id),
    booking_date timestamp with time zone NOT NULL,
    status booking_status DEFAULT 'pending'::public.booking_status,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    quantity integer DEFAULT 1 NOT NULL,
    total_price numeric(10,2),
    booking_reference text UNIQUE
);

CREATE TABLE IF NOT EXISTS public.reviews (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    activity_id uuid NOT NULL REFERENCES public.activities(id) ON DELETE CASCADE,
    user_id uuid NOT NULL REFERENCES auth.users(id),
    rating integer NOT NULL,
    comment text,
    author text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    UNIQUE(activity_id, user_id)
);

CREATE TABLE IF NOT EXISTS public.wishlist_items (
    user_id uuid NOT NULL REFERENCES auth.users(id),
    activity_id uuid NOT NULL REFERENCES public.activities(id) ON DELETE CASCADE,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    PRIMARY KEY (user_id, activity_id)
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
    commission_rate numeric(5,2) DEFAULT 5.0 NOT NULL,
    referral_code text NOT NULL UNIQUE,
    paypal_email text,
    sponsor_id uuid REFERENCES public.agents(id),
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.referrals (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    booking_id uuid NOT NULL REFERENCES public.bookings(id),
    agent_id uuid NOT NULL REFERENCES public.agents(id),
    commission_amount numeric(10,2) NOT NULL,
    status referral_status DEFAULT 'unpaid'::public.referral_status,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.payouts (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    agent_id uuid NOT NULL REFERENCES public.agents(id),
    amount numeric(10,2) NOT NULL,
    status payout_status DEFAULT 'pending'::public.payout_status,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    paid_at timestamp with time zone
);

CREATE TABLE IF NOT EXISTS public.points_history (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES auth.users(id),
    points_change integer NOT NULL,
    description text,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.settings (
    id bigint NOT NULL PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    key text NOT NULL UNIQUE,
    value text,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.user_documents (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    document_type text NOT NULL,
    file_name text NOT NULL,
    file_path text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.countries (
    code text NOT NULL PRIMARY KEY,
    name text NOT NULL UNIQUE,
    currency text,
    currency_symbol text
);

CREATE TABLE IF NOT EXISTS public.cities (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    name text NOT NULL,
    country_code text NOT NULL REFERENCES public.countries(code) ON DELETE CASCADE,
    UNIQUE(country_code, name)
);

-- Functions
CREATE OR REPLACE FUNCTION public.get_my_claim(claim text)
RETURNS jsonb
LANGUAGE sql STABLE
AS $$
  SELECT coalesce(current_setting('request.jwt.claims', true)::jsonb ->> claim, null)::jsonb;
$$;


CREATE OR REPLACE FUNCTION public.update_activity_rating(p_activity_id uuid)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE activities
    SET rating = (
        SELECT AVG(r.rating)
        FROM reviews r
        WHERE r.activity_id = p_activity_id
    )
    WHERE id = p_activity_id;
END;
$$;


CREATE OR REPLACE FUNCTION on_review_change()
RETURNS TRIGGER AS $$
BEGIN
    -- When a review is inserted, updated, or deleted, update the average rating for the activity.
    PERFORM public.update_activity_rating(COALESCE(NEW.activity_id, OLD.activity_id));
    RETURN NULL; -- result is ignored since this is an AFTER trigger
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION public.create_country(p_code text, p_name text, p_currency text, p_currency_symbol text)
RETURNS void AS $$
BEGIN
  IF EXISTS (SELECT 1 FROM countries WHERE code = p_code) THEN
    RAISE EXCEPTION 'Country with code % already exists.', p_code;
  END IF;
  IF EXISTS (SELECT 1 FROM countries WHERE name = p_name) THEN
    RAISE EXCEPTION 'Country with name % already exists.', p_name;
  END IF;
  INSERT INTO countries (code, name, currency, currency_symbol)
  VALUES (p_code, p_name, p_currency, p_currency_symbol);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.update_country(p_code text, p_name text, p_currency text, p_currency_symbol text)
RETURNS void AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM countries WHERE code = p_code) THEN
    RAISE EXCEPTION 'Country with code % not found.', p_code;
  END IF;
  IF EXISTS (SELECT 1 FROM countries WHERE name = p_name AND code != p_code) THEN
    RAISE EXCEPTION 'Another country with name % already exists.', p_name;
  END IF;
  UPDATE countries
  SET name = p_name, currency = p_currency, currency_symbol = p_currency_symbol
  WHERE code = p_code;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.delete_country(p_code text)
RETURNS void AS $$
BEGIN
  IF EXISTS (SELECT 1 FROM activities WHERE country = (SELECT name FROM countries WHERE code = p_code)) THEN
    RAISE EXCEPTION 'Cannot delete country because it is referenced by existing activities.';
  END IF;
  DELETE FROM countries WHERE code = p_code;
END;
$$ LANGUAGE plpgsql;


-- Triggers
DROP TRIGGER IF EXISTS trigger_on_review_change ON public.reviews;
CREATE TRIGGER trigger_on_review_change
AFTER INSERT OR UPDATE OR DELETE ON public.reviews
FOR EACH ROW EXECUTE FUNCTION on_review_change();


-- Policies for activity_types
DROP POLICY IF EXISTS "Enable read access for all users" ON public.activity_types;
CREATE POLICY "Enable read access for all users" ON public.activity_types FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow admin to manage" ON public.activity_types;
CREATE POLICY "Allow admin to manage" ON public.activity_types FOR ALL USING ((get_my_claim('role'))::text = '"admin"') WITH CHECK ((get_my_claim('role'))::text = '"admin"');

-- Policies for activities
DROP POLICY IF EXISTS "Enable read access for all users" ON public.activities;
CREATE POLICY "Enable read access for all users" ON public.activities FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow users to create their own activities" ON public.activities;
CREATE POLICY "Allow users to create their own activities" ON public.activities FOR INSERT WITH CHECK (((get_my_claim('role'))::text = '"admin"') OR ((get_my_claim('role'))::text = '"partner"'));

DROP POLICY IF EXISTS "Allow users to update their own activities" ON public.activities;
CREATE POLICY "Allow users to update their own activities" ON public.activities FOR UPDATE USING (((get_my_claim('role'))::text = '"admin"') OR (partner_id = (SELECT auth.uid()))) WITH CHECK (((get_my_claim('role'))::text = '"admin"') OR (partner_id = (SELECT auth.uid())));

DROP POLICY IF EXISTS "Allow admin to delete activities" ON public.activities;
CREATE POLICY "Allow admin to delete activities" ON public.activities FOR DELETE USING ((get_my_claim('role'))::text = '"admin"');

-- Policies for bookings
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON public.bookings;
CREATE POLICY "Enable read access for authenticated users" ON public.bookings FOR SELECT USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow users to create their own bookings" ON public.bookings;
CREATE POLICY "Allow users to create their own bookings" ON public.bookings FOR INSERT WITH CHECK (user_id = auth.uid() OR guest_email IS NOT NULL);

DROP POLICY IF EXISTS "Allow users to view their own bookings" ON public.bookings;
CREATE POLICY "Allow users to view their own bookings" ON public.bookings FOR SELECT USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Allow admin and partners to view bookings" ON public.bookings;
CREATE POLICY "Allow admin and partners to view bookings" ON public.bookings FOR SELECT USING (((get_my_claim('role'))::text = '"admin"') OR ((get_my_claim('role'))::text = '"partner"'));

-- Policies for partners
DROP POLICY IF EXISTS "Enable read access for all users" ON public.partners;
CREATE POLICY "Enable read access for all users" ON public.partners FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage all partner profiles" ON public.partners;
CREATE POLICY "Admins can manage all partner profiles" ON public.partners FOR ALL USING ((get_my_claim('role'))::text = '"admin"') WITH CHECK ((get_my_claim('role'))::text = '"admin"');

DROP POLICY IF EXISTS "Partners can view and update their own profile" ON public.partners;
CREATE POLICY "Partners can view and update their own profile" ON public.partners FOR ALL USING (id = auth.uid()) WITH CHECK (id = auth.uid());

-- Policies for agents
DROP POLICY IF EXISTS "Enable read access for all users" ON public.agents;
CREATE POLICY "Enable read access for all users" ON public.agents FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage all agent profiles" ON public.agents;
CREATE POLICY "Admins can manage all agent profiles" ON public.agents FOR ALL USING ((get_my_claim('role'))::text = '"admin"') WITH CHECK ((get_my_claim('role'))::text = '"admin"');

DROP POLICY IF EXISTS "Agents can view and update their own profile" ON public.agents;
CREATE POLICY "Agents can view and update their own profile" ON public.agents FOR ALL USING (id = auth.uid()) WITH CHECK (id = auth.uid());

-- Policies for referrals
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON public.referrals;
CREATE POLICY "Enable read access for authenticated users" ON public.referrals FOR SELECT USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can manage all referrals" ON public.referrals;
CREATE POLICY "Admins can manage all referrals" ON public.referrals FOR ALL USING ((get_my_claim('role'))::text = '"admin"') WITH CHECK ((get_my_claim('role'))::text = '"admin"');

DROP POLICY IF EXISTS "Agents can view their own referrals" ON public.referrals;
CREATE POLICY "Agents can view their own referrals" ON public.referrals FOR SELECT USING (agent_id = auth.uid());

-- Policies for payouts
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON public.payouts;
CREATE POLICY "Enable read access for authenticated users" ON public.payouts FOR SELECT USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can manage all payouts" ON public.payouts;
CREATE POLICY "Admins can manage all payouts" ON public.payouts FOR ALL USING ((get_my_claim('role'))::text = '"admin"') WITH CHECK ((get_my_claim('role'))::text = '"admin"');

DROP POLICY IF EXISTS "Agents can view their own payouts" ON public.payouts;
CREATE POLICY "Agents can view their own payouts" ON public.payouts FOR SELECT USING (agent_id = auth.uid());

-- Policies for points_history
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON public.points_history;
CREATE POLICY "Enable read access for authenticated users" ON public.points_history FOR SELECT USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can view their own points history" ON public.points_history;
CREATE POLICY "Users can view their own points history" ON public.points_history FOR SELECT USING (user_id = auth.uid());

-- Policies for settings
DROP POLICY IF EXISTS "Enable read access for all users" ON public.settings;
CREATE POLICY "Enable read access for all users" ON public.settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow admins to manage settings" ON public.settings;
CREATE POLICY "Allow admins to manage settings" ON public.settings FOR ALL USING (((get_my_claim('role'))::text = '"admin"')) WITH CHECK (((get_my_claim('role'))::text = '"admin"'));

-- Policies for user_documents
DROP POLICY IF EXISTS "Allow users to manage their own documents" ON public.user_documents;
CREATE POLICY "Allow users to manage their own documents" ON public.user_documents FOR ALL USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- Policies for countries
DROP POLICY IF EXISTS "Enable read access for all users" ON public.countries;
CREATE POLICY "Enable read access for all users" ON public.countries FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow admin to manage countries" ON public.countries;
CREATE POLICY "Allow admin to manage countries" ON public.countries FOR ALL USING ((get_my_claim('role'))::text = '"admin"') WITH CHECK ((get_my_claim('role'))::text = '"admin"');

-- Policies for cities
DROP POLICY IF EXISTS "Enable read access for all users" ON public.cities;
CREATE POLICY "Enable read access for all users" ON public.cities FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow admin to manage cities" ON public.cities;
CREATE POLICY "Allow admin to manage cities" ON public.cities FOR ALL USING ((get_my_claim('role'))::text = '"admin"') WITH CHECK ((get_my_claim('role'))::text = '"admin"');

-- Enable RLS for all tables
ALTER TABLE public.activity_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.points_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cities ENABLE ROW LEVEL SECURITY;
