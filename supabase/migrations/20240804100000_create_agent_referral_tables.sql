
-- Enable RLS
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;

-- Add paypal_email to agents table
ALTER TABLE public.agents
ADD COLUMN paypal_email TEXT;

-- Referrals table
CREATE TABLE IF NOT EXISTS public.referrals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
    agent_id UUID NOT NULL REFERENCES public.agents(id) ON DELETE CASCADE,
    commission_amount NUMERIC(10, 2) NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('paid', 'unpaid')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Payouts table
CREATE TABLE IF NOT EXISTS public.payouts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID NOT NULL REFERENCES public.agents(id) ON DELETE CASCADE,
    amount NUMERIC(10, 2) NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('pending', 'paid', 'failed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    paid_at TIMESTAMPTZ
);

-- Create policies for agents table
DROP POLICY IF EXISTS "Agents can view their own profile." ON public.agents;
CREATE POLICY "Agents can view their own profile."
ON public.agents FOR SELECT
TO authenticated
USING (auth.uid() = id);

DROP POLICY IF EXISTS "Agents can update their own profile." ON public.agents;
CREATE POLICY "Agents can update their own profile."
ON public.agents FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Create policies for referrals table
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Agents can view their own referrals." ON public.referrals;
CREATE POLICY "Agents can view their own referrals."
ON public.referrals FOR SELECT
TO authenticated
USING (agent_id = auth.uid());

-- Create policies for payouts table
ALTER TABLE public.payouts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Agents can view their own payouts." ON public.payouts;
CREATE POLICY "Agents can view their own payouts."
ON public.payouts FOR SELECT
TO authenticated
USING (agent_id = auth.uid());

-- Grant usage on the schema to the service_role
GRANT USAGE ON SCHEMA public TO service_role;

-- Grant select, insert, update, delete rights to the service_role
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.referrals TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.payouts TO service_role;
GRANT ALL ON TABLE public.agents TO service_role;
