-- supabase/migrations/20240803100000_seed_test_users.sql

-- This script seeds test users for admin, partner, agent, and customer roles.
-- Passwords for all users are 'password'.

-- Helper function to create a user with a specific role
create or replace function internal.create_user(
    email text,
    password text,
    role text,
    full_name text
)
returns uuid as $$
declare
    user_id uuid;
begin
    -- Create the user in auth.users
    user_id := internal.create_auth_user(email, password, role, full_name);

    -- Create corresponding profile entries based on role
    if role = 'partner' then
        insert into public.partners (id, company_name, contact_email)
        values (user_id, full_name || '''s Company', email);
    elsif role = 'agent' then
        insert into public.agents (id, agency_name, commission_rate, referral_code)
        values (user_id, full_name || '''s Agency', 5.0, 'AGENT' || substr(replace(gen_random_uuid()::text, '-', ''), 1, 4));
    end if;

    return user_id;
end;
$$ language plpgsql volatile;


-- Seed the test users
select internal.create_user('admin@roamready.com', 'password', 'admin', 'Admin User');
select internal.create_user('partner@roamready.com', 'password', 'partner', 'Partner User');
select internal.create_user('agent@roamready.com', 'password', 'agent', 'Agent User');
select internal.create_user('customer@roamready.com', 'password', 'customer', 'Customer User');

-- Clean up the helper function
drop function internal.create_user(text, text, text, text);
