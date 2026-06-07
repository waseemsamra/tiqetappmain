
-- Create public.user_profiles table
CREATE TABLE public.user_profiles (
    id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email text UNIQUE,
    full_name text,
    referred_by uuid,
    created_at timestamptz DEFAULT now()
);

-- Function to handle new user entries
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.user_profiles (id, email, full_name, referred_by)
    VALUES (
        new.id,
        new.email,
        new.raw_user_meta_data->>'full_name',
        (new.raw_user_meta_data->>'referred_by')::uuid
    );
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call handle_new_user on new user creation
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Enable Row Level Security (RLS) for the user_profiles table
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Policies for user_profiles
-- 1. Allow users to see their own profile
CREATE POLICY "Users can view their own profile"
ON public.user_profiles FOR SELECT
USING (auth.uid() = id);

-- 2. Allow agents to see the profiles of users they referred
CREATE POLICY "Agents can view their downline"
ON public.user_profiles FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM public.user_profiles p
    WHERE p.id = auth.uid()
      AND p.id = public.user_profiles.referred_by
  )
);

    