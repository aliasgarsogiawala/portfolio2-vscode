import { useState } from 'react';
import { VscMail, VscPerson, VscEdit, VscCheck, VscError, VscLoading } from 'react-icons/vsc';
import styles from '@/styles/ContactForm.module.css';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState<FormStatus>({
    type: 'idle',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setStatus({ type: 'loading', message: 'Sending message...' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: result.message });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({ type: 'error', message: result.message });
      }
    } catch {
      setStatus({ 
        type: 'error', 
        message: 'Network error. Please check your connection and try again.' 
      });
    }
  };

  const getStatusIcon = () => {
    switch (status.type) {
      case 'loading':
        return <VscLoading className={styles.spinning} />;
      case 'success':
        return <VscCheck />;
      case 'error':
        return <VscError />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeader}>
        <VscMail className={styles.headerIcon} />
        <h2>Send me a message</h2>
        <p>I&apos;d love to hear from you! Fill out the form below and I&apos;ll get back to you as soon as possible.</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <div className={styles.inputWrapper}>
            <VscPerson className={styles.inputIcon} />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.inputWrapper}>
            <VscMail className={styles.inputIcon} />
            <input
              type="email"
              name="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.inputWrapper}>
            <VscEdit className={styles.inputIcon} />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <textarea
            name="message"
            placeholder="Your message here..."
            value={formData.message}
            onChange={handleChange}
            required
            className={styles.textarea}
            rows={6}
          />
        </div>

        <button 
          type="submit" 
          disabled={status.type === 'loading'}
          className={`${styles.submitButton} ${status.type === 'loading' ? styles.loading : ''}`}
        >
          {status.type === 'loading' ? (
            <>
              <VscLoading className={styles.spinning} />
              Sending...
            </>
          ) : (
            <>
              <VscMail />
              Send Message
            </>
          )}
        </button>

        {status.message && (
          <div className={`${styles.statusMessage} ${styles[status.type]}`}>
            {getStatusIcon()}
            <span>{status.message}</span>
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
