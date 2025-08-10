import { Plugin } from './types';

export const ALL_PLUGINS: Plugin[] = [
  {
    id: 'volunteer-work',
    name: 'Volunteer Work',
    description: 'Track and showcase volunteer experience and community contributions',
    version: '1.0.0',
    author: 'Portfolio Extensions',
    icon: 'Heart',
    category: 'personal',
    tags: ['volunteer', 'community', 'experience'],
    route: '/plugins/volunteer',
    component: () => import('../../pages/plugins/VolunteerWorkPage'),
    isInstalled: false,
    installDate: null,
    size: '2.1 MB',
    downloads: 1250,
    rating: 4.8,
  },
  {
    id: 'research-papers',
    name: 'Research Papers',
    description: 'Manage and display academic research papers and publications',
    version: '1.2.1',
    author: 'Academic Extensions',
    icon: 'FileText',
    category: 'academic',
    tags: ['research', 'papers', 'academic', 'publications'],
    route: '/plugins/research',
    component: () => import('../../pages/plugins/ResearchPapersPage'),
    isInstalled: false,
    installDate: null,
    size: '1.8 MB',
    downloads: 890,
    rating: 4.6,
  },
  {
    id: 'certifications',
    name: 'Certifications',
    description: 'Display professional certifications and achievements',
    version: '2.0.0',
    author: 'Career Extensions',
    icon: 'Award',
    category: 'professional',
    tags: ['certifications', 'achievements', 'professional'],
    route: '/plugins/certs',
    component: () => import('../../pages/plugins/CertificationsPage'),
    isInstalled: false,
    installDate: null,
    size: '1.5 MB',
    downloads: 2100,
    rating: 4.9,
  },
  {
    id: 'talks',
    name: 'Talks & Presentations',
    description: 'Showcase speaking engagements and presentations',
    version: '1.1.0',
    author: 'Speaker Extensions',
    icon: 'Mic',
    category: 'professional',
    tags: ['talks', 'presentations', 'speaking'],
    route: '/plugins/talks',
    component: () => import('../../pages/plugins/TalksPage'),
    isInstalled: false,
    installDate: null,
    size: '2.3 MB',
    downloads: 750,
    rating: 4.5,
  },
  {
    id: 'awards',
    name: 'Awards & Recognition',
    description: 'Display awards, honors, and professional recognition',
    version: '1.0.2',
    author: 'Achievement Extensions',
    icon: 'Trophy',
    category: 'achievements',
    tags: ['awards', 'recognition', 'honors'],
    route: '/plugins/awards',
    component: () => import('../../pages/plugins/AwardsPage'),
    isInstalled: false,
    installDate: null,
    size: '1.2 MB',
    downloads: 680,
    rating: 4.7,
  },
  {
    id: 'open-source',
    name: 'Open Source Contributions',
    description: 'Track and showcase open source project contributions',
    version: '1.3.0',
    author: 'DevCommunity Extensions',
    icon: 'GitBranch',
    category: 'development',
    tags: ['open-source', 'contributions', 'github'],
    route: '/plugins/oss',
    component: () => import('../../pages/plugins/OpenSourcePage'),
    isInstalled: false,
    installDate: null,
    size: '2.7 MB',
    downloads: 1500,
    rating: 4.8,
  },
];

export function getPluginById(id: string): Plugin | undefined {
  return ALL_PLUGINS.find(plugin => plugin.id === id);
}

export function getPluginsByCategory(category: string): Plugin[] {
  return ALL_PLUGINS.filter(plugin => plugin.category === category);
}

export function getInstalledPlugins(): Plugin[] {
  return ALL_PLUGINS.filter(plugin => plugin.isInstalled);
}

export function getAvailablePlugins(): Plugin[] {
  return ALL_PLUGINS.filter(plugin => !plugin.isInstalled);
}
