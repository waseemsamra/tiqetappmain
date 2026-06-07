
-- Enable Row Level Security for all tables
ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agents ENABLE ROWLevel SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.points_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;


-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Allow public read access" ON public.countries;
DROP POLICY IF EXISTS "Allow public read access" ON public.cities;
DROP POLICY IF EXISTS "Allow public read access" ON public.activity_types;
DROP POLICY IF EXISTS "Allow public read access" ON public.activities;
DROP POLICY IF EXISTS "Allow read access for own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Allow insert for own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Allow public read access" ON public.reviews;
DROP POLICY IF EXISTS "Allow insert for authenticated users" ON public.reviews;
DROP POLICY IF EXISTS "Allow all for own wishlist items" ON public.wishlist_items;
DROP POLICY IF EXISTS "Allow read access for admin" ON public.users;
DROP POLICY IF EXISTS "Allow read access for partners" ON public.partners;
DROP POLICY IF EXISTS "Allow update for own partner profile" ON public.partners;
DROP POLICY IF EXISTS "Allow read access for agents" ON public.agents;
DROP POLICY IF EXISTS "Allow update for own agent profile" ON public.agents;
DROP POLICY IF EXISTS "Allow all for admin" ON public.referrals;
DROP POLICY IF EXISTS "Allow read for associated agent" ON public.referrals;
DROP POLICY IF EXISTS "Allow all for admin" ON public.payouts;
DROP POLICY IF EXISTS "Allow read for associated agent" ON public.payouts;
DROP POLICY IF EXISTS "Allow all for own documents" ON public.user_documents;
DROP POLICY IF EXISTS "Allow read for own points history" ON public.points_history;
DROP POLICY IF EXISTS "Allow public read access" ON public.settings;
DROP POLICY IF EXISTS "Allow admins to manage settings" ON public.settings;
DROP POLICY IF EXISTS "Allow admins to manage everything" ON public.countries;
DROP POLICY IF EXISTS "Allow admins to manage everything" ON public.cities;
DROP POLICY IF EXISTS "Allow admins to manage everything" ON public.activity_types;
DROP POLICY IF EXISTS "Allow admins to manage everything" ON public.activities;
DROP POLICY IF EXISTS "Allow admins to manage everything" ON public.bookings;
DROP POLICY IF EXISTS "Allow admins to manage everything" ON public.reviews;
DROP POLICY IF EXISTS "Allow admins to manage everything" ON public.wishlist_items;


-- Add a UUID extension if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Add a status column to the activities table
ALTER TABLE public.activities
ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'pending_approval';

-- Add a partner_id column to the activities table
ALTER TABLE public.activities
ADD COLUMN IF NOT EXISTS partner_id UUID REFERENCES auth.users(id);

-- Add a booking_reference column to the bookings table
ALTER TABLE public.bookings
ADD COLUMN IF NOT EXISTS booking_reference TEXT UNIQUE;

-- Add quantity and total_price columns to bookings table
ALTER TABLE public.bookings
ADD COLUMN IF NOT EXISTS quantity INTEGER NOT NULL DEFAULT 1,
ADD COLUMN IF NOT EXISTS total_price NUMERIC(10, 2) NOT NULL DEFAULT 0;

-- Add guest booking columns to bookings table
ALTER TABLE public.bookings
ADD COLUMN IF NOT EXISTS guest_email TEXT,
ADD COLUMN IF NOT EXISTS guest_name TEXT;

-- Add a unique constraint to user reviews to prevent multiple reviews by the same user for the same activity
ALTER TABLE public.reviews
ADD CONSTRAINT unique_user_activity_review UNIQUE (user_id, activity_id);

-- Add a points column to user metadata (This is illustrative; Supabase handles this in auth.users)
-- We will manage points in a separate table or via user_metadata in triggers.

-- Add a UNIQUE constraint to the name column of activities
ALTER TABLE public.activities ADD CONSTRAINT activities_name_key UNIQUE (name);

-- Policies for 'countries' table
CREATE POLICY "Allow public read access" ON public.countries FOR SELECT USING (true);
CREATE POLICY "Allow admins to manage everything" ON public.countries FOR ALL
  USING (get_my_claim('role') = '"admin"');

-- Policies for 'cities' table
CREATE POLICY "Allow public read access" ON public.cities FOR SELECT USING (true);
CREATE POLICY "Allow admins to manage everything" ON public.cities FOR ALL
  USING (get_my_claim('role') = '"admin"');

-- Policies for 'activity_types' table
CREATE POLICY "Allow public read access" ON public.activity_types FOR SELECT USING (true);
CREATE POLICY "Allow admins to manage everything" ON public.activity_types FOR ALL
  USING (get_my_claim('role') = '"admin"');

-- Policies for 'activities' table
CREATE POLICY "Allow public read access" ON public.activities FOR SELECT
  USING (status = 'active');
CREATE POLICY "Allow admins to manage everything" ON public.activities FOR ALL
  USING (get_my_claim('role') = '"admin"');
CREATE POLICY "Allow partners to manage their own excursions" ON public.activities FOR ALL
    USING (auth.uid() = partner_id)
    WITH CHECK (auth.uid() = partner_id);


-- Policies for 'bookings' table
CREATE POLICY "Allow read access for own bookings" ON public.bookings FOR SELECT
  USING (auth.uid() = user_id);
CREATE POLICY "Allow insert for own bookings" ON public.bookings FOR INSERT
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Allow admins to manage everything" ON public.bookings FOR ALL
  USING (get_my_claim('role') = '"admin"');

-- Policies for 'reviews' table
CREATE POLICY "Allow public read access" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Allow insert for authenticated users" ON public.reviews FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow admins to manage everything" ON public.reviews FOR ALL
  USING (get_my_claim('role') = '"admin"');

-- Policies for 'wishlist_items' table
CREATE POLICY "Allow all for own wishlist items" ON public.wishlist_items FOR ALL
  USING (auth.uid() = user_id);
CREATE POLICY "Allow admins to manage everything" ON public.wishlist_items FOR ALL
  USING (get_my_claim('role') = '"admin"');

-- Policies for 'partners' table
CREATE POLICY "Allow read access for partners" ON public.partners FOR SELECT USING (true);
CREATE POLICY "Allow update for own partner profile" ON public.partners FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Policies for 'agents' table
CREATE POLICY "Allow read access for agents" ON public.agents FOR SELECT USING (true);
CREATE POLICY "Allow update for own agent profile" ON public.agents FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Policies for 'referrals' table
CREATE POLICY "Allow all for admin" ON public.referrals FOR ALL USING (get_my_claim('role') = '"admin"');
CREATE POLICY "Allow read for associated agent" ON public.referrals FOR SELECT USING (auth.uid() = agent_id);

-- Policies for 'payouts' table
CREATE POLICY "Allow all for admin" ON public.payouts FOR ALL USING (get_my_claim('role') = '"admin"');
CREATE POLICY "Allow read for associated agent" ON public.payouts FOR SELECT USING (auth.uid() = agent_id);

-- Policies for 'user_documents' table
CREATE POLICY "Allow all for own documents" ON public.user_documents FOR ALL USING (auth.uid() = user_id);

-- Policies for 'points_history' table
CREATE POLICY "Allow read for own points history" ON public.points_history FOR SELECT USING (auth.uid() = user_id);

-- Policies for 'settings' table
CREATE POLICY "Allow public read access" ON public.settings FOR SELECT USING (true);
CREATE POLICY "Allow admins to manage settings" ON public.settings FOR ALL USING (get_my_claim('role') = '"admin"');


-- Function to get user role from claims
create or replace function get_my_claim(claim TEXT) returns jsonb
    language sql stable
    as $$
    select nullif(current_setting('request.jwt.claims', true), '')::jsonb -> claim;
$$;

-- Function to update the average rating of an activity
CREATE OR REPLACE FUNCTION update_activity_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.activities
    SET rating = (
        SELECT AVG(rating)
        FROM public.reviews
        WHERE activity_id = NEW.activity_id
    )
    WHERE id = NEW.activity_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to call the function after a new review is inserted
DROP TRIGGER IF EXISTS on_new_review ON public.reviews;
CREATE TRIGGER on_new_review
AFTER INSERT ON public.reviews
FOR EACH ROW
EXECUTE FUNCTION update_activity_rating();


-- Function to create a country and its cities in one go
CREATE OR REPLACE FUNCTION create_country(
    p_code TEXT,
    p_name TEXT,
    p_currency TEXT,
    p_currency_symbol TEXT
)
RETURNS VOID AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM public.countries WHERE code = p_code) THEN
        RAISE EXCEPTION 'Country with code "%" already exists.', p_code;
    END IF;
    IF EXISTS (SELECT 1 FROM public.countries WHERE name = p_name) THEN
        RAISE EXCEPTION 'Country with name "%" already exists.', p_name;
    END IF;
    INSERT INTO public.countries (code, name, currency, currency_symbol)
    VALUES (p_code, p_name, p_currency, p_currency_symbol);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Function to update a country
CREATE OR REPLACE FUNCTION update_country(
    p_code TEXT,
    p_name TEXT,
    p_currency TEXT,
    p_currency_symbol TEXT
)
RETURNS VOID AS $$
BEGIN
    UPDATE public.countries
    SET 
        name = p_name,
        currency = p_currency,
        currency_symbol = p_currency_symbol
    WHERE code = p_code;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to delete a country and its cities
CREATE OR REPLACE FUNCTION delete_country(p_code TEXT)
RETURNS VOID AS $$
BEGIN
    DELETE FROM public.cities WHERE country_code = p_code;
    DELETE FROM public.countries WHERE code = p_code;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to handle new user and create corresponding profile
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_role TEXT;
BEGIN
  user_role := NEW.raw_user_meta_data ->> 'role';
  
  IF user_role = 'partner' THEN
    INSERT INTO public.partners (id, company_name, contact_email)
    VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name' || '''s Company', NEW.email);
  ELSIF user_role = 'agent' THEN
    INSERT INTO public.agents (id, commission_rate, referral_code)
    VALUES (NEW.id, 5.0, 'AGENT' || substr(replace(gen_random_uuid()::text, '-', ''), 1, 6));
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call handle_new_user
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
