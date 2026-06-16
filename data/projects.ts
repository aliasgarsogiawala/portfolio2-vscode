// Project type is defined once in types/index.ts — import from there.
export type { Project } from '@/types';
import type { Project } from '@/types';

export const projects: Project[] = [
  {
    title: 'TourSafe',
    description: 'A website for tourists to avoid getting scammed including features like emergency sos, cab fare estimation, chatroom, etc.',
    image: '/project-images/ts.png',
    link: 'https://github.com/aliasgarsogiawala/toursafe',
    liveLink: 'https://toursafe.in',
    slug: 'toursafe',
    featured: true,
    techStack: ['Next.js', 'TypeScript', 'Neon', 'Tailwind CSS', 'Clerk', 'Vercel']
  },
  {
    title: 'Zillionite',
    description:'Zillionite is a comprehensive wealth creation and management platform designed to guide users on their journey to financial prosperity.',
    image: '/project-images/zil.png',
    link: 'https://github.com/aliasgarsogiawala/zillionite',
    liveLink: 'https://zillionite.com',
    slug: 'zillionite',
    featured: true,
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
    featured: true,
    techStack: ['Next.js', 'Javascript', 'Clerk', 'Gemini API', 'Tailwind CSS']
  },
  {
    title: 'TaskNet AI',
    description: 'An AI-powered task management app inspired by Todoist, featuring smart task suggestions and semantic vector search over your to-dos.',
    image: 'https://opengraph.githubassets.com/1/aliasgarsogiawala/tasknet-ai',
    link: 'https://github.com/aliasgarsogiawala/tasknet-ai',
    githubLink: 'https://github.com/aliasgarsogiawala/tasknet-ai',
    liveLink: 'https://tasknet-ai.vercel.app',
    slug: 'tasknet-ai',
    featured: true,
    techStack: ['Next.js', 'TypeScript', 'Convex', 'OpenAI', 'shadcn/ui']
  },
  {
    title: 'storemyapi',
    description: 'A published npm package and CLI to securely store, encrypt, and manage your API keys locally using SHA-256 hashing.',
    image: 'https://opengraph.githubassets.com/1/aliasgarsogiawala/storemyapi-cli',
    link: 'https://github.com/aliasgarsogiawala/storemyapi-cli',
    githubLink: 'https://github.com/aliasgarsogiawala/storemyapi-cli',
    liveLink: 'https://www.npmjs.com/package/storemyapi',
    slug: 'storemyapi',
    techStack: ['TypeScript', 'Node.js', 'npm', 'SHA-256']
  },
  {
    title: 'DomainFlip',
    description: 'A domain valuation and market intelligence platform that scores domain names with rule-based and ML models, detects resale listings, and tracks availability.',
    image: 'https://opengraph.githubassets.com/1/aliasgarsogiawala/DomainFlip',
    link: 'https://github.com/aliasgarsogiawala/DomainFlip',
    githubLink: 'https://github.com/aliasgarsogiawala/DomainFlip',
    liveLink: 'https://domain-flipping.vercel.app',
    slug: 'domainflip',
    techStack: ['Next.js', 'TypeScript', 'Python', 'Gemini API', 'Random Forest']
  },
  {
    title: 'GalClean',
    description: 'A Flutter mobile app that lets you clean up your photo gallery in a fast, Tinder-like swipe interface.',
    image: 'https://opengraph.githubassets.com/1/aliasgarsogiawala/GalClean',
    link: 'https://github.com/aliasgarsogiawala/GalClean',
    githubLink: 'https://github.com/aliasgarsogiawala/GalClean',
    slug: 'galclean',
    techStack: ['Flutter', 'Dart']
  },
  {
    title: 'ChatGPT Lock',
    description: 'A Chrome extension that locks individual ChatGPT chats with unique passwords, with cloud-based sync built on Manifest V3, serverless functions, and MongoDB Atlas.',
    image: 'https://opengraph.githubassets.com/1/aliasgarsogiawala/chatgpt-lock',
    link: 'https://github.com/aliasgarsogiawala/chatgpt-lock',
    githubLink: 'https://github.com/aliasgarsogiawala/chatgpt-lock',
    slug: 'chatgpt-lock',
    techStack: ['JavaScript', 'Manifest V3', 'MongoDB', 'Vercel']
  },
  {
    title: 'Eggstinction',
    description: 'A canvas-based tower-defense game where you defend the last dinosaur egg from a swarm of predators, with a gacha roulette that decides what your dinosaur becomes.',
    image: 'https://opengraph.githubassets.com/1/aliasgarsogiawala/eggstinction',
    link: 'https://github.com/aliasgarsogiawala/eggstinction',
    githubLink: 'https://github.com/aliasgarsogiawala/eggstinction',
    liveLink: 'https://savedategg.vercel.app',
    slug: 'eggstinction',
    techStack: ['JavaScript', 'Canvas', 'Convex']
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
