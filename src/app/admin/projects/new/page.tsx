import type { Metadata } from 'next';
import { AdminProjectForm } from '@/components/admin-project-form';

export const metadata: Metadata = {
  title: 'Catalog New Specimen — The Specimen Cabinet',
};

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-serif font-normal text-foreground">
          Catalog New Specimen
        </h1>
        <p className="text-xs font-mono text-muted-foreground">
          Register new production software system into the museum vitrine archive.
        </p>
      </div>

      <AdminProjectForm />
    </div>
  );
}
