import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  VscBell,
  VscCheck,
  VscError,
  VscWarning,
  VscSourceControl,
} from 'react-icons/vsc';
import { SiNextdotjs } from 'react-icons/si';

import styles from '@/styles/Bottombar.module.css';

const routeToLang: Record<string, string> = {
  '/': 'TypeScript React',
  '/about': 'HTML',
  '/contact': 'CSS',
  '/projects': 'JavaScript',
  '/techstack': 'JSON',
  '/github': 'Markdown',
  '/settings': 'TypeScript',
  '/plugins': 'TypeScript',
  '/resume-viewer': 'PDF',
  '/resume-info': 'Markdown',
};

const Bottombar = () => {
  const router = useRouter();
  const [line, setLine] = useState(1);
  const [col, setCol] = useState(1);
  const [notifCount, setNotifCount] = useState(0);

  const lang = routeToLang[router.pathname] ?? 'TypeScript';

  // Derive Ln/Col from the editor scroll position so the status bar
  // reacts like a real editor instead of flickering random numbers.
  useEffect(() => {
    const editor = document.getElementById('main-editor');
    if (!editor) return;

    const update = () => {
      const lineHeight = 20;
      setLine(Math.floor(editor.scrollTop / lineHeight) + 1);
      setCol(1);
    };

    update();
    editor.addEventListener('scroll', update, { passive: true });
    return () => editor.removeEventListener('scroll', update);
  }, [router.pathname]);

  return (
    <footer className={styles.bottomBar}>
      <div className={styles.container}>
        <a
          href="https://github.com/aliasgarsogiawala"
          target="_blank"
          rel="noreferrer noopener"
          className={styles.section}
          title="Open on GitHub"
        >
          <VscSourceControl className={styles.icon} />
          <p>main</p>
        </a>
        <div className={styles.section}>
          <VscError className={styles.icon} />
          <p className={styles.errorText}>0</p>&nbsp;&nbsp;
          <VscWarning className={styles.icon} />
          <p>0</p>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.section}>
          <p>Ln {line}, Col {col}</p>
        </div>
        <div className={styles.section}>
          <p>UTF-8</p>
        </div>
        <div className={styles.section}>
          <p>{lang}</p>
        </div>
        <div className={styles.section}>
          <SiNextdotjs className={styles.icon} />
          <p>Next.js</p>
        </div>
        <div className={styles.section}>
          <VscCheck className={styles.icon} />
          <p>Prettier</p>
        </div>
        <div
          className={styles.section}
          title="No notifications"
          onClick={() => setNotifCount(0)}
        >
          <VscBell />
          {notifCount > 0 && <span className={styles.notifBadge}>{notifCount}</span>}
        </div>
      </div>
    </footer>
  );
};

export default Bottombar;

