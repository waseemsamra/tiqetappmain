
create or replace function update_user_profile(
    user_id uuid,
    full_name text,
    phone text,
    emergency_contact_name text,
    emergency_contact_phone text,
    seat_preference text,
    dietary_restrictions text
)
returns void
language plpgsql
security definer
as $$
begin
    update public.profiles
    set
        full_name = update_user_profile.full_name,
        phone = update_user_profile.phone,
        emergency_contact_name = update_user_profile.emergency_contact_name,
        emergency_contact_phone = update_user_profile.emergency_contact_phone,
        seat_preference = update_user_profile.seat_preference,
        dietary_restrictions = update_user_profile.dietary_restrictions
    where
        id = update_user_profile.user_id;
end;
$$;
