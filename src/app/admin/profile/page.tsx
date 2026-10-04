import type { Metadata } from 'next';
import { Save, User } from 'lucide-react';
import db from '@/services/db';
import { updateProfileAction } from '@/actions/profile-actions';
import { StorageUpload } from '@/components/storage-upload';

export const metadata: Metadata = {
  title: 'Curator Profile — The Specimen Cabinet',
};

export default async function AdminProfilePage() {
  const profile = await db.profile.findFirst().catch(() => null);

  async function handleUpdate(formData: FormData) {
    'use server';
    const name = formData.get('name') as string;
    const role = formData.get('role') as string;
    const bio = formData.get('bio') as string;
    const location = formData.get('location') as string;
    const email = formData.get('email') as string;
    const avatar = formData.get('avatar') as string;
    const github = formData.get('github') as string;
    const linkedin = formData.get('linkedin') as string;
    const website = formData.get('website') as string;

    await updateProfileAction({
      name,
      role,
      bio,
      location: location || undefined,
      email,
      avatar: avatar || undefined,
      socials: {
        github,
        linkedin,
        website,
      },
    });
  }

  const socials = (profile?.socials as { github?: string; linkedin?: string; website?: string }) || {};

  return (
    <div className="space-y-8 max-w-3xl">
      <div className="border-b border-border pb-4 space-y-1">
        <h1 className="text-2xl font-serif font-normal text-foreground">
          Curator Identity & Biography
        </h1>
        <p className="text-xs font-mono text-muted-foreground">
          Update public Field Notes narrative, avatar asset, and contact dispatch coordinates.
        </p>
      </div>

      <div className="vitrine-border bg-card p-6 sm:p-8 rounded-lg">
        <form action={handleUpdate} className="space-y-5 font-mono text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-muted-foreground uppercase text-[10px]">Curator Name *</label>
              <input
                name="name"
                required
                defaultValue={profile?.name || 'Elvien'}
                className="w-full h-11 min-h-[44px] px-3.5 rounded border border-border bg-background text-foreground text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-muted-foreground uppercase text-[10px]">Professional Role *</label>
              <input
                name="role"
                required
                defaultValue={profile?.role || 'Full-Stack Engineer'}
                className="w-full h-11 min-h-[44px] px-3.5 rounded border border-border bg-background text-foreground text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-muted-foreground uppercase text-[10px]">Email Coordinate *</label>
              <input
                name="email"
                type="email"
                required
                defaultValue={profile?.email || 'elvien.purnawan13@gmail.com'}
                className="w-full h-11 min-h-[44px] px-3.5 rounded border border-border bg-background text-foreground text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-muted-foreground uppercase text-[10px]">Location & Timezone</label>
              <input
                name="location"
                defaultValue={profile?.location || 'Indonesia (WIB / UTC+7)'}
                className="w-full h-11 min-h-[44px] px-3.5 rounded border border-border bg-background text-foreground text-sm"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-muted-foreground uppercase text-[10px]">Biography Narrative *</label>
            <textarea
              name="bio"
              required
              rows={5}
              defaultValue={
                profile?.bio ||
                'Full-Stack Software Engineer specializing in building and shipping scalable, resilient production systems from zero to cloud deployment.'
              }
              className="w-full p-3.5 rounded border border-border bg-background text-foreground text-sm leading-relaxed"
            />
          </div>

          <div className="space-y-1">
            <label className="text-muted-foreground uppercase text-[10px]">Avatar Media</label>
            <StorageUpload name="avatar" defaultValue={profile?.avatar || ''} folder="profile" placeholder="Upload or paste image URL..." />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="space-y-1">
              <label className="text-muted-foreground uppercase text-[10px]">GitHub URL</label>
              <input
                name="github"
                defaultValue={socials.github || 'https://github.com/LVNVoid'}
                className="w-full h-11 min-h-[44px] px-3 rounded border border-border bg-background text-foreground text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-muted-foreground uppercase text-[10px]">LinkedIn URL</label>
              <input
                name="linkedin"
                defaultValue={socials.linkedin || 'https://linkedin.com/in/elvien'}
                className="w-full h-11 min-h-[44px] px-3 rounded border border-border bg-background text-foreground text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-muted-foreground uppercase text-[10px]">Primary Domain</label>
              <input
                name="website"
                defaultValue={socials.website || 'https://elvien.net'}
                className="w-full h-11 min-h-[44px] px-3 rounded border border-border bg-background text-foreground text-xs"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <button
              type="submit"
              className="px-6 py-3 min-h-[44px] rounded bg-primary text-primary-foreground font-semibold uppercase tracking-wider text-xs hover:bg-primary/90 transition-colors inline-flex items-center gap-2 cursor-pointer shadow"
            >
              <Save className="w-4 h-4" />
              <span>Update Curator Record</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
