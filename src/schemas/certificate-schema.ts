import { z } from 'zod';

export const certificateSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Certificate name is required'),
  slug: z.string().min(1, 'Slug is required'),
  issuer: z.string().min(1, 'Issuer is required'),
  date: z.date().or(z.string().transform((str) => new Date(str))),
  credentialUrl: z.string().url().nullable().optional().or(z.literal('')),
  image: z.string().nullable().optional().or(z.literal('')),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type Certificate = z.infer<typeof certificateSchema>;

export const createCertificateSchema = certificateSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateCertificatePayload = z.infer<typeof createCertificateSchema>;
