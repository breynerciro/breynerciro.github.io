import styles from "./Skills.module.css";
import { skills } from "@/data/portfolio";

export default function Skills() {
  return (
    <section id="habilidades" className={styles.section}>
      <p className="section-label">Stack técnico</p>
      <div className={styles.grid}>
        {skills.map((skill) => (
          <div key={skill.category} className={styles.cell}>
            <span className={styles.categoryName}>{skill.category}</span>
            <div className={styles.tagList}>
              {skill.items.map((item) => (
                <span key={item} className="tag">{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
