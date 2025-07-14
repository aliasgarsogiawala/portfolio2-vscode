export interface Project {
  title: string;
  description: string;
  logo: string;
  image: string;
  link: string;
  githubLink?: string;
  liveLink?: string;
  slug: string;
  techStack: string[];
}

export const projects: Project[] = [
  {
    title: 'Driwwwle',
    description:
      'Discover creative websites and developers. A portal for you to share your projects and connect with other developers in the community.',
    logo: '/logos/driwwwle.svg',
    image: '/project-images/driwwwle.svg',
    link: 'https://github.com/itsnitinr/driwwwle',
    githubLink: 'https://github.com/itsnitinr/driwwwle',
    slug: 'driwwwle',
    techStack: ['Next.js', 'TypeScript', 'MongoDB', 'Tailwind CSS', 'Node.js']
  },
  {
    title: 'VSCode Portfolio',
    description:
      'A Visual Studio Code themed developer portfolio built with Next.js and CSS Modules. Features terminal interface and modern design.',
    logo: '/logos/vsc.svg',
    image: '/project-images/vscode-portfolio.svg',
    link: 'https://github.com/itsnitinr/vscode-portfolio',
    githubLink: 'https://github.com/itsnitinr/vscode-portfolio',
    liveLink: 'https://vscode-portfolio-demo.vercel.app',
    slug: 'vscode-portfolio',
    techStack: ['Next.js', 'TypeScript', 'CSS Modules', 'React', 'Vercel']
  },
  {
    title: 'Subtrackt',
    description:
      'A simple and elegant way to track your subscriptions and save money. Manage all your recurring payments in one place.',
    logo: '/logos/subtrackt.svg',
    image: '/project-images/subtrackt.svg',
    link: 'https://github.com/itsnitinr/subtrackt',
    githubLink: 'https://github.com/itsnitinr/subtrackt',
    slug: 'subtrackt',
    techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'Material-UI']
  },
  {
    title: 'Coolify Deployments',
    description:
      'VSCode extension to track and deploy your Coolify applications. Streamline your deployment workflow directly from VS Code.',
    logo: '/logos/coolify.svg',
    image: '/project-images/coolify-extension.svg',
    link: 'https://github.com/itsnitinr/coolify-vscode-extension',
    githubLink: 'https://github.com/itsnitinr/coolify-vscode-extension',
    slug: 'coolify-vscode-extension',
    techStack: ['TypeScript', 'VS Code API', 'Node.js', 'Docker', 'REST API']
  },
];
