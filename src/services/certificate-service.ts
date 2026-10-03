import db from '@/services/db';
import type { Certificate } from '@/schemas/certificate-schema';

export const STATIC_CERTIFICATES: Certificate[] = [
  {
    id: 'cert-react',
    slug: 'belajar-membuat-aplikasi-web-dengan-react',
    name: 'Belajar Membuat Aplikasi Web dengan React',
    issuer: 'Dicoding Indonesia',
    date: new Date('2025-11-20'),
    credentialUrl: 'https://www.dicoding.com/certificates/QLZ9RE069P5D',
    image: 'https://res.cloudinary.com/dmvludl4w/image/upload/v1766388995/certificates/wtikmukcnkagx1fspvff.jpg',
  },
  {
    id: 'cert-web-basic',
    slug: 'belajar-dasar-pemrograman-web',
    name: 'Belajar Dasar Pemrograman Web',
    issuer: 'Dicoding Indonesia',
    date: new Date('2025-11-15'),
    credentialUrl: 'https://www.dicoding.com/certificates/EYX4YK75OZDL',
    image: 'https://res.cloudinary.com/dmvludl4w/image/upload/v1766389027/certificates/xbijjdsundyj0s08z8re.jpg',
  },
  {
    id: 'cert-git-github',
    slug: 'belajar-dasar-git-dengan-github',
    name: 'Belajar Dasar Git dengan GitHub',
    issuer: 'Dicoding Indonesia',
    date: new Date('2025-11-10'),
    credentialUrl: 'https://www.dicoding.com/certificates/QLZ94EYLMP5D',
    image: 'https://res.cloudinary.com/dmvludl4w/image/upload/v1766389009/certificates/kd39nwg5lpihgcoyzdbi.jpg',
  },
  {
    id: 'cert-backend-js',
    slug: 'belajar-back-end-pemula-dengan-javascript',
    name: 'Belajar Back-End Pemula dengan JavaScript',
    issuer: 'Dicoding Indonesia',
    date: new Date('2025-11-05'),
    credentialUrl: 'https://www.dicoding.com/certificates/53XEO5V0YZRN',
    image: 'https://res.cloudinary.com/dmvludl4w/image/upload/v1766388168/certificates/qo19uav06croly8dto2x.jpg',
  },
  {
    id: 'cert-js-basic',
    slug: 'belajar-dasar-pemrograman-javascript',
    name: 'Belajar Dasar Pemrograman JavaScript',
    issuer: 'Dicoding Indonesia',
    date: new Date('2025-10-28'),
    credentialUrl: 'https://www.dicoding.com/certificates/JMZV1OG7RXN9',
    image: 'https://res.cloudinary.com/dmvludl4w/image/upload/v1766389086/certificates/iyymmt7zgdcliqddwrty.jpg',
  },
];

export async function getCertificates(): Promise<Certificate[]> {
  try {
    const raw = await db.certificate.findMany({
      orderBy: { date: 'desc' },
    });
    if (raw && raw.length > 0) {
      return raw as unknown as Certificate[];
    }
  } catch (error) {
    // Graceful fallback
  }
  return STATIC_CERTIFICATES;
}

export async function getCertificateBySlug(slug: string): Promise<Certificate | null> {
  try {
    const raw = await db.certificate.findUnique({
      where: { slug },
    });
    if (raw) return raw as unknown as Certificate;
  } catch (error) {
    // Graceful fallback
  }
  const fallback = STATIC_CERTIFICATES.find((c) => c.slug === slug);
  return fallback || null;
}
