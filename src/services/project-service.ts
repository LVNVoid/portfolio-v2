import db from '@/services/db';
import type { Project } from '@/schemas/project-schema';

export async function getProjects(): Promise<Project[]> {
  try {
    const raw = await db.project.findMany({
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
    });
    return raw as unknown as Project[];
  } catch (error) {
    console.error('Failed to query projects:', error);
    return [];
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const raw = await db.project.findMany({
      where: { featured: true },
      orderBy: { createdAt: 'desc' },
    });
    return raw as unknown as Project[];
  } catch (error) {
    console.error('Failed to query featured projects:', error);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const raw = await db.project.findUnique({
      where: { slug },
    });
    if (!raw) return null;
    return raw as unknown as Project;
  } catch (error) {
    console.error(`Failed to query project by slug ${slug}:`, error);
    return null;
  }
}

export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const raw = await db.project.findUnique({
      where: { id },
    });
    if (!raw) return null;
    return raw as unknown as Project;
  } catch (error) {
    console.error(`Failed to query project by id ${id}:`, error);
    return null;
  }
}
