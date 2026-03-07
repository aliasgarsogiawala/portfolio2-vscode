import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { VscChevronRight } from 'react-icons/vsc';
import styles from '@/styles/Breadcrumbs.module.css';

const routeMeta: Record<string, { icon: string; label: string; parent?: string }> = {
  '/': { icon: '/logos/react_icon.svg', label: 'home.tsx' },
  '/about': { icon: '/logos/html_icon.svg', label: 'about.html' },
  '/contact': { icon: '/logos/css_icon.svg', label: 'contact.css' },
  '/projects': { icon: '/logos/js_icon.svg', label: 'projects.js' },
  '/techstack': { icon: '/logos/json_icon.svg', label: 'techstack.json' },
  '/github': { icon: '/logos/markdown_icon.svg', label: 'github.md' },
  '/settings': { icon: '/logos/vscode_icon.svg', label: 'settings.json' },
  '/plugins': { icon: '/logos/vscode_icon.svg', label: 'extensions' },
  '/resume-viewer': { icon: '/logos/pdf_icon.svg', label: 'resume.pdf', parent: '/resume-info' },
  '/resume-info': { icon: '/logos/markdown_icon.svg', label: 'README.md' },
};

const Breadcrumbs = () => {
  const router = useRouter();
  const meta = routeMeta[router.pathname];

  if (!meta) return null;

  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      <div className={styles.crumbs}>
        {/* Workspace root */}
        <span className={styles.crumb}>
          <span className={styles.folder}>portfolio</span>
        </span>
        <VscChevronRight className={styles.sep} />
        {/* Current file */}
        <Link href={router.pathname} className={styles.crumbLink}>
          <Image src={meta.icon} alt="" width={14} height={14} className={styles.fileIcon} />
          <span className={styles.active}>{meta.label}</span>
        </Link>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
