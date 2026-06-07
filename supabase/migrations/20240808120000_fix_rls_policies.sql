
-- Enable Row Level Security (RLS) on countries and cities tables
alter table public.countries enable row level security;
alter table public.cities enable row level security;

-- Drop existing policies if they exist to prevent errors on re-running
drop policy if exists "Allow public read access to all countries" on public.countries;
drop policy if exists "Allow public read access to all cities" on public.cities;

-- Create policies to allow public read access
create policy "Allow public read access to all countries"
on public.countries for select
using (true);

create policy "Allow public read access to all cities"
on public.cities for select
using (true);

-- Create a function to search across activities, cities, and countries for the admin dashboard
create or replace function search_activities_admin(search_term text)
returns table(id uuid) as $$
begin
  return query
    select a.id
    from activities a
    left join cities c on a.city_id = c.id
    left join countries co on a.country_code = co.code
    where
      a.name ilike '%' || search_term || '%' or
      c.name ilike '%' || search_term || '%' or
      co.name ilike '%' || search_term || '%';
end;
$$ language plpgsql;

