'use server';

import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import db from '@/services/db';
import { authOptions } from '@/lib/auth';
import {
  updateProfileSchema,
  type UpdateProfilePayload,
  type Profile,
} from '@/schemas/profile-schema';
import type { ApiResponse } from '@/types/api';

async function checkAdminAuth(): Promise<boolean> {
  const session = await getServerSession(authOptions);
  return !!session?.user;
}

export async function updateProfileAction(
  payload: UpdateProfilePayload
): Promise<ApiResponse<Profile>> {
  if (!(await checkAdminAuth())) {
    return { success: false, error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } };
  }

  const parsed = updateProfileSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      success: false,
      error: { code: 'VALIDATION_ERROR', message: parsed.error.issues[0]?.message || 'Invalid data' },
    };
  }

  try {
    const existing = await db.profile.findFirst();
    let profile;

    if (existing) {
      profile = await db.profile.update({
        where: { id: existing.id },
        data: {
          name: parsed.data.name,
          role: parsed.data.role,
          bio: parsed.data.bio,
          location: parsed.data.location || null,
          email: parsed.data.email,
          avatar: parsed.data.avatar || null,
          socials: parsed.data.socials || {},
        },
      });
    } else {
      profile = await db.profile.create({
        data: {
          id: 'default-profile',
          name: parsed.data.name,
          role: parsed.data.role,
          bio: parsed.data.bio,
          location: parsed.data.location || null,
          email: parsed.data.email,
          avatar: parsed.data.avatar || null,
          socials: parsed.data.socials || {},
        },
      });
    }

    revalidatePath('/about');
    revalidatePath('/');
    revalidatePath('/admin/profile');

    return { success: true, data: profile as unknown as Profile };
  } catch (error) {
    console.error('Failed to update profile:', error);
    return { success: false, error: { code: 'DB_ERROR', message: 'Failed to update profile' } };
  }
}
