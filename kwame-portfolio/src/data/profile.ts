/**
 * ─────────────────────────────────────────────────────────────
 *  PERSONAL DETAILS — edit this file to update the whole site.
 * ─────────────────────────────────────────────────────────────
 *
 * Any link left as an empty string ('') is treated as "not added yet":
 * the site shows a muted "coming soon" label instead of a broken link,
 * and hides it from the footer.
 */

import profilePhoto from '../assets/images/profile.jpeg'

export const profile = {
  name: 'Kwame Moses',
  initials: 'KM',
  title: 'Java Backend Developer | Software Engineer',
  headline: 'Java Backend Developer building practical software solutions.',
  intro:
    'I build backend systems using Java and Spring Boot, with a focus on clean architecture, database design, REST APIs, and solving real-world problems through software.',
  location: 'Accra, Ghana',
  university: 'University of Ghana',
  field: 'Computer Science',
  specialization: 'Backend Development',
  primaryLanguage: 'Java',

  /** Shown as the small status pill in the hero. Set to false to hide it. */
  openToOpportunities: true,

  /**
   * Profile photo. Replace src/assets/images/profile-placeholder.svg with
   * your own photo (e.g. profile.jpg) and update the import above.
   * Set `isPlaceholder` to false once it is your real photo.
   */
  photo: {
    src: profilePhoto,
    alt: 'Portrait of Kwame Moses',
    isPlaceholder: false,
  },

  /**
   * CV: put your PDF in the /public folder (e.g. public/Kwame-Moses-CV.pdf)
   * and set cvUrl to '/Kwame-Moses-CV.pdf'.
   */
  cvUrl: '',

  contact: {
    email: 'kwamemoses491@gmail.com',
    linkedin: 'https://www.linkedin.com/in/kwame-moses-506872335/',
    github: 'https://github.com/kwame-moses',
  },
} as const

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
] as const

export const aboutParagraphs = [
  'I am a Computer Science student at the University of Ghana and a Java Backend Developer focused on building practical software systems.',
  'My primary interest is backend engineering, particularly developing applications using Java, Spring Boot, MySQL, and REST APIs.',
  'I enjoy understanding how software works behind the scenes, from designing database structures and implementing business logic to developing APIs and managing application functionality.',
  'One of my major projects is a University Hostel Management System designed to digitize hostel visitor management and approval processes. Through this project, I have gained practical experience in backend architecture, database integration, API development, and building software around real-world challenges.',
  'I am continuously improving my technical abilities and working towards becoming a well-rounded software engineer.',
]

export const currentlyLearning = [
  { title: 'Java, in depth', detail: 'Deepening my Java programming knowledge.' },
  { title: 'Spring Boot', detail: 'Improving my Spring Boot skills.' },
  { title: 'Backend applications', detail: 'Building backend applications end to end.' },
  { title: 'Databases & SQL', detail: 'Strengthening database design and SQL skills.' },
  { title: 'Architecture', detail: 'Learning software architecture and system design.' },
  {
    title: 'Professional practice',
    detail: 'Improving my understanding of professional software development practices.',
  },
]
