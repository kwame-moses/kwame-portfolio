# Kwame Moses — Portfolio

Personal portfolio for Kwame Moses, Java Backend Developer.
Built with **React, TypeScript, Vite, Tailwind CSS, Framer Motion and Lucide icons**, with a
serverless contact-form endpoint ready for **Vercel**.

---

## 1. Run it locally

Requirements: [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install        # install dependencies (first time only)
npm run dev        # start the dev server at http://localhost:5173
```

Other commands:

| Command           | What it does                                         |
| ----------------- | ---------------------------------------------------- |
| `npm run build`   | Type-checks and builds the production site to `dist/` |
| `npm run preview` | Serves the production build locally                   |
| `npm run lint`    | Lints the code                                        |

> The contact form's email function (`api/contact.ts`) only runs on Vercel or with
> `vercel dev` (see section 4). With plain `npm run dev` the form shows a clear
> "contact service is not running" message instead of pretending to send.

---

## 2. Project structure

```
api/
  contact.ts              Serverless function that emails form messages (Resend)
public/
  favicon.svg, apple-touch-icon.png, og-image.png, robots.txt
src/
  components/             One component per section
    Navbar.tsx  Hero.tsx  About.tsx  Skills.tsx  Projects.tsx
    ProjectCard.tsx  ProjectDetails.tsx  Experience.tsx  Education.tsx
    CurrentlyLearning.tsx  Contact.tsx  Footer.tsx  ui.tsx
  data/                   ← all editable content lives here
    profile.ts            Name, intro, photo, CV, email and social links, learning list
    skills.ts             Skill groups
    projects.ts           Projects
    experience.ts         Work experience and education
  assets/images/          Profile photo
  hooks/useActiveSection.ts
  App.tsx  main.tsx  index.css (colour tokens and global styles)
```

---

## 3. Updating your content

You almost never need to touch the components. Edit the files in `src/data/`.

### Profile photo
1. Save a professional photo as `src/assets/images/profile.jpg`
   (portrait orientation, roughly 4:5, at least 800 × 1000 px; keep it under ~300 KB).
2. In `src/data/profile.ts`, change the import at the top:
   ```ts
   import profilePhoto from '../assets/images/profile.jpg'
   ```
3. In the same file set `photo.isPlaceholder` to `false`.

### Email, LinkedIn, GitHub
In `src/data/profile.ts` → `contact`:
```ts
contact: {
  email: 'you@example.com',
  linkedin: 'https://www.linkedin.com/in/your-handle',
  github: 'https://github.com/your-username',
},
```
Empty values show a muted "coming soon" label in the Contact section and are hidden from the footer,
so the site never shows broken links.

### CV
1. Put your PDF in `public/`, e.g. `public/Kwame-Moses-CV.pdf`.
2. In `src/data/profile.ts` set `cvUrl: '/Kwame-Moses-CV.pdf'`.
The hero's "CV coming soon" label becomes a working **Download CV** link.

### Projects
In `src/data/projects.ts`:
- **UHMS source code:** set `sourceUrl` to your repository URL; the button becomes "View Source Code".
- **Live demo:** only when it is really deployed, set `liveUrl`. While it is empty, no demo link appears.
- **Frontend tech:** update the last item in UHMS `technologies` to what you actually used.
- **Add a project:** copy an object, give it a unique `id`, fill it in. `featured: true` gives it the large
  layout; otherwise it appears as a card in the grid. An optional `workflow` array draws the step diagram.
- **Remove the placeholder:** delete the entry with `placeholder: true` once you have a real second project.

### Skills, experience, education, learning
- Skills → `src/data/skills.ts` (add or remove strings; `icon` is one of `code`, `server`, `database`, `wrench`, `layers`).
- Experience → `src/data/experience.ts` (`period` for dates, `highlights` for tags, extra paragraphs in `description`).
- Education → same file, `education` (add `period` if you want years shown).
- "Currently Learning & Building" → `currentlyLearning` in `src/data/profile.ts`.
- "Open to opportunities" badge → `openToOpportunities` in `src/data/profile.ts`.

### Colours and fonts
Defined once as tokens at the top of `src/index.css` (`--color-night`, `--color-accent`, and so on).

### Social preview image
`public/og-image.png` (1200 × 630) is used when the link is shared on LinkedIn, WhatsApp, X, etc.
After deploying, change `og:image` and `twitter:image` in `index.html` to the full URL,
e.g. `https://your-site.vercel.app/og-image.png`, since some platforms require absolute URLs.

---

## 4. Contact form setup (real email delivery)

The form sends a `POST` to `/api/contact`, a Vercel Serverless Function that validates the message,
filters bots (hidden honeypot field), rate-limits bursts, and emails it to you through
[Resend](https://resend.com). Replies go straight to the visitor (their address is set as *Reply-To*).

1. Create a free account at **resend.com** using the inbox where you want to receive messages.
2. Create an API key at **resend.com/api-keys**.
3. In Vercel → your project → **Settings → Environment Variables**, add:

   | Name                 | Value                                         | Required |
   | -------------------- | --------------------------------------------- | -------- |
   | `RESEND_API_KEY`     | your Resend API key                           | Yes      |
   | `CONTACT_TO_EMAIL`   | the inbox that receives messages              | Yes      |
   | `CONTACT_FROM_EMAIL` | e.g. `Portfolio <hello@yourdomain.com>`       | No       |

4. Redeploy (Deployments → ⋯ → Redeploy) so the variables take effect.

Notes:
- Without `CONTACT_FROM_EMAIL`, Resend's test sender `onboarding@resend.dev` is used. It can only deliver
  to the email address you signed up to Resend with, so make `CONTACT_TO_EMAIL` that same address.
  If you later buy a domain, verify it in Resend and set `CONTACT_FROM_EMAIL` to an address on it.
- If the variables are missing, the form tells visitors it is not configured yet. It never fakes success.
- Keys live only in Vercel's environment settings. Never put them in `src/` or commit a `.env` file
  (`.env*` files are already in `.gitignore`). See `.env.example` for the list.

**Testing the form locally:** install the Vercel CLI (`npm i -g vercel`), copy `.env.example` to
`.env.local` and fill it in, then run `vercel dev` instead of `npm run dev`.

---

## 5. Deploy to Vercel

1. Push this folder to a new GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Portfolio website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. Go to **vercel.com → Add New → Project**, import the repository.
   Vercel detects Vite automatically (build command `npm run build`, output `dist`; also set in `vercel.json`).
3. Add the environment variables from section 4, then click **Deploy**.
4. Every later `git push` to `main` redeploys the site automatically.
5. Optional: add a custom domain under **Settings → Domains**.

---

## 6. What's built in

- Sticky navigation with active-section highlighting and an accessible mobile menu
- Section reveal animations, hover states and a slow-moving hero grid, all disabled
  automatically for visitors who prefer reduced motion
- Project details dialog (keyboard accessible, closes with Esc)
- Contact form with inline validation, loading state and honest success/error messages
- Page title, meta description, Open Graph/Twitter cards, favicon, semantic landmarks,
  skip link, alt text, and colour contrast that meets WCAG AA
- Self-hosted fonts (Schibsted Grotesk, JetBrains Mono) for fast, privacy-friendly loading
