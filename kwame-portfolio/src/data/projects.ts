/**
 * Projects shown in the "Selected Projects" section.
 *
 * To add a project, copy an object below and fill it in.
 * - `sourceUrl` / `liveUrl`: leave '' if not available. An empty sourceUrl shows
 *   "Source code — link coming soon"; an empty liveUrl shows no demo button at all.
 * - `placeholder: true` renders a clearly marked "details to be added" card.
 *   Delete placeholder entries once you have real projects to show.
 * - `workflow` (optional) draws the step-by-step flow diagram on the card.
 */

export type Project = {
  id: string
  title: string
  category: string
  status: string
  summary: string
  description: string[]
  technologies: string[]
  contributions: string[]
  workflow?: { actor: string; action: string }[]
  sourceUrl: string
  liveUrl: string
  featured?: boolean
  placeholder?: boolean
}

export const projects: Project[] = [
  {
    id: 'uhms',
    title: 'University Hostel Management System (UHMS)',
    category: 'Full-Stack Web Application | Backend Engineering',
    status: 'In Development / Local Project',
    summary:
      'A web-based system that replaces paper visitor logbooks with a structured digital workflow for requesting, approving and recording hostel visits.',
    description: [
      'Developed a web-based University Hostel Management System designed to digitize the traditional hostel visitor management and approval process.',
      'The system replaces manual visitor logbooks with a structured digital workflow that allows visitors to submit visit requests while students and hostel staff manage visitor approvals and records.',
      'The application is designed to improve visitor tracking, accountability, communication, and the overall hostel management process.',
    ],
    // Update the last entry with the exact frontend technologies you used.
    technologies: ['Java', 'Spring Boot', 'MySQL', 'REST APIs', 'HTML / CSS / JavaScript'],
    contributions: [
      'Backend architecture',
      'Database design',
      'API development',
      'Business logic implementation',
      'Authentication and role-based access',
      'Integration of application components',
    ],
    workflow: [
      { actor: 'Visitor', action: 'Submits a visit request' },
      { actor: 'Student', action: 'Reviews the request' },
      { actor: 'Hostel staff', action: 'Approves or declines' },
      { actor: 'System', action: 'Keeps the visit record' },
    ],
    sourceUrl: '', // add your GitHub repository URL here
    liveUrl: '', // not deployed yet — leave empty so no demo link is shown
    featured: true,
  },
  {
    id: 'placeholder-1',
    title: 'Next project',
    category: 'Details to be added',
    status: 'Placeholder',
    summary:
      'Placeholder card. Add your next project in src/data/projects.ts and remove this entry.',
    description: [],
    technologies: [],
    contributions: [],
    sourceUrl: '',
    liveUrl: '',
    placeholder: true,
  },
]
