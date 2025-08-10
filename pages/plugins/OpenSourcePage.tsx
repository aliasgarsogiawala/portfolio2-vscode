'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, ExternalLink, Star, GitFork, Plus, Search, Code } from 'lucide-react';
import { OpenSourceContribution } from '../../src/plugins/types';

const sampleContributions: OpenSourceContribution[] = [
  {
    id: '1',
    repoName: 'react-awesome-components',
    repoUrl: 'https://github.com/example/react-awesome-components',
    description: 'A collection of beautiful, accessible React components with TypeScript support and comprehensive documentation.',
    language: 'TypeScript',
    stars: 2450,
    contribution: 'Major contributor - Added 15+ components, implemented theming system, and maintained documentation. Created the entire form validation system used by 10k+ developers.'
  },
  {
    id: '2',
    repoName: 'next-js-starter-kit',
    repoUrl: 'https://github.com/example/next-js-starter-kit',
    description: 'Production-ready Next.js starter template with authentication, database integration, and deployment configurations.',
    language: 'JavaScript',
    stars: 1850,
    contribution: 'Core maintainer - Set up CI/CD pipelines, added Docker support, and implemented authentication system. Reviewed 100+ PRs and mentored new contributors.'
  },
  {
    id: '3',
    repoName: 'ml-toolkit-python',
    repoUrl: 'https://github.com/example/ml-toolkit-python',
    description: 'Machine learning utilities and algorithms implemented in Python with extensive examples and tutorials.',
    language: 'Python',
    stars: 980,
    contribution: 'Regular contributor - Implemented data preprocessing modules, added visualization tools, and created comprehensive tutorials for beginners.'
  },
  {
    id: '4',
    repoName: 'vscode-developer-tools',
    repoUrl: 'https://github.com/example/vscode-developer-tools',
    description: 'VS Code extension that provides enhanced developer productivity tools and code navigation features.',
    language: 'TypeScript',
    stars: 756,
    contribution: 'Created extension from scratch - Developed core functionality, published to marketplace, and maintain active user community of 25k+ developers.'
  },
  {
    id: '5',
    repoName: 'open-weather-api',
    repoUrl: 'https://github.com/example/open-weather-api',
    description: 'Free weather API service built with Node.js and Express, serving weather data to mobile and web applications.',
    language: 'JavaScript',
    stars: 445,
    contribution: 'Feature contributor - Added caching layer, implemented rate limiting, and created comprehensive API documentation with examples.'
  }
];

export default function OpenSourcePage() {
  const [contributions] = useState<OpenSourceContribution[]>(sampleContributions);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');

  const languages = Array.from(new Set(contributions.map(c => c.language)));
  
  const filteredContributions = contributions.filter(contrib => {
    const matchesSearch = 
      contrib.repoName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contrib.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contrib.contribution.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLanguage = selectedLanguage === 'all' || contrib.language === selectedLanguage;
    
    return matchesSearch && matchesLanguage;
  });

  const totalStars = contributions.reduce((sum, contrib) => sum + (contrib.stars || 0), 0);
  const totalRepos = contributions.length;

  const getLanguageColor = (language: string) => {
    const colors = {
      'TypeScript': '#3178c6',
      'JavaScript': '#f7df1e',
      'Python': '#3776ab',
      'Go': '#00add8',
      'Rust': '#000000',
      'Java': '#ed8b00',
    };
    return colors[language as keyof typeof colors] || '#6b7280';
  };

  const getContributionLevel = (stars: number | undefined) => {
    if (!stars) return { level: 'Small', color: 'text-gray-400' };
    if (stars >= 2000) return { level: 'Major', color: 'text-green-400' };
    if (stars >= 1000) return { level: 'Significant', color: 'text-blue-400' };
    if (stars >= 500) return { level: 'Notable', color: 'text-yellow-400' };
    return { level: 'Small', color: 'text-gray-400' };
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
              <GitBranch className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Open Source Contributions</h1>
              <p className="text-gray-400">Community projects and collaborative development</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-[#2d2d30] border border-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <GitBranch className="w-5 h-5 text-orange-500" />
                <span className="text-sm text-gray-400">Repositories</span>
              </div>
              <span className="text-2xl font-bold">{totalRepos}</span>
            </div>
            <div className="bg-[#2d2d30] border border-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-sm text-gray-400">Total Stars</span>
              </div>
              <span className="text-2xl font-bold">{totalStars.toLocaleString()}</span>
            </div>
            <div className="bg-[#2d2d30] border border-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Code className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-gray-400">Languages</span>
              </div>
              <span className="text-2xl font-bold">{languages.length}</span>
            </div>
            <div className="bg-[#2d2d30] border border-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <GitFork className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-400">Impact Level</span>
              </div>
              <span className="text-2xl font-bold">High</span>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search repositories by name, description, or contribution..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#3c3c3c] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-4 py-2 bg-[#3c3c3c] border border-gray-600 rounded-md text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="all">All Languages</option>
              {languages.map(language => (
                <option key={language} value={language}>{language}</option>
              ))}
            </select>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors">
              <Plus className="w-4 h-4" />
              Add Contribution
            </button>
          </div>
        </motion.div>

        {/* Contributions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredContributions.map((contrib, index) => {
            const contributionLevel = getContributionLevel(contrib.stars);
            
            return (
              <motion.div
                key={contrib.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#2d2d30] border border-gray-700 rounded-lg p-6 hover:border-blue-500 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <GitBranch className="w-5 h-5 text-orange-500" />
                      <h3 className="font-semibold text-lg text-blue-400">
                        {contrib.repoName}
                      </h3>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-1">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: getLanguageColor(contrib.language) }}
                        />
                        <span className="text-sm text-gray-400">{contrib.language}</span>
                      </div>
                      {contrib.stars && (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm text-gray-400">{contrib.stars.toLocaleString()}</span>
                        </div>
                      )}
                      <span className={`text-xs font-medium px-2 py-1 rounded ${
                        contributionLevel.level === 'Major' ? 'bg-green-500/20 text-green-400' :
                        contributionLevel.level === 'Significant' ? 'bg-blue-500/20 text-blue-400' :
                        contributionLevel.level === 'Notable' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {contributionLevel.level}
                      </span>
                    </div>
                  </div>
                  
                  <a
                    href={contrib.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {contrib.description}
                </p>

                <div className="border-t border-gray-600 pt-4">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">My Contribution:</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {contrib.contribution}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredContributions.length === 0 && (
          <div className="text-center py-12">
            <GitBranch className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No contributions found matching your criteria.</p>
          </div>
        )}

        {/* Language Distribution */}
        {selectedLanguage === 'all' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 bg-[#2d2d30] border border-gray-700 rounded-lg p-6"
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Code className="w-5 h-5 text-blue-500" />
              Language Distribution
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {languages.map(language => {
                const count = contributions.filter(c => c.language === language).length;
                const percentage = ((count / totalRepos) * 100).toFixed(1);
                
                return (
                  <div key={language} className="text-center">
                    <div 
                      className="w-4 h-4 rounded-full mx-auto mb-2"
                      style={{ backgroundColor: getLanguageColor(language) }}
                    />
                    <p className="text-sm font-medium">{language}</p>
                    <p className="text-xs text-gray-400">{count} repos ({percentage}%)</p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
