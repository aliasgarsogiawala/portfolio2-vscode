import Image from 'next/image';
import Link from 'next/link';

import { Project } from '@/types';

import styles from '@/styles/ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className={styles.card}>
      {/* Project Image */}
      <div className={styles.imageContainer}>
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          width={600}
          height={400}
          className={styles.projectImage}
        />
        <div className={styles.imageOverlay}>
          <div className={styles.links}>
            {project.githubLink && (
              <Link 
                href={project.githubLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.linkButton}
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </Link>
            )}
            {project.liveLink && (
              <Link 
                href={project.liveLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.linkButton}
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                </svg>
                Live Demo
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Project Content */}
      <div className={styles.content}>
        <div className={styles.header}>
          
          <h3 className={styles.title}>{project.title}</h3>
        </div>
        
        <p className={styles.description}>{project.description}</p>
        
        {/* Tech Stack */}
        <div className={styles.techStack}>
          {project.techStack.map((tech, index) => (
            <span key={index} className={styles.techBadge}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
