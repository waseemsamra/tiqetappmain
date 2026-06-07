
-- Create the public.user_profiles table
CREATE TABLE public.user_profiles (
    id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email text,
    full_name text,
    referred_by uuid,
    created_at timestamptz DEFAULT now() NOT NULL
);
COMMENT ON TABLE public.user_profiles IS 'Public-facing user profiles, synced from auth.users';

-- Enable Row Level Security
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Policies for user_profiles
-- 1. Allow users to see their own profile
CREATE POLICY "Users can view their own profile" ON public.user_profiles
FOR SELECT USING (auth.uid() = id);

-- 2. Allow agents to see the profiles of users they referred
CREATE POLICY "Agents can view their direct referrals" ON public.user_profiles
FOR SELECT TO authenticated USING (auth.uid() = referred_by);

-- 3. Allow admins to see all profiles (optional, good practice)
-- This assumes you have a way to identify admins, e.g., a custom claim or a separate table.
-- For this example, we'll just allow any authenticated user to see basic info if needed for other features.
-- A more secure policy might be needed depending on the app's requirements.
CREATE POLICY "Authenticated users can see basic info of others" ON public.user_profiles
FOR SELECT TO authenticated USING (true);


-- Create the function to handle new user entries
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, referred_by, created_at)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    (new.raw_user_meta_data->>'referred_by')::uuid,
    new.created_at
  );
  RETURN new;
END;
$$;

-- Create the trigger to call the function on new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Backfill existing users into the user_profiles table
INSERT INTO public.user_profiles (id, email, full_name, referred_by, created_at)
SELECT
    id,
    email,
    raw_user_meta_data->>'full_name',
    (raw_user_meta_data->>'referred_by')::uuid,
    created_at
FROM auth.users
ON CONFLICT (id) DO NOTHING;
