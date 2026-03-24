export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'

// Resend webhook events we care about
type ResendEvent = {
  type: 'email.sent' | 'email.delivered' | 'email.delivery_delayed' | 'email.complained' | 'email.bounced' | 'email.opened' | 'email.clicked'
  created_at: string
  data: {
    email_id: string
    from: string
    to: string[]
    subject: string
    created_at: string
    headers?: { name: string; value: string }[]
    tags?: { name: string; value: string }[]
    click?: { link: string; timestamp: string }
  }
}

export async function POST(req: NextRequest) {
  // Read raw body first — required for HMAC signature verification
  const body = await req.text()

  // Verify webhook signature using Svix HMAC
  const webhookSecret = process.env.RESEND_WEBHOOK_SECRET
  if (webhookSecret) {
    const svixId = req.headers.get('svix-id')
    const svixTimestamp = req.headers.get('svix-timestamp')
    const svixSignature = req.headers.get('svix-signature')

    if (!svixId || !svixTimestamp || !svixSignature) {
      console.error('[resend-webhook] Missing svix headers')
      return NextResponse.json({ error: 'Missing headers' }, { status: 401 })
    }

    try {
      const { Webhook } = await import('svix')
      const wh = new Webhook(webhookSecret)
      wh.verify(body, {
        'svix-id': svixId,
        'svix-timestamp': svixTimestamp,
        'svix-signature': svixSignature,
      })
    } catch (err) {
      console.error('[resend-webhook] Signature verification failed:', err)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }
  }

  const event: ResendEvent = JSON.parse(body)
  const { type, data } = event

  // Log every event for PostHog pipeline
  console.log(JSON.stringify({
    event: 'resend_webhook',
    type,
    email_id: data.email_id,
    to: data.to?.[0],
    subject: data.subject,
    link: type === 'email.clicked' ? data.click?.link : undefined,
    timestamp: event.created_at,
  }))

  // Track key events
  switch (type) {
    case 'email.bounced':
      console.log(JSON.stringify({
        event: 'email_bounced',
        to: data.to?.[0],
        subject: data.subject,
        timestamp: event.created_at,
      }))
      // TODO: Update Google Sheets CRM — mark prospect as bounced
      break

    case 'email.opened':
      console.log(JSON.stringify({
        event: 'email_opened',
        to: data.to?.[0],
        subject: data.subject,
        timestamp: event.created_at,
      }))
      // TODO: Update Google Sheets CRM — mark as opened
      break

    case 'email.clicked':
      console.log(JSON.stringify({
        event: 'email_clicked',
        to: data.to?.[0],
        subject: data.subject,
        link: data.click?.link,
        timestamp: event.created_at,
      }))
      // TODO: Update Google Sheets CRM — mark as clicked
      break

    case 'email.complained':
      console.log(JSON.stringify({
        event: 'email_complained',
        to: data.to?.[0],
        subject: data.subject,
        timestamp: event.created_at,
      }))
      // TODO: Add to suppression list
      break
  }

  return NextResponse.json({ received: true })
}
