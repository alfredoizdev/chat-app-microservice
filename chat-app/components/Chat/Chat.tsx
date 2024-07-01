"use client";
import React, { useState } from "react";
import styles from "./chat.module.scss";
import useSocket from "@/hooks/useSocket";
import MainLayout from "../shared/Layout/MainLayout";
import Button from "../shared/Button/Button";
import usePostMessage from "@/hooks/usePostMessage";
import SidebarChat from "./Sidebar";
import Messages from "./Messages";
import InputMessage from "./InputMessage";

function Chat() {
  const { messages } = useSocket();

  console.log("Messages: ", messages);

  const { sendMessage, setInput, input } = usePostMessage();

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
