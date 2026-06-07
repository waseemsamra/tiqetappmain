-- Add a status column to the activities table
ALTER TABLE public.activities
ADD COLUMN status TEXT NOT NULL DEFAULT 'pending_approval';

-- Create an index on the new status column for faster lookups
CREATE INDEX idx_activities_status ON public.activities(status);

-- Create a function to check if the current user is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth, extensions
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM auth.users u
    JOIN public.profiles p ON u.id = p.id
    WHERE u.id = auth.uid() AND p.role = 'admin'
  );
END;
$$;

-- Create a function to check if the current user is a partner
CREATE OR REPLACE FUNCTION public.is_partner()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth, extensions
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.partners
    WHERE id = auth.uid()
  );
END;
$$;


-- Enable Row Level Security on the activities table
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist, to prevent errors on re-running
DROP POLICY IF EXISTS "Allow public read access for active excursions" ON public.activities;
DROP POLICY IF EXISTS "Allow partners to manage their own excursions" ON public.activities;
DROP POLICY IF EXISTS "Allow admin full access" ON public.activities;

-- Policy 1: Allow public read-only access to 'active' excursions
CREATE POLICY "Allow public read access for active excursions"
ON public.activities
FOR SELECT
USING (status = 'active');

-- Policy 2: Allow partners to manage their own excursions
CREATE POLICY "Allow partners to manage their own excursions"
ON public.activities
FOR ALL
USING (
  (SELECT public.is_partner()) AND partner_id = auth.uid()
)
WITH CHECK (
  (SELECT public.is_partner()) AND partner_id = auth.uid()
);

-- Policy 3: Allow admins to have unrestricted access
CREATE POLICY "Allow admin full access"
ON public.activities
FOR ALL
USING (
  (SELECT public.is_admin())
)
WITH CHECK (
  (SELECT public.is_admin())
);
