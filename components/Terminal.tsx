import { useState, useEffect, useRef } from 'react';
import { VscTerminal, VscChromeClose, VscChromeMaximize, VscChromeMinimize } from 'react-icons/vsc';
import { useTerminal } from '@/contexts/TerminalContext';
import styles from '@/styles/Terminal.module.css';

const Terminal = () => {
  const { isTerminalOpen, closeTerminal } = useTerminal();
  const [terminalOutput, setTerminalOutput] = useState('');
  const [command, setCommand] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isTerminalOpen && !isMinimized) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 350); // Wait for animation to complete
    }
  }, [isTerminalOpen, isMinimized]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [terminalOutput]);

  const handleDownloadCommand = (cmd: string) => {
    const validCommands = ['download resume.pdf', 'wget resume.pdf', 'curl -O resume.pdf', 'get resume.pdf'];
    
    if (validCommands.includes(cmd.toLowerCase().trim())) {
      // Trigger download
      const link = document.createElement('a');
      link.href = '/api/resume';
      link.download = 'resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setTerminalOutput(prev => prev + `$ ${cmd}\n--2024-07-13 ${new Date().toLocaleTimeString()}--  resume.pdf\nResolving resume.pdf... done.\nConnecting to resume.pdf... connected.\nHTTP request sent, awaiting response... 200 OK\nLength: 15240 (15K) [application/pdf]\nSaving to: 'resume.pdf'\n\nresume.pdf          100%[===================>]  14.88K  --.-KB/s    in 0.001s\n\n${new Date().toLocaleTimeString()} (15.2 MB/s) - 'resume.pdf' saved [15240/15240]\n\n`);
    } else if (cmd.toLowerCase() === 'help') {
      setTerminalOutput(prev => prev + `$ ${cmd}\nAvailable commands:\n  download resume.pdf    Download resume using download command\n  wget resume.pdf        Download using wget\n  curl -O resume.pdf     Download using curl\n  get resume.pdf         Simple get command\n  clear                  Clear terminal\n  help                   Show this help\n  ls                     List directory contents\n  pwd                    Print working directory\n  whoami                 Display current user\n\n`);
    } else if (cmd.toLowerCase() === 'clear') {
      setTerminalOutput('');
    } else if (cmd.toLowerCase() === 'ls') {
      setTerminalOutput(prev => prev + `$ ${cmd}\ntotal 8\ndrwxr-xr-x  5 user  staff   160 Jul 13 ${new Date().toLocaleTimeString().slice(0, 5)} .\ndrwxr-xr-x  3 user  staff    96 Jul 13 ${new Date().toLocaleTimeString().slice(0, 5)} ..\n-rw-r--r--  1 user  staff  15240 Jul 13 ${new Date().toLocaleTimeString().slice(0, 5)} resume.pdf\n-rw-r--r--  1 user  staff    512 Jul 13 ${new Date().toLocaleTimeString().slice(0, 5)} README.md\ndrwxr-xr-x  3 user  staff    96 Jul 13 ${new Date().toLocaleTimeString().slice(0, 5)} portfolio\n\n`);
    } else if (cmd.toLowerCase() === 'pwd') {
      setTerminalOutput(prev => prev + `$ ${cmd}\n/Users/user/portfolio\n\n`);
    } else if (cmd.toLowerCase() === 'whoami') {
      setTerminalOutput(prev => prev + `$ ${cmd}\nuser\n\n`);
    } else if (cmd.toLowerCase().startsWith('cd')) {
      setTerminalOutput(prev => prev + `$ ${cmd}\n\n`);
    } else if (cmd.trim() === '') {
      return;
    } else {
      setTerminalOutput(prev => prev + `$ ${cmd}\nzsh: command not found: ${cmd}\nType 'help' for available commands.\n\n`);
    }
    setCommand('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleDownloadCommand(command);
    }
  };

  return (
    <div className={`${styles.terminal} ${isTerminalOpen ? styles.open : styles.closed} ${isMinimized ? styles.minimized : ''}`}>
      {/* Terminal Header */}
      <div className={styles.terminalHeader}>
        <div className={styles.terminalTab}>
          <VscTerminal className={styles.terminalIcon} />
          <span>zsh</span>
        </div>
        <div className={styles.terminalControls}>
          <button 
            className={styles.controlButton}
            onClick={() => setIsMinimized(!isMinimized)}
            title={isMinimized ? "Maximize" : "Minimize"}
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
          <div 
            ref={outputRef}
            className={styles.terminalOutput}
          >
            {!terminalOutput && (
              <div className={styles.welcomeMessage}>
                <div>Last login: {new Date().toDateString()} {new Date().toLocaleTimeString()} on ttys000</div>
                <div>Welcome to VS Code Terminal</div>
                <div>Type 'help' for available commands.</div>
                <div></div>
              </div>
            )}
            <pre>{terminalOutput}</pre>
          </div>
          
          <div className={styles.terminalInput}>
            <span className={styles.prompt}>user@vscode:~/portfolio$</span>
            <input
              ref={inputRef}
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyPress={handleKeyPress}
              className={styles.input}
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Terminal;
