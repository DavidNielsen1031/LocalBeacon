-- Sprint 10: Leads + Competitor Scans tables

-- Email leads from public AI Readiness Checker
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  url_scanned TEXT NOT NULL,
  score INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);

-- RLS: service role only (no public access)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Competitor AEO scans
CREATE TABLE IF NOT EXISTS competitor_scans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  competitor_url TEXT NOT NULL,
  score INTEGER,
  signals JSONB,
  scanned_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_competitor_scans_business ON competitor_scans(business_id);
CREATE INDEX idx_competitor_scans_url ON competitor_scans(competitor_url);

ALTER TABLE competitor_scans ENABLE ROW LEVEL SECURITY;

-- RLS policies for competitor_scans (users can see their own)
CREATE POLICY "Users can view own competitor scans" ON competitor_scans
  FOR SELECT USING (
    business_id IN (
      SELECT b.id FROM businesses b
      JOIN users u ON u.id = b.user_id
      WHERE u.clerk_id = auth.uid()::text
    )
  );
