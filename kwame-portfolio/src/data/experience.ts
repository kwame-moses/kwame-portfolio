/**
 * Professional experience and education.
 * Add responsibilities, dates or new roles here; the sections update automatically.
 * Leave `period` as '' to hide dates.
 */

export type ExperienceItem = {
  role: string
  organization: string
  department: string
  period: string
  description: string[]
  highlights: string[]
}

export const experience: ExperienceItem[] = [
  {
    role: 'IT Intern',
    organization: 'Kuapa Kokoo',
    department: 'Information Technology',
    period: '', // e.g. 'Jun 2025 – Aug 2025'
    description: [
      'Completed an internship within the Information Technology Department at Kuapa Kokoo, gaining practical exposure to IT operations and professional working environments.',
      'The experience contributed to my understanding of technical support, information technology operations, troubleshooting, and working within an organizational IT environment.',
    ],
    highlights: ['Technical support', 'IT operations', 'Troubleshooting'],
  },
]

export const education = {
  institution: 'University of Ghana',
  degree: 'Bachelor of Science in Computer Science',
  location: 'Accra, Ghana',
  period: '', // e.g. '2022 – present'
  areas: [
    'Programming',
    'Data Structures and Algorithms',
    'Database Systems',
    'Software Engineering',
    'Computer Networks',
    'System Design',
  ],
}
