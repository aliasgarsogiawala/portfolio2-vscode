import styles from '@/styles/ExperiencePage.module.css';
import profile from '@/data/profile';

const ExperiencePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Experience</h1>
        <div className={styles.subtitle}>
          {profile.role} · {profile.location}
        </div>

        <div className={styles.timeline}>
          {profile.experience.map((exp) => (
            <div key={`${exp.company}-${exp.role}`} className={styles.expItem}>
              <div className={styles.expHeader}>
                <span className={styles.expRole}>{exp.role}</span>
                <span className={styles.expPeriod}>{exp.period}</span>
              </div>
              <div className={styles.expCompany}>{exp.company}</div>
              <ul className={styles.expList}>
                {exp.description.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: { title: 'Experience' },
  };
}

export default ExperiencePage;
