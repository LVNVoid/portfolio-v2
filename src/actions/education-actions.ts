'use server';

import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import db from '@/services/db';
import { authOptions } from '@/lib/auth';
import {
  createEducationSchema,
  type CreateEducationPayload,
  type Education,
} from '@/schemas/education-schema';
import type { ApiResponse } from '@/types/api';

async function checkAdminAuth(): Promise<boolean> {
  const session = await getServerSession(authOptions);
  return !!session?.user;
}

export async function createEducationAction(
  payload: CreateEducationPayload
): Promise<ApiResponse<Education>> {
  if (!(await checkAdminAuth())) {
    return { success: false, error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } };
  }

  const parsed = createEducationSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      success: false,
      error: { code: 'VALIDATION_ERROR', message: parsed.error.issues[0]?.message || 'Invalid data' },
    };
  }

  try {
    const edu = await db.education.create({
      data: parsed.data,
    });

    revalidatePath('/about');
    revalidatePath('/admin/education');
    return { success: true, data: edu as unknown as Education };
  } catch (error) {
    return { success: false, error: { code: 'DB_ERROR', message: 'Failed to create education' } };
  }
}

export async function deleteEducationAction(id: string): Promise<ApiResponse<{ id: string }>> {
  if (!(await checkAdminAuth())) {
    return { success: false, error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } };
  }

  try {
    await db.education.delete({ where: { id } });
    revalidatePath('/about');
    revalidatePath('/admin/education');
    return { success: true, data: { id } };
  } catch (error) {
    return { success: false, error: { code: 'DB_ERROR', message: 'Failed to delete education' } };
  }
}
