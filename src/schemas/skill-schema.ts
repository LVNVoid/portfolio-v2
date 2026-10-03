import { z } from 'zod';

export const skillSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Skill name is required'),
  category: z.string().default('General'),
  icon: z.string().nullable().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type Skill = z.infer<typeof skillSchema>;

export const createSkillSchema = skillSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateSkillPayload = z.infer<typeof createSkillSchema>;
