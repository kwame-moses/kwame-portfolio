import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import type { Project } from '../data/projects'

/** Accessible modal with the full write-up for a project. */
export default function ProjectDetails({
  project,
  onClose,
}: {
  project: Project | null
  onClose: () => void
}) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const lastFocused = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!project) return
    lastFocused.current = document.activeElement as HTMLElement
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      // Keep keyboard focus inside the dialog.
      if (e.key === 'Tab') {
        const dialog = document.getElementById('project-dialog')
        const focusables = dialog?.querySelectorAll<HTMLElement>('a[href], button')
        if (!focusables || focusables.length === 0) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      lastFocused.current?.focus()
    }
  }, [project, onClose])

  // Rendered into <body> so it is never clipped or offset by animated parents.
  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-night/80 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            id="project-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
            className="max-h-[90svh] w-full max-w-2xl overflow-y-auto rounded-t-2xl border border-line-strong bg-card sm:rounded-2xl"
            initial={{ y: 32, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 flex items-start justify-between gap-4 border-b border-line bg-card px-6 py-5 sm:px-8">
              <div>
                <p className="text-sm text-faint">{project.category}</p>
                <h3 id="project-dialog-title" className="mt-1 text-xl leading-snug font-semibold text-ink">
                  {project.title}
                </h3>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line-strong text-muted hover:text-ink"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-8 px-6 py-7 sm:px-8">
              <p className="inline-flex rounded-full border border-amber-400/30 bg-amber-400/5 px-3 py-1 text-xs font-medium text-amber-200">
                Status: {project.status}
              </p>

              {project.description.length > 0 && (
                <div className="space-y-4 text-muted">
                  {project.description.map((p) => (
                    <p key={p.slice(0, 24)}>{p}</p>
                  ))}
                </div>
              )}

              {project.contributions.length > 0 && (
                <div>
                  <h4 className="mb-3 font-semibold text-ink">My contributions</h4>
                  <ul className="space-y-2">
                    {project.contributions.map((c) => (
                      <li key={c} className="flex items-start gap-2.5 text-muted">
                        <span className="mt-[0.65em] h-1 w-3 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.technologies.length > 0 && (
                <div>
                  <h4 className="mb-3 font-semibold text-ink">Technologies</h4>
                  <ul className="flex flex-wrap gap-2">
                    {project.technologies.map((t) => (
                      <li key={t} className="tag">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {!project.liveUrl && (
                <p className="rounded-lg border border-line bg-surface px-4 py-3 text-sm text-muted">
                  This project runs locally and has not been deployed publicly yet, so there is no
                  live demo.
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
