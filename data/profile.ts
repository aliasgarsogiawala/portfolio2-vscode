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
    "Hey! I'm a software engineer from Mumbai, India. I primarily work with JavaScript / TypeScript and the React ecosystem.",
    "I'm focused on frontend development with React, but you'll also find me working with Node.js, MongoDB and Express while building the backend for my personal projects.",
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
      href: 'https://www.linkedin.com/in/aliasgar-sogiawala/',
    },
    {
      social: 'twitter',
      label: 'aliasgarsogiawala',
      href: 'https://www.twitter.com/aliasgarsogiawala',
    },
    {
      social: 'instagram',
      label: 'aliasgarsogiawala',
      href: 'https://www.instagram.com/aliasgarsogiawala',
    },
  ],
  experience: [
    {
      company: 'Tessact',
      role: 'Software Engineer 2',
      period: 'Present',
      description: [
        "Working with a lean team of 4 frontend engineers to build a next-gen video creation suite for the people of video.",
        "Leading the development efforts for bringing collaborative video reviewing and editing to the platform.",
        "Maintaining the in-house component library, icon library and website.",
      ],
    },
  ],
  interests:
    "Aside from programming and writing, I like to read a good dystopian novel, listen to calm piano music or just laze around.",
  githubUsername: 'aliasgarsogiawala',
};

export default profile;
