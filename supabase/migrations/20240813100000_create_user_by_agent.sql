
-- Drop the existing detailed_users view if it exists to recreate it with the correct column.
DROP VIEW IF EXISTS public.detailed_users;

-- Recreate the view to join users and profiles.
CREATE OR REPLACE VIEW public.detailed_users AS
SELECT
    u.id,
    u.email,
    u.raw_user_meta_data ->> 'full_name' as full_name,
    u.raw_user_meta_data ->> 'role' as role,
    up.referred_by,
    u.last_sign_in_at,
    u.created_at,
    u.banned_until
FROM
    auth.users u
JOIN
    public.user_profiles up ON u.id = up.user_id;

-- Function to allow an agent to create a new user.
-- This function runs with the privileges of the user who defines it (the admin),
-- but can be called by authenticated users.
CREATE OR REPLACE FUNCTION public.create_user_as_agent(
    new_user_email TEXT,
    new_user_full_name TEXT,
    new_user_role TEXT,
    new_user_password TEXT
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    current_user_id uuid;
    current_user_role TEXT;
    new_user_id uuid;
BEGIN
    -- 1. Get the ID and role of the user calling this function
    current_user_id := auth.uid();
    SELECT raw_user_meta_data ->> 'role'
    INTO current_user_role
    FROM auth.users
    WHERE id = current_user_id;

    -- 2. Security Check: Ensure the caller is an agent
    IF current_user_role != 'agent' THEN
        RAISE EXCEPTION 'Permission denied: Only agents can create new users.';
    END IF;

    -- 3. Create the new user in the auth.users table
    new_user_id := auth.signup(
        new_user_email,
        new_user_password,
        json_build_object(
            'full_name', new_user_full_name,
            'role', new_user_role,
            'points', 0
        )
    );

    -- 4. Create the corresponding profile, marking them as referred by the current agent
    INSERT INTO public.user_profiles (user_id, email, full_name, referred_by)
    VALUES (new_user_id, new_user_email, new_user_full_name, current_user_id);
    
    -- 5. Place the new user in the binary tree if they are an agent
    IF new_user_role = 'agent' THEN
      -- (The logic for binary tree placement can be added here in the future if needed)
    END IF;

    -- 6. Return the new user's ID
    RETURN new_user_id;
END;
$$;

-- Grant permission for any authenticated user to call this function.
-- The security checks are handled inside the function itself.
GRANT EXECUTE ON FUNCTION public.create_user_as_agent(TEXT, TEXT, TEXT, TEXT) TO authenticated;

