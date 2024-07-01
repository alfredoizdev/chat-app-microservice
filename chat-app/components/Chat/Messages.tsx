import styles from "./chat.module.scss";

type MessagesProps = {
  messages: string[];
};

const Messages = ({ messages }: MessagesProps) => {
  return (
    <div className={styles.chatBox}>
      {messages.map((message: string, index: any) => (
        <div key={index} className={styles.messageRight}>
          <div className={styles.messageText}>{message}</div>
        </div>
      ))}
      <div className={styles.messageLeft}>
        <div className={styles.messageText}>Hi</div>
      </div>
    </div>
  );
};

export default Messages;
