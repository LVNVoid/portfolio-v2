import * as React from 'react';
import { Server, Database, Globe, Cpu } from 'lucide-react';

interface ArchitectureDiagramProps {
  services?: number;
  databases?: number;
  category?: string;
  className?: string;
}

export function ArchitectureDiagram({
  services = 2,
  databases = 1,
  category = 'Web App',
  className = '',
}: ArchitectureDiagramProps) {
  return (
    <div
      className={`p-3 rounded border border-border/80 bg-secondary/30 font-mono text-[10px] space-y-2 ${className}`}
    >
      <div className="flex items-center justify-between text-muted-foreground border-b border-border/60 pb-1">
        <span className="uppercase tracking-widest text-[9px]">Topology Spec</span>
        <span className="text-[9px] text-primary">{category}</span>
      </div>

      <div className="flex items-center justify-between gap-1.5 pt-1">
        {/* Client Layer */}
        <div className="flex flex-col items-center gap-1 p-1.5 rounded border border-border/60 bg-card/60 flex-1 text-center">
          <Globe className="w-3.5 h-3.5 text-primary" />
          <span className="text-[9px] leading-none">Client Edge</span>
        </div>

        {/* Connector */}
        <span className="text-muted-foreground/60 select-none">→</span>

        {/* Compute Services */}
        <div className="flex flex-col items-center gap-1 p-1.5 rounded border border-border/60 bg-card/60 flex-1 text-center">
          <Server className="w-3.5 h-3.5 text-foreground" />
          <span className="text-[9px] leading-none">{services} {services === 1 ? 'Service' : 'Services'}</span>
        </div>

        {/* Connector */}
        <span className="text-muted-foreground/60 select-none">→</span>

        {/* Database Layer */}
        <div className="flex flex-col items-center gap-1 p-1.5 rounded border border-border/60 bg-card/60 flex-1 text-center">
          <Database className="w-3.5 h-3.5 text-primary" />
          <span className="text-[9px] leading-none">
            {databases > 0 ? `${databases} DB` : 'Serverless'}
          </span>
        </div>
      </div>
    </div>
  );
}
