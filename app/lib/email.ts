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

  <hr style="border: none; border-top: 1px solid #DFE6E9; margin: 24px 0;">
  <p style="color: #636E72; font-size: 12px; text-align: center;">
    You're receiving this because you're signed up at <a href="https://localbeacon.ai" style="color: #FF6B35;">LocalBeacon.ai</a>.
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
    You're receiving this because you're signed up at <a href="https://localbeacon.ai" style="color: #FF6B35;">LocalBeacon.ai</a>.
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
