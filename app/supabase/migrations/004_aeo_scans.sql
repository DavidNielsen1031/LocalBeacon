-- AEO Scans table for scan history and trend tracking
CREATE TABLE IF NOT EXISTS aeo_scans (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  business_id uuid REFERENCES businesses(id) ON DELETE SET NULL,
  url text NOT NULL,
  score integer NOT NULL,
  passed integer NOT NULL DEFAULT 0,
  failed integer NOT NULL DEFAULT 0,
  checks jsonb DEFAULT '[]',
  rules_version text,
  scanned_at timestamptz DEFAULT now()
);

ALTER TABLE aeo_scans ENABLE ROW LEVEL SECURITY;

-- Service role can do everything (used by API routes)
CREATE POLICY "Service role can manage aeo_scans" ON aeo_scans
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

-- Users can read their own scans
CREATE POLICY "Users can read own aeo_scans" ON aeo_scans
  FOR SELECT USING (
    user_id IN (
      SELECT id FROM users WHERE clerk_id = current_setting('app.clerk_user_id', true)
    )
  );

CREATE INDEX IF NOT EXISTS aeo_scans_url_idx ON aeo_scans(url);
CREATE INDEX IF NOT EXISTS aeo_scans_user_id_idx ON aeo_scans(user_id);
CREATE INDEX IF NOT EXISTS aeo_scans_scanned_at_idx ON aeo_scans(scanned_at DESC);
CREATE INDEX IF NOT EXISTS aeo_scans_business_id_idx ON aeo_scans(business_id);
