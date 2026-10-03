'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded border border-border/40 bg-secondary/30 flex items-center justify-center opacity-50" />
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="group relative inline-flex items-center justify-center w-9 h-9 min-h-[44px] min-w-[44px] rounded border border-border/60 bg-secondary/40 hover:bg-secondary hover:border-primary/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
      title={`Switch to ${isDark ? 'light linen' : 'dark felt'} cabinet view`}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-primary transition-transform group-hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-foreground transition-transform group-hover:-rotate-12" />
      )}
    </button>
  );
}
