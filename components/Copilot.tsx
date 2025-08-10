import { useState, useRef, useEffect } from 'react';
import { VscCopilot, VscSend, VscClose, VscChevronDown } from 'react-icons/vsc';
import styles from '@/styles/Copilot.module.css';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Copilot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI assistant trained on Aliasgar's information. Ask me anything about his skills, experience, projects, or background!",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/copilot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputValue }),
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
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble connecting right now. Please try again later.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestionQuestions = [
    "What are Aliasgar's main skills?",
    "Tell me about his projects",
    "What's his educational background?",
    "What technologies does he work with?",
    "How can I contact him?",
  ];

  const handleSuggestionClick = (question: string) => {
    setInputValue(question);
  };

  return (
    <>
      <div className={`${styles.copilotContainer} ${isOpen ? styles.open : ''}`}>
        <div className={styles.copilotHeader}>
          <div className={styles.headerLeft}>
            <VscCopilot className={styles.copilotIcon} />
            <span>AI Assistant</span>
          </div>
          <div className={styles.headerButtons}>
            <button
              className={styles.headerButton}
              onClick={() => setIsOpen(!isOpen)}
            >
              <VscChevronDown className={isOpen ? styles.rotated : ''} />
            </button>
            <button
              className={styles.headerButton}
              onClick={() => setIsOpen(false)}
            >
              <VscClose />
            </button>
          </div>
        </div>

        {isOpen && (
          <div className={styles.copilotContent}>
            <div className={styles.messagesContainer}>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`${styles.message} ${
                    message.isUser ? styles.userMessage : styles.aiMessage
                  }`}
                >
                  <div className={styles.messageContent}>
                    <div className={styles.messageText}>{message.text}</div>
                    <div className={styles.messageTime}>
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className={`${styles.message} ${styles.aiMessage}`}>
                  <div className={styles.messageContent}>
                    <div className={styles.typing}>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {messages.length === 1 && (
              <div className={styles.suggestions}>
                <p className={styles.suggestionsTitle}>Try asking:</p>
                {suggestionQuestions.map((question, index) => (
                  <button
                    key={index}
                    className={styles.suggestionButton}
                    onClick={() => handleSuggestionClick(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            <div className={styles.inputContainer}>
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about Aliasgar..."
                className={styles.messageInput}
                rows={1}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className={styles.sendButton}
              >
                <VscSend />
              </button>
            </div>
          </div>
        )}
      </div>

      <button
        className={`${styles.copilotToggle} ${isOpen ? styles.hidden : ''}`}
        onClick={() => setIsOpen(true)}
      >
        <VscCopilot />
        <span>AI Assistant</span>
      </button>
    </>
  );
};

export default Copilot;
