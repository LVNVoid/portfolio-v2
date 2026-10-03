import { z } from 'zod';

export const educationSchema = z.object({
  id: z.string(),
  school: z.string().min(1, 'School name is required'),
  degree: z.string().min(1, 'Degree or course is required'),
  year: z.string().min(1, 'Year range is required'),
  description: z.string().nullable().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type Education = z.infer<typeof educationSchema>;

export const createEducationSchema = educationSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateEducationPayload = z.infer<typeof createEducationSchema>;
