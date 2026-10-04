-- Local copy of the Tiqets catalogue: tours (activities),
-- their variants, and the tag taxonomy linking them.
--
-- Apply via Supabase dashboard SQL editor, the CLI
-- (supabase db diff / migration up), or the Management
-- API database query endpoint.

create table if not exists public.tiqets_countries (
  id text primary key,
  name text not null,
  payload jsonb,
  synced_at timestamptz default now()
);

create table if not exists public.tiqets_cities (
  id text primary key,
  country_id text references public.tiqets_countries(id) on delete cascade,
  name text not null,
  payload jsonb,
  synced_at timestamptz default now()
);

create index if not exists tiqets_cities_country_id_idx
  on public.tiqets_cities (country_id);

alter table public.tiqets_countries enable row level security;
alter table public.tiqets_cities enable row level security;

create policy "anon read countries"
  on public.tiqets_countries for select to anon using (true);

create policy "anon read cities"
  on public.tiqets_cities for select to anon using (true);

create table if not exists public.tiqets_tags (
  id text primary key,
  name text not null,
  type_name text default '',
  type_id text default '',
  type_group_name text,
  created_at timestamptz default now()
);

create table if not exists public.tiqets_tours (
  id text primary key,
  name text not null,
  city text default '',
  country text default '',
  description text default '',
  price numeric default 0,
  currency text default 'USD',
  duration text,
  rating numeric default 0,
  reviews_total integer default 0,
  images text[] default '{}',
  product_ids text[] default '{}',
  tag_ids text[] default '{}',
  experience_url text,
  payload jsonb,
  synced_at timestamptz default now()
);

create table if not exists public.tiqets_variants (
  id text primary key,
  tour_id text references public.tiqets_tours(id) on delete cascade,
  tag_ids text[] default '{}',
  payload jsonb,
  synced_at timestamptz default now()
);

create index if not exists tiqets_tours_city_idx
  on public.tiqets_tours (city);

create index if not exists tiqets_tours_country_idx
  on public.tiqets_tours (country);

create index if not exists tiqets_tours_tag_ids_idx
  on public.tiqets_tours using gin (tag_ids);

create index if not exists tiqets_variants_tour_id_idx
  on public.tiqets_variants (tour_id);

alter table public.tiqets_tags enable row level security;
alter table public.tiqets_tours enable row level security;
alter table public.tiqets_variants enable row level security;

-- Public read access; the service role bypasses RLS, so
-- the sync script (service key) can insert and upsert.
create policy "anon read tags"
  on public.tiqets_tags for select to anon using (true);

create policy "anon read tours"
  on public.tiqets_tours for select to anon using (true);

create policy "anon read variants"
  on public.tiqets_variants for select to anon using (true);
