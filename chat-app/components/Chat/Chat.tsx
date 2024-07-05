"use client";
import MainLayout from "../shared/Layout/MainLayout";
import Messages from "./Messages";
import InputMessage from "./InputMessage";

function Chat() {
  return (
    <MainLayout>
      <Messages />
      <InputMessage />
    </MainLayout>
  );
}

export default Chat;
