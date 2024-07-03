import { postChatAction } from "@/actions/sendMessageAction";
import { useState } from "react";

const usePostMessage = () => {
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    // fetch("http://server-app.com/api/messages", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: localStorage.getItem("token") || "",
    //   },
    //   body: JSON.stringify({ message: input }),
    // });

    const response = await postChatAction(input);
    console.log("response", response);

    setInput("");
  };

  return { sendMessage, setInput, input };
};

export default usePostMessage;
