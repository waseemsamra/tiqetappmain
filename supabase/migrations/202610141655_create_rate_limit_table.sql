-- Rate limiting table for login attempts
create table if not exists public.login_attempts (
  id bigserial primary key,
  ip_address inet not null,
  attempts integer not null default 0,
  first_attempt timestamptz,
  last_attempt timestamptz default now(),
  blocked_until timestamptz null
);

-- Index for quick lookups
create index if not exists idx_login_attempts_ip on public.login_attempts(ip_address);
create index if not exists idx_login_attempts_blocked on public.login_attempts(blocked_until) where blocked_until is not null;

-- Enable Row Level Security
alter table public.login_attempts enable row level security;

-- Allow anyone to insert (for recording attempts)
create policy "Anyone can insert login attempts"
on public.login_attempts
for insert
using (true)
with check (true);

-- Allow users to view their own attempts (by IP) - optional
create policy "Users can view own login attempts"
on public.login_attempts
for select
using (
  cidr_host(inet_client_ip(), 0) = ip_address
);
