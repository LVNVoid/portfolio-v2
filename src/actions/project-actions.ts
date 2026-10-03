'use server';

import { getServerSession } from 'next-auth';
import { revalidatePath, revalidateTag } from 'next/cache';
import db from '@/services/db';
import { authOptions } from '@/lib/auth';
import {
  createProjectSchema,
  updateProjectSchema,
  type Project,
  type CreateProjectPayload,
  type UpdateProjectPayload,
} from '@/schemas/project-schema';
import type { ApiResponse } from '@/types/api';

async function checkAdminAuth(): Promise<boolean> {
  const session = await getServerSession(authOptions);
  return !!session?.user;
}

export async function createProjectAction(
  payload: CreateProjectPayload
): Promise<ApiResponse<Project>> {
  if (!(await checkAdminAuth())) {
    return {
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'Restricted cabinet curator action.' },
    };
  }

  const parsed = createProjectSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: parsed.error.issues[0]?.message || 'Invalid input data.',
      },
    };
  }

  try {
    const project = await db.project.create({
      data: {
        ...parsed.data,
        link: parsed.data.link || null,
        github: parsed.data.github || null,
        image: parsed.data.image || null,
      },
    });

    revalidatePath('/projects');
    revalidatePath('/');

    return {
      success: true,
      data: project as unknown as Project,
      message: 'Specimen cataloged successfully.',
    };
  } catch (error) {
    console.error('Failed to create project:', error);
    return {
      success: false,
      error: { code: 'DATABASE_ERROR', message: 'Could not store specimen in catalog.' },
    };
  }
}

export async function updateProjectAction(
  id: string,
  payload: UpdateProjectPayload
): Promise<ApiResponse<Project>> {
  if (!(await checkAdminAuth())) {
    return {
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'Restricted cabinet curator action.' },
    };
  }

  const parsed = updateProjectSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: parsed.error.issues[0]?.message || 'Invalid update parameters.',
      },
    };
  }

  try {
    const project = await db.project.update({
      where: { id },
      data: {
        ...parsed.data,
        link: parsed.data.link === '' ? null : parsed.data.link,
        github: parsed.data.github === '' ? null : parsed.data.github,
        image: parsed.data.image === '' ? null : parsed.data.image,
      },
    });

    revalidatePath('/projects');
    revalidatePath(`/projects/${project.slug}`);
    revalidatePath('/');

    return {
      success: true,
      data: project as unknown as Project,
      message: 'Specimen updated successfully.',
    };
  } catch (error) {
    console.error(`Failed to update project ${id}:`, error);
    return {
      success: false,
      error: { code: 'DATABASE_ERROR', message: 'Could not update specimen details.' },
    };
  }
}

export async function deleteProjectAction(id: string): Promise<ApiResponse<{ id: string }>> {
  if (!(await checkAdminAuth())) {
    return {
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'Restricted cabinet curator action.' },
    };
  }

  try {
    const project = await db.project.delete({
      where: { id },
    });

    revalidatePath('/projects');
    revalidatePath('/');

    return {
      success: true,
      data: { id: project.id },
      message: 'Specimen removed from collection.',
    };
  } catch (error) {
    console.error(`Failed to delete project ${id}:`, error);
    return {
      success: false,
      error: { code: 'DATABASE_ERROR', message: 'Could not de-catalog specimen.' },
    };
  }
}
