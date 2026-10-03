import Link from 'next/link';
import { ExternalLink, Lock } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-secondary/20 transition-colors duration-200 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg font-normal text-foreground">
              The Specimen Cabinet
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-secondary text-primary border border-border">
              Archival Registry
            </span>
          </div>
          <p className="text-xs text-muted-foreground font-mono max-w-md">
            Production systems exhibition and architectural telemetry records.
            Engineered with Next.js 16, Prisma ORM, and PostgreSQL.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs font-mono uppercase tracking-wider text-muted-foreground">
          <a
            href="https://github.com/LVNVoid"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-primary transition-colors min-h-[44px] py-2"
          >
            <span>GitHub</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://linkedin.com/in/elvien"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-primary transition-colors min-h-[44px] py-2"
          >
            <span>LinkedIn</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 hover:text-primary transition-colors min-h-[44px] py-2"
          >
            <Lock className="w-3 h-3" />
            <span>Curator Vault</span>
          </Link>
        </div>
      </div>

      <div className="border-t border-border/60 py-4 text-center text-[11px] font-mono text-muted-foreground">
        <span>© {currentYear} Elvien · All specimen rights cataloged · Jakarta, Indonesia (WIB)</span>
      </div>
    </footer>
  );
}
