import db from '@/services/db';
import type { Profile } from '@/schemas/profile-schema';

export const STATIC_PROFILE: Profile = {
  id: 'default-profile',
  name: 'Elvien Aninditha Purnawan',
  role: 'Full Stack Developer & Software Engineer',
  bio: 'Full-Stack Software Engineer specializing in building modern, resilient, high-performance web applications and autonomous systems with Next.js and TypeScript. Dedicated to end-to-end craft, strict type contracts, and zero-defect deployments.',
  location: 'Jakarta, Indonesia (WIB / UTC+7)',
  email: 'elvien.purnawan13@gmail.com',
  avatar: '/avatar-light.jpg',
  socials: {
    github: 'https://github.com/LVNVoid',
    linkedin: 'https://linkedin.com/in/elvien',
    website: 'https://elvien.net',
    twitter: 'https://twitter.com/elviencode',
  },
};

export async function getProfile(): Promise<Profile | null> {
  try {
    const raw = await db.profile.findFirst();
    if (raw) return raw as unknown as Profile;
  } catch (error) {
    // Graceful fallback
  }
  return STATIC_PROFILE;
}
