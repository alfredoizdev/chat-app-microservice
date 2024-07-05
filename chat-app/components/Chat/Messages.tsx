"use client";
import useSocket from "@/hooks/useSocket";
import styles from "./chat.module.scss";
import { Chat } from "@/types/chat";
import { useUserStore } from "@/store/userStore";

const Messages = () => {
  const { messages } = useSocket();
  const user = useUserStore((state) => state.user);

  return (
    <div className={styles.chatBox}>
      {messages.map((message: Chat, index: number) => (
        <div
          key={index}
          className={`${
            message.senderId === user?.id
              ? styles.messageRight
              : styles.messageLeft
          }`}
        >
          <div className={styles.messageText}>{message.message}</div>
        </div>
      ))}

      {messages.length === 0 && (
        <div className={styles.noMessage}>
          <i className="bi bi-chat-square-dots"></i>
          <p>No message yet</p>
        </div>
      )}
    </div>
  );
};

export default Messages;
