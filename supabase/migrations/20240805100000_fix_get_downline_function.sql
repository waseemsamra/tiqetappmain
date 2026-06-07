
create or replace function get_downline_users_for_agent(p_agent_id uuid)
returns table (user_id uuid) as $$
begin
  return query
  select b.user_id
  from public.referrals as r
  join public.bookings as b on r.booking_id = b.id
  where r.agent_id = p_agent_id
  and b.user_id is not null;
end;
$$ language plpgsql;
