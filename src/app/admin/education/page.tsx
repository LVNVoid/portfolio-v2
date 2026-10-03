import type { Metadata } from 'next';
import { Plus, Trash2, GraduationCap } from 'lucide-react';
import db from '@/services/db';
import { createEducationAction, deleteEducationAction } from '@/actions/education-actions';

export const metadata: Metadata = {
  title: 'Manage Education — The Specimen Cabinet',
};

export default async function AdminEducationPage() {
  const educations = await db.education.findMany({
    orderBy: { createdAt: 'desc' },
  }).catch(() => []);

  async function handleCreate(formData: FormData) {
    'use server';
    const school = formData.get('school') as string;
    const degree = formData.get('degree') as string;
    const year = formData.get('year') as string;
    const description = formData.get('description') as string;

    await createEducationAction({
      school,
      degree,
      year,
      description: description || undefined,
    });
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="border-b border-border pb-4 space-y-1">
        <h1 className="text-2xl font-serif font-normal text-foreground">
          Academic Registry
        </h1>
        <p className="text-xs font-mono text-muted-foreground">
          Record formal university education, degree milestones, and coursework focus.
        </p>
      </div>

      {/* Quick Add Form */}
      <div className="vitrine-border bg-card p-6 rounded-lg space-y-4">
        <h2 className="font-mono text-xs uppercase tracking-wider text-primary font-bold">
          Register New Academic Milestone
        </h2>
        <form action={handleCreate} className="space-y-4 font-mono text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-muted-foreground uppercase text-[10px]">Institution / University *</label>
              <input
                name="school"
                required
                placeholder="e.g. Universitas Terbuka"
                className="w-full h-11 min-h-[44px] px-3 rounded border border-border bg-background text-foreground text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-muted-foreground uppercase text-[10px]">Degree / Major *</label>
              <input
                name="degree"
                required
                placeholder="Bachelor of Science in Information Systems"
                className="w-full h-11 min-h-[44px] px-3 rounded border border-border bg-background text-foreground text-sm"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-muted-foreground uppercase text-[10px]">Year Span *</label>
            <input
              name="year"
              required
              placeholder="e.g. 2023 - Present"
              className="w-full h-11 min-h-[44px] px-3 rounded border border-border bg-background text-foreground text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-muted-foreground uppercase text-[10px]">Curricular Description</label>
            <textarea
              name="description"
              rows={3}
              placeholder="Focus areas, distributed systems research, academic thesis..."
              className="w-full p-3 rounded border border-border bg-background text-foreground text-sm leading-relaxed"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 min-h-[44px] rounded bg-primary text-primary-foreground font-semibold uppercase tracking-wider text-xs hover:bg-primary/90 transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Store Academic Milestone</span>
          </button>
        </form>
      </div>

      {/* Education List */}
      <div className="vitrine-border bg-card rounded-lg overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead className="bg-secondary/60 text-muted-foreground uppercase text-[10px] tracking-wider border-b border-border">
            <tr>
              <th className="p-3 sm:p-4">Institution</th>
              <th className="p-3 sm:p-4">Degree</th>
              <th className="p-3 sm:p-4">Year</th>
              <th className="p-3 sm:p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {educations.length > 0 ? (
              educations.map((edu) => (
                <tr key={edu.id} className="hover:bg-secondary/20 transition-colors">
                  <td className="p-3 sm:p-4 font-semibold text-foreground text-sm font-serif">
                    {edu.school}
                  </td>
                  <td className="p-3 sm:p-4 text-muted-foreground">{edu.degree}</td>
                  <td className="p-3 sm:p-4 text-primary font-bold">{edu.year}</td>
                  <td className="p-3 sm:p-4 text-right">
                    <form
                      action={async () => {
                        'use server';
                        await deleteEducationAction(edu.id);
                      }}
                    >
                      <button
                        type="submit"
                        className="p-2 min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded border border-destructive/20 bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors cursor-pointer"
                        title="Delete Education"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-8 text-center text-muted-foreground">
                  No academic entries recorded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
