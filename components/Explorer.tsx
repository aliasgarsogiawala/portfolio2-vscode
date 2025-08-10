import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { VscChevronRight, VscExtensions } from 'react-icons/vsc';
import { usePluginStore } from '@/src/plugins/store';
import { ALL_PLUGINS } from '@/src/plugins/registry';
import { pluginIdToSlug } from '@/src/plugins/utils';

import styles from '@/styles/Explorer.module.css';

const explorerItems = [
  {
    name: 'home.tsx',
    path: '/',
    icon: '/logos/react_icon.svg',
  },
  {
    name: 'about.html',
    path: '/about',
    icon: '/logos/html_icon.svg',
  },
  {
    name: 'contact.css',
    path: '/contact',
    icon: '/logos/css_icon.svg',
  },
  {
    name: 'projects.js',
    path: '/projects',
    icon: '/logos/js_icon.svg',
  },
  {
    name: 'techstack.json',
    path: '/techstack',
    icon: '/logos/json_icon.svg',
  },
  {
    name: 'github.md',
    path: '/github',
    icon: '/logos/markdown_icon.svg',
  },
];

const resumeItems = [
  {
    name: 'resume.pdf',
    path: '/resume-viewer',
    icon: '/logos/pdf_icon.svg',
  },
  {
    name: 'README.md',
    path: '/resume-info',
    icon: '/logos/markdown_icon.svg',
  },
];

const Explorer = () => {
  const [portfolioOpen, setPortfolioOpen] = useState(true);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [pluginsOpen, setPluginsOpen] = useState(true);
  const { installedPlugins } = usePluginStore();

  const getInstalledPluginItems = () => {
    return installedPlugins.map(pluginId => {
      const plugin = ALL_PLUGINS.find(p => p.id === pluginId);
      if (!plugin) return null;
      
      return {
        name: `${plugin.name.toLowerCase().replace(/\s+/g, '-')}.plugin`,
        path: `/plugins/${pluginIdToSlug(plugin.id)}`,
        icon: '/logos/vscode_icon.svg', // Using VS Code icon for plugins
        plugin: plugin
      };
    }).filter(Boolean);
  };

  return (
    <div className={styles.explorer}>
      <p className={styles.title}>Explorer</p>
      <div>
        <input
          type="checkbox"
          className={styles.checkbox}
          id="portfolio-checkbox"
          checked={portfolioOpen}
          onChange={() => setPortfolioOpen(!portfolioOpen)}
        />
        <label htmlFor="portfolio-checkbox" className={styles.heading}>
          <VscChevronRight
            className={styles.chevron}
            style={portfolioOpen ? { transform: 'rotate(90deg)' } : {}}
          />
          Portfolio
        </label>
        <div
          className={styles.files}
          style={portfolioOpen ? { display: 'block' } : { display: 'none' }}
        >
          {explorerItems.map((item) => (
            <Link href={item.path} key={item.name}>
              <div className={styles.file}>
                <Image src={item.icon} alt={item.name} height={18} width={18} />{' '}
                <p>{item.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      <div>
        <input
          type="checkbox"
          className={styles.checkbox}
          id="resume-checkbox"
          checked={resumeOpen}
          onChange={() => setResumeOpen(!resumeOpen)}
        />
        <label htmlFor="resume-checkbox" className={styles.heading}>
          <VscChevronRight
            className={styles.chevron}
            style={resumeOpen ? { transform: 'rotate(90deg)' } : {}}
          />
          Resume
        </label>
        <div
          className={styles.files}
          style={resumeOpen ? { display: 'block' } : { display: 'none' }}
        >
          {resumeItems.map((item) => (
            <Link href={item.path} key={item.name}>
              <div className={styles.file}>
                <Image src={item.icon} alt={item.name} height={18} width={18} />{' '}
                <p>{item.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Plugins Section */}
      {installedPlugins.length > 0 && (
        <div className={styles.pluginsSection}>
          <input
            type="checkbox"
            className={styles.checkbox}
            id="plugins-checkbox"
            checked={pluginsOpen}
            onChange={() => setPluginsOpen(!pluginsOpen)}
          />
          <label htmlFor="plugins-checkbox" className={styles.heading}>
            <VscChevronRight
              className={styles.chevron}
              style={pluginsOpen ? { transform: 'rotate(90deg)' } : {}}
            />
            <VscExtensions style={{ marginRight: '4px' }} />
            Plugins ({installedPlugins.length})
          </label>
          <div
            className={styles.files}
            style={pluginsOpen ? { display: 'block' } : { display: 'none' }}
          >
              {getInstalledPluginItems().map((item: any) => (
              <Link href={item.path} key={item.name}>
                <div className={styles.file}>
                  <Image src={item.icon} alt={item.name} height={18} width={18} />{' '}
                  <p>{item.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Explorer;
