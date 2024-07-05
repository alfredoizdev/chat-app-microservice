import { useEffect, useState } from "react";

import { fetchUser } from "@/actions/userAction";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import styles from "./UserList.module.scss";
import { User } from "@/types/user";

const UserList = () => {
  const router = useRouter();
  const [users, setUsers] = useState<User[] | []>([]);
  const setUser = useUserStore((state) => state.setUser);

  const handleOnClick = (user: User) => {
    setUser(user);
    router.push(`/chat/room/${user.id}`);
  };

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
    <>
      {users.map((user) => (
        <li
          className={styles.user}
          key={user.id}
          onClick={() => handleOnClick(user)}
        >
          <i className="bi bi-person-circle"></i>
          <span className={styles.userName}>{user.username}</span>
        </li>
      ))}
    </>
  );
};

export default UserList;
