import db from '@/services/db';
import type { Certificate } from '@/schemas/certificate-schema';

export async function getCertificates(): Promise<Certificate[]> {
  try {
    const raw = await db.certificate.findMany({
      orderBy: { date: 'desc' },
    });
    return raw as unknown as Certificate[];
  } catch (error) {
    console.error('Failed to query certificates:', error);
    return [];
  }
}

export async function getCertificateBySlug(slug: string): Promise<Certificate | null> {
  try {
    const raw = await db.certificate.findUnique({
      where: { slug },
    });
    if (!raw) return null;
    return raw as unknown as Certificate;
  } catch (error) {
    console.error(`Failed to query certificate by slug ${slug}:`, error);
    return null;
  }
}
