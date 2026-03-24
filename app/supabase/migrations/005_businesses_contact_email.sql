-- Add contact_email column to businesses table
-- Required by all automated cron routes for email notifications
ALTER TABLE businesses ADD COLUMN IF NOT EXISTS contact_email text;

CREATE INDEX IF NOT EXISTS idx_businesses_contact_email
  ON businesses(contact_email)
  WHERE contact_email IS NOT NULL;

COMMENT ON COLUMN businesses.contact_email IS 'Primary contact email for automated reports and notifications';
