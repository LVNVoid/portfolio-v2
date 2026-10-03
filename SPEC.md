# SPEC.md — Portfolio v2 (The Specimen Cabinet)

## 1. Objective

Build a personal portfolio website and CMS for Elvien (full-stack engineer) using the Specimen Cabinet visual direction. The portfolio proves engineering capability through live, deployed products — not static screenshots or claims.

**Success Criteria:**
- Lighthouse Performance ≥ 90, Accessibility ≥ 95
- First Contentful Paint < 1.5s on 4G
- All public pages server-rendered with proper SEO metadata
- Admin CMS functional for all CRUD operations
- Light/dark mode with persistent preference
- Mobile-first responsive, zero horizontal overflow
- Playful professional animations (drawer-slide, specimen hover, sparkline pulse)

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, React 19, React Compiler) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Animation | Framer Motion 12 |
| Theme | next-themes (dark/light) |
| Database | PostgreSQL (Neon) |
| ORM | Prisma 7 (@prisma/adapter-pg) |
| Auth | NextAuth.js v4 (Credentials, JWT) |
| Media | Cloudinary v2 SDK |
| Icons | Lucide React |
| Deploy | Vercel |
| Analytics | Vercel Analytics + Speed Insights |

## 3. Commands

```bash
# Development
npm run dev              # Next.js dev server (turbopack)
npm run build            # Production build
npm run start            # Production server
npm run lint             # ESLint
npx tsc --noEmit         # Type check

# Database
npx prisma generate      # Generate Prisma client
npx prisma db push       # Push schema to Neon
npx prisma studio        # Database GUI

# Quality
npx prisma validate      # Validate schema
```

## 4. Project Structure (Simple Scalable Architecture)

```
src/
├── app/
│   ├── (public)/                    # Public routes
│   │   ├── layout.tsx               # Public layout (navbar + footer)
│   │   ├── page.tsx                 # Homepage (The Vitrine)
│   │   ├── projects/
│   │   │   ├── page.tsx             # Collection page
│   │   │   └── [slug]/
│   │   │       └── page.tsx         # Specimen detail
│   │   ├── about/
│   │   │   └── page.tsx             # Field Notes
│   │   ├── certificates/
│   │   │   ├── page.tsx             # Credentials gallery
│   │   │   └── [slug]/
│   │   │       └── page.tsx         # Certificate detail
│   │   ├── dashboard/
│   │   │   └── page.tsx             # Laboratory (GitHub activity)
│   │   └── contact/
│   │       └── page.tsx             # Inquiries Desk
│   ├── (auth)/
│   │   └── login/
│   │       └── page.tsx             # Admin login
│   ├── admin/
│   │   ├── layout.tsx               # Admin layout (sidebar)
│   │   ├── page.tsx                 # Admin dashboard
│   │   ├── projects/
│   │   │   ├── page.tsx             # Projects CRUD list
│   │   │   ├── new/page.tsx         # Create project
│   │   │   └── [id]/edit/page.tsx   # Edit project
│   │   ├── certificates/
│   │   │   ├── page.tsx             # Certificates CRUD
│   │   │   ├── new/page.tsx
│   │   │   └── [slug]/edit/page.tsx
│   │   ├── skills/
│   │   │   └── page.tsx             # Skills CRUD
│   │   ├── education/
│   │   │   └── page.tsx             # Education CRUD
│   │   └── profile/
│   │       └── page.tsx             # Profile settings
│   ├── api/
│   │   ├── auth/[...nextauth]/
│   │   │   └── route.ts
│   │   └── upload/
│   │       └── route.ts             # Cloudinary upload
│   ├── layout.tsx                   # Root layout
│   ├── globals.css                  # Tailwind v4 tokens
│   ├── not-found.tsx
│   ├── error.tsx
│   ├── loading.tsx
│   ├── robots.ts
│   └── sitemap.ts
│
├── components/
│   ├── ui/                          # shadcn/ui primitives
│   ├── layout/                      # Navbar, footer, sidebar
│   ├── specimen-card.tsx            # Project specimen card
│   ├── specimen-label.tsx           # Classification label
│   ├── vitrine-hero.tsx             # Homepage featured specimen
│   ├── collection-grid.tsx          # Projects grid
│   ├── taxonomy-filter.tsx          # Tech stack filter
│   ├── data-ticker.tsx              # Live data ticker
│   ├── sparkline.tsx                # Micro activity chart
│   ├── architecture-diagram.tsx     # Mini system topology
│   ├── github-calendar.tsx          # Contribution heatmap
│   ├── theme-toggle.tsx             # Light/dark switch
│   └── contact-form.tsx             # Contact form
│
├── hooks/
│   ├── use-theme-mounted.ts
│   └── use-media-query.ts
│
├── services/
│   ├── db.ts                        # Prisma client
│   ├── project-service.ts
│   ├── certificate-service.ts
│   ├── skill-service.ts
│   ├── education-service.ts
│   ├── profile-service.ts
│   └── github-service.ts            # GitHub API integration
│
├── actions/
│   ├── project-actions.ts
│   ├── certificate-actions.ts
│   ├── skill-actions.ts
│   ├── education-actions.ts
│   ├── profile-actions.ts
│   └── contact-actions.ts
│
├── schemas/
│   ├── project-schema.ts
│   ├── certificate-schema.ts
│   ├── skill-schema.ts
│   ├── education-schema.ts
│   ├── profile-schema.ts
│   ├── contact-schema.ts
│   └── env-schema.ts
│
├── types/
│   └── api.ts                       # ApiResponse<T>
│
├── utils/
│   ├── cn.ts                        # clsx + twMerge
│   └── format-date.ts
│
├── constants/
│   ├── navigation.ts                # Drawer tab labels
│   └── config.ts                    # Site metadata
│
├── lib/
│   ├── auth.ts                      # NextAuth config
│   └── cloudinary.ts                # Cloudinary config
│
└── middleware.ts                    # Admin route protection
```

## 5. Code Style

```typescript
// Zod schema as SSOT
// src/schemas/project-schema.ts
import { z } from 'zod';

export const projectSchema = z.object({
  id: z.string().cuid2(),
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  tech: z.array(z.string()),
  link: z.string().url().nullable(),
  github: z.string().url().nullable(),
  image: z.string().url().nullable(),
  featured: z.boolean().default(false),
  status: z.enum(['LIVE', 'ARCHIVED', 'IN_PROGRESS']),
  year: z.number().int(),
  category: z.string(),
});

export type Project = z.infer<typeof projectSchema>;

// Server Action pattern
// src/actions/project-actions.ts
'use server';

import { revalidateTag } from 'next/cache';
import type { ApiResponse } from '@/types/api';

export async function createProjectAction(
  formData: FormData
): Promise<ApiResponse<Project>> {
  const parsed = createProjectSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { success: false, error: { code: 'VALIDATION_ERROR', message: parsed.error.issues[0].message } };
  }
  // ... create in db
  revalidateTag('projects');
  return { success: true, data: project };
}
```

## 6. Testing Strategy

- **TypeScript strict** (`tsc --noEmit`) as primary safety net
- **Zod validation** at all trust boundaries (Server Actions, API routes)
- **Build verification** (`npm run build`) — no build errors
- **Manual visual verification** via preview tunnel for UI
- **impeccable detect** for anti-pattern scanning

## 7. Database Schema (Prisma)

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  role      String   @default("ADMIN")
  createdAt DateTime @default(now())
}

model Profile {
  id       String  @id @default(cuid())
  name     String
  role     String
  bio      String  @db.Text
  location String?
  email    String
  avatar   String?
  socials  Json    @default("{}")
}

model Project {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  description String   @db.Text
  content     String?  @db.Text
  tech        String[]
  link        String?
  github      String?
  image       String?
  featured    Boolean  @default(false)
  status      String   @default("LIVE")
  year        Int
  category    String
  services    Int      @default(0)
  databases   Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Skill {
  id       String @id @default(cuid())
  name     String @unique
  category String
  icon     String?
}

model Education {
  id          String  @id @default(cuid())
  school      String
  degree      String
  year        String
  description String? @db.Text
}

model Certificate {
  id             String   @id @default(cuid())
  name           String
  slug           String   @unique
  issuer         String
  date           DateTime
  credentialUrl  String?
  image          String?
  createdAt      DateTime @default(now())
}
```

## 8. Boundaries

### Always
- Server Components by default
- Zod validation at every trust boundary
- `@/` import alias
- Mobile-first styling
- Semantic HTML
- WCAG AA contrast

### Ask First
- Adding new npm dependencies
- Changing database schema
- Modifying auth configuration
- Changing the visual direction

### Never
- `any` type
- `@ts-ignore`
- `eslint-disable`
- Barrel files (`index.ts`)
- Logic in UI components
- Raw SQL queries (use Prisma)
- Hardcoded secrets in code
