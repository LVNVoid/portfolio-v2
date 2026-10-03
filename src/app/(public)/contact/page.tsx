import type { Metadata } from 'next';
import { Mail, Clock, MessageSquare } from 'lucide-react';
import { ContactForm } from '@/components/contact-form';

export const metadata: Metadata = {
  title: 'Contact — Get in Touch | Elvien',
  description:
    'Contact Elvien for software engineering opportunities, contract projects, and technical consultation.',
};

export default function ContactPage() {
  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-3 border-b border-border pb-6">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-[11px] font-mono tracking-wider uppercase bg-secondary text-primary border border-border">
          <span>Contact [05]</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-normal text-foreground">
          Get in Touch
        </h1>
        <p className="text-xs sm:text-sm font-sans text-muted-foreground max-w-2xl leading-relaxed">
          I am currently open to full-stack engineering roles and select consulting projects.
          Send me an email or leave a message below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Side: Contact Information */}
        <div className="md:col-span-4 space-y-6">
          <div className="vitrine-border bg-card p-6 rounded-lg space-y-4 font-mono text-xs">
            <h2 className="text-primary font-bold uppercase tracking-wider text-[11px] border-b border-border/60 pb-2">
              Contact Details
            </h2>

            <div className="space-y-3">
              <div className="space-y-1">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">
                  Email Address
                </span>
                <a
                  href="mailto:elvien.purnawan13@gmail.com"
                  className="text-foreground hover:text-primary transition-colors font-medium break-all"
                >
                  elvien.purnawan13@gmail.com
                </a>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">
                  Location & Timezone
                </span>
                <span className="text-foreground">
                  Jakarta, Indonesia (WIB / UTC+7)
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">
                  Response Time
                </span>
                <span className="text-foreground">
                  Usually within 24 hours
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded border border-border/70 bg-secondary/30 text-xs font-mono text-muted-foreground space-y-1.5">
            <div className="flex items-center gap-1.5 text-foreground font-semibold text-[11px]">
              <Clock className="w-3.5 h-3.5 text-primary" />
              <span>Status: Available for Hire</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Open for full-stack web applications, TypeScript migrations, and system architecture.
            </p>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="md:col-span-8">
          <div className="vitrine-border bg-card p-6 sm:p-8 rounded-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />

            <div className="mb-6 space-y-1">
              <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-wider">
                <MessageSquare className="w-4 h-4 text-primary" />
                <span>Direct Message</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-normal text-foreground">
                Send a Message
              </h2>
            </div>

            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
