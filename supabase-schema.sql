-- Soul Compass - Supabase Schema
-- Run this in the Supabase SQL Editor

-- Conversations table
create table conversations (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  messages jsonb not null default '[]'::jsonb,
  preview text not null default '',
  message_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Journal entries table
create table journal_entries (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  content text not null,
  source_message_id text,
  conversation_id text references conversations(id) on delete set null,
  created_at timestamptz not null default now()
);

-- Indexes
create index conversations_user_id_idx on conversations(user_id);
create index conversations_updated_at_idx on conversations(user_id, updated_at desc);
create index journal_entries_user_id_idx on journal_entries(user_id);
create index journal_entries_created_at_idx on journal_entries(user_id, created_at desc);

-- Enable RLS
alter table conversations enable row level security;
alter table journal_entries enable row level security;

-- Conversations RLS policies
create policy "Users can view own conversations"
  on conversations for select using (auth.uid() = user_id);

create policy "Users can insert own conversations"
  on conversations for insert with check (auth.uid() = user_id);

create policy "Users can update own conversations"
  on conversations for update using (auth.uid() = user_id);

create policy "Users can delete own conversations"
  on conversations for delete using (auth.uid() = user_id);

-- User settings table
create table user_settings (
  user_id uuid primary key references auth.users(id) on delete cascade,
  question_mode text not null default 'single' check (question_mode in ('single', 'multiple')),
  updated_at timestamptz not null default now()
);

-- Enable RLS
alter table user_settings enable row level security;

-- User settings RLS policies
create policy "Users can view own settings"
  on user_settings for select using (auth.uid() = user_id);

create policy "Users can insert own settings"
  on user_settings for insert with check (auth.uid() = user_id);

create policy "Users can update own settings"
  on user_settings for update using (auth.uid() = user_id);

-- Journal entries RLS policies
create policy "Users can view own journal entries"
  on journal_entries for select using (auth.uid() = user_id);

create policy "Users can insert own journal entries"
  on journal_entries for insert with check (auth.uid() = user_id);

create policy "Users can delete own journal entries"
  on journal_entries for delete using (auth.uid() = user_id);
