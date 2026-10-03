import type { MetadataRoute } from 'next';
import { getProjects } from '@/services/project-service';
import { getCertificates } from '@/services/certificate-service';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://portfolio-v2-elviencode.vercel.app';

  const [projects, certificates] = await Promise.all([
    getProjects(),
    getCertificates(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/projects`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/certificates`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/dashboard`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: p.updatedAt || new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const certificateRoutes: MetadataRoute.Sitemap = certificates.map((c) => ({
    url: `${baseUrl}/certificates/${c.slug}`,
    lastModified: c.updatedAt || new Date(),
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...certificateRoutes];
}
