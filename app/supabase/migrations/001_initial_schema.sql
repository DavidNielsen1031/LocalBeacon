-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users table (synced from Clerk)
create table if not exists users (
  id uuid primary key default uuid_generate_v4(),
  clerk_id text unique not null,
  email text,
  plan text default 'free' check (plan in ('free', 'solo', 'agency')),
  stripe_customer_id text,
  stripe_subscription_id text,
  created_at timestamptz default now()
);

-- Businesses table
create table if not exists businesses (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  name text not null,
  category text not null,
  primary_city text not null,
  primary_state text not null default '',
  service_areas text[] default '{}',
  phone text,
  website text,
  gbp_connected boolean default false,
  gbp_account_id text,
  created_at timestamptz default now()
);

-- Content items table
create table if not exists content_items (
  id uuid primary key default uuid_generate_v4(),
  business_id uuid references businesses(id) on delete cascade,
  type text not null check (type in ('gbp_post', 'service_page', 'review_response', 'blog_post')),
  status text default 'draft' check (status in ('draft', 'approved', 'published')),
  title text,
  body text,
  metadata jsonb default '{}',
  published_at timestamptz,
  created_at timestamptz default now()
);

-- Reviews table
create table if not exists reviews (
  id uuid primary key default uuid_generate_v4(),
  business_id uuid references businesses(id) on delete cascade,
  gbp_review_id text unique,
  author text,
  rating int check (rating between 1 and 5),
  comment text,
  responded boolean default false,
  response_draft text,
  created_at timestamptz default now()
);

-- Row Level Security
alter table users enable row level security;
alter table businesses enable row level security;
alter table content_items enable row level security;
alter table reviews enable row level security;

-- Users policies
create policy "Users can view own profile" on users
  for select using (clerk_id = current_setting('app.clerk_user_id', true));
create policy "Users can update own profile" on users
  for update using (clerk_id = current_setting('app.clerk_user_id', true));
create policy "Users can insert own profile" on users
  for insert with check (clerk_id = current_setting('app.clerk_user_id', true));

-- Businesses policies
create policy "Users can view own businesses" on businesses
  for select using (user_id in (select id from users where clerk_id = current_setting('app.clerk_user_id', true)));
create policy "Users can insert own businesses" on businesses
  for insert with check (user_id in (select id from users where clerk_id = current_setting('app.clerk_user_id', true)));
create policy "Users can update own businesses" on businesses
  for update using (user_id in (select id from users where clerk_id = current_setting('app.clerk_user_id', true)));
create policy "Users can delete own businesses" on businesses
  for delete using (user_id in (select id from users where clerk_id = current_setting('app.clerk_user_id', true)));

-- Content items policies
create policy "Users can manage own content" on content_items
  for all using (
    business_id in (
      select b.id from businesses b
      join users u on b.user_id = u.id
      where u.clerk_id = current_setting('app.clerk_user_id', true)
    )
  );

-- Reviews policies
create policy "Users can manage own reviews" on reviews
  for all using (
    business_id in (
      select b.id from businesses b
      join users u on b.user_id = u.id
      where u.clerk_id = current_setting('app.clerk_user_id', true)
    )
  );
