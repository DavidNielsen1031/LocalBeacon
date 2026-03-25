-- Migration 010: Outreach email tracking table
-- Tracks cold outreach emails for CAN-SPAM compliance and conversion tracking

CREATE TABLE IF NOT EXISTS outreach_emails (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  prospect_email TEXT NOT NULL,
  business_name TEXT NOT NULL,
  business_url TEXT,
  city TEXT,
  industry TEXT,
  template TEXT NOT NULL, -- 'competitor_fomo' | 'ai_invisible'
  score INTEGER,
  competitor_name TEXT,
  competitor_score INTEGER,
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  opened_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ,
  unsubscribed_at TIMESTAMPTZ,
  bounce_type TEXT, -- 'hard' | 'soft' | null
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Unsubscribe list (CAN-SPAM requirement)
CREATE TABLE IF NOT EXISTS outreach_unsubscribes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  unsubscribed_at TIMESTAMPTZ DEFAULT NOW(),
  reason TEXT
);

-- Index for checking unsubscribes before sending
CREATE INDEX IF NOT EXISTS idx_outreach_unsub_email ON outreach_unsubscribes(email);
-- Index for analytics
CREATE INDEX IF NOT EXISTS idx_outreach_emails_industry_city ON outreach_emails(industry, city);
CREATE INDEX IF NOT EXISTS idx_outreach_emails_template ON outreach_emails(template);
