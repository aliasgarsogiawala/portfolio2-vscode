export interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
  githubLink?: string;
  liveLink?: string;
  slug: string;
  techStack: string[];
}

export const projects: Project[] = [
  {
    title: 'TourSafe',
    description: 'A website for tourists to avoid getting scammed including features like emergency sos, cab fare estimation, chatroom, etc.',
    image: '/project-images/ts.png',
    link: 'https://github.com/aliasgarsogiawala/toursafe',
    liveLink: 'https://toursafe.in',
    slug: 'toursafe',
    techStack: ['Next.js', 'TypeScript', 'Neon', 'Tailwind CSS', 'Clerk', 'Vercel']
  },
  {
    title: 'Zillionite',
    description:'Zillionite is a comprehensive wealth creation and management platform designed to guide users on their journey to financial prosperity.',
    image: '/project-images/zil.png',
    link: 'https://github.com/aliasgarsogiawala/zillionite',
    liveLink: 'https://zillionite.com',
    slug: 'zillionite',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Razorpay', ]
  },
  {
    title: 'ParaDoc',
    description:'A Parallel Reality Simulation for Medical Decision-Making. Hackathon winning project.',
    image: '/project-images/paradoc.png',
    link: 'https://github.com/aliasgarsogiawala/paradoc',
    githubLink: 'https://github.com/aliasgarsogiawala/paradoc',
    liveLink: 'https://paradocc.vercel.app',
    slug: 'paradoc',
    techStack: ['Next.js', 'Javascript', 'Clerk', 'Gemini API', 'Tailwind CSS']
  },
  {
    title: 'Portfolio 1.0',
    description:'A previous version of my portfolio for non tech people to view my work.',
    image: '/project-images/portfolio.png',
    link: 'https://github.com/aliasgarsogiawala/portfolio1',
    githubLink: 'https://github.com/aliasgarsogiawala/portfolio1',
    liveLink: 'https://aliasgar.vercel.app',
    slug: 'portfolio-1',
    techStack: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Nodemailer']
  },
];
