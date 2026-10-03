import type { Metadata } from 'next';
import { Plus, Trash2, Sparkles } from 'lucide-react';
import { SkillIcon } from '@/components/skill-icon';
import db from '@/services/db';
import { createSkillAction, deleteSkillAction } from '@/actions/skill-actions';

export const metadata: Metadata = {
  title: 'Manage Skills — The Specimen Cabinet',
};

export default async function AdminSkillsPage() {
  const skills = await db.skill.findMany({
    orderBy: [{ category: 'asc' }, { name: 'asc' }],
  }).catch(() => []);

  async function handleCreate(formData: FormData) {
    'use server';
    const name = formData.get('name') as string;
    const category = formData.get('category') as string;
    await createSkillAction({ name, category });
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="border-b border-border pb-4 space-y-1">
        <h1 className="text-2xl font-serif font-normal text-foreground">
          Skills Taxonomy Registry
        </h1>
        <p className="text-xs font-mono text-muted-foreground">
          Manage core competencies, languages, frameworks, and tools.
        </p>
      </div>

      {/* Quick Add Form */}
      <div className="vitrine-border bg-card p-6 rounded-lg space-y-4">
        <h2 className="font-mono text-xs uppercase tracking-wider text-primary font-bold">
          Register New Skill Unit
        </h2>
        <form action={handleCreate} className="flex flex-col sm:flex-row items-end gap-3 font-mono text-xs">
          <div className="space-y-1 flex-1 w-full">
            <label className="text-muted-foreground uppercase text-[10px]">Skill Name *</label>
            <input
              name="name"
              required
              placeholder="e.g. Next.js 16, PostgreSQL, Docker"
              className="w-full h-11 min-h-[44px] px-3.5 rounded border border-border bg-background text-foreground text-sm"
            />
          </div>

          <div className="space-y-1 w-full sm:w-48">
            <label className="text-muted-foreground uppercase text-[10px]">Taxonomy Category</label>
            <select
              name="category"
              className="w-full h-11 min-h-[44px] px-3 rounded border border-border bg-background text-foreground text-sm"
            >
              <option value="Language">Language</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="DevOps">DevOps</option>
              <option value="Database">Database</option>
              <option value="General">General</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-5 py-2.5 min-h-[44px] rounded bg-primary text-primary-foreground font-semibold uppercase tracking-wider text-xs hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Skill</span>
          </button>
        </form>
      </div>

      {/* Skills Grid Table */}
      <div className="vitrine-border bg-card rounded-lg overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead className="bg-secondary/60 text-muted-foreground uppercase text-[10px] tracking-wider border-b border-border">
            <tr>
              <th className="p-3 sm:p-4">Skill Name</th>
              <th className="p-3 sm:p-4">Category</th>
              <th className="p-3 sm:p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {skills.length > 0 ? (
              skills.map((skill) => (
                <tr key={skill.id} className="hover:bg-secondary/20 transition-colors">
                  <td className="p-3 sm:p-4 font-semibold text-foreground">
                    <div className="flex items-center gap-2">
                      <SkillIcon name={skill.name} className="w-4 h-4 shrink-0" />
                      <span>{skill.name}</span>
                    </div>
                  </td>
                  <td className="p-3 sm:p-4 text-primary">
                    <span className="px-2.5 py-0.5 rounded bg-secondary text-[11px] border border-border">
                      {skill.category}
                    </span>
                  </td>
                  <td className="p-3 sm:p-4 text-right">
                    <form
                      action={async () => {
                        'use server';
                        await deleteSkillAction(skill.id);
                      }}
                    >
                      <button
                        type="submit"
                        className="p-2 min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded border border-destructive/20 bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors cursor-pointer"
                        title="Delete Skill"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="p-8 text-center text-muted-foreground">
                  No skills registered in taxonomy yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
