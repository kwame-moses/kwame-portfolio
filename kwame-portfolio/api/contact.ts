/**
 * Contact form endpoint — runs as a Vercel Serverless Function at /api/contact.
 *
 * It validates the message and emails it to you through Resend (https://resend.com).
 * Required environment variables (set them in Vercel → Project → Settings → Environment Variables):
 *   RESEND_API_KEY      Your Resend API key (keep it secret; never put it in frontend code).
 *   CONTACT_TO_EMAIL    The inbox that should receive messages.
 * Optional:
 *   CONTACT_FROM_EMAIL  Sender, e.g. "Portfolio <hello@yourdomain.com>" once your domain is
 *                       verified in Resend. Defaults to Resend's test sender, which can only
 *                       deliver to the email address you signed up to Resend with.
 */
import type { VercelRequest, VercelResponse } from '@vercel/node'

type Payload = {
  name?: unknown
  email?: unknown
  subject?: unknown
  message?: unknown
  company?: unknown // honeypot
}

const LIMITS = { name: 100, email: 200, subject: 150, message: 5000 }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// Light per-instance rate limit: 5 messages per IP per 10 minutes.
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

function rateLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > MAX_PER_WINDOW
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '')

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Use POST to send a message.' })
  }

  const body: Payload = typeof req.body === 'string' ? safeParse(req.body) : (req.body ?? {})

  // Bots fill the hidden field; pretend success so they move on.
  if (str(body.company)) return res.status(200).json({ ok: true })

  const name = str(body.name)
  const email = str(body.email)
  const subject = str(body.subject)
  const message = str(body.message)

  if (name.length < 2 || !EMAIL_RE.test(email) || subject.length < 3 || message.length < 10) {
    return res.status(400).json({ error: 'Please fill in every field with a valid value.' })
  }
  if (
    name.length > LIMITS.name ||
    email.length > LIMITS.email ||
    subject.length > LIMITS.subject ||
    message.length > LIMITS.message
  ) {
    return res.status(400).json({ error: 'One of the fields is too long. Please shorten it.' })
  }

  const ip = String(req.headers['x-forwarded-for'] ?? '').split(',')[0].trim() || 'unknown'
  if (rateLimited(ip)) {
    return res.status(429).json({ error: 'Too many messages in a short time. Please try again later.' })
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>'

  if (!apiKey || !to) {
    console.error('Contact form is missing RESEND_API_KEY or CONTACT_TO_EMAIL.')
    return res
      .status(503)
      .json({ error: 'The contact form is not configured yet. Please reach out by email or LinkedIn.' })
  }

  const html = `
    <h2 style="margin:0 0 12px">New portfolio message</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
    <hr />
    <p style="white-space:pre-wrap">${escapeHtml(message)}</p>`

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `[Portfolio] ${subject}`,
        html,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
      }),
    })

    if (!r.ok) {
      console.error('Resend error', r.status, await r.text())
      return res.status(502).json({ error: 'The email service rejected the message. Please try again later.' })
    }
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Contact form failed', err)
    return res.status(500).json({ error: 'Something went wrong while sending. Please try again later.' })
  }
}

function safeParse(raw: string): Payload {
  try {
    return JSON.parse(raw) as Payload
  } catch {
    return {}
  }
}
