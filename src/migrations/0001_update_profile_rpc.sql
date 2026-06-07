
create or replace function public.update_user_profile(
    p_full_name text,
    p_phone text,
    p_emergency_contact_name text,
    p_emergency_contact_phone text,
    p_seat_preference text,
    p_dietary_restrictions text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid;
begin
  -- Get the user ID from the current session
  select auth.uid() into v_user_id;

  if v_user_id is null then
    raise exception 'User not authenticated';
  end if;

  -- Update the profiles table for the authenticated user
  update public.profiles
  set
    full_name = p_full_name,
    phone = p_phone,
    emergency_contact_name = p_emergency_contact_name,
    emergency_contact_phone = p_emergency_contact_phone,
    seat_preference = p_seat_preference,
    dietary_restrictions = p_dietary_restrictions
  where id = v_user_id;
end;
$$;

-- Grant execution rights to the 'authenticated' role
grant execute on function public.update_user_profile(text, text, text, text, text, text) to authenticated;
