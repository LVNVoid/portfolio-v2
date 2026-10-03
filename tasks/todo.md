# Task Breakdown — Portfolio v2 (The Specimen Cabinet)

## S1: Foundation & Scaffold
- [x] T1.1 — Project Init & Dependencies (Next.js 16, TypeScript, Tailwind CSS v4, shadcn/ui setup)
- [x] T1.2 — Prisma Schema & Database (Models: User, Profile, Project, Skill, Education, Certificate, seed script)
- [x] T1.3 — Auth Setup (NextAuth.js, JWT credentials provider, middleware route guards, login page)
- [x] T1.4 — Root Layout, Theme & Global Styles (Specimen Cabinet tokens: linen, brass, green, ink; theme toggle; font loading)

---

## 🛑 CHECKPOINT 1 — Foundation Review
✅ Build passes, TypeScript strict passes, auth configured, theme toggles with persistent state.

---

## S2: Projects (Core Specimen System)
- [x] T2.1 — Schemas & Types (project-schema.ts, api.ts)
- [x] T2.2 — Project Service & Queries (project-service.ts)
- [x] T2.3 — Project Server Actions (project-actions.ts CRUD with auth guard)
- [x] T2.4 — Specimen UI Components (specimen-card, vitrine-hero, architecture-diagram, sparkline, data-ticker, taxonomy-filter, collection-grid)
- [x] T2.5 — Public Project Pages (Homepage hero, /projects collection, /projects/[slug] detail)

---

## 🛑 CHECKPOINT 2 — Core Specimen System Review
✅ Homepage vitrine renders featured specimen, collection page filters by taxonomy, dynamic detail page displays architectural topology and live endpoint CTA.

---

## S3: Profile, Skills & About Page
- [x] T3.1 — Profile & Skill Schemas + Services (profile-schema, skill-schema, profile-service, skill-service)
- [x] T3.2 — About Page ("Field Notes" narrative, skills taxonomy grid, academic background)

---

## S4: Certificates
- [x] T4.1 — Certificate Schema + Service + Actions (certificate-schema, certificate-service, certificate-actions)
- [x] T4.2 — Certificates Pages ("Credentials" gallery at /certificates, detail dossier at /certificates/[slug])

---

## S5: Education
- [x] T5.1 — Education Schema + Service + Actions (education-schema, education-service, education-actions)

---

## S6: Dashboard ("Laboratory")
- [x] T6.1 — GitHub Service (REST API integration, telemetry caching)
- [x] T6.2 — Dashboard Page (telemetry dials, live commit event stream)

---

## S7: Contact ("Inquiries Desk")
- [x] T7.1 — Contact Form & Page (contact-schema, contact-actions, React Hook Form + Zod validation, dispatch coordinates)

---

## 🛑 CHECKPOINT 3 — All Public Pages Review
✅ All 6 public routes operational: `/`, `/projects`, `/projects/[slug]`, `/about`, `/certificates`, `/certificates/[slug]`, `/dashboard`, `/contact`.

---

## S8: Admin CMS
- [x] T8.1 — Admin Layout & Dashboard (sidebar navigation, security guard, counter cards)
- [x] T8.2 — Projects Admin CRUD (table list, /new, /[id]/edit, full form)
- [x] T8.3 — Certificates Admin CRUD (/admin/certificates quick add & delete)
- [x] T8.4 — Skills Admin CRUD (/admin/skills category manager)
- [x] T8.5 — Education Admin CRUD (/admin/education timeline manager)
- [x] T8.6 — Profile Admin (/admin/profile curator settings)

---

## 🛑 CHECKPOINT 4 — Admin CMS Review
✅ All CMS admin routes protected by NextAuth middleware, CRUD actions functional with Zod validation.

---

## S9: Polish & Verification
- [x] T9.1 — Specimen Cabinet Motion & Micro-interactions (hover lift, sparkline pulse, pin tilt)
- [x] T9.2 — SEO & Metadata (sitemap.xml, robots.txt, dynamic OpenGraph metadata)
- [x] T9.3 — Public Layout (brass drawer tab navbar, footer with coordinates, mobile drawer)
- [x] T9.4 — Responsive & Ergonomics Audit (WCAG AA contrast, 44px tap targets, 16px input font, impeccable detect 0 findings)
- [x] T9.5 — Production Build Clean (18/18 routes statically optimized and dynamic)
