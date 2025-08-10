export type PluginId = 
  | "volunteer-work" 
  | "research-papers" 
  | "certifications" 
  | "talks" 
  | "awards" 
  | "open-source";

export interface Plugin {
  id: PluginId;
  name: string;
  description: string;
  version: string;
  author: string;
  icon: string;
  category: string;
  tags: string[];
  route: string;
  component: () => Promise<{ default: React.ComponentType }>;
  isInstalled: boolean;
  installDate: string | null;
  size: string;
  downloads: number;
  rating: number;
}

export interface PluginStore {
  installed: PluginId[];
  install: (id: PluginId) => void;
  uninstall: (id: PluginId) => void;
  isInstalled: (id: PluginId) => boolean;
}

// Sample data types for plugins
export interface VolunteerEntry {
  id: string;
  organization: string;
  role: string;
  impact: string[];
  dateRange: string;
  link?: string;
  location?: string;
}

export interface ResearchPaper {
  id: string;
  title: string;
  venue: string;
  year: number;
  abstract: string;
  pdfLink?: string;
  doiLink?: string;
  tags: string[];
  authors: string[];
  bibtex?: string;
}

export interface Certification {
  id: string;
  name: string;
  provider: string;
  issueDate: string;
  credentialId?: string;
  verifyLink?: string;
  logoUrl?: string;
  expiryDate?: string;
}

export interface Talk {
  id: string;
  title: string;
  event: string;
  date: string;
  slidesLink?: string;
  youtubeLink?: string;
  description?: string;
}

export interface Award {
  id: string;
  name: string;
  organization: string;
  year: number;
  description: string;
  category?: string;
}

export interface OpenSourceContribution {
  id: string;
  repoName: string;
  repoUrl: string;
  description: string;
  language: string;
  stars?: number;
  contribution: string;
}
