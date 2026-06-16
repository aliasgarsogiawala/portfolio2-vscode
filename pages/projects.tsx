import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { VscPlay, VscDebugRestart, VscClearAll, VscClose } from 'react-icons/vsc';

import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/data/projects';

import styles from '@/styles/ProjectsPage.module.css';

const liveHost = (url?: string) =>
  url ? url.replace(/^https?:\/\//, '').replace(/\/$/, '') : null;

// Render the projects array as a believable source file for the "editor".
const codeString = [
  `import { render } from "portfolio";`,
  `import { ProjectCard } from "@/components/ProjectCard";`,
  ``,
  `const projects = [`,
  ...projects.map((p) => {
    const stack = p.techStack.slice(0, 3).map((s) => `"${s}"`).join(', ');
    const host = liveHost(p.liveLink);
    const live = host ? `, live: "${host}"` : '';
    return `  { name: "${p.title}", stack: [${stack}]${live} },`;
  }),
  `];`,
  ``,
  `// ▶ Run to compile and render all ${projects.length} projects in the output panel`,
  `projects.forEach((project) => render(<ProjectCard {...project} />));`,
].join('\n');

const ProjectsPage = () => {
  const [ran, setRan] = useState(false);
  const [running, setRunning] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>(['All']);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const allTechs = Array.from(new Set(projects.flatMap((p) => p.techStack)));
  const filters = ['All', ...allTechs];

  const filteredProjects = activeFilters.includes('All')
    ? projects
    : projects.filter((p) =>
        activeFilters.some((f) => p.techStack.includes(f))
      );

  const handleFilter = (filter: string) => {
    if (filter === 'All') {
      setActiveFilters(['All']);
      return;
    }
    setActiveFilters((prev) => {
      const next = prev.includes('All')
        ? [filter]
        : prev.includes(filter)
          ? prev.filter((f) => f !== filter)
          : [...prev, filter];
      return next.length === 0 ? ['All'] : next;
    });
  };

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
    total: projects.length,
    live: projects.filter((p) => p.liveLink).length,
    tech: allTechs.length,
  };

  return (
    <div className={`${styles.layout} ${isVisible ? styles.visible : ''}`}>
      {/* Hero */}
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.pageTitle}>
              <span className={styles.titleLine}>My</span>
              <span className={styles.titleLine}>Projects</span>
            </h1>
            <p className={styles.pageSubtitle}>
              This file exports my work. Hit{' '}
              <span className={styles.inlineRun}>▶ Run</span> and the output panel
              compiles it into live project cards.
            </p>
          </div>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>{stats.total}</div>
              <div className={styles.statLabel}>Projects</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>{stats.live}</div>
              <div className={styles.statLabel}>Live Demos</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>{stats.tech}</div>
              <div className={styles.statLabel}>Technologies</div>
            </div>
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
            <span className={`${styles.panelTab} ${styles.panelTabActive}`}>
              OUTPUT
            </span>
            <span className={styles.panelTab}>TERMINAL</span>
            <span className={styles.panelTab}>PROBLEMS</span>
            <div className={styles.panelActions}>
              {ran && (
                <button
                  className={styles.panelActionBtn}
                  onClick={() => setRan(false)}
                  title="Clear output"
                >
                  <VscClearAll size={16} />
                </button>
              )}
            </div>
          </div>

          <div className={styles.panelBody}>
            {!ran && !running && (
              <div className={styles.terminalLines}>
                <div className={styles.tLine}>
                  <span className={styles.promptSymbol}>$</span> node projects.js
                  <span className={styles.cursor} />
                </div>
                <p className={styles.hint}>
                  Output is empty. Press{' '}
                  <kbd className={styles.kbd}>▶ Run</kbd> in the editor above to
                  compile and render the projects.
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
                    → rendering {filteredProjects.length} of {projects.length}{' '}
                    project{filteredProjects.length !== 1 ? 's' : ''}
                  </div>
                </div>

                {/* Filter toolbar acts on the rendered output */}
                <div className={styles.outputToolbar}>
                  <span className={styles.toolbarLabel}>{'// filter:'}</span>
                  {filters.map((filter) => (
                    <button
                      key={filter}
                      className={`${styles.chip} ${
                        activeFilters.includes(filter) ? styles.chipActive : ''
                      }`}
                      onClick={() => handleFilter(filter)}
                    >
                      {filter}
                      {activeFilters.includes(filter) && filter !== 'All' && (
                        <VscClose size={12} />
                      )}
                    </button>
                  ))}
                </div>

                {/* GUI render of the "executed" code */}
                {filteredProjects.length > 0 ? (
                  <div className={styles.renderGrid}>
                    {filteredProjects.map((project, i) => (
                      <div
                        key={project.slug}
                        className={styles.renderItem}
                        style={{ animationDelay: `${i * 0.07}s` }}
                      >
                        <ProjectCard project={project} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className={styles.hint}>
                    No projects matched the active filters.
                  </p>
                )}
              </>
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
