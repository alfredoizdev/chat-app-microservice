import { useEffect, useState } from "react";

import { fetchUser } from "@/actions/userAction";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import styles from "./UserList.module.scss";
import { User } from "@/types/user";
import { useChatStore } from "@/store/chatStore";

const UserList = () => {
  const router = useRouter();

  const user = useUserStore((state) => state.user);
  const currentUser = useUserStore((state) => state.currentUser);

  const [users, setUsers] = useState<User[] | []>([]);
  const setUser = useUserStore((state) => state.setUser);

  const { getUreadMessages, unread } = useChatStore((state) => state);

  const handleOnClick = (user: User) => {
    setUser(user);
    router.push(`/chat/room/${user.id}`);
  };

  useEffect(() => {
    const gettingUsers = async () => {
      await getUreadMessages();
      const data = await fetchUser();
      if (data) {
        setUsers(data);
      }
    };

    gettingUsers();
  }, []);

  const getUnreadDataForChat = (user: User) => {
    console.log("unread", currentUser?.id);
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
