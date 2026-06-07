-- Drop the old function if it exists, to prevent migration errors.
DROP FUNCTION IF EXISTS get_downline_for_agent(uuid);

-- Create the new, correct function.
CREATE OR REPLACE FUNCTION get_downline_for_agent(p_agent_id uuid)
RETURNS TABLE (
    id uuid,
    email text,
    created_at timestamptz,
    raw_user_meta_data jsonb,
    banned_until timestamptz
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        u.id,
        u.email,
        u.created_at,
        u.raw_user_meta_data,
        u.banned_until
    FROM
        auth.users u
    WHERE
        u.raw_user_meta_data->>'referred_by' = p_agent_id::text;
END;
$$ LANGUAGE plpgsql;
