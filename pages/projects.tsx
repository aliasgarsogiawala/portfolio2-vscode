import { useState, useEffect } from 'react';
import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/data/projects';

import styles from '@/styles/ProjectsPage.module.css';

const ProjectsPage = () => {
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [activeFilters, setActiveFilters] = useState<string[]>(['All']);
  const [isVisible, setIsVisible] = useState(false);

  const allTechs = Array.from(new Set(projects.flatMap(project => project.techStack)));
  const filters = ['All', ...allTechs];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleFilter = (filter: string) => {
    if (filter === 'All') {
      setActiveFilters(['All']);
      setFilteredProjects(projects);
    } else {
      const newActiveFilters = activeFilters.includes('All') 
        ? [filter] 
        : activeFilters.includes(filter)
          ? activeFilters.filter(f => f !== filter)
          : [...activeFilters, filter];
      
      if (newActiveFilters.length === 0) {
        setActiveFilters(['All']);
        setFilteredProjects(projects);
      } else {
        setActiveFilters(newActiveFilters);
        setFilteredProjects(projects.filter(project => 
          newActiveFilters.some(activeFilter => 
            project.techStack.includes(activeFilter)
          )
        ));
      }
    }
  };

  const projectStats = {
    total: projects.length,
    withLiveDemo: projects.filter(p => p.liveLink).length,
    technologies: allTechs.length
  };

  return (
    <div className={`${styles.layout} ${isVisible ? styles.visible : ''}`}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.pageTitle}>
              <span className={styles.titleLine}>My</span>
              <span className={styles.titleLine}>Projects</span>
            </h1>
            <p className={styles.pageSubtitle}>
              Crafting digital experiences with modern technologies. Each project represents
              a journey of problem-solving, creativity, and continuous learning.
            </p>
          </div>
          
          {/* Stats Section */}
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>{projectStats.total}</div>
              <div className={styles.statLabel}>Projects</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>{projectStats.withLiveDemo}</div>
              <div className={styles.statLabel}>Live Demos</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>{projectStats.technologies}</div>
              <div className={styles.statLabel}>Technologies</div>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className={styles.heroDecoration}>
          <div className={styles.floatingElement} style={{animationDelay: '0s'}}></div>
          <div className={styles.floatingElement} style={{animationDelay: '2s'}}></div>
          <div className={styles.floatingElement} style={{animationDelay: '4s'}}></div>
        </div>
      </div>

      {/* Filter Section */}
      <div className={styles.filterSection}>
        <div className={styles.filterHeader}>
          <h3 className={styles.filterTitle}>Filter by Technology</h3>
          {!activeFilters.includes('All') && activeFilters.length > 0 && (
            <button 
              className={styles.clearAllButton}
              onClick={() => handleFilter('All')}
            >
              Clear All
            </button>
          )}
        </div>
        <div className={styles.filterButtons}>
          {filters.map((filter) => (
            <button
              key={filter}
              className={`${styles.filterButton} ${
                activeFilters.includes(filter) ? styles.active : ''
              }`}
              onClick={() => handleFilter(filter)}
            >
              {filter}
              {activeFilters.includes(filter) && filter !== 'All' && (
                <span className={styles.removeFilter}>×</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className={styles.projectsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            {activeFilters.includes('All') 
              ? 'All Projects' 
              : activeFilters.length === 1 
                ? `Projects using ${activeFilters[0]}`
                : `Projects using ${activeFilters.join(', ')}`
            }
          </h2>
          <div className={styles.projectCount}>
            {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
          </div>
        </div>
        
        <div className={styles.container}>
          {filteredProjects.map((project, index) => (
            <div 
              key={project.slug} 
              className={styles.projectWrapper}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {/* View All Work Button */}
        <div className={styles.viewAllSection}>
          <a
            href="https://github.com/aliasgarsogiawala"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.viewAllButton}
          >
            <span className={styles.buttonIcon}>🚀</span>
            View All Work on GitHub
            <span className={styles.buttonArrow}>→</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: { title: 'Projects' },
  };
}

export default ProjectsPage;
