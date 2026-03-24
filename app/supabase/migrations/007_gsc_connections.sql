-- GSC connections table
-- Stores Google Search Console OAuth credentials per user
-- Used by /api/gsc/callback (upsert on connect) and /api/gsc/data (read refresh_token + sites)
create table if not exists gsc_connections (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade unique,
  refresh_token text not null,
  token_expiry timestamptz,
  sites text[] default '{}',
  connected_at timestamptz default now()
);

-- Row Level Security
alter table gsc_connections enable row level security;

create policy "Users can view own GSC connection" on gsc_connections
  for select using (
    user_id in (
      select id from users
      where clerk_id = current_setting('app.clerk_user_id', true)
    )
  );

create policy "Users can insert own GSC connection" on gsc_connections
  for insert with check (
    user_id in (
      select id from users
      where clerk_id = current_setting('app.clerk_user_id', true)
    )
  );

create policy "Users can update own GSC connection" on gsc_connections
  for update using (
    user_id in (
      select id from users
      where clerk_id = current_setting('app.clerk_user_id', true)
    )
  );

create policy "Users can delete own GSC connection" on gsc_connections
  for delete using (
    user_id in (
      select id from users
      where clerk_id = current_setting('app.clerk_user_id', true)
    )
  );

-- Indexes
CREATE INDEX IF NOT EXISTS idx_gsc_connections_user_id
  ON gsc_connections(user_id);
