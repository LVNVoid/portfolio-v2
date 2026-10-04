'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createProjectSchema,
  type CreateProjectPayload,
  type Project,
} from '@/schemas/project-schema';
import { createProjectAction, updateProjectAction } from '@/actions/project-actions';
import { StorageUpload } from '@/components/storage-upload';
import { Save, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface AdminProjectFormProps {
  initialProject?: Project;
}

export function AdminProjectForm({ initialProject }: AdminProjectFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = React.useState<string | null>(null);

  const isEditing = !!initialProject;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      title: initialProject?.title || '',
      slug: initialProject?.slug || '',
      description: initialProject?.description || '',
      content: initialProject?.content || '',
      tech: initialProject?.tech || ['Next.js', 'TypeScript', 'Tailwind CSS'],
      link: initialProject?.link || '',
      github: initialProject?.github || '',
      image: initialProject?.image || '',
      featured: initialProject?.featured || false,
      status: initialProject?.status || 'LIVE',
      year: initialProject?.year || 2026,
      category: initialProject?.category || 'Web Application',
      services: initialProject?.services || 2,
      databases: initialProject?.databases || 1,
    },
  });

  const [imageUrl, setImageUrl] = React.useState(initialProject?.image || '');
  const [techString, setTechString] = React.useState(
    initialProject?.tech.join(', ') || 'Next.js, TypeScript, Tailwind CSS'
  );

  async function onSubmit(values: any) {
    const data = values as CreateProjectPayload;
    setServerError(null);
    const techArray = techString
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const payload: CreateProjectPayload = {
      ...data,
      image: imageUrl || undefined,
      tech: techArray.length > 0 ? techArray : ['General'],
    };

    let res;
    if (isEditing && initialProject) {
      res = await updateProjectAction(initialProject.id, payload);
    } else {
      res = await createProjectAction(payload);
    }

    if (!res.success) {
      setServerError(res.error.message);
      return;
    }

    router.push('/admin/projects');
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors min-h-[44px] py-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Projects Registry</span>
        </Link>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-5 py-2.5 min-h-[44px] rounded bg-primary text-primary-foreground font-mono text-xs uppercase tracking-wider font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2 cursor-pointer disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Cataloging...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>{isEditing ? 'Update Specimen' : 'Catalog Specimen'}</span>
            </>
          )}
        </button>
      </div>

      {serverError && (
        <div
          role="alert"
          className="p-3.5 rounded border border-destructive/30 bg-destructive/10 text-destructive text-sm flex items-start gap-2.5 font-mono text-xs"
        >
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{serverError}</span>
        </div>
      )}

      <div className="vitrine-border bg-card p-6 rounded-lg space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs uppercase font-mono text-muted-foreground">
              Specimen Title *
            </label>
            <input
              {...register('title')}
              placeholder="e.g. Kopi Sangkara POS"
              className="w-full h-11 min-h-[44px] px-3.5 rounded border border-border bg-background text-foreground text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.title && (
              <p className="text-[11px] font-mono text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs uppercase font-mono text-muted-foreground">
              Unique Slug ID *
            </label>
            <input
              {...register('slug')}
              placeholder="kopi-sangkara-pos"
              className="w-full h-11 min-h-[44px] px-3.5 rounded border border-border bg-background text-foreground text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary font-mono text-xs"
            />
            {errors.slug && (
              <p className="text-[11px] font-mono text-destructive">{errors.slug.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs uppercase font-mono text-muted-foreground">
            Exhibition Abstract / Summary *
          </label>
          <textarea
            rows={4}
            {...register('description')}
            placeholder="Detailed narrative describing architecture, capabilities, and system ergonomics..."
            className="w-full p-3.5 rounded border border-border bg-background text-foreground text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary leading-relaxed"
          />
          {errors.description && (
            <p className="text-[11px] font-mono text-destructive">{errors.description.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs uppercase font-mono text-muted-foreground">
              Operating Status
            </label>
            <select
              {...register('status')}
              className="w-full h-11 min-h-[44px] px-3 rounded border border-border bg-background text-foreground text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary font-mono text-xs"
            >
              <option value="LIVE">LIVE (Active Endpoint)</option>
              <option value="ARCHIVED">ARCHIVED</option>
              <option value="IN_PROGRESS">IN_PROGRESS</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs uppercase font-mono text-muted-foreground">
              Year Anno
            </label>
            <input
              type="number"
              {...register('year', { valueAsNumber: true })}
              className="w-full h-11 min-h-[44px] px-3.5 rounded border border-border bg-background text-foreground text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary font-mono text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs uppercase font-mono text-muted-foreground">
              Taxonomy Category
            </label>
            <input
              {...register('category')}
              placeholder="e.g. POS & Retail"
              className="w-full h-11 min-h-[44px] px-3.5 rounded border border-border bg-background text-foreground text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary font-mono text-xs"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs uppercase font-mono text-muted-foreground">
            Technologies & Frameworks (Comma Separated)
          </label>
          <input
            value={techString}
            onChange={(e) => setTechString(e.target.value)}
            placeholder="Next.js 16, TypeScript, Tailwind CSS, Prisma, PostgreSQL"
            className="w-full h-11 min-h-[44px] px-3.5 rounded border border-border bg-background text-foreground text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary font-mono text-xs"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs uppercase font-mono text-muted-foreground">
              Living Endpoint URL
            </label>
            <input
              {...register('link')}
              placeholder="https://app.example.com"
              className="w-full h-11 min-h-[44px] px-3.5 rounded border border-border bg-background text-foreground text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary font-mono text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs uppercase font-mono text-muted-foreground">
              GitHub Source Repository URL
            </label>
            <input
              {...register('github')}
              placeholder="https://github.com/LVNVoid/..."
              className="w-full h-11 min-h-[44px] px-3.5 rounded border border-border bg-background text-foreground text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary font-mono text-xs"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs uppercase font-mono text-muted-foreground">
            Specimen Display Image
          </label>
          <StorageUpload
            value={imageUrl ?? ''}
            onChange={(url) => { setImageUrl(url); setValue('image', url); }}
            folder="projects"
            placeholder="Upload or paste image URL..."
            className="w-full h-11 min-h-[44px] px-3.5 rounded border border-border bg-background text-foreground text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary font-mono text-xs"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="space-y-1.5">
            <label className="block text-xs uppercase font-mono text-muted-foreground">
              Service Nodes Count
            </label>
            <input
              type="number"
              {...register('services', { valueAsNumber: true })}
              className="w-full h-11 min-h-[44px] px-3.5 rounded border border-border bg-background text-foreground text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary font-mono text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs uppercase font-mono text-muted-foreground">
              Database Instances Count
            </label>
            <input
              type="number"
              {...register('databases', { valueAsNumber: true })}
              className="w-full h-11 min-h-[44px] px-3.5 rounded border border-border bg-background text-foreground text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary font-mono text-xs"
            />
          </div>
        </div>

        <div className="pt-2 flex items-center gap-2">
          <input
            id="featured"
            type="checkbox"
            {...register('featured')}
            className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
          />
          <label htmlFor="featured" className="text-xs font-mono text-foreground cursor-pointer select-none">
            Feature prominently on museum homepage hero vitrine
          </label>
        </div>
      </div>
    </form>
  );
}
