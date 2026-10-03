import type { Metadata } from 'next';
import Link from 'next/link';
import { Award, ExternalLink, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import { getCertificates } from '@/services/certificate-service';

export const metadata: Metadata = {
  title: 'Credentials — Verified Certifications | Elvien',
  description:
    'Verified professional credentials, architectural certifications, and competency recognitions of Elvien.',
};

export default async function CertificatesPage() {
  const certificates = await getCertificates();

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      {/* Header */}
      <div className="space-y-3 border-b border-border pb-6">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-[11px] font-mono tracking-widest uppercase bg-secondary text-primary border border-border">
          <span>Drawer Archive Index DR-03</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-normal text-foreground">
          Verified Credentials
        </h1>
        <p className="text-xs sm:text-sm font-sans text-muted-foreground max-w-2xl leading-relaxed">
          Official engineering certifications, cloud computing credentials, and industry
          competency assessments verified by third-party authorities.
        </p>
      </div>

      {/* Certificates Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.length > 0 ? (
          certificates.map((cert) => (
            <article
              key={cert.id}
              className="vitrine-border bg-card rounded-lg p-6 space-y-5 flex flex-col justify-between hover:border-primary/60 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-border/60 pb-2.5 font-mono text-xs text-muted-foreground">
                  <span className="text-primary font-bold">#{cert.slug}</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{new Date(cert.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}</span>
                  </span>
                </div>

                <h2 className="font-serif text-xl sm:text-2xl text-foreground font-normal">
                  <Link
                    href={`/certificates/${cert.slug}`}
                    className="hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded"
                  >
                    {cert.name}
                  </Link>
                </h2>

                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono bg-secondary text-foreground border border-border">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                  <span>Issuer: {cert.issuer}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-border/60 flex items-center justify-between text-xs font-mono">
                <Link
                  href={`/certificates/${cert.slug}`}
                  className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors min-h-[44px] py-2"
                >
                  <span>Credential Record</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 min-h-[44px] inline-flex items-center gap-1.5 rounded bg-primary/10 text-primary border border-primary/30 font-semibold hover:bg-primary hover:text-primary-foreground transition-colors text-[11px]"
                  >
                    <span>Verify Authority</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </article>
          ))
        ) : (
          <div className="col-span-full p-12 text-center rounded border border-dashed border-border text-muted-foreground font-mono text-xs">
            Certificates gallery entries cataloged in database.
          </div>
        )}
      </div>
    </div>
  );
}
