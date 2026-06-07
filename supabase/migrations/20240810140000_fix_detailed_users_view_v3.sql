
-- Drop the existing incorrect view if it exists
DROP VIEW IF EXISTS public.detailed_users;

-- Recreate the view with the correct join condition
CREATE VIEW public.detailed_users AS
SELECT
    u.id,
    u.email,
    u.last_sign_in_at,
    u.created_at,
    u.banned_until,
    up.full_name,
    up.referred_by,
    -- Extract role from app_metadata, default to 'customer'
    COALESCE(u.raw_app_meta_data ->> 'role', 'customer') as role
FROM
    auth.users u
JOIN
    public.user_profiles up ON u.id = up.id;
