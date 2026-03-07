import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { VscClose } from 'react-icons/vsc';

import styles from '@/styles/Tab.module.css';

interface TabProps {
  icon: string;
  filename: string;
  path: string;
}

const Tab = ({ icon, filename, path }: TabProps) => {
  const router = useRouter();
  const isActive = router.pathname === path;
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`${styles.tab} ${isActive ? styles.active : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={path} className={styles.tabLink}>
        <Image src={icon} alt={filename} height={16} width={16} />
        <p>{filename}</p>
      </Link>
      <button
        className={`${styles.closeBtn} ${hovered || isActive ? styles.closeBtnVisible : ''}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          // Navigate to home if closing active tab
          if (isActive && path !== '/') {
            router.push('/');
          }
        }}
        title={`Close ${filename}`}
        aria-label={`Close ${filename}`}
      >
        <VscClose size={14} />
      </button>
    </div>
  );
};

export default Tab;
