import db from '@/services/db';
import type { Skill } from '@/schemas/skill-schema';

export const STATIC_SKILLS: Skill[] = [
  // Languages
  { id: 'sk-ts', name: 'TypeScript', category: 'Languages' },
  { id: 'sk-js', name: 'JavaScript (ESNext)', category: 'Languages' },
  { id: 'sk-py', name: 'Python', category: 'Languages' },
  { id: 'sk-sql', name: 'SQL', category: 'Languages' },

  // Frontend
  { id: 'sk-next', name: 'Next.js 16 (App Router)', category: 'Frontend' },
  { id: 'sk-react', name: 'React 19', category: 'Frontend' },
  { id: 'sk-tw', name: 'Tailwind CSS v4', category: 'Frontend' },
  { id: 'sk-motion', name: 'Framer Motion', category: 'Frontend' },
  { id: 'sk-shadcn', name: 'shadcn/ui & Radix', category: 'Frontend' },

  // Backend
  { id: 'sk-node', name: 'Node.js', category: 'Backend' },
  { id: 'sk-express', name: 'Express.js', category: 'Backend' },
  { id: 'sk-prisma', name: 'Prisma ORM', category: 'Backend' },
  { id: 'sk-zod', name: 'Zod (Type Contracts)', category: 'Backend' },

  // Database & Storage
  { id: 'sk-pg', name: 'PostgreSQL (Neon)', category: 'Database & Cloud' },
  { id: 'sk-neon-storage', name: 'Neon Object Storage', category: 'Database & Cloud' },
  { id: 'sk-mssql', name: 'Microsoft SQL Server', category: 'Database & Cloud' },

  // DevOps & Tools
  { id: 'sk-docker', name: 'Docker & Containers', category: 'DevOps & Tooling' },
  { id: 'sk-linux', name: 'Ubuntu VPS & SSH', category: 'DevOps & Tooling' },
  { id: 'sk-git', name: 'Git & GitHub Workflows', category: 'DevOps & Tooling' },
  { id: 'sk-vercel', name: 'Vercel Platform', category: 'DevOps & Tooling' },
  { id: 'sk-cf', name: 'Cloudflare Proxy & WAF', category: 'DevOps & Tooling' },
];

export async function getSkills(): Promise<Skill[]> {
  try {
    const raw = await db.skill.findMany({
      orderBy: [{ category: 'asc' }, { name: 'asc' }],
    });
    if (raw && raw.length > 0) {
      return raw as unknown as Skill[];
    }
  } catch (error) {
    // Graceful fallback
  }
  return STATIC_SKILLS;
}

export async function getSkillsGroupedByCategory(): Promise<Record<string, Skill[]>> {
  const skills = await getSkills();
  const grouped: Record<string, Skill[]> = {};

  for (const skill of skills) {
    const cat = skill.category || 'General';
    if (!grouped[cat]) {
      grouped[cat] = [];
    }
    grouped[cat].push(skill);
  }

  return grouped;
}
