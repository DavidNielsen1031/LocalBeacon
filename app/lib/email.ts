import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

const FROM_EMAIL = 'LocalBeacon.ai <hello@localbeacon.ai>'

interface WeeklyEmailData {
  to: string
  businessName: string
  postTitle: string
  postContent: string
  dashboardUrl: string
  subject?: string
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
      subject: data.subject ?? `Your weekly Google post is ready — ${data.businessName}`,
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

  // Severity-colored badges: High=red, Medium=orange, Low=yellow
  function severityBadge(weight: number): string {
    if (weight >= 7) return '<span style="background:#FEE2E2;color:#991B1B;font-size:10px;padding:2px 8px;border-radius:99px;font-weight:700;margin-left:6px;">High</span>'
    if (weight >= 5) return '<span style="background:#FFF3E0;color:#E65100;font-size:10px;padding:2px 8px;border-radius:99px;font-weight:700;margin-left:6px;">Medium</span>'
    return '<span style="background:#FFF9C4;color:#F57F17;font-size:10px;padding:2px 8px;border-radius:99px;font-weight:700;margin-left:6px;">Low</span>'
  }

  const failingHtml = failing.map((c, i) => `
    <tr>
      <td style="padding: 14px 16px;${i < failing.length - 1 ? ' border-bottom: 1px solid #FEE2E2;' : ''}">
        <strong style="color: #1B2A4A; font-size: 14px;">${c.label}</strong>
        ${severityBadge(c.weight)}
        <br><span style="color: #636E72; font-size: 13px; line-height: 1.6;">${c.details}</span>
        <br><span style="color: #FF6B35; font-size: 13px; font-weight: 600;">Fix: ${c.fix}</span>
      </td>
    </tr>
  `).join('')

  const passingHtml = passing.map((c, i) => `
    <tr>
      <td style="padding: 8px 16px;${i < passing.length - 1 ? ' border-bottom: 1px solid #F0F0F0;' : ''} color: #1B2A4A; font-size: 13px;">
        <span style="color: #22c55e; margin-right: 6px;">✓</span> ${c.label}
      </td>
    </tr>
  `).join('')

  // "What this means" copy based on score
  const whatThisMeans = data.score >= 75
    ? `Your website is doing well — AI assistants like ChatGPT, Google AI, and Perplexity can find key information about your business. Fix the remaining gaps below to reach full visibility.`
    : data.score >= 50
    ? `When customers ask AI assistants for a business like yours, you're partially visible — but your competitors who score higher will be recommended first. The fixes below are sorted by impact.`
    : `Right now, when customers ask ChatGPT, Siri, or Google AI to recommend a business like yours, <strong>you don't show up</strong>. Your competitors who have these signals in place will be recommended instead. The good news: every issue below is fixable.`

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: data.to,
      subject: `Your AI Readiness Report: ${data.score}/100 (Grade ${grade}) — ${domain}`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background: #F5F5F5; color: #2D3436;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #F5F5F5;">
    <tr><td align="center" style="padding: 24px 16px;">
      <table cellpadding="0" cellspacing="0" border="0" width="600" style="max-width: 600px; background: #FAFAF7; border-radius: 16px; overflow: hidden;">

        <!-- Header with Logo -->
        <tr><td style="background: #1B2A4A; padding: 28px 32px 12px; text-align: center;">
          <img src="https://localbeacon.ai/logo-192.png" alt="LocalBeacon.ai" width="48" height="48" style="display: inline-block; border-radius: 10px;" />
        </td></tr>
        <tr><td style="background: #1B2A4A; padding: 0 32px 4px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 22px; font-weight: 700;">LocalBeacon.ai</h1>
        </td></tr>
        <tr><td style="background: #1B2A4A; padding: 0 32px 8px; text-align: center;">
          <p style="color: rgba(255,255,255,0.6); margin: 0; font-size: 13px;">AI Readiness Report</p>
        </td></tr>

        <!-- Website URL Banner -->
        <tr><td style="background: #1B2A4A; padding: 8px 32px 28px; text-align: center;">
          <p style="color: rgba(255,255,255,0.5); font-size: 12px; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 1px;">Report for</p>
          <a href="${data.url}" style="color: #FF6B35; font-size: 18px; font-weight: 700; text-decoration: none;">${domain}</a>
        </td></tr>

        <!-- Score Card -->
        <tr><td style="padding: 32px; text-align: center;">
          <table cellpadding="0" cellspacing="0" border="0" align="center" style="border: 3px solid ${color}; border-radius: 16px; background: white;">
            <tr><td style="padding: 28px 48px; text-align: center;">
              <div style="font-size: 56px; font-weight: 800; color: ${color}; line-height: 1;">${data.score}</div>
              <div style="font-size: 14px; color: #636E72; margin-top: 4px;">out of 100</div>
              <div style="margin-top: 10px; background: ${color}; color: white; font-weight: 700; padding: 6px 20px; border-radius: 9999px; font-size: 15px; display: inline-block;">
                Grade ${grade}
              </div>
            </td></tr>
          </table>
          <p style="color: #636E72; font-size: 15px; margin-top: 16px; font-weight: 500;">${label}</p>
        </td></tr>

        <!-- What This Means -->
        <tr><td style="padding: 0 32px 24px;">
          <div style="background: #FFF8F0; border-left: 4px solid #FF6B35; border-radius: 0 8px 8px 0; padding: 16px 20px;">
            <p style="color: #1B2A4A; font-size: 14px; margin: 0; line-height: 1.6;">
              <strong>What this means:</strong> ${whatThisMeans}
            </p>
          </div>
        </td></tr>

        <!-- Scan Summary -->
        <tr><td style="padding: 0 32px 24px;">
          <table cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
              <td width="33%" style="text-align: center; padding: 16px; background: white; border-radius: 8px;">
                <div style="font-size: 24px; font-weight: 700; color: #1B2A4A;">${data.checks.length}</div>
                <div style="font-size: 12px; color: #636E72;">Signals Scanned</div>
              </td>
              <td width="4"></td>
              <td width="33%" style="text-align: center; padding: 16px; background: white; border-radius: 8px;">
                <div style="font-size: 24px; font-weight: 700; color: #22c55e;">${passing.length}</div>
                <div style="font-size: 12px; color: #636E72;">Passing</div>
              </td>
              <td width="4"></td>
              <td width="33%" style="text-align: center; padding: 16px; background: white; border-radius: 8px;">
                <div style="font-size: 24px; font-weight: 700; color: #ef4444;">${failing.length}</div>
                <div style="font-size: 12px; color: #636E72;">Need Fixing</div>
              </td>
            </tr>
          </table>
        </td></tr>

        ${failing.length > 0 ? `
        <!-- Failing Checks -->
        <tr><td style="padding: 0 32px 24px;">
          <h3 style="color: #1B2A4A; font-size: 16px; margin: 0 0 12px;">🔴 Needs Attention (${failing.length})</h3>
          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: white; border-radius: 12px; border: 1px solid #FEE2E2; overflow: hidden;">
            ${failingHtml}
          </table>
        </td></tr>
        ` : ''}

        ${passing.length > 0 ? `
        <!-- Passing Checks -->
        <tr><td style="padding: 0 32px 24px;">
          <h3 style="color: #1B2A4A; font-size: 16px; margin: 0 0 12px;">🟢 Passing (${passing.length})</h3>
          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: white; border-radius: 12px; border: 1px solid #DFE6E9; overflow: hidden;">
            ${passingHtml}
          </table>
        </td></tr>
        ` : ''}

        <!-- Primary CTA -->
        <tr><td style="padding: 0 32px 24px;">
          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #1B2A4A; border-radius: 12px;">
            <tr><td style="padding: 32px; text-align: center;">
              <h3 style="color: white; margin: 0 0 8px; font-size: 18px;">Want us to fix ${failing.length > 0 ? 'these' : 'future issues'} for you?</h3>
              <p style="color: rgba(255,255,255,0.6); font-size: 14px; margin: 0 0 20px; line-height: 1.5;">
                LocalBeacon.ai automates your local SEO and AI optimization.<br>
                Plans start at $49/mo. Or get a full done-for-you setup for $499.
              </p>
              <table cellpadding="0" cellspacing="0" border="0" align="center">
                <tr>
                  <td style="padding: 0 6px;">
                    <a href="https://localbeacon.ai/pricing" style="display: inline-block; background: #FF6B35; color: white; font-weight: 700; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-size: 15px;">
                      See Plans & Pricing →
                    </a>
                  </td>
                </tr>
              </table>
            </td></tr>
          </table>
        </td></tr>

        <!-- Secondary CTA -->
        <tr><td style="padding: 0 32px 24px; text-align: center;">
          <a href="https://localbeacon.ai/check" style="color: #FF6B35; font-size: 14px; font-weight: 600; text-decoration: none;">
            🔄 Re-scan ${domain} →
          </a>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding: 24px 32px; border-top: 1px solid #DFE6E9; text-align: center;">
          <p style="color: #636E72; font-size: 12px; margin: 0 0 8px; line-height: 1.6;">
            You requested this report at <a href="https://localbeacon.ai/check" style="color: #FF6B35;">localbeacon.ai/check</a>.<br>
            Questions? Reply to this email or contact <a href="mailto:hello@localbeacon.ai" style="color: #FF6B35;">hello@localbeacon.ai</a>
          </p>
          <p style="color: #B0B0B0; font-size: 11px; margin: 12px 0 0; line-height: 1.5;">
            LocalBeacon.ai · Burnsville, MN 55337<br>
            <a href="https://localbeacon.ai/unsubscribe" style="color: #B0B0B0;">Unsubscribe</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
    })

    return { success: true, id: result.data?.id }
  } catch (error) {
    console.error('[email] Failed to send AEO report email:', error)
    return { success: false, error: String(error) }
  }
}

export async function sendWelcomeEmail(data: { to: string; name: string }) {
  if (!resend) {
    console.log('[email] Resend not configured, skipping welcome email')
    return { success: false, error: 'Resend not configured' }
  }

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: data.to,
      subject: `Welcome to LocalBeacon, ${data.name}! 🔦`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #2D3436; background: #FAFAF7;">
  <div style="text-align: center; margin-bottom: 32px;">
    <h2 style="color: #1B2A4A; margin: 0 0 4px;">🔦 LocalBeacon</h2>
    <p style="color: #636E72; font-size: 14px; margin: 0;">AI visibility for local businesses</p>
  </div>

  <div style="background: white; border-radius: 12px; border: 1px solid #DFE6E9; padding: 32px; margin-bottom: 24px;">
    <h1 style="color: #1B2A4A; font-size: 22px; margin: 0 0 8px;">Welcome aboard, ${data.name}!</h1>
    <p style="color: #636E72; font-size: 15px; line-height: 1.6; margin: 0 0 24px;">
      You're all set. LocalBeacon will help your business show up when customers search on Google, ChatGPT, and beyond.
    </p>

    <p style="color: #1B2A4A; font-weight: 700; font-size: 15px; margin: 0 0 16px;">Here's what to do next:</p>

    <div style="display: flex; flex-direction: column; gap: 12px;">
      <div style="display: flex; align-items: flex-start; gap: 12px; background: #FFF8F0; border-radius: 8px; padding: 14px;">
        <span style="font-size: 20px; flex-shrink: 0;">🔍</span>
        <div>
          <p style="color: #1B2A4A; font-weight: 600; font-size: 14px; margin: 0 0 2px;">1. Run your free AI Readiness scan</p>
          <p style="color: #636E72; font-size: 13px; margin: 0;">See how visible your business is to AI search engines. Takes 10 seconds.</p>
        </div>
      </div>
      <div style="display: flex; align-items: flex-start; gap: 12px; background: #FFF8F0; border-radius: 8px; padding: 14px;">
        <span style="font-size: 20px; flex-shrink: 0;">🏪</span>
        <div>
          <p style="color: #1B2A4A; font-weight: 600; font-size: 14px; margin: 0 0 2px;">2. Set up your business profile</p>
          <p style="color: #636E72; font-size: 13px; margin: 0;">Add your details so we can write locally-targeted content for your area.</p>
        </div>
      </div>
      <div style="display: flex; align-items: flex-start; gap: 12px; background: #FFF8F0; border-radius: 8px; padding: 14px;">
        <span style="font-size: 20px; flex-shrink: 0;">📝</span>
        <div>
          <p style="color: #1B2A4A; font-weight: 600; font-size: 14px; margin: 0 0 2px;">3. Generate your first Google post</p>
          <p style="color: #636E72; font-size: 13px; margin: 0;">AI writes a post about your business — copy it to Google in 30 seconds.</p>
        </div>
      </div>
    </div>

    <div style="text-align: center; margin-top: 28px;">
      <a href="https://localbeacon.ai/dashboard"
         style="display: inline-block; background: #FF6B35; color: white; font-weight: 700; padding: 13px 32px; border-radius: 8px; text-decoration: none; font-size: 15px;">
        Go to Your Dashboard →
      </a>
    </div>
  </div>

  <hr style="border: none; border-top: 1px solid #DFE6E9; margin: 24px 0;">
  <p style="color: #636E72; font-size: 12px; text-align: center; line-height: 1.6;">
    You're receiving this because you signed up at <a href="https://localbeacon.ai" style="color: #FF6B35;">LocalBeacon.ai</a>.<br>
    Perpetual Agility LLC · Burnsville, MN 55337<br>
    <a href="https://localbeacon.ai/dashboard/settings" style="color: #B2BEC3; font-size: 11px;">Unsubscribe</a>
  </p>
</body>
</html>`,
    })

    return { success: true, id: result.data?.id }
  } catch (error) {
    console.error('[email] Failed to send welcome email:', error)
    return { success: false, error: String(error) }
  }
}

interface VisibilityAlertData {
  to: string
  businessName: string
  website: string
  schemaDisappeared: boolean
  llmsDisappeared: boolean
}

export async function sendVisibilityAlert(data: VisibilityAlertData) {
  if (!resend) {
    console.log('[email] Resend not configured, skipping visibility alert')
    return { success: false, error: 'Resend not configured' }
  }

  const missing: string[] = []
  if (data.schemaDisappeared) missing.push('Schema markup (JSON-LD)')
  if (data.llmsDisappeared) missing.push('llms.txt')
  const missingList = missing.map(m => `<li style="margin-bottom: 4px;">${m}</li>`).join('')
  const domain = data.website.replace(/^https?:\/\//, '').split('/')[0]

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: data.to,
      subject: `⚠️ AI visibility issue detected — ${data.businessName}`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #2D3436; background: #FAFAF7;">
  <div style="text-align: center; margin-bottom: 32px;">
    <h2 style="color: #1B2A4A; margin: 0 0 4px;">🔦 LocalBeacon</h2>
    <p style="color: #636E72; font-size: 14px; margin: 0;">Visibility Monitor Alert</p>
  </div>

  <div style="background: #FFF5F3; border: 1px solid #F5C6BC; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
    <h2 style="color: #C0392B; margin: 0 0 8px; font-size: 18px;">⚠️ AI visibility signals went missing</h2>
    <p style="color: #2D3436; font-size: 15px; margin: 0 0 16px;">
      Our weekly scan detected that <strong>${data.businessName}</strong> (${domain}) is now missing signals that were previously detected:
    </p>
    <ul style="color: #C0392B; font-size: 14px; margin: 0; padding-left: 20px; line-height: 1.8;">
      ${missingList}
    </ul>
    <p style="color: #636E72; font-size: 13px; margin-top: 12px;">
      These signals help AI assistants like ChatGPT, Perplexity, and Google AI find and recommend your business. Missing them can reduce your AI visibility.
    </p>
  </div>

  <div style="background: white; border-radius: 12px; border: 1px solid #DFE6E9; padding: 20px; margin-bottom: 24px;">
    <h3 style="color: #1B2A4A; font-size: 15px; margin: 0 0 12px;">What to do</h3>
    ${data.schemaDisappeared ? `
    <div style="margin-bottom: 12px;">
      <strong style="color: #1B2A4A; font-size: 14px;">Schema markup removed:</strong>
      <p style="color: #636E72; font-size: 13px; margin: 4px 0 0;">
        Check if a website update removed your JSON-LD schema block. You can restore it from your LocalBeacon dashboard under Schema Settings.
      </p>
    </div>` : ''}
    ${data.llmsDisappeared ? `
    <div style="margin-bottom: 12px;">
      <strong style="color: #1B2A4A; font-size: 14px;">llms.txt removed:</strong>
      <p style="color: #636E72; font-size: 13px; margin: 4px 0 0;">
        Your llms.txt file (${data.website}/llms.txt) is no longer accessible. Re-upload it from your LocalBeacon dashboard.
      </p>
    </div>` : ''}
  </div>

  <div style="text-align: center; margin-bottom: 24px;">
    <a href="https://localbeacon.ai/dashboard/ai-readiness"
       style="display: inline-block; background: #FF6B35; color: white; font-weight: 700; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-size: 15px;">
      Run a Full Scan →
    </a>
  </div>

  <hr style="border: none; border-top: 1px solid #DFE6E9; margin: 24px 0;">
  <p style="color: #636E72; font-size: 12px; text-align: center; line-height: 1.6;">
    You're receiving this monitoring alert because you're on a LocalBeacon Solo or Agency plan.<br>
    <a href="https://localbeacon.ai/dashboard/settings" style="color: #B2BEC3; font-size: 11px;">Manage notification preferences</a>
  </p>
</body>
</html>`,
    })

    return { success: true, id: result.data?.id }
  } catch (error) {
    console.error('[email] Failed to send visibility alert:', error)
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
