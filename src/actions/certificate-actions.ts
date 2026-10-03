'use server';

import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import db from '@/services/db';
import { authOptions } from '@/lib/auth';
import {
  createCertificateSchema,
  type CreateCertificatePayload,
  type Certificate,
} from '@/schemas/certificate-schema';
import type { ApiResponse } from '@/types/api';

async function checkAdminAuth(): Promise<boolean> {
  const session = await getServerSession(authOptions);
  return !!session?.user;
}

export async function createCertificateAction(
  payload: CreateCertificatePayload
): Promise<ApiResponse<Certificate>> {
  if (!(await checkAdminAuth())) {
    return { success: false, error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } };
  }

  const parsed = createCertificateSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      success: false,
      error: { code: 'VALIDATION_ERROR', message: parsed.error.issues[0]?.message || 'Invalid data' },
    };
  }

  try {
    const cert = await db.certificate.create({
      data: {
        ...parsed.data,
        date: new Date(parsed.data.date),
        credentialUrl: parsed.data.credentialUrl || null,
        image: parsed.data.image || null,
      },
    });

    revalidatePath('/certificates');
    revalidatePath('/admin/certificates');
    return { success: true, data: cert as unknown as Certificate };
  } catch (error) {
    return { success: false, error: { code: 'DB_ERROR', message: 'Failed to create certificate' } };
  }
}

export async function deleteCertificateAction(id: string): Promise<ApiResponse<{ id: string }>> {
  if (!(await checkAdminAuth())) {
    return { success: false, error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } };
  }

  try {
    await db.certificate.delete({ where: { id } });
    revalidatePath('/certificates');
    revalidatePath('/admin/certificates');
    return { success: true, data: { id } };
  } catch (error) {
    return { success: false, error: { code: 'DB_ERROR', message: 'Failed to delete certificate' } };
  }
}
