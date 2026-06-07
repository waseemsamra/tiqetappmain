
-- 1. Create Partners and Agents Tables
create table if not exists public.partners (
  id uuid primary key references auth.users(id) on delete cascade,
  company_name text not null,
  contact_email text,
  website text,
  created_at timestamptz default now() not null
);

create table if not exists public.agents (
  id uuid primary key references auth.users(id) on delete cascade,
  agency_name text,
  commission_rate real not null default 0,
  referral_code text not null unique,
  created_at timestamptz default now() not null
);

-- 2. Modify Activities Table
alter table public.activities
  add column if not exists status text not null default 'pending_approval',
  add column if not exists partner_id uuid;

-- 3. Add Foreign Key Constraint from Activities to Partners
alter table public.activities
  add constraint fk_partner
  foreign key (partner_id)
  references public.partners(id) on delete set null;

-- 4. Create Helper Functions for Security
create or replace function public.is_admin()
returns boolean
language sql
security invoker
as $$
  select exists(
    select 1 from auth.users
    where id = auth.uid() and (raw_user_meta_data->>'role' = 'admin')
  );
$$;

create or replace function public.is_partner()
returns boolean
language sql
security invoker
as $$
  select exists(
    select 1 from auth.users
    where id = auth.uid() and (raw_user_meta_data->>'role' = 'partner')
  );
$$;

-- 5. Enable and Configure Row-Level Security
alter table public.activities enable row level security;

-- Drop existing policies if they exist, to prevent errors on re-run
drop policy if exists "Admins have full access" on public.activities;
drop policy if exists "Partners can manage their own activities" on public.activities;
drop policy if exists "Public can view active activities" on public.activities;

-- Create new policies
create policy "Admins have full access"
on public.activities
for all
using (public.is_admin())
with check (public.is_admin());

create policy "Partners can manage their own activities"
on public.activities
for all
using (
  public.is_partner() and
  partner_id = (select id from public.partners where id = auth.uid())
)
with check (
  public.is_partner() and
  partner_id = (select id from public.partners where id = auth.uid())
);

create policy "Public can view active activities"
on public.activities
for select
using (status = 'active');
