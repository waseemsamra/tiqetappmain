
-- Drop the old, problematic function if it exists
DROP FUNCTION IF EXISTS public.get_downline_for_agent(p_agent_id uuid);

-- Create a secure view to expose downline information.
-- This is a more standard and secure approach than a SECURITY DEFINER function for this use case.
CREATE OR REPLACE VIEW public.downline_view AS
SELECT
    u.id,
    u.email,
    u.raw_user_meta_data ->> 'full_name' AS full_name,
    u.created_at,
    u.banned_until,
    -- The agent who referred this user
    (u.raw_user_meta_data ->> 'referred_by')::uuid AS referrer_id
FROM
    auth.users u
WHERE
    -- Only include users who were actually referred by someone
    u.raw_user_meta_data ->> 'referred_by' IS NOT NULL;

-- Enable Row Level Security on the new view
ALTER VIEW public.downline_view OWNER TO supabase_admin;
ALTER VIEW public.downline_view ENABLE ROW LEVEL SECURITY;

-- Drop any existing policy on the view to ensure a clean state
DROP POLICY IF EXISTS "Agents can view their own downline" ON public.downline_view;

-- Create the security policy
-- This policy ensures that a user querying the view can only see the records
-- where the referrer_id matches their own user ID.
CREATE POLICY "Agents can view their own downline"
ON public.downline_view
FOR SELECT
USING (auth.uid() = referrer_id);
    