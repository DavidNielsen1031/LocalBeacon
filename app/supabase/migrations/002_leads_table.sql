CREATE TABLE IF NOT EXISTS leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL,
  url_scanned text,
  score integer,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Service role can insert (from API route)
CREATE POLICY "Service role can insert leads" ON leads
  FOR INSERT TO service_role
  WITH CHECK (true);

-- Service role can read leads
CREATE POLICY "Service role can read leads" ON leads
  FOR SELECT TO service_role
  USING (true);
