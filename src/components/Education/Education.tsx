import styles from "./Education.module.css";
import { education } from "@/data/portfolio";

export default function Education() {
  return (
    <section id="educacion" className={styles.section}>
      <p className="section-label">Formación</p>
      <div className={styles.list}>
        {education.map((edu) => (
          <div key={`${edu.institution}-${edu.title}`} className={styles.item}>
            <div className={styles.left}>
              <span className={styles.date}>{edu.date}</span>
            </div>
            <div className={styles.right}>
              <p className={styles.degreeTitle}>{edu.title}</p>
              <p className={styles.institution}>{edu.institution}</p>
              {edu.details.length > 0 && (
                <div className={styles.details}>
                  {edu.details.map((d, i) => <p key={i}>{d}</p>)}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
