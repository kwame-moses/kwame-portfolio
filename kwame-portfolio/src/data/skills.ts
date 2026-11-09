/**
 * Technical skills, grouped by category.
 * Add or remove items freely — the Skills section renders from this list.
 * `icon` must be one of the keys in src/components/Skills.tsx (iconMap).
 */

export type SkillGroup = {
  category: string
  icon: 'code' | 'server' | 'database' | 'wrench' | 'layers'
  note: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'Programming Languages',
    icon: 'code',
    note: 'Where the logic lives',
    skills: ['Java', 'SQL'],
  },
  {
    category: 'Backend Development',
    icon: 'server',
    note: 'Services, APIs and structure',
    skills: [
      'Spring Boot',
      'Spring Framework',
      'REST APIs',
      'Object-Oriented Programming',
      'Backend Architecture',
    ],
  },
  {
    category: 'Database Technologies',
    icon: 'database',
    note: 'Modelling and storing data',
    skills: ['MySQL', 'Database Design', 'SQL'],
  },
  {
    category: 'Development Tools',
    icon: 'wrench',
    note: 'Day-to-day environment',
    skills: ['IntelliJ IDEA', 'Visual Studio Code', 'Git', 'GitHub'],
  },
  {
    category: 'Other Areas',
    icon: 'layers',
    note: 'Foundations and practice',
    skills: [
      'Software Engineering',
      'Data Structures and Algorithms',
      'System Design',
      'Troubleshooting',
      'Technical Support',
    ],
  },
]
