"use client";
import { postChatAction } from "@/actions/sendMessageAction";
import { useUserStore } from "@/store/userStore";
import { Chat } from "@/types/chat";
import { useState } from "react";

const usePostMessage = () => {
  const [input, setInput] = useState("");

  const recivedId = useUserStore((state) => state.user?.id);
  const senderId = useUserStore((state) => state.currentUser?.id);

  const sendMessage = async () => {
    if (!recivedId || !senderId) {
      return;
    }

    const chat: Chat = {
      message: input,
      reciverId: recivedId as string,
      senderId: senderId as string,
      createdAt: new Date().toISOString(),
    };

    await postChatAction(chat);

    setInput("");
  };

  return { sendMessage, setInput, input };
};

export default usePostMessage;
