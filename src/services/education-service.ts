import db from '@/services/db';
import type { Education } from '@/schemas/education-schema';

export async function getEducations(): Promise<Education[]> {
  try {
    const raw = await db.education.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return raw as unknown as Education[];
  } catch (error) {
    console.error('Failed to query educations:', error);
    return [];
  }
}
