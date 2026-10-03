import React from 'react';
import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiFramer,
  SiRadixui,
  SiNodedotjs,
  SiExpress,
  SiPrisma,
  SiZod,
  SiPostgresql,
  SiCloudinary,
  SiDocker,
  SiUbuntu,
  SiGit,
  SiGithub,
  SiVercel,
  SiCloudflare,
} from 'react-icons/si';
import { Database, Code2 } from 'lucide-react';

interface SkillIconProps {
  name: string;
  className?: string;
}

export function SkillIcon({ name, className = 'w-3.5 h-3.5 shrink-0' }: SkillIconProps) {
  const n = name.toLowerCase();

  if (n.includes('typescript')) return <SiTypescript className={`${className} text-[#3178C6]`} />;
  if (n.includes('javascript')) return <SiJavascript className={`${className} text-[#F7DF1E]`} />;
  if (n.includes('python')) return <SiPython className={`${className} text-[#3776AB]`} />;
  if (n.includes('postgresql') || n.includes('neon')) return <SiPostgresql className={`${className} text-[#4169E1]`} />;
  if (n.includes('sql server') || n.includes('mssql') || n === 'sql') return <Database className={`${className} text-primary`} />;
  if (n.includes('next.js') || n.includes('nextjs')) return <SiNextdotjs className={`${className} text-foreground`} />;
  if (n.includes('react')) return <SiReact className={`${className} text-[#61DAFB]`} />;
  if (n.includes('tailwind')) return <SiTailwindcss className={`${className} text-[#06B6D4]`} />;
  if (n.includes('framer') || n.includes('motion')) return <SiFramer className={`${className} text-[#0055FF]`} />;
  if (n.includes('shadcn') || n.includes('radix')) return <SiRadixui className={`${className} text-foreground`} />;
  if (n.includes('node')) return <SiNodedotjs className={`${className} text-[#5FA04E]`} />;
  if (n.includes('express')) return <SiExpress className={`${className} text-foreground`} />;
  if (n.includes('prisma')) return <SiPrisma className={`${className} text-[#52b7af]`} />;
  if (n.includes('zod')) return <SiZod className={`${className} text-[#3E67B1]`} />;
  if (n.includes('cloudinary')) return <SiCloudinary className={`${className} text-[#3448C5]`} />;
  if (n.includes('docker')) return <SiDocker className={`${className} text-[#2496ED]`} />;
  if (n.includes('ubuntu') || n.includes('linux')) return <SiUbuntu className={`${className} text-[#E95420]`} />;
  if (n.includes('git')) return <SiGit className={`${className} text-[#F05032]`} />;
  if (n.includes('github')) return <SiGithub className={`${className} text-foreground`} />;
  if (n.includes('vercel')) return <SiVercel className={`${className} text-foreground`} />;
  if (n.includes('cloudflare')) return <SiCloudflare className={`${className} text-[#F38020]`} />;

  return <Code2 className={`${className} text-muted-foreground`} />;
}
