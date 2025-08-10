import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  VscAccount,
  VscSettings,
  VscMail,
  VscGithubAlt,
  VscCode,
  VscFiles,
  VscExtensions,
} from 'react-icons/vsc';
import Extensions from './Extensions';

import styles from '@/styles/Sidebar.module.css';

const sidebarTopItems = [
  { Icon: VscFiles, path: '/' },
  { Icon: VscGithubAlt, path: '/github' },
  { Icon: VscCode, path: '/projects' },
  { Icon: VscMail, path: '/contact' },
];

const sidebarBottomItems = [
  { Icon: VscAccount, path: '/about' },
  { Icon: VscSettings, path: '/settings' },
];

const Sidebar = () => {
  const router = useRouter();
  const [extensionsOpen, setExtensionsOpen] = useState(false);

  return (
    <>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarTop}>
          {sidebarTopItems.map(({ Icon, path }) => (
            <Link href={path} key={path}>
              <div
                className={`${styles.iconContainer} ${
                  router.pathname === path && styles.active
                }`}
              >
                <Icon
                  size={16}
                  fill={
                    router.pathname === path
                      ? 'rgb(225, 228, 232)'
                      : 'rgb(106, 115, 125)'
                  }
                  className={styles.icon}
                />
              </div>
            </Link>
          ))}
          
          {/* Extensions Button */}
          <div
            className={`${styles.iconContainer} ${extensionsOpen && styles.active}`}
            onClick={() => setExtensionsOpen(!extensionsOpen)}
            style={{ cursor: 'pointer' }}
          >
            <VscExtensions
              size={16}
              fill={extensionsOpen ? 'rgb(225, 228, 232)' : 'rgb(106, 115, 125)'}
              className={styles.icon}
            />
          </div>
        </div>
        <div className={styles.sidebarBottom}>
        {sidebarBottomItems.map(({ Icon, path }) => (
          <div className={styles.iconContainer} key={path}>
            <Link href={path}>
              <Icon
                fill={
                  router.pathname === path
                    ? 'rgb(225, 228, 232)'
                    : 'rgb(106, 115, 125)'
                }
                className={styles.icon}
              />
            </Link>
          </div>
        ))}
      </div>
    </aside>

    {/* Extensions Panel */}
    <Extensions isOpen={extensionsOpen} onClose={() => setExtensionsOpen(false)} />
    </>
  );
};

export default Sidebar;
