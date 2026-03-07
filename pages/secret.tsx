import { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from '@/styles/SecretPage.module.css';

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export default function SecretPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [seq, setSeq] = useState<string[]>([]);
  const [hint, setHint] = useState('');

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      setSeq(prev => {
        const next = [...prev, e.key].slice(-KONAMI.length);
        if (JSON.stringify(next) === JSON.stringify(KONAMI)) {
          setUnlocked(true);
        }
        return next;
      });
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    // Show partial progress hint
    const progress = seq.filter((k, i) => k === KONAMI[seq.length - (seq.length - i) - 1]).length;
    const icons = KONAMI.map((key, i) => {
      const map: Record<string, string> = {
        ArrowUp: '↑', ArrowDown: '↓', ArrowLeft: '←', ArrowRight: '→', b: 'B', a: 'A'
      };
      return seq[i] === key ? `<span class="done">${map[key]}</span>` : `<span>${map[key]}</span>`;
    });
    setHint(icons.join(' '));
    void progress;
  }, [seq]);

  return (
    <>
      <Head>
        <title>🥚 Secret Page — Easter Egg</title>
      </Head>
      <div className={styles.page}>
        <div className={styles.terminal}>
          <div className={styles.termHeader}>
            <span className={styles.dot} style={{ background: '#ff5555' }}></span>
            <span className={styles.dot} style={{ background: '#f1fa8c' }}></span>
            <span className={styles.dot} style={{ background: '#50fa7b' }}></span>
            <span className={styles.termTitle}>secret.ts — Easter Egg Hunter</span>
          </div>
          <div className={styles.termBody}>
            <pre className={styles.pre}>{`// 🥚 You found the secret page!
// 
// This portfolio has several hidden easter eggs.
// Here's what you might have already found:
//
// ✓ This page (/secret) — navigated here directly
// ? Konami Code: ↑↑↓↓←→←→BA (triggers matrix rain)
// ? Type 'matrix' in the terminal (Run > Terminal)
// ? Run the Dino Game (Run menu in titlebar)
// ? Command Palette: Ctrl+Shift+P
// ? Type 'neofetch' in the terminal
// ? Right-click files in the Explorer
// ? Try the 'skills' command in terminal
//
// Keep exploring... there might be more 👀
`}</pre>

            {!unlocked ? (
              <div className={styles.challenge}>
                <p className={styles.challengeLabel}>
                  🔐 Unlock the secret with the Konami Code:
                </p>
                <div
                  className={styles.konamiBar}
                  dangerouslySetInnerHTML={{ __html: hint || '↑ ↑ ↓ ↓ ← → ← → B A' }}
                />
                <p className={styles.hint}>(use keyboard arrow keys, then B and A)</p>
              </div>
            ) : (
              <div className={styles.unlocked}>
                <pre className={styles.trophyArt}>{`
   trophy  🏆

    ___________
   '._==_==_=_.'
   .-\\:      /-.
  | (|:.     |) |
   '-|:.     |-'
     \\::.    /
      '::. .'
        ) (
      _.' '._
     \`"""\`\`"""\`
`}</pre>
                <p className={styles.unlockedMsg}>🎉 You unlocked the secret!</p>
                <p className={styles.unlockedSub}>
                  Aliasgar says: <em>&quot;Thanks for exploring — you&apos;re clearly curious, and that&apos;s a superpower.&quot;</em>
                </p>
                <div className={styles.confetti}>
                  {Array.from({ length: 20 }).map((_, i) => (
                    <span key={i} className={styles.confettiDot} style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 2}s` }} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
