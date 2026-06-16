import Header from "@/components/Header/Header";
import Profile from "@/components/Profile/Profile";
import Skills from "@/components/Skills/Skills";
import Experience from "@/components/Experience/Experience";
import Projects from "@/components/Projects/Projects";
import Education from "@/components/Education/Education";
import Footer from "@/components/Footer/Footer";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.layout}>
        <aside className={styles.aside}>
          <Header />
        </aside>
        <main className={styles.main}>
          <Profile />
          <Skills />
          <Experience />
          <Projects />
          <Education />
          <Footer />
        </main>
      </div>
    </div>
  );
}
