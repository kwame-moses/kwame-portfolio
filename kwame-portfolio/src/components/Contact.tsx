import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CircleAlert, CircleCheck, LoaderCircle, Mail, MapPin, Send } from 'lucide-react'
import { profile } from '../data/profile'
import { GithubIcon, LinkedinIcon, Section, SectionHeading, hasLink } from './ui'

type Status =
  | { state: 'idle' }
  | { state: 'sending' }
  | { state: 'sent' }
  | { state: 'error'; message: string }

type Fields = { name: string; email: string; subject: string; message: string }
const empty: Fields = { name: '', email: '', subject: '', message: '' }

/** The form posts to the serverless function in /api/contact.ts (see README). */
const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || '/api/contact'

function validate(f: Fields): Partial<Record<keyof Fields, string>> {
  const errors: Partial<Record<keyof Fields, string>> = {}
  if (f.name.trim().length < 2) errors.name = 'Enter your full name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) errors.email = 'Enter a valid email address.'
  if (f.subject.trim().length < 3) errors.subject = 'Add a short subject.'
  if (f.message.trim().length < 10) errors.message = 'Write a message of at least 10 characters.'
  return errors
}

const inputClass =
  'w-full rounded-lg border bg-surface px-4 py-3 text-ink placeholder:text-faint transition-colors focus:border-accent focus:outline-none focus-visible:outline-none'

export default function Contact() {
  const [fields, setFields] = useState<Fields>(empty)
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({})
  const [status, setStatus] = useState<Status>({ state: 'idle' })
  const [honeypot, setHoneypot] = useState('')

  const update = (key: keyof Fields) => (e: { target: { value: string } }) => {
    setFields((f) => ({ ...f, [key]: e.target.value }))
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }))
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const found = validate(fields)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0]
      document.getElementById(`contact-${first}`)?.focus()
      return
    }

    setStatus({ state: 'sending' })
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fields, company: honeypot }),
      })
      const data = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) {
        throw new Error(
          data.error ||
            (res.status === 404
              ? 'The message could not be sent because the contact service is not running on this server.'
              : `The message could not be sent (error ${res.status}).`),
        )
      }
      setStatus({ state: 'sent' })
      setFields(empty)
    } catch (err) {
      const fallback = hasLink(profile.contact.email)
        ? ` You can email ${profile.contact.email} directly instead.`
        : ''
      const message =
        err instanceof TypeError
          ? 'The message could not be sent because the server could not be reached.'
          : err instanceof Error
            ? err.message
            : 'The message could not be sent.'
      setStatus({ state: 'error', message: message + fallback })
    }
  }

  const contactRows = [
    {
      icon: <Mail size={18} aria-hidden="true" />,
      label: 'Email',
      value: profile.contact.email || 'Email address coming soon',
      href: hasLink(profile.contact.email) ? `mailto:${profile.contact.email}` : '',
    },
    {
      icon: <LinkedinIcon className="h-[17px] w-[17px]" />,
      label: 'LinkedIn',
      value: hasLink(profile.contact.linkedin)
        ? profile.contact.linkedin.replace(/^https?:\/\/(www\.)?/, '')
        : 'Profile link coming soon',
      href: profile.contact.linkedin,
    },
    {
      icon: <GithubIcon className="h-[17px] w-[17px]" />,
      label: 'GitHub',
      value: hasLink(profile.contact.github)
        ? profile.contact.github.replace(/^https?:\/\/(www\.)?/, '')
        : 'Profile link coming soon',
      href: profile.contact.github,
    },
    {
      icon: <MapPin size={18} aria-hidden="true" />,
      label: 'Location',
      value: profile.location,
      href: '',
    },
  ]

  const fieldError = (key: keyof Fields) =>
    errors[key] ? (
      <p id={`contact-${key}-error`} className="mt-1.5 text-sm text-rose-300">
        {errors[key]}
      </p>
    ) : null

  const sending = status.state === 'sending'

  return (
    <Section id="contact">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
        <div>
          <SectionHeading
            title="Let's Build Something Together."
            lede="I am open to connecting with developers, recruiters, organizations, and professionals interested in software engineering and backend development."
          />

          <ul className="space-y-3">
            {contactRows.map((row) => {
              const live = hasLink(row.href)
              const inner = (
                <>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-line-strong bg-surface text-accent">
                    {row.icon}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm text-faint">{row.label}</span>
                    <span className={`block truncate ${live || row.label === 'Location' ? 'text-ink' : 'text-faint'}`}>
                      {row.value}
                    </span>
                  </span>
                </>
              )
              return (
                <li key={row.label}>
                  {live ? (
                    <a
                      href={row.href}
                      target={row.href.startsWith('mailto:') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 rounded-xl border border-transparent p-2 transition-colors hover:border-line hover:bg-card"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 p-2">{inner}</div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>

        <form
          noValidate
          onSubmit={onSubmit}
          aria-label="Contact form"
          className="relative rounded-2xl border border-line bg-card p-6 sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-ink">
                Full Name
              </label>
              <input
                id="contact-name"
                name="name"
                autoComplete="name"
                value={fields.name}
                onChange={update('name')}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'contact-name-error' : undefined}
                className={`${inputClass} ${errors.name ? 'border-rose-400/70' : 'border-line-strong'}`}
                placeholder="Your name"
              />
              {fieldError('name')}
            </div>
            <div>
              <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-ink">
                Email Address
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                value={fields.email}
                onChange={update('email')}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'contact-email-error' : undefined}
                className={`${inputClass} ${errors.email ? 'border-rose-400/70' : 'border-line-strong'}`}
                placeholder="you@example.com"
              />
              {fieldError('email')}
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="contact-subject" className="mb-2 block text-sm font-medium text-ink">
                Subject
              </label>
              <input
                id="contact-subject"
                name="subject"
                value={fields.subject}
                onChange={update('subject')}
                aria-invalid={!!errors.subject}
                aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                className={`${inputClass} ${errors.subject ? 'border-rose-400/70' : 'border-line-strong'}`}
                placeholder="What is this about?"
              />
              {fieldError('subject')}
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-ink">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={6}
                value={fields.message}
                onChange={update('message')}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
                className={`${inputClass} resize-y ${errors.message ? 'border-rose-400/70' : 'border-line-strong'}`}
                placeholder="Tell me a little about the opportunity or idea."
              />
              {fieldError('message')}
            </div>

            {/* Spam trap: hidden from people, often filled in by bots. */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor="contact-company">Company</label>
              <input
                id="contact-company"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 font-semibold text-night transition-[transform,opacity] hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {sending ? (
                <>
                  <LoaderCircle size={18} className="animate-spin" aria-hidden="true" />
                  Sending…
                </>
              ) : (
                <>
                  <Send size={17} aria-hidden="true" />
                  Send Message
                </>
              )}
            </button>
          </div>

          <div aria-live="polite" className="mt-5">
            <AnimatePresence mode="wait">
              {status.state === 'sent' && (
                <motion.p
                  key="sent"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-start gap-2.5 rounded-lg border border-ok/30 bg-ok/5 px-4 py-3 text-sm text-ink"
                >
                  <CircleCheck size={18} className="mt-0.5 shrink-0 text-ok" aria-hidden="true" />
                  Message sent. Thank you for reaching out; I will reply to the email address you provided.
                </motion.p>
              )}
              {status.state === 'error' && (
                <motion.p
                  key="error"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-start gap-2.5 rounded-lg border border-rose-400/30 bg-rose-400/5 px-4 py-3 text-sm text-ink"
                >
                  <CircleAlert size={18} className="mt-0.5 shrink-0 text-rose-300" aria-hidden="true" />
                  {status.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </form>
      </div>
    </Section>
  )
}
