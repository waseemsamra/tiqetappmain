-- This policy allows anyone to create a new excursion.
-- In a production environment, you would likely want to restrict this to authenticated users.
CREATE POLICY "Allow public insert access" ON public.excursions FOR INSERT WITH CHECK (true);
