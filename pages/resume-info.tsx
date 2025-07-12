import { useState } from 'react';
import Head from '@/components/Head';
import styles from '@/styles/ContactPage.module.css';

const ResumeInfo = () => {
  const [terminalOutput, setTerminalOutput] = useState('');
  const [command, setCommand] = useState('');
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  const handleDownloadCommand = (cmd: string) => {
    const validCommands = ['download resume.pdf', 'wget resume.pdf', 'curl -O resume.pdf', 'get resume.pdf'];
    
    if (validCommands.includes(cmd.toLowerCase().trim())) {
      const link = document.createElement('a');
      link.href = '/api/resume';
      link.download = 'resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setTerminalOutput(prev => prev + `$ ${cmd}\n--2024-07-12 14:30:25--  resume.pdf\nResolving resume.pdf... done.\nConnecting to resume.pdf... connected.\nHTTP request sent, awaiting response... 200 OK\nLength: 15240 (15K) [application/pdf]\nSaving to: 'resume.pdf'\n\nresume.pdf          100%[===================>]  14.88K  --.-KB/s    in 0.001s\n\n2024-07-12 14:30:25 (15.2 MB/s) - 'resume.pdf' saved [15240/15240]\n\n`);
    } else if (cmd.toLowerCase() === 'help') {
      setTerminalOutput(prev => prev + `$ ${cmd}\nAvailable commands:\n  download resume.pdf    Download resume using download command\n  wget resume.pdf        Download using wget\n  curl -O resume.pdf     Download using curl\n  get resume.pdf         Simple get command\n  clear                  Clear terminal\n  help                   Show this help\n  ls                     List directory contents\n\n`);
    } else if (cmd.toLowerCase() === 'clear') {
      setTerminalOutput('');
    } else if (cmd.toLowerCase() === 'ls') {
      setTerminalOutput(prev => prev + `$ ${cmd}\ntotal 2\n-rw-r--r-- 1 user user  15240 Jul 12 14:30 resume.pdf\n-rw-r--r-- 1 user user    512 Jul 12 14:30 README.md\n\n`);
    } else if (cmd.trim() === '') {
      return;
    } else {
      setTerminalOutput(prev => prev + `$ ${cmd}\nbash: ${cmd}: command not found\nType 'help' for available commands.\n\n`);
    }
    setCommand('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleDownloadCommand(command);
    }
  };

  return (
    <>
      <Head title="Resume - Download Instructions" />
      <div className={styles.container}>
        <div className={styles.content}>
          <h1># Resume Download</h1>
          
          <div style={{ marginBottom: '20px', fontFamily: 'monospace' }}>
            <p>To download my resume, open the terminal and run one of the following commands:</p>
            <div style={{ background: '#1e1e1e', padding: '15px', borderRadius: '5px', margin: '10px 0' }}>
              <div style={{ color: '#569cd6' }}>```bash</div>
              <div style={{ color: '#d4d4d4' }}>download resume.pdf</div>
              <div style={{ color: '#d4d4d4' }}>wget resume.pdf</div>
              <div style={{ color: '#d4d4d4' }}>curl -O resume.pdf</div>
              <div style={{ color: '#d4d4d4' }}>get resume.pdf</div>
              <div style={{ color: '#569cd6' }}>```</div>
            </div>
          </div>

          <button 
            onClick={() => setIsTerminalOpen(!isTerminalOpen)}
            style={{
              background: isTerminalOpen ? '#f14c4c' : '#007acc',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '3px',
              cursor: 'pointer',
              marginBottom: '10px',
              fontSize: '13px',
              fontFamily: 'Segoe UI, system-ui, sans-serif'
            }}
          >
            {isTerminalOpen ? '✕ Close Terminal' : '▶ Open Terminal'}
          </button>

          {isTerminalOpen && (
            <div style={{
              background: '#1e1e1e',
              color: '#cccccc',
              borderRadius: '0',
              fontFamily: '"Cascadia Code", "Fira Code", Consolas, "Courier New", monospace',
              fontSize: '13px',
              height: '400px',
              border: '1px solid #3c3c3c',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {/* Terminal Header */}
              <div style={{
                background: '#2d2d30',
                padding: '8px 12px',
                borderBottom: '1px solid #3c3c3c',
                fontSize: '12px',
                color: '#cccccc',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{ background: '#007acc', color: 'white', padding: '2px 6px', borderRadius: '2px', fontSize: '11px' }}>
                  TERMINAL
                </span>
                <span>zsh</span>
              </div>
              
              {/* Terminal Content */}
              <div style={{ 
                flex: 1,
                padding: '12px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{ color: '#569cd6', marginBottom: '8px', fontSize: '12px' }}>
                  Welcome to VS Code Terminal
                </div>
                
                <div style={{ 
                  whiteSpace: 'pre-wrap', 
                  flex: 1,
                  overflowY: 'auto',
                  marginBottom: '8px',
                  lineHeight: '1.4'
                }}>
                  {terminalOutput}
                </div>
                
                {/* Input Line */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#4ec9b0', marginRight: '8px', fontSize: '13px' }}>
                    user@vscode:~/resume$
                  </span>
                  <input
                    type="text"
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    onKeyPress={handleKeyPress}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                      color: '#cccccc',
                      fontSize: '13px',
                      fontFamily: 'inherit',
                      flex: 1,
                      caretColor: '#cccccc'
                    }}
                    placeholder=""
                    autoFocus
                  />
                </div>
              </div>
            </div>
          )}

          <div style={{ marginTop: '20px', fontSize: '14px', color: '#888', fontFamily: 'monospace' }}>
            <p>**Note:** The resume PDF will only download via terminal commands. Click on `resume.pdf` in the explorer to view it readonly.</p>
            <p>The resume is always kept up-to-date with my latest experience and skills.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumeInfo;
