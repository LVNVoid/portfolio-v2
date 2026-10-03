'use client';

import * as React from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { KeyRound, Mail, AlertCircle, Loader2 } from 'lucide-react';

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '/admin';

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError('Invalid email or password. Please try again.');
        setIsLoading(false);
        return;
      }

      router.push(from);
      router.refresh();
    } catch {
      setError('An unexpected error occurred during sign in.');
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div
          role="alert"
          className="p-3.5 rounded border border-destructive/30 bg-destructive/10 text-destructive text-sm flex items-start gap-2.5"
        >
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <div className="space-y-1.5">
        <label
          htmlFor="email"
          className="block text-xs uppercase tracking-wider font-mono text-muted-foreground"
        >
          Email Address
        </label>
        <div className="relative">
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@elvien.net"
            className="w-full h-11 min-h-[44px] px-3.5 pl-10 rounded border border-border bg-card text-foreground placeholder:text-muted-foreground/60 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
          />
          <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="password"
          className="block text-xs uppercase tracking-wider font-mono text-muted-foreground"
        >
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            className="w-full h-11 min-h-[44px] px-3.5 pl-10 rounded border border-border bg-card text-foreground placeholder:text-muted-foreground/60 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
          />
          <KeyRound className="w-4 h-4 absolute left-3.5 top-3.5 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full h-11 min-h-[44px] px-4 rounded bg-primary text-primary-foreground font-mono text-xs uppercase tracking-wider font-semibold hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Signing In...</span>
          </>
        ) : (
          <span>Sign In to Admin</span>
        )}
      </button>
    </form>
  );
}
