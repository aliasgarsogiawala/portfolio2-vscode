import styles from '@/styles/ContactCode.module.css';

const contactItems = [
  {
    social: 'email',
    link: 'aliasgarsogiawala@gmail.com',
    href: 'mailto:aliasgarsogiawala@gmail.com',
  },
  {
    social: 'github',
    link: 'aliasgarsogiawala',
    href: 'https://github.com/aliasgarsogiawala',
  },
  {
    social: 'linkedin',
    link: 'aliasgar-sogiawala',
    href: 'https://www.linkedin.com/in/aliasgar-sogiawala/',
  },
  {
    social: 'twitter',
    link: 'aliasgarsogiawala',
    href: 'https://www.twitter.com/aliasgarsogiawala',
  },
  {
    social: 'instagram',
    link: 'aliasgarsogiawala',
    href: 'https://www.instagram.com/aliasgarsogiawala',
  },
];

const ContactCode = () => {
  return (
    <div className={styles.code}>
      <p className={styles.line}>
        <span className={styles.className}>.socials</span> &#123;
      </p>
      {contactItems.map((item, index) => (
        <p className={styles.line} key={index}>
          &nbsp;&nbsp;&nbsp;{item.social}:{' '}
          <a href={item.href} target="_blank" rel="noopener">
            {item.link}
          </a>
          ;
        </p>
      ))}
      <p className={styles.line}>&#125;</p>
    </div>
  );
};

export default ContactCode;
