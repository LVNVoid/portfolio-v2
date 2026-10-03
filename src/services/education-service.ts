import db from '@/services/db';
import type { Education } from '@/schemas/education-schema';

export const STATIC_EDUCATIONS: Education[] = [
  {
    id: 'edu-umm',
    school: 'Universitas Muhammadiyah Magelang',
    degree: 'Bachelor of Computer Science / Information Technology',
    year: '2021 - 2025',
    description:
      'Specialized in distributed software architecture, web application engineering, and relational database systems.',
  },
];

export async function getEducations(): Promise<Education[]> {
  try {
    const raw = await db.education.findMany({
      orderBy: { createdAt: 'desc' },
    });
    if (raw && raw.length > 0) {
      return raw as unknown as Education[];
    }
  } catch (error) {
    // Graceful fallback
  }
  return STATIC_EDUCATIONS;
}
