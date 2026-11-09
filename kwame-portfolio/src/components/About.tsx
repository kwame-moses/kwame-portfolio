import { aboutParagraphs, profile } from '../data/profile'
import { Section, SectionHeading } from './ui'

const facts = [
  { label: 'Name', value: profile.name },
  { label: 'Location', value: profile.location },
  { label: 'University', value: profile.university },
  { label: 'Field', value: profile.field },
  { label: 'Specialization', value: profile.specialization },
  { label: 'Primary Language', value: profile.primaryLanguage },
]

export default function About() {
  const [lead, ...rest] = aboutParagraphs

  return (
    <Section id="about">
      <SectionHeading title="About Me" />
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div className="max-w-[65ch] space-y-5 text-muted">
          <p className="text-xl leading-relaxed text-ink">{lead}</p>
          {rest.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>

        <aside aria-label="Quick facts" className="lg:pt-1">
          <dl className="overflow-hidden rounded-2xl border border-line bg-card">
            {facts.map((f, i) => (
              <div
                key={f.label}
                className={`flex flex-col gap-0.5 px-6 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 ${
                  i > 0 ? 'border-t border-line' : ''
                }`}
              >
                <dt className="text-sm text-faint">{f.label}</dt>
                <dd className="font-medium text-ink sm:text-right">{f.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </Section>
  )
}
