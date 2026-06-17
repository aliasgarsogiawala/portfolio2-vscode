import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { VscPlay, VscDebugRestart, VscClearAll } from 'react-icons/vsc';

import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/data/projects';
import profile from '@/data/profile';

import styles from '@/styles/ProjectsPage.module.css';

type Tab = 'output' | 'terminal' | 'problems';
type TermLine = { type: 'input' | 'output' | 'success' | 'error'; text: string };

// The curated set shown on this page — the rest of the catalog lives on GitHub.
const SHOWCASE_SLUGS = ['toursafe', 'paradoc', 'domainflip', 'tasknet-ai', 'storemyapi', 'THC', 'eggstinction', 'fakegeotag'];
const showcaseProjects = SHOWCASE_SLUGS
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter((p): p is NonNullable<typeof p> => Boolean(p));

const liveHost = (url?: string) =>
  url ? url.replace(/^https?:\/\//, '').replace(/\/$/, '') : null;

// Render the showcase as a believable source file for the "editor".
const codeString = [
  `import { render } from "portfolio";`,
  `import { ProjectCard } from "@/components/ProjectCard";`,
  ``,
  `// Some of my work — see github.com/${profile.githubUsername} for everything else`,
  `const projects = [`,
  ...showcaseProjects.map((p) => {
    const stack = p.techStack.slice(0, 3).map((s) => `"${s}"`).join(', ');
    const host = liveHost(p.liveLink);
    const live = host ? `, live: "${host}"` : '';
    return `  { name: "${p.title}", stack: [${stack}]${live} },`;
  }),
  `];`,
  ``,
  `// ▶ Run to compile and render all ${showcaseProjects.length} projects in the output panel`,
  `projects.forEach((project) => render(<ProjectCard {...project} />));`,
].join('\n');

const HELP_TEXT = [
  "Here's what you can type:",
  '  ls                  list the showcased projects',
  '  cat <slug>          show details for a project',
  "  open <slug>         open a project's live site (or repo)",
  '  stats               a few numbers about this showcase',
  '  whoami               a little about me',
  '  github               jump to my GitHub profile',
  '  clear                wipe this terminal',
  '  help                 show this message again',
].join('\n');

const ProjectsPage = () => {
  const [ran, setRan] = useState(false);
  const [running, setRunning] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('output');

  const [termHistory, setTermHistory] = useState<TermLine[]>([
    { type: 'output', text: 'Hey, welcome in. Type "help" if you want to know what this thing can do.' },
  ]);
  const [termInput, setTermInput] = useState('');
  const [termCmdLog, setTermCmdLog] = useState<string[]>([]);
  const [termCmdIndex, setTermCmdIndex] = useState<number | null>(null);

  const termInputRef = useRef<HTMLInputElement>(null);
  const termBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (termBodyRef.current) {
      termBodyRef.current.scrollTop = termBodyRef.current.scrollHeight;
    }
  }, [termHistory, activeTab]);

  useEffect(() => {
    if (activeTab === 'terminal') termInputRef.current?.focus();
  }, [activeTab]);

  const allTechs = Array.from(new Set(showcaseProjects.flatMap((p) => p.techStack)));

  const runCode = () => {
    if (running) return;
    setRunning(true);
    setRan(false);
    setTimeout(() => {
      setRunning(false);
      setRan(true);
    }, 1000);
  };

  const stats = {
    total: showcaseProjects.length,
    live: showcaseProjects.filter((p) => p.liveLink).length,
    tech: allTechs.length,
  };

  const printTerm = (text: string, type: TermLine['type'] = 'output') =>
    setTermHistory((h) => [...h, { type, text }]);

  const runTerminalCommand = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;

    setTermHistory((h) => [...h, { type: 'input', text: cmd }]);
    setTermCmdLog((h) => [...h, cmd]);
    setTermCmdIndex(null);

    const [name, ...rest] = cmd.split(/\s+/);
    const arg = rest.join(' ').trim();

    switch (name.toLowerCase()) {
      case 'help':
        printTerm(HELP_TEXT);
        break;

      case 'ls':
        printTerm(showcaseProjects.map((p) => p.slug).join('\n'));
        break;

      case 'cat': {
        const p = showcaseProjects.find((p) => p.slug === arg);
        if (!p) {
          printTerm(`cat: ${arg || '(no slug given)'}: no such project. Try "ls".`, 'error');
        } else {
          printTerm(
            [
              p.title,
              p.description,
              `stack: ${p.techStack.join(', ')}`,
              p.liveLink ? `live: ${p.liveLink}` : null,
              `repo: ${p.link}`,
            ]
              .filter(Boolean)
              .join('\n')
          );
        }
        break;
      }

      case 'open': {
        const p = showcaseProjects.find((p) => p.slug === arg);
        if (!p) {
          printTerm(`open: ${arg || '(no slug given)'}: no such project. Try "ls".`, 'error');
        } else {
          const url = p.liveLink || p.githubLink || p.link;
          window.open(url, '_blank', 'noopener,noreferrer');
          printTerm(`→ opening ${url}`, 'success');
        }
        break;
      }

      case 'stats':
        printTerm(
          [
            `projects      ${stats.total}`,
            `live demos    ${stats.live}`,
            `technologies  ${stats.tech}`,
          ].join('\n')
        );
        break;

      case 'whoami':
        printTerm(`${profile.name} — ${profile.role}, ${profile.location}`);
        break;

      case 'github':
        window.open(`https://github.com/${profile.githubUsername}`, '_blank', 'noopener,noreferrer');
        printTerm(`→ opening github.com/${profile.githubUsername}`, 'success');
        break;

      case 'clear':
        setTermHistory([]);
        break;

      default:
        printTerm(`command not found: ${name}. Type "help" for a list of commands.`, 'error');
    }
  };

  const handleTermKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      runTerminalCommand(termInput);
      setTermInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (termCmdLog.length === 0) return;
      const next = termCmdIndex === null ? termCmdLog.length - 1 : Math.max(0, termCmdIndex - 1);
      setTermCmdIndex(next);
      setTermInput(termCmdLog[next]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (termCmdIndex === null) return;
      const next = termCmdIndex + 1;
      if (next >= termCmdLog.length) {
        setTermCmdIndex(null);
        setTermInput('');
      } else {
        setTermCmdIndex(next);
        setTermInput(termCmdLog[next]);
      }
    }
  };

  return (
    <div className={`${styles.layout} ${isVisible ? styles.visible : ''}`}>
      {/* Hero */}
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.pageTitle}>
              <span className={styles.titleLine}>Some of</span>
              <span className={styles.titleLine}>my work</span>
            </h1>
            <p className={styles.pageSubtitle}>
              A handful of projects I&apos;m genuinely proud of, written up the way
              I actually think about them — as code. Hit{' '}
              <span className={styles.inlineRun}>▶ Run</span> and watch them
              compile into real project cards on the right. Want to dig
              through everything else I&apos;ve built? It&apos;s all on{' '}
              <a
                href="https://github.com/aliasgarsogiawala"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.inlineLink}
              >
                GitHub
              </a>
              .
            </p>
          </div>
        </div>
      </div>

      {/* IDE: editor + output panel */}
      <div className={styles.ide}>
        {/* Editor pane */}
        <div className={styles.editorPane}>
          <div className={styles.editorTitlebar}>
            <div className={styles.tabChip}>
              <Image src="/logos/js_icon.svg" alt="" width={14} height={14} />
              <span>projects.js</span>
            </div>
            <button
              className={styles.runButton}
              onClick={runCode}
              disabled={running}
              title="Run (compile & render)"
            >
              {running ? (
                <>
                  <span className={styles.spinner} /> Running…
                </>
              ) : ran ? (
                <>
                  <VscDebugRestart size={14} /> Re-run
                </>
              ) : (
                <>
                  <VscPlay size={14} /> Run
                </>
              )}
            </button>
          </div>
          <div className={styles.editorBody}>
            <SyntaxHighlighter
              language="jsx"
              style={vscDarkPlus}
              showLineNumbers
              wrapLongLines
              customStyle={{
                margin: 0,
                background: 'transparent',
                padding: '1rem 1rem 1.25rem',
                fontSize: '0.82rem',
              }}
              lineNumberStyle={{ minWidth: '2.5em', color: '#6e7681', opacity: 0.6 }}
              codeTagProps={{ style: { fontFamily: "'JetBrains Mono', monospace" } }}
            >
              {codeString}
            </SyntaxHighlighter>
          </div>
        </div>

        {/* Output / terminal panel */}
        <div className={styles.panel}>
          <div className={styles.panelTabs}>
            <button
              type="button"
              className={`${styles.panelTab} ${activeTab === 'output' ? styles.panelTabActive : ''}`}
              onClick={() => setActiveTab('output')}
            >
              OUTPUT
            </button>
            <button
              type="button"
              className={`${styles.panelTab} ${activeTab === 'terminal' ? styles.panelTabActive : ''}`}
              onClick={() => setActiveTab('terminal')}
            >
              TERMINAL
            </button>
            <button
              type="button"
              className={`${styles.panelTab} ${activeTab === 'problems' ? styles.panelTabActive : ''}`}
              onClick={() => setActiveTab('problems')}
            >
              PROBLEMS
            </button>
            <div className={styles.panelActions}>
              {activeTab === 'output' && ran && (
                <button
                  className={styles.panelActionBtn}
                  onClick={() => setRan(false)}
                  title="Clear output"
                >
                  <VscClearAll size={16} />
                </button>
              )}
              {activeTab === 'terminal' && termHistory.length > 0 && (
                <button
                  className={styles.panelActionBtn}
                  onClick={() => setTermHistory([])}
                  title="Clear terminal"
                >
                  <VscClearAll size={16} />
                </button>
              )}
            </div>
          </div>

          <div className={styles.panelBody}>
            {activeTab === 'output' && (
              <>
                {!ran && !running && (
                  <div className={styles.terminalLines}>
                    <div className={styles.tLine}>
                      <span className={styles.promptSymbol}>$</span> node projects.js
                      <span className={styles.cursor} />
                    </div>
                    <p className={styles.hint}>
                      Nothing&apos;s run yet — press{' '}
                      <kbd className={styles.kbd}>▶ Run</kbd> up above and I&apos;ll
                      compile these into real project cards.
                    </p>
                  </div>
                )}

                {running && (
                  <div className={styles.terminalLines}>
                    <div className={styles.tLine}>
                      <span className={styles.promptSymbol}>$</span> node projects.js
                    </div>
                    <div className={`${styles.tLine} ${styles.muted}`}>
                      <span className={styles.spinner} /> compiling modules…
                    </div>
                  </div>
                )}

                {ran && (
                  <>
                    <div className={styles.terminalLines}>
                      <div className={styles.tLine}>
                        <span className={styles.promptSymbol}>$</span> node projects.js
                      </div>
                      <div className={`${styles.tLine} ${styles.success}`}>
                        ✓ Compiled successfully
                      </div>
                      <div className={`${styles.tLine} ${styles.muted}`}>
                        → rendering all {showcaseProjects.length} projects
                      </div>
                    </div>

                    {/* GUI render of the "executed" code */}
                    <div className={styles.renderGrid}>
                      {showcaseProjects.map((project, i) => (
                        <div
                          key={project.slug}
                          className={styles.renderItem}
                          style={{ animationDelay: `${i * 0.07}s` }}
                        >
                          <ProjectCard project={project} />
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}

            {activeTab === 'terminal' && (
              <div
                className={styles.terminalConsole}
                ref={termBodyRef}
                onClick={() => termInputRef.current?.focus()}
              >
                {termHistory.map((line, i) => (
                  <div key={i} className={styles.tLine}>
                    {line.type === 'input' ? (
                      <>
                        <span className={styles.promptSymbol}>$</span>
                        <span>{line.text}</span>
                      </>
                    ) : (
                      <pre className={`${styles.termOutput} ${styles[line.type] || ''}`}>
                        {line.text}
                      </pre>
                    )}
                  </div>
                ))}
                <div className={styles.terminalInputRow}>
                  <span className={styles.promptSymbol}>$</span>
                  <input
                    ref={termInputRef}
                    className={styles.terminalInputField}
                    value={termInput}
                    onChange={(e) => setTermInput(e.target.value)}
                    onKeyDown={handleTermKeyDown}
                    spellCheck={false}
                    autoComplete="off"
                    placeholder="type a command… (try “help”)"
                  />
                </div>
              </div>
            )}

            {activeTab === 'problems' && (
              <div className={styles.terminalLines}>
                <div className={`${styles.tLine} ${styles.success}`}>
                  ✓ All clear — nothing broken in here.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.viewAllSection}>
        <a
          href="https://github.com/aliasgarsogiawala"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.viewAllButton}
        >
          <span className={styles.buttonIcon}>🚀</span>
          View All Work on GitHub
          <span className={styles.buttonArrow}>→</span>
        </a>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: { title: 'Projects' },
  };
}

export default ProjectsPage;
