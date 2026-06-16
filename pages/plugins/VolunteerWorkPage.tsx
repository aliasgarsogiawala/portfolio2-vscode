'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, MapPin, Calendar, ExternalLink, Users, Leaf, ImagePlus } from 'lucide-react';
import { VolunteerEntry } from '../../src/plugins/types';
import styles from '@/styles/VolunteerWorkPage.module.css';

const volunteerWork: VolunteerEntry[] = [
  {
    id: '1',
    organization: 'Change Is Us',
    role: 'Student Volunteer',
    category: 'Environment',
    dateRange: 'Feb 2025 - Apr 2025 · 3 mos',
    impact: ['Participated in Beach Cleanup Drive at Marine Lines, Mumbai, India.'],
    certificates: [
      { src: '/ciu1.png', alt: 'Certificate of Participation 1' },
      { src: '/ciu2.png', alt: 'Certificate of Participation 2' },
    ],
  },
];

export default function VolunteerWorkPage() {
  const totalImpact = volunteerWork.reduce((sum, work) => sum + work.impact.length, 0);
  const totalCertificates = volunteerWork.reduce(
    (sum, work) => sum + (work.certificates?.length ?? 0),
    0
  );

  return (
    <div className={styles.layout}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={styles.header}
      >
        <div className={styles.headerTop}>
          <div className={styles.iconBadge}>
            <Heart size={22} />
          </div>
          <div>
            <h1 className={styles.title}>Volunteer Work</h1>
            <p className={styles.subtitle}>Community contributions and social impact</p>
          </div>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <Users size={14} />
              <span>Organizations</span>
            </div>
            <span className={styles.statValue}>{volunteerWork.length}</span>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <Heart size={14} />
              <span>Impact Areas</span>
            </div>
            <span className={styles.statValue}>{totalImpact}</span>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <ImagePlus size={14} />
              <span>Certificates</span>
            </div>
            <span className={styles.statValue}>{totalCertificates}</span>
          </div>
        </div>
      </motion.div>

      <div className={styles.entries}>
        {volunteerWork.map((work, index) => (
          <motion.div
            key={work.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={styles.card}
          >
            <div className={styles.cardHeader}>
              <div>
                <h3 className={styles.org}>{work.organization}</h3>
                <p className={styles.role}>{work.role}</p>
              </div>
              {work.category && (
                <span className={styles.categoryTag}>
                  <Leaf size={12} />
                  {work.category}
                </span>
              )}
            </div>

            <div className={styles.meta}>
              <span className={styles.metaItem}>
                <Calendar size={14} />
                {work.dateRange}
              </span>
              {work.location && (
                <span className={styles.metaItem}>
                  <MapPin size={14} />
                  {work.location}
                </span>
              )}
              {work.link && (
                <a
                  href={work.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.metaLink}
                >
                  <ExternalLink size={14} />
                  Visit Organization
                </a>
              )}
            </div>

            <ul className={styles.impactList}>
              {work.impact.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            {work.certificates && work.certificates.length > 0 && (
              <div className={styles.certificates}>
                {work.certificates.map((cert, i) => (
                  <div key={i} className={styles.certSlot}>
                    {cert.src ? (
                      <Image
                        src={cert.src}
                        alt={cert.alt}
                        fill
                        className={styles.certImage}
                      />
                    ) : (
                      <div className={styles.certPlaceholder}>
                        <ImagePlus size={20} />
                        <span>{cert.alt}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
