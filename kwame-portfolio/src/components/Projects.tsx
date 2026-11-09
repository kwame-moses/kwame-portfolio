import { useCallback, useState } from 'react'
import { projects, type Project } from '../data/projects'
import ProjectCard from './ProjectCard'
import ProjectDetails from './ProjectDetails'
import { Section, SectionHeading } from './ui'

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)
  const close = useCallback(() => setSelected(null), [])

  const featured = projects.filter((p) => p.featured)
  const others = projects.filter((p) => !p.featured)

  return (
    <Section id="projects">
      <SectionHeading
        title="Selected Projects"
        lede="Software I have designed and built, with an honest note on where each project stands."
      />

      <div className="space-y-6">
        {featured.map((p) => (
          <ProjectCard key={p.id} project={p} onDetails={setSelected} />
        ))}

        {others.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {others.map((p) => (
              <ProjectCard key={p.id} project={p} onDetails={setSelected} />
            ))}
          </div>
        )}
      </div>

      <ProjectDetails project={selected} onClose={close} />
    </Section>
  )
}
