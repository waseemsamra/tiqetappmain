-- supabase/migrations/20240801120002_create_get_direct_downline_function.sql

-- Drop the old view if it exists from a previous attempt
DROP VIEW IF EXISTS public.detailed_users;

-- Create the function to get downline members for a specific agent
CREATE OR REPLACE FUNCTION public.get_downline_members(agent_id_param uuid, search_term text DEFAULT '')
RETURNS TABLE (
    id uuid,
    email text,
    full_name text,
    role text,
    created_at timestamptz,
    email_confirmed_at timestamptz,
    banned_until timestamptz,
    points integer
)
LANGUAGE sql
STABLE
AS $$
    SELECT
        u.id,
        u.email,
        u.raw_user_meta_data->>'full_name' as full_name,
        u.raw_user_meta_data->>'role' as role,
        u.created_at,
        u.email_confirmed_at,
        u.banned_until,
        (u.raw_user_meta_data->>'points')::integer as points
    FROM auth.users u
    JOIN public.user_profiles up ON u.id = up.id
    WHERE up.referred_by = agent_id_param
    AND (
        search_term = '' OR
        u.email ILIKE '%' || search_term || '%' OR
        (u.raw_user_meta_data->>'full_name') ILIKE '%' || search_term || '%'
    );
$$;

-- Grant usage on the function to the authenticated role
GRANT EXECUTE ON FUNCTION public.get_downline_members(uuid, text) TO authenticated;
