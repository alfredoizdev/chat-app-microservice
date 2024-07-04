"use client";
import { postChatAction } from "@/actions/sendMessageAction";
import { useState } from "react";

const usePostMessage = () => {
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    const response = await postChatAction(input);
    console.log("response", response);

    setInput("");
  };

  return { sendMessage, setInput, input };
};

export default usePostMessage;
