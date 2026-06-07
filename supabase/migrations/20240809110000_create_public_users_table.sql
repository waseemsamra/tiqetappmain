
-- Drop dependent trigger first
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Drop the function
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Drop the table if it exists to ensure a clean slate
DROP TABLE IF EXISTS public.users;

-- Create the public.users table with the 'role' column
CREATE TABLE public.users (
    id UUID PRIMARY KEY NOT NULL,
    email TEXT,
    full_name TEXT,
    role TEXT,
    referred_by UUID REFERENCES public.agents(id),
    created_at TIMESTAMPTZ
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows read access to everyone
CREATE POLICY "Public users are viewable by everyone."
ON public.users FOR SELECT
USING (true);

-- Create the function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, role, referred_by, created_at)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'full_name',
    NEW.raw_user_meta_data ->> 'role',
    (NEW.raw_user_meta_data ->> 'referred_by')::uuid,
    NEW.created_at
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger to call the function on new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
