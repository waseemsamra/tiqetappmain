
-- Drop dependent trigger and function
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

-- Create the user_profiles table
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE,
  full_name text,
  avatar_url text,
  referred_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

-- Set up Row Level Security
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- The RLS policies will be handled in a separate file.
-- The trigger is being removed in favor of manual insertion in the signup action.
