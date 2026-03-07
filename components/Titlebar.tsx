import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { VscCopilot } from 'react-icons/vsc';
import { useTerminal } from '@/contexts/TerminalContext';

import styles from '@/styles/Titlebar.module.css';

interface MenuItem {
  label: string;
  shortcut?: string;
  divider?: boolean;
  action?: () => void;
  disabled?: boolean;
}

interface MenuGroup {
  label: string;
  items: MenuItem[];
}

const Titlebar = () => {
  const { toggleTerminal } = useTerminal();
  const router = useRouter();
  const [showDinosaurGame, setShowDinosaurGame] = useState<boolean>(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleRunClick = () => {
    setShowDinosaurGame(true);
    setActiveMenu(null);
  };

  const handleTerminalClick = () => {
    toggleTerminal();
    setActiveMenu(null);
  };

  const menus: MenuGroup[] = [
    {
      label: 'File',
      items: [
        { label: 'New File', shortcut: 'Ctrl+N', disabled: true },
        { label: 'New Window', shortcut: 'Ctrl+Shift+N', disabled: true },
        { label: '', divider: true },
        { label: 'Open Folder...', shortcut: 'Ctrl+K Ctrl+O', disabled: true },
        { label: '', divider: true },
        { label: 'Save', shortcut: 'Ctrl+S', disabled: true },
        { label: '', divider: true },
        { label: 'Download Resume', shortcut: '', action: () => { window.open('/api/resume'); setActiveMenu(null); } },
        { label: '', divider: true },
        { label: 'Close Editor', shortcut: 'Ctrl+W', action: () => { router.push('/'); setActiveMenu(null); } },
      ],
    },
    {
      label: 'Edit',
      items: [
        { label: 'Undo', shortcut: 'Ctrl+Z', disabled: true },
        { label: 'Redo', shortcut: 'Ctrl+Y', disabled: true },
        { label: '', divider: true },
        { label: 'Find', shortcut: 'Ctrl+F', disabled: true },
        { label: 'Replace', shortcut: 'Ctrl+H', disabled: true },
      ],
    },
    {
      label: 'View',
      items: [
        { label: 'Command Palette...', shortcut: 'Ctrl+Shift+P', action: () => { setActiveMenu(null); document.dispatchEvent(new CustomEvent('openCommandPalette')); } },
        { label: '', divider: true },
        { label: 'Explorer', shortcut: 'Ctrl+Shift+E', action: () => { router.push('/'); setActiveMenu(null); } },
        { label: 'Extensions', shortcut: 'Ctrl+Shift+X', action: () => { document.dispatchEvent(new CustomEvent('toggleExtensions')); setActiveMenu(null); } },
        { label: '', divider: true },
        { label: 'Terminal', shortcut: 'Ctrl+`', action: handleTerminalClick },
        { label: '', divider: true },
        { label: 'Settings', shortcut: 'Ctrl+,', action: () => { router.push('/settings'); setActiveMenu(null); } },
      ],
    },
    {
      label: 'Go',
      items: [
        { label: '→ Home', shortcut: '', action: () => { router.push('/'); setActiveMenu(null); } },
        { label: '→ About', shortcut: '', action: () => { router.push('/about'); setActiveMenu(null); } },
        { label: '→ Projects', shortcut: '', action: () => { router.push('/projects'); setActiveMenu(null); } },
        { label: '→ Tech Stack', shortcut: '', action: () => { router.push('/techstack'); setActiveMenu(null); } },
        { label: '→ GitHub', shortcut: '', action: () => { router.push('/github'); setActiveMenu(null); } },
        { label: '→ Contact', shortcut: '', action: () => { router.push('/contact'); setActiveMenu(null); } },
      ],
    },
    {
      label: 'Run',
      items: [
        { label: '▶  Run Dino Game', shortcut: '', action: handleRunClick },
        { label: '', divider: true },
        { label: '? Type Konami Code...', shortcut: '↑↑↓↓←→←→BA', disabled: true },
      ],
    },
    {
      label: 'Terminal',
      items: [
        { label: 'New Terminal', shortcut: 'Ctrl+`', action: handleTerminalClick },
        { label: '', divider: true },
        { label: 'Split Terminal', shortcut: '', disabled: true },
      ],
    },
    {
      label: 'Help',
      items: [
        { label: 'Welcome', shortcut: '', action: () => { router.push('/'); setActiveMenu(null); } },
        { label: '', divider: true },
        { label: 'GitHub Repository', shortcut: '', action: () => { window.open('https://github.com/aliasgarsogiawala'); setActiveMenu(null); } },
        { label: 'Contact Developer', shortcut: '', action: () => { router.push('/contact'); setActiveMenu(null); } },
        { label: '', divider: true },
        { label: '🥚 Find Easter Eggs', shortcut: '', disabled: true },
        { label: 'About', shortcut: '', action: () => { router.push('/about'); setActiveMenu(null); } },
      ],
    },
  ];

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <section className={styles.titlebar}>
        <Image
          src="/logos/vscode_icon.svg"
          alt="VSCode Icon"
          height={15}
          width={15}
          className={styles.icon}
        />
        <div className={styles.items} ref={menuRef}>
          {menus.map((menu) => (
            <div key={menu.label} className={styles.menuWrapper}>
              <p
                className={`${styles.menuLabel} ${activeMenu === menu.label ? styles.menuLabelActive : ''}`}
                onClick={() => setActiveMenu(activeMenu === menu.label ? null : menu.label)}
                onMouseEnter={() => activeMenu && activeMenu !== menu.label ? setActiveMenu(menu.label) : undefined}
              >
                {menu.label}
              </p>
              {activeMenu === menu.label && (
                <div className={styles.dropdown}>
                  {menu.items.map((item, i) =>
                    item.divider ? (
                      <div key={i} className={styles.divider} />
                    ) : (
                      <div
                        key={i}
                        className={`${styles.dropdownItem} ${item.disabled ? styles.dropdownItemDisabled : ''}`}
                        onClick={() => !item.disabled && item.action?.()}
                      >
                        <span className={styles.dropdownLabel}>{item.label}</span>
                        {item.shortcut && <span className={styles.shortcut}>{item.shortcut}</span>}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        <p className={styles.title}>Aliasgar Sogiawala — Visual Studio Code</p>
        <div className={styles.titlebarActions}>
          <button
            className={styles.copilotButton}
            title="Open Copilot Chat"
            onClick={() => document.dispatchEvent(new CustomEvent('toggleCopilot'))}
          >
            <VscCopilot size={16} />
          </button>
        </div>
        <div className={styles.windowButtons}>
          <span className={styles.minimize} title="Minimize"></span>
          <span className={styles.maximize} title="Maximize"></span>
          <span className={styles.close} title="Close"></span>
        </div>
      </section>

      {showDinosaurGame && (
        <div className={styles.gameOverlay} onClick={(e) => e.target === e.currentTarget && setShowDinosaurGame(false)}>
          <div className={styles.gameModal}>
            <div className={styles.gameHeader}>
              <h3>🦕 Chrome Dinosaur Game</h3>
              <button
                className={styles.closeGameButton}
                onClick={() => setShowDinosaurGame(false)}
              >
                ✕
              </button>
            </div>
            <div className={styles.dinoGame}>
              <iframe
                src="https://chromedino.com/"
                width="100%"
                height="400"
                frameBorder="0"
                title="Chrome Dinosaur Game"
                className={styles.gameFrame}
              />
            </div>
            <div className={styles.gameInstructions}>
              <p>🎮 Press SPACE to jump • Use ↑ and ↓ arrows to control</p>
              <p>💡 Just like when your internet goes down!</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Titlebar;
