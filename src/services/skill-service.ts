import db from '@/services/db';
import type { Skill } from '@/schemas/skill-schema';

export async function getSkills(): Promise<Skill[]> {
  try {
    const raw = await db.skill.findMany({
      orderBy: [{ category: 'asc' }, { name: 'asc' }],
    });
    return raw as unknown as Skill[];
  } catch (error) {
    console.error('Failed to query skills:', error);
    return [];
  }
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
