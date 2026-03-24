-- Content queue table
-- Tracks scheduled/staged content items before they are posted
-- Used by /api/content-queue/[id] (PATCH to update status)
create table if not exists content_queue (
  id uuid primary key default uuid_generate_v4(),
  business_id uuid references businesses(id) on delete cascade,
  type text not null check (type in ('gbp_post', 'service_page', 'review_response', 'blog_post')),
  title text,
  content text,
  status text default 'draft' check (status in ('draft', 'ready', 'posted')),
  scheduled_for timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Row Level Security
alter table content_queue enable row level security;

create policy "Users can manage own content queue" on content_queue
  for all using (
    business_id in (
      select b.id from businesses b
      join users u on b.user_id = u.id
      where u.clerk_id = current_setting('app.clerk_user_id', true)
    )
  );

-- Indexes
CREATE INDEX IF NOT EXISTS idx_content_queue_business_id
  ON content_queue(business_id);

CREATE INDEX IF NOT EXISTS idx_content_queue_status_scheduled
  ON content_queue(status, scheduled_for);
