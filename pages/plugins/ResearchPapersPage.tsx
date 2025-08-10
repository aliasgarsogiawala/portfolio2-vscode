'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, ExternalLink, Users, Calendar, Download, Search, Plus, BookOpen, Award } from 'lucide-react';
import { ResearchPaper } from '../../src/plugins/types';

const samplePapers: ResearchPaper[] = [
  {
    id: '1',
    title: 'Advanced Machine Learning Approaches for Real-Time Data Processing',
    venue: 'International Conference on Machine Learning (ICML)',
    year: 2023,
    abstract: 'This paper presents novel machine learning algorithms optimized for real-time data processing scenarios. We introduce a new framework that reduces processing latency by 40% while maintaining accuracy comparable to traditional batch processing methods.',
    pdfLink: '#demo-pdf',
    doiLink: 'https://doi.org/10.1000/demo-paper-1',
    tags: ['Machine Learning', 'Real-time Processing', 'Algorithms'],
    authors: ['John Doe', 'Jane Smith', 'Dr. Alice Johnson'],
    bibtex: '@inproceedings{doe2023advanced,\n  title={Advanced Machine Learning Approaches for Real-Time Data Processing},\n  author={Doe, John and Smith, Jane and Johnson, Alice},\n  booktitle={Proceedings of ICML},\n  year={2023}\n}'
  },
  {
    id: '2',
    title: 'Scalable Web Applications: Architecture Patterns for Modern Development',
    venue: 'Journal of Software Engineering',
    year: 2022,
    abstract: 'An in-depth analysis of scalable web application architectures, comparing microservices, serverless, and monolithic patterns. This study evaluates performance, maintainability, and cost-effectiveness across different deployment scenarios.',
    pdfLink: '#demo-pdf-2',
    tags: ['Software Architecture', 'Web Development', 'Scalability', 'Microservices'],
    authors: ['John Doe', 'Dr. Bob Wilson'],
    bibtex: '@article{doe2022scalable,\n  title={Scalable Web Applications: Architecture Patterns for Modern Development},\n  author={Doe, John and Wilson, Bob},\n  journal={Journal of Software Engineering},\n  year={2022}\n}'
  },
  {
    id: '3',
    title: 'Cybersecurity in Cloud-Native Applications: A Comprehensive Review',
    venue: 'IEEE Transactions on Information Security',
    year: 2023,
    abstract: 'This comprehensive review examines security challenges and solutions specific to cloud-native applications. We analyze container security, service mesh patterns, and zero-trust architectures in modern deployment environments.',
    doiLink: 'https://doi.org/10.1109/demo-security-2023',
    tags: ['Cybersecurity', 'Cloud Computing', 'Containers', 'Zero Trust'],
    authors: ['John Doe', 'Dr. Sarah Chen', 'Mike Rodriguez'],
    bibtex: '@article{doe2023cybersecurity,\n  title={Cybersecurity in Cloud-Native Applications: A Comprehensive Review},\n  author={Doe, John and Chen, Sarah and Rodriguez, Mike},\n  journal={IEEE Transactions on Information Security},\n  year={2023}\n}'
  }
];

export default function ResearchPapersPage() {
  const [papers] = useState<ResearchPaper[]>(samplePapers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedPaper, setSelectedPaper] = useState<ResearchPaper | null>(null);

  const filteredPapers = papers.filter(paper => {
    const matchesSearch = 
      paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      paper.authors.some(author => author.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesYear = selectedYear === 'all' || paper.year.toString() === selectedYear;
    
    return matchesSearch && matchesYear;
  });

  const years = Array.from(new Set(papers.map(p => p.year.toString()))).sort().reverse();
  const totalCitations = papers.length * 15; // Demo calculation

  const copyBibtex = (bibtex: string) => {
    navigator.clipboard.writeText(bibtex);
    // In a real app, you'd show a toast notification
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
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Research Papers</h1>
              <p className="text-gray-400">Published academic work and research contributions</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-[#2d2d30] border border-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-gray-400">Publications</span>
              </div>
              <span className="text-2xl font-bold">{papers.length}</span>
            </div>
            <div className="bg-[#2d2d30] border border-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-yellow-500" />
                <span className="text-sm text-gray-400">Citations</span>
              </div>
              <span className="text-2xl font-bold">{totalCitations}</span>
            </div>
            <div className="bg-[#2d2d30] border border-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-400">Co-authors</span>
              </div>
              <span className="text-2xl font-bold">8</span>
            </div>
            <div className="bg-[#2d2d30] border border-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-purple-500" />
                <span className="text-sm text-gray-400">Years Active</span>
              </div>
              <span className="text-2xl font-bold">2</span>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search papers by title, content, tags, or authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#3c3c3c] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-4 py-2 bg-[#3c3c3c] border border-gray-600 rounded-md text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="all">All Years</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors">
              <Plus className="w-4 h-4" />
              Add Paper
            </button>
          </div>
        </motion.div>

        {/* Papers List */}
        <div className="space-y-6">
          {filteredPapers.map((paper, index) => (
            <motion.div
              key={paper.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#2d2d30] border border-gray-700 rounded-lg p-6 hover:border-blue-500 transition-colors"
            >
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-blue-400 mb-2 hover:text-blue-300 cursor-pointer"
                      onClick={() => setSelectedPaper(paper)}>
                    {paper.title}
                  </h3>
                  <p className="text-gray-300 font-medium mb-2">{paper.venue} • {paper.year}</p>
                  <p className="text-sm text-gray-400 mb-3">
                    Authors: {paper.authors.join(', ')}
                  </p>
                </div>
                <div className="flex gap-2">
                  {paper.pdfLink && (
                    <a
                      href={paper.pdfLink}
                      className="flex items-center gap-1 px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      PDF
                    </a>
                  )}
                  {paper.doiLink && (
                    <a
                      href={paper.doiLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      DOI
                    </a>
                  )}
                  {paper.bibtex && (
                    <button
                      onClick={() => copyBibtex(paper.bibtex!)}
                      className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm transition-colors"
                    >
                      BibTeX
                    </button>
                  )}
                </div>
              </div>

              <p className="text-gray-300 mb-4 leading-relaxed">{paper.abstract}</p>

              <div className="flex flex-wrap gap-2">
                {paper.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-[#3c3c3c] text-xs text-blue-300 rounded border border-blue-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Paper Detail Modal */}
        {selectedPaper && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#2d2d30] border border-gray-700 rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-blue-400">{selectedPaper.title}</h2>
                  <button
                    onClick={() => setSelectedPaper(null)}
                    className="text-gray-400 hover:text-white transition-colors text-xl"
                  >
                    ×
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-lg font-medium">{selectedPaper.venue} • {selectedPaper.year}</p>
                    <p className="text-gray-400">Authors: {selectedPaper.authors.join(', ')}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Abstract</h3>
                    <p className="text-gray-300 leading-relaxed">{selectedPaper.abstract}</p>
                  </div>

                  {selectedPaper.bibtex && (
                    <div>
                      <h3 className="font-semibold mb-2">BibTeX</h3>
                      <pre className="bg-[#1e1e1e] p-4 rounded text-sm text-gray-300 overflow-x-auto">
                        {selectedPaper.bibtex}
                      </pre>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {selectedPaper.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-[#3c3c3c] text-xs text-blue-300 rounded border border-blue-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {filteredPapers.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No papers found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
