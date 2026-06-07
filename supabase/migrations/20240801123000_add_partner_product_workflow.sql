-- 1. Create the partners table to store partner-specific information
CREATE TABLE IF NOT EXISTS public.partners (
    id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    company_name text NOT NULL,
    contact_email text,
    website text,
    created_at timestamptz DEFAULT now() NOT NULL
);
-- 2. Create the agents table to store agent-specific information
CREATE TABLE IF NOT EXISTS public.agents (
    id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    agency_name text,
    commission_rate real DEFAULT 10.0 NOT NULL,
    referral_code text NOT NULL UNIQUE,
    created_at timestamptz DEFAULT now() NOT NULL
);
-- 3. Add a status column to the activities table for the approval workflow
ALTER TABLE public.activities
ADD COLUMN IF NOT EXISTS status text DEFAULT 'pending_approval'::text NOT NULL;
-- 4. Add the partner_id column to link activities to partners
ALTER TABLE public.activities
ADD COLUMN IF NOT EXISTS partner_id uuid;
-- 5. Add the foreign key constraint AFTER the partners table and partner_id column exist
-- First, drop the constraint if it exists, to avoid errors on re-runs
ALTER TABLE public.activities DROP CONSTRAINT IF EXISTS activities_partner_id_fkey;
-- Then, add the new constraint
ALTER TABLE public.activities
ADD CONSTRAINT activities_partner_id_fkey FOREIGN KEY (partner_id) REFERENCES public.partners(id) ON DELETE
SET NULL;
-- Helper function to check if a user is an admin
CREATE OR REPLACE FUNCTION public.is_admin() RETURNS boolean LANGUAGE sql SECURITY DEFINER AS $$
SELECT coalesce(
        (
            SELECT raw_app_meta_data ->> 'role'
            FROM auth.users
            WHERE id = auth.uid()
        ) = 'admin',
        false
    );
$$;
-- Helper function to check if a user is a partner
CREATE OR REPLACE FUNCTION public.is_partner(user_id uuid) RETURNS boolean LANGUAGE sql SECURITY DEFINER AS $$
SELECT EXISTS (
        SELECT 1
        FROM public.partners
        WHERE id = user_id
    );
$$;
-- Enable Row Level Security on the activities table
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Public can view active activities" ON public.activities;
DROP POLICY IF EXISTS "Admin has full access" ON public.activities;
DROP POLICY IF EXISTS "Partners can manage their own activities" ON public.activities;
-- Create new policies
-- Policy 1: Public users (and anyone not logged in) can only see 'active' excursions.
CREATE POLICY "Public can view active activities" ON public.activities FOR
SELECT USING (status = 'active');
-- Policy 2: Admins can bypass RLS and do anything.
CREATE POLICY "Admin has full access" ON public.activities FOR ALL USING (public.is_admin())
WITH CHECK (public.is_admin());
-- Policy 3: Partners can view, insert, update, and delete their own activities.
CREATE POLICY "Partners can manage their own activities" ON public.activities FOR ALL USING (
    (
        SELECT auth.uid()
    ) = partner_id
)
WITH CHECK (
    (
        SELECT auth.uid()
    ) = partner_id
);
