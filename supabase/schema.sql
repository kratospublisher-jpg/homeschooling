-- Homeschooling App - Supabase Database Schema
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor > New Query)

-- Children (learner profiles)
create table if not exists children (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  age integer not null,
  avatar text not null,
  level integer not null default 1,
  total_xp integer not null default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Daily progress (one row per child per day)
create table if not exists daily_progress (
  id uuid primary key default gen_random_uuid(),
  child_id uuid references children(id) on delete cascade,
  date date not null,
  total_questions integer default 0,
  total_correct integer default 0,
  xp integer default 0,
  subjects jsonb default '{}'::jsonb,
  start_time timestamptz default now(),
  updated_at timestamptz default now(),
  unique(child_id, date)
);

-- Cumulative topic progress (for long-term tracking)
create table if not exists topic_progress (
  id uuid primary key default gen_random_uuid(),
  child_id uuid references children(id) on delete cascade,
  subject text not null,
  topic text not null,
  attempts integer default 0,
  correct integer default 0,
  best_streak integer default 0,
  updated_at timestamptz default now(),
  unique(child_id, subject, topic)
);

-- Allow public access for this simple family app (PIN-gated at app level).
-- For production, you would enable Row Level Security with proper auth.
alter table children enable row level security;
alter table daily_progress enable row level security;
alter table topic_progress enable row level security;

-- Public read/write policies (simple family use)
create policy "public_children_all" on children for all using (true) with check (true);
create policy "public_daily_all" on daily_progress for all using (true) with check (true);
create policy "public_topic_all" on topic_progress for all using (true) with check (true);

-- Helpful index for date queries
create index if not exists idx_daily_child_date on daily_progress(child_id, date desc);
create index if not exists idx_topic_child on topic_progress(child_id);
