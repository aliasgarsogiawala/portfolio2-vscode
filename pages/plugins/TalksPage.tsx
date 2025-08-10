'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, ExternalLink, Calendar, Users, Play, Plus, MapPin } from 'lucide-react';
import { Talk } from '../../src/plugins/types';

const sampleTalks: Talk[] = [
  {
    id: '1',
    title: 'Building Scalable React Applications with Modern Patterns',
    event: 'React Conference 2023',
    date: '2023-09-15',
    slidesLink: '#demo-slides-1',
    youtubeLink: '#demo-video-1',
    description: 'A deep dive into modern React patterns including hooks, context, and state management solutions. Covered best practices for building maintainable and scalable applications.'
  },
  {
    id: '2',
    title: 'The Future of Web Development: Full-Stack TypeScript',
    event: 'DevCon San Francisco',
    date: '2023-06-22',
    slidesLink: '#demo-slides-2',
    description: 'Explored the benefits of end-to-end TypeScript development, from frontend React applications to backend Node.js services and database integrations.'
  },
  {
    id: '3',
    title: 'Microservices Architecture: Lessons from Production',
    event: 'Cloud Native Summit',
    date: '2023-03-10',
    slidesLink: '#demo-slides-3',
    youtubeLink: '#demo-video-3',
    description: 'Shared real-world experiences implementing microservices architecture, including common pitfalls, monitoring strategies, and deployment patterns.'
  },
  {
    id: '4',
    title: 'Open Source Contribution Workshop',
    event: 'Local Developer Meetup',
    date: '2022-11-18',
    description: 'Interactive workshop teaching developers how to contribute to open source projects, from finding issues to submitting PRs and engaging with maintainers.'
  }
];

export default function TalksPage() {
  const [talks] = useState<Talk[]>(sampleTalks);
  const [selectedTalk, setSelectedTalk] = useState<Talk | null>(null);

  const upcomingTalks = talks.filter(talk => new Date(talk.date) > new Date());
  const pastTalks = talks.filter(talk => new Date(talk.date) <= new Date());

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTotalAudience = () => {
    // Demo calculation based on talk count
    return talks.length * 150;
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
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
              <Mic className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Talks & Presentations</h1>
              <p className="text-gray-400">Speaking engagements and public presentations</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-[#2d2d30] border border-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Mic className="w-5 h-5 text-purple-500" />
                <span className="text-sm text-gray-400">Total Talks</span>
              </div>
              <span className="text-2xl font-bold">{talks.length}</span>
            </div>
            <div className="bg-[#2d2d30] border border-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-gray-400">Total Audience</span>
              </div>
              <span className="text-2xl font-bold">{getTotalAudience().toLocaleString()}</span>
            </div>
            <div className="bg-[#2d2d30] border border-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Play className="w-5 h-5 text-red-500" />
                <span className="text-sm text-gray-400">Recorded</span>
              </div>
              <span className="text-2xl font-bold">{talks.filter(t => t.youtubeLink).length}</span>
            </div>
            <div className="bg-[#2d2d30] border border-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-400">This Year</span>
              </div>
              <span className="text-2xl font-bold">{talks.filter(t => new Date(t.date).getFullYear() === 2023).length}</span>
            </div>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
            <Plus className="w-4 h-4" />
            Add Talk
          </button>
        </motion.div>

        {/* Upcoming Talks */}
        {upcomingTalks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h2 className="text-xl font-semibold mb-4 text-green-400">Upcoming Talks</h2>
            <div className="space-y-4">
              {upcomingTalks.map((talk, index) => (
                <motion.div
                  key={talk.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-green-500/10 border border-green-500 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{talk.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{talk.event}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(talk.date)}</span>
                        </div>
                      </div>
                      {talk.description && (
                        <p className="text-gray-300">{talk.description}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Past Talks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-xl font-semibold mb-4">Past Talks</h2>
          <div className="space-y-6">
            {pastTalks.map((talk, index) => (
              <motion.div
                key={talk.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#2d2d30] border border-gray-700 rounded-lg p-6 hover:border-blue-500 transition-colors"
              >
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-blue-400 mb-2">{talk.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{talk.event}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(talk.date)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-2 lg:mt-0">
                    {talk.slidesLink && (
                      <a
                        href={talk.slidesLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Slides
                      </a>
                    )}
                    {talk.youtubeLink && (
                      <a
                        href={talk.youtubeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm transition-colors"
                      >
                        <Play className="w-4 h-4" />
                        Video
                      </a>
                    )}
                    <button
                      onClick={() => setSelectedTalk(talk)}
                      className="px-3 py-1 border border-gray-600 hover:bg-gray-700 rounded text-sm transition-colors"
                    >
                      Details
                    </button>
                  </div>
                </div>

                {talk.description && (
                  <p className="text-gray-300 leading-relaxed">{talk.description}</p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Talk Detail Modal */}
        {selectedTalk && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#2d2d30] border border-gray-700 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-blue-400">{selectedTalk.title}</h2>
                  <button
                    onClick={() => setSelectedTalk(null)}
                    className="text-gray-400 hover:text-white transition-colors text-xl"
                  >
                    ×
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-gray-400">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedTalk.event}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(selectedTalk.date)}</span>
                    </div>
                  </div>

                  {selectedTalk.description && (
                    <div>
                      <h3 className="font-semibold mb-2">Description</h3>
                      <p className="text-gray-300 leading-relaxed">{selectedTalk.description}</p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    {selectedTalk.slidesLink && (
                      <a
                        href={selectedTalk.slidesLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Slides
                      </a>
                    )}
                    {selectedTalk.youtubeLink && (
                      <a
                        href={selectedTalk.youtubeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition-colors"
                      >
                        <Play className="w-4 h-4" />
                        Watch Video
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
