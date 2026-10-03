import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ExternalLink, Calendar, ShieldCheck, Award } from 'lucide-react';
import { getCertificateBySlug, getCertificates } from '@/services/certificate-service';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const certs = await getCertificates();
  return certs.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cert = await getCertificateBySlug(slug);

  if (!cert) return { title: 'Credential Not Found' };

  return {
    title: `${cert.name} — Credential Dossier | Elvien`,
    description: `Verified credential issued by ${cert.issuer} to Elvien.`,
  };
}

export default async function CertificateDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const cert = await getCertificateBySlug(slug);

  if (!cert) {
    notFound();
  }

  return (
    <article className="space-y-8 max-w-3xl mx-auto">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono">
        <Link
          href="/certificates"
          className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors min-h-[44px] py-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Credentials</span>
        </Link>
        <span className="text-border select-none">/</span>
        <span className="text-primary font-bold">#{cert.slug}</span>
      </nav>

      <div className="vitrine-border bg-card rounded-xl p-6 sm:p-10 space-y-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary" />

        <div className="space-y-2 border-b border-border pb-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono tracking-widest uppercase bg-secondary text-primary border border-border">
            <Award className="w-3 h-3 text-primary" />
            <span>Official Credential Registry</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-normal text-foreground">
            {cert.name}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground pt-2">
            <span className="flex items-center gap-1.5 text-foreground font-semibold">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>{cert.issuer}</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Conferred {new Date(cert.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </span>
          </div>
        </div>

        {/* Certificate Scan Plate */}
        {cert.image ? (
          <div className="relative aspect-[4/3] w-full rounded-lg border border-border bg-secondary/30 overflow-hidden shadow-md">
            <Image
              src={cert.image}
              alt={`Scan record of ${cert.name}`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-contain"
            />
          </div>
        ) : (
          <div className="aspect-[16/9] w-full rounded-lg border border-dashed border-border bg-secondary/20 flex flex-col items-center justify-center p-6 text-center font-mono text-xs text-muted-foreground space-y-2">
            <Award className="w-8 h-8 text-primary/60" />
            <span>Digital Credential Archive Record Verified</span>
          </div>
        )}

        <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <Link
            href="/certificates"
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors min-h-[44px] py-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Gallery</span>
          </Link>

          {cert.credentialUrl && (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 min-h-[44px] rounded bg-primary text-primary-foreground font-mono text-xs uppercase tracking-wider font-semibold hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-2 shadow"
            >
              <span>Verify at Issuing Authority</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
