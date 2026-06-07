-- This script will completely and irreversibly delete all data from the specified tables.
-- It's designed to give you a clean slate for your excursion data.
--
-- PLEASE BE CAREFUL: This action cannot be undone. It is recommended to
-- take a backup of your database before running this script if the data is important.
--
-- The TRUNCATE command is used because it is faster and resets any auto-incrementing counters.
-- The CASCADE option will automatically remove all dependent data in other tables
-- (like bookings, reviews, and wishlist items) that reference the activities being deleted.

TRUNCATE TABLE public.activities, public.activity_types CASCADE;

-- After running this, the 'activities' and 'activity_types' tables will be empty.
-- All related bookings, reviews, and wishlist items will also be deleted.
