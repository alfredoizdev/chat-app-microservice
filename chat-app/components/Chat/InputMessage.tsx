"use client";
import styles from "./chat.module.scss";
import usePostMessage from "@/hooks/usePostMessage";
import Button from "../shared/Button/Button";

const InputMessage = () => {
  const { sendMessage, setInput, input } = usePostMessage();

  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />

      <Button onClick={sendMessage}>Send</Button>
    </div>
  );
};

export default InputMessage;
