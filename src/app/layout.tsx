import type { Metadata, Viewport } from 'next';
import { EB_Garamond, Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

const garamond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f2ed' },
    { media: '(prefers-color-scheme: dark)', color: '#111110' },
  ],
};

export const metadata: Metadata = {
  title: 'Elvien — Full-Stack Engineer | The Specimen Cabinet',
  description:
    'Curated engineering portfolio and production systems specimen collection by Elvien. Live proof over claims.',
  keywords: [
    'Elvien',
    'Full-Stack Engineer',
    'Software Engineer',
    'Portfolio',
    'Next.js 16',
    'TypeScript',
    'PostgreSQL',
  ],
  authors: [{ name: 'Elvien', url: 'https://elvien.net' }],
  creator: 'Elvien',
  openGraph: {
    title: 'Elvien — Full-Stack Engineer | The Specimen Cabinet',
    description:
      'Curated engineering portfolio and production systems specimen collection by Elvien. Live proof over claims.',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${garamond.variable} ${geist.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen font-sans antialiased overflow-x-hidden selection:bg-primary selection:text-white dark:selection:text-black">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
