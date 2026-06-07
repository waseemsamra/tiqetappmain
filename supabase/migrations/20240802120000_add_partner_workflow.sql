-- Add status column to activities table
ALTER TABLE public.activities ADD COLUMN status text DEFAULT 'pending_approval'::text NOT NULL;

-- Add partner_id column to activities table to link excursions to partners
ALTER TABLE public.activities ADD COLUMN partner_id uuid;

-- Add foreign key constraint to link activities.partner_id to partners.id
ALTER TABLE public.activities 
ADD CONSTRAINT fk_partner 
FOREIGN KEY (partner_id) 
REFERENCES public.partners(id)
ON DELETE SET NULL; -- Or ON DELETE CASCADE if excursions should be deleted with partner

-- Create helper functions to check user roles
CREATE OR REPLACE FUNCTION is_admin() RETURNS boolean AS $$
  SELECT current_setting('request.jwt.claims', true)::jsonb->>'role' = 'admin';
$$ LANGUAGE sql STABLE;

CREATE OR REPLACE FUNCTION is_partner(user_id uuid) RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.partners WHERE id = user_id
  );
$$ LANGUAGE sql STABLE;

-- Enable Row Level Security on the activities table
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist, to prevent errors on re-running
DROP POLICY IF EXISTS "public_can_read_active_activities" ON public.activities;
DROP POLICY IF EXISTS "admins_can_do_anything" ON public.activities;
DROP POLICY IF EXISTS "partners_can_insert_own_activities" ON public.activities;
DROP POLICY IF EXISTS "partners_can_update_own_activities" ON public.activities;
DROP POLICY IF EXISTS "partners_can_delete_own_activities" ON public.activities;

-- RLS Policies for activities table

-- 1. Public users can only see 'active' excursions
CREATE POLICY "public_can_read_active_activities" ON "public"."activities"
AS PERMISSIVE FOR SELECT
TO public
USING (status = 'active'::text);

-- 2. Admins can bypass all other RLS policies
CREATE POLICY "admins_can_do_anything" ON "public"."activities"
AS PERMISSIVE FOR ALL
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

-- 3. Partners can insert new activities for themselves
CREATE POLICY "partners_can_insert_own_activities" ON "public"."activities"
AS PERMISSIVE FOR INSERT
TO authenticated
WITH CHECK (is_partner(auth.uid()) AND partner_id = auth.uid());

-- 4. Partners can update their own activities
CREATE POLICY "partners_can_update_own_activities" ON "public"."activities"
AS PERMISSIVE FOR UPDATE
TO authenticated
USING (is_partner(auth.uid()) AND partner_id = auth.uid())
WITH CHECK (is_partner(auth.uid()) AND partner_id = auth.uid());

-- 5. Partners can delete their own activities
CREATE POLICY "partners_can_delete_own_activities" ON "public"."activities"
AS PERMISSIVE FOR DELETE
TO authenticated
USING (is_partner(auth.uid()) AND partner_id = auth.uid());
