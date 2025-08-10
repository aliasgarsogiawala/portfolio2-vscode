import {
  VscEye,
  VscRepoForked,
  VscStarEmpty,
  VscGithubAlt,
  VscLinkExternal,
  VscIssues,
  VscCalendar,
  VscTag,
  VscLaw,
} from 'react-icons/vsc';

import { Repo } from '@/types';

import styles from '@/styles/RepoCard.module.css';

interface RepoCardProps {
  repo: Repo;
}

const RepoCard = ({ repo }: RepoCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      JavaScript: '#f1e05a',
      TypeScript: '#3178c6',
      Python: '#3572a5',
      Java: '#b07219',
      'C++': '#f34b7d',
      C: '#555555',
      'C#': '#239120',
      PHP: '#4f5d95',
      Ruby: '#701516',
      Go: '#00add8',
      Rust: '#dea584',
      Swift: '#fa7343',
      Kotlin: '#a97bff',
      Dart: '#00b4ab',
      HTML: '#e34c26',
      CSS: '#1572b6',
      Vue: '#4fc08d',
      React: '#61dafb',
    };
    return colors[language] || '#858585';
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.titleSection}>
          <h3 className={styles.title}>{repo.name}</h3>
          {repo.topics && repo.topics.length > 0 && (
            <div className={styles.topics}>
              {repo.topics.slice(0, 3).map((topic, index) => (
                <span key={index} className={styles.topic}>
                  <VscTag className={styles.topicIcon} />
                  {topic}
                </span>
              ))}
              {repo.topics.length > 3 && (
                <span className={styles.topicCount}>+{repo.topics.length - 3}</span>
              )}
            </div>
          )}
        </div>
        {repo.language && (
          <div className={styles.language}>
            <div 
              className={styles.languageDot}
              style={{ backgroundColor: getLanguageColor(repo.language) }}
            />
            <span>{repo.language}</span>
          </div>
        )}
      </div>
      
      <p className={styles.description}>
        {repo.description || 'No description provided'}
      </p>

      <div className={styles.metadata}>
        <div className={styles.metaItem}>
          <VscCalendar className={styles.metaIcon} />
          <span>Updated {formatDate(repo.updated_at)}</span>
        </div>
        {repo.license && (
          <div className={styles.metaItem}>
            <VscLaw className={styles.metaIcon} />
            <span>{repo.license.name}</span>
          </div>
        )}
      </div>

      <div className={styles.statsRow}>
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <VscStarEmpty className={styles.icon} />
            <span>{repo.stargazers_count}</span>
          </div>
          <div className={styles.statItem}>
            <VscRepoForked className={styles.icon} />
            <span>{repo.forks}</span>
          </div>
          <div className={styles.statItem}>
            <VscEye className={styles.icon} />
            <span>{repo.watchers}</span>
          </div>
          {repo.open_issues_count > 0 && (
            <div className={styles.statItem}>
              <VscIssues className={styles.icon} />
              <span>{repo.open_issues_count}</span>
            </div>
          )}
        </div>
        
        <div className={styles.actions}>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            title="View Repository"
            className={styles.actionButton}
          >
            <VscGithubAlt className={styles.icon} />
          </a>
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              title="Visit Live Site"
              className={styles.actionButton}
            >
              <VscLinkExternal className={styles.icon} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default RepoCard;
