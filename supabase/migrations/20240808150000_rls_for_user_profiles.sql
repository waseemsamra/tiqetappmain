
-- Enable Row Level Security
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to ensure a clean slate
DROP POLICY IF EXISTS "Agents can view their direct referrals." ON public.user_profiles;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.user_profiles;

-- Create the correct policy: An agent can see the profiles of users they referred.
CREATE POLICY "Agents can view their direct referrals."
ON public.user_profiles
FOR SELECT
USING (referred_by = auth.uid());
