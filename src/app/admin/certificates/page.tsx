import type { Metadata } from 'next';
import { Plus, Trash2, Award, ExternalLink } from 'lucide-react';
import db from '@/services/db';
import { deleteCertificateAction, createCertificateAction } from '@/actions/certificate-actions';
import { StorageUpload } from '@/components/storage-upload';

export const metadata: Metadata = {
  title: 'Manage Certificates — The Specimen Cabinet',
};

export default async function AdminCertificatesPage() {
  const certificates = await db.certificate.findMany({
    orderBy: { date: 'desc' },
  }).catch(() => []);

  async function handleCreate(formData: FormData) {
    'use server';
    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const issuer = formData.get('issuer') as string;
    const date = formData.get('date') as string;
    const credentialUrl = formData.get('credentialUrl') as string;
    const image = formData.get('image') as string;

    await createCertificateAction({
      name,
      slug,
      issuer,
      date: new Date(date || Date.now()),
      credentialUrl: credentialUrl || undefined,
      image: image || undefined,
    });
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="border-b border-border pb-4 space-y-1">
        <h1 className="text-2xl font-serif font-normal text-foreground">
          Credentials Gallery Registry
        </h1>
        <p className="text-xs font-mono text-muted-foreground">
          Catalog verified professional certifications and competency diplomas.
        </p>
      </div>

      {/* Quick Add Form */}
      <div className="vitrine-border bg-card p-6 rounded-lg space-y-4">
        <h2 className="font-mono text-xs uppercase tracking-wider text-primary font-bold">
          Register New Credential
        </h2>
        <form action={handleCreate} className="space-y-4 font-mono text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-muted-foreground uppercase text-[10px]">Certificate Title *</label>
              <input
                name="name"
                required
                placeholder="e.g. AWS Solutions Architect"
                className="w-full h-11 min-h-[44px] px-3 rounded border border-border bg-background text-foreground text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-muted-foreground uppercase text-[10px]">Slug ID *</label>
              <input
                name="slug"
                required
                placeholder="aws-solutions-architect"
                className="w-full h-11 min-h-[44px] px-3 rounded border border-border bg-background text-foreground text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-muted-foreground uppercase text-[10px]">Issuing Authority *</label>
              <input
                name="issuer"
                required
                placeholder="Amazon Web Services"
                className="w-full h-11 min-h-[44px] px-3 rounded border border-border bg-background text-foreground text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-muted-foreground uppercase text-[10px]">Date Conferred *</label>
              <input
                name="date"
                type="date"
                required
                defaultValue={new Date().toISOString().split('T')[0]}
                className="w-full h-11 min-h-[44px] px-3 rounded border border-border bg-background text-foreground text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-muted-foreground uppercase text-[10px]">Credential URL</label>
              <input
                name="credentialUrl"
                placeholder="https://credly.com/..."
                className="w-full h-11 min-h-[44px] px-3 rounded border border-border bg-background text-foreground text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-muted-foreground uppercase text-[10px]">Image Asset</label>
              <StorageUpload name="image" folder="certificates" placeholder="Upload or paste image URL..." />
            </div>
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 min-h-[44px] rounded bg-primary text-primary-foreground font-semibold uppercase tracking-wider text-xs hover:bg-primary/90 transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Store Credential</span>
          </button>
        </form>
      </div>

      {/* Certificates List */}
      <div className="vitrine-border bg-card rounded-lg overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead className="bg-secondary/60 text-muted-foreground uppercase text-[10px] tracking-wider border-b border-border">
            <tr>
              <th className="p-3 sm:p-4">Certificate</th>
              <th className="p-3 sm:p-4">Issuer</th>
              <th className="p-3 sm:p-4">Date</th>
              <th className="p-3 sm:p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {certificates.length > 0 ? (
              certificates.map((cert) => (
                <tr key={cert.id} className="hover:bg-secondary/20 transition-colors">
                  <td className="p-3 sm:p-4">
                    <div className="font-semibold text-foreground text-sm font-serif">{cert.name}</div>
                    <div className="text-[11px] text-muted-foreground">#{cert.slug}</div>
                  </td>
                  <td className="p-3 sm:p-4 text-muted-foreground">{cert.issuer}</td>
                  <td className="p-3 sm:p-4 text-muted-foreground">
                    {new Date(cert.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                  </td>
                  <td className="p-3 sm:p-4 text-right">
                    <form
                      action={async () => {
                        'use server';
                        await deleteCertificateAction(cert.id);
                      }}
                    >
                      <button
                        type="submit"
                        className="p-2 min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded border border-destructive/20 bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors cursor-pointer"
                        title="Delete Certificate"
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
                  No credentials registered yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
