# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4 + shadcn/ui, Prisma ORM + Neon PostgreSQL, Framer Motion, next-themes (dark/light), Cloudinary (media), NextAuth.js (admin auth), Vercel (deploy).

## Users

Mixed audience: tech recruiters evaluating hire potential, potential clients assessing capability for freelance/contract work, and fellow developers discovering collaborators or learning from real implementations. Primary context: scanning on mobile or laptop, time-poor, comparing multiple candidates.

## Product Purpose

Personal portfolio and CMS platform for Elvien — a full-stack engineer. The portfolio proves engineering capability through live, working products rather than static screenshots or claims. Every showcased project links to a deployed, functioning application the visitor can use immediately. A built-in admin CMS allows Elvien to manage all content (projects, skills, certificates, education, profile) without redeployment.

## Positioning

Full-Stack Engineer who builds and ships production systems end-to-end. The differentiator is live proof over claims: every project entry links to a real deployed product, not a mockup or description. The portfolio itself is a demonstration of the same engineering quality it showcases.

## Operating Context

Visitors arrive from LinkedIn, GitHub, job applications, or direct referrals. They scan quickly — typically under 60 seconds on the landing page before deciding to explore or leave. Projects span POS systems, finance apps, corporate websites, AI integrations, and automation bots. GitHub activity (contribution calendar, recent commits) provides real-time proof of active development.

## Capabilities and Constraints

### Confirmed Features
- Public pages: Homepage (hero, featured projects, skills, CTA), About (bio, education timeline), Projects directory with detail pages, Certificates gallery with detail pages, Developer Dashboard (GitHub activity feed), Contact page
- Admin CMS: CRUD for projects, skills, certificates, education, profile settings with Cloudinary media uploads
- Auth: NextAuth.js credentials provider, JWT sessions, admin-only routes
- SEO: Dynamic metadata, OpenGraph, JSON-LD, sitemap, robots
- Theme: Persistent dark/light mode toggle
- Motion: Playful but professional animations throughout (Framer Motion)
- Responsive: Mobile-first, all breakpoints

### Constraints
- Single admin user (Elvien)
- No public user registration
- Content managed exclusively through admin dashboard
- All media hosted on Cloudinary

## Brand Commitments

- Name: Elvien / elviencode
- Existing assets: Profile photo, project screenshots, CV PDF, certificate scans, personal logo
- No existing color palette or typography commitment (open for new direction)

## Evidence on Hand

- 12+ live deployed projects with working demos across multiple domains
- GitHub profile with active contribution history
- Professional certificates with verified credential URLs
- CV/resume in PDF format
- Project screenshots and descriptions from existing portfolio (elvien.net)

Absences: no client testimonials yet, no press coverage, no case study write-ups beyond project descriptions.

## Product Principles

1. **Show, don't tell** — Every claim backed by a live, clickable demo. No vaporware.
2. **Respect the visitor's time** — Scannable hierarchy, fast load, clear navigation. Under 60 seconds to understand who Elvien is and what he builds.
3. **The portfolio is the proof** — The site itself demonstrates the same engineering quality it showcases. Clean code, good performance, polished UI.
4. **Content ownership** — All content managed through a built-in CMS. No dependency on third-party CMS platforms.
5. **Always current** — GitHub activity feed and easy CMS updates keep the portfolio a living document, not a static snapshot.

## Accessibility & Inclusion

WCAG AA compliance. Keyboard navigable. Sufficient color contrast in both light and dark modes. Reduced motion preference respected. Semantic HTML throughout.
