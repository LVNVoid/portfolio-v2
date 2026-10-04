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
  SiDocker,
  SiUbuntu,
  SiGit,
  SiGithub,
  SiVercel,
  SiCloudflare,
  SiVitest,
  SiVite,
  SiPwa,
  SiBluetooth,
  SiNeon,
  SiJsonwebtokens,
} from 'react-icons/si';
import {
  Database,
  Code2,
  ShieldCheck,
  TestTube2,
  FileText,
  ImageIcon,
  Network,
  Server,
} from 'lucide-react';

interface SkillIconProps {
  name: string;
  className?: string;
}

export function SkillIcon({ name, className = 'w-3.5 h-3.5 shrink-0' }: SkillIconProps) {
  const n = name.toLowerCase();

  // Frameworks & Libraries
  if (n.includes('typescript')) return <SiTypescript className={`${className} text-[#3178C6]`} />;
  if (n.includes('javascript')) return <SiJavascript className={`${className} text-[#F7DF1E]`} />;
  if (n.includes('python')) return <SiPython className={`${className} text-[#3776AB]`} />;
  if (n.includes('next.js') || n.includes('nextjs')) return <SiNextdotjs className={`${className} text-foreground`} />;
  if (n.includes('react')) return <SiReact className={`${className} text-[#61DAFB]`} />;
  if (n.includes('vitest')) return <SiVitest className={`${className} text-[#729B1B]`} />;
  if (n.includes('vite')) return <SiVite className={`${className} text-[#646CFF]`} />;
  if (n.includes('tailwind')) return <SiTailwindcss className={`${className} text-[#06B6D4]`} />;
  if (n.includes('framer') || n.includes('motion')) return <SiFramer className={`${className} text-[#0055FF]`} />;
  if (n.includes('shadcn') || n.includes('radix')) return <SiRadixui className={`${className} text-foreground`} />;
  if (n.includes('node')) return <SiNodedotjs className={`${className} text-[#5FA04E]`} />;
  if (n.includes('express')) return <SiExpress className={`${className} text-foreground`} />;
  if (n.includes('prisma')) return <SiPrisma className={`${className} text-[#52b7af]`} />;
  if (n.includes('zod')) return <SiZod className={`${className} text-[#3E67B1]`} />;
  if (n.includes('nextauth') || n.includes('auth')) return <ShieldCheck className={`${className} text-primary`} />;
  if (n.includes('jwt') || n.includes('token')) return <SiJsonwebtokens className={`${className} text-[#D63AFF]`} />;
  if (n.includes('pwa')) return <SiPwa className={`${className} text-[#5A0FC8]`} />;
  if (n.includes('bluetooth')) return <SiBluetooth className={`${className} text-[#0082FC]`} />;
  if (n.includes('playwright')) return <TestTube2 className={`${className} text-[#2EAD33]`} />;
  if (n.includes('pdf')) return <FileText className={`${className} text-[#E53E3E]`} />;
  if (n.includes('image')) return <ImageIcon className={`${className} text-primary`} />;
  if (n.includes('rest') || n.includes('api')) return <Network className={`${className} text-primary`} />;

  // Databases & Cloud
  if (n.includes('neon')) return <SiNeon className={`${className} text-[#00E599]`} />;
  if (n.includes('object storage')) return <SiNeon className={`${className} text-[#00E599]`} />;
  if (n.includes('postgresql')) return <SiPostgresql className={`${className} text-[#4169E1]`} />;
  if (n.includes('sql server') || n.includes('mssql') || n === 'sql') return <Database className={`${className} text-primary`} />;

  // DevOps & Tools
  if (n.includes('docker')) return <SiDocker className={`${className} text-[#2496ED]`} />;
  if (n.includes('ubuntu') || n.includes('linux')) return <SiUbuntu className={`${className} text-[#E95420]`} />;
  if (n.includes('git') && !n.includes('github')) return <SiGit className={`${className} text-[#F05032]`} />;
  if (n.includes('github')) return <SiGithub className={`${className} text-foreground`} />;
  if (n.includes('vercel')) return <SiVercel className={`${className} text-foreground`} />;
  if (n.includes('cloudflare')) return <SiCloudflare className={`${className} text-[#F38020]`} />;
  if (n.includes('proxy') || n.includes('tinyproxy')) return <Server className={`${className} text-primary`} />;

  return <Code2 className={`${className} text-muted-foreground`} />;
}
