import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  VscAccount,
  VscSettings,
  VscMail,
  VscGithubAlt,
  VscCode,
  VscFiles,
  VscExtensions,
} from 'react-icons/vsc';

import styles from '@/styles/Sidebar.module.css';

const sidebarTopItems = [
  { Icon: VscFiles, path: '/', tooltip: 'Explorer' },
  { Icon: VscGithubAlt, path: '/github', tooltip: 'Source Control' },
  { Icon: VscCode, path: '/projects', tooltip: 'Projects' },
  { Icon: VscMail, path: '/contact', tooltip: 'Contact' },
];

const sidebarBottomItems = [
  { Icon: VscAccount, path: '/about', tooltip: 'About Me' },
  { Icon: VscSettings, path: '/settings', tooltip: 'Settings' },
];

interface SidebarProps {
  extensionsOpen: boolean;
  setExtensionsOpen: (open: boolean) => void;
}

const Sidebar = ({ extensionsOpen, setExtensionsOpen }: SidebarProps) => {
  const router = useRouter();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarTop}>
        {sidebarTopItems.map(({ Icon, path, tooltip }) => (
          <Link href={path} key={path}>
            <div
              className={`${styles.iconContainer} ${
                router.pathname === path && styles.active
              }`}
              data-tooltip={tooltip}
            >
              <Icon
                size={24}
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
          data-tooltip="Extensions"
        >
          <VscExtensions
            size={24}
            fill={extensionsOpen ? 'rgb(225, 228, 232)' : 'rgb(106, 115, 125)'}
            className={styles.icon}
          />
        </div>
      </div>
      <div className={styles.sidebarBottom}>
        {sidebarBottomItems.map(({ Icon, path, tooltip }) => (
          <div className={styles.iconContainer} key={path} data-tooltip={tooltip}>
            <Link href={path}>
              <Icon
                size={24}
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
  );
};

export default Sidebar;
