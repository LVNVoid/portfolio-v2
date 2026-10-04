import 'dotenv/config';
import db from '../src/services/db';
import bcrypt from 'bcryptjs';

const S = 'https://br-rapid-block-b3i6s8r9.storage.c-4.ap-southeast-1.aws.neon.tech/asset';

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

    // Profile (matches STATIC_PROFILE live data)
    await db.profile.upsert({
      where: { id: 'default-profile' },
      update: {
        name: 'Elvien Aninditha Purnawan',
        role: 'Full Stack Developer & Software Engineer',
        bio: 'Full-Stack Software Engineer specializing in building modern, resilient, high-performance web applications and autonomous systems with Next.js and TypeScript. Dedicated to end-to-end craft, strict type contracts, and zero-defect deployments.',
        location: 'Jakarta, Indonesia (WIB / UTC+7)',
        email: 'elvien.purnawan13@gmail.com',
        avatar: `${S}/profile-avatar.jpg`,
        socials: {
          github: 'https://github.com/LVNVoid',
          linkedin: 'https://linkedin.com/in/elvien',
          website: 'https://elvien.net',
          twitter: 'https://twitter.com/elviencode',
        },
      },
      create: {
        id: 'default-profile',
        name: 'Elvien Aninditha Purnawan',
        role: 'Full Stack Developer & Software Engineer',
        bio: 'Full-Stack Software Engineer specializing in building modern, resilient, high-performance web applications and autonomous systems with Next.js and TypeScript. Dedicated to end-to-end craft, strict type contracts, and zero-defect deployments.',
        location: 'Jakarta, Indonesia (WIB / UTC+7)',
        email: 'elvien.purnawan13@gmail.com',
        avatar: `${S}/profile-avatar.jpg`,
        socials: {
          github: 'https://github.com/LVNVoid',
          linkedin: 'https://linkedin.com/in/elvien',
          website: 'https://elvien.net',
          twitter: 'https://twitter.com/elviencode',
        },
      },
    });
    console.log('Seeded Profile');

    // Projects (7 live entries from project-service.ts)
    const projects = [
      {
        slug: 'maganghub-bot-attendance',
        title: 'MagangHub Bot Attendance',
        description:
          'Enterprise-grade multi-user workflow automation and attendance management system engineered for Indonesian Ministry of Manpower (Kemnaker) MagangHub interns. The platform completely automates daily check-in, check-out, and formal tri-part internship reporting (Uraian, Pembelajaran, Kendala) via intelligent proxy routing and background cron daemon execution.',
        tech: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'Neon', 'NextAuth', 'Zod', 'Tinyproxy', 'Vitest'],
        link: 'https://maganghub-bot-attendance.vercel.app',
        github: 'https://github.com/LVNVoid/maganghub-bot-attendance',
        image: `${S}/projects-maganghub.png`,
        featured: true,
        status: 'LIVE',
        year: 2026,
        category: 'Automation & Bot',
        services: 4,
        databases: 1,
      },
      {
        slug: 'kopi-sangkara-pos',
        title: 'Kopi Sangkara POS',
        description:
          'Modern, responsive cloud-based Point of Sale and retail operations platform tailored for specialty coffee shops and hospitality environments. Engineered as an installable Progressive Web Application (PWA) optimized for tablet and iPad touch viewports with direct ESC/POS hardware printing over Web Bluetooth and dynamic QR digital invoice fallback.',
        tech: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'Web Bluetooth', 'PWA'],
        link: 'https://kopi-sangkara-pos.vercel.app',
        github: 'https://github.com/LVNVoid/kopi-sangkara-pos',
        image: `${S}/projects-kopi-sangkara.png`,
        featured: true,
        status: 'LIVE',
        year: 2026,
        category: 'POS & Retail',
        services: 3,
        databases: 1,
      },
      {
        slug: 'google-review-card-generator',
        title: 'Google Review Card Generator',
        description:
          'End-to-end web engineering solution and print-ready card design system built to bridge offline customer foot traffic with Google Maps business profiles. Features millimeter-precise, 300+ DPI vector PDF/PNG export, sub-50ms HTTP 307 proxy redirects (/r/[id]), and merchant self-activation onboarding.',
        tech: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'Neon', 'Playwright', 'jsPDF', 'html-to-image'],
        link: 'https://review-card-generator.vercel.app',
        github: 'https://github.com/LVNVoid/review-card-generator',
        image: `${S}/projects-review-card.png`,
        featured: true,
        status: 'LIVE',
        year: 2026,
        category: 'Marketing & Hardware',
        services: 2,
        databases: 1,
      },
      {
        slug: 'hospital-e-klaim-health-insurance-integration',
        title: 'Hospital E-Klaim & Health Insurance Integration',
        description:
          'Enterprise hospital claim processing system bridging clinical hospital management (SIMRS) with Ministry of Health (Kemenkes) and BPJS Kesehatan web services. Streamlines patient visit reconciliation, automated grouping, hospital tariff calculations, and secure AES-256 payload encryption.',
        tech: ['React 19', 'TypeScript', 'Express.js', 'Node.js', 'MS SQL Server', 'REST API', 'Tailwind CSS'],
        link: null,
        github: null,
        image: `${S}/projects-hospital-eklaim.png`,
        featured: false,
        status: 'LIVE',
        year: 2026,
        category: 'Healthcare & Enterprise',
        services: 4,
        databases: 2,
      },
      {
        slug: 'timkurator-kusumahadisantosa',
        title: 'Tim Kurator PT Kusumahadi Santosa',
        description:
          'Official corporate and legal transparency portal for the court-appointed curator team of PT Kusumahadi Santosa (In Bankruptcy). Features real-time creditor announcements, verified documentation archive, and media management.',
        tech: ['Next.js 16', 'TypeScript', 'Tailwind CSS v4', 'Prisma', 'PostgreSQL', 'Neon Object Storage'],
        link: 'https://timkurator-kusumahadisantosa.id',
        github: 'https://github.com/LVNVoid/timkurator-kusumahadisantosa',
        image: null, // ponytail: no screenshot asset yet; upload to bucket + repoint when available
        featured: false,
        status: 'LIVE',
        year: 2026,
        category: 'Corporate & Legal',
        services: 2,
        databases: 1,
      },
      {
        slug: 'spld',
        title: 'SPLD — Laboratory Scheduling System',
        description:
          'Digital lab facility reservation, inventory tracking, and scheduling management platform for academic computer laboratories, featuring real-time collision detection.',
        tech: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Node.js', 'REST API'],
        link: 'https://spld-app.vercel.app/',
        github: 'https://github.com/LVNVoid/SPLD-Client',
        image: `${S}/projects-spld.png`,
        featured: false,
        status: 'LIVE',
        year: 2025,
        category: 'Academic Systems',
        services: 2,
        databases: 1,
      },
      {
        slug: 'foman-print',
        title: 'Foman Kreasi',
        description:
          'Commercial digital printing catalogue and customer quotation portal for large-format printing, offset paper packaging, and customized branding merchandise.',
        tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
        link: null,
        github: null,
        image: `${S}/projects-foman-print.jpg`,
        featured: false,
        status: 'LIVE',
        year: 2025,
        category: 'Commercial Showcase',
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

    // Skills (matches STATIC_SKILLS fallback list)
    const skills = [
      { name: 'TypeScript', category: 'Languages' },
      { name: 'JavaScript (ESNext)', category: 'Languages' },
      { name: 'Python', category: 'Languages' },
      { name: 'SQL', category: 'Languages' },
      { name: 'Next.js 16 (App Router)', category: 'Frontend' },
      { name: 'React 19', category: 'Frontend' },
      { name: 'Tailwind CSS v4', category: 'Frontend' },
      { name: 'Framer Motion', category: 'Frontend' },
      { name: 'shadcn/ui & Radix', category: 'Frontend' },
      { name: 'Node.js', category: 'Backend' },
      { name: 'Express.js', category: 'Backend' },
      { name: 'Prisma ORM', category: 'Backend' },
      { name: 'Zod (Type Contracts)', category: 'Backend' },
      { name: 'PostgreSQL (Neon)', category: 'Database & Cloud' },
      { name: 'Neon Object Storage', category: 'Database & Cloud' },
      { name: 'Microsoft SQL Server', category: 'Database & Cloud' },
      { name: 'Docker & Containers', category: 'DevOps & Tooling' },
      { name: 'Ubuntu VPS & SSH', category: 'DevOps & Tooling' },
      { name: 'Git & GitHub Workflows', category: 'DevOps & Tooling' },
      { name: 'Vercel Platform', category: 'DevOps & Tooling' },
      { name: 'Cloudflare Proxy & WAF', category: 'DevOps & Tooling' },
    ];

    for (const skill of skills) {
      await db.skill.upsert({
        where: { name: skill.name },
        update: skill,
        create: skill,
      });
    }
    console.log(`Seeded ${skills.length} Skills`);

    // Education (matches STATIC_EDUCATIONS live data)
    const educations = [
      {
        school: 'Universitas Muhammadiyah Magelang',
        degree: 'Bachelor of Computer Science / Information Technology',
        year: '2021 - 2025',
        description:
          'Specialized in distributed software architecture, web application engineering, and relational database systems.',
      },
    ];

    for (const edu of educations) {
      const existing = await db.education.findFirst({ where: { school: edu.school } });
      if (!existing) {
        await db.education.create({ data: edu });
      }
    }
    console.log('Seeded Education');

    // Certificates (5 real Dicoding entries from certificate-service.ts)
    const certificates = [
      {
        slug: 'belajar-membuat-aplikasi-web-dengan-react',
        name: 'Belajar Membuat Aplikasi Web dengan React',
        issuer: 'Dicoding Indonesia',
        date: new Date('2025-11-20'),
        credentialUrl: 'https://www.dicoding.com/certificates/QLZ9RE069P5D',
        image: `${S}/certificates/cert-react.jpg`,
      },
      {
        slug: 'belajar-dasar-pemrograman-web',
        name: 'Belajar Dasar Pemrograman Web',
        issuer: 'Dicoding Indonesia',
        date: new Date('2025-11-15'),
        credentialUrl: 'https://www.dicoding.com/certificates/EYX4YK75OZDL',
        image: `${S}/certificates/cert-web-basic.jpg`,
      },
      {
        slug: 'belajar-dasar-git-dengan-github',
        name: 'Belajar Dasar Git dengan GitHub',
        issuer: 'Dicoding Indonesia',
        date: new Date('2025-11-10'),
        credentialUrl: 'https://www.dicoding.com/certificates/QLZ94EYLMP5D',
        image: `${S}/certificates/cert-git-github.jpg`,
      },
      {
        slug: 'belajar-back-end-pemula-dengan-javascript',
        name: 'Belajar Back-End Pemula dengan JavaScript',
        issuer: 'Dicoding Indonesia',
        date: new Date('2025-11-05'),
        credentialUrl: 'https://www.dicoding.com/certificates/53XEO5V0YZRN',
        image: `${S}/certificates/cert-backend-js.jpg`,
      },
      {
        slug: 'belajar-dasar-pemrograman-javascript',
        name: 'Belajar Dasar Pemrograman JavaScript',
        issuer: 'Dicoding Indonesia',
        date: new Date('2025-10-28'),
        credentialUrl: 'https://www.dicoding.com/certificates/JMZV1OG7RXN9',
        image: `${S}/certificates/cert-js-basic.jpg`,
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
