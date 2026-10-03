import type { Metadata } from 'next';
import { Activity, GitCommit, GitPullRequest, GitFork, Terminal, ExternalLink, HardDrive } from 'lucide-react';
import { getGitHubStats } from '@/services/github-service';
import { Sparkline } from '@/components/sparkline';

export const metadata: Metadata = {
  title: 'Laboratory — Developer Telemetry & Activity | Elvien',
  description:
    'Live telemetry dashboard, real-time GitHub commit feeds, and operational metrics of Elvien.',
};

export default async function DashboardPage() {
  const stats = await getGitHubStats();

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      {/* Header */}
      <div className="space-y-3 border-b border-border pb-6">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-[11px] font-mono tracking-widest uppercase bg-secondary text-primary border border-border">
          <span>Drawer Archive Index DR-04</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-normal text-foreground">
          The Laboratory Telemetry
        </h1>
        <p className="text-xs sm:text-sm font-sans text-muted-foreground max-w-2xl leading-relaxed">
          Operational instrument board streaming real-time developer activity, repository
          telemetry, and automated event logs directly from GitHub.
        </p>
      </div>

      {/* Primary Metrics Dials */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="vitrine-border bg-card p-5 rounded-lg space-y-2">
          <div className="flex items-center justify-between text-muted-foreground font-mono text-xs">
            <span className="uppercase tracking-wider">Public Repos</span>
            <HardDrive className="w-4 h-4 text-primary" />
          </div>
          <div className="text-3xl font-serif font-normal text-foreground">
            {stats.publicRepos}
          </div>
          <p className="text-[11px] font-mono text-muted-foreground">
            Tracked production repositories
          </p>
        </div>

        <div className="vitrine-border bg-card p-5 rounded-lg space-y-2">
          <div className="flex items-center justify-between text-muted-foreground font-mono text-xs">
            <span className="uppercase tracking-wider">Active Stream</span>
            <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-pulse" />
          </div>
          <div className="text-3xl font-serif font-normal text-foreground flex items-center gap-2">
            <span>Synchronized</span>
          </div>
          <p className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400">
            5-minute cache cadence
          </p>
        </div>

        <div className="vitrine-border bg-card p-5 rounded-lg space-y-2">
          <div className="flex items-center justify-between text-muted-foreground font-mono text-xs">
            <span className="uppercase tracking-wider">Activity Pulse</span>
            <Sparkline width={60} height={16} />
          </div>
          <div className="text-3xl font-serif font-normal text-foreground">
            Daily
          </div>
          <p className="text-[11px] font-mono text-muted-foreground">
            Continuous delivery loop
          </p>
        </div>
      </div>

      {/* Recent Commit Event Logs */}
      <section aria-label="Recent Commits Stream" className="space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-2">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-primary" />
            <h2 className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
              Recent Engineering Commits (Public Feed)
            </h2>
          </div>
          <a
            href="https://github.com/LVNVoid"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors min-h-[44px] py-2"
          >
            <span>@LVNVoid on GitHub</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="vitrine-border bg-card rounded-lg divide-y divide-border/60 overflow-hidden font-mono text-xs">
          {stats.recentEvents.map((ev) => (
            <div
              key={ev.id}
              className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-secondary/30 transition-colors"
            >
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-secondary text-primary font-bold text-[10px] border border-border">
                    {ev.repoName}
                  </span>
                  <span className="text-muted-foreground text-[10px] hidden sm:inline">
                    {ev.type}
                  </span>
                </div>
                <p className="text-foreground text-xs sm:text-sm font-sans pt-0.5">
                  {ev.message}
                </p>
              </div>

              <div className="text-[11px] text-muted-foreground shrink-0 flex items-center gap-1">
                <GitCommit className="w-3.5 h-3.5 text-muted-foreground" />
                <span>{new Date(ev.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
