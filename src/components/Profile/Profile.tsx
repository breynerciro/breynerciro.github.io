import styles from "./Profile.module.css";

export default function Profile() {
  return (
    <section id="perfil" className={styles.section}>
      <p className="section-label">Sobre mí</p>
      <p className={`${styles.text} ${styles.lead}`}>
        Ingeniero de Sistemas especializado en desarrollo Backend y Full-Stack, con experiencia en el diseño, desarrollo e implementación de aplicaciones robustas y escalables.
      </p>
      <p className={styles.text}>
        Experto en Java (17+), Node.js y arquitectura de microservicios. Sólida trayectoria en el trabajo con bases de datos relacionales y no relacionales, consumo de APIs REST y aplicación de metodologías ágiles (Scrum). Enfocado en el ciclo de vida del desarrollo de software (SDLC) y buenas prácticas de codificación para entregar soluciones de alto impacto empresarial.
      </p>
    </section>
  );
}
