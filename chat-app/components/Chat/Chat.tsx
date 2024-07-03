"use client";
import styles from "./chat.module.scss";
import useSocket from "@/hooks/useSocket";
import MainLayout from "../shared/Layout/MainLayout";
import SidebarChat from "./Sidebar";
import Messages from "./Messages";
import InputMessage from "./InputMessage";

function Chat() {
  const { messages } = useSocket();

  console.log("Messages: ", messages);

  return (
    <MainLayout>
      <div className={styles.chatContainer}>
        <SidebarChat />
        <div className={styles.messagesContainer}>
          <Messages messages={messages} />
          <InputMessage />
        </div>
      </div>
    </MainLayout>
  );
}

export default Chat;
