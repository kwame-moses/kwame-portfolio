import { GraduationCap, MapPin } from 'lucide-react'
import { education } from '../data/experience'
import { Section, SectionHeading } from './ui'

export default function Education() {
  return (
    <Section id="education">
      <SectionHeading title="Education" />

      <article className="grid overflow-hidden rounded-2xl border border-line bg-card md:grid-cols-[1fr_1.2fr]">
        <div className="border-b border-line p-6 sm:p-8 md:border-r md:border-b-0">
          <span className="mb-6 grid h-11 w-11 place-items-center rounded-lg border border-line-strong bg-surface text-accent">
            <GraduationCap size={20} aria-hidden="true" />
          </span>
          <h3 className="text-2xl leading-tight font-semibold tracking-[-0.015em] text-ink">
            {education.institution}
          </h3>
          <p className="mt-2 text-ink/90">{education.degree}</p>
          <p className="mt-4 flex items-center gap-2 text-sm text-faint">
            <MapPin size={15} aria-hidden="true" />
            {education.location}
            {education.period && <span className="ml-2">{education.period}</span>}
          </p>
        </div>

        <div className="p-6 sm:p-8">
          <h4 className="mb-4 text-sm font-medium text-faint">Relevant academic areas</h4>
          <ul className="grid gap-x-6 sm:grid-cols-2">
            {education.areas.map((area) => (
              <li
                key={area}
                className="flex items-center gap-3 border-b border-line py-3 text-ink/90 last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                {area}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Section>
  )
}
