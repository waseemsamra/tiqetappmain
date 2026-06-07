
-- Function to get or create the placeholder partner user and profile
create or replace function get_or_create_placeholder_partner()
returns uuid
language plpgsql
security definer
as $$
declare
  user_id uuid;
  user_email text := 'placeholder-partner@roamready.com';
begin
  -- Check if the user already exists in auth.users
  select id into user_id from auth.users where email = user_email;

  -- If the user does not exist, create them
  if user_id is null then
    user_id := auth.uid();
    insert into auth.users (id, email, encrypted_password, role, aud, instance_id, raw_app_meta_data, raw_user_meta_data)
    values (
      user_id,
      user_email,
      '$2a$10$XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', -- Placeholder password, will be invalid
      'authenticated',
      'authenticated',
      '00000000-0000-0000-0000-000000000000',
      '{"provider": "email", "providers": ["email"]}',
      '{"role": "partner", "full_name": "Placeholder Partner"}'
    );

    -- Also insert into our public profiles table
    insert into public.user_profiles (id, full_name, role)
    values (user_id, 'Placeholder Partner', 'partner');
  end if;

  -- Ensure a partner profile exists
  insert into public.partners (id, company_name, contact_email)
  values (user_id, 'Placeholder Partner Inc.', user_email)
  on conflict (id) do nothing;

  return user_id;
end;
$$;
