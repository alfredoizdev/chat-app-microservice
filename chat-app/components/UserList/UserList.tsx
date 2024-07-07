import { use, useEffect, useState } from "react";
import useSocket from "@/hooks/useSocket";

import { fetchUser } from "@/actions/userAction";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import styles from "./UserList.module.scss";
import { User } from "@/types/user";
import { useChatStore } from "@/store/chatStore";

const UserList = () => {
  const router = useRouter();
  const { unread } = useSocket();

  const currentUser = useUserStore((state) => state.currentUser);

  const [users, setUsers] = useState<User[] | []>([]);
  const setUser = useUserStore((state) => state.setUser);

  const handleOnClick = (user: User) => {
    setUser(user);
    router.push(`/chat/room/${user.id}`);
  };

  console.log("unread", unread);

  useEffect(() => {
    const gettingUsers = async () => {
      const data = await fetchUser();
      if (data) {
        setUsers(data);
      }
    };

    gettingUsers();
  }, []);

  const getUnreadDataForChat = (user: User) => {
    if (!currentUser || !user) return 0;

    const unreadData = unread.find(
      (data) => data.receiverId === currentUser.id && data.senderId === user.id
    );

    return unreadData ? unreadData.unreadReceived : 0;
  };

  return (
    <>
      {users.map((user) => (
        <li
          className={styles.user}
          key={user.id}
          onClick={() => handleOnClick(user)}
        >
          <i className="bi bi-person-circle"></i>
          <span className={styles.userName}>{user.username}</span>
          {getUnreadDataForChat(user) !== 0 && (
            <span className={styles.unreadCount}>
              {getUnreadDataForChat(user)}
            </span>
          )}
        </li>
      ))}
    </>
  );
};

export default UserList;
