--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1
-- Dumped by pg_dump version 15.1 (Debian 15.1-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: pgsodium; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";


--
-- Name: pg_graphql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";


--
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";


--
-- Name: pgjwt; Type: EXTENSION; Schema: -; Owner -
--

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";


--
-- Name: supabase_vault; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

--
-- Helper function to safely drop types
--
CREATE OR REPLACE FUNCTION drop_type_if_exists(type_name TEXT)
RETURNS void AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_type WHERE typname = type_name) THEN
        EXECUTE 'DROP TYPE ' || quote_ident(type_name) || ' CASCADE';
    END IF;
END;
$$ LANGUAGE plpgsql;

--
-- Drop existing types to avoid conflicts
--
SELECT drop_type_if_exists('activity_status');
SELECT drop_type_if_exists('booking_status');
SELECT drop_type_if_exists('user_role');
SELECT drop_type_if_exists('referral_status');
SELECT drop_type_if_exists('payout_status');


--
-- Create types
--
CREATE TYPE public.activity_status AS ENUM (
    'pending_approval',
    'active',
    'inactive',
    'rejected'
);
CREATE TYPE public.booking_status AS ENUM (
    'pending',
    'confirmed',
    'cancelled'
);
CREATE TYPE public.user_role AS ENUM (
    'customer',
    'admin',
    'partner',
    'agent'
);
CREATE TYPE public.referral_status AS ENUM (
    'unpaid',
    'paid'
);
CREATE TYPE public.payout_status AS ENUM (
    'pending',
    'paid',
    'failed'
);


--
-- Name: get_my_claim(text); Type: FUNCTION; Schema: public; Owner: supabase_admin
--
DROP FUNCTION IF EXISTS public.get_my_claim(text) CASCADE;
CREATE FUNCTION public.get_my_claim(claim text) RETURNS jsonb
    LANGUAGE sql STABLE
    AS $$
  select
  	coalesce(
    current_setting('request.jwt.claims', true)::jsonb ->> claim,
    (select nullif(current_setting('request.jwt.claims', true), '')::jsonb -> 'user_metadata' ->> claim)
  )::jsonb
$$;


--
-- Name: update_activity_rating(); Type: FUNCTION; Schema: public; Owner: supabase_admin
--
DROP FUNCTION IF EXISTS public.update_activity_rating() CASCADE;
CREATE FUNCTION public.update_activity_rating() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  UPDATE public.activities
  SET rating = (
    SELECT AVG(rating)
    FROM public.reviews
    WHERE activity_id = COALESCE(NEW.activity_id, OLD.activity_id)
  )
  WHERE id = COALESCE(NEW.activity_id, OLD.activity_id);
  RETURN NULL;
END;
$$;


SET default_tablespace = '';
SET default_table_access_method = "heap";

--
-- Name: activities; Type: TABLE; Schema: public; Owner: postgres
--

DROP TABLE IF EXISTS public.activities CASCADE;
CREATE TABLE public.activities (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    name character varying(255) NOT NULL,
    city character varying(100) NOT NULL,
    country character varying(100) NOT NULL,
    description text,
    price numeric(10,2) DEFAULT 0.00 NOT NULL,
    duration character varying(100),
    activitytypeid uuid,
    partner_id uuid,
    rating numeric(3,2) DEFAULT 0.00,
    images text[],
    operatinghours character varying(255),
    whatsincluded text[],
    whatsnotincluded text[],
    instructions text,
    howtogetthere text,
    additionalinfo text,
    cancellationpolicy text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    status public.activity_status DEFAULT 'pending_approval'::public.activity_status NOT NULL
);

--
-- Name: activity_types; Type: TABLE; Schema: public; Owner: postgres
--
DROP TABLE IF EXISTS public.activity_types CASCADE;
CREATE TABLE public.activity_types (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    name character varying(100) NOT NULL
);

--
-- Name: bookings; Type: TABLE; Schema: public; Owner: postgres
--
DROP TABLE IF EXISTS public.bookings CASCADE;
CREATE TABLE public.bookings (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    user_id uuid,
    guest_email character varying(255),
    activity_id uuid NOT NULL,
    booking_date timestamp with time zone NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    status public.booking_status DEFAULT 'pending'::public.booking_status NOT NULL,
    booking_reference character varying(20) NOT NULL,
    quantity integer DEFAULT 1 NOT NULL,
    total_price numeric(10,2) NOT NULL,
    guest_name character varying(255)
);

--
-- Name: reviews; Type: TABLE; Schema: public; Owner: postgres
--
DROP TABLE IF EXISTS public.reviews CASCADE;
CREATE TABLE public.reviews (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    activity_id uuid NOT NULL,
    rating integer NOT NULL,
    comment text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    author character varying(255)
);

--
-- Name: wishlist_items; Type: TABLE; Schema: public; Owner: postgres
--
DROP TABLE IF EXISTS public.wishlist_items CASCADE;
CREATE TABLE public.wishlist_items (
    id bigint NOT NULL,
    user_id uuid NOT NULL,
    activity_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

--
-- Name: countries; Type: TABLE; Schema: public; Owner: postgres
--
DROP TABLE IF EXISTS public.countries CASCADE;
CREATE TABLE public.countries (
    code character varying(2) NOT NULL,
    name character varying(100) NOT NULL,
    currency character varying(3),
    currency_symbol character varying(5)
);

--
-- Name: cities; Type: TABLE; Schema: public; Owner: postgres
--
DROP TABLE IF EXISTS public.cities CASCADE;
CREATE TABLE public.cities (
    id bigint NOT NULL,
    name character varying(100) NOT NULL,
    country_code character varying(2) NOT NULL
);

--
-- Name: settings; Type: TABLE; Schema: public; Owner: postgres
--
DROP TABLE IF EXISTS public.settings CASCADE;
CREATE TABLE public.settings (
    key character varying(50) NOT NULL,
    value text
);

--
-- Name: user_documents; Type: TABLE; Schema: public; Owner: postgres
--
DROP TABLE IF EXISTS public.user_documents CASCADE;
CREATE TABLE public.user_documents (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    document_type character varying(50) NOT NULL,
    file_name character varying(255) NOT NULL,
    file_path text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

--
-- Name: partners; Type: TABLE; Schema: public; Owner: postgres
--
DROP TABLE IF EXISTS public.partners CASCADE;
CREATE TABLE public.partners (
    id uuid NOT NULL,
    company_name character varying(255) NOT NULL,
    contact_email character varying(255),
    website character varying(255),
    iban character varying(34),
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

--
-- Name: agents; Type: TABLE; Schema: public; Owner: postgres
--
DROP TABLE IF EXISTS public.agents CASCADE;
CREATE TABLE public.agents (
    id uuid NOT NULL,
    agency_name character varying(255),
    commission_rate numeric(5,2) DEFAULT 5.00 NOT NULL,
    referral_code character varying(20) NOT NULL,
    paypal_email character varying(255),
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

--
-- Name: referrals; Type: TABLE; Schema: public; Owner: postgres
--
DROP TABLE IF EXISTS public.referrals CASCADE;
CREATE TABLE public.referrals (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    booking_id uuid NOT NULL,
    agent_id uuid NOT NULL,
    commission_amount numeric(10,2) NOT NULL,
    status public.referral_status DEFAULT 'unpaid'::public.referral_status NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

--
-- Name: payouts; Type: TABLE; Schema: public; Owner: postgres
--
DROP TABLE IF EXISTS public.payouts CASCADE;
CREATE TABLE public.payouts (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    agent_id uuid NOT NULL,
    amount numeric(10,2) NOT NULL,
    status public.payout_status DEFAULT 'pending'::public.payout_status NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    paid_at timestamp with time zone
);

--
-- Name: points_history; Type: TABLE; Schema: public; Owner: postgres
--
DROP TABLE IF EXISTS public.points_history CASCADE;
CREATE TABLE public.points_history (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    points_change integer NOT NULL,
    description text,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

--
-- Name: wishlist_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--
DROP SEQUENCE IF EXISTS public.wishlist_items_id_seq;
CREATE SEQUENCE public.wishlist_items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER TABLE public.wishlist_items_id_seq OWNER TO postgres;
ALTER SEQUENCE public.wishlist_items_id_seq OWNED BY public.wishlist_items.id;

--
-- Name: cities_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--
DROP SEQUENCE IF EXISTS public.cities_id_seq;
CREATE SEQUENCE public.cities_id_seq
    AS aLTER TABLE public.cities ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.cities_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
ALTER TABLE public.cities_id_seq OWNER TO postgres;
ALTER SEQUENCE public.cities_id_seq OWNED BY public.cities.id;

--
-- Set sequence ownership and default values
--
ALTER TABLE ONLY public.wishlist_items ALTER COLUMN id SET DEFAULT nextval('public.wishlist_items_id_seq'::regclass);
ALTER TABLE ONLY public.cities ALTER COLUMN id SET DEFAULT nextval('public.cities_id_seq'::regclass);

--
-- Primary and Unique Constraints
--
ALTER TABLE ONLY public.activities ADD CONSTRAINT activities_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.activity_types ADD CONSTRAINT activity_types_name_key UNIQUE (name);
ALTER TABLE ONLY public.activity_types ADD CONSTRAINT activity_types_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.bookings ADD CONSTRAINT bookings_booking_reference_key UNIQUE (booking_reference);
ALTER TABLE ONLY public.bookings ADD CONSTRAINT bookings_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.reviews ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.reviews ADD CONSTRAINT reviews_user_id_activity_id_key UNIQUE (user_id, activity_id);
ALTER TABLE ONLY public.wishlist_items ADD CONSTRAINT wishlist_items_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.wishlist_items ADD CONSTRAINT wishlist_items_user_id_activity_id_key UNIQUE (user_id, activity_id);
ALTER TABLE ONLY public.countries ADD CONSTRAINT countries_pkey PRIMARY KEY (code);
ALTER TABLE ONLY public.cities ADD CONSTRAINT pk_cities PRIMARY KEY (id);
ALTER TABLE ONLY public.cities ADD CONSTRAINT cities_country_code_name_key UNIQUE (country_code, name);
ALTER TABLE ONLY public.settings ADD CONSTRAINT settings_pkey PRIMARY KEY (key);
ALTER TABLE ONLY public.user_documents ADD CONSTRAINT user_documents_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.partners ADD CONSTRAINT partners_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.agents ADD CONSTRAINT agents_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.agents ADD CONSTRAINT agents_referral_code_key UNIQUE (referral_code);
ALTER TABLE ONLY public.referrals ADD CONSTRAINT referrals_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.payouts ADD CONSTRAINT payouts_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.points_history ADD CONSTRAINT points_history_pkey PRIMARY KEY (id);


--
-- Foreign Key Constraints
--
ALTER TABLE ONLY public.activities ADD CONSTRAINT activities_activitytypeid_fkey FOREIGN KEY (activitytypeid) REFERENCES public.activity_types(id);
ALTER TABLE ONLY public.activities ADD CONSTRAINT activities_partner_id_fkey FOREIGN KEY (partner_id) REFERENCES public.partners(id) ON DELETE SET NULL;
ALTER TABLE ONLY public.bookings ADD CONSTRAINT bookings_activity_id_fkey FOREIGN KEY (activity_id) REFERENCES public.activities(id);
ALTER TABLE ONLY public.bookings ADD CONSTRAINT bookings_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id);
ALTER TABLE ONLY public.reviews ADD CONSTRAINT reviews_activity_id_fkey FOREIGN KEY (activity_id) REFERENCES public.activities(id);
ALTER TABLE ONLY public.reviews ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id);
ALTER TABLE ONLY public.wishlist_items ADD CONSTRAINT wishlist_items_activity_id_fkey FOREIGN KEY (activity_id) REFERENCES public.activities(id);
ALTER TABLE ONLY public.wishlist_items ADD CONSTRAINT wishlist_items_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id);
ALTER TABLE ONLY public.cities ADD CONSTRAINT cities_country_code_fkey FOREIGN KEY (country_code) REFERENCES public.countries(code) ON DELETE CASCADE;
ALTER TABLE ONLY public.user_documents ADD CONSTRAINT user_documents_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.partners ADD CONSTRAINT partners_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.agents ADD CONSTRAINT agents_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.referrals ADD CONSTRAINT referrals_agent_id_fkey FOREIGN KEY (agent_id) REFERENCES public.agents(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.referrals ADD CONSTRAINT referrals_booking_id_fkey FOREIGN KEY (booking_id) REFERENCES public.bookings(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.payouts ADD CONSTRAINT payouts_agent_id_fkey FOREIGN KEY (agent_id) REFERENCES public.agents(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.points_history ADD CONSTRAINT points_history_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

--
-- Triggers
--
DROP TRIGGER IF EXISTS on_review_change ON public.reviews;
CREATE TRIGGER on_review_change
    AFTER INSERT OR UPDATE OR DELETE ON public.reviews
    FOR EACH ROW
    EXECUTE PROCEDURE public.update_activity_rating();

--
-- Policies
--

-- ACTIVITY TYPES
ALTER TABLE public.activity_types ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow read access for all users" ON public.activity_types;
CREATE POLICY "Allow read access for all users" ON public.activity_types FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow admin to manage" ON public.activity_types;
CREATE POLICY "Allow admin to manage" ON public.activity_types FOR ALL USING ((get_my_claim('role'::text))::text = '"admin"') WITH CHECK ((get_my_claim('role'::text))::text = '"admin"');

-- ACTIVITIES
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow read access for active excursions" ON public.activities;
CREATE POLICY "Allow read access for active excursions" ON public.activities FOR SELECT USING (status = 'active');
DROP POLICY IF EXISTS "Allow users to create their own activities" ON public.activities;
CREATE POLICY "Allow users to create their own activities" ON public.activities FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
DROP POLICY IF EXISTS "Allow users to update their own activities" ON public.activities;
CREATE POLICY "Allow users to update their own activities" ON public.activities FOR UPDATE USING ((auth.uid() = partner_id) OR ((get_my_claim('role'::text))::text = '"admin"')) WITH CHECK ((auth.uid() = partner_id) OR ((get_my_claim('role'::text))::text = '"admin"'));
DROP POLICY IF EXISTS "Allow admin to delete activities" ON public.activities;
CREATE POLICY "Allow admin to delete activities" ON public.activities FOR DELETE USING ((get_my_claim('role'::text))::text = '"admin"');

-- BOOKINGS
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow users to view their own bookings" ON public.bookings;
CREATE POLICY "Allow users to view their own bookings" ON public.bookings FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Allow users to create bookings" ON public.bookings;
CREATE POLICY "Allow users to create bookings" ON public.bookings FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Allow admin and partners to view bookings" ON public.bookings;
CREATE POLICY "Allow admin and partners to view bookings" ON public.bookings FOR SELECT USING (((get_my_claim('role'::text))::text = '"admin"') OR ((get_my_claim('role'::text))::text = '"partner"'));

-- REVIEWS
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow read access for all users" ON public.reviews;
CREATE POLICY "Allow read access for all users" ON public.reviews FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow users to create reviews" ON public.reviews;
CREATE POLICY "Allow users to create reviews" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = user_id);

-- WISHLIST ITEMS
ALTER TABLE public.wishlist_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow users to manage their own wishlist" ON public.wishlist_items;
CREATE POLICY "Allow users to manage their own wishlist" ON public.wishlist_items FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- COUNTRIES & CITIES
ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow read access for all users" ON public.countries;
CREATE POLICY "Allow read access for all users" ON public.countries FOR SELECT USING (true);
ALTER TABLE public.cities ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow read access for all users" ON public.cities;
CREATE POLICY "Allow read access for all users" ON public.cities FOR SELECT USING (true);

-- SETTINGS
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow read access for all users" ON public.settings;
CREATE POLICY "Allow read access for all users" ON public.settings FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow admins to manage settings" ON public.settings;
CREATE POLICY "Allow admins to manage settings" ON public.settings FOR ALL USING ((get_my_claim('role'::text))::text = '"admin"');

-- USER DOCUMENTS
ALTER TABLE public.user_documents ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow users to manage their own documents" ON public.user_documents;
CREATE POLICY "Allow users to manage their own documents" ON public.user_documents FOR ALL USING (auth.uid() = user_id);

-- PARTNERS, AGENTS, REFERRALS, PAYOUTS (Admin only management)
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins can manage all partner profiles" ON public.partners;
CREATE POLICY "Admins can manage all partner profiles" ON public.partners FOR ALL USING ((get_my_claim('role'::text))::text = '"admin"');

ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins can manage all agent profiles" ON public.agents;
CREATE POLICY "Admins can manage all agent profiles" ON public.agents FOR ALL USING ((get_my_claim('role'::text))::text = '"admin"');

ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins can manage all referrals" ON public.referrals;
CREATE POLICY "Admins can manage all referrals" ON public.referrals FOR ALL USING ((get_my_claim('role'::text))::text = '"admin"');

ALTER TABLE public.payouts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins can manage all payouts" ON public.payouts;
CREATE POLICY "Admins can manage all payouts" ON public.payouts FOR ALL USING ((get_my_claim('role'::text))::text = '"admin"');

ALTER TABLE public.points_history ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view their own points history" ON public.points_history;
CREATE POLICY "Users can view their own points history" ON public.points_history FOR SELECT USING (auth.uid() = user_id);

-- Storage Policies
-- Make sure RLS is enabled on the `storage.objects` table
DROP POLICY IF EXISTS "Allow authenticated users to upload excursion images" ON storage.objects;
CREATE POLICY "Allow authenticated users to upload excursion images"
    FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'excursion-images');

DROP POLICY IF EXISTS "Allow anyone to view excursion images" ON storage.objects;
CREATE POLICY "Allow anyone to view excursion images"
    FOR SELECT
    TO public
    USING (bucket_id = 'excursion-images');
    
DROP POLICY IF EXISTS "Allow authenticated users to upload documents" ON storage.objects;
CREATE POLICY "Allow authenticated users to upload documents"
    FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'user_documents' AND owner = auth.uid());

DROP POLICY IF EXISTS "Allow users to view their own documents" ON storage.objects;
CREATE POLICY "Allow users to view their own documents"
    FOR SELECT
    TO authenticated
    USING (bucket_id = 'user_documents' AND owner = auth.uid());

DROP POLICY IF EXISTS "Allow users to delete their own documents" ON storage.objects;
CREATE POLICY "Allow users to delete their own documents"
    FOR DELETE
    TO authenticated
    USING (bucket_id = 'user_documents' AND owner = auth.uid());
