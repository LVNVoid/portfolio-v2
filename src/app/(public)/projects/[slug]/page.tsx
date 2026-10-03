import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ExternalLink, Github, Radio, Calendar, Tag, ShieldAlert } from 'lucide-react';
import { getProjectBySlug, getProjects } from '@/services/project-service';
import { ArchitectureDiagram } from '@/components/architecture-diagram';
import { Sparkline } from '@/components/sparkline';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: 'Specimen Not Found' };
  }

  return {
    title: `${project.title} — Specimen Record | Elvien`,
    description: project.description.slice(0, 160),
    openGraph: {
      title: `${project.title} — Specimen Record`,
      description: project.description.slice(0, 160),
      images: project.image ? [project.image] : [],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const isLive = project.status === 'LIVE';

  return (
    <article className="space-y-10 max-w-4xl mx-auto">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors min-h-[44px] py-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Collection</span>
        </Link>
        <span className="text-border select-none">/</span>
        <span className="text-primary font-bold">#{project.slug}</span>
      </nav>

      {/* Main Specimen Dossier Shell */}
      <div className="vitrine-border bg-card rounded-xl p-6 sm:p-10 space-y-8 relative overflow-hidden">
        {/* Brass Header Band Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary" />

        {/* Specimen Metadata Header Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4 font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-secondary text-primary font-bold border border-border">
              CAT-ID: #{project.slug}
            </span>
            <span className="text-muted-foreground flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Anno {project.year}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">{project.category}</span>
            {isLive ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-semibold border border-emerald-300 dark:border-emerald-800">
                <Radio className="w-3 h-3 animate-pulse text-emerald-600 dark:text-emerald-400" />
                <span>LIVE ENDPOINT</span>
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded bg-secondary text-muted-foreground">
                {project.status}
              </span>
            )}
          </div>
        </div>

        {/* Project Title & Sparkline */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-foreground">
              {project.title}
            </h1>
            <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <span>Telemetry:</span>
              <Sparkline width={80} height={16} />
            </div>
          </div>
          <p className="text-sm sm:text-base font-sans text-muted-foreground leading-relaxed whitespace-pre-line">
            {project.description}
          </p>
        </div>

        {/* Display Image Plate */}
        {project.image && (
          <div className="relative aspect-[16/10] w-full rounded-lg border border-border overflow-hidden shadow-lg">
            <Image
              src={project.image}
              alt={`Exhibition visual of ${project.title}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
            />
          </div>
        )}

        {/* Architecture Topology Breakdown */}
        <div className="space-y-3 pt-2">
          <h2 className="text-xs font-mono uppercase tracking-widest text-primary font-bold">
            Architectural System Topology
          </h2>
          <ArchitectureDiagram
            services={project.services || 2}
            databases={project.databases || 1}
            category={project.category}
          />
        </div>

        {/* Integrated Frameworks & Stack */}
        <div className="space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-widest text-primary font-bold">
            Integrated Protocols & Libraries
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded text-xs font-mono bg-secondary text-foreground border border-border"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Footbar */}
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors min-h-[44px] py-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Catalog Index</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 min-h-[44px] rounded border border-border bg-secondary/50 text-foreground font-mono text-xs uppercase tracking-wider hover:bg-secondary transition-colors inline-flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                <span>Source Repository</span>
              </a>
            )}

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 min-h-[44px] rounded bg-primary text-primary-foreground font-mono text-xs uppercase tracking-wider font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2 shadow"
              >
                <span>Inspect Live Endpoint</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
