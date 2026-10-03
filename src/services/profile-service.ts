import db from '@/services/db';
import type { Profile } from '@/schemas/profile-schema';

export async function getProfile(): Promise<Profile | null> {
  try {
    const raw = await db.profile.findFirst();
    if (!raw) return null;
    return raw as unknown as Profile;
  } catch (error) {
    console.error('Failed to query profile:', error);
    return null;
  }
}
