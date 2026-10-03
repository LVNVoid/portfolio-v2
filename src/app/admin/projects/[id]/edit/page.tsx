import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import db from '@/services/db';
import { AdminProjectForm } from '@/components/admin-project-form';
import type { Project } from '@/schemas/project-schema';

interface PageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: 'Edit Specimen — The Specimen Cabinet',
};

export default async function EditProjectPage({ params }: PageProps) {
  const { id } = await params;
  const project = await db.project.findUnique({ where: { id } }).catch(() => null);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-serif font-normal text-foreground">
          Edit Specimen Record
        </h1>
        <p className="text-xs font-mono text-muted-foreground">
          Update architectural metadata, endpoint parameters, and display assets.
        </p>
      </div>

      <AdminProjectForm initialProject={project as unknown as Project} />
    </div>
  );
}
