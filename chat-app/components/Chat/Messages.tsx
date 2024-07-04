"use client";
import useSocket from "@/hooks/useSocket";
import styles from "./chat.module.scss";

const Messages = () => {
  const { messages } = useSocket();

  return (
    <div className={styles.chatBox}>
      {messages.map((message: string, index: any) => (
        <div key={index} className={styles.messageRight}>
          <div className={styles.messageText}>{message}</div>
        </div>
      ))}
      <div className={styles.messageLeft}>
        <div className={styles.messageText}>Hi</div>
      </div>
    </div>
  );
};

export default Messages;
