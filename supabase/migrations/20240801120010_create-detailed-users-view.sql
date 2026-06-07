-- Drop the existing view if it exists
DROP VIEW IF EXISTS public.detailed_users;

-- Create the new view with a status column
CREATE VIEW public.detailed_users AS
SELECT
    u.id,
    u.email,
    u.last_sign_in_at,
    u.created_at,
    u.banned_until,
    up.full_name,
    up.referred_by,
    (u.raw_user_meta_data ->> 'role') AS role,
    CASE
        WHEN u.banned_until IS NOT NULL AND u.banned_until > now() THEN 'Locked'
        WHEN u.email_confirmed_at IS NULL THEN 'Pending'
        ELSE 'Active'
    END AS status
FROM
    auth.users u
JOIN
    public.user_profiles up ON u.id = up.id;
