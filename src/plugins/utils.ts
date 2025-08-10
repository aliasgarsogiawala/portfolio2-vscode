import { PluginId } from './types';

// Slug to PluginId mapping
const SLUG_TO_PLUGIN: Record<string, PluginId> = {
  'volunteer': 'volunteer-work',
  'research': 'research-papers', 
  'certs': 'certifications',
  'talks': 'talks',
  'awards': 'awards',
  'oss': 'open-source',
};

// PluginId to slug mapping
const PLUGIN_TO_SLUG: Record<PluginId, string> = Object.entries(SLUG_TO_PLUGIN)
  .reduce((acc, [slug, pluginId]) => {
    acc[pluginId] = slug;
    return acc;
  }, {} as Record<PluginId, string>);

export function slugToPluginId(slug: string): PluginId | null {
  return SLUG_TO_PLUGIN[slug] || null;
}

export function pluginIdToSlug(pluginId: PluginId): string {
  return PLUGIN_TO_SLUG[pluginId];
}

// Safe localStorage helpers
export function safeLocalStorageGet<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') {
    return defaultValue;
  }

  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Failed to parse localStorage key "${key}":`, error);
    return defaultValue;
  }
}

export function safeLocalStorageSet(key: string, value: any): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Failed to set localStorage key "${key}":`, error);
  }
}

// Generate unique IDs
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Format date helpers
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(date));
}

export function formatDateRange(startDate: string, endDate?: string): string {
  const start = formatDate(startDate);
  if (!endDate || endDate === 'Present') {
    return `${start} - Present`;
  }
  return `${start} - ${formatDate(endDate)}`;
}
