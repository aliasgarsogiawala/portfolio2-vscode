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
  {
    title: 'Tech Horizons Club',
    description:'Co-Founder and Web Dev of THC. A club for all tech enthusiasts to learn and grow together.',
    image: '/project-images/thc.png',
    link: 'https://github.com/aliasgarsogiawala/portfolio1',
    liveLink: 'https://techhorizonsclub.com',
    slug: 'THC',
    techStack: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Nodemailer']
  },
  {
    title: 'GitHub Punchcard',
    description:'Visualize the hours and days you commit the most. Plug it into your readme.',
    image: '/project-images/punch.png',
    link: 'https://github.com/aliasgarsogiawala/punchcard-widget',
    githubLink: 'https://github.com/aliasgarsogiawala/punchcard-widget',
    liveLink: 'https://punchcardwidget.vercel.app',
    slug: 'punchcard',
    techStack: ['Vercel Edge API', 'Next.js', 'Tailwind CSS', 'Github API']
  },
  {
    title: 'Purchase Order Generator',
    description:'A Purchase Order Generator using JavaScript, React.js making use of JsPDF for document generation.',
    image: '/project-images/po.png',
    link: 'https://github.com/aliasgarsogiawala/purchase-order',
    githubLink: 'https://github.com/aliasgarsogiawala/purchase-order',
    liveLink: 'https://purchase-order-gen.vercel.app',
    slug: 'purchase-order',
    techStack: ['React.js', 'JavaScript', 'CSS', 'jsPDF']
  },
  {
    title: 'GitHub Last 3 Commits',
    description:'A place where you can fetch your or anyones last 3 public repo commits and it also provides you with a markdown code for you to embed it in your README.md.',
    image: '/project-images/l3.png',
    link: 'https://github.com/aliasgarsogiawala/last-3-commits',
    githubLink: 'https://github.com/aliasgarsogiawala/last-3-commits',
    liveLink: 'https://last-3-commits.vercel.app',
    slug: 'last-3-commits',
    techStack: ['Vercel API', 'Next.js', 'Tailwind CSS', 'GitHub API']
  },
  {
    title: 'Mini Python Projects',
    description:'Python Mini Projects and Mini Games including web scraping utilities and automation scripts.',
    image: '/project-images/python.png',
    link: 'https://github.com/aliasgarsogiawala/Codes',
    githubLink: 'https://github.com/aliasgarsogiawala/Codes',
    slug: 'mini-python-projects',
    techStack: ['Python', 'Flask', 'BeautifulSoup', 'Web Scraping']
  },
];
