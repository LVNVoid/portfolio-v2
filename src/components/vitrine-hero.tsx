import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, ArrowRight, Radio, Shield, Terminal, ArrowUpRight } from 'lucide-react';
import type { Project } from '@/schemas/project-schema';
import { ArchitectureDiagram } from '@/components/architecture-diagram';
import { Sparkline } from '@/components/sparkline';
import { DataTicker } from '@/components/data-ticker';

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
        Museum vitrine empty. Run database seed to populate specimens.
      </section>
    );
  }

  return (
    <section
      aria-label="Featured Museum Vitrine Case"
      className="space-y-6 pt-2 pb-8"
    >
      {/* Top Brass Plate Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-border pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-[11px] font-mono tracking-widest uppercase bg-secondary text-primary border border-border">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span>Vitrine Exhibition Ref: SC-01</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight font-normal text-foreground">
            The Specimen Cabinet
          </h1>
          <p className="text-xs sm:text-sm font-sans text-muted-foreground max-w-xl">
            A preserved collection of production-grade software systems. Every project
            is a living specimen—architected, deployed, and operational.
          </p>
        </div>

        <div className="text-right sm:text-right font-mono text-xs text-muted-foreground">
          <div className="text-foreground font-semibold">
            {totalSpecimens} Cataloged Records
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400">
            {liveSpecimens} Living Endpoints Active
          </div>
        </div>
      </div>

      {/* Main Glass Vitrine Case (The Featured Specimen) */}
      <div className="vitrine-border bg-card rounded-xl p-6 sm:p-8 lg:p-10 relative overflow-hidden transition-all duration-300">
        {/* Brass Header Band Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/80 via-primary to-primary/40" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Pin-Mounted Screenshot with Natural Depth */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
              <span className="text-primary font-bold">Exhibit #{featuredProject.slug}</span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-semibold border border-emerald-300 dark:border-emerald-800">
                <Radio className="w-3 h-3 animate-pulse text-emerald-600 dark:text-emerald-400" />
                <span>OPERATING IN PRODUCTION</span>
              </span>
            </div>

            {featuredProject.image ? (
              <div className="relative aspect-[16/10] w-full rounded-lg border border-border bg-secondary/30 overflow-hidden pin-tilted shadow-md">
                <Image
                  src={featuredProject.image}
                  alt={`Specimen capture of ${featuredProject.title}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="aspect-[16/10] w-full rounded-lg border border-border bg-secondary/40 flex items-center justify-center font-mono text-xs text-muted-foreground pin-tilted">
                [Exhibit Display Plate]
              </div>
            )}

            {/* Micro Activity & Telemetry Strip */}
            <div className="p-3 rounded border border-border/80 bg-secondary/30 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Terminal className="w-3.5 h-3.5 text-primary" />
                <span className="text-[11px]">System Activity Stream</span>
              </div>
              <Sparkline width={100} height={18} />
            </div>
          </div>

          {/* Right Column: Specimen Label Card with Strict Taxonomy */}
          <div className="lg:col-span-5 space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">
                  Specimen Card Index
                </span>
                <span className="text-[10px] font-mono text-muted-foreground">
                  Anno {featuredProject.year}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-normal text-foreground leading-tight">
                {featuredProject.title}
              </h2>

              <p className="text-xs sm:text-sm font-sans text-muted-foreground leading-relaxed">
                {featuredProject.description}
              </p>
            </div>

            {/* Architecture Topology */}
            <ArchitectureDiagram
              services={featuredProject.services || 3}
              databases={featuredProject.databases || 1}
              category={featuredProject.category}
            />

            {/* Taxonomy Tags */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block">
                Integrated Frameworks & Protocols
              </span>
              <div className="flex flex-wrap gap-1.5">
                {featuredProject.tech.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded text-xs font-mono bg-secondary text-foreground border border-border/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Direct Action Drawer Links */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {featuredProject.link && (
                <a
                  href={featuredProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 min-h-[44px] rounded bg-primary text-primary-foreground font-mono text-xs uppercase tracking-wider font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow cursor-pointer text-center"
                >
                  <span>Examine Living Endpoint</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}

              <Link
                href={`/projects/${featuredProject.slug}`}
                className="px-4 py-3 min-h-[44px] rounded border border-border bg-secondary/50 text-foreground font-mono text-xs uppercase tracking-wider hover:bg-secondary transition-colors flex items-center justify-center gap-2 text-center"
              >
                <span>Full Case Record</span>
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
        lastCommit="Catalog Registry Active · Node v26.8"
      />
    </section>
  );
}
