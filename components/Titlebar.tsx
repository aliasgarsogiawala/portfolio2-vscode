import Image from 'next/image';
import { useState } from 'react';
import { useTerminal } from '@/contexts/TerminalContext';

import styles from '@/styles/Titlebar.module.css';

const Titlebar = () => {
  const { toggleTerminal } = useTerminal();
  const [showDinosaurGame, setShowDinosaurGame] = useState<boolean>(false);

  const handleRunClick = () => {
    setShowDinosaurGame(true);
  };

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
        <div className={styles.items}>
          <p>File</p>
          <p>Edit</p>
          <p>View</p>
          <p>Go</p>
          <p className={styles.clickable} onClick={handleRunClick}>Run</p>
          <p className={styles.clickable} onClick={toggleTerminal}>Terminal</p>
          <p>Help</p>
        </div>
        <p className={styles.title}>Aliasgar Sogiawala - Visual Studio Code</p>
        <div className={styles.windowButtons}>
          <span className={styles.minimize}></span>
          <span className={styles.maximize}></span>
          <span className={styles.close}></span>
        </div>
      </section>
      
      {showDinosaurGame && (
        <div className={styles.gameOverlay}>
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
