import { useState, useRef, useEffect } from 'react';
import {
  VscCopilot,
  VscSend,
  VscClose,
  VscAdd,
  VscTrash,
  VscAccount,
} from 'react-icons/vsc';
import styles from '@/styles/Copilot.module.css';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface CopilotProps {
  isOpen: boolean;
  onClose: () => void;
}

const WELCOME_MESSAGE: Message = {
  id: '1',
  text: "Hi! I'm Aliasgar's AI assistant. Ask me anything about his skills, experience, projects, or background!",
  isUser: false,
  timestamp: new Date(),
};

const SUGGESTIONS = [
  "What are Aliasgar's skills?",
  "Tell me about his projects",
  "Where does he work?",
  "How can I contact him?",
  "What is he interested in?",
];

const Copilot = ({ isOpen, onClose }: CopilotProps) => {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const text = inputValue.trim();
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || "I'm sorry, I couldn't process that request.",
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: "Sorry, I'm having trouble connecting right now. Please try again.",
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleNewChat = () => {
    setMessages([WELCOME_MESSAGE]);
    setInputValue('');
  };

  const handleSuggestion = (q: string) => {
    setInputValue(q);
    inputRef.current?.focus();
  };

  return (
    <div className={`${styles.panel} ${isOpen ? styles.panelOpen : ''}`}>
      {/* Panel header — matches VS Code secondary sidebar header */}
      <div className={styles.panelHeader}>
        <div className={styles.panelHeaderLeft}>
          <VscCopilot className={styles.headerIcon} />
          <span className={styles.headerTitle}>Copilot Chat</span>
        </div>
        <div className={styles.panelHeaderActions}>
          <button
            className={styles.iconBtn}
            title="New Chat"
            onClick={handleNewChat}
          >
            <VscAdd size={14} />
          </button>
          <button
            className={styles.iconBtn}
            title="Clear Chat"
            onClick={() => setMessages([WELCOME_MESSAGE])}
          >
            <VscTrash size={14} />
          </button>
          <button
            className={styles.iconBtn}
            title="Close"
            onClick={onClose}
          >
            <VscClose size={14} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className={styles.messages}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`${styles.messageRow} ${msg.isUser ? styles.userRow : styles.aiRow}`}
          >
            {!msg.isUser && (
              <div className={styles.avatar}>
                <VscCopilot size={14} />
              </div>
            )}
            <div className={`${styles.bubble} ${msg.isUser ? styles.userBubble : styles.aiBubble}`}>
              <p className={styles.bubbleText}>{msg.text}</p>
            </div>
            {msg.isUser && (
              <div className={`${styles.avatar} ${styles.userAvatar}`}>
                <VscAccount size={14} />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className={`${styles.messageRow} ${styles.aiRow}`}>
            <div className={styles.avatar}>
              <VscCopilot size={14} />
            </div>
            <div className={`${styles.bubble} ${styles.aiBubble}`}>
              <div className={styles.typingDots}>
                <span /><span /><span />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions — shown only when just the welcome message is present */}
      {messages.length === 1 && (
        <div className={styles.suggestions}>
          {SUGGESTIONS.map((q) => (
            <button
              key={q}
              className={styles.suggestionChip}
              onClick={() => handleSuggestion(q)}
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input area */}
      <div className={styles.inputArea}>
        <div className={styles.inputWrapper}>
          <textarea
            ref={inputRef}
            className={styles.input}
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Copilot..."
            rows={1}
          />
          <button
            className={styles.sendBtn}
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            title="Send (Enter)"
          >
            <VscSend size={14} />
          </button>
        </div>
        <p className={styles.inputHint}>
          Copilot can make mistakes. <kbd>Enter</kbd> to send, <kbd>Shift+Enter</kbd> for newline.
        </p>
      </div>
    </div>
  );
};

export default Copilot;
