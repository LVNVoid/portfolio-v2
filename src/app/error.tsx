'use client';

import * as React from 'react';
import Link from 'next/link';
import { AlertCircle, RefreshCw, ArrowLeft } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error('Specimen Cabinet Application Error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 space-y-5">
      <div className="p-4 rounded-full bg-destructive/10 border border-destructive/30 text-destructive">
        <AlertCircle className="w-8 h-8" />
      </div>
      <div className="space-y-1">
        <span className="text-[10px] font-mono tracking-widest uppercase text-destructive font-bold">
          Telemetry Fault
        </span>
        <h1 className="text-3xl font-serif text-foreground font-normal">
          Vitrine System Interruption
        </h1>
        <p className="text-xs sm:text-sm font-sans text-muted-foreground max-w-md mx-auto">
          An operational exception occurred while retrieving catalog data.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="px-5 py-2.5 min-h-[44px] rounded bg-primary text-primary-foreground font-mono text-xs uppercase tracking-wider font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2 cursor-pointer shadow"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Re-initialize Vitrine</span>
        </button>

        <Link
          href="/"
          className="px-5 py-2.5 min-h-[44px] rounded border border-border bg-secondary/50 text-foreground font-mono text-xs uppercase tracking-wider hover:bg-secondary transition-colors inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Public Index</span>
        </Link>
      </div>
    </div>
  );
}
