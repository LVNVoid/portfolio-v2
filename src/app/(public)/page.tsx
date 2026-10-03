import Link from 'next/link';
import { ArrowRight, Terminal } from 'lucide-react';
import { getProjects } from '@/services/project-service';
import { VitrineHero } from '@/components/vitrine-hero';
import { SpecimenCard } from '@/components/specimen-card';

export default async function HomePage() {
  const allProjects = await getProjects();
  const featured = allProjects.find((p) => p.featured) || allProjects[0] || null;
  const secondaryProjects = allProjects.filter((p) => p.id !== featured?.id).slice(0, 4);

  const totalSpecimens = allProjects.length;
  const liveSpecimens = allProjects.filter((p) => p.status === 'LIVE').length;

  return (
    <div className="space-y-16">
      {/* Featured Project Showcase */}
      <VitrineHero
        featuredProject={featured}
        totalSpecimens={totalSpecimens}
        liveSpecimens={liveSpecimens}
      />

      {/* Other Selected Projects */}
      <section aria-label="Other Projects Section" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-border pb-3">
          <div className="space-y-1">
            <span className="text-[10px] font-mono tracking-wider uppercase text-primary font-bold">
              Portfolio
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-normal text-foreground">
              More Projects
            </h2>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors min-h-[44px] py-2"
          >
            <span>View All {totalSpecimens} Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {secondaryProjects.map((project) => (
            <SpecimenCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Engineering Philosophy Box */}
      <section
        aria-label="Engineering Approach"
        className="vitrine-border bg-card rounded-lg p-6 sm:p-8 space-y-4 relative overflow-hidden"
      >
        <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-wider">
          <Terminal className="w-4 h-4 text-primary" />
          <span>Engineering Approach</span>
        </div>

        <div className="space-y-2 max-w-3xl">
          <h3 className="font-serif text-xl sm:text-2xl text-foreground font-normal">
            "Real production software beats unfinished mockups every time."
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed">
            Every web app in this portfolio is live on the internet. I focus on delivering
            production-ready systems that handle real database state, secure user logins,
            automated background jobs, and smooth mobile experiences.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap items-center gap-4">
          <Link
            href="/about"
            className="px-4 py-2 min-h-[44px] rounded border border-border bg-secondary/50 text-foreground font-mono text-xs uppercase tracking-wider hover:bg-secondary transition-colors inline-flex items-center gap-2"
          >
            <span>About Me</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            href="/contact"
            className="px-4 py-2 min-h-[44px] rounded bg-primary text-primary-foreground font-mono text-xs uppercase tracking-wider font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
          >
            <span>Get in Touch</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
