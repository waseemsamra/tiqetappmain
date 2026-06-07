
-- This is a one-time script to assign a referrer to existing users who don't have one.
-- In a real production scenario, you would have more complex logic to assign referrals,
-- but for this demo, we'll assign all un-referred customers to the first available agent.

DO $$
DECLARE
    first_agent_id UUID;
BEGIN
    -- Find the first user with the 'agent' role to act as the default referrer.
    SELECT id INTO first_agent_id
    FROM auth.users
    WHERE raw_user_meta_data ->> 'role' = 'agent'
    LIMIT 1;

    -- If an agent exists, update all users (in public.users) who don't have a referrer.
    IF first_agent_id IS NOT NULL THEN
        UPDATE public.users
        SET referred_by = first_agent_id
        WHERE
            referred_by IS NULL
            AND id != first_agent_id; -- Ensure the agent is not their own referrer
    END IF;
END $$;
