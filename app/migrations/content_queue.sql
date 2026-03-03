CREATE TABLE IF NOT EXISTS content_queue (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  type TEXT NOT NULL DEFAULT 'gbp_post',
  title TEXT,
  content TEXT NOT NULL,
  scheduled_for TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'ready' CHECK (status IN ('draft', 'ready', 'posted')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_content_queue_business ON content_queue(business_id);
CREATE INDEX idx_content_queue_status ON content_queue(status);
