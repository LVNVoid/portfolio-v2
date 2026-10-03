'use server';

import { contactSchema, type ContactPayload } from '@/schemas/contact-schema';
import type { ApiResponse } from '@/types/api';

export async function submitContactAction(
  payload: ContactPayload
): Promise<ApiResponse<{ received: true }>> {
  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    return {
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: parsed.error.issues[0]?.message || 'Invalid form input.',
      },
    };
  }

  // Log dispatch in production / can integrate Resend or webhook
  console.log('Inquiry dispatch received:', {
    from: parsed.data.name,
    email: parsed.data.email,
    subject: parsed.data.subject,
    date: new Date().toISOString(),
  });

  return {
    success: true,
    data: { received: true },
    message: 'Your inquiry dispatch has been logged in the curator desk.',
  };
}
