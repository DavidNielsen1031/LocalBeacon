-- Migration 009: Pricing restructure
-- Removes Agency tier, adds billing_period column
-- Safe: uses IF NOT EXISTS / IF EXISTS guards

-- 1. Update plan constraint: remove 'agency', keep only 'free' and 'solo'
-- First migrate any existing agency users to solo (there are none, but safety first)
UPDATE users SET plan = 'solo' WHERE plan = 'agency';

-- Drop old constraint and add new one
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_plan_check;
ALTER TABLE users ADD CONSTRAINT users_plan_check CHECK (plan IN ('free', 'solo'));

-- 2. Add billing_period column for annual vs monthly tracking
ALTER TABLE users ADD COLUMN IF NOT EXISTS billing_period text DEFAULT 'monthly';
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_billing_period_check;
ALTER TABLE users ADD CONSTRAINT users_billing_period_check CHECK (billing_period IN ('monthly', 'annual'));

-- 3. Add dfy_purchased flag (may already exist from earlier migration attempt)
ALTER TABLE users ADD COLUMN IF NOT EXISTS dfy_purchased boolean DEFAULT false;
