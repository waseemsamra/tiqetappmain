
-- Create the table to link agents to their featured excursions
CREATE TABLE public.agent_featured_excursions (
    agent_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    activity_id uuid NOT NULL REFERENCES public.activities(id) ON DELETE CASCADE,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    PRIMARY KEY (agent_id, activity_id)
);

-- Enable Row Level Security
ALTER TABLE public.agent_featured_excursions ENABLE ROW LEVEL SECURITY;

-- Add policies for RLS
-- For now, we will add a permissive policy as an example.
-- In a production environment, you'd want to restrict this further.
CREATE POLICY "Allow all access to featured excursions"
ON public.agent_featured_excursions
FOR ALL
USING (true)
WITH CHECK (true);

