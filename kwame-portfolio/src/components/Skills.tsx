import { Code2, Database, Layers, Server, Wrench, type LucideIcon } from 'lucide-react'
import { skillGroups, type SkillGroup } from '../data/skills'
import { Section, SectionHeading } from './ui'

const iconMap: Record<SkillGroup['icon'], LucideIcon> = {
  code: Code2,
  server: Server,
  database: Database,
  wrench: Wrench,
  layers: Layers,
}

export default function Skills() {
  return (
    <Section id="skills" surface>
      <SectionHeading
        title="Technical Skills"
        lede="The languages, frameworks and tools I work with, grouped by where they sit in a backend project."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {skillGroups.map((group, i) => {
          const Icon = iconMap[group.icon]
          // Desktop: Backend gets the widest tile. Tablet: the last tile spans both columns.
          const isLast = i === skillGroups.length - 1
          const span = `${i === 1 ? 'lg:col-span-4' : 'lg:col-span-2'} ${
            isLast && skillGroups.length % 2 === 1 ? 'sm:col-span-2' : ''
          }`
          return (
            <article
              key={group.category}
              className={`rounded-2xl border border-line bg-card p-6 sm:p-7 ${span}`}
            >
              <div className="mb-5 flex items-start gap-3.5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-line-strong bg-surface text-accent">
                  <Icon size={19} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="leading-tight font-semibold text-ink">{group.category}</h3>
                  <p className="mt-0.5 text-sm text-faint">{group.note}</p>
                </div>
              </div>
              <ul className="flex flex-wrap gap-2" aria-label={group.category}>
                {group.skills.map((skill) => (
                  <li key={skill} className="tag">
                    {skill}
                  </li>
                ))}
              </ul>
            </article>
          )
        })}
      </div>
    </Section>
  )
}
