export interface NavItem {
  readonly label: string;
  readonly href: string;
  readonly tag: string;
  readonly description: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
  {
    label: 'Projects',
    href: '/projects',
    tag: '01',
    description: 'Real web applications and live systems',
  },
  {
    label: 'About',
    href: '/about',
    tag: '02',
    description: 'Background, skills, and education',
  },
  {
    label: 'Certificates',
    href: '/certificates',
    tag: '03',
    description: 'Verified professional certifications',
  },
  {
    label: 'Dashboard',
    href: '/dashboard',
    tag: '04',
    description: 'GitHub activity and commit stream',
  },
  {
    label: 'Contact',
    href: '/contact',
    tag: '05',
    description: 'Get in touch for roles or projects',
  },
] as const;
