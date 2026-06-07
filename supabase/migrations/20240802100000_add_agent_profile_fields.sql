-- Add profile fields to the agents table
ALTER TABLE public.agents
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS facebook_url TEXT,
ADD COLUMN IF NOT EXISTS twitter_url TEXT,
ADD COLUMN IF NOT EXISTS instagram_url TEXT;

-- Enable RLS for the agents table if it's not already enabled.
-- This is a generic check and might not be necessary if you enable it elsewhere.
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'agents' AND rowsecurity = 't') THEN
    ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;
