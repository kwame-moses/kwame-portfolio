import { currentlyLearning } from '../data/profile'
import { Section, SectionHeading } from './ui'

export default function CurrentlyLearning() {
  return (
    <Section id="learning" surface>
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.6fr] lg:gap-16">
        <div>
          <SectionHeading
            title="Currently Learning & Building"
            lede="What I am working on right now to become a stronger engineer."
          />
        </div>

        <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {currentlyLearning.map((item) => (
            <li key={item.title} className="bg-card p-6 transition-colors hover:bg-card-hover">
              <p className="flex items-center gap-2.5 font-semibold text-ink">
                <span className="h-2 w-2 rounded-sm bg-accent" aria-hidden="true" />
                {item.title}
              </p>
              <p className="mt-1.5 text-[0.9375rem] text-muted">{item.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
