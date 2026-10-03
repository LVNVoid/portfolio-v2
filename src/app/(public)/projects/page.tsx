import type { Metadata } from 'next';
import { getProjects } from '@/services/project-service';
import { CollectionGrid } from '@/components/collection-grid';
import { DataTicker } from '@/components/data-ticker';

export const metadata: Metadata = {
  title: 'Projects — Full Portfolio | Elvien',
  description:
    'Complete catalog of production web applications, cashier PWA tools, and automation bots built by Elvien.',
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  const liveCount = projects.filter((p) => p.status === 'LIVE').length;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-3 border-b border-border pb-6">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-[11px] font-mono tracking-wider uppercase bg-secondary text-primary border border-border">
          <span>Projects Index [01]</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-normal text-foreground">
          All Projects
        </h1>
        <p className="text-xs sm:text-sm font-sans text-muted-foreground max-w-2xl leading-relaxed">
          A complete collection of web applications, progressive web apps, and automation bots.
          Use the category filters below to browse by technology or domain.
        </p>
      </div>

      {/* Telemetry Ticker */}
      <DataTicker
        totalSpecimens={projects.length}
        liveSpecimens={liveCount}
        lastCommit="All Systems Online"
      />

      {/* Filterable Grid */}
      <CollectionGrid initialProjects={projects} />
    </div>
  );
}
