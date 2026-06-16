'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, ExternalLink, Users, Copy, Check } from 'lucide-react';
import { ResearchPaper } from '../../src/plugins/types';
import styles from '@/styles/ResearchPapersPage.module.css';

const papers: ResearchPaper[] = [
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
  const [copied, setCopied] = useState(false);
  const paper = papers[0];

  const copyBibtex = () => {
    if (!paper.bibtex) return;
    navigator.clipboard.writeText(paper.bibtex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.layout}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={styles.header}
      >
        <div className={styles.fileChip}>
          <FileText size={14} />
          <span>research-papers.md</span>
        </div>
        <h1 className={styles.title}>Research Papers</h1>
        <p className={styles.subtitle}>Published academic contributions</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={styles.card}
      >
        <div className={styles.cardHeader}>
          <h2 className={styles.paperTitle}>{paper.title}</h2>
          <div className={styles.venueRow}>
            <span className={styles.venue}>{paper.venue}</span>
            <span className={styles.dot}>•</span>
            <span>{paper.year}</span>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeading}>
            <Users size={14} /> Authors
          </div>
          <p className={styles.authors}>{paper.authors.join(', ')}</p>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeading}>Abstract</div>
          <p className={styles.abstract}>{paper.abstract}</p>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeading}>Topics</div>
          <div className={styles.tags}>
            {paper.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {paper.bibtex && (
          <div className={styles.section}>
            <div className={styles.sectionHeading}>BibTeX</div>
            <div className={styles.bibtexBlock}>
              <pre>{paper.bibtex}</pre>
              <button className={styles.copyBtn} onClick={copyBibtex} title="Copy BibTeX">
                {copied ? <Check size={15} /> : <Copy size={15} />}
              </button>
            </div>
          </div>
        )}

        <div className={styles.actions}>
          {paper.doiLink && (
            <a
              href={paper.doiLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.primaryBtn}
            >
              <ExternalLink size={16} />
              View on Zenodo
            </a>
          )}
          <button onClick={copyBibtex} className={styles.secondaryBtn}>
            {copied ? (
              <>
                <Check size={16} /> Copied!
              </>
            ) : (
              <>
                <Copy size={16} /> Copy BibTeX
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
