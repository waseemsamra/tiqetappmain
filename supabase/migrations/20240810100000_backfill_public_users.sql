
-- This script backfills the public.users table with existing users from auth.users.
-- It is designed to be run once after the public.users table is created.
-- It will not cause errors if run multiple times, as it skips existing users.

INSERT INTO public.users (id, email, full_name, role, referred_by, created_at)
SELECT
    id,
    email,
    raw_user_meta_data ->> 'full_name' AS full_name,
    raw_user_meta_data ->> 'role' AS role,
    (raw_user_meta_data ->> 'referred_by')::uuid AS referred_by,
    created_at
FROM
    auth.users
ON CONFLICT (id) DO NOTHING;
