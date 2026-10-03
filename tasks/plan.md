# Plan — Portfolio v2 (The Specimen Cabinet)

## Architecture Overview

```
┌─────────────────────────────────────────────────┐
│                    Vercel                         │
│  ┌───────────────────────────────────────────┐   │
│  │         Next.js 16 App Router             │   │
│  │  ┌──────────┐  ┌──────────┐  ┌────────┐  │   │
│  │  │  Public   │  │  Admin   │  │  API   │  │   │
│  │  │  Routes   │  │  CMS     │  │ Routes │  │   │
│  │  └────┬─────┘  └────┬─────┘  └───┬────┘  │   │
│  │       │              │            │        │   │
│  │  ┌────┴──────────────┴────────────┴────┐  │   │
│  │  │         Services Layer              │  │   │
│  │  │    (Prisma queries + caching)       │  │   │
│  │  └────────────────┬────────────────────┘  │   │
│  └───────────────────┼───────────────────────┘   │
│                      │                            │
│  ┌───────────────────┼───────────────────────┐   │
│  │            External Services               │   │
│  │  ┌──────────┐ ┌──────────┐ ┌───────────┐ │   │
│  │  │   Neon   │ │Cloudinary│ │ GitHub API│ │   │
│  │  │  (PgSQL) │ │ (Media)  │ │ (Activity)│ │   │
│  │  └──────────┘ └──────────┘ └───────────┘ │   │
│  └───────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

## Dependency Graph (Bottom-Up Build Order)

```
1. Foundation     → Project scaffold, Prisma schema, env, auth
2. Data Layer     → Services (CRUD queries + caching)
3. Server Actions → Mutations with Zod validation
4. UI Primitives  → shadcn/ui setup, Specimen Cabinet components
5. Public Pages   → Homepage, Projects, About, Certificates, Dashboard, Contact
6. Admin CMS      → Dashboard, CRUD pages for all entities
7. Polish         → Animations, SEO, responsive audit, dark mode fine-tuning
```

## Vertical Slices

| Slice | DB | Service | Action | UI |
|---|---|---|---|---|
| S1: Foundation | Schema + seed | db.ts, auth | — | Root layout, theme |
| S2: Projects | Project model | project-service | project-actions | Specimen cards, collection, detail |
| S3: Profile + Skills | Profile, Skill | profile-service, skill-service | profile-actions, skill-actions | About page, skill taxonomy |
| S4: Certificates | Certificate | certificate-service | certificate-actions | Credentials gallery, detail |
| S5: Education | Education | education-service | education-actions | Timeline on About |
| S6: Dashboard | — | github-service | — | Laboratory page (GitHub feed) |
| S7: Contact | — | — | contact-actions | Inquiries form |
| S8: Admin CMS | All models | All services | All actions | Admin pages |
| S9: Polish | — | — | — | Motion, SEO, responsive, a11y |

## API Contracts

All Server Actions return `ApiResponse<T>`:
```typescript
type ApiResponse<T> = 
  | { success: true; data: T; message?: string }
  | { success: false; error: { code: string; message: string; details?: { field?: string; message: string }[] } };
```

## Caching Strategy

| Data | Method | Lifetime | Tag |
|---|---|---|---|
| Projects list | `'use cache'` | hours | `projects` |
| Project by slug | `'use cache'` | minutes | `project-{slug}`, `projects` |
| Skills | `'use cache'` | hours | `skills` |
| Certificates | `'use cache'` | hours | `certificates` |
| Education | `'use cache'` | hours | `education` |
| Profile | `'use cache'` | hours | `profile` |
| GitHub activity | `unstable_cache` | 5 min | `github` |

## Risk & Mitigation

| Risk | Impact | Mitigation |
|---|---|---|
| Museum metaphor feels pretentious | High | Dense real data (sparklines, commit info) fills the vitrine with substance |
| Serif + sans pairing clash | Medium | Font-match against comp, test at all sizes |
| GitHub API rate limits | Low | Cache 5min, fallback to static data |
| Cloudinary upload failures | Low | Client-side validation + error handling |
| Dark mode contrast issues | Medium | Test both modes at every component level |
