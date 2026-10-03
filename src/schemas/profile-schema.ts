import { z } from 'zod';

export const profileSchema = z.object({
  id: z.string().default('default-profile'),
  name: z.string().min(1, 'Name is required'),
  role: z.string().min(1, 'Role is required'),
  bio: z.string().min(10, 'Bio must be at least 10 characters'),
  location: z.string().nullable().optional(),
  email: z.string().email('Invalid email address'),
  avatar: z.string().nullable().optional(),
  socials: z
    .object({
      github: z.string().optional(),
      linkedin: z.string().optional(),
      website: z.string().optional(),
      twitter: z.string().optional(),
    })
    .optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type Profile = z.infer<typeof profileSchema>;

export const updateProfileSchema = profileSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type UpdateProfilePayload = z.infer<typeof updateProfileSchema>;
