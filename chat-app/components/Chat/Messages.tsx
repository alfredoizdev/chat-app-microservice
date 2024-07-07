"use client";
import { useEffect, useState } from "react";
import useSocket from "@/hooks/useSocket";
import styles from "./chat.module.scss";
import { Chat } from "@/types/chat";
import { useUserStore } from "@/store/userStore";

type MessagesProps = {
  history: Chat[] | [];
};

const Messages = ({ history }: MessagesProps) => {
  const user = useUserStore((state) => state.user);
  const currentUser = useUserStore((state) => state.currentUser);
  const [mounted, setMounted] = useState(false);

  const { messages } = useSocket();

  const formatDate = (date: string | undefined) => {
    if (!date) {
      return "";
    }

    const newDate = new Date(date);
    return newDate.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className={styles.chatBox}>
      {Array.isArray(history) && history.length > 0 && (
        <>
          {history?.map((message: Chat, index: number) => (
            <div
              key={index}
              className={`${
                message.senderId === currentUser?.id
                  ? styles.messageLeft
                  : styles.messageRight
              }`}
            >
              <div className={styles.msg}>
                <div className={styles.messageText}>{message.message}</div>
                <span className={styles.date}>
                  {formatDate(message?.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </>
      )}
      {messages.map((message: Chat, index: number) => (
        <div
          key={index}
          className={`${
            message.senderId === currentUser?.id
              ? styles.messageLeft
              : styles.messageRight
          }`}
        >
          <div className={styles.msg}>
            <div className={styles.messageText}>{message.message}</div>
            <span className={styles.date}>
              {formatDate(message?.createdAt)}
            </span>
          </div>
        </div>
      ))}

      {messages.length === 0 && history.length === 0 && (
        <div className={styles.noMessage}>
          <i className="bi bi-chat-square-dots"></i>
          <p>No message yet</p>
        </div>
      )}
    </div>
  );
};

export default Messages;
