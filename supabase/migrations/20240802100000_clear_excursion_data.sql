-- Clear all data from activities and related tables
TRUNCATE TABLE public.activities RESTART IDENTITY CASCADE;

-- Clear all data from activity_types
TRUNCATE TABLE public.activity_types RESTART IDENTITY CASCADE;
