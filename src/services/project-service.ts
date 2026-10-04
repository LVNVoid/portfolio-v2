import db from '@/services/db';
import type { Project } from '@/schemas/project-schema';

export const STATIC_PROJECTS: Project[] = [
  {
    id: 'proj-maganghub',
    slug: 'maganghub-bot-attendance',
    title: 'MagangHub Bot Attendance',
    description:
      'Enterprise-grade multi-user workflow automation and attendance management system engineered for Indonesian Ministry of Manpower (Kemnaker) MagangHub interns. The platform completely automates daily check-in, check-out, and formal tri-part internship reporting (Uraian, Pembelajaran, Kendala) via intelligent proxy routing and background cron daemon execution.',
    tech: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'Neon', 'NextAuth', 'Zod', 'Tinyproxy', 'Vitest'],
    link: 'https://maganghub-bot-attendance.vercel.app',
    github: 'https://github.com/LVNVoid/maganghub-bot-attendance',
    image: '/projects/maganghub-bot-attendance.png',
    featured: true,
    status: 'LIVE',
    year: 2026,
    category: 'Automation & Bot',
    services: 4,
    databases: 1,
  },
  {
    id: 'proj-kopi-sangkara',
    slug: 'kopi-sangkara-pos',
    title: 'Kopi Sangkara POS',
    description:
      'Modern, responsive cloud-based Point of Sale and retail operations platform tailored for specialty coffee shops and hospitality environments. Engineered as an installable Progressive Web Application (PWA) optimized for tablet and iPad touch viewports with direct ESC/POS hardware printing over Web Bluetooth and dynamic QR digital invoice fallback.',
    tech: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'Web Bluetooth', 'PWA'],
    link: 'https://kopi-sangkara-pos.vercel.app',
    github: 'https://github.com/LVNVoid/kopi-sangkara-pos',
    image: '/projects/kopi-sangkara-pos.png',
    featured: true,
    status: 'LIVE',
    year: 2026,
    category: 'POS & Retail',
    services: 3,
    databases: 1,
  },
  {
    id: 'proj-review-card',
    slug: 'google-review-card-generator',
    title: 'Google Review Card Generator',
    description:
      'End-to-end web engineering solution and print-ready card design system built to bridge offline customer foot traffic with Google Maps business profiles. Features millimeter-precise, 300+ DPI vector PDF/PNG export, sub-50ms HTTP 307 proxy redirects (/r/[id]), and merchant self-activation onboarding.',
    tech: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'Neon', 'Playwright', 'jsPDF', 'html-to-image'],
    link: 'https://review-card-generator.vercel.app',
    github: 'https://github.com/LVNVoid/review-card-generator',
    image: '/projects/google-review-card-generator.png',
    featured: true,
    status: 'LIVE',
    year: 2026,
    category: 'Marketing & Hardware',
    services: 2,
    databases: 1,
  },
  {
    id: 'proj-hospital-eklaim',
    slug: 'hospital-e-klaim-health-insurance-integration',
    title: 'Hospital E-Klaim & Health Insurance Integration',
    description:
      'Enterprise hospital claim processing system bridging clinical hospital management (SIMRS) with Ministry of Health (Kemenkes) and BPJS Kesehatan web services. Streamlines patient visit reconciliation, automated grouping, hospital tariff calculations, and secure AES-256 payload encryption.',
    tech: ['React 19', 'TypeScript', 'Express.js', 'Node.js', 'MS SQL Server', 'REST API', 'Tailwind CSS'],
    link: null,
    github: null,
    image: '/projects/hospital-eklaim-integration.png',
    featured: false,
    status: 'LIVE',
    year: 2026,
    category: 'Healthcare & Enterprise',
    services: 4,
    databases: 2,
  },
  {
    id: 'proj-timkurator',
    slug: 'timkurator-kusumahadisantosa',
    title: 'Tim Kurator PT Kusumahadi Santosa',
    description:
      'Official corporate and legal transparency portal for the court-appointed curator team of PT Kusumahadi Santosa (In Bankruptcy). Features real-time creditor announcements, verified documentation archive, and media management.',
    tech: ['Next.js 16', 'TypeScript', 'Tailwind CSS v4', 'Prisma', 'PostgreSQL', 'Neon Object Storage'],
    link: 'https://timkurator-kusumahadisantosa.id',
    github: 'https://github.com/LVNVoid/timkurator-kusumahadisantosa',
    image: null,
    featured: false,
    status: 'LIVE',
    year: 2026,
    category: 'Corporate & Legal',
    services: 2,
    databases: 1,
  },
  {
    id: 'proj-spld',
    slug: 'spld',
    title: 'SPLD — Laboratory Scheduling System',
    description:
      'Digital lab facility reservation, inventory tracking, and scheduling management platform for academic computer laboratories, featuring real-time collision detection.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Node.js', 'REST API'],
    link: 'https://spld-app.vercel.app/',
    github: 'https://github.com/LVNVoid/SPLD-Client',
    image: 'https://br-rapid-block-b3i6s8r9.storage.c-4.ap-southeast-1.aws.neon.tech/asset/projects-spld.png',
    featured: false,
    status: 'LIVE',
    year: 2025,
    category: 'Academic Systems',
    services: 2,
    databases: 1,
  },
  {
    id: 'proj-foman',
    slug: 'foman-print',
    title: 'Foman Kreasi',
    description:
      'Commercial digital printing catalogue and customer quotation portal for large-format printing, offset paper packaging, and customized branding merchandise.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    link: null,
    github: null,
    image: 'https://br-rapid-block-b3i6s8r9.storage.c-4.ap-southeast-1.aws.neon.tech/asset/projects-foman-print.jpg',
    featured: false,
    status: 'LIVE',
    year: 2025,
    category: 'Commercial Showcase',
    services: 1,
    databases: 0,
  },
];

export async function getProjects(): Promise<Project[]> {
  try {
    const raw = await db.project.findMany({
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
    });
    if (raw && raw.length > 0) {
      return raw as unknown as Project[];
    }
  } catch (error) {
    // Graceful fallback
  }
  return STATIC_PROJECTS;
}

export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const raw = await db.project.findMany({
      where: { featured: true },
      orderBy: { createdAt: 'desc' },
    });
    if (raw && raw.length > 0) {
      return raw as unknown as Project[];
    }
  } catch (error) {
    // Graceful fallback
  }
  return STATIC_PROJECTS.filter((p) => p.featured);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const raw = await db.project.findUnique({
      where: { slug },
    });
    if (raw) return raw as unknown as Project;
  } catch (error) {
    // Graceful fallback
  }
  const fallback = STATIC_PROJECTS.find((p) => p.slug === slug);
  return fallback || null;
}

export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const raw = await db.project.findUnique({
      where: { id },
    });
    if (raw) return raw as unknown as Project;
  } catch (error) {
    // Graceful fallback
  }
  const fallback = STATIC_PROJECTS.find((p) => p.id === id);
  return fallback || null;
}
