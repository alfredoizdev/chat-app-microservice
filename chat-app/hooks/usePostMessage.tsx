import { useState } from "react";

const usePostMessage = () => {
  const [input, setInput] = useState("");

  const sendMessage = () => {
    fetch("http://server-app.com/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token") || "",
      },
      body: JSON.stringify({ message: input }),
    });
    setInput("");
  };

  return { sendMessage, setInput, input };
};

export default usePostMessage;
