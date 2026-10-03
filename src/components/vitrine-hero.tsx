import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, ArrowRight, Radio, Terminal, ArrowUpRight } from 'lucide-react';
import type { Project } from '@/schemas/project-schema';
import { ArchitectureDiagram } from '@/components/architecture-diagram';
import { Sparkline } from '@/components/sparkline';
import { DataTicker } from '@/components/data-ticker';
import { SkillIcon } from '@/components/skill-icon';

interface VitrineHeroProps {
  featuredProject: Project | null;
  totalSpecimens: number;
  liveSpecimens: number;
}

export function VitrineHero({
  featuredProject,
  totalSpecimens,
  liveSpecimens,
}: VitrineHeroProps) {
  if (!featuredProject) {
    return (
      <section className="py-20 text-center font-mono text-xs text-muted-foreground">
        No projects found. Please run seed script to populate projects.
      </section>
    );
  }

  return (
    <section aria-label="Featured Project Hero" className="space-y-6 pt-1 sm:pt-2 pb-6 sm:pb-8">
      {/* Top Profile Intro Strip */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 border-b border-border pb-6">
        <div className="space-y-3 flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-secondary text-primary border border-border">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Available for New Roles & Projects</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif tracking-tight font-normal text-foreground max-w-2xl leading-[1.2] text-balance">
            Hi, I'm Elvien. I build fast, reliable web applications from idea to launch.
          </h1>

          <p className="text-xs sm:text-sm md:text-base font-sans text-muted-foreground max-w-2xl leading-relaxed">
            I am a full-stack software engineer based in Indonesia. I create modern web apps,
            point-of-sale systems, and automation bots using Next.js 16, TypeScript, and PostgreSQL.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/projects"
              className="px-4 py-2.5 min-h-[44px] rounded bg-primary text-primary-foreground font-mono text-xs uppercase tracking-wider font-semibold hover:bg-primary/90 transition-all inline-flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/about"
              className="px-4 py-2.5 min-h-[44px] rounded border border-border bg-secondary/50 text-foreground font-mono text-xs uppercase tracking-wider hover:bg-secondary transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <span>About Me</span>
            </Link>
          </div>
        </div>

        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 pt-2 sm:pt-0 font-mono text-xs text-muted-foreground shrink-0 border-t sm:border-t-0 border-border/60">
          <div className="text-foreground font-semibold text-xs sm:text-sm">
            {totalSpecimens} Live Web Projects
          </div>
          <div className="text-[11px] sm:text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            {liveSpecimens} Operational Endpoints
          </div>
        </div>
      </div>

      {/* Main Showcase Card */}
      <div className="vitrine-border bg-card rounded-xl p-4 sm:p-6 lg:p-10 relative overflow-hidden transition-all duration-300">
        <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Column: Image Preview */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-muted-foreground">
              <span className="text-primary font-bold">Featured Project</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-semibold border border-emerald-300 dark:border-emerald-800 text-[11px]">
                <Radio className="w-2.5 h-2.5 animate-pulse text-emerald-600 dark:text-emerald-400" />
                <span>Live in Production</span>
              </span>
            </div>

            {featuredProject.image ? (
              <div className="relative aspect-[16/10] w-full rounded-lg border border-border bg-secondary/30 overflow-hidden pin-tilted shadow-md">
                <Image
                  src={featuredProject.image}
                  alt={`Screenshot of ${featuredProject.title}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="aspect-[16/10] w-full rounded-lg border border-border bg-secondary/40 flex items-center justify-center font-mono text-xs text-muted-foreground pin-tilted">
                [Project Screenshot]
              </div>
            )}

            <div className="p-3 rounded border border-border/80 bg-secondary/30 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Terminal className="w-3.5 h-3.5 text-primary" />
                <span className="text-[11px]">System Status: Online & Stable</span>
              </div>
              <Sparkline width={100} height={18} />
            </div>
          </div>

          {/* Right Column: Project Details */}
          <div className="lg:col-span-5 space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-border pb-2 text-xs font-mono">
                <span className="text-primary font-bold uppercase tracking-wider">
                  {featuredProject.category}
                </span>
                <span className="text-muted-foreground">
                  Year {featuredProject.year}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-normal text-foreground leading-tight">
                {featuredProject.title}
              </h2>

              <p className="text-xs sm:text-sm font-sans text-muted-foreground leading-relaxed line-clamp-4">
                {featuredProject.description}
              </p>
            </div>

            {/* Architecture Topology */}
            <ArchitectureDiagram
              services={featuredProject.services || 3}
              databases={featuredProject.databases || 1}
              category={featuredProject.category}
            />

            {/* Technologies */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block">
                Technologies Used
              </span>
              <div className="flex flex-wrap gap-1.5">
                {featuredProject.tech.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono bg-secondary text-foreground border border-border/70"
                  >
                    <SkillIcon name={tag} className="w-3.5 h-3.5 shrink-0" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 font-mono text-xs">
              {featuredProject.link && (
                <a
                  href={featuredProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 min-h-[44px] rounded bg-primary text-primary-foreground uppercase tracking-wider font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow cursor-pointer text-center"
                >
                  <span>Visit Live Demo</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}

              <Link
                href={`/projects/${featuredProject.slug}`}
                className="px-4 py-3 min-h-[44px] rounded border border-border bg-secondary/50 text-foreground uppercase tracking-wider hover:bg-secondary transition-colors flex items-center justify-center gap-2 text-center"
              >
                <span>Project Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Telemetry Ticker */}
      <DataTicker
        totalSpecimens={totalSpecimens}
        liveSpecimens={liveSpecimens}
        lastCommit="Active on GitHub • 100% Deployed"
      />
    </section>
  );
}
