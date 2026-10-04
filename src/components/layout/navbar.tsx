'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/constants/navigation';
import { ThemeToggle } from '@/components/theme-toggle';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b transition-all duration-300 ${
        scrolled
          ? 'border-border bg-background/95 backdrop-blur-md shadow-xs'
          : 'border-border/60 bg-background/80 backdrop-blur-sm'
      }`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:min-h-[44px] focus:rounded focus:bg-primary focus:text-primary-foreground focus:font-mono focus:text-xs focus:uppercase"
      >
        Skip to content
      </a>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="group inline-flex items-center gap-2.5 min-h-[44px] py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
        >
          <span className="w-2.5 h-2.5 rounded-sm bg-primary transition-transform group-hover:rotate-45" />
          <span className="flex flex-col">
            <span className="font-serif tracking-tight text-lg sm:text-xl font-normal text-foreground group-hover:text-primary transition-colors">
              ELVIEN
            </span>
            <span className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground">
              Full-Stack Developer
            </span>
          </span>
        </Link>

        <nav
          aria-label="Main Navigation"
          className="hidden lg:flex items-stretch gap-1 self-stretch"
        >
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`group relative px-3.5 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm active:scale-[0.98] ${
                  active
                    ? 'text-foreground font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <span className="text-[10px] text-primary/80 tabular-nums">
                  {item.tag}
                </span>
                <span>{item.label}</span>
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-3 bottom-2 h-0.5 rounded-full bg-primary transition-all duration-300 ${
                    active
                      ? 'opacity-100 scale-x-100'
                      : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                  }`}
                />
              </Link>
            );
          })}

          <span className="ml-2 pl-3 border-l border-border/80 self-center flex items-center">
            <ThemeToggle />
          </span>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-10 h-10 min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded border border-border bg-secondary/40 text-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:scale-95 transition-transform"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="lg:hidden border-t border-border bg-card/95 backdrop-blur-md px-4 py-3 shadow-xl"
        >
          <ul className="divide-y divide-border/60">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`flex items-center gap-3 px-2 py-3 min-h-[44px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm active:scale-[0.99] ${
                      active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <span className="text-[10px] font-mono text-primary tabular-nums w-6 shrink-0">
                      {item.tag}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span
                        className={`block text-xs font-mono uppercase tracking-wider ${
                          active ? 'font-semibold' : ''
                        }`}
                      >
                        {item.label}
                      </span>
                      <span className="block text-[11px] font-sans text-muted-foreground truncate">
                        {item.description}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className={`w-1.5 h-1.5 rounded-full shrink-0 transition-opacity ${
                        active ? 'bg-primary opacity-100' : 'opacity-0'
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
