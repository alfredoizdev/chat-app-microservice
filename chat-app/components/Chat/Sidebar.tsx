import { useEffect, useState } from "react";
import styles from "./chat.module.scss";
import { fetchUser } from "@/actions/userAction";
import { User } from "@/types/user";

const SidebarChat = () => {
  const [users, setUsers] = useState<User[] | []>([]);

  useEffect(() => {
    const gettingUsers = async () => {
      const data = await fetchUser();
      if (data) {
        setUsers(data);
      }
    };

    gettingUsers();
  }, []);

  return (
    <div className={styles.sidebar}>
      <ul className={styles.userList}>
        <li>
          <h2>
            <i className="bi bi-people-fill"></i>
          </h2>
        </li>
        {users.map((user) => (
          <li className={styles.user} key={user.id}>
            <button type="button">{user.username}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarChat;
