import 'dotenv/config';
import db from '../src/services/db';
import bcrypt from 'bcryptjs';

async function main() {
  console.log('Seeding portfolio-v2 database...');

  try {
    const email = 'elvien.purnawan13@gmail.com';
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        password: hashedPassword,
        role: 'ADMIN',
      },
    });
    console.log(`Seeded Admin: ${user.email}`);

    // Profile
    await db.profile.upsert({
      where: { id: 'default-profile' },
      update: {},
      create: {
        id: 'default-profile',
        name: 'Elvien',
        role: 'Full-Stack Engineer',
        bio: 'Full-Stack Software Engineer specializing in building and shipping scalable, resilient production systems from zero to cloud deployment. Focused on end-to-end architecture, strict type contracts, modern interfaces, and automated workflows.',
        location: 'Indonesia (WIB / UTC+7)',
        email: 'elvien.purnawan13@gmail.com',
        avatar: 'https://res.cloudinary.com/dmvludl4w/image/upload/v1789998667/profile/avatar.png',
        socials: {
          github: 'https://github.com/LVNVoid',
          linkedin: 'https://linkedin.com/in/elvien',
          website: 'https://elvien.net',
        },
      },
    });
    console.log('Seeded Profile');

    // Projects
    const projects = [
      {
        slug: 'kopi-sangkara-pos',
        title: 'Kopi Sangkara POS',
        description: 'Modern cloud-based Point of Sale and retail operations platform for specialty coffee shops. Progressive Web App optimized for iPad touch viewports with direct ESC/POS hardware printing over Web Bluetooth.',
        tech: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'Web Bluetooth'],
        link: 'https://kopi-sangkara-pos.vercel.app',
        github: 'https://github.com/LVNVoid/kopi-sangkara-pos',
        image: 'https://res.cloudinary.com/dmvludl4w/image/upload/v1789998667/projects/kopi-sangkara-pos.png',
        featured: true,
        status: 'LIVE',
        year: 2026,
        category: 'POS & Retail',
        services: 3,
        databases: 1,
      },
      {
        slug: 'maganghub-bot-attendance',
        title: 'MagangHub Bot Attendance',
        description: 'Enterprise workflow automation platform automating daily attendance and tri-part internship logs. Routes via dedicated VPS HTTP CONNECT proxy to bypass Kemnaker SSO datacenter IP blocks.',
        tech: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'NextAuth', 'Zod', 'Tinyproxy'],
        link: 'https://maganghub-bot-attendance.vercel.app',
        github: 'https://github.com/LVNVoid/maganghub-bot-attendance',
        image: 'https://res.cloudinary.com/dmvludl4w/image/upload/v1789998667/projects/bybb9teoo7iyrzgcmio5.png',
        featured: true,
        status: 'LIVE',
        year: 2026,
        category: 'Automation & Bot',
        services: 4,
        databases: 1,
      },
      {
        slug: 'timkurator-kusumahadisantosa',
        title: 'Tim Kurator PT Kusumahadi Santosa',
        description: 'Official corporate and legal transparency portal for the court-appointed curator team of PT Kusumahadi Santosa (In Bankruptcy). Features real-time creditor announcements, verified documentation archive, and Cloudinary media management.',
        tech: ['Next.js 16', 'TypeScript', 'Tailwind CSS v4', 'Prisma', 'PostgreSQL', 'Cloudinary'],
        link: 'https://timkurator-kusumahadisantosa.id',
        github: 'https://github.com/LVNVoid/timkurator-kusumahadisantosa',
        image: 'https://res.cloudinary.com/dmvludl4w/image/upload/v1789998667/projects/timkurator.png',
        featured: true,
        status: 'LIVE',
        year: 2026,
        category: 'Corporate & Legal',
        services: 2,
        databases: 1,
      },
      {
        slug: 'review-card-generator',
        title: 'Review Card Generator',
        description: 'Physical marketing asset generator converting Google Maps business reviews into high-resolution, print-ready cards with dynamic QR codes.',
        tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Canvas API', 'QRCode'],
        link: 'https://review-card-generator-orcin.vercel.app',
        github: 'https://github.com/LVNVoid/review-card-generator',
        image: 'https://res.cloudinary.com/dmvludl4w/image/upload/v1789998667/projects/review-card.png',
        featured: false,
        status: 'LIVE',
        year: 2026,
        category: 'Marketing Tools',
        services: 1,
        databases: 0,
      },
      {
        slug: 'poker-bet-calculator',
        title: 'Poker Bet & Side Pot Calculator',
        description: 'Real-time multi-pot and side pot calculation engine for complex poker showdown scenarios with zero rounding errors.',
        tech: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
        link: 'https://protein-tmp-tribunal-dock.trycloudflare.com',
        github: 'https://github.com/LVNVoid/poker-bet-calculator',
        image: 'https://res.cloudinary.com/dmvludl4w/image/upload/v1789998667/projects/poker-bet.png',
        featured: false,
        status: 'LIVE',
        year: 2026,
        category: 'Algorithm & Gaming',
        services: 1,
        databases: 0,
      },
    ];

    for (const proj of projects) {
      await db.project.upsert({
        where: { slug: proj.slug },
        update: proj,
        create: proj,
      });
      console.log(`Seeded Project: ${proj.title}`);
    }

    // Skills
    const skills = [
      { name: 'TypeScript', category: 'Language' },
      { name: 'JavaScript', category: 'Language' },
      { name: 'Python', category: 'Language' },
      { name: 'SQL', category: 'Language' },
      { name: 'Next.js 16', category: 'Frontend' },
      { name: 'React 19', category: 'Frontend' },
      { name: 'Tailwind CSS v4', category: 'Frontend' },
      { name: 'Framer Motion', category: 'Frontend' },
      { name: 'Node.js', category: 'Backend' },
      { name: 'Express / Fastify', category: 'Backend' },
      { name: 'Prisma ORM', category: 'Backend' },
      { name: 'PostgreSQL / Neon', category: 'Backend' },
      { name: 'Docker', category: 'DevOps' },
      { name: 'Linux / VPS Management', category: 'DevOps' },
      { name: 'Vercel / Cloudflare', category: 'DevOps' },
      { name: 'CI/CD & GitHub Actions', category: 'DevOps' },
    ];

    for (const skill of skills) {
      await db.skill.upsert({
        where: { name: skill.name },
        update: skill,
        create: skill,
      });
    }
    console.log(`Seeded ${skills.length} Skills`);

    // Education
    const educations = [
      {
        school: 'Universitas Terbuka',
        degree: 'Bachelor of Science in Information Systems',
        year: '2023 - Present',
        description: 'Focusing on enterprise software architecture, distributed databases, cloud systems, and algorithmic analysis.',
      },
    ];

    for (const edu of educations) {
      const existing = await db.education.findFirst({ where: { school: edu.school } });
      if (!existing) {
        await db.education.create({ data: edu });
      }
    }
    console.log('Seeded Education');

    // Certificates
    const certificates = [
      {
        slug: 'fullstack-web-developer-certification',
        name: 'Full-Stack Web Developer Certification',
        issuer: 'Alibaba Cloud / Dicoding',
        date: new Date('2025-06-15'),
        credentialUrl: 'https://credentials.example.com/cert/fullstack',
        image: 'https://res.cloudinary.com/dmvludl4w/image/upload/v1789998667/certificates/sample.png',
      },
      {
        slug: 'cloud-computing-architecture',
        name: 'Cloud Computing Architecture',
        issuer: 'Google Cloud Platform',
        date: new Date('2025-09-10'),
        credentialUrl: 'https://credentials.example.com/cert/gcp',
        image: 'https://res.cloudinary.com/dmvludl4w/image/upload/v1789998667/certificates/gcp.png',
      },
    ];

    for (const cert of certificates) {
      await db.certificate.upsert({
        where: { slug: cert.slug },
        update: cert,
        create: cert,
      });
    }
    console.log('Seeded Certificates');

  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await db.$disconnect();
    console.log('Seeding finished.');
  }
}

main();
