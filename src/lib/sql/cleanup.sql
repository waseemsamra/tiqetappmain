-- This script helps clean up your database by removing invalid or orphaned records.
--
-- How to use:
-- 1. Go to your Supabase project dashboard.
-- 2. In the left sidebar, navigate to the "SQL Editor".
-- 3. Copy the commands from this file and paste them into a new query tab.
-- 4. Click "Run" to execute the queries.
--
-- It's always a good idea to back up your data before running deletion queries.

-- Query 1: Delete all activities that do not have an associated activity type.
-- This removes invalid records from your main 'activities' table.
DELETE FROM activities
WHERE activitytypeid IS NULL;

-- Query 2: Delete any activity types that are not being used by any activity.
-- This helps keep your 'activity_types' table clean and relevant.
DELETE FROM activity_types
WHERE id NOT IN (SELECT DISTINCT activitytypeid FROM activities WHERE activitytypeid IS NOT NULL);

-- After running these queries, your data should be cleaner.
-- You can re-run them periodically if needed.
