import { useState, useEffect, useRef, useCallback } from 'react';
import { VscTerminal, VscChromeClose, VscChromeMaximize, VscChromeMinimize, VscAdd } from 'react-icons/vsc';
import { useTerminal } from '@/contexts/TerminalContext';
import profile from '@/data/profile';
import styles from '@/styles/Terminal.module.css';

const WELCOME_ASCII = `
 ██╗   ██╗███████╗ ██████╗ ██████╗ ██████╗ ███████╗
 ██║   ██║██╔════╝██╔════╝██╔═══██╗██╔══██╗██╔════╝
 ██║   ██║███████╗██║     ██║   ██║██║  ██║█████╗  
 ╚██╗ ██╔╝╚════██║██║     ██║   ██║██║  ██║██╔══╝  
  ╚████╔╝ ███████║╚██████╗╚██████╔╝██████╔╝███████╗
   ╚═══╝  ╚══════╝ ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝
`.trim();

const MATRIX_CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF';

const Terminal = () => {
  const { isTerminalOpen, closeTerminal } = useTerminal();
  const [lines, setLines] = useState<Array<{ text: string; type: 'output' | 'input' | 'error' | 'success' | 'info' | 'matrix' }>>([]);
  const [command, setCommand] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMatrix, setIsMatrix] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const matrixIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isTerminalOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [isTerminalOpen, isMinimized]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

  const addLine = useCallback((text: string, type: 'output' | 'input' | 'error' | 'success' | 'info' | 'matrix' = 'output') => {
    setLines(prev => [...prev, { text, type }]);
  }, []);

  const stopMatrix = useCallback(() => {
    if (matrixIntervalRef.current) {
      clearInterval(matrixIntervalRef.current);
      matrixIntervalRef.current = null;
    }
    setIsMatrix(false);
    addLine('', 'output');
    addLine('[Matrix stopped. Press any key to continue]', 'success');
  }, [addLine]);

  const handleCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    // Add to history
    setHistory(prev => [trimmed, ...prev.slice(0, 49)]);
    setHistoryIndex(-1);

    const lower = trimmed.toLowerCase();

    addLine(`$ ${trimmed}`, 'input');

    // Download commands
    const downloadCmds = ['download resume.pdf', 'wget resume.pdf', 'curl -o resume.pdf', 'curl -O resume.pdf', 'get resume.pdf'];
    if (downloadCmds.includes(lower)) {
      const link = document.createElement('a');
      link.href = '/api/resume';
      link.download = 'resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      const now = new Date();
      addLine(`--${now.toISOString().slice(0, 10)} ${now.toLocaleTimeString()}--  https://aliasgar-vscode.vercel.app/api/resume`, 'output');
      addLine(`Resolving host... done.`, 'output');
      addLine(`HTTP request sent, awaiting response... 200 OK`, 'output');
      addLine(`Length: 15240 (15K) [application/pdf]`, 'output');
      addLine(`Saving to: 'resume.pdf'`, 'output');
      addLine(``, 'output');
      addLine(`resume.pdf          100%[===================>]  14.88K  --.-KB/s    in 0.001s`, 'output');
      addLine(``, 'output');
      addLine(`✓ 'resume.pdf' saved [15240/15240]`, 'success');
      return;
    }

    if (lower === 'help') {
      addLine('Available commands:', 'info');
      addLine('  Navigation:', 'output');
      addLine('    ls              List files', 'output');
      addLine('    pwd             Print working directory', 'output');
      addLine('    cd <dir>        Change directory', 'output');
      addLine('    cat <file>      Print file contents', 'output');
      addLine('  Resume:', 'output');
      addLine('    download resume.pdf   Download resume', 'output');
      addLine('    wget resume.pdf       Download using wget', 'output');
      addLine('    curl -O resume.pdf    Download using curl', 'output');
      addLine('  Info:', 'output');
      addLine('    whoami          Display current user', 'output');
      addLine('    date            Print current date', 'output');
      addLine('    echo <text>     Print text', 'output');
      addLine('    neofetch        System info', 'output');
      addLine('    skills          List skills', 'output');
      addLine('    contact         Show contact info', 'output');
      addLine('  Fun:', 'output');
      addLine('    matrix          Enter the Matrix 🟢', 'output');
      addLine('    clear           Clear terminal', 'output');
      addLine('    help            Show this help', 'output');
      return;
    }

    if (lower === 'clear') {
      setLines([]);
      return;
    }

    if (lower === 'ls' || lower === 'ls -la' || lower === 'ls -l') {
      addLine('total 6', 'output');
      addLine('drwxr-xr-x  portfolio/', 'output');
      addLine('drwxr-xr-x  resume/', 'output');
      addLine('-rw-r--r--  home.tsx', 'output');
      addLine('-rw-r--r--  about.html', 'output');
      addLine('-rw-r--r--  contact.css', 'output');
      addLine('-rw-r--r--  projects.js', 'output');
      addLine('-rw-r--r--  techstack.json', 'output');
      addLine('-rw-r--r--  github.md', 'output');
      addLine('-rw-r--r--  resume.pdf', 'output');
      return;
    }

    if (lower === 'pwd') {
      addLine('/home/aliasgar/portfolio', 'output');
      return;
    }

    if (lower === 'whoami') {
      addLine(profile.name.toLowerCase().replace(' ', '.'), 'output');
      return;
    }

    if (lower === 'date') {
      addLine(new Date().toString(), 'output');
      return;
    }

    if (lower.startsWith('echo ')) {
      addLine(trimmed.slice(5), 'output');
      return;
    }

    if (lower.startsWith('cd')) {
      const dir = trimmed.slice(3).trim() || '~';
      addLine(`Changed to: /home/aliasgar/${dir === '~' ? '' : dir}`, 'output');
      return;
    }

    if (lower.startsWith('cat ')) {
      const file = lower.slice(4).trim();
      if (file === 'resume.pdf' || file === 'resume') {
        addLine('Binary file. Use: download resume.pdf', 'info');
      } else if (file === 'readme.md' || file === 'readme') {
        addLine(`# ${profile.name}'s Portfolio`, 'output');
        addLine(`## Full Stack Developer`, 'output');
        addLine(profile.bio, 'output');
        addLine(`Site: ${profile.siteUrl}`, 'output');
      } else {
        addLine(`cat: ${file}: No such file or directory`, 'error');
      }
      return;
    }

    if (lower === 'neofetch') {
      addLine('', 'output');
      addLine('       ██████████████      aliasgar@vscode-portfolio', 'output');
      addLine('      ██  ██  ██  ██       --------------------------', 'output');
      addLine('     ██████████████████    OS: Portfolio v2.0 (Next.js 15)', 'output');
      addLine('    ████████████████████   Host: Vercel Edge Network', 'output');
      addLine('   ██████████████████████  Kernel: React 19.0', 'output');
      addLine('  ████████████████████████ Shell: zsh 5.9', 'output');
      addLine('   ████████████████████    Theme: GitHub Dark', 'output');
      addLine('    ████████████████       Icons: VSCode Icons', 'output');
      addLine('     ██████████████        Terminal: This one :)', 'output');
      addLine('      ████████████         CPU: TypeScript (strict)', 'output');
      addLine('       ██████████          Memory: Unlimited creative RAM', 'output');
      addLine('', 'output');
      return;
    }

    if (lower === 'skills') {
      addLine('Frontend: React, Next.js, TypeScript, HTML, CSS', 'info');
      addLine('Backend:  Node.js, Express, MongoDB', 'info');
      addLine('Tools:    Git, GitHub, VS Code, Vercel', 'info');
      addLine('Other:    Python, Java', 'info');
      return;
    }

    if (lower === 'contact') {
      profile.socials.forEach(s => {
        addLine(`${s.social.padEnd(12)} ${s.label}`, 'info');
      });
      return;
    }

    if (lower === 'matrix') {
      addLine('Entering the Matrix...', 'success');
      addLine('(Press any key to exit)', 'info');
      setIsMatrix(true);
      let counter = 0;
      matrixIntervalRef.current = setInterval(() => {
        const row = Array.from({ length: 60 }, () =>
          MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
        ).join(' ');
        addLine(row, 'matrix');
        counter++;
        if (counter > 40) stopMatrix();
      }, 80);
      return;
    }

    addLine(`zsh: command not found: ${trimmed}`, 'error');
    addLine(`Type 'help' for available commands.`, 'output');
  }, [addLine, stopMatrix]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isMatrix) {
      stopMatrix();
      return;
    }

    if (e.key === 'Enter') {
      handleCommand(command);
      setCommand('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIndex = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(newIndex);
      if (history[newIndex]) setCommand(history[newIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIndex = Math.max(historyIndex - 1, -1);
      setHistoryIndex(newIndex);
      setCommand(newIndex === -1 ? '' : (history[newIndex] ?? ''));
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    } else if (e.key === 'c' && e.ctrlKey) {
      e.preventDefault();
      addLine(`^C`, 'error');
      setCommand('');
    }
  };

  return (
    <div className={`${styles.terminal} ${isTerminalOpen ? styles.open : styles.closed} ${isMinimized ? styles.minimized : ''}`}>
      {/* Terminal Header */}
      <div className={styles.terminalHeader}>
        <div className={styles.terminalTabs}>
          <div className={styles.terminalTab}>
            <VscTerminal className={styles.terminalIcon} />
            <span>zsh</span>
          </div>
          <div className={styles.terminalTabAdd} title="New terminal (coming soon)">
            <VscAdd size={12} />
          </div>
        </div>
        <div className={styles.terminalControls}>
          <button
            className={styles.controlButton}
            onClick={() => setIsMinimized(!isMinimized)}
            title={isMinimized ? 'Maximize' : 'Minimize'}
          >
            {isMinimized ? <VscChromeMaximize /> : <VscChromeMinimize />}
          </button>
          <button
            className={styles.controlButton}
            onClick={closeTerminal}
            title="Close"
          >
            <VscChromeClose />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <div className={styles.terminalContent}>
          <div ref={outputRef} className={styles.terminalOutput}>
            {lines.length === 0 && (
              <div className={styles.welcomeMessage}>
                <pre className={styles.ascii}>{WELCOME_ASCII}</pre>
                <div className={styles.welcomeInfo}>Last login: {new Date().toDateString()} {new Date().toLocaleTimeString()} on ttys000</div>
                <div className={styles.welcomeInfo}>Welcome to <span className={styles.accent}>Aliasgar&apos;s</span> VS Code Terminal</div>
                <div className={styles.welcomeInfo}>Type <span className={styles.accent}>&apos;help&apos;</span> for available commands.</div>
                <div></div>
              </div>
            )}
            {lines.map((line, i) => (
              <div key={i} className={`${styles.line} ${styles[line.type]}`}>
                {line.text}
              </div>
            ))}
          </div>

          <div className={styles.terminalInput}>
            <span className={styles.prompt}>
              <span className={styles.promptUser}>{profile.githubUsername}</span>
              <span className={styles.promptAt}>@</span>
              <span className={styles.promptHost}>portfolio</span>
              <span className={styles.promptColon}>:</span>
              <span className={styles.promptDir}>~/portfolio</span>
              <span className={styles.promptDollar}>$</span>
            </span>
            <input
              ref={inputRef}
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              className={styles.input}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              aria-label="Terminal input"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Terminal;
