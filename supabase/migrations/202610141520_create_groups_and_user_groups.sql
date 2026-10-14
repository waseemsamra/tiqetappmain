-- Create groups table
create table if not exists public.groups (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  created_at timestamptz default now() not null
);

-- Create user_groups junction table
create table if not exists public.user_groups (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  group_id uuid not null references public.groups(id) on delete cascade,
  created_at timestamptz default now() not null,
  unique(user_id, group_id)
);

-- Enable Row Level Security
alter table public.groups enable row level security;
alter table public.user_groups enable row level security;

-- Policies for groups: admins can manage groups, others can view
create policy "Admins can manage groups"
on public.groups
for all
using (
  exists (
    select 1 from auth.users
    where id = auth.uid() and (raw_user_meta_data->>'role' = 'admin')
  )
)
with check (
  exists (
    select 1 from auth.users
    where id = auth.uid() and (raw_user_meta_data->>'role' = 'admin')
  )
);

-- Allow authenticated users to view groups (for dropdowns etc)
create policy "Authenticated users can view groups"
on public.groups
for select
using (true);

-- Policies for user_groups: admins can manage, users can view their own
create policy "Admins can manage user_groups"
on public.user_groups
for all
using (
  exists (
    select 1 from auth.users
    where id = auth.uid() and (raw_user_meta_data->>'role' = 'admin')
  )
)
with check (
  exists (
    select 1 from auth.users
    where id = auth.uid() and (raw_user_meta_data->>'role' = 'admin')
  )
);

-- Allow users to view their own group memberships
create policy "Users can view their own group memberships"
on public.user_groups
for select
using (auth.uid() = user_id);

-- Allow admins to view all user_groups
create policy "Admins can view all user_groups"
on public.user_groups
for select
using (
  exists (
    select 1 from auth.users
    where id = auth.uid() and (raw_user_meta_data->>'role' = 'admin')
  )
);
