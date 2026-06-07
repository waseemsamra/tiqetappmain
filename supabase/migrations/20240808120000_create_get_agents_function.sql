-- Drop the trigger if it exists to make the script re-runnable
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
-- Drop the function if it exists
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create the function to insert into public.user_profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
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

-- Create the trigger to call the function
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to get all agents with their details
CREATE OR REPLACE FUNCTION get_all_agents_with_details()
RETURNS TABLE (
  id uuid,
  email character varying,
  full_name text,
  created_at timestamp with time zone
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    u.id,
    u.email,
    u.raw_user_meta_data->>'full_name' AS full_name,
    u.created_at
  FROM auth.users u
  WHERE u.raw_user_meta_data->>'role' = 'agent';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to the authenticated role
GRANT EXECUTE ON FUNCTION public.get_all_agents_with_details() TO authenticated;
