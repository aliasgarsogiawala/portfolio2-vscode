import { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import Titlebar from '@/components/Titlebar';
import Sidebar from '@/components/Sidebar';
import Explorer from '@/components/Explorer';
import Extensions from '@/components/Extensions';
import Bottombar from '@/components/Bottombar';
import Tabsbar from '@/components/Tabsbar';
import Terminal from '@/components/Terminal';
import Copilot from '@/components/Copilot';
import Breadcrumbs from '@/components/Breadcrumbs';

import styles from '@/styles/Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

// Command palette items
const COMMANDS = [
  { label: 'Go to Home', path: '/', icon: '/logos/react_icon.svg' },
  { label: 'Go to About', path: '/about', icon: '/logos/html_icon.svg' },
  { label: 'Go to Experience', path: '/experience', icon: '/logos/typescript_icon.svg' },
  { label: 'Go to Projects', path: '/projects', icon: '/logos/js_icon.svg' },
  { label: 'Go to Tech Stack', path: '/techstack', icon: '/logos/json_icon.svg' },
  { label: 'Go to GitHub', path: '/github', icon: '/logos/markdown_icon.svg' },
  { label: 'Go to Contact', path: '/contact', icon: '/logos/css_icon.svg' },
  { label: 'Go to Settings', path: '/settings', icon: '/logos/vscode_icon.svg' },
  { label: 'View Resume', path: '/resume-viewer', icon: '/logos/pdf_icon.svg' },
  { label: 'Open Extensions', path: null, action: 'extensions', icon: '/logos/vscode_icon.svg' },
  { label: 'Download Resume', path: null, action: 'download', icon: '/logos/pdf_icon.svg' },
];

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const [extensionsOpen, setExtensionsOpen] = useState(false);
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [commandQuery, setCommandQuery] = useState('');
  const [selectedCommand, setSelectedCommand] = useState(0);
  const [konamiActive, setKonamiActive] = useState(false);
  const commandInputRef = useRef<HTMLInputElement>(null);
  const konamiSequenceRef = useRef<string[]>([]);
  const konamiTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const main = document.getElementById('main-editor');
    if (main) main.scrollTop = 0;
  }, [router.pathname]);

  // Command palette keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command Palette: Ctrl+Shift+P or Ctrl+P
      if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
        setCommandPaletteOpen(true);
        setCommandQuery('');
        setSelectedCommand(0);
        return;
      }
      // Escape closes palette
      if (e.key === 'Escape' && commandPaletteOpen) {
        setCommandPaletteOpen(false);
        return;
      }
    };

    // Listen for openCommandPalette event from titlebar
    const handleOpenPalette = () => {
      setCommandPaletteOpen(true);
      setCommandQuery('');
      setSelectedCommand(0);
    };

    // Listen for toggleExtensions event from titlebar
    const handleToggleExtensions = () => {
      setExtensionsOpen(prev => !prev);
    };

    // Listen for toggleCopilot event from titlebar
    const handleToggleCopilot = () => {
      setCopilotOpen(prev => !prev);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('openCommandPalette', handleOpenPalette);
    document.addEventListener('toggleExtensions', handleToggleExtensions);
    document.addEventListener('toggleCopilot', handleToggleCopilot);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('openCommandPalette', handleOpenPalette);
      document.removeEventListener('toggleExtensions', handleToggleExtensions);
      document.removeEventListener('toggleCopilot', handleToggleCopilot);
    };
  }, [commandPaletteOpen]);

  useEffect(() => {
    if (commandPaletteOpen) {
      setTimeout(() => commandInputRef.current?.focus(), 50);
    }
  }, [commandPaletteOpen]);

  // Konami code detector
  useEffect(() => {
    const handleKonami = (e: KeyboardEvent) => {
      konamiSequenceRef.current.push(e.key);
      if (konamiSequenceRef.current.length > KONAMI_CODE.length) {
        konamiSequenceRef.current.shift();
      }
      if (konamiTimeoutRef.current) clearTimeout(konamiTimeoutRef.current);
      konamiTimeoutRef.current = setTimeout(() => {
        konamiSequenceRef.current = [];
      }, 2000);

      if (JSON.stringify(konamiSequenceRef.current) === JSON.stringify(KONAMI_CODE)) {
        setKonamiActive(true);
        setTimeout(() => setKonamiActive(false), 5000);
      }
    };

    document.addEventListener('keydown', handleKonami);
    return () => document.removeEventListener('keydown', handleKonami);
  }, []);

  const filteredCommands = COMMANDS.filter(c =>
    c.label.toLowerCase().includes(commandQuery.toLowerCase())
  );

  const handleCommandSelect = useCallback((cmd: typeof COMMANDS[0]) => {
    setCommandPaletteOpen(false);
    if (cmd.path) {
      router.push(cmd.path);
    } else if (cmd.action === 'extensions') {
      setExtensionsOpen(true);
    } else if (cmd.action === 'download') {
      window.open('/api/resume');
    }
  }, [router]);

  const handleCommandKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedCommand(prev => Math.min(prev + 1, filteredCommands.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedCommand(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      if (filteredCommands[selectedCommand]) {
        handleCommandSelect(filteredCommands[selectedCommand]);
      }
    } else if (e.key === 'Escape') {
      setCommandPaletteOpen(false);
    }
  };

  return (
    <>
      <Titlebar />
      <div className={styles.main}>
        <Sidebar
          extensionsOpen={extensionsOpen}
          setExtensionsOpen={setExtensionsOpen}
        />
        <Extensions isOpen={extensionsOpen} />
        <Explorer />
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <Tabsbar />
          <Breadcrumbs />
          <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
            <main id="main-editor" className={styles.content}>
              {children}
            </main>
            <Copilot isOpen={copilotOpen} onClose={() => setCopilotOpen(false)} />
          </div>
        </div>
      </div>
      <Terminal />
      <Bottombar />

      {/* VS Code Command Palette */}
      {commandPaletteOpen && (
        <div className={styles.paletteOverlay} onClick={() => setCommandPaletteOpen(false)}>
          <div className={styles.palette} onClick={e => e.stopPropagation()}>
            <div className={styles.paletteInputWrapper}>
              <span className={styles.paletteIcon}>{'>'}</span>
              <input
                ref={commandInputRef}
                type="text"
                className={styles.paletteInput}
                placeholder="Type a command or search..."
                value={commandQuery}
                onChange={e => { setCommandQuery(e.target.value); setSelectedCommand(0); }}
                onKeyDown={handleCommandKeyDown}
              />
            </div>
            <div className={styles.paletteList}>
              {filteredCommands.map((cmd, i) => (
                <div
                  key={cmd.label}
                  className={`${styles.paletteItem} ${i === selectedCommand ? styles.paletteItemSelected : ''}`}
                  onClick={() => handleCommandSelect(cmd)}
                  onMouseEnter={() => setSelectedCommand(i)}
                >
                  <Image src={cmd.icon} alt="" width={16} height={16} />
                  <span>{cmd.label}</span>
                </div>
              ))}
              {filteredCommands.length === 0 && (
                <div className={styles.paletteEmpty}>No commands found</div>
              )}
            </div>
            <div className={styles.paletteHint}>
              <span>↑↓ to navigate</span>
              <span>↵ to select</span>
              <span>Esc to close</span>
            </div>
          </div>
        </div>
      )}

      {konamiActive && (
        <div className={styles.konamiOverlay} onClick={() => setKonamiActive(false)}>
          <canvas id="konami-canvas" className={styles.konamiCanvas} />
          <div className={styles.konamiMessage}>
            <pre className={styles.konamiAscii}>{`
 ██╗  ██╗ ██████╗ ███╗   ██╗ █████╗ ███╗   ███╗██╗
 ██║ ██╔╝██╔═══██╗████╗  ██║██╔══██╗████╗ ████║██║
 █████╔╝ ██║   ██║██╔██╗ ██║███████║██╔████╔██║██║
 ██╔═██╗ ██║   ██║██║╚██╗██║██╔══██║██║╚██╔╝██║██║
 ██║  ██╗╚██████╔╝██║ ╚████║██║  ██║██║ ╚═╝ ██║██║
 ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝
`}</pre>
            <p className={styles.konamiSubtitle}>You found the Konami Code Easter Egg! 🎮</p>
            <p className={styles.konamiHint}>↑↑↓↓←→←→BA</p>
            <p className={styles.konamiClose}>(click anywhere to exit)</p>
          </div>
        </div>
      )}

      {/* Matrix canvas animation on konami */}
      {konamiActive && <MatrixCanvas />}
    </>
  );
};

// Matrix canvas component
function MatrixCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const MATRIX_CHARS = 'アイウエオカキクケコ01234567890ABCDEF';
    const fontSize = 14;
    const cols = Math.floor(canvas.width / fontSize);
    const drops = Array(cols).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00ff41';
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const text = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9997,
        pointerEvents: 'none',
      }}
    />
  );
}

export default Layout;
