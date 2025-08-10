'use client';

import { useState } from 'react';
import { Search, Star, Download, Package, Grid3X3, List } from 'lucide-react';
import { motion } from 'framer-motion';
import { Plugin } from '../types';
import { ALL_PLUGINS } from '../registry';
import { usePluginStore } from '../store';

interface PluginMarketplaceProps {
  onPluginSelect?: (plugin: Plugin) => void;
}

export default function PluginMarketplace({ onPluginSelect }: PluginMarketplaceProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'downloads' | 'rating' | 'date'>('downloads');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { install, uninstall, isInstalled } = usePluginStore();

  // Filter and sort plugins
  const filteredPlugins = ALL_PLUGINS
    .filter(plugin => {
      const matchesSearch = plugin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          plugin.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          plugin.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || plugin.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'downloads':
          return b.downloads - a.downloads;
        case 'rating':
          return b.rating - a.rating;
        case 'date':
          return new Date(b.installDate || 0).getTime() - new Date(a.installDate || 0).getTime();
        default:
          return 0;
      }
    });

  const categories = ['all', ...Array.from(new Set(ALL_PLUGINS.map(p => p.category)))];

  const handlePluginAction = (plugin: Plugin) => {
    if (isInstalled(plugin.id)) {
      uninstall(plugin.id);
    } else {
      install(plugin.id);
    }
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-gray-100">
      {/* Header */}
      <div className="border-b border-gray-700 bg-[#2d2d30] p-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-semibold mb-4">Plugin Marketplace</h1>
          
          {/* Search and filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search plugins..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#3c3c3c] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-[#3c3c3c] border border-gray-600 rounded-md text-white focus:border-blue-500 focus:outline-none"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'downloads' | 'rating' | 'date')}
              className="px-4 py-2 bg-[#3c3c3c] border border-gray-600 rounded-md text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="downloads">Most Downloaded</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Name (A-Z)</option>
              <option value="date">Recently Added</option>
            </select>

            {/* View Mode */}
            <div className="flex border border-gray-600 rounded-md overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600' : 'bg-[#3c3c3c] hover:bg-gray-600'}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-blue-600' : 'bg-[#3c3c3c] hover:bg-gray-600'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-6xl mx-auto p-4">
        <div className="mb-4">
          <p className="text-gray-400">
            {filteredPlugins.length} plugin{filteredPlugins.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Plugin Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlugins.map((plugin, index) => (
              <motion.div
                key={plugin.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#2d2d30] border border-gray-700 rounded-lg overflow-hidden hover:border-blue-500 transition-colors"
              >
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Package className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{plugin.name}</h3>
                        <p className="text-sm text-gray-400">by {plugin.author}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">v{plugin.version}</span>
                  </div>

                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">{plugin.description}</p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {plugin.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-[#3c3c3c] text-xs text-gray-300 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      <span>{plugin.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      <span>{plugin.downloads.toLocaleString()}</span>
                    </div>
                    <span>{plugin.size}</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handlePluginAction(plugin)}
                      className={`flex-1 py-2 px-4 rounded text-sm font-medium transition-colors ${
                        isInstalled(plugin.id)
                          ? 'bg-red-600 hover:bg-red-700 text-white'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      {isInstalled(plugin.id) ? 'Uninstall' : 'Install'}
                    </button>
                    <button
                      onClick={() => onPluginSelect?.(plugin)}
                      className="px-4 py-2 border border-gray-600 rounded text-sm hover:bg-gray-700 transition-colors"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPlugins.map((plugin, index) => (
              <motion.div
                key={plugin.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-[#2d2d30] border border-gray-700 rounded-lg p-4 hover:border-blue-500 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-lg">{plugin.name}</h3>
                        <span className="text-xs text-gray-500">v{plugin.version}</span>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">by {plugin.author}</p>
                      <p className="text-gray-300 text-sm mb-2">{plugin.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                          <span>{plugin.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Download className="w-4 h-4" />
                          <span>{plugin.downloads.toLocaleString()}</span>
                        </div>
                        <span>{plugin.size}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handlePluginAction(plugin)}
                      className={`py-2 px-4 rounded text-sm font-medium transition-colors ${
                        isInstalled(plugin.id)
                          ? 'bg-red-600 hover:bg-red-700 text-white'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      {isInstalled(plugin.id) ? 'Uninstall' : 'Install'}
                    </button>
                    <button
                      onClick={() => onPluginSelect?.(plugin)}
                      className="px-4 py-2 border border-gray-600 rounded text-sm hover:bg-gray-700 transition-colors"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
