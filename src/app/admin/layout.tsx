import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { ThemeToggle } from '@/components/theme-toggle';
import {
  FolderKanban,
  Award,
  Sparkles,
  GraduationCap,
  User,
  LayoutDashboard,
  LogOut,
  ArrowLeft,
  ShieldCheck,
} from 'lucide-react';

const ADMIN_NAV = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard },
  { label: 'Projects', href: '/admin/projects', icon: FolderKanban },
  { label: 'Certificates', href: '/admin/certificates', icon: Award },
  { label: 'Skills', href: '/admin/skills', icon: Sparkles },
  { label: 'Education', href: '/admin/education', icon: GraduationCap },
  { label: 'Profile', href: '/admin/profile', icon: User },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row transition-colors duration-200">
      {/* Sidebar Desktop */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-border bg-card/60 p-4 sm:p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="inline-flex items-center gap-2 group min-h-[44px]">
              <span className="w-2.5 h-2.5 rounded-full bg-primary" />
              <div className="flex flex-col">
                <span className="font-serif text-lg font-normal text-foreground group-hover:text-primary transition-colors">
                  Portfolio Admin
                </span>
                <span className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase">
                  Content Manager
                </span>
              </div>
            </Link>
            <ThemeToggle />
          </div>

          <nav aria-label="Admin Navigation" className="space-y-1 font-mono text-xs">
            {ADMIN_NAV.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2.5 px-3 py-2.5 min-h-[44px] rounded border border-transparent hover:border-border/60 hover:bg-secondary/40 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon className="w-4 h-4 text-primary" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-border/60 space-y-3 font-mono text-xs">
          <div className="flex items-center gap-2 px-2 text-muted-foreground text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="truncate">{session.user.email}</span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors min-h-[44px] py-1 text-[11px]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>View Public Site</span>
            </Link>

            <Link
              href="/api/auth/signout"
              className="inline-flex items-center gap-1.5 text-destructive hover:text-destructive/80 transition-colors min-h-[44px] py-1 text-[11px]"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Admin Area */}
      <main className="flex-1 p-4 sm:p-8 max-w-5xl w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
