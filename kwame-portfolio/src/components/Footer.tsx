import { Mail } from 'lucide-react'
import { profile } from '../data/profile'
import { GithubIcon, LinkedinIcon, hasLink } from './ui'

export default function Footer() {
  const year = new Date().getFullYear()
  const links = [
    { label: 'GitHub', href: profile.contact.github, icon: <GithubIcon className="h-[18px] w-[18px]" /> },
    { label: 'LinkedIn', href: profile.contact.linkedin, icon: <LinkedinIcon className="h-[18px] w-[18px]" /> },
    {
      label: 'Email',
      href: hasLink(profile.contact.email) ? `mailto:${profile.contact.email}` : '',
      icon: <Mail size={18} aria-hidden="true" />,
    },
  ].filter((l) => hasLink(l.href))

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="font-medium text-ink">Designed &amp; Built by {profile.name}</p>
          <p className="mt-1 text-sm text-faint">
            © {year} {profile.name}. All rights reserved.
          </p>
        </div>
        {links.length > 0 && (
          <ul className="flex items-center gap-2">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target={l.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={l.label}
                  className="grid h-10 w-10 place-items-center rounded-lg border border-line-strong text-muted transition-colors hover:border-ink/40 hover:text-ink"
                >
                  {l.icon}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </footer>
  )
}
