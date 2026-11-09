import { Briefcase } from 'lucide-react'
import { experience } from '../data/experience'
import { Section, SectionHeading } from './ui'

export default function Experience() {
  return (
    <Section id="experience" surface>
      <SectionHeading title="Professional Experience" />

      <ol className="relative space-y-6 border-l border-line-strong pl-6 sm:pl-10">
        {experience.map((job) => (
          <li key={`${job.role}-${job.organization}`} className="relative">
            <span
              aria-hidden="true"
              className="absolute top-7 -left-[31px] grid h-3 w-3 place-items-center rounded-full border-2 border-accent bg-night sm:-left-[47px]"
            />
            <article className="rounded-2xl border border-line bg-card p-6 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-4">
                  <span className="hidden h-11 w-11 shrink-0 place-items-center rounded-lg border border-line-strong bg-surface text-accent sm:grid">
                    <Briefcase size={19} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-xl leading-tight font-semibold text-ink">
                      {job.role} <span className="text-faint">at</span> {job.organization}
                    </h3>
                    <p className="mt-1 text-sm text-muted">{job.department} Department</p>
                  </div>
                </div>
                {job.period && <p className="shrink-0 text-sm text-faint">{job.period}</p>}
              </div>

              <div className="mt-6 max-w-[68ch] space-y-4 text-muted">
                {job.description.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>

              {job.highlights.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-2" aria-label="Areas of exposure">
                  {job.highlights.map((h) => (
                    <li key={h} className="tag">
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          </li>
        ))}
      </ol>
    </Section>
  )
}
