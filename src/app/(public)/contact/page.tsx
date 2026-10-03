import type { Metadata } from 'next';
import { Mail, MapPin, Send, MessageSquare, Clock } from 'lucide-react';
import { ContactForm } from '@/components/contact-form';

export const metadata: Metadata = {
  title: 'Inquiries — Transmission & Dispatch Desk | Elvien',
  description:
    'Direct contact channels, project commission dispatch, and technical consultation desk with Elvien.',
};

export default function ContactPage() {
  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-3 border-b border-border pb-6">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-[11px] font-mono tracking-widest uppercase bg-secondary text-primary border border-border">
          <span>Drawer Archive Index DR-05</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-normal text-foreground">
          Inquiries & Dispatch Desk
        </h1>
        <p className="text-xs sm:text-sm font-sans text-muted-foreground max-w-2xl leading-relaxed">
          Open communication channel for full-time engineering roles, high-impact system
          consultation, or architectural collaborations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Side: Communication Coordinates */}
        <div className="md:col-span-4 space-y-6">
          <div className="vitrine-border bg-card p-6 rounded-lg space-y-4 font-mono text-xs">
            <h2 className="text-primary font-bold uppercase tracking-wider text-[11px] border-b border-border/60 pb-2">
              Dispatch Coordinates
            </h2>

            <div className="space-y-3">
              <div className="space-y-1">
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest block">
                  Direct Electronic Mail
                </span>
                <a
                  href="mailto:elvien.purnawan13@gmail.com"
                  className="text-foreground hover:text-primary transition-colors font-medium break-all"
                >
                  elvien.purnawan13@gmail.com
                </a>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest block">
                  Location & Timezone
                </span>
                <span className="text-foreground">
                  Jakarta, Indonesia (WIB / UTC+7)
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest block">
                  Turnaround Cadence
                </span>
                <span className="text-foreground">
                  Typically within 24 hours
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded border border-border/70 bg-secondary/30 text-xs font-mono text-muted-foreground space-y-1.5">
            <div className="flex items-center gap-1.5 text-foreground font-semibold text-[11px]">
              <Clock className="w-3.5 h-3.5 text-primary" />
              <span>Current Status: Accepting Select Projects</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Available for full-stack engineering, high-scale system migrations, and
              consulting engagements.
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
                <span>Formal Transmission Form</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-normal text-foreground">
                Send an Inquiry
              </h2>
            </div>

            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
