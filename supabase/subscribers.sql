-- The Residency signups for tristianwalker.com.
--
-- Run once in the Supabase SQL editor of the project the site points at
-- (VITE_SUPABASE_URL). Safe to run again.
--
-- The public key can ADD a row and nothing else: it cannot read, change or
-- delete the list. The site posts with Prefer: return=minimal, so it never
-- needs to read the row back. Read the list in the dashboard or with the
-- service key.

create table if not exists public.subscribers (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name       text not null check (char_length(name) between 1 and 200),
  email      text not null check (char_length(email) between 3 and 320 and email like '%_@_%'),
  door       text check (door in ('reader', 'organizer', 'advisory')),
  source     text check (char_length(source) <= 200)
);

-- One row per address, whatever the capitalisation. A repeat signup returns
-- HTTP 409, which the form shows as "Already on the list."
create unique index if not exists subscribers_email_key on public.subscribers (lower(email));

alter table public.subscribers enable row level security;

revoke all on public.subscribers from anon, authenticated;
grant insert (name, email, door, source) on public.subscribers to anon, authenticated;
grant all on public.subscribers to service_role;

drop policy if exists subscribers_public_insert on public.subscribers;
create policy subscribers_public_insert on public.subscribers
  for insert to anon, authenticated
  with check (true);

-- Applied November 12, 2026 to project tristianwalker-web (skqokhaeowarshcvzxpl,
-- sarastrist-crypto's Org, us-east-1).
-- Check after running: expect anon_can_insert = true, anon_can_select = false.
-- The insert grant is per column, so has_table_privilege would report false.
-- select has_any_column_privilege('anon', 'public.subscribers', 'INSERT') as anon_can_insert,
--        has_table_privilege('anon', 'public.subscribers', 'SELECT') as anon_can_select;
