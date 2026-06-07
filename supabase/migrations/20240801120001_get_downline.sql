
create
or replace function get_downline_for_agent (p_agent_id uuid) returns setof auth.users as $$
begin
  return query
  select u.*
  from auth.users u
  where u.id in (
    select b.user_id
    from public.referrals r
    join public.bookings b on r.booking_id = b.id
    where r.agent_id = p_agent_id
    and b.user_id is not null
  );
end;
$$ language plpgsql security definer;
