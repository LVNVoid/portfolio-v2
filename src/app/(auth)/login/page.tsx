import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { LoginForm } from '@/components/login-form';
import { ThemeToggle } from '@/components/theme-toggle';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between p-4 sm:p-8 bg-background text-foreground transition-colors duration-200">
      <header className="flex items-center justify-between max-w-5xl w-full mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors min-h-[44px] py-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Vitrine</span>
        </Link>
        <ThemeToggle />
      </header>

      <main className="w-full max-w-md mx-auto my-auto py-10">
        <div className="vitrine-border bg-card p-6 sm:p-8 rounded-lg relative overflow-hidden">
          {/* Top brass header band */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary" />

          <div className="mb-6 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono uppercase tracking-wider bg-secondary text-primary border border-border">
              <ShieldCheck className="w-3 h-3 text-primary" />
              <span>Restricted Access</span>
            </div>
            <h1 className="text-2xl font-serif tracking-tight font-normal text-foreground">
              Cabinet Curator Vault
            </h1>
            <p className="text-xs text-muted-foreground font-mono">
              Authentication required to edit specimens, taxonomy, and registry.
            </p>
          </div>

          <Suspense
            fallback={
              <div className="py-12 text-center text-xs font-mono text-muted-foreground animate-pulse">
                Preparing cipher vault...
              </div>
            }
          >
            <LoginForm />
          </Suspense>
        </div>

        <p className="text-center text-xs font-mono text-muted-foreground/70 mt-6">
          The Specimen Cabinet © {new Date().getFullYear()} · Elvien
        </p>
      </main>

      <footer className="text-center text-[11px] font-mono text-muted-foreground/60 pb-2">
        Archive System Ref: SC-AUTH-2026
      </footer>
    </div>
  );
}
