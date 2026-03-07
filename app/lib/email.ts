import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

const FROM_EMAIL = 'LocalBeacon <hello@localbeacon.ai>'

interface WeeklyEmailData {
  to: string
  businessName: string
  postTitle: string
  postContent: string
  dashboardUrl: string
}

interface MonthlyEmailData {
  to: string
  businessName: string
  postsGenerated: number
  pagesCreated: number
  reviewsReplied: number
  aeoScore: number | null
  dashboardUrl: string
  month: string // e.g. "February 2026"
}

export async function sendWeeklyContentEmail(data: WeeklyEmailData) {
  if (!resend) {
    console.log('[email] Resend not configured, skipping weekly email')
    return { success: false, error: 'Resend not configured' }
  }

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: data.to,
      subject: `Your weekly Google post is ready — ${data.businessName}`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #2D3436;">
  <div style="text-align: center; margin-bottom: 32px;">
    <h2 style="color: #1B2A4A; margin: 0;">🔦 LocalBeacon</h2>
    <p style="color: #636E72; font-size: 14px; margin-top: 4px;">Weekly content for ${data.businessName}</p>
  </div>

  <div style="background: #FFF8F0; border: 1px solid #FFE0CC; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
    <h3 style="color: #1B2A4A; margin: 0 0 8px 0; font-size: 16px;">${data.postTitle}</h3>
    <p style="color: #2D3436; font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${data.postContent}</p>
  </div>

  <div style="text-align: center; margin-bottom: 32px;">
    <p style="color: #636E72; font-size: 14px; margin-bottom: 16px;">Copy this post and paste it into your Google Business Profile.</p>
    <a href="${data.dashboardUrl}/dashboard/queue" 
       style="display: inline-block; background: #FF6B35; color: white; font-weight: 700; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-size: 15px;">
      View in Dashboard →
    </a>
  </div>

  <div style="background: #FFF8F0; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
    <p style="color: #636E72; font-size: 13px; margin: 0 0 8px 0; font-weight: 600;">📋 How to post this (30 seconds):</p>
    <ol style="color: #636E72; font-size: 13px; margin: 0; padding-left: 20px; line-height: 1.8;">
      <li>Copy the post text above</li>
      <li>Go to <a href="https://business.google.com" style="color: #FF6B35;">business.google.com</a></li>
      <li>Click "Add update" and paste</li>
      <li>Hit Publish — done!</li>
    </ol>
  </div>

  <hr style="border: none; border-top: 1px solid #DFE6E9; margin: 24px 0;">
  <p style="color: #636E72; font-size: 12px; text-align: center;">
    You're receiving this because you're signed up at <a href="https://localbeacon.ai" style="color: #FF6B35;">LocalBeacon.ai</a>.<br>
    <a href="https://localbeacon.ai/dashboard/settings" style="color: #B2BEC3; font-size: 11px;">Unsubscribe from weekly emails</a>
  </p>
</body>
</html>`,
    })

    return { success: true, id: result.data?.id }
  } catch (error) {
    console.error('[email] Failed to send weekly email:', error)
    return { success: false, error: String(error) }
  }
}

interface AeoCheckResult {
  id: string
  label: string
  passed: boolean
  details: string
  fix: string
  weight: number
}

interface AeoReportEmailData {
  to: string
  url: string
  score: number
  checks: AeoCheckResult[]
}

function getGradeInfo(score: number): { grade: string; color: string; label: string } {
  if (score >= 90) return { grade: 'A', color: '#22c55e', label: 'Excellent — your business is AI-ready' }
  if (score >= 75) return { grade: 'B', color: '#84cc16', label: 'Good — a few gaps to close' }
  if (score >= 60) return { grade: 'C', color: '#eab308', label: 'Needs improvement — significant opportunities' }
  if (score >= 40) return { grade: 'D', color: '#f97316', label: 'Significant gaps — action needed' }
  return { grade: 'F', color: '#ef4444', label: 'Not AI-ready — but we can fix that' }
}

export async function sendAeoReportEmail(data: AeoReportEmailData) {
  if (!resend) {
    console.log('[email] Resend not configured, skipping AEO report email')
    return { success: false, error: 'Resend not configured' }
  }

  const { grade, color, label } = getGradeInfo(data.score)
  const failing = data.checks.filter(c => !c.passed).sort((a, b) => b.weight - a.weight)
  const passing = data.checks.filter(c => c.passed)
  const domain = data.url.replace(/^https?:\/\//, '').split('/')[0]

  const failingHtml = failing.length > 0
    ? failing.map(c => `
      <div style="background: #FFF5F3; border: 1px solid #F5C6BC; border-radius: 10px; padding: 16px; margin-bottom: 10px;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
          <span style="color: #ef4444; font-size: 16px;">✗</span>
          <strong style="color: #1B2A4A; font-size: 14px;">${c.label}</strong>
          <span style="background: #FEE2E2; color: #991B1B; font-size: 11px; padding: 2px 8px; border-radius: 9999px; font-weight: 600;">Weight: ${c.weight}</span>
        </div>
        <p style="color: #636E72; font-size: 13px; margin: 0 0 8px; line-height: 1.5;">${c.details}</p>
        <p style="color: #FF6B35; font-size: 13px; margin: 0; font-weight: 600;">Fix: ${c.fix}</p>
      </div>
    `).join('')
    : '<p style="color: #22c55e; font-weight: 600;">All checks passed!</p>'

  const passingHtml = passing.map(c => `
    <div style="display: flex; align-items: center; gap: 8px; padding: 8px 0; border-bottom: 1px solid #F0F0F0;">
      <span style="color: #22c55e; font-size: 14px;">✓</span>
      <span style="color: #1B2A4A; font-size: 13px;">${c.label}</span>
    </div>
  `).join('')

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: data.to,
      subject: `Your AI Readiness Report: ${data.score}/100 (Grade ${grade}) — ${domain}`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #2D3436; background: #FAFAF7;">
  <div style="text-align: center; margin-bottom: 32px;">
    <h2 style="color: #1B2A4A; margin: 0 0 4px;">🔦 LocalBeacon</h2>
    <p style="color: #636E72; font-size: 14px; margin: 0;">AI Readiness Report</p>
  </div>

  <div style="text-align: center; margin-bottom: 32px;">
    <p style="color: #636E72; font-size: 14px; margin: 0 0 16px;">Results for <strong style="color: #1B2A4A;">${domain}</strong></p>
    <div style="display: inline-block; background: white; border-radius: 16px; padding: 32px 48px; border: 2px solid ${color};">
      <div style="font-size: 48px; font-weight: 800; color: ${color}; line-height: 1;">${data.score}</div>
      <div style="font-size: 13px; color: #636E72; margin-top: 4px;">out of 100</div>
      <div style="margin-top: 8px; display: inline-block; background: ${color}20; color: ${color}; font-weight: 700; padding: 4px 16px; border-radius: 9999px; font-size: 14px;">
        Grade ${grade}
      </div>
    </div>
    <p style="color: #636E72; font-size: 14px; margin-top: 12px;">${label}</p>
  </div>

  ${failing.length > 0 ? `
  <div style="margin-bottom: 32px;">
    <h3 style="color: #1B2A4A; font-size: 16px; margin: 0 0 16px;">🔴 Needs attention (${failing.length} issue${failing.length !== 1 ? 's' : ''})</h3>
    ${failingHtml}
  </div>
  ` : ''}

  ${passing.length > 0 ? `
  <div style="margin-bottom: 32px;">
    <h3 style="color: #1B2A4A; font-size: 16px; margin: 0 0 12px;">🟢 Passing (${passing.length} signal${passing.length !== 1 ? 's' : ''})</h3>
    <div style="background: white; border-radius: 12px; padding: 8px 16px; border: 1px solid #DFE6E9;">
      ${passingHtml}
    </div>
  </div>
  ` : ''}

  <div style="text-align: center; background: #1B2A4A; border-radius: 12px; padding: 32px; margin-bottom: 24px;">
    <h3 style="color: white; margin: 0 0 8px; font-size: 16px;">Want LocalBeacon to fix these for you?</h3>
    <p style="color: rgba(255,255,255,0.6); font-size: 14px; margin: 0 0 16px;">We automate local SEO, AI optimization, and content — starting free.</p>
    <a href="https://localbeacon.ai/sign-up"
       style="display: inline-block; background: #FF6B35; color: white; font-weight: 700; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-size: 15px;">
      Get Started Free →
    </a>
  </div>

  <hr style="border: none; border-top: 1px solid #DFE6E9; margin: 24px 0;">
  <p style="color: #636E72; font-size: 12px; text-align: center;">
    You requested this report at <a href="https://localbeacon.ai/check" style="color: #FF6B35;">localbeacon.ai/check</a>.<br>
    Questions? Reply to this email or contact <a href="mailto:hello@localbeacon.ai" style="color: #FF6B35;">hello@localbeacon.ai</a>
  </p>
</body>
</html>`,
    })

    return { success: true, id: result.data?.id }
  } catch (error) {
    console.error('[email] Failed to send AEO report email:', error)
    return { success: false, error: String(error) }
  }
}

export async function sendMonthlyReportEmail(data: MonthlyEmailData) {
  if (!resend) {
    console.log('[email] Resend not configured, skipping monthly email')
    return { success: false, error: 'Resend not configured' }
  }

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: data.to,
      subject: `${data.month} Content Summary — ${data.businessName}`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #2D3436;">
  <div style="text-align: center; margin-bottom: 32px;">
    <h2 style="color: #1B2A4A; margin: 0;">🔦 LocalBeacon</h2>
    <p style="color: #636E72; font-size: 14px; margin-top: 4px;">${data.month} Report for ${data.businessName}</p>
  </div>

  <h3 style="color: #1B2A4A; margin-bottom: 16px;">Here's what we created for you this month:</h3>

  <div style="display: flex; gap: 12px; margin-bottom: 24px;">
    <div style="flex: 1; background: #FFF8F0; border-radius: 12px; padding: 20px; text-align: center;">
      <div style="font-size: 28px; font-weight: 800; color: #1B2A4A;">${data.postsGenerated}</div>
      <div style="font-size: 13px; color: #636E72;">Google Posts</div>
    </div>
    <div style="flex: 1; background: #FFF8F0; border-radius: 12px; padding: 20px; text-align: center;">
      <div style="font-size: 28px; font-weight: 800; color: #1B2A4A;">${data.pagesCreated}</div>
      <div style="font-size: 13px; color: #636E72;">City Pages</div>
    </div>
    <div style="flex: 1; background: #FFF8F0; border-radius: 12px; padding: 20px; text-align: center;">
      <div style="font-size: 28px; font-weight: 800; color: #1B2A4A;">${data.reviewsReplied}</div>
      <div style="font-size: 13px; color: #636E72;">Review Replies</div>
    </div>
  </div>

  ${data.aeoScore !== null ? `
  <div style="background: #F0FDF8; border: 1px solid #A7E8D1; border-radius: 12px; padding: 20px; margin-bottom: 24px; text-align: center;">
    <div style="font-size: 13px; color: #636E72; margin-bottom: 4px;">AI Readiness Score</div>
    <div style="font-size: 36px; font-weight: 800; color: #00795C;">${data.aeoScore}/100</div>
  </div>
  ` : ''}

  <div style="text-align: center; margin-bottom: 32px;">
    <a href="${data.dashboardUrl}/dashboard/reports" 
       style="display: inline-block; background: #FF6B35; color: white; font-weight: 700; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-size: 15px;">
      View Full Report →
    </a>
  </div>

  <hr style="border: none; border-top: 1px solid #DFE6E9; margin: 24px 0;">
  <p style="color: #636E72; font-size: 12px; text-align: center;">
    You're receiving this because you're signed up at <a href="https://localbeacon.ai" style="color: #FF6B35;">LocalBeacon.ai</a>.<br>
    <a href="https://localbeacon.ai/dashboard/settings" style="color: #B2BEC3; font-size: 11px;">Unsubscribe from monthly reports</a>
  </p>
</body>
</html>`,
    })

    return { success: true, id: result.data?.id }
  } catch (error) {
    console.error('[email] Failed to send monthly email:', error)
    return { success: false, error: String(error) }
  }
}
