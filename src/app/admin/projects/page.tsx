import type { Metadata } from 'next';
import Link from 'next/link';
import { Plus, Edit, Trash2, ExternalLink, Radio } from 'lucide-react';
import db from '@/services/db';
import { deleteProjectAction } from '@/actions/project-actions';

export const metadata: Metadata = {
  title: 'Manage Projects — The Specimen Cabinet',
};

export default async function AdminProjectsPage() {
  const projects = await db.project.findMany({
    orderBy: { createdAt: 'desc' },
  }).catch(() => []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-serif font-normal text-foreground">
            Projects Registry
          </h1>
          <p className="text-xs font-mono text-muted-foreground">
            Cataloged software specimens displayed in public vitrine.
          </p>
        </div>

        <Link
          href="/admin/projects/new"
          className="px-4 py-2 min-h-[44px] rounded bg-primary text-primary-foreground font-mono text-xs uppercase tracking-wider font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-1.5 shadow"
        >
          <Plus className="w-4 h-4" />
          <span>Catalog Specimen</span>
        </Link>
      </div>

      <div className="vitrine-border bg-card rounded-lg overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead className="bg-secondary/60 text-muted-foreground uppercase text-[10px] tracking-wider border-b border-border">
            <tr>
              <th className="p-3 sm:p-4">Specimen</th>
              <th className="p-3 sm:p-4">Status</th>
              <th className="p-3 sm:p-4">Category</th>
              <th className="p-3 sm:p-4">Year</th>
              <th className="p-3 sm:p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {projects.length > 0 ? (
              projects.map((project) => (
                <tr key={project.id} className="hover:bg-secondary/20 transition-colors">
                  <td className="p-3 sm:p-4">
                    <div className="font-semibold text-foreground text-sm font-serif">
                      {project.title}
                    </div>
                    <div className="text-[11px] text-muted-foreground font-mono">
                      #{project.slug}
                    </div>
                  </td>
                  <td className="p-3 sm:p-4">
                    {project.status === 'LIVE' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-semibold border border-emerald-300 dark:border-emerald-800 text-[10px]">
                        <Radio className="w-2.5 h-2.5 animate-pulse text-emerald-600 dark:text-emerald-400" />
                        <span>LIVE</span>
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-secondary text-muted-foreground text-[10px]">
                        {project.status}
                      </span>
                    )}
                  </td>
                  <td className="p-3 sm:p-4 text-muted-foreground">
                    {project.category}
                  </td>
                  <td className="p-3 sm:p-4 text-muted-foreground">
                    {project.year}
                  </td>
                  <td className="p-3 sm:p-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <Link
                        href={`/admin/projects/${project.id}/edit`}
                        className="p-2 min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded border border-border bg-secondary/30 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                        title="Edit Specimen"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Link>

                      <form
                        action={async () => {
                          'use server';
                          await deleteProjectAction(project.id);
                        }}
                      >
                        <button
                          type="submit"
                          className="p-2 min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded border border-destructive/20 bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors cursor-pointer"
                          title="Remove Specimen"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-8 text-center text-muted-foreground">
                  No specimens cataloged yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
