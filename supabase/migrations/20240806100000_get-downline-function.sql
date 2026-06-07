
-- Drop the existing function if it exists to ensure a clean slate
DROP FUNCTION IF EXISTS get_downline_members(uuid, text);

-- Create the new function
CREATE OR REPLACE FUNCTION get_downline_members(
    agent_id_param uuid,
    search_term text DEFAULT ''
)
RETURNS TABLE (
    id uuid,
    email text,
    full_name text,
    role text,
    last_sign_in_at timestamptz,
    created_at timestamptz,
    banned_until timestamptz,
    email_confirmed_at timestamptz,
    points integer
)
LANGUAGE sql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    SELECT
        u.id,
        u.email,
        u.raw_user_meta_data->>'full_name' as full_name,
        u.raw_user_meta_data->>'role' as role,
        u.last_sign_in_at,
        u.created_at,
        u.banned_until,
        u.email_confirmed_at,
        (u.raw_user_meta_data->>'points')::integer as points
    FROM
        auth.users u
    JOIN
        public.user_profiles p ON u.id = p.id
    WHERE
        p.referred_by = agent_id_param
        AND (
            search_term = ''
            OR u.email ILIKE '%' || search_term || '%'
            OR (u.raw_user_meta_data->>'full_name') ILIKE '%' || search_term || '%'
        )
    ORDER BY
        u.created_at DESC;
END;
$$;

-- Grant execute permission to the 'authenticated' role
GRANT EXECUTE ON FUNCTION public.get_downline_members(uuid, text) TO authenticated;
