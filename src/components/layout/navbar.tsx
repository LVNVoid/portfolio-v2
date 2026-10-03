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

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/90 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Profile Branding Header */}
        <Link
          href="/"
          className="group inline-flex items-center gap-3 min-h-[44px] py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <div className="flex flex-col">
            <span className="font-serif tracking-tight text-lg sm:text-xl font-normal text-foreground group-hover:text-primary transition-colors">
              ELVIEN
            </span>
            <span className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground">
              Full-Stack Developer
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Tabs */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-1.5"
        >
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3.5 py-1.5 min-h-[44px] inline-flex items-center text-xs font-mono uppercase tracking-wider rounded border transition-all ${
                  isActive
                    ? 'border-primary bg-primary text-primary-foreground font-semibold shadow-sm'
                    : 'border-border/60 bg-secondary/30 text-muted-foreground hover:text-foreground hover:bg-secondary hover:border-primary/40'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}

          <div className="ml-2 pl-2 border-l border-border/80 flex items-center">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Hamburger & Theme Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-10 h-10 min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded border border-border bg-secondary/40 text-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Toggle navigation drawer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-b border-border bg-card px-4 py-4 space-y-2">
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-4 py-3 min-h-[44px] rounded border text-xs font-mono uppercase tracking-wider transition-colors ${
                  isActive
                    ? 'border-primary bg-primary text-primary-foreground font-semibold'
                    : 'border-border/60 bg-secondary/30 text-foreground hover:bg-secondary'
                }`}
              >
                <span>{item.label}</span>
                <span className="text-[10px] opacity-70">[{item.tag}]</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
