-- Function to create a user profile row
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  referred_by_id uuid;
BEGIN
  -- Check if a referral code was passed in metadata
  IF NEW.raw_user_meta_data->>'referral_code' IS NOT NULL THEN
    -- Find the agent's ID from the referral code
    SELECT id INTO referred_by_id
    FROM public.agents
    WHERE referral_code = NEW.raw_user_meta_data->>'referral_code'
    LIMIT 1;
  END IF;

  -- Insert a new row into the user_profiles table
  INSERT INTO public.user_profiles (id, email, full_name, referred_by)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    referred_by_id
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function when a new user is created in auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Also create a trigger for when an agent is created via invite, to ensure their profile exists
-- Note: This assumes `inviteUser` sets the role to 'agent' in metadata
CREATE OR REPLACE FUNCTION public.handle_new_agent()
RETURNS TRIGGER AS $$
BEGIN
    -- If the new user has the role 'agent', create an entry in the agents table
    IF NEW.raw_user_meta_data->>'role' = 'agent' THEN
        INSERT INTO public.agents (id, referral_code, commission_rate)
        VALUES (
            NEW.id,
            -- Generate a simple referral code
            LOWER(REPLACE(NEW.raw_user_meta_data->>'full_name', ' ', '')) || SUBSTRING(CAST(EXTRACT(EPOCH FROM NOW()) AS TEXT), 8, 4),
            10 -- Default commission rate
        )
        ON CONFLICT (id) DO NOTHING; -- Avoid errors if it somehow already exists
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing agent creation trigger if it exists and recreate
DROP TRIGGER IF EXISTS on_auth_user_created_for_agent ON auth.users;
CREATE TRIGGER on_auth_user_created_for_agent
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_agent();
