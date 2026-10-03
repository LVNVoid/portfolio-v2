# Task Breakdown — Portfolio v2

## S1: Foundation & Scaffold
**~5 files · Checkpoint after**

### T1.1 — Project Init & Dependencies
- [ ] `npx create-next-app@latest` with TypeScript, Tailwind, App Router
- [ ] Install: prisma, @prisma/client, @prisma/adapter-pg, pg, next-auth, bcryptjs, zod, framer-motion, next-themes, cloudinary, lucide-react, @hookform/resolvers, react-hook-form
- [ ] Install shadcn/ui (`npx shadcn@latest init`)
- [ ] Configure `tsconfig.json` paths alias `@/`
- **Acceptance:** `npm run dev` starts, `tsc --noEmit` passes
- **Verify:** `npm run build`
- **Files:** package.json, tsconfig.json, next.config.ts, tailwind config

### T1.2 — Prisma Schema & Database
- [ ] Write full Prisma schema (User, Profile, Project, Skill, Education, Certificate)
- [ ] Configure Neon connection string
- [ ] `npx prisma db push`
- [ ] Create db.ts client singleton
- [ ] Seed admin user
- **Acceptance:** `npx prisma studio` shows all tables, admin user exists
- **Verify:** `npx prisma validate`
- **Deps:** T1.1
- **Files:** prisma/schema.prisma, src/services/db.ts, prisma/seed.ts

### T1.3 — Auth Setup
- [ ] Configure NextAuth.js (Credentials provider, JWT)
- [ ] Write auth.ts config
- [ ] Create middleware.ts (protect /admin/*)
- [ ] Create login page
- **Acceptance:** Login with admin credentials → redirected to /admin. Unauthenticated /admin → redirected to /login
- **Verify:** Manual test login flow
- **Deps:** T1.2
- **Files:** src/lib/auth.ts, src/middleware.ts, src/app/(auth)/login/page.tsx, src/components/login-form.tsx

### T1.4 — Root Layout, Theme & Global Styles
- [ ] Root layout with ThemeProvider, font loading
- [ ] globals.css with Specimen Cabinet tokens (linen, brass, green, ink)
- [ ] Theme toggle component
- [ ] Browser surfaces theming (::selection, caret, focus rings)
- **Acceptance:** Light/dark toggle works, persists on reload, tokens apply
- **Verify:** `npm run build`, visual check both modes
- **Deps:** T1.1
- **Files:** src/app/layout.tsx, src/app/globals.css, src/components/theme-toggle.tsx

---

## 🛑 CHECKPOINT 1 — Foundation Review
Verify: build passes, auth works, theme toggles, database connected.

---

## S2: Projects (Core Specimen System)
**~8 files**

### T2.1 — Schemas & Types
- [ ] project-schema.ts (Zod)
- [ ] api.ts (ApiResponse<T>)
- **Acceptance:** Types infer correctly
- **Verify:** `tsc --noEmit`
- **Files:** src/schemas/project-schema.ts, src/types/api.ts

### T2.2 — Project Service & Caching
- [ ] getProjects(), getProjectBySlug(), getFeaturedProjects()
- [ ] `'use cache'` + cacheTag
- **Acceptance:** Queries return data, caching works
- **Verify:** `tsc --noEmit`
- **Deps:** T1.2, T2.1
- **Files:** src/services/project-service.ts

### T2.3 — Project Server Actions
- [ ] createProjectAction, updateProjectAction, deleteProjectAction
- [ ] Zod validation, auth guard, revalidateTag
- **Acceptance:** CRUD operations work, cache invalidated
- **Verify:** `tsc --noEmit`
- **Deps:** T2.2
- **Files:** src/actions/project-actions.ts

### T2.4 — Specimen UI Components
- [ ] specimen-card.tsx (vitrine card with label, badge, pin-mount)
- [ ] specimen-label.tsx (classification metadata)
- [ ] collection-grid.tsx (filterable grid)
- [ ] taxonomy-filter.tsx (stack filter badges)
- [ ] sparkline.tsx (micro activity chart)
- [ ] data-ticker.tsx (live data line)
- **Acceptance:** Components render with mock data, responsive, both themes
- **Verify:** `npm run build`
- **Deps:** T1.4, T2.1
- **Files:** src/components/specimen-card.tsx + 5 more

### T2.5 — Public Project Pages
- [ ] Homepage vitrine hero (featured specimen)
- [ ] /projects collection page
- [ ] /projects/[slug] detail page
- **Acceptance:** Pages render with real data from DB, links work, responsive
- **Verify:** `npm run build`, visual check
- **Deps:** T2.2, T2.4
- **Files:** src/app/(public)/page.tsx, projects/page.tsx, projects/[slug]/page.tsx

---

## 🛑 CHECKPOINT 2 — Core Specimen System Review
Verify: homepage shows featured project, collection page lists all, detail page works, filter works, both themes.

---

## S3: Profile, Skills & About Page
**~5 files**

### T3.1 — Profile & Skill Schemas + Services
- [ ] profile-schema.ts, skill-schema.ts
- [ ] profile-service.ts, skill-service.ts with caching
- **Deps:** T1.2
- **Files:** 4 files

### T3.2 — About Page ("Field Notes")
- [ ] Bio section with warm researcher voice
- [ ] Skills taxonomy grid
- [ ] Education timeline
- **Acceptance:** Page renders with real data, warm tone, responsive
- **Deps:** T3.1
- **Files:** src/app/(public)/about/page.tsx + components

---

## S4: Certificates
**~4 files**

### T4.1 — Certificate Schema + Service + Actions
- [ ] certificate-schema.ts, certificate-service.ts, certificate-actions.ts
- **Deps:** T1.2

### T4.2 — Certificates Pages ("Credentials")
- [ ] /certificates gallery (framed with brass nameplates)
- [ ] /certificates/[slug] detail
- **Deps:** T4.1

---

## S5: Education
**~2 files**

### T5.1 — Education Schema + Service + Actions
- [ ] education-schema.ts, education-service.ts, education-actions.ts
- **Deps:** T1.2

(Education timeline rendered within About page — T3.2)

---

## S6: Dashboard ("Laboratory")
**~3 files**

### T6.1 — GitHub Service
- [ ] github-service.ts (REST API, contribution data, recent events)
- [ ] unstable_cache with 5-min TTL
- **Deps:** T1.2

### T6.2 — Dashboard Page
- [ ] GitHub contribution calendar
- [ ] Recent commit events
- [ ] Lab instrument panel aesthetic
- **Deps:** T6.1

---

## S7: Contact ("Inquiries Desk")
**~3 files**

### T7.1 — Contact Form
- [ ] contact-schema.ts
- [ ] contact-actions.ts (email or store)
- [ ] Contact page with ruled-field form
- **Deps:** T1.4

---

## 🛑 CHECKPOINT 3 — All Public Pages Review
Verify: all 6 public pages render correctly, navigation works, responsive, both themes.

---

## S8: Admin CMS
**~15 files**

### T8.1 — Admin Layout & Dashboard
- [ ] Admin sidebar navigation
- [ ] Dashboard with entity counts
- **Deps:** T1.3

### T8.2 — Projects Admin CRUD
- [ ] List with search
- [ ] Create/edit form (React Hook Form + Zod)
- [ ] Delete with confirmation
- [ ] Cloudinary image upload
- **Deps:** T2.3, T8.1

### T8.3 — Certificates Admin CRUD
- [ ] Same pattern as projects
- **Deps:** T4.1, T8.1

### T8.4 — Skills Admin CRUD
- [ ] Simple table + add/delete
- **Deps:** T3.1, T8.1

### T8.5 — Education Admin CRUD
- [ ] Same pattern
- **Deps:** T5.1, T8.1

### T8.6 — Profile Admin
- [ ] Profile form with avatar upload
- **Deps:** T3.1, T8.1

---

## 🛑 CHECKPOINT 4 — Admin CMS Review
Verify: all CRUD operations work, data persists, cache invalidated on mutations.

---

## S9: Polish & Ship
**~5 files**

### T9.1 — Animations & Motion
- [ ] Drawer-slide page transitions
- [ ] Specimen hover lift (Framer Motion)
- [ ] Sparkline data pulse
- [ ] Scroll-triggered reveals
- [ ] Reduced motion preference
- **Deps:** All UI tasks

### T9.2 — SEO & Metadata
- [ ] Dynamic metadata per page
- [ ] OpenGraph images
- [ ] JSON-LD (Person schema)
- [ ] sitemap.ts, robots.ts
- **Deps:** All pages

### T9.3 — Public Layout (Navbar + Footer)
- [ ] Brass drawer-tab navigation
- [ ] Footer with social links
- [ ] Mobile responsive nav
- **Deps:** T1.4

### T9.4 — Responsive & Accessibility Audit
- [ ] Mobile breakpoint check all pages
- [ ] WCAG AA contrast (both themes)
- [ ] Keyboard navigation
- [ ] Touch targets 44px
- [ ] `impeccable detect` scan
- **Deps:** All UI tasks

### T9.5 — Deploy to Vercel
- [ ] Create repo, push
- [ ] Configure Vercel project
- [ ] Set environment variables
- [ ] Verify production build
- **Deps:** All tasks

---

## 🛑 CHECKPOINT 5 — Final Review & Ship
Verify: all pages, all features, both themes, responsive, a11y, SEO, production build clean.
