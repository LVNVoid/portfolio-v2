import type { Metadata } from 'next';
import Link from 'next/link';
import { FolderKanban, Award, Sparkles, GraduationCap, Plus, ArrowUpRight } from 'lucide-react';
import db from '@/services/db';

export const metadata: Metadata = {
  title: 'Admin Overview — The Specimen Cabinet',
};

export default async function AdminDashboardPage() {
  const [projectCount, certCount, skillCount, eduCount] = await Promise.all([
    db.project.count().catch(() => 0),
    db.certificate.count().catch(() => 0),
    db.skill.count().catch(() => 0),
    db.education.count().catch(() => 0),
  ]);

  const cards = [
    {
      title: 'Projects Catalog',
      count: projectCount,
      href: '/admin/projects',
      newHref: '/admin/projects/new',
      icon: FolderKanban,
      unit: 'Specimens',
    },
    {
      title: 'Credentials Gallery',
      count: certCount,
      href: '/admin/certificates',
      newHref: '/admin/certificates',
      icon: Award,
      unit: 'Certificates',
    },
    {
      title: 'Skills Taxonomy',
      count: skillCount,
      href: '/admin/skills',
      newHref: '/admin/skills',
      icon: Sparkles,
      unit: 'Technological Units',
    },
    {
      title: 'Academic Records',
      count: eduCount,
      href: '/admin/education',
      newHref: '/admin/education',
      icon: GraduationCap,
      unit: 'Degree Milestones',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="border-b border-border pb-4 space-y-1">
        <h1 className="text-2xl sm:text-3xl font-serif font-normal text-foreground">
          Curator Control Hub
        </h1>
        <p className="text-xs font-mono text-muted-foreground">
          Management of public museum vitrine, live system links, and developer credentials.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="vitrine-border bg-card p-6 rounded-lg space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-muted-foreground font-mono text-xs">
                  <span className="uppercase tracking-wider">{card.title}</span>
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div className="text-3xl font-serif text-foreground font-normal">
                  {card.count}
                </div>
                <p className="text-[11px] font-mono text-muted-foreground">
                  {card.unit} active in registry
                </p>
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between text-xs font-mono">
                <Link
                  href={card.href}
                  className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors min-h-[44px] py-1"
                >
                  <span>Open Registry</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href={card.newHref}
                  className="px-3 py-1.5 min-h-[44px] inline-flex items-center gap-1 rounded bg-secondary text-primary hover:bg-primary hover:text-primary-foreground transition-colors text-[11px] font-semibold border border-border"
                >
                  <Plus className="w-3 h-3" />
                  <span>Catalog New</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
