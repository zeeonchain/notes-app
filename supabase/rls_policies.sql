-- Run this in the Supabase SQL Editor (Project → SQL Editor → New query)
-- This assumes you've already created the `notes` table with columns:
--   id (int8, primary key), user_id (uuid), title (text), body (text), created_at (timestamptz, default now())

-- 1. Turn on Row Level Security for the notes table.
-- Until you add policies below, RLS being on means NO ONE can read/write anything —
-- that's intentional; the policies are what open specific, safe access back up.
alter table public.notes enable row level security;

-- 2. Users can only see their own notes.
create policy "Users can view their own notes"
on public.notes
for select
using (auth.uid() = user_id);

-- 3. Users can only insert notes tagged with their own user id.
-- (This stops someone from creating a note and assigning it to a different user_id.)
create policy "Users can insert their own notes"
on public.notes
for insert
with check (auth.uid() = user_id);

-- 4. Users can only update their own notes.
create policy "Users can update their own notes"
on public.notes
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- 5. Users can only delete their own notes.
create policy "Users can delete their own notes"
on public.notes
for delete
using (auth.uid() = user_id);
