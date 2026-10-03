'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactPayload } from '@/schemas/contact-schema';
import { submitContactAction } from '@/actions/contact-actions';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export function ContactForm() {
  const [success, setSuccess] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactPayload>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  async function onSubmit(data: ContactPayload) {
    setServerError(null);
    const res = await submitContactAction(data);

    if (!res.success) {
      setServerError(res.error.message);
      return;
    }

    setSuccess(true);
    reset();
  }

  if (success) {
    return (
      <div className="p-8 text-center space-y-4 rounded-lg border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40">
        <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto" />
        <h3 className="font-serif text-2xl text-foreground font-normal">
          Message Sent Successfully
        </h3>
        <p className="text-xs sm:text-sm font-sans text-muted-foreground max-w-md mx-auto">
          Thank you for reaching out! I have received your message and will get back to you
          via email as soon as possible.
        </p>
        <button
          type="button"
          onClick={() => setSuccess(false)}
          className="px-4 py-2 min-h-[44px] rounded border border-border bg-card text-foreground font-mono text-xs uppercase tracking-wider hover:bg-secondary transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {serverError && (
        <div
          role="alert"
          className="p-3.5 rounded border border-destructive/30 bg-destructive/10 text-destructive text-sm flex items-start gap-2.5"
        >
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{serverError}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label
            htmlFor="name"
            className="block text-xs uppercase tracking-wider font-mono text-muted-foreground"
          >
            Your Name *
          </label>
          <input
            id="name"
            {...register('name')}
            placeholder="Sarah Connor"
            className={`w-full h-11 min-h-[44px] px-3.5 rounded border bg-card text-foreground placeholder:text-muted-foreground/60 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.name ? 'border-destructive' : 'border-border'
            }`}
          />
          {errors.name && (
            <p className="text-[11px] font-mono text-destructive">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="block text-xs uppercase tracking-wider font-mono text-muted-foreground"
          >
            Your Email Address *
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            placeholder="sarah@company.com"
            className={`w-full h-11 min-h-[44px] px-3.5 rounded border bg-card text-foreground placeholder:text-muted-foreground/60 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.email ? 'border-destructive' : 'border-border'
            }`}
          />
          {errors.email && (
            <p className="text-[11px] font-mono text-destructive">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="subject"
          className="block text-xs uppercase tracking-wider font-mono text-muted-foreground"
        >
          Subject *
        </label>
        <input
          id="subject"
          {...register('subject')}
          placeholder="Full-Stack Engineer Opportunity / Project Inquiry"
          className={`w-full h-11 min-h-[44px] px-3.5 rounded border bg-card text-foreground placeholder:text-muted-foreground/60 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.subject ? 'border-destructive' : 'border-border'
          }`}
        />
        {errors.subject && (
          <p className="text-[11px] font-mono text-destructive">{errors.subject.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="message"
          className="block text-xs uppercase tracking-wider font-mono text-muted-foreground"
        >
          Message *
        </label>
        <textarea
          id="message"
          rows={5}
          {...register('message')}
          placeholder="Tell me about what you are building, timeline, or open role..."
          className={`w-full p-3.5 rounded border bg-card text-foreground placeholder:text-muted-foreground/60 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary leading-relaxed ${
            errors.message ? 'border-destructive' : 'border-border'
          }`}
        />
        {errors.message && (
          <p className="text-[11px] font-mono text-destructive">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto px-6 py-3 min-h-[44px] rounded bg-primary text-primary-foreground font-mono text-xs uppercase tracking-wider font-semibold hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <span>Send Message</span>
            <Send className="w-3.5 h-3.5" />
          </>
        )}
      </button>
    </form>
  );
}
