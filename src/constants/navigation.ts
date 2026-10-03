export interface NavItem {
  readonly label: string;
  readonly href: string;
  readonly drawerNum: string;
  readonly description: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
  {
    label: 'The Collection',
    href: '/projects',
    drawerNum: 'DR-01',
    description: 'Cataloged engineering projects & live systems',
  },
  {
    label: 'Field Notes',
    href: '/about',
    drawerNum: 'DR-02',
    description: 'Background, research philosophy & stack anatomy',
  },
  {
    label: 'Credentials',
    href: '/certificates',
    drawerNum: 'DR-03',
    description: 'Verified professional certifications & honors',
  },
  {
    label: 'Laboratory',
    href: '/dashboard',
    drawerNum: 'DR-04',
    description: 'Real-time telemetry & GitHub activity stream',
  },
  {
    label: 'Inquiries',
    href: '/contact',
    drawerNum: 'DR-05',
    description: 'Direct dispatch desk & consultation channels',
  },
] as const;
