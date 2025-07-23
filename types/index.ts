export interface Article {
  id: string;
  title: string;
  description: string;
  cover_image: string;
  url: string;
  page_views_count: number;
  public_reactions_count: number;
  comments_count: number;
}

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

export interface Repo {
  id: number;
  name: string;
  description: string;
  language: string;
  watchers: number;
  forks: number;
  stargazers_count: number;
  html_url: string;
  homepage: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  size: number;
  open_issues_count: number;
  topics?: string[];
  license?: {
    name: string;
    spdx_id: string;
  };
}

export interface User {
  login: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following?: number;
  name?: string;
  bio?: string;
  location?: string;
  company?: string;
  email?: string;
  blog?: string;
  created_at?: string;
}
