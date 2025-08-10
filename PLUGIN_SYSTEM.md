# Plugin System

A comprehensive plugin system for the VS Code-themed portfolio, allowing dynamic installation and management of portfolio sections.

## Overview

The plugin system provides:
- **Plugin Marketplace**: Browse and install plugins from a curated marketplace
- **Dynamic Loading**: Plugins are loaded on-demand for optimal performance
- **Persistent State**: Installed plugins persist across browser sessions
- **Sidebar Integration**: Installed plugins appear in the VS Code-style sidebar
- **Type Safety**: Full TypeScript support for plugin definitions

## Architecture

### Core Components

1. **Types** (`src/plugins/types.ts`)
   - Plugin interface definitions
   - Data type definitions for each plugin
   - Context interfaces for state management

2. **Registry** (`src/plugins/registry.ts`)
   - Central plugin registry with metadata
   - Plugin component imports and routing
   - Download stats and ratings

3. **Store** (`src/plugins/store.tsx`)
   - React Context for plugin state management
   - localStorage persistence
   - Install/uninstall actions

4. **Utils** (`src/plugins/utils.ts`)
   - Slug mapping utilities
   - Safe localStorage operations
   - Helper functions

5. **Marketplace** (`src/plugins/components/PluginMarketplace.tsx`)
   - Plugin browsing interface
   - Search and filtering
   - Install/uninstall actions

## Available Plugins

### 1. Volunteer Work (`volunteer-work`)
- **Route**: `/plugins/volunteer`
- **Description**: Track and showcase volunteer experience and community contributions
- **Features**: Impact tracking, organization details, date ranges

### 2. Research Papers (`research-papers`)
- **Route**: `/plugins/research`
- **Description**: Manage and display academic research papers and publications
- **Features**: BibTeX export, DOI links, paper abstracts, author management

### 3. Certifications (`certifications`)
- **Route**: `/plugins/certs`
- **Description**: Display professional certifications and achievements
- **Features**: Expiration tracking, verification links, credential IDs

### 4. Talks & Presentations (`talks`)
- **Route**: `/plugins/talks`
- **Description**: Showcase speaking engagements and presentations
- **Features**: Slides links, video recordings, event details

### 5. Awards & Recognition (`awards`)
- **Route**: `/plugins/awards`
- **Description**: Display awards, honors, and professional recognition
- **Features**: Category filtering, achievement timeline, impact descriptions

### 6. Open Source Contributions (`open-source`)
- **Route**: `/plugins/oss`
- **Description**: Track and showcase open source project contributions
- **Features**: Repository stats, contribution details, language breakdown

## Usage

### Installing Plugins

1. Navigate to `/plugins` (Plugin Marketplace)
2. Browse available plugins
3. Click "Install" on desired plugins
4. Installed plugins appear in the sidebar

### Accessing Plugins

- **Sidebar**: Installed plugins appear in the "Plugins" section
- **Direct URLs**: Access via `/plugins/{slug}` routes
- **Marketplace**: Always available at `/plugins`

### Plugin State

Plugins maintain state through:
- **localStorage**: Persistence across sessions
- **React Context**: Real-time state management
- **Dynamic Imports**: On-demand component loading

## Development

### Adding New Plugins

1. **Create Plugin Component**: Add to `pages/plugins/`
2. **Update Types**: Add plugin ID to union type
3. **Register Plugin**: Add entry to `ALL_PLUGINS` array
4. **Add Slug Mapping**: Update utils for routing
5. **Create Sample Data**: Add type definitions and sample data

### Plugin Component Structure

```tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
// ... other imports

export default function PluginPage() {
  // Component logic
  return (
    <div className="min-h-screen bg-[#1e1e1e] text-gray-100">
      {/* Plugin content */}
    </div>
  );
}
```

### Plugin Registration

```typescript
{
  id: 'plugin-id',
  name: 'Plugin Name',
  description: 'Plugin description',
  version: '1.0.0',
  author: 'Author Name',
  icon: 'IconName',
  category: 'category',
  tags: ['tag1', 'tag2'],
  route: '/plugins/slug',
  component: () => import('../../pages/plugins/PluginPage'),
  isInstalled: false,
  installDate: null,
  size: '1.0 MB',
  downloads: 1000,
  rating: 4.5,
}
```

## Features

### Marketplace Features
- **Search**: Full-text search across name, description, and tags
- **Filtering**: Filter by category and sort options
- **View Modes**: Grid and list view options
- **Statistics**: Downloads, ratings, and size information

### Plugin Features
- **Responsive Design**: Mobile-friendly layouts
- **Dark Theme**: VS Code-consistent theming
- **Animations**: Framer Motion animations
- **Interactive Elements**: Expandable cards, modals, forms

### State Management
- **Persistent Storage**: LocalStorage integration
- **Context Provider**: React Context for state
- **Type Safety**: Full TypeScript coverage
- **Error Handling**: Graceful fallbacks and error states

## Technical Details

### Dependencies
- **React**: Component framework
- **Next.js**: App router and SSG
- **Framer Motion**: Animations
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling

### Performance
- **Dynamic Imports**: Code splitting for plugins
- **Lazy Loading**: On-demand component loading
- **Efficient Re-renders**: Optimized React Context
- **Static Generation**: Pre-built plugin pages

### Browser Support
- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **localStorage**: For state persistence
- **ES6+ Features**: Dynamic imports, async/await

## Customization

### Styling
All plugins use the VS Code theme:
- **Background**: `#1e1e1e` (main), `#2d2d30` (cards)
- **Text**: Gray scale from `#ffffff` to `#6b7280`
- **Accents**: Blue `#3b82f6`, Green `#10b981`, etc.

### Adding Custom Data
Plugins include sample data that can be replaced with real data:
- Update plugin components with real information
- Modify data structures in types.ts if needed
- Add API integration for dynamic data

### Configuration
- Plugin metadata in registry.ts
- Routing configuration in utils.ts
- Theme customization in component styles

## Best Practices

1. **Type Safety**: Always use TypeScript interfaces
2. **Error Handling**: Include loading and error states
3. **Accessibility**: Follow ARIA guidelines
4. **Performance**: Use React.memo for expensive components
5. **Consistency**: Follow VS Code theme patterns
6. **Documentation**: Comment complex logic and provide examples

## Troubleshooting

### Common Issues

1. **Plugin Not Loading**: Check import paths in registry.ts
2. **Storage Issues**: Verify localStorage availability
3. **Type Errors**: Ensure interface compliance
4. **Routing Problems**: Check slug mappings in utils.ts

### Debug Mode

Enable debug logging:
```typescript
const DEBUG = process.env.NODE_ENV === 'development';
if (DEBUG) console.log('Plugin state:', state);
```

## Future Enhancements

- Plugin versioning and updates
- User-created plugins
- Plugin data export/import
- Plugin analytics
- Plugin dependencies
- Remote plugin loading
