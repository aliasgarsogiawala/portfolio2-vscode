import Image from 'next/image';
import { useState } from 'react';
import GitHubCalendar from 'react-github-calendar';
import { 
  VscRepo, 
  VscPerson, 
  VscRepoForked, 
  VscStarEmpty, 
  VscSearch,
  VscCalendar,
  VscLink,
  VscLocation,
  VscOrganization,
  VscMail,
  VscLinkExternal
} from 'react-icons/vsc';

import RepoCard from '@/components/RepoCard';
import { Repo, User } from '@/types';

import styles from '@/styles/GithubPage.module.css';

interface GithubPageProps {
  repos: Repo[];
  user: User & {
    total_stars?: number;
    total_forks?: number;
    total_watchers?: number;
  };
  totalRepoCount: number;
}

const GithubPage = ({ repos, user, totalRepoCount }: GithubPageProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [sortBy, setSortBy] = useState('updated');

  // Get unique languages from repos
  const languages = ['all', ...new Set(repos.map(repo => repo.language).filter(Boolean))];

  // Filter and sort repositories
  const filteredRepos = repos
    .filter(repo => {
      const matchesSearch = repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (repo.description || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLanguage = selectedLanguage === 'all' || repo.language === selectedLanguage;
      return matchesSearch && matchesLanguage;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'stars':
          return b.stargazers_count - a.stargazers_count;
        case 'forks':
          return b.forks - a.forks;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0; // Keep original order for 'updated'
      }
    });

  // Use calculated total stats from all repos, not just the displayed ones
  const totalStars = user.total_stars || 0;
  const totalForks = user.total_forks || 0;

  return (
    <div className={styles.layout}>
      <div className={styles.pageHeading}>
        <h1 className={styles.pageTitle}>GitHub Dashboard</h1>
        <p className={styles.pageSubtitle}>
          Explore my coding journey through repositories, contributions, and development statistics.
          Discover the projects I&apos;ve been working on and the technologies I use.
        </p>
      </div>

      <div className={styles.githubPage}>
        {/* Enhanced Profile Section */}
        <div className={styles.profileSection}>
          <div className={styles.profileCard}>
            <div className={styles.profileHeader}>
              <Image
                src={user.avatar_url}
                className={styles.avatar}
                alt={user.login}
                width={120}
                height={120}
                priority
              />
              <div className={styles.profileInfo}>
                <h2 className={styles.username}>{user.login}</h2>
                <div className={styles.userDetails}>
                  {user.name && <p className={styles.name}>{user.name}</p>}
                  {user.bio && <p className={styles.bio}>{user.bio}</p>}
                  <div className={styles.metaInfo}>
                    {user.location && (
                      <div className={styles.metaItem}>
                        <VscLocation />
                        <span>{user.location}</span>
                      </div>
                    )}
                    {user.company && (
                      <div className={styles.metaItem}>
                        <VscOrganization />
                        <span>{user.company}</span>
                      </div>
                    )}
                    {user.email && (
                      <div className={styles.metaItem}>
                        <VscMail />
                        <span>{user.email}</span>
                      </div>
                    )}
                    {user.blog && (
                      <div className={styles.metaItem}>
                        <VscLink />
                        <a href={user.blog} target="_blank" rel="noopener noreferrer">
                          Website
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* GitHub Stats */}
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <VscRepo className={styles.statIcon} />
                <div className={styles.statContent}>
                  <span className={styles.statNumber}>{user.public_repos}</span>
                  <span className={styles.statLabel}>Public Repositories</span>
                </div>
              </div>
              <div className={styles.statCard}>
                <VscPerson className={styles.statIcon} />
                <div className={styles.statContent}>
                  <span className={styles.statNumber}>{user.followers}</span>
                  <span className={styles.statLabel}>Followers</span>
                </div>
              </div>
              <div className={styles.statCard}>
                <VscStarEmpty className={styles.statIcon} />
                <div className={styles.statContent}>
                  <span className={styles.statNumber}>{totalStars}</span>
                  <span className={styles.statLabel}>Total Stars Earned</span>
                </div>
              </div>
              <div className={styles.statCard}>
                <VscRepoForked className={styles.statIcon} />
                <div className={styles.statContent}>
                  <span className={styles.statNumber}>{totalForks}</span>
                  <span className={styles.statLabel}>Total Forks Received</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contribution Calendar */}
        <div className={styles.contributionsSection}>
          <h3 className={styles.sectionTitle}>
            <VscCalendar className={styles.sectionIcon} />
            Contribution Activity
          </h3>
          <div className={styles.contributionsCard}>
            <GitHubCalendar
              username={process.env.NEXT_PUBLIC_GITHUB_USERNAME!}
              hideColorLegend={false}
              hideMonthLabels={false}
              colorScheme="dark"
              theme={{
                dark: ['#161B22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                light: ['#161B22', '#0e4429', '#006d32', '#26a641', '#39d353'],
              }}
              style={{
                width: '100%',
              }}
            />
          </div>
        </div>

        {/* Repository Filters */}
        <div className={styles.repositoriesSection}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>
              <VscRepo className={styles.sectionIcon} />
              Recent Repositories ({filteredRepos.length} of {totalRepoCount})
            </h3>
            
            <div className={styles.filters}>
              <div className={styles.searchBox}>
                <VscSearch className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search repositories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.searchInput}
                />
              </div>
              
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className={styles.filterSelect}
              >
                {languages.map(lang => (
                  <option key={lang} value={lang}>
                    {lang === 'all' ? 'All Languages' : lang}
                  </option>
                ))}
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="updated">Recently Updated</option>
                <option value="stars">Most Stars</option>
                <option value="forks">Most Forks</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>

          {/* Repository Grid */}
          <div className={styles.reposContainer}>
            {filteredRepos.length > 0 ? (
              filteredRepos.map((repo) => (
                <RepoCard key={repo.id} repo={repo} />
              ))
            ) : (
              <div className={styles.emptyState}>
                <VscSearch className={styles.emptyIcon} />
                <p>No repositories found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedLanguage('all');
                  }}
                  className={styles.resetButton}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          {/* View All Repositories Button */}
          <div className={styles.viewAllSection}>
            <a
              href={`https://github.com/${user.login}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.viewAllButton}
            >
              <VscRepo className={styles.viewAllIcon} />
              View All {totalRepoCount} Repositories on GitHub
              <VscLinkExternal className={styles.externalIcon} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const headers: Record<string, string> = {
    'User-Agent': 'Portfolio-App',
  };

  if (process.env.GITHUB_API_KEY) {
    headers.Authorization = `Bearer ${process.env.GITHUB_API_KEY}`;
  }

  try {
    const userRes = await fetch(
      `https://api.github.com/users/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}`,
      { headers }
    );
    
    if (!userRes.ok) {
      throw new Error(`Failed to fetch user: ${userRes.status}`);
    }
    
    const user = await userRes.json();

    // Fetch more repositories to get accurate stats (fetch all public repos)
    const allReposRes = await fetch(
      `https://api.github.com/users/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}/repos?per_page=100&sort=pushed`,
      { headers }
    );
    
    if (!allReposRes.ok) {
      throw new Error(`Failed to fetch all repos: ${allReposRes.status}`);
    }
    
    const allRepos = await allReposRes.json();

    // Get the top 6 repositories for display (most recently updated)
    const topRepos = allRepos.slice(0, 6);

    // Calculate total stats from all repositories
    const totalStats = allRepos.reduce((stats: { totalStars: number; totalForks: number; totalWatchers: number }, repo: { stargazers_count?: number; forks?: number; watchers_count?: number }) => {
      stats.totalStars += repo.stargazers_count || 0;
      stats.totalForks += repo.forks || 0;
      stats.totalWatchers += repo.watchers_count || 0;
      return stats;
    }, { totalStars: 0, totalForks: 0, totalWatchers: 0 });

    // Add calculated stats to user object
    const enhancedUser = {
      ...user,
      total_stars: totalStats.totalStars,
      total_forks: totalStats.totalForks,
      total_watchers: totalStats.totalWatchers,
    };

    return {
      props: { 
        title: 'GitHub', 
        repos: topRepos, 
        user: enhancedUser,
        totalRepoCount: allRepos.length 
      },
      revalidate: 600,
    };
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    
    // Return fallback data
    return {
      props: {
        title: 'GitHub',
        repos: [],
        user: {
          login: process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'aliasgarsogiawala',
          avatar_url: 'https://avatars.githubusercontent.com/u/default',
          public_repos: 0,
          followers: 0,
          total_stars: 0,
          total_forks: 0,
          total_watchers: 0,
        },
        totalRepoCount: 0,
      },
      revalidate: 600,
    };
  }
}

export default GithubPage;
