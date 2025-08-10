'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MapPin, ExternalLink, Calendar, Users, Plus } from 'lucide-react';
import { VolunteerEntry } from '../../src/plugins/types';

// Sample data
const sampleVolunteerWork: VolunteerEntry[] = [
  {
    id: '1',
    organization: 'Local Food Bank',
    role: 'Technology Volunteer',
    impact: [
      'Developed inventory management system reducing food waste by 30%',
      'Trained 15+ staff members on new digital processes',
      'Created automated reporting system for monthly metrics'
    ],
    dateRange: 'Jan 2023 - Present',
    location: 'San Francisco, CA',
    link: 'https://example-foodbank.org'
  },
  {
    id: '2',
    organization: 'Code for Good',
    role: 'Full-Stack Developer',
    impact: [
      'Built responsive web application for nonprofit scheduling',
      'Collaborated with 8 volunteers across 3 time zones',
      'Delivered solution serving 500+ daily users'
    ],
    dateRange: 'Mar 2022 - Dec 2022',
    location: 'Remote',
    link: 'https://code4good.org'
  },
  {
    id: '3',
    organization: 'Youth Coding Bootcamp',
    role: 'Mentor & Instructor',
    impact: [
      'Mentored 25+ students in web development fundamentals',
      'Developed curriculum for React.js workshop series',
      '90% of mentees completed bootcamp successfully'
    ],
    dateRange: 'Jun 2021 - Aug 2022',
    location: 'Oakland, CA',
  },
];

export default function VolunteerWorkPage() {
  const [volunteerWork] = useState<VolunteerEntry[]>(sampleVolunteerWork);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const totalImpact = volunteerWork.reduce((sum, work) => sum + work.impact.length, 0);

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Volunteer Work</h1>
              <p className="text-gray-400">Community contributions and social impact</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-[#2d2d30] border border-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-gray-400">Organizations</span>
              </div>
              <span className="text-2xl font-bold">{volunteerWork.length}</span>
            </div>
            <div className="bg-[#2d2d30] border border-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-5 h-5 text-red-500" />
                <span className="text-sm text-gray-400">Impact Areas</span>
              </div>
              <span className="text-2xl font-bold">{totalImpact}</span>
            </div>
            <div className="bg-[#2d2d30] border border-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-400">Years Active</span>
              </div>
              <span className="text-2xl font-bold">3+</span>
            </div>
          </div>

          <button
            onClick={() => setIsAddingNew(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Volunteer Experience
          </button>
        </motion.div>

        {/* Volunteer Entries */}
        <div className="space-y-6">
          {volunteerWork.map((work, index) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#2d2d30] border border-gray-700 rounded-lg p-6 hover:border-blue-500 transition-colors"
            >
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">{work.organization}</h3>
                  <p className="text-lg font-medium mb-2">{work.role}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{work.dateRange}</span>
                    </div>
                    {work.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{work.location}</span>
                      </div>
                    )}
                    {work.link && (
                      <a
                        href={work.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Visit Organization</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Impact & Achievements</h4>
                <ul className="space-y-2">
                  {work.impact.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add New Modal would go here */}
        {isAddingNew && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#2d2d30] border border-gray-700 rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">Add New Volunteer Experience</h3>
              <p className="text-gray-400 mb-4">
                This is a demo - in a real implementation, you would have a form here to add new volunteer experiences.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsAddingNew(false)}
                  className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setIsAddingNew(false)}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
                >
                  Save (Demo)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
