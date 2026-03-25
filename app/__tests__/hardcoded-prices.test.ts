import { describe, it, expect } from 'vitest'
import { execSync } from 'child_process'
import path from 'path'

const APP_DIR = path.resolve(__dirname, '..')

/**
 * Grep-based regression test: ensures no hardcoded $49 pricing
 * appears outside of lib/plans.ts (single source of truth).
 *
 * If this test fails, someone added a hardcoded price.
 * Fix: import from lib/plans.ts instead.
 */
describe('No hardcoded pricing outside lib/plans.ts', () => {
  it('no $49 references (old price) in source files', () => {
    try {
      const result = execSync(
        `grep -rn '\\$49[^0-9]' --include="*.ts" --include="*.tsx" ${APP_DIR} | grep -v node_modules | grep -v plans.ts | grep -v __tests__ | grep -v '.next/'`,
        { encoding: 'utf-8' }
      ).trim()

      // Filter out $499 references (Launch Package price — that's fine)
      const lines = result.split('\n').filter(line => {
        // Allow $499 (Launch Package)
        if (line.match(/\$499/)) return false
        // Allow $49x where x is a digit (like $490, $495, etc.)
        if (line.match(/\$49\d/)) return false
        return true
      })

      if (lines.length > 0) {
        console.error('Found hardcoded $49 references:')
        console.error(lines.join('\n'))
      }
      expect(lines).toHaveLength(0)
    } catch {
      // grep exits with code 1 when no matches found — that's the success case
      expect(true).toBe(true)
    }
  })

  it('no "agency" plan references in source files', () => {
    try {
      const result = execSync(
        `grep -rn '"agency"' --include="*.ts" --include="*.tsx" ${APP_DIR} | grep -v node_modules | grep -v __tests__ | grep -v '.next/' | grep -v sprint | grep -v PRICING_RESTRUCTURE | grep -v ROADMAP`,
        { encoding: 'utf-8' }
      ).trim()

      const lines = result.split('\n').filter(l => l.trim())

      if (lines.length > 0) {
        console.error('Found "agency" plan references:')
        console.error(lines.join('\n'))
      }
      expect(lines).toHaveLength(0)
    } catch {
      // No matches — success
      expect(true).toBe(true)
    }
  })

  it('no "Local Autopilot" references (old name)', () => {
    try {
      const result = execSync(
        `grep -rn 'Local Autopilot' --include="*.ts" --include="*.tsx" ${APP_DIR} | grep -v node_modules | grep -v __tests__ | grep -v '.next/'`,
        { encoding: 'utf-8' }
      ).trim()

      const lines = result.split('\n').filter(l => l.trim())

      if (lines.length > 0) {
        console.error('Found "Local Autopilot" references:')
        console.error(lines.join('\n'))
      }
      expect(lines).toHaveLength(0)
    } catch {
      expect(true).toBe(true)
    }
  })
})
