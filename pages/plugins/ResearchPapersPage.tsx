'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, ExternalLink, Users, Copy, Check } from 'lucide-react';
import { ResearchPaper } from '../../src/plugins/types';

const samplePapers: ResearchPaper[] = [
  {
    id: '4',
    title: 'Reinforcement Learning in Predictive Analytics for Human Behaviour',
    venue: 'International Journal of Advance and Innovative Research',
    year: 2025,
    abstract: 'The development of the internet has led to the digitization of data, opening up opportunities in big data. This paper explores reinforcement learning algorithms and their connection to human operant learning, demonstrating why RL-based predictive analytics is better than traditional approaches. We propose the use of RL models in predictive analytics to predict human behaviour through informatics and analytics approaches, aiming to gain deeper insights into human behaviour to enhance decision-making and strategic insights.',
    doiLink: 'https://doi.org/10.5281/zenodo.15681675',
    tags: ['Reinforcement Learning', 'Predictive Analytics', 'Big Data', 'Human Behaviour', 'Machine Learning'],
    authors: ['Aliasgar Sogiawala', 'Rohana Deshpande'],
    bibtex: '@article{sogiawala2025reinforcement,\n  title={Reinforcement Learning in Predictive Analytics for Human Behaviour},\n  author={Sogiawala, Aliasgar and Deshpande, Rohana},\n  journal={International Journal of Advance and Innovative Research},\n  volume={12},\n  issue={2},\n  year={2025}\n}'
  }
];

export default function ResearchPapersPage() {
  const [papers] = useState<ResearchPaper[]>(samplePapers);
  const [selectedPaper] = useState<ResearchPaper | null>(papers[0]);
  const [copiedBibtex, setCopiedBibtex] = useState(false);

  const copyBibtex = (bibtex: string) => {
    navigator.clipboard.writeText(bibtex);
    setCopiedBibtex(true);
    setTimeout(() => setCopiedBibtex(false), 2000);
  };

  const paper = selectedPaper;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] text-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <FileText className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">Research Papers</h1>
              <p className="text-gray-400 mt-1">Published academic contributions</p>
            </div>
          </div>
        </motion.div>

        {/* Paper Card */}
        {paper && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-[#2d2d3d] to-[#1f1f2e] border border-blue-500/30 rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-shadow duration-300"
          >
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-b border-blue-500/20 px-8 py-6">
              <h2 className="text-2xl md:text-3xl font-bold text-blue-300 mb-3 leading-tight">
                {paper.title}
              </h2>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-sm text-gray-400">
                <span className="font-medium text-white">{paper.venue}</span>
                <span className="hidden md:inline">•</span>
                <span>{paper.year}</span>
              </div>
            </div>

            {/* Content Section */}
            <div className="px-8 py-8 space-y-6">
              {/* Authors */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-5 h-5 text-blue-400" />
                  <h3 className="font-semibold text-gray-200">Authors</h3>
                </div>
                <p className="text-gray-300 ml-7">{paper.authors.join(', ')}</p>
              </div>

              {/* Abstract */}
              <div>
                <h3 className="font-semibold text-gray-200 mb-3">Abstract</h3>
                <p className="text-gray-300 leading-relaxed text-justify">
                  {paper.abstract}
                </p>
              </div>

              {/* Tags */}
              <div>
                <h3 className="font-semibold text-gray-200 mb-3">Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {paper.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium border border-blue-500/40 hover:bg-blue-500/30 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* BibTeX */}
              {paper.bibtex && (
                <div>
                  <h3 className="font-semibold text-gray-200 mb-3">BibTeX</h3>
                  <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg p-4 relative">
                    <pre className="text-xs text-gray-300 overflow-x-auto font-mono whitespace-pre-wrap break-words">
                      {paper.bibtex}
                    </pre>
                    <button
                      onClick={() => copyBibtex(paper.bibtex!)}
                      className="absolute top-3 right-3 p-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                      title="Copy BibTeX"
                    >
                      {copiedBibtex ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-300" />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="bg-gradient-to-r from-blue-600/5 to-purple-600/5 border-t border-blue-500/20 px-8 py-6 flex flex-col sm:flex-row gap-3">
              {paper.doiLink && (
                <a
                  href={paper.doiLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40"
                >
                  <ExternalLink className="w-5 h-5" />
                  View on Zenodo
                </a>
              )}
              <button
                onClick={() => copyBibtex(paper.bibtex!)}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-200"
              >
                {copiedBibtex ? (
                  <>
                    <Check className="w-5 h-5 text-green-400" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copy BibTeX
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
