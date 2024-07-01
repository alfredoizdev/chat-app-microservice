import styles from "./page.module.scss";
import Chat from "@/components/Chat/Chat";

export default function Home() {
  return (
    <main className={styles.main}>
      <Chat />
    </main>
  );
}
