import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, GraduationCap, Code2, MapPin, Mail, Download } from 'lucide-react';
import { getProfile } from '@/services/profile-service';
import { getSkillsGroupedByCategory } from '@/services/skill-service';
import { getEducations } from '@/services/education-service';

export const metadata: Metadata = {
  title: 'About Me — Background & Skills | Elvien',
  description:
    'Profile, background, core technical skills, and education of Elvien (Full-Stack Software Engineer).',
};

export default async function AboutPage() {
  const [profile, groupedSkills, educations] = await Promise.all([
    getProfile(),
    getSkillsGroupedByCategory(),
    getEducations(),
  ]);

  const defaultBio =
    "I am a Full-Stack Software Engineer based in Indonesia. I enjoy building clean, reliable web applications and automation tools. Over the past few years, I have worked across the entire stack—designing relational database models, writing typed server actions, and creating accessible, responsive user interfaces.";

  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-3 border-b border-border pb-6">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-[11px] font-mono tracking-wider uppercase bg-secondary text-primary border border-border">
          <span>About Me [02]</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-foreground">
          About Me
        </h1>
        <p className="text-xs sm:text-sm font-sans text-muted-foreground leading-relaxed">
          My background, engineering philosophy, and educational credentials.
        </p>
      </div>

      {/* Main Profile Card */}
      <div className="vitrine-border bg-card rounded-xl p-6 sm:p-10 space-y-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Avatar Profile Plate */}
          <div className="md:col-span-4 space-y-4">
            <div className="relative aspect-square w-full rounded-lg border border-border bg-secondary/30 overflow-hidden pin-tilted shadow-md">
              {profile?.avatar ? (
                <Image
                  src={profile.avatar.startsWith('/avatar-') ? '/avatar-light.jpg' : profile.avatar}
                  alt={profile.name || 'Elvien'}
                  fill
                  sizes="(max-width: 768px) 100vw, 280px"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-mono text-xs text-muted-foreground">
                  [Profile Photo]
                </div>
              )}
            </div>

            <div className="space-y-1.5 font-mono text-xs">
              <div className="text-foreground font-semibold text-sm">
                {profile?.name || 'Elvien Aninditha Purnawan'}
              </div>
              <div className="text-primary">{profile?.role || 'Full-Stack Developer'}</div>
              <div className="flex items-center gap-1.5 text-muted-foreground pt-1">
                <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                <span>{profile?.location || 'Jakarta, Indonesia (WIB / UTC+7)'}</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                <span>{profile?.email || 'elvien.purnawan13@gmail.com'}</span>
              </div>
            </div>
          </div>

          {/* Narrative Content */}
          <div className="md:col-span-8 space-y-6">
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-primary font-bold">
                Background & Focus
              </span>
              <h2 className="text-2xl font-serif font-normal text-foreground leading-snug">
                Building production web systems that are fast and dependable.
              </h2>
              <p className="text-xs sm:text-sm font-sans text-muted-foreground leading-relaxed whitespace-pre-line">
                {profile?.bio || defaultBio}
              </p>
            </div>

            <div className="p-4 rounded border border-border/80 bg-secondary/30 space-y-2 font-mono text-xs">
              <div className="text-primary font-bold uppercase tracking-wider text-[11px]">
                How I Work
              </div>
              <ul className="space-y-1.5 text-muted-foreground text-[11px] list-disc list-inside">
                <li><strong className="text-foreground">Proof Over Claims:</strong> Working production code always beats unverified mockups.</li>
                <li><strong className="text-foreground">Strict Type Safety:</strong> Zero any, strict Zod schemas, and reliable runtime contracts.</li>
                <li><strong className="text-foreground">Fast & Accessible:</strong> 44px tap targets, sub-second loads, and zero layout overflow.</li>
              </ul>
            </div>

            <div className="pt-2 flex flex-wrap gap-3 font-mono text-xs">
              <Link
                href="/contact"
                className="px-4 py-2.5 min-h-[44px] rounded bg-primary text-primary-foreground uppercase tracking-wider font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2 shadow"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <a
                href="/cv.pdf"
                target="_blank"
                className="px-4 py-2.5 min-h-[44px] rounded border border-border bg-secondary/50 text-foreground uppercase tracking-wider hover:bg-secondary transition-colors inline-flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download CV (PDF)</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <section aria-label="Technical Skills" className="space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="space-y-1">
            <span className="text-[10px] font-mono tracking-wider uppercase text-primary font-bold">
              Tech Stack
            </span>
            <h2 className="text-2xl font-serif font-normal text-foreground">
              Skills & Technologies
            </h2>
          </div>
          <Code2 className="w-5 h-5 text-muted-foreground" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {Object.entries(groupedSkills).length > 0 ? (
            Object.entries(groupedSkills).map(([category, items]) => (
              <div
                key={category}
                className="vitrine-border bg-card p-5 rounded-lg space-y-3"
              >
                <div className="border-b border-border/60 pb-2 flex items-center justify-between">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-primary font-bold">
                    {category}
                  </h3>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {items.length} skills
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((skill) => (
                    <span
                      key={skill.id}
                      className="px-2.5 py-1 rounded text-xs font-mono bg-secondary/80 text-foreground border border-border"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full p-8 text-center text-xs font-mono text-muted-foreground border border-dashed border-border rounded">
              Skills will populate upon database seed.
            </div>
          )}
        </div>
      </section>

      {/* Education Section */}
      <section aria-label="Education" className="space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="space-y-1">
            <span className="text-[10px] font-mono tracking-wider uppercase text-primary font-bold">
              Background
            </span>
            <h2 className="text-2xl font-serif font-normal text-foreground">
              Education
            </h2>
          </div>
          <GraduationCap className="w-5 h-5 text-muted-foreground" />
        </div>

        <div className="space-y-4">
          {educations.length > 0 ? (
            educations.map((edu) => (
              <div
                key={edu.id}
                className="vitrine-border bg-card p-6 rounded-lg space-y-2"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-border/60 pb-2">
                  <h3 className="font-serif text-lg text-foreground font-normal">
                    {edu.school}
                  </h3>
                  <span className="font-mono text-xs text-primary font-semibold">
                    {edu.year}
                  </span>
                </div>
                <div className="font-mono text-xs text-foreground/90 font-medium">
                  {edu.degree}
                </div>
                {edu.description && (
                  <p className="text-xs font-sans text-muted-foreground leading-relaxed pt-1">
                    {edu.description}
                  </p>
                )}
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-xs font-mono text-muted-foreground border border-dashed border-border rounded">
              Education entries will populate upon database seed.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
