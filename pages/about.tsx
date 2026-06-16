import styles from '@/styles/AboutPage.module.css';
import profile from '@/data/profile';

const AboutPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>{profile.name}</h1>
        <div className={styles.subtitle}>{profile.roleShort}</div>

        <div className={styles.aboutContent}>
          <section className={styles.section}>
            {profile.bioLong.map((paragraph, i) => (
              <p key={i} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Beyond Code</h2>
            <p className={styles.paragraph}>{profile.interests}</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: { title: `About ${profile.name}` },
  };
}

export default AboutPage;
