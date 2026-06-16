// Central profile configuration — edit this file to update your info everywhere.

export interface SocialLink {
  social: string;
  label: string;
  href: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
}

export interface Profile {
  name: string;
  firstName: string;
  lastName: string;
  role: string;
  roleShort: string;
  location: string;
  bio: string;
  bioLong: string[];
  siteUrl: string;
  ogImage: string;
  socials: SocialLink[];
  experience: Experience[];
  interests: string;
  githubUsername: string;
}

const profile: Profile = {
  name: 'Aliasgar Sogiawala',
  firstName: 'Aliasgar',
  lastName: 'Sogiawala',
  role: 'Full Stack Developer',
  roleShort: 'Software Engineer',
  location: 'Mumbai, India',
  bio: 'Building modern web experiences and AI / ML solutions',
  bioLong: [
    "Im a 19 year old developer with a focus on creating problem solving, functional, and user-friendly web applications , softwares and mobile apps. With over 5 years of experience in the field, I've worked on a variety of projects from small business websites to complex web applications.",

"My expertise lies in modern frontend technologies like React, Next.js, and TypeScript, Backend Technologies like Python , MySQL and MongoDB combined with a strong foundation in UI/UX design principles. I believe in writing clean, maintainable code and creating intuitive user experiences.",

"When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge through blog posts and community events.",
  ],
  siteUrl: 'https://aliasgar-vscode.vercel.app',
  ogImage: '/metaimage.png',
  socials: [
    {
      social: 'email',
      label: 'aliasgarsogiawala@gmail.com',
      href: 'mailto:aliasgarsogiawala@gmail.com',
    },
    {
      social: 'github',
      label: 'aliasgarsogiawala',
      href: 'https://github.com/aliasgarsogiawala',
    },
    {
      social: 'linkedin',
      label: 'aliasgar-sogiawala',
      href: 'https://www.linkedin.com/in/aliasgar-sogiawala-09b24a1b8/',
    },
    {
      social: 'twitter',
      label: 'aliasgarsogiawala',
      href: 'https://www.twitter.com/aliasgarsogiawala',
    },
    
    
  ],
  experience: [
    {
      company: 'Tech Horizons Club',
      role: 'Co-Founder',
      period: 'Nov 2024 – Present',
      description: [
        'Co-founded a student-led tech community for enthusiasts to learn, build, and grow together.',
        'Drive startup, leadership, and community initiatives while leading web development for the club.',
      ],
    },
    {
      company: 'Zillionite',
      role: 'Full-stack Developer · Internship',
      period: 'Feb 2025 – Jan 2026',
      description: [
        'Built the complete Zillionite website from scratch using Next.js, Tailwind CSS, and Node.js.',
        'Integrated online payments with Razorpay.',
      ],
    },
    {
      company: 'Internship & Placement Cell, IT & SD Department',
      role: 'Core Member',
      period: 'Jul 2025 – Mar 2026',
      description: [
        'Core member of the Internship & Placement Cell for the IT & Software Development department.',
      ],
    },
    {
      company: 'DotComClub',
      role: 'Core Team — Hackathon & Marketing Head',
      period: 'Jul 2023 – Present',
      description: [
        'Hackathon Team Head and Marketing Team Head (May 2025 – Present).',
        'Part of the PR team since May 2024 and the Sponsorship team since Jul 2023.',
      ],
    },
    {
      company: 'The Social and Dramatic Union',
      role: 'External Public Relations Team',
      period: 'Jun 2023 – Mar 2024',
      description: [
        'Handled external public relations and event management.',
      ],
    },
    {
      company: 'OVERTURES InfoTech',
      role: 'Information Technology Intern',
      period: 'Jan 2023 – Jul 2023',
      description: [
        'Worked on website development, debugging, and SEO.',
      ],
    },
  ],
  interests:
    "Aside from programming and writing, I like to read a good dystopian novel, listen to calm piano music or just laze around.",
  githubUsername: 'aliasgarsogiawala',
};

export default profile;
