import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, Download, MapPin } from 'lucide-react'
import { profile } from '../data/profile'
import { hasLink } from './ui'

const ease = [0.22, 1, 0.36, 1] as const

/** The developer-flavoured visual: a request to "my own API" and its JSON reply. */
function ApiCard() {
  const reduce = useReducedMotion()
  const lines: { indent?: boolean; parts: [string, string][] }[] = [
    { parts: [['{', 'text-muted']] },
    { indent: true, parts: [['"name"', 'text-accent'], [': ', 'text-faint'], ['"Kwame Moses"', 'text-ink'], [',', 'text-faint']] },
    { indent: true, parts: [['"role"', 'text-accent'], [': ', 'text-faint'], ['"Java Backend Developer"', 'text-ink'], [',', 'text-faint']] },
    { indent: true, parts: [['"stack"', 'text-accent'], [': ', 'text-faint'], ['["Java", "Spring Boot", "MySQL"]', 'text-ink'], [',', 'text-faint']] },
    { indent: true, parts: [['"basedIn"', 'text-accent'], [': ', 'text-faint'], ['"Accra, Ghana"', 'text-ink'], [',', 'text-faint']] },
    { indent: true, parts: [['"status"', 'text-accent'], [': ', 'text-faint'], ['"learning_and_building"', 'text-ok']] },
    { parts: [['}', 'text-muted']] },
  ]

  return (
    <div
      className="w-full rounded-xl border border-line-strong bg-card/95 font-mono text-[0.75rem] leading-relaxed shadow-[0_24px_60px_-20px_rgb(0_0_0/0.7)] backdrop-blur sm:text-[0.8125rem]"
      aria-label="Illustration: an API request returning a JSON profile of Kwame Moses"
      role="img"
    >
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5">
        <p className="truncate">
          <span className="font-semibold text-ok">GET</span>{' '}
          <span className="text-muted">/api/v1/developers/</span>
          <span className="text-ink">kwame-moses</span>
        </p>
        <span className="shrink-0 rounded border border-ok/30 px-1.5 py-0.5 text-[0.6875rem] text-ok">
          200 OK
        </span>
      </div>
      <motion.pre
        className="overflow-hidden px-4 py-3.5 whitespace-pre-wrap break-words"
        initial={reduce ? false : 'hidden'}
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.09, delayChildren: 0.55 } } }}
      >
        {lines.map((line, i) => (
          <motion.span
            key={i}
            className={`block ${line.indent ? 'pl-4' : ''}`}
            variants={{
              hidden: { opacity: 0, x: -6 },
              show: { opacity: 1, x: 0, transition: { duration: 0.35, ease } },
            }}
          >
            {line.parts.map(([text, cls], j) => (
              <span key={j} className={cls}>
                {text}
              </span>
            ))}
            {i === lines.length - 1 && (
              <span className="ml-1 inline-block h-[1em] w-[0.5em] translate-y-[0.15em] animate-blink bg-accent/80" />
            )}
          </motion.span>
        ))}
      </motion.pre>
    </div>
  )
}

export default function Hero() {
  const reduce = useReducedMotion()
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease },
        }

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16 sm:pt-28"
    >
      <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-accent/[0.07] blur-[120px]"
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div>
          {profile.openToOpportunities && (
            <motion.p
              {...rise(0)}
              className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-surface/80 py-1.5 pr-3.5 pl-3 text-sm text-muted"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-50 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-ok" />
              </span>
              Open to opportunities
            </motion.p>
          )}

          <motion.p {...rise(0.05)} className="mb-3 text-sm font-medium tracking-[0.18em] text-accent">
            HELLO, I'M
          </motion.p>

          <motion.h1
            id="hero-heading"
            {...rise(0.1)}
            className="text-[clamp(3rem,2rem+5.5vw,5.75rem)] leading-[0.95] font-bold tracking-[-0.045em] text-ink"
          >
            {profile.name}
          </motion.h1>

          <motion.p
            {...rise(0.2)}
            className="mt-6 max-w-xl text-[clamp(1.25rem,1.05rem+0.8vw,1.625rem)] leading-snug font-medium tracking-[-0.015em] text-ink/90"
          >
            {profile.headline}
          </motion.p>

          <motion.p {...rise(0.28)} className="mt-5 max-w-xl text-muted">
            {profile.intro}
          </motion.p>

          <motion.div {...rise(0.36)} className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 font-semibold text-night transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              View My Projects
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg border border-line-strong bg-card/60 px-5 py-3 font-semibold text-ink transition-colors hover:border-ink/40"
            >
              Contact Me
            </a>
            {hasLink(profile.cvUrl) ? (
              <a
                href={profile.cvUrl}
                download
                className="inline-flex items-center gap-2 px-2 py-3 text-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
              >
                <Download size={17} aria-hidden="true" />
                Download CV
              </a>
            ) : (
              <span
                className="inline-flex items-center gap-2 px-2 py-3 text-faint"
                title="Add your CV file in src/data/profile.ts"
              >
                <Download size={17} aria-hidden="true" />
                CV coming soon
              </span>
            )}
          </motion.div>

          <motion.p {...rise(0.44)} className="mt-10 flex items-center gap-2 text-sm text-faint">
            <MapPin size={15} aria-hidden="true" />
            {profile.location}
          </motion.p>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none"
        >
          <figure className="relative ml-auto w-[82%] overflow-hidden rounded-2xl border border-line-strong bg-surface sm:w-[78%] lg:w-[88%]">
            <img
              src={profile.photo.src}
              alt={profile.photo.isPlaceholder ? 'Placeholder for a professional photo of Kwame Moses' : profile.photo.alt}
              width={480}
              height={600}
              className="aspect-[4/5] w-full object-cover"
              fetchPriority="high"
            />
          </figure>
          <div className="relative mt-5 ml-auto w-full sm:w-[78%] lg:w-[88%]">
            <ApiCard />
          </div>
        </motion.div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-faint transition-colors hover:text-ink lg:block"
      >
        <ArrowDown size={20} className="motion-safe:animate-bounce" />
      </a>
    </section>
  )
}
