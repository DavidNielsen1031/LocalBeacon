-- Performance indexes for common query patterns

-- businesses.user_id is used in every per-user query
CREATE INDEX IF NOT EXISTS idx_businesses_user_id ON businesses(user_id);

-- content_items dashboard queries filter by business + type and business + date
CREATE INDEX IF NOT EXISTS idx_content_items_business_type
  ON content_items(business_id, type);

CREATE INDEX IF NOT EXISTS idx_content_items_business_created
  ON content_items(business_id, created_at DESC);

-- aeo_scans queries filter by business
CREATE INDEX IF NOT EXISTS idx_aeo_scans_business_id
  ON aeo_scans(business_id);

CREATE INDEX IF NOT EXISTS idx_aeo_scans_created_at
  ON aeo_scans(created_at DESC);
