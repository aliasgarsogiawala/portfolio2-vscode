import ContactCode from '@/components/ContactCode';
import ContactForm from '@/components/ContactForm';
import Head from '@/components/Head';

import styles from '@/styles/ContactPage.module.css';

const ContactPage = () => {
  return (
    <>
      <Head title="Contact - Get in Touch" />
      <div className={styles.layout}>
        <h1 className={styles.pageTitle}>Get In Touch</h1>
        <p className={styles.pageSubtitle}>
          Have a project in mind or just want to chat? I'd love to hear from you! 
          Send me a message using the form below or connect with me on social media.
        </p>
        
        <div className={styles.container}>
          <div className={styles.leftSection}>
            <div className={styles.contactContainer}>
              <ContactCode />
            </div>
          </div>
          
          <div className={styles.rightSection}>
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  );
};

export async function getStaticProps() {
  return {
    props: { title: 'Contact' },
  };
}

export default ContactPage;
