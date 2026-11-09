import { ArrowUpRight, FolderGit2, Plus } from 'lucide-react'
import type { Project } from '../data/projects'
import { GithubIcon, hasLink } from './ui'

function SourceButton({ url }: { url: string }) {
  if (hasLink(url)) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-lg border border-line-strong bg-surface px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-ink/40"
      >
        <GithubIcon className="h-4 w-4" />
        View Source Code
      </a>
    )
  }
  return (
    <span
      className="inline-flex cursor-not-allowed items-center gap-2 rounded-lg border border-dashed border-line-strong px-4 py-2.5 text-sm text-faint"
      title="Repository link not added yet"
    >
      <GithubIcon className="h-4 w-4" />
      Source code: link coming soon
    </span>
  )
}

function Workflow({ steps }: { steps: NonNullable<Project['workflow']> }) {
  return (
    <figure className="rounded-xl border border-line bg-surface/70 p-5 sm:p-6">
      <figcaption className="mb-5 text-sm text-faint">How a visit request moves through the system</figcaption>
      <ol className="relative space-y-5">
        <span aria-hidden="true" className="absolute top-3 bottom-3 left-[13px] w-px bg-line-strong" />
        {steps.map((step, i) => (
          <li key={step.actor} className="relative flex items-start gap-4">
            <span
              className={`relative z-10 grid h-7 w-7 shrink-0 place-items-center rounded-full border text-xs font-semibold ${
                i === steps.length - 1
                  ? 'border-accent bg-accent text-night'
                  : 'border-line-strong bg-card text-muted'
              }`}
            >
              {i + 1}
            </span>
            <div className="pt-0.5">
              <p className="leading-tight font-semibold text-ink">{step.actor}</p>
              <p className="text-sm text-muted">{step.action}</p>
            </div>
          </li>
        ))}
      </ol>
    </figure>
  )
}

export default function ProjectCard({
  project,
  onDetails,
}: {
  project: Project
  onDetails: (p: Project) => void
}) {
  if (project.placeholder) {
    return (
      <article className="flex h-full flex-col justify-between rounded-2xl border border-dashed border-line-strong p-7">
        <div>
          <span className="mb-5 grid h-10 w-10 place-items-center rounded-lg border border-dashed border-line-strong text-faint">
            <Plus size={18} aria-hidden="true" />
          </span>
          <p className="text-sm text-faint">{project.status}</p>
          <h3 className="mt-1 text-xl font-semibold text-muted">{project.title}</h3>
          <p className="mt-3 text-sm text-faint">{project.summary}</p>
        </div>
      </article>
    )
  }

  if (project.featured) {
    return (
      <article className="group overflow-hidden rounded-2xl border border-line bg-card transition-colors duration-300 hover:border-line-strong">
        <div className="grid gap-10 p-6 sm:p-9 lg:grid-cols-[1.25fr_1fr] lg:gap-12 lg:p-11">
          <div className="flex flex-col">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/5 px-3 py-1 text-xs font-medium text-amber-200">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-300" aria-hidden="true" />
                {project.status}
              </span>
              <span className="text-sm text-faint">{project.category}</span>
            </div>

            <h3 className="text-[clamp(1.5rem,1.2rem+1.2vw,2.125rem)] leading-tight font-semibold tracking-[-0.02em] text-ink">
              {project.title}
            </h3>
            <p className="mt-4 max-w-[60ch] text-muted">{project.summary}</p>

            <div className="mt-7">
              <h4 className="mb-3 text-sm font-medium text-faint">What I worked on</h4>
              <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
                {project.contributions.map((c) => (
                  <li key={c} className="flex items-start gap-2.5 text-[0.9375rem] text-ink/90">
                    <span className="mt-[0.6em] h-1 w-3 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <ul className="mt-7 flex flex-wrap gap-2" aria-label="Technologies used">
              {project.technologies.map((t) => (
                <li key={t} className="tag">
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3 lg:mt-auto lg:pt-8">
              <SourceButton url={project.sourceUrl} />
              <button
                type="button"
                onClick={() => onDetails(project)}
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-night transition-transform hover:-translate-y-px active:translate-y-0"
              >
                Project Details
                <ArrowUpRight size={16} aria-hidden="true" />
              </button>
              {hasLink(project.liveUrl) && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-2 py-2.5 text-sm font-semibold text-accent hover:underline"
                >
                  Live demo
                </a>
              )}
            </div>
          </div>

          {project.workflow && (
            <div className="lg:self-start">
              <Workflow steps={project.workflow} />
            </div>
          )}
        </div>
      </article>
    )
  }

  // Standard (non-featured) project card.
  return (
    <article className="flex h-full flex-col rounded-2xl border border-line bg-card p-7 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-line-strong">
      <span className="mb-5 grid h-10 w-10 place-items-center rounded-lg border border-line-strong bg-surface text-accent">
        <FolderGit2 size={18} aria-hidden="true" />
      </span>
      <p className="text-sm text-faint">{project.category}</p>
      <h3 className="mt-1 text-xl font-semibold text-ink">{project.title}</h3>
      <p className="mt-3 text-[0.9375rem] text-muted">{project.summary}</p>
      <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies used">
        {project.technologies.map((t) => (
          <li key={t} className="tag text-[0.8125rem]">
            {t}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-wrap gap-3 pt-6">
        <SourceButton url={project.sourceUrl} />
        <button
          type="button"
          onClick={() => onDetails(project)}
          className="inline-flex items-center gap-1.5 px-1 py-2.5 text-sm font-semibold text-accent hover:underline"
        >
          Project Details
        </button>
      </div>
    </article>
  )
}
