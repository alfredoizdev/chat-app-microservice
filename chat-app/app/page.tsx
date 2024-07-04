import styles from "./page.module.scss";
import MainLayout from "@/components/shared/Layout/MainLayout";

export default function Home() {
  return (
    <main className={styles.main}>
      <MainLayout>
        <div className={styles.welcomeContainer}>
          <h2>Welcome to popular chat</h2>
          <p>Here you can chat with other users</p>
          <p>Enjoy!</p>
        </div>
      </MainLayout>
    </main>
  );
}
