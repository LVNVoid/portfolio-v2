import { z } from 'zod';

export const projectStatusSchema = z.enum(['LIVE', 'ARCHIVED', 'IN_PROGRESS']);

export const projectSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().min(1, 'Description is required'),
  content: z.string().nullable().optional(),
  tech: z.array(z.string()).min(1, 'At least one technology is required'),
  link: z.string().url().nullable().optional().or(z.literal('')),
  github: z.string().url().nullable().optional().or(z.literal('')),
  image: z.string().nullable().optional().or(z.literal('')),
  featured: z.boolean().default(false),
  status: projectStatusSchema.default('LIVE'),
  year: z.number().int().default(2026),
  category: z.string().default('Web Application'),
  services: z.number().int().default(1),
  databases: z.number().int().default(1),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type Project = z.infer<typeof projectSchema>;

export const createProjectSchema = projectSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateProjectPayload = z.infer<typeof createProjectSchema>;

export const updateProjectSchema = createProjectSchema.partial();

export type UpdateProjectPayload = z.infer<typeof updateProjectSchema>;
