import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, Github, ArrowRight, Radio } from 'lucide-react';
import type { Project } from '@/schemas/project-schema';
import { ArchitectureDiagram } from '@/components/architecture-diagram';
import { Sparkline } from '@/components/sparkline';
import { SkillIcon } from '@/components/skill-icon';

interface SpecimenCardProps {
  project: Project;
  featured?: boolean;
}

export function SpecimenCard({ project, featured = false }: SpecimenCardProps) {
  const isLive = project.status === 'LIVE';

  return (
    <article
      className={`group vitrine-border bg-card rounded-lg overflow-hidden transition-all duration-300 hover:border-primary/60 hover:-translate-y-1 hover:shadow-md active:scale-[0.99] flex flex-col justify-between ${
        featured ? 'md:col-span-2' : ''
      }`}
    >
      {/* Top Project Registry Bar */}
      <div className="px-4 py-2.5 border-b border-border bg-secondary/40 flex items-center justify-between font-mono text-[10px] tracking-wider uppercase">
        <div className="flex items-center gap-2">
          <span className="text-primary font-bold">{project.category}</span>
          <span className="text-muted-foreground/60 select-none">/</span>
          <span className="text-muted-foreground">Year {project.year}</span>
        </div>

        <div className="flex items-center gap-2">
          {isLive ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-semibold border border-emerald-300 dark:border-emerald-800 text-[10px]">
              <Radio className="w-2.5 h-2.5 animate-pulse text-emerald-600 dark:text-emerald-400" />
              <span>LIVE</span>
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded bg-secondary text-muted-foreground text-[10px]">
              {project.status}
            </span>
          )}
        </div>
      </div>

      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-4">
        <div>
          {/* Title & Description */}
          <h3 className="font-serif text-xl sm:text-2xl font-normal text-foreground group-hover:text-primary transition-colors">
            <Link href={`/projects/${project.slug}`} className="hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded">
              {project.title}
            </Link>
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground font-sans line-clamp-3 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Display Thumbnail */}
        {project.image && (
          <div className="relative aspect-[16/9] w-full rounded border border-border/80 bg-secondary/30 overflow-hidden pin-tilted my-1">
            <Image
              src={project.image}
              alt={`Preview of ${project.title}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              loading="lazy"
            />
          </div>
        )}

        {/* Technical Architecture Topology */}
        <ArchitectureDiagram
          services={project.services || 2}
          databases={project.databases || 1}
          category={project.category}
        />

        {/* Tech Stack Tags */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
            <span>Technologies</span>
            <Sparkline width={60} height={14} />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono bg-secondary/70 text-foreground border border-border/70 hover:border-primary/40 transition-colors"
              >
                <SkillIcon name={tag} className="w-3 h-3 shrink-0" />
                <span>{tag}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Footbar */}
      <div className="px-5 py-3.5 border-t border-border bg-secondary/20 flex items-center justify-between gap-3 text-xs font-mono">
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors min-h-[44px] py-2"
        >
          <span>Project Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        <div className="flex items-center gap-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded border border-border bg-secondary/40 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
              title="View Source Code"
              aria-label={`Source repository for ${project.title}`}
            >
              <Github className="w-4 h-4" />
            </a>
          )}

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 min-h-[44px] inline-flex items-center gap-1.5 rounded bg-primary text-primary-foreground font-semibold uppercase tracking-wider text-[11px] hover:bg-primary/90 transition-colors shadow-sm cursor-pointer"
            >
              <span>Live Demo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
