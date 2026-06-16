import styles from "./Experience.module.css";
import { experience } from "@/data/portfolio";

export default function Experience() {
  return (
    <section id="experiencia" className={styles.section}>
      <p className="section-label">Experiencia</p>
      <div className={styles.list}>
        {experience.map((job) => (
          <div key={`${job.company}-${job.date}`} className={styles.item}>
            <div className={styles.left}>
              <span className={styles.date}>{job.date}</span>
              <span className={styles.company}>{job.company}</span>
            </div>
            <div className={styles.right}>
              <p className={styles.jobTitle}>{job.title}</p>
              <ul className={styles.taskList}>
                {job.tasks.map((task, i) => (
                  <li key={i}>{task}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
