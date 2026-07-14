# Notes App

A full-stack notes app: React + Vite + Tailwind on the frontend, Supabase for authentication and the database. Users sign up with email/password, and can create, read, update, and delete only their own notes — enforced at the database level with Row Level Security (RLS), not just in the app's code.

## What's inside

```
src/
  lib/supabase.js       - Supabase client, reads keys from .env
  components/Auth.jsx   - sign up / sign in form
  components/NotesApp.jsx - main dashboard, loads + manages notes
  components/NoteCard.jsx - a single note's display
  components/NoteForm.jsx - create/edit modal
supabase/
  rls_policies.sql      - run this in Supabase's SQL Editor
.env.example             - copy to .env and fill in your project keys
```

## 1. Set up Supabase

If you haven't already:
1. Go to [supabase.com](https://supabase.com), create a project.
2. In the Table Editor, create a `notes` table with columns:
   - `id` — `int8`, Primary Key
   - `user_id` — `uuid`
   - `title` — `text`
   - `body` — `text`
   - `created_at` — `timestamptz`, default `now()`
3. Go to **SQL Editor → New query**, paste in the contents of `supabase/rls_policies.sql`, and run it. This turns on Row Level Security and adds the policies that keep each user's notes private to them.
4. Go to **Settings → API** and copy your **Project URL** and **anon public key** — you'll need both next.

## 2. Configure environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

The anon key is safe to use in frontend code — it's designed to be public, and it's visible in your browser's dev tools no matter what you do. This is normal for every Supabase app. The actual protection comes from the RLS policies in the database, not from hiding this key.

**The key you must never put in frontend code** is Supabase's **service role key** (found in the same Settings → API page). That key bypasses Row Level Security entirely — anyone who gets hold of it can read or write any user's data. This app never uses it; only the public anon key goes into `.env`.

## 3. Install and run

```bash
npm install
npm run dev
```

Open the local URL Vite prints. You should see a sign-up/sign-in screen.

## 4. Try it out

- Sign up with an email and password. Depending on your Supabase project's auth settings, you may need to confirm your email before you can sign in (check your inbox, or turn off email confirmation in Supabase's Authentication settings while you're developing).
- Once signed in, click **+ New note** to create one.
- Notes show title, body, and creation date, and can be edited or deleted with the icons that appear on hover.
- Sign out, then sign up as a *second* user — you'll see that account has zero notes, confirming RLS is keeping accounts separate.

## How the security actually works

Row Level Security (RLS) is a Postgres feature — Supabase's database — that filters every query at the database level based on who's asking. Even if someone tampered with the frontend code and tried to directly query the `notes` table for someone else's data, the database itself would refuse, because the policies check `auth.uid() = user_id` on every read, insert, update, and delete. The frontend code never needs to filter by user manually — the database does it automatically and can't be bypassed from the client side.

## Build for production

```bash
npm run build
```

Deploy the resulting `dist/` folder to Vercel, Netlify, or any static host — same as any other Vite project. Just remember to add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as environment variables in your hosting provider's dashboard (not just your local `.env`), or the deployed build won't be able to connect to Supabase.
