
-- This script cleans up previously created, unused, and faulty database objects.
-- It will safely drop the function and view if they exist, and do nothing otherwise.

-- Drop the function if it exists
DROP FUNCTION IF EXISTS get_downline_for_agent(uuid);

-- Drop the view if it exists
DROP VIEW IF EXISTS public.downline_view;
