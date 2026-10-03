'use server';

import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import db from '@/services/db';
import { authOptions } from '@/lib/auth';
import { createSkillSchema, type CreateSkillPayload, type Skill } from '@/schemas/skill-schema';
import type { ApiResponse } from '@/types/api';

async function checkAdminAuth(): Promise<boolean> {
  const session = await getServerSession(authOptions);
  return !!session?.user;
}

export async function createSkillAction(payload: CreateSkillPayload): Promise<ApiResponse<Skill>> {
  if (!(await checkAdminAuth())) {
    return { success: false, error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } };
  }

  const parsed = createSkillSchema.safeParse(payload);
  if (!parsed.success) {
    return { success: false, error: { code: 'VALIDATION_ERROR', message: parsed.error.issues[0]?.message || 'Invalid skill' } };
  }

  try {
    const skill = await db.skill.create({ data: parsed.data });
    revalidatePath('/about');
    revalidatePath('/admin/skills');
    return { success: true, data: skill as unknown as Skill };
  } catch (error) {
    return { success: false, error: { code: 'DB_ERROR', message: 'Failed to create skill' } };
  }
}

export async function deleteSkillAction(id: string): Promise<ApiResponse<{ id: string }>> {
  if (!(await checkAdminAuth())) {
    return { success: false, error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } };
  }

  try {
    await db.skill.delete({ where: { id } });
    revalidatePath('/about');
    revalidatePath('/admin/skills');
    return { success: true, data: { id } };
  } catch (error) {
    return { success: false, error: { code: 'DB_ERROR', message: 'Failed to delete skill' } };
  }
}
