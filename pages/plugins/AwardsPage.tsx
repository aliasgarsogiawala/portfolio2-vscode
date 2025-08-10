'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Star, Calendar, Plus } from 'lucide-react';
import { Award as AwardType } from '../../src/plugins/types';

const sampleAwards: AwardType[] = [
  {
    id: '1',
    name: 'Best Innovation Award',
    organization: 'TechCorp Annual Conference',
    year: 2023,
    description: 'Recognized for developing an innovative machine learning solution that improved customer satisfaction by 40% and reduced processing time by 60%.',
    category: 'Innovation'
  },
  {
    id: '2',
    name: 'Outstanding Employee of the Year',
    organization: 'Current Company',
    year: 2022,
    description: 'Selected from over 500 employees for exceptional performance, leadership in cross-functional projects, and mentoring of junior developers.',
    category: 'Performance'
  },
  {
    id: '3',
    name: 'Open Source Contributor Recognition',
    organization: 'GitHub',
    year: 2022,
    description: 'Acknowledged for significant contributions to popular open source projects with over 1000 stars and active maintenance of community libraries.',
    category: 'Community'
  },
  {
    id: '4',
    name: 'Dean\'s List Excellence Award',
    organization: 'University of Technology',
    year: 2021,
    description: 'Achieved Dean\'s List recognition for three consecutive semesters with a GPA above 3.8 while pursuing Computer Science degree.',
    category: 'Academic'
  },
  {
    id: '5',
    name: 'Hackathon Winner - Best Technical Solution',
    organization: 'Global Code Challenge 2021',
    year: 2021,
    description: 'First place winner among 200+ teams for developing a real-time disaster response coordination platform using React, Node.js, and machine learning.',
    category: 'Competition'
  }
];

export default function AwardsPage() {
  const [awards] = useState<AwardType[]>(sampleAwards);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = Array.from(new Set(awards.map(award => award.category || 'Other')));
  
  const filteredAwards = selectedCategory === 'all' 
    ? awards 
    : awards.filter(award => award.category === selectedCategory);

  const currentYear = new Date().getFullYear();
  const recentAwards = awards.filter(award => currentYear - award.year <= 2);

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'innovation':
        return '💡';
      case 'performance':
        return '⚡';
      case 'community':
        return '🤝';
      case 'academic':
        return '🎓';
      case 'competition':
        return '🏆';
      default:
        return '⭐';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Innovation': 'bg-blue-500/10 border-blue-500 text-blue-400',
      'Performance': 'bg-green-500/10 border-green-500 text-green-400',
      'Community': 'bg-purple-500/10 border-purple-500 text-purple-400',
      'Academic': 'bg-yellow-500/10 border-yellow-500 text-yellow-400',
      'Competition': 'bg-red-500/10 border-red-500 text-red-400',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500/10 border-gray-500 text-gray-400';
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Awards & Recognition</h1>
              <p className="text-gray-400">Professional achievements and honors</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-[#2d2d30] border border-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span className="text-sm text-gray-400">Total Awards</span>
              </div>
              <span className="text-2xl font-bold">{awards.length}</span>
            </div>
            <div className="bg-[#2d2d30] border border-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-gray-400">Categories</span>
              </div>
              <span className="text-2xl font-bold">{categories.length}</span>
            </div>
            <div className="bg-[#2d2d30] border border-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-400">Recent (2 years)</span>
              </div>
              <span className="text-2xl font-bold">{recentAwards.length}</span>
            </div>
            <div className="bg-[#2d2d30] border border-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-purple-500" />
                <span className="text-sm text-gray-400">This Year</span>
              </div>
              <span className="text-2xl font-bold">{awards.filter(a => a.year === currentYear).length}</span>
            </div>
          </div>

          {/* Filter and Add Button */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 bg-[#3c3c3c] border border-gray-600 rounded-md text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <span className="text-sm text-gray-400">
                {filteredAwards.length} award{filteredAwards.length !== 1 ? 's' : ''}
              </span>
            </div>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
              <Plus className="w-4 h-4" />
              Add Award
            </button>
          </div>
        </motion.div>

        {/* Awards List */}
        <div className="space-y-6">
          {filteredAwards
            .sort((a, b) => b.year - a.year) // Sort by year, most recent first
            .map((award, index) => (
            <motion.div
              key={award.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-[#2d2d30] border-2 rounded-lg p-6 hover:border-blue-500 transition-colors ${getCategoryColor(award.category || 'Other')}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">
                    {getCategoryIcon(award.category || 'Other')}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-blue-400 mb-2">{award.name}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-400 mb-3">
                      <span className="font-medium">{award.organization}</span>
                      <span>•</span>
                      <span>{award.year}</span>
                      {award.category && (
                        <>
                          <span>•</span>
                          <span className="capitalize">{award.category}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Trophy className="w-6 h-6 text-yellow-500" />
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed">{award.description}</p>

              {/* Badge for recent awards */}
              {currentYear - award.year <= 1 && (
                <div className="mt-4">
                  <span className="inline-flex items-center px-2 py-1 bg-green-500/20 border border-green-500 rounded-full text-xs text-green-400">
                    Recent Achievement
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAwards.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No awards found in this category.</p>
          </div>
        )}

        {/* Achievement Timeline Summary */}
        {selectedCategory === 'all' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 bg-[#2d2d30] border border-gray-700 rounded-lg p-6"
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              Achievement Timeline
            </h3>
            <div className="space-y-2">
              {Array.from(new Set(awards.map(a => a.year)))
                .sort((a, b) => b - a)
                .map(year => {
                  const yearAwards = awards.filter(a => a.year === year);
                  return (
                    <div key={year} className="flex items-center gap-3">
                      <span className="text-blue-400 font-medium min-w-[60px]">{year}</span>
                      <div className="flex-1 text-gray-300">
                        {yearAwards.length} award{yearAwards.length !== 1 ? 's' : ''}: {' '}
                        {yearAwards.map(a => a.name).join(', ')}
                      </div>
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
