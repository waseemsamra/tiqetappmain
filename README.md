# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Database Seeding & Policies

This project includes migration files to pre-populate the database and set up necessary security policies.

- `supabase/migrations/20240801120000_seed_data.sql`: Pre-populates the database with countries, cities, users, and excursions.
- `supabase/migrations/20240726100000_rls.sql`: Adds necessary columns and constraints for application features.

**Note on Storage Policies:** Creating policies on the `storage.objects` table via migration scripts can cause permission errors. It is recommended to create storage bucket policies through the Supabase Studio dashboard. For the `excursion-images` bucket, you should enable RLS and create a policy that allows authenticated users to perform uploads.

If you are running this project locally with the Supabase CLI, you can apply these migrations by running `supabase db reset` (for a fresh project) or `supabase migration up` (for an existing one). In Firebase Studio, this seeding and policy setup is handled for you.
