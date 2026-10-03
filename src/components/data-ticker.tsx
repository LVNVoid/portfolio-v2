import * as React from 'react';
import { Activity, Layers, GitCommit } from 'lucide-react';

interface DataTickerProps {
  totalSpecimens?: number;
  liveSpecimens?: number;
  lastCommit?: string;
  className?: string;
}

export function DataTicker({
  totalSpecimens = 7,
  liveSpecimens = 7,
  lastCommit = 'Production Active',
  className = '',
}: DataTickerProps) {
  return (
    <aside
      aria-label="Project Status Ticker"
      className={`w-full py-2.5 px-4 rounded border border-border/80 bg-secondary/20 backdrop-blur-sm font-mono text-[11px] text-muted-foreground flex flex-wrap items-center justify-between gap-4 ${className}`}
    >
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-1.5 text-foreground">
          <Layers className="w-3.5 h-3.5 text-primary" />
          <span>
            <strong className="text-primary font-semibold">{totalSpecimens}</strong> Projects Built
          </span>
        </div>

        <span className="text-border hidden sm:inline select-none">|</span>

        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-500 animate-ping" />
          <span>
            <strong className="text-emerald-700 dark:text-emerald-400 font-semibold">{liveSpecimens}</strong> Live Systems Online
          </span>
        </div>

        <span className="text-border hidden md:inline select-none">|</span>

        <div className="hidden md:flex items-center gap-1.5">
          <GitCommit className="w-3.5 h-3.5 text-muted-foreground" />
          <span>{lastCommit}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-[10px] text-emerald-600 dark:text-emerald-400 tracking-wider uppercase font-semibold">
        <Activity className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
        <span>All Endpoints Operational</span>
      </div>
    </aside>
  );
}
