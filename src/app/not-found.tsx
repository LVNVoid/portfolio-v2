import Link from 'next/link';
import { ArrowLeft, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 space-y-5">
      <div className="p-4 rounded-full bg-secondary/80 border border-border text-primary">
        <Compass className="w-8 h-8 animate-spin" />
      </div>
      <div className="space-y-1">
        <span className="text-[10px] font-mono tracking-widest uppercase text-primary font-bold">
          Archival Error 404
        </span>
        <h1 className="text-3xl font-serif text-foreground font-normal">
          Specimen Missing From Vitrine
        </h1>
        <p className="text-xs sm:text-sm font-sans text-muted-foreground max-w-md mx-auto">
          The requested dossier or catalog index does not exist in the collection registry.
        </p>
      </div>
      <Link
        href="/"
        className="px-5 py-2.5 min-h-[44px] rounded bg-primary text-primary-foreground font-mono text-xs uppercase tracking-wider font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2 shadow"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to Public Vitrine</span>
      </Link>
    </div>
  );
}
