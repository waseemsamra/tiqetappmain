
-- Helper function to drop a type if it exists.
CREATE OR REPLACE FUNCTION drop_type_if_exists(type_name TEXT)
RETURNS VOID AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_type WHERE typname = type_name) THEN
        EXECUTE 'DROP TYPE ' || quote_ident(type_name) || ' CASCADE';
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Drop and re-create custom types to ensure a clean slate.
SELECT drop_type_if_exists('role');
SELECT drop_type_if_exists('booking_status');
SELECT drop_type_if_exists('activity_status');
SELECT drop_type_if_exists('referral_status');
SELECT drop_type_if_exists('payout_status');

CREATE TYPE role AS ENUM ('customer', 'agent', 'partner', 'admin');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled');
CREATE TYPE activity_status AS ENUM ('pending_approval', 'active', 'inactive', 'rejected');
CREATE TYPE referral_status AS ENUM ('unpaid', 'paid', 'voided');
CREATE TYPE payout_status AS ENUM ('pending', 'paid', 'failed');


-- Create tables with "IF NOT EXISTS" to prevent errors on re-run.
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
    commission_rate real NOT NULL DEFAULT 5.0,
    referral_code text NOT NULL UNIQUE,
    paypal_email text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    sponsor_id uuid REFERENCES public.agents(id)
);

CREATE TABLE IF NOT EXISTS public.activity_types (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    name text NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS public.activities (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    name text NOT NULL,
    city text NOT NULL,
    country text NOT NULL,
    description text,
    price real DEFAULT 0 NOT NULL,
    duration text,
    activitytypeid uuid REFERENCES public.activity_types(id),
    partner_id uuid REFERENCES public.partners(id),
    rating real DEFAULT 0 NOT NULL,
    images text[],
    operatinghours text,
    whatsincluded text[],
    whatsnotincluded text[],
    instructions text,
    howtogetthere text,
    additionalinfo text,
    cancellationpolicy text,
    status activity_status DEFAULT 'pending_approval'::activity_status,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.bookings (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id),
    activity_id uuid NOT NULL REFERENCES public.activities(id),
    booking_date timestamp with time zone NOT NULL,
    status booking_status NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    booking_reference text UNIQUE NOT NULL,
    quantity integer NOT NULL DEFAULT 1,
    total_price real NOT NULL DEFAULT 0,
    guest_email text,
    guest_name text
);

CREATE TABLE IF NOT EXISTS public.referrals (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    booking_id uuid NOT NULL REFERENCES public.bookings(id),
    agent_id uuid NOT NULL REFERENCES public.agents(id),
    commission_amount real NOT NULL,
    status referral_status NOT NULL DEFAULT 'unpaid'::referral_status,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.payouts (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    agent_id uuid NOT NULL REFERENCES public.agents(id),
    amount real NOT NULL,
    status payout_status NOT NULL DEFAULT 'pending'::payout_status,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    paid_at timestamp with time zone
);

CREATE TABLE IF NOT EXISTS public.reviews (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id),
    activity_id uuid NOT NULL REFERENCES public.activities(id),
    rating integer NOT NULL,
    comment text,
    author text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    UNIQUE (user_id, activity_id)
);

CREATE TABLE IF NOT EXISTS public.points_history (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES auth.users(id),
    points_change integer NOT NULL,
    description text,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.wishlist_items (
    user_id uuid NOT NULL REFERENCES auth.users(id),
    activity_id uuid NOT NULL REFERENCES public.activities(id),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    PRIMARY KEY (user_id, activity_id)
);

CREATE TABLE IF NOT EXISTS public.settings (
    id bigint NOT NULL,
    key text NOT NULL UNIQUE,
    value text,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.user_documents (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES auth.users(id),
    document_type text NOT NULL,
    file_name text NOT NULL,
    file_path text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Safely drop and create functions and triggers
DROP TRIGGER IF EXISTS on_review_change ON public.reviews;
DROP FUNCTION IF EXISTS public.update_activity_rating();
DROP FUNCTION IF EXISTS public.get_my_claim(text);

CREATE FUNCTION public.update_activity_rating()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE public.activities
    SET rating = (SELECT AVG(rating) FROM public.reviews WHERE activity_id = NEW.activity_id)
    WHERE id = NEW.activity_id;
    RETURN NEW;
END;
$$;

CREATE TRIGGER on_review_change
AFTER INSERT OR UPDATE OR DELETE ON public.reviews
FOR EACH ROW EXECUTE FUNCTION public.update_activity_rating();

CREATE FUNCTION public.get_my_claim(claim text)
RETURNS jsonb
LANGUAGE sql
STABLE
AS $$
    SELECT coalesce(current_setting('request.jwt.claims', true)::jsonb ->> claim, null)::jsonb;
$$;


-- Set up Row Level Security (RLS) and policies.
-- Safely drop policies before creating them to avoid "already exists" errors.
ALTER TABLE public.activity_types ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.activity_types;
CREATE POLICY "Enable read access for all users" ON public.activity_types FOR SELECT USING (true);

ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.activities;
CREATE POLICY "Enable read access for all users" ON public.activities FOR SELECT USING (true);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.reviews;
CREATE POLICY "Enable read access for all users" ON public.reviews FOR SELECT USING (true);

ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.settings;
CREATE POLICY "Enable read access for all users" ON public.settings FOR SELECT USING (true);

ALTER TABLE public.user_documents ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can manage their own documents" ON public.user_documents;
CREATE POLICY "Users can manage their own documents" ON public.user_documents FOR ALL
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Enable admin access to all documents" ON public.user_documents;
CREATE POLICY "Enable admin access to all documents" ON public.user_documents FOR ALL
USING ((get_my_claim('role'::text)) = '"admin"'::jsonb);

